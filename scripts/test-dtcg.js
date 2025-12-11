#!/usr/bin/env node

/**
 * Test DTCG conversion with Style Dictionary v3 + DTCG Bridge
 */

// Load DTCG bridge transforms first
require('./style-dictionary-dtcg.js');

// Then extend with config
const StyleDictionary = require('style-dictionary').extend('./test-dtcg-config.json');

console.log('🧪 Testing DTCG format with Style Dictionary...\n');

try {
  console.log('Building color tokens...');
  StyleDictionary.buildAllPlatforms();
  
  console.log('\n✅ DTCG test build successful!');
  console.log('📁 Check ./test-dtcg/ directory for output');
  
} catch (error) {
  console.error('\n❌ DTCG test build failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}