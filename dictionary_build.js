const rimraf = require('rimraf');
const _ = require('lodash');
const jsonConcat = require('json-concat');

const { registerDtcgTransforms } = require('./scripts/style-dictionary-dtcg.js');
let StyleDictionaryPackage;
async function loadStyleDictionary() {
  if (StyleDictionaryPackage) {
    return StyleDictionaryPackage;
  }

  try {
    const moduleOrPromise = require('style-dictionary');
    StyleDictionaryPackage = moduleOrPromise.default || moduleOrPromise;
  } catch (error) {
    if (error.code === 'ERR_REQUIRE_ESM') {
      const moduleOrPromise = await import('style-dictionary');
      StyleDictionaryPackage = moduleOrPromise.default || moduleOrPromise;
    } else {
      throw error;
    }
  }

  registerDtcgTransforms(StyleDictionaryPackage);
  return StyleDictionaryPackage;
}

const { filterForCategory, filterForFragmentAndUnits } = require('./src/dictionary/_filters.js');
const { acssFilesList } = require('./src/dictionary/_acss_files_list.js');
let acssList = [];
let tokenFolders;
const { getFragmentIterator, getFragmentUnit, getUnitNameFromAlias, getMarkupFile } = require('./src/dictionary/_getters.js');

const SCSS_PATH = './from-dictionary/stylesheets/';
const JS_PATH = './from-dictionary/javascripts/';
const PROPERTIES_PATH = process.env.PROPERTIES_PATH || './src/dictionary/dtcg/';
const STYLEGUIDE_PUG_PATH = './from-dictionary/styleguide/';
const COLOR = 'color';
const SHAPE = 'shape';
const Z = 'z';
const BLOCK_NAME = 'block-name';
const BLOCK = 'block';

const getTokenValue = (token) => (
  token?.value
  ?? token?.original?.value
  ?? token?.$value
  ?? token?.original?.$value
  ?? token?.$default
  ?? ''
);

const getAllTokens = (dictionary) => dictionary.allTokens || dictionary.allProperties || [];

const getDictionaryTokens = (dictionary) => dictionary.tokens || dictionary.properties || {};

const resolveFileConfig = (legacyContext, file) => file || legacyContext || {};

const formatHeaderLines = (header = '', prefix = '') => (
  header ? header.split('\n').map(line => `${prefix}${line}`).join('\n') : ''
);

const getHeaderFromOptions = (fileConfig = {}) => fileHeader(fileConfig.options || {});

const buildList = [
  Z,
  SHAPE,
  COLOR,
  BLOCK_NAME,
  BLOCK,
];

function fileHeader(options, commentStyle = 'short') {
  var to_ret = '';
  // for backward compatibility we need to have the user explicitly hide them
  var showFileHeader = (options) ? options.showFileHeader : true;
  if (showFileHeader) {
    if (commentStyle === 'short') {
      to_ret += '\n';
      to_ret += '// Do not edit directly\n';
      to_ret += '// Generated on ' + new Date().toUTCString() + '\n';
      to_ret += '\n';
    } else {
      to_ret += '/**\n';
      to_ret += ' * Do not edit directly\n';
      to_ret += ' * Generated on ' + new Date().toUTCString() + '\n';
      to_ret += ' */\n\n';
    }
  }

  return to_ret;
}

const makeTokenFolders = () => ({
  color: [
    {
      source: [
        `${PROPERTIES_PATH}${COLOR}/base.json`,
      ],
      platforms: {
        scss: {
          transformGroup: 'dtcg/scss',
          buildPath: `${SCSS_PATH}${COLOR}/`,
          transforms: ['name/ti/kebab'],
          files: [{
            destination: '_color-map.scss',
            format: 'scss/map-flat',
            options: {
              mapName: 'a-color',
            },
          }, {
            destination: '_color.scss',
            format: 'scss/variables',
          }, {
/*             destination: '_color-custom-properties.scss',
            format: 'css/variables',
          }, { */
            header: 'Color Palette\n\nColors:',
            destination: '_color-kss.scss',
            format: 'scss/variables-color-kss',
          }],
        },
        js: {
          transformGroup: 'dtcg/js',
          prefix: 'UI',
          buildPath: `${JS_PATH}`,
          files: [{
            destination: 'color.js',
            format: 'javascript/module',
          }],
        },
      },
    }, {
      source: [
        `${PROPERTIES_PATH}${COLOR}/base.json`,
        `${PROPERTIES_PATH}${COLOR}/color-default.json`,
      ],
      platforms: {
        scss: {
          transformGroup: 'dtcg/scss',
          buildPath: `${SCSS_PATH}${COLOR}/`,
          files: [{
            destination: '_color-default.scss',
            filter: filterForCategory(['color-default']),
            format: 'scss/variables',
          }],
        },
        js: {
          transformGroup: 'dtcg/js',
          prefix: 'UI',
          buildPath: `${JS_PATH}`,
          files: [{
            destination: 'color-default.js',
            filter: filterForCategory(['color-default']),
            format: 'javascript/module',
          }],
        },
      },
    }, {
      source: [
        `${PROPERTIES_PATH}${COLOR}/base.json`,
      ],
      platforms: {
        scss: {
          transformGroup: 'dtcg/scss',
          buildPath: `${STYLEGUIDE_PUG_PATH}${COLOR}/`,
          files: [{
            header: '// - Do not edit directly Colors: \n' + '// - Generated on ' + new Date().toUTCString() + '\n',
            destination: '_color.pug',
            format: 'scss/variables-color-pug',
          }],
        },
      },
    },
  ],
  block: [
    {
      source: [
        `${PROPERTIES_PATH}${BLOCK}/**/*.json`,
        `!${PROPERTIES_PATH}${BLOCK}/name.json`,
        // `${PROPERTIES_PATH}${BLOCK}/name.json`,
        `${PROPERTIES_PATH}${COLOR}/*.json`,
        `${PROPERTIES_PATH}${SHAPE}/base.json`,
        `${PROPERTIES_PATH}${Z}/base.json`,
        // `${PROPERTIES_PATH}${SHAPE}/base.json`,
      ],
      platforms: {
        scss: {
          transformGroup: 'dtcg/scss',
          buildPath: `${SCSS_PATH}${BLOCK}/`,
          files: [{
            filter: filterForCategory(['button']),
            destination: '_button.scss',
            format: 'scss/map-deep',
            options: {
              mapName: 'tokens-button',
            },
          }],
        },
        js: {
          transformGroup: 'dtcg/js',
          prefix: 'UI',
          buildPath: `${JS_PATH}${BLOCK}/`,
          files: [{
            destination: 'button.js',
            filter: filterForCategory(['button']),
            format: 'javascript/module',
          }],
        },
      },
    },
  ],
  shape: [
    {
      source: [
        `${PROPERTIES_PATH}${SHAPE}/base.json`,
      ],
      platforms: {
        scss: {
          transformGroup: 'dtcg/scss',
          buildPath: `${SCSS_PATH}${SHAPE}/`,
          files: [{
            destination: `_${SHAPE}.scss`,
            format: 'scss/variables',
          }],
        },
        js: {
          transformGroup: 'dtcg/js',
          prefix: 'UI',
          buildPath: `${JS_PATH}`,
          files: [{
            destination: `${SHAPE}.js`,
            format: 'javascript/module',
          }],
        },
      },
    }
  ],
  z: [
    {
      source: [
        `${PROPERTIES_PATH}${Z}/base.json`,
      ],
      platforms: {
        scss: {
          transformGroup: 'dtcg/scss',
          buildPath: `${SCSS_PATH}${Z}/`,
          files: [{
            destination: `_${Z}.scss`,
            format: 'scss/variables',
          }],
        },
        js: {
          transformGroup: 'dtcg/js',
          prefix: 'UI',
          buildPath: `${JS_PATH}`,
          files: [{
            destination: `${Z}.js`,
            format: 'javascript/module',
          }],
        },
      },
    }
  ],
  'block-name': [
    {
      source: [
        `${PROPERTIES_PATH}**/*.json`,
      ],
      platforms: {
        scss: {
          prefix: '$ui',
          buildPath: `${SCSS_PATH}block-name/`,
          transforms: ['dtcg/references', 'dtcg/value', 'dtcg/type', 'attribute/cti', 'name/ti/camel'],
          files: [{
            header: 'Block Names\n\nNames:',
            destination: '_block-name.scss',
            format: 'scss/scss-variables-block-name',
            filter: filterForCategory(['block-name', 'pre-post-fix']),
          }, {
            destination: '_block-name-imports.scss',
            format: 'scss/scss-block-name-imports',
            filter: filterForCategory(['block-name']),
          }, {
            destination: '_acss-imports.scss',
            format: 'scss/scss-acss-imports',
            filter: filterForCategory(['acss-import']),
            fragments: acssList,
          }, ..._.flatten(acssList.map((acssItem) => {
            const acssMainClassFragment = acssItem['main-fragment'];
            const acssGroupArr = acssItem.fragments;

            return acssGroupArr.map((acssClassFragment, index) => ({
              destination: `_acss-${acssMainClassFragment}${acssClassFragment.content}${getUnitNameFromAlias(getFragmentUnit(acssMainClassFragment, acssClassFragment))}-kss.scss`,
              format: 'scss/acss-kss',
              filter: filterForCategory([`acss-${acssMainClassFragment}`]),
              filterForClassFragment: acssClassFragment.content,
              filterForClassFragmentUnit: getUnitNameFromAlias(acssClassFragment.unit).replace('-', ''),
              menu: acssClassFragment.menu,
              weightCounter: index + 1,
            }));
          })), ..._.flatten(acssList.map((acssItem) => {
            const acssMainClassFragment = acssItem['main-fragment'];
            const acssGroupArr = acssItem.fragments;
            return acssGroupArr.map((acssClassFragment, index) => ({
              destination: `_acss-${acssMainClassFragment}-main-menu-kss.scss`,
              format: 'scss/acss-main-menu-kss',
              filter: filterForCategory([`acss-${acssMainClassFragment}`]),
              filterForClassFragment: acssClassFragment.content,
            }));
          }))],
        },
        js: {
          prefix: 'ui',
          buildPath: `${JS_PATH}`,
          transforms: ['dtcg/references', 'dtcg/value', 'dtcg/type', 'attribute/cti', 'name/ti/camel'],
          files: [{
            destination: 'block_name.js',
            format: 'js/js-variables-block-names',
            filter: filterForCategory(['block-name', 'pre-post-fix']),
          }, {
            destination: 'block_raw_name.js',
            format: 'js/js-variables-raw-names',
            filter: filterForCategory(['block-name', 'pre-post-fix']),
          }, {
            destination: 'block_name.styleguide.js',
            format: 'js/js-block-names-for-styleguide',
            filter: filterForCategory(['block-name', 'pre-post-fix']),
          }],
        },
      },
    },
  ],
});

function styleDictionaryRegistration() {

  const registerFormatDual = (name, formatFn) => {
    StyleDictionaryPackage.registerFormat({
      name,
      formatter(dictionary) {
        return formatFn({ dictionary, file: resolveFileConfig(this) });
      },
      format({ dictionary, file }) {
        return formatFn({ dictionary, file });
      },
    });
  };

  StyleDictionaryPackage.registerTransform({
    name: 'name/ti/kebab',
    type: 'name',
    transformer: function(prop, options) {
        options = options || {};
        var path = prop.path.slice(1);
        return _.kebabCase([options.prefix].concat(path).join(' '));
    },
    transform: function(prop, options) {
        options = options || {};
        var path = prop.path.slice(1);
        return _.kebabCase([options.prefix].concat(path).join(' '));
    }
  });

  StyleDictionaryPackage.registerTransform({
    name: 'name/ti/camel',
    type: 'name',
    transformer: function(prop, options) {
        options = options || {};
        var path = prop.path.slice(1);
        return _.camelCase([options.prefix].concat(path).join(' '));
    },
    transform: function(prop, options) {
        options = options || {};
        var path = prop.path.slice(1);
        return _.camelCase([options.prefix].concat(path).join(' '));
    }
  });

  registerFormatDual('scss/variables-color-pug', ({ dictionary, file = {} }) => {
    const header = formatHeaderLines(file.header);
    const prefix = header ? `${header}\n` : '';
    const colorClasses = getAllTokens(dictionary).map(prop => `"${prop.path[1]}"`).join(', ');
    return `${prefix}- var colorClasses = [${colorClasses}]\n// -\n// - Styleguide homepage color-palette\n`;
  });

  registerFormatDual('scss/variables-color-kss', ({ dictionary, file = {} }) => {
    const header = formatHeaderLines(file.header, '// ');
    const prefix = header ? `${header}\n// ` : '// ';
    const colorLines = getAllTokens(dictionary).map(prop => `"${prop.name}": ${prop.value}`).join('\n// ');
    return `${prefix}${colorLines}\n//\n// Styleguide color-palette\n`;
  });

  registerFormatDual('scss/acss-kss', ({ dictionary, file = {} }) => {
    const dictionaryMeat = getAllTokens(dictionary)[0];
    if (!dictionaryMeat) {
      return `// ${file.menu || ''}\n// No fragments available for ACSS generation\n`;
    }
    const weightCounter = file.weightCounter || 0;
    const setMarkup = markUpFileName => markUpFileName ? `\n// Markup:\n// ${markUpFileName}\n//` : '';
    const setMainDescription = description => description ? `\n// ${description}\n//` : '';
    const setDescription = description => description ? ` - ${description}` : '';
    const setWeight = weight => weight ? `\n//\n// Weight: ${weight + weightCounter}\n//` : '';
    const header = file.menu || '';

    const fragmentList = Array.isArray(dictionaryMeat.fragments)
      ? dictionaryMeat.fragments
      : Object.values(dictionaryMeat.fragments || {});
    const extractedFragment = fragmentList.filter(fragment => filterForFragmentAndUnits(fragment, file))[0];

    const tokenOutput = getAllTokens(dictionary).map(prop => {
      const propFragments = Array.isArray(prop.fragments)
        ? prop.fragments
        : Object.values(prop.fragments || {});
      return propFragments
        .filter((fragment) => (filterForFragmentAndUnits(fragment, file)))
        .map((fragment) => {
          return Object.keys(getFragmentIterator(prop, fragment)).map((iteratorKey) =>
            `.env-a${prop['ignore-main-fragment'] ? '' : '-' + prop['main-fragment']}${fragment.content}${iteratorKey === "null" ? '' : '-' + iteratorKey}${getFragmentUnit(prop, fragment)}${fragment['test-extension'] || ''}${setDescription(fragment.description)}`)
          .join('\n// ');
        })
        .join('\n// ');
    }).join('\n// ');

    return `// ${header}` +
      '\n// ' +
      setMainDescription(`${file.menu || ''}`) +
      setMarkup(getMarkupFile(dictionaryMeat, extractedFragment)) +
      '\n// ' +
      tokenOutput +
      setWeight(dictionaryMeat['menu-weight']) +
      `\n// Styleguide ${dictionaryMeat['text-label']} - ${header}\n`;
  });

  registerFormatDual('scss/acss-main-menu-kss', ({ dictionary }) => {
    const dictionaryMeat = getAllTokens(dictionary)[0];
    if (!dictionaryMeat) {
      return '//\n// Styleguide\n';
    }
    const setMainDescription = description => description ? `\n// ${description}\n//` : '';
    const setWeight = weight => weight ? `\n// Weight: ${weight}\n//` : '';
    const header = `${dictionaryMeat['text-label']}`;
    return `// ${header}` +
      '\n//' +
      setMainDescription(`${dictionaryMeat.description}`) +
      setWeight(dictionaryMeat['menu-weight']) +
      `\n// Styleguide ${header}\n`;
  });

  registerFormatDual('scss/scss-variables-block-name', ({ dictionary, file = {} }) => {
    const header = getHeaderFromOptions(file);
    const defaultPrefixToken = getDictionaryTokens(dictionary)['pre-post-fix']?.['general-prefix'];
    const defaultPrefix = getTokenValue(defaultPrefixToken);
    const body = getAllTokens(dictionary)
      .map((prop) => ({ prop, tokenValue: getTokenValue(prop) }))
      .filter(({ tokenValue }) => (tokenValue !== defaultPrefix))
      .map(({ prop, tokenValue }) => (`$${prop.name}: "${defaultPrefix}${tokenValue}";${prop.comment ? ` // ${prop.comment}` : ''}`))
      .join('\n');
    return `${header}${body}\n//\n// SCSS block names\n`;
  });

  registerFormatDual('scss/scss-block-name-imports', ({ dictionary, file = {} }) => {
    const header = getHeaderFromOptions(file);
    const body = getAllTokens(dictionary)
      .map((prop) => {
        const tokenValue = getTokenValue(prop);
        return `@use '../../../src/stylesheets/${tokenValue === 'a' ? '' : 'blocks/'}${prop.path[1]}/index' as *;`;
      })
      .join('\n');
    return `${header}${body}\n//\n// SCSS block name imports\n`;
  });

  registerFormatDual('scss/scss-acss-imports', ({ file = {} }) => {
    const header = getHeaderFromOptions(file);
    const fragments = file.fragments || [];
    const body = fragments.map((fragment) => {
      const mainPart = fragment['main-fragment'];
      const fragmentImports = fragment.fragments.map((element) => `@use "acss-${mainPart}${element.content}${getUnitNameFromAlias(element.unit)}-kss" as *;`).join('\n');
      return `@use "acss-${mainPart}-main-menu-kss" as *;\n${fragmentImports}`;
    }).join('\n');
    return `${header}${body}\n//\n// ACSS imports\n`;
  });

  registerFormatDual('js/js-variables-block-names', ({ dictionary, file = {} }) => {
    const header = getHeaderFromOptions(file);
    const defaultPrefixToken = getDictionaryTokens(dictionary)['pre-post-fix']?.['general-prefix'];
    const defaultPrefix = getTokenValue(defaultPrefixToken);
    const body = getAllTokens(dictionary)
      .map((prop) => ({ prop, tokenValue: getTokenValue(prop) }))
      .filter(({ tokenValue }) => (tokenValue !== defaultPrefix))
      .map(({ prop, tokenValue }) => {
        const basePrefix = prop['general-prefix'] || defaultPrefix;
        const normalizedValue = tokenValue === 'a' ? 'a-' : tokenValue;
        return `const $${prop.name} = '${basePrefix}${normalizedValue}';\n`
        + `const ${prop.name} = getBlock('${basePrefix}${normalizedValue}');${prop.comment ? ` // ${prop.comment}` : ''}\n`
        + `module.exports.$${prop.name} = $${prop.name};\n`
        + `module.exports.${prop.name} = ${prop.name};`;
      })
      .join('\n');
    return `${header}const getBlock = require('../../lib/ui/get_block').default;\n\n${body}\n//\n// JS block names\n`;
  });

  registerFormatDual('js/js-variables-raw-names', ({ dictionary, file = {} }) => {
    const header = getHeaderFromOptions(file);
    const defaultPrefixToken = getDictionaryTokens(dictionary)['pre-post-fix']?.['general-prefix'];
    const defaultPrefix = getTokenValue(defaultPrefixToken);
    const body = getAllTokens(dictionary)
      .map((prop) => ({ prop, tokenValue: getTokenValue(prop) }))
      .filter(({ tokenValue }) => (tokenValue !== defaultPrefix))
      .map(({ prop, tokenValue }) => {
        const basePrefix = prop['general-prefix'] || defaultPrefix;
        const normalizedValue = tokenValue === 'a' ? 'a-' : tokenValue;
        return `const $${prop.name} = '${basePrefix}${normalizedValue}';${prop.comment ? ` // ${prop.comment}` : ''}\nmodule.exports.$${prop.name} = $${prop.name};`;
      })
      .join('\n');
    return `${header}${body}\n//\n// JS block names\n`;
  });

  registerFormatDual('js/js-block-names-for-styleguide', ({ dictionary, file = {} }) => {
    const header = getHeaderFromOptions(file);
    const defaultPrefixToken = getDictionaryTokens(dictionary)['pre-post-fix']?.['general-prefix'];
    const defaultPrefix = getTokenValue(defaultPrefixToken);
    const body = getAllTokens(dictionary)
      .map((prop) => ({ prop, tokenValue: getTokenValue(prop) }))
      .filter(({ tokenValue }) => (tokenValue !== defaultPrefix))
      .map(({ prop }) => `${prop.name}: require('../../lib/index.js').${prop.name},`)
      .join('\n');
    return `${header}{\n${body}\nuiMerge: require('../../lib/index.js').uiMerge,\n\nenv: process.env\n}\n\n\n//\n// JS block names\n`;
  });
}


// eslint-disable-next-line no-console

async function buildTokens() {
  console.log('\nDestination token library building process is started...');
  for (const tokenFolder of buildList) {
    const folderData = tokenFolders[tokenFolder] || [];
    for (const tokenData of folderData) {
      console.log(`\nProcessing: ${tokenFolder}`);
      const StyleDictionary = new StyleDictionaryPackage(tokenData);
      if (StyleDictionary.hasInitialized) {
        await StyleDictionary.hasInitialized;
      }
      if (typeof StyleDictionary.buildAllPlatforms === 'function') {
        await StyleDictionary.buildAllPlatforms();
      }
    }
  }
}

async function startBuild() {
  try {
    await loadStyleDictionary();
  } catch (error) {
    console.error('Failed to load Style Dictionary', error);
    process.exit(1);
  }

  jsonConcat({ src: acssFilesList(PROPERTIES_PATH), dest: null }, async function(err, json) {
    if (err) {
      console.error('Failed to read ACSS files', err);
      process.exit(1);
    }
    acssList = _.values(json);
    tokenFolders = makeTokenFolders();
    styleDictionaryRegistration();
    try {
      await removeCssDir();
      await removeJsDir();
      await buildTokens();
    } catch (error) {
      console.error('Dictionary build failed', error);
      process.exit(1);
    }
  });
}

startBuild();

function removeCssDir() {
  return new Promise((resolve, reject) => {
    rimraf(SCSS_PATH, function rmScss(err) {
      if (err) {
        console.error('Failed to remove SCSS dictionary output', err);
        reject(err);
        return;
      }
      console.log('removed SCSS dictionary output');
      resolve();
    });
  });
}

function removeJsDir() {
  return new Promise((resolve, reject) => {
    rimraf(JS_PATH, function rmJs(err) {
      if (err) {
        console.error('Failed to remove JS dictionary output', err);
        reject(err);
        return;
      }
      console.log('removed JS dictionary output');
      resolve();
    });
  });
}
