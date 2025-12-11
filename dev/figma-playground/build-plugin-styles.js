const fs = require('fs');
const path = require('path');
const sass = require('sass');

// Build card styles for Figma plugin
async function buildPluginStyles() {
  try {
    // Path to your card SCSS
    const cardScssPath = path.join(__dirname, '../../src/stylesheets/blocks/card/_card.scss');
    
    // Compile SCSS to CSS
    const result = sass.compile(cardScssPath, {
      loadPaths: [
        path.join(__dirname, '../../src/stylesheets'),
        path.join(__dirname, '../../from-dictionary/stylesheets')
      ]
    });
    
    // Extract only card-related CSS classes
    const cardCSS = result.css;
    
    // Write to plugin directory
    const outputPath = path.join(__dirname, 'plugins/card-styles.css');
    fs.writeFileSync(outputPath, cardCSS);
    
    console.log('✅ Card styles built for Figma plugin:', outputPath);
    
    // Also create a minimal version with just the classes you use in the plugin
    const minimalCSS = generateMinimalCardCSS();
    const minimalOutputPath = path.join(__dirname, 'plugins/card-styles-minimal.css');
    fs.writeFileSync(minimalOutputPath, minimalCSS);
    
    console.log('✅ Minimal card styles built:', minimalOutputPath);
    
  } catch (error) {
    console.error('❌ Error building plugin styles:', error);
  }
}

function generateMinimalCardCSS() {
  return `
/* Envy UI Card Styles for Figma Plugin */
.env-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid rgba(9, 20, 44, 0.1);
  background: #ffffff;
  padding: 20px 22px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  gap: 12px;
  min-height: 100px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: all 0.2s ease;
}

/* Shadow modifiers */
.env-card--no-shadow {
  box-shadow: none;
}

.env-card--shadow-strong {
  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.12);
}

.env-card--shadow-xstrong {
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.16);
}

/* Border modifiers */
.env-card--no-border {
  border: none;
}

.env-card--brand-border {
  border-color: #3b82f6;
  border-width: 2px;
}

/* Variant modifiers */
.env-card--plain {
  background: #f8fafc;
  border-color: #e2e8f0;
}

.env-card--brand {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  color: white;
  border-color: #2563eb;
}

.env-card--muted {
  background: #f1f5f9;
  color: #64748b;
  border-color: #cbd5e1;
}

/* State modifiers */
.env-card--active {
  transform: translateY(-2px);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.16);
  border-color: #3b82f6;
}

.env-card--selected {
  border-color: #10b981;
  border-width: 2px;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* Plugin-specific preview styles */
.card-preview-container {
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
  margin: 16px 0;
}

.card-preview-label {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
`;
}

if (require.main === module) {
  buildPluginStyles();
}

module.exports = { buildPluginStyles, generateMinimalCardCSS };