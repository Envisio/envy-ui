#!/usr/bin/env node

/**
 * Convert envy-ui tokens to DTCG (Design Tokens Community Group) format
 * W3C Design Tokens Format Module: https://www.w3.org/TR/design-tokens-format-1/
 */

const fs = require('fs');
const path = require('path');

const INPUT_DIR = './src/dictionary/properties';
const OUTPUT_DIR = './src/dictionary/dtcg';

// DTCG type mappings
const DTCG_TYPES = {
  color: 'color',
  dimension: 'dimension', 
  duration: 'duration',
  fontFamily: 'fontFamily',
  fontWeight: 'fontWeight',
  cubicBezier: 'cubicBezier',
  number: 'number',
  strokeStyle: 'strokeStyle',
  border: 'border',
  transition: 'transition',
  shadow: 'shadow',
  gradient: 'gradient',
  typography: 'typography'
};

/**
 * Transform references from .value to .$value and other properties to $-prefixed versions for DTCG compatibility
 */
function transformReferences(value) {
  if (typeof value !== 'string') {
    return value;
  }
  
  // Transform references to match DTCG format
  return value
    .replace(/\{([^}]+)\.value\}/g, '{$1.$value}')  // .value -> .$value
    .replace(/\{([^}]+)\.color\}/g, '{$1.$color}')  // .color -> .$color
    .replace(/\{([^}]+)\.description\}/g, '{$1.$description}')  // .description -> .$description
    .replace(/\{([^}]+)\.default\}/g, '{$1.$default}'); // .default -> .$default
}

/**
 * Detect token type based on value and context
 */
function detectTokenType(value, name, context) {
  // Color detection
  if (typeof value === 'string') {
    if (value.match(/^#[0-9a-fA-F]{3,8}$/)) return 'color';
    if (value.match(/^rgb\(|rgba\(/)) return 'color';
    if (value.match(/^hsl\(|hsla\(/)) return 'color';
    
    // Dimension detection  
    if (value.match(/^\d+(\.\d+)?(px|em|rem|%|vh|vw|vmin|vmax)$/)) return 'dimension';
    
    // Duration detection
    if (value.match(/^\d+(\.\d+)?(ms|s)$/)) return 'duration';
    
    // Border detection
    if (value.includes('solid') || value.includes('dashed') || value.includes('dotted')) {
      return 'border';
    }
    
    // Shadow detection
    if (value.includes('inset') || value.match(/\d+px.*\d+px/)) return 'shadow';
  }
  
  // Number detection
  if (typeof value === 'number') {
    // Z-index values are numbers
    if (context === 'z') return 'number';
    // Font weights
    if (name.includes('weight')) return 'fontWeight';
    return 'number';
  }
  
  return 'dimension'; // fallback
}

/**
 * Convert a simple token to DTCG format
 */
function convertSimpleToken(token, name, context) {
  const { value, comment, ...rest } = token;
  
  const dtcgToken = {
    $value: transformReferences(value),
    $type: detectTokenType(value, name, context)
  };
  
  if (comment) {
    dtcgToken.$description = comment;
  }
  
  // Add any additional properties, also transforming references in them
  Object.keys(rest).forEach(key => {
    if (!key.startsWith('$')) {
      const transformedValue = typeof rest[key] === 'string' ? transformReferences(rest[key]) : rest[key];
      dtcgToken[`$${key}`] = transformedValue;
    }
  });
  
  return dtcgToken;
}

/**
 * Convert ACSS tokens to DTCG format (more complex)
 */
function convertAcssToken(token, name) {
  const { fragments, ...rest } = token;
  
  // For ACSS tokens, we want to preserve the original structure
  // but add DTCG metadata where appropriate
  const dtcgToken = { ...rest };
  
  // Convert simple properties to DTCG format
  Object.keys(rest).forEach(key => {
    if (key === 'value' && typeof rest[key] === 'string') {
      // Transform references in ACSS template values
      dtcgToken[key] = transformReferences(rest[key]);
      dtcgToken.$type = 'string';
    } else if (key === 'description') {
      dtcgToken.$description = rest[key];
      delete dtcgToken[key];
    } else if (typeof rest[key] === 'string') {
      // Transform references in other string properties
      dtcgToken[key] = transformReferences(rest[key]);
    }
  });
  
  // Keep fragments array intact for ACSS processing
  if (fragments && Array.isArray(fragments)) {
    dtcgToken.fragments = fragments;
  }
  
  return dtcgToken;
}

/**
 * Recursively convert any nested token structure
 */
function convertTokenRecursive(token, name, context) {
  // Check if it's an ACSS token (has fragments)
  if (token.fragments || name.startsWith('acss-')) {
    return convertAcssToken(token, name);
  }
  
  // Check if it's a simple token (has value)
  if (token.value !== undefined) {
    return convertSimpleToken(token, name, context);
  }
  
  // If it's a nested object, recurse through all keys
  const converted = {};
  Object.keys(token).forEach(key => {
    const nestedToken = token[key];
    if (typeof nestedToken === 'object' && nestedToken !== null) {
      converted[key] = convertTokenRecursive(nestedToken, key, context);
    } else {
      // Keep primitive values as-is, especially underscore-prefixed properties
      converted[key] = nestedToken;
    }
  });
  
  return converted;
}

/**
 * Process a token file and convert to DTCG
 */
function convertTokenFile(filePath, outputPath) {
  console.log(`Converting: ${filePath}`);
  
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const dtcgContent = {};
    
    Object.keys(content).forEach(groupKey => {
      const group = content[groupKey];
      dtcgContent[groupKey] = convertTokenRecursive(group, groupKey, groupKey);
    });
    
    // Ensure output directory exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    
    // Write DTCG file
    fs.writeFileSync(
      outputPath, 
      JSON.stringify(dtcgContent, null, 2),
      'utf8'
    );
    
    console.log(`✓ Converted to: ${outputPath}`);
    
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error.message);
  }
}

/**
 * Recursively find and convert all JSON files
 */
function convertDirectory(inputDir, outputDir) {
  if (!fs.existsSync(inputDir)) {
    console.error(`Input directory ${inputDir} does not exist`);
    return;
  }
  
  fs.mkdirSync(outputDir, { recursive: true });
  
  const items = fs.readdirSync(inputDir);
  
  items.forEach(item => {
    const inputPath = path.join(inputDir, item);
    const outputPath = path.join(outputDir, item);
    
    const stat = fs.statSync(inputPath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      convertDirectory(inputPath, outputPath);
    } else if (item.endsWith('.json')) {
      // Convert JSON files
      convertTokenFile(inputPath, outputPath);
    }
  });
}

/**
 * Main conversion function
 */
function main() {
  console.log('🎨 Converting envy-ui tokens to DTCG format...\n');
  
  // Clean output directory
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Convert all token files
  convertDirectory(INPUT_DIR, OUTPUT_DIR);
  
  console.log('\n✅ Conversion complete!');
  console.log(`📁 DTCG tokens saved to: ${OUTPUT_DIR}`);
  console.log('\n📖 Next steps:');
  console.log('1. Review the converted tokens');
  console.log('2. Update Style Dictionary config to use DTCG format');
  console.log('3. Test the build process');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  convertDirectory,
  convertTokenFile,
  convertTokenRecursive,
  convertSimpleToken,
  convertAcssToken,
  detectTokenType,
  transformReferences
};