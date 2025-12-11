#!/usr/bin/env node

/**
 * DTCG Token Generator
 * Generates documentation, plugins, and other assets from DTCG format tokens
 */

const fs = require('fs');
const path = require('path');

const TOKENS_DIR = './dev/figma-playground/figma-tokens';
const OUTPUT_DIR = './dev/figma-playground';

function loadTokens(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading tokens from ${filePath}:`, error.message);
    return null;
  }
}

function generateMarkdownDocs(tokens) {
  const { component, examples } = tokens;
  
  let markdown = `# Container Component Documentation

Generated from DTCG tokens: \`container-manifest.json\`

## Component Properties

`;

  // Generate property documentation
  Object.keys(component.container).forEach(propertyName => {
    if (propertyName === 'examples') return;
    
    const property = component.container[propertyName];
    markdown += `### ${propertyName.charAt(0).toUpperCase() + propertyName.slice(1)}\n\n`;
    
    Object.keys(property).forEach(optionName => {
      const option = property[optionName];
      markdown += `**${optionName}**\n`;
      markdown += `- Description: ${option.$description}\n`;
      markdown += `- CSS: \`${option.css.$value}\`\n`;
      markdown += `- Figma: \`${option.figma.$value}\`\n`;
      markdown += `- Class: \`${option.class.$value}\`\n`;
      if (option.alias) {
        markdown += `- Alias: \`${option.alias.$value}\`\n`;
      }
      markdown += '\n';
    });
  });

  // Generate usage examples
  markdown += `## Usage Examples\n\n`;
  
  Object.keys(examples).forEach(exampleName => {
    const example = examples[exampleName];
    markdown += `### ${example.$description}\n\n`;
    markdown += `**Code:**\n\`\`\`jsx\n${example.code.$value}\n\`\`\`\n\n`;
    markdown += `**Figma:** ${example.figma.$value}\n\n`;
    markdown += `**Classes:** ${example.classes.$value.join(', ')}\n\n`;
  });

  return markdown;
}

function generateFigmaPluginConfig(tokens) {
  const { component } = tokens;
  
  const config = {
    containerManifest: {}
  };
  
  Object.keys(component.container).forEach(propertyName => {
    config.containerManifest[propertyName] = {
      options: {}
    };
    
    Object.keys(component.container[propertyName]).forEach(optionName => {
      const option = component.container[propertyName][optionName];
      config.containerManifest[propertyName].options[optionName] = {
        figma: option.figma.$value,
        class: option.class.$value
      };
    });
  });
  
  return config;
}

function updatePluginCode(pluginConfig) {
  const pluginPath = path.join(OUTPUT_DIR, 'plugins/code.js');
  
  if (!fs.existsSync(pluginPath)) {
    console.warn('Plugin code.js not found, skipping update');
    return;
  }
  
  let pluginCode = fs.readFileSync(pluginPath, 'utf8');
  
  // Replace the containerManifest object
  const manifestString = JSON.stringify(pluginConfig.containerManifest, null, 2);
  
  pluginCode = pluginCode.replace(
    /const containerManifest = \{[\s\S]*?\};/,
    `const containerManifest = ${manifestString};`
  );
  
  fs.writeFileSync(pluginPath, pluginCode);
  console.log('✓ Updated plugin code.js with new token data');
}

function main() {
  console.log('🚀 Generating assets from DTCG tokens...\n');
  
  // Load tokens
  const tokensPath = path.join(TOKENS_DIR, 'container-manifest.json');
  const tokens = loadTokens(tokensPath);
  
  if (!tokens) {
    console.error('Failed to load tokens, aborting');
    process.exit(1);
  }
  
  // Generate markdown documentation
  const markdown = generateMarkdownDocs(tokens);
  const docsPath = path.join(OUTPUT_DIR, 'container-component.md');
  fs.writeFileSync(docsPath, markdown);
  console.log('✓ Generated markdown documentation:', docsPath);
  
  // Generate plugin configuration
  const pluginConfig = generateFigmaPluginConfig(tokens);
  const pluginConfigPath = path.join(OUTPUT_DIR, 'plugins/tokens-config.json');
  fs.writeFileSync(pluginConfigPath, JSON.stringify(pluginConfig, null, 2));
  console.log('✓ Generated plugin configuration:', pluginConfigPath);
  
  // Update plugin code
  updatePluginCode(pluginConfig);
  
  console.log('\n🎯 All assets generated successfully!');
  console.log('📁 Source of truth: figma-tokens/container-manifest.json (DTCG format)');
}

if (require.main === module) {
  main();
}

module.exports = { loadTokens, generateMarkdownDocs, generateFigmaPluginConfig };