const StyleDictionaryPackage = require('style-dictionary');

/**
 * DTCG Bridge Transforms for Style Dictionary v3
 * Allows using DTCG format tokens with older Style Dictionary versions
 */

// Custom parser to convert DTCG format to v3 compatible format during loading
StyleDictionaryPackage.registerParser({
  pattern: /\.json$/,
  parse: function({contents}) {
    const json = JSON.parse(contents);
    
    // Recursively convert DTCG tokens to v3 format
    function convertDtcgTokens(obj) {
      if (typeof obj !== 'object' || obj === null) return obj;
      
      if (obj.hasOwnProperty('$value')) {
        // This is a DTCG token - convert it
        return {
          value: obj.$value,
          type: obj.$type,
          description: obj.$description,
          ...obj // include any other properties  
        };
      }
      
      // Recursively process nested objects
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        if (!key.startsWith('$')) { // Skip DTCG meta properties at group level
          result[key] = convertDtcgTokens(value);
        }
      }
      return result;
    }
    
    return convertDtcgTokens(json);
  }
});

// Transform DTCG $value to regular value for v3 compatibility
StyleDictionaryPackage.registerTransform({
  name: 'dtcg/value',
  type: 'value',
  transformer: function(prop) {
    // Handle DTCG format: { $value: "...", $type: "..." }
    return prop.$value || prop.value;
  }
});

// Transform DTCG references to work with v3
StyleDictionaryPackage.registerTransform({
  name: 'dtcg/references',
  type: 'value',
  transformer: function(prop) {
    let value = prop.$value || prop.value;
    
    // Convert DTCG references like {color.brand-primary.$value} to {color.brand-primary.value}
    if (typeof value === 'string' && value.includes('.$value')) {
      value = value.replace(/\.\$value/g, '.value');
    }
    
    return value;
  }
});

// Transform DTCG $type for better categorization
StyleDictionaryPackage.registerTransform({
  name: 'dtcg/type',
  type: 'attribute',
  transformer: function(prop) {
    return {
      ...prop.attributes,
      type: prop.$type || 'unknown'
    };
  }
});

// DTCG-compatible transform group for SCSS
StyleDictionaryPackage.registerTransformGroup({
  name: 'dtcg/scss',
  transforms: [
    'dtcg/references',
    'dtcg/value',
    'dtcg/type', 
    'attribute/cti',
    'name/cti/kebab',
    'time/seconds',
    'content/icon',
    'size/rem',
    'color/css'
  ]
});

// DTCG-compatible transform group for JS
StyleDictionaryPackage.registerTransformGroup({
  name: 'dtcg/js',
  transforms: [
    'dtcg/references',
    'dtcg/value',
    'dtcg/type',
    'attribute/cti', 
    'name/cti/constant',
    'size/rem',
    'color/hex'
  ]
});

module.exports = StyleDictionaryPackage;