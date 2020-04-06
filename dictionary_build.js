const rimraf = require('rimraf');
const StyleDictionaryPackage = require('style-dictionary');
const _ = require('lodash');
const jsonConcat = require('json-concat');

const { filterForCategory, filterForFragmentAndUnits } = require('./src/dictionary/_filters.js');
const { acssFilesList } = require('./src/dictionary/_acss_files_list.js');
// const { acssList } = require('./_acss_list.js');
let acssList = [];
let tokenFolders;
const { getFragmentIterator, getFragmentUnit, getUnitNameFromAlias, getMarkupFile } = require('./src/dictionary/_getters.js');

const SCSS_PATH = './src/stylesheets/from-dictionary/';
const JS_PATH = './src/javascripts/from-dictionary/';
const PROPERTIES_PATH = './src/dictionary/properties/'
const STYLEGUIDE_PUG_PATH = './styleguide/homepage/from-dictionary/';
const COLOR = 'color';
const PREFIX_BLOCK_NAME_JS = '$ui';
const PREFIX_GENERAL_CSS = 'env-';

const buildList = [
  COLOR,
  'block-name',
];

function fileHeader(options, commentStyle) {
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
          transformGroup: 'scss',
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
            header: 'Color Palette\n\nColors:',
            destination: '_color-kss.scss',
            format: 'scss/variables-color-kss',
          }],
        },
        js: {
          transformGroup: 'js',
          prefix: 'UI',
          buildPath: `${JS_PATH}`,
          transforms: ['name/cti/constant'],
          files: [{
            destination: 'color.js',
            format: 'javascript/es6',
          }],
        },
      },
    }, {
      source: [
        `${PROPERTIES_PATH}${COLOR}/base.json`,
      ],
      platforms: {
        scss: {
          transformGroup: 'scss',
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
  'block-name': [
    {
      source: [
        `${PROPERTIES_PATH}**/*.json`,
      ],
      platforms: {
        scss: {
          transformGroup: 'scss',
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
            // console.log('++++++++++++++++++++++++++++++++++++++++',
            // acssGroupArr.map((acssClassFragment, index) => ({
            //   destination: `_acss-${acssMainClassFragment}${acssClassFragment.content}${getUnitNameFromAlias(getFragmentUnit(acssMainClassFragment, acssClassFragment))}-kss.scss`,
            //   format: 'scss/acss-kss',
            //   filter: filterForCategory(`acss-${acssMainClassFragment}`),
            //   filterForClassFragment: acssClassFragment.content,
            //   menu: acssClassFragment.menu,
            //   weightCounter: index + 1,
            //   }))
            // );

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
          transformGroup: 'js',
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
  // 'block-name-imports': [
  //   {
  //     source: [
  //       '${PROPERTIES_PATH}block/*.json',
  //     ],
  //     include: [
  //       `${PROPERTIES_PATH}${COLOR}/base.json`,
  //     ],
  //     platforms: {
  //       scss: {
  //         transformGroup: 'scss',
  //         buildPath: `${SCSS_PATH}block-name/`,
  //         files: [{
  //           destination: '_block-name-imports.scss',
  //           format: 'scss/scss-block-name-imports',
  //         }],
  //       },
  //     },
  //   },
  // ],

});

// pre-defined formats, transforms and transform
// eslint-disable-next-line no-console
// console.log(StyleDictionaryPackage);

// StyleDictionaryPackage.registerTransform({
//   name: 'content/dqToSq',
//   type: 'value',
//   matcher: function(prop) {
//     return prop.value.match(/"/g);
//   },
//   transformer: function(prop) {
//       console.log('---------------------------------found');
//       return prop.value.replace(/"/g, "'");
//   }
// });

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
      // console.log(dictionary.allProperties);
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

      const extractedFragment = dictionaryMeat.fragments.filter(fragment => filterForFragmentAndUnits(fragment, that))[0];
      // eslint-disable-next-line prefer-template
      return `// ${header}` +
        '\n// ' +
        setMainDescription(`${this.menu}`) +
        setMarkup(getMarkupFile(dictionaryMeat, extractedFragment)) +
        '\n// ' +
        dictionary.allProperties.map(prop =>
          prop.fragments
            .filter((fragment) => (filterForFragmentAndUnits(fragment, that)))
            .map((fragment) => {
              return Object.keys(getFragmentIterator(prop, fragment)).map((iteratorKey) =>
                `.env-a${prop['ignore-main-fragment'] ? '' : '-' + prop['main-fragment']}${fragment.content}-${iteratorKey}${getFragmentUnit(prop, fragment)}${fragment['test-extension'] || ''}${setDescription(fragment.description)}`)
              .join('\n// ');
            })
          .join('\n// ')) +
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
        // dictionary.allProperties.map(prop =>
        //   prop.fragments
        //     .filter((fragment) => fragment.content === this.filterForClassFragment)
        //     .map((fragment) => {
        //       return Object.keys(prop.value).map(colorName =>
        //         `.env-a-${prop['main-fragment']}${fragment.content}-${colorName}${fragment['test-extension']}`)
        //       .join('\n// ');
        //     })
        //   .join('\n// ')) +
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
        .map((prop) => (`@import '../../${prop.value === 'a' ? '' : 'blocks/'}${prop.path[1]}/index';`))
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
        return `@import "acss-${mainPart}-main-menu-kss";\n` + fragment.fragments.map((element) => `@import "acss-${mainPart}${element.content}${getUnitNameFromAlias(element.unit)}-kss";`).join('\n');
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
      return header + `import getBlock from '../ui/get_block';\n\n` +
        dictionary.allProperties
          .filter((prop) => (prop.value !== defaultPrefix))
          .map((prop) => `export const $${prop.name} = '${prop['general-prefix'] || defaultPrefix}${prop.value === 'a' ? 'a-' : prop.value}';\n`
            + `export const ${prop.name} = getBlock('${prop['general-prefix'] || defaultPrefix}${prop.value === 'a' ? 'a-' : prop.value}');${prop.comment ? ` // ${prop.comment}` : ''}`)
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
          .map((prop) => `export const $${prop.name} = '${prop['general-prefix'] || defaultPrefix}${prop.value === 'a' ? 'a-' : prop.value}';${prop.comment ? ` // ${prop.comment}` : ''}`)
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
