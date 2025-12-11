const rimraf = require('rimraf');
const StyleDictionaryPackage = require('style-dictionary');
const _ = require('lodash');
const jsonConcat = require('json-concat');

// Load DTCG bridge transforms
require('./scripts/style-dictionary-dtcg.js');

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
            mapName: 'a-color',
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
            "mapName": "tokens-button",
            filter: filterForCategory(['button']),
            destination: '_button.scss',
            format: 'scss/map-deep',
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
          transformGroup: 'dtcg/scss',
          prefix: '$ui',
          buildPath: `${SCSS_PATH}block-name/`,
          transforms: ['name/ti/camel'],
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
          transformGroup: 'dtcg/js',
          prefix: 'ui',
          buildPath: `${JS_PATH}`,
          transforms: ['name/ti/camel'],
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

  StyleDictionaryPackage.registerTransform({
    name: 'name/ti/kebab',
    type: 'name',
    transformer: function(prop, options) {
        var path = prop.path.slice(1);
        return _.kebabCase([options.prefix].concat(path).join(' '));
    }
  });

  StyleDictionaryPackage.registerFormat({
    name: 'scss/variables-color-pug',
    formatter(dictionary, config) {
      const header = this.header.split('\n').map(line => `${line}`).join('\n');
      // eslint-disable-next-line prefer-template
      return header + '\n' + '- var colorClasses = [' +
        dictionary.allProperties.map(prop => `"${prop.path[1]}"`).join(', ') + ']\n// -\n// - Styleguide homepage color-palette\n';
    }
  });

  StyleDictionaryPackage.registerFormat({
    name: 'scss/variables-color-kss',
    formatter(dictionary, config) {
      const header = this.header.split('\n').map(line => `// ${line}`).join('\n');

      // eslint-disable-next-line prefer-template
      return header + '\n// ' +
        dictionary.allProperties.map(prop => `"${prop.name}": ${prop.value}`).join('\n// ') + '\n//\n// Styleguide color-palette\n';
    }
  });

  StyleDictionaryPackage.registerFormat({
    name: 'scss/acss-kss',
    formatter(dictionary, config) {
      const dictionaryMeat = dictionary.allProperties[0];
      const { weightCounter } = this;
      const setMarkup = markUpFileName => markUpFileName ? `\n// Markup:\n// ${markUpFileName}\n//` : '';
      const setMainDescription = description => description ? `\n// ${description}\n//` : '';
      const setDescription = description => description ? ` - ${description}` : '';
      const setWeight = weight => weight ? `\n//\n// Weight: ${weight + weightCounter}\n//` : '';
      const header = this.menu;
      const that = this;

      // Safety check for DTCG compatibility
      if (!dictionaryMeat || !dictionaryMeat.fragments) {
        return `// ${header}\n// No fragments available for ACSS generation (DTCG format limitation)\n`;
      }

      // Handle both array and object formats for fragments
      let fragments;
      if (Array.isArray(dictionaryMeat.fragments)) {
        fragments = dictionaryMeat.fragments;
      } else if (typeof dictionaryMeat.fragments === 'object') {
        // Convert object to array of fragments
        fragments = Object.values(dictionaryMeat.fragments);
      } else {
        return `// ${header}\n// Invalid fragments structure (DTCG format limitation)\n`;
      }

      const extractedFragment = fragments.filter(fragment => filterForFragmentAndUnits(fragment, that))[0];
      // eslint-disable-next-line prefer-template
      return `// ${header}` +
        '\n// ' +
        setMainDescription(`${this.menu}`) +
        setMarkup(getMarkupFile(dictionaryMeat, extractedFragment)) +
        '\n// ' +
        dictionary.allProperties.map(prop => {
          // Handle fragments for individual properties
          let propFragments;
          if (!prop.fragments) {
            return `// No fragments for ${prop.name || 'property'}`;
          } else if (Array.isArray(prop.fragments)) {
            propFragments = prop.fragments;
          } else if (typeof prop.fragments === 'object') {
            propFragments = Object.values(prop.fragments);
          } else {
            return `// Invalid fragment structure for ${prop.name || 'property'}`;
          }

          return propFragments
            .filter((fragment) => (filterForFragmentAndUnits(fragment, that)))
            .map((fragment) => {
              return Object.keys(getFragmentIterator(prop, fragment)).map((iteratorKey) =>
                `.env-a${prop['ignore-main-fragment'] ? '' : '-' + prop['main-fragment']}${fragment.content}${iteratorKey === "null" ? '' : '-' + iteratorKey}${getFragmentUnit(prop, fragment)}${fragment['test-extension'] || ''}${setDescription(fragment.description)}`)
              .join('\n// ');
            })
            .join('\n// ')
        }) +
          setWeight(dictionaryMeat['menu-weight']) +
          `\n// Styleguide ${dictionaryMeat['text-label']} - ${header}\n`;
    },
  });

  StyleDictionaryPackage.registerFormat({
    name: 'scss/acss-main-menu-kss',
    formatter(dictionary, config) {
      const dictionaryMeat = dictionary.allProperties[0];
      const setMainDescription = description => description ? `\n// ${description}\n//` : '';
      const setWeight = weight => weight ? `\n// Weight: ${weight}\n//` : '';
      const header = `${dictionaryMeat['text-label']}`;

      // eslint-disable-next-line prefer-template
      return `// ${header}` +
        '\n//' +
        setMainDescription(`${dictionaryMeat.description}`) +
          setWeight(dictionaryMeat['menu-weight']) +
          `\n// Styleguide ${header}\n`;
    },
  });

  StyleDictionaryPackage.registerFormat({
    name: 'scss/scss-variables-block-name',
    formatter(dictionary, config) {
      const header = fileHeader(this.options);
      const defaultPrefix = dictionary.properties['pre-post-fix']['general-prefix'].value;

      // eslint-disable-next-line prefer-template
      return header +
      dictionary.allProperties
        .filter((prop) => (prop.value !== defaultPrefix))
        .map((prop) => (`$${prop.name}: "${defaultPrefix}${prop.value}";${prop.comment ? ` // ${prop.comment}` : ''}`))
        .join('\n')
        + '\n//\n// SCSS block names\n';
    },
  });

  StyleDictionaryPackage.registerFormat({
    name: 'scss/scss-block-name-imports',
    formatter(dictionary, config) {
      const header = fileHeader(this.options);

      // eslint-disable-next-line prefer-template
      return header +
      dictionary.allProperties
        .map((prop) => (`@use '../../../src/stylesheets/${prop.value === 'a' ? '' : 'blocks/'}${prop.path[1]}/index' as *;`))
        .join('\n')
        + '\n//\n// SCSS block name imports\n';
    },
  });

  StyleDictionaryPackage.registerFormat({
    name: 'scss/scss-acss-imports',
    formatter(dictionary, config) {
      const header = fileHeader(this.options);

      const mainFragments = this.fragments.map((fragment) => fragment['main-fragment']);

      return header +
      this.fragments.map((fragment) => {
        const mainPart = fragment['main-fragment'];
        return `@use "acss-${mainPart}-main-menu-kss" as *;\n` + fragment.fragments.map((element) => `@use "acss-${mainPart}${element.content}${getUnitNameFromAlias(element.unit)}-kss" as *;`).join('\n');
      }).join('\n')
        + '\n//\n// ACSS imports\n';
    },
  });

  StyleDictionaryPackage.registerFormat({
    name: 'js/js-variables-block-names',
    formatter(dictionary, config) {
      const header = fileHeader(this.options);
      const defaultPrefix = dictionary.properties['pre-post-fix']['general-prefix'].value;

      // eslint-disable-next-line prefer-template
      return header + `const getBlock = require('../../lib/ui/get_block').default;\n\n` +
        dictionary.allProperties
          .filter((prop) => (prop.value !== defaultPrefix))
          .map((prop) => `const $${prop.name} = '${prop['general-prefix'] || defaultPrefix}${prop.value === 'a' ? 'a-' : prop.value}';\n`
            + `const ${prop.name} = getBlock('${prop['general-prefix'] || defaultPrefix}${prop.value === 'a' ? 'a-' : prop.value}');${prop.comment ? ` // ${prop.comment}` : ''}\n`
            + `module.exports.$${prop.name} = $${prop.name};\n`
            + `module.exports.${prop.name} = ${prop.name};`)
          .join('\n')
          + '\n//\n// JS block names\n';
    },
  });

  StyleDictionaryPackage.registerFormat({
    name: 'js/js-variables-raw-names',
    formatter(dictionary, config) {
      const header = fileHeader(this.options);
      const defaultPrefix = dictionary.properties['pre-post-fix']['general-prefix'].value;

      // eslint-disable-next-line prefer-template
      return header +
        dictionary.allProperties
          .filter((prop) => (prop.value !== defaultPrefix))
          .map((prop) => `const $${prop.name} = '${prop['general-prefix'] || defaultPrefix}${prop.value === 'a' ? 'a-' : prop.value}';${prop.comment ? ` // ${prop.comment}` : ''}\nmodule.exports.$${prop.name} = $${prop.name};`)
          .join('\n')
          + '\n//\n// JS block names\n';
    },
  });

  StyleDictionaryPackage.registerFormat({
    name: 'js/js-block-names-for-styleguide',
    formatter(dictionary, config) {
      const header = fileHeader(this.options);
      const defaultPrefix = dictionary.properties['pre-post-fix']['general-prefix'].value;

      // eslint-disable-next-line prefer-template
      return header + `{\n` +
        dictionary.allProperties
          .filter((prop) => (prop.value !== defaultPrefix))
          .map((prop) => `${prop.name}: require('../../lib/index.js').${prop.name},`)
          .join('\n')
          + `\nuiMerge: require('../../lib/index.js').uiMerge,\n`
          + `\nenv: process.env\n}\n\n`
          + '\n//\n// JS block names\n';
    },
  });
}


// eslint-disable-next-line no-console

function buildTokens() {
  console.log('\nDestination token library building process is started...');
  buildList.map((tokenFolder) => {
    tokenFolders[tokenFolder].map((tokenData) => {
      // eslint-disable-next-line no-console
      console.log(`\nProcessing: ${tokenFolder}`);
      const StyleDictionary = StyleDictionaryPackage.extend(tokenData);
      StyleDictionary.buildAllPlatforms();
      return null;
    });

    return null;
  });
}

jsonConcat({ src: acssFilesList(PROPERTIES_PATH), dest: null }, function(err, json) {
  acssList = _.values(json);
  tokenFolders = makeTokenFolders();
  styleDictionaryRegistration();
  removeCssDir();
});

function removeCssDir() {
  rimraf(SCSS_PATH, function rmScss() { console.log('removed SCSS dictionary output'); removeJsDir();});
}

function removeJsDir() {
  rimraf(JS_PATH, function rmJs() { console.log('removed JS dictionary output'); buildTokens(); });
}
