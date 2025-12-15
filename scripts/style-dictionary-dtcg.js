const _ = require('lodash');

/**
 * DTCG Bridge Transforms for Style Dictionary v3
 * Allows using DTCG format tokens with older Style Dictionary versions
 */

function registerDtcgTransforms(target) {
  if (!target) {
    throw new Error('registerDtcgTransforms requires a Style Dictionary instance');
  }

  const ensureTransform = (name, config) => {
    if (!target.hooks.transforms || !(name in target.hooks.transforms)) {
      target.registerTransform({ name, ...config });
    }
  };

  const nameCtiKebab = function(prop, options = {}) {
    const prefix = options.prefix ? `${options.prefix} ` : '';
    return _.kebabCase(`${prefix}${prop.path.join(' ')}`);
  };

  const nameCtiConstant = function(prop, options = {}) {
    const prefix = options.prefix ? `${options.prefix} ` : '';
    return _.snakeCase(`${prefix}${prop.path.join(' ')}`).toUpperCase();
  };

  ensureTransform('name/cti/kebab', {
    type: 'name',
    transformer: nameCtiKebab,
    transform: nameCtiKebab
  });

  ensureTransform('name/cti/constant', {
    type: 'name',
    transformer: nameCtiConstant,
    transform: nameCtiConstant
  });

  // Custom parser to convert DTCG format to v3 compatible format during loading
  const dtcgParser = function({contents}) {
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
  };

  target.registerParser({
    name: 'dtcg/json',
    pattern: /\.json$/,
    parse: dtcgParser,
    parser: dtcgParser
  });

  // Transform DTCG $value to regular value for compatibility
  const dtcgValueTransform = function(prop) {
    return prop.$value || prop.value;
  };
  target.registerTransform({
    name: 'dtcg/value',
    type: 'value',
    transformer: dtcgValueTransform,
    transform: dtcgValueTransform
  });

  // Transform DTCG references to work with older versions
  const dtcgReferenceTransform = function(prop) {
    let value = prop.$value || prop.value;
    
    if (typeof value === 'string' && value.includes('.$value')) {
      value = value.replace(/\.\$value/g, '.value');
    }
    
    return value;
  };
  target.registerTransform({
    name: 'dtcg/references',
    type: 'value',
    transformer: dtcgReferenceTransform,
    transform: dtcgReferenceTransform
  });

  // Transform DTCG $type for better categorization
  const dtcgTypeTransform = function(prop) {
    return {
      ...prop.attributes,
      type: prop.$type || 'unknown'
    };
  };
  target.registerTransform({
    name: 'dtcg/type',
    type: 'attribute',
    transformer: dtcgTypeTransform,
    transform: dtcgTypeTransform
  });

  // DTCG-compatible transform group for SCSS
  target.registerTransformGroup({
    name: 'dtcg/scss',
    transforms: [
      'dtcg/references',
      'dtcg/value',
      'dtcg/type', 
      'attribute/cti',
      'name/cti/kebab',
      'time/seconds',
      'size/rem',
      'color/css'
    ]
  });

  // DTCG-compatible transform group for JS
  target.registerTransformGroup({
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
}

module.exports = { registerDtcgTransforms };
