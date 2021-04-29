const getViewports = ({ height = 1000 }) => (
  console.log(`Viewport height: ${height}`),
  [{
    label: "desktop",
    width: 1600,
    height,
  }]
);

const sections = [
  {
    section: 'section-checkbox',
    label: 'EDS Checkbox',
    misMatchThreshold : 0.1,
    isActive: true,
    viewports: getViewports({height: 2400}),
  },
  {
    section: 'section-button',
    label: 'EDS Button',
    misMatchThreshold : 1.75,
    viewports: getViewports({height: 11000}),
  },
  {
    section: 'section-button-switch',
    label: 'EDS Button Switch',
    viewports: getViewports({height: 1450}),
  },
  {
    section: 'section-calendar',
    label: 'EDS Calendar',
    viewports: getViewports({height: 1400}),
  },
  {
    section: 'section-input-text',
    label: 'EDS Input Text',
    viewports: getViewports({height: 2200}),
  },
  {
    section: 'section-select',
    label: 'EDS Select',
    viewports: getViewports({height: 1550}),
  },
  {
    section: 'section-input-group',
    label: 'EDS Input Group',
    viewports: getViewports({height: 2400}),
  },
  {
    section: 'section-form-row',
    label: 'EDS Form Row',
    viewports: getViewports({height: 1300}),
  },
  {
    section: 'section-card',
    label: 'EDS Card',
    viewports: getViewports({height: 5300}),
  },
  {
    section: 'section-modal',
    label: 'EDS Modal',
    viewports: getViewports({height: 2000}),
  },
  {
    section: 'section-view',
    label: 'EDS View',
    viewports: getViewports({height: 700}),
  },
  {
    section: 'section-bottom-toolbar',
    label: 'EDS Bottom Toolbar',
    viewports: getViewports({height: 1100}),
  },
  {
    section: 'section-overlay',
    label: 'EDS Overlay',
    viewports: getViewports({height: 1550}),
  },
  {
    section: 'section-badge',
    label: 'EDS Badge',
    viewports: getViewports({height: 3600}),
  },
];

const sharedScenarioData = {
  "readyEvent": "",
  "readySelector": "",
  "delay": 0,
  "hideSelectors": [],
  "removeSelectors": [],
  "hoverSelector": "",
  "clickSelector": "",
  "postInteractionWait": 0,
  "selectors": ["#kss-main"],
  "selectorExpansion": false,
  "expect": 0,
  "requireSameDimensions": false
}

const getURLS = ({section = ''}) => (
  {
    "url": `http://localhost:5000/dist/styleguide/${section}.html`,
    // "url": `http://envisio-styleguide.surge.sh/styleguide/${section}.html`,
    "referenceUrl": `http://envisio-styleguide.surge.sh/styleguide/${section}.html`,
  }
);

module.exports = () => ({
  id: `envisio_styleguide`,
  "viewports": [],
  "onBeforeScript": "puppet/onBefore.js",
  "onReadyScript": "puppet/onReady.js",
  "scenarios": sections.filter(({isActive = true}) => isActive).map(
    ({
      label = '',
      misMatchThreshold = '0.1',
      section = '',
      onBeforeScript = "puppet/onBeforeCustom.js",
      onReadyScript = "puppet/onBeforeCustom.js",
      viewports = getViewports({}),
    }) => (
      {
        label,
        misMatchThreshold,
        viewports,
        onBeforeScript,
        onReadyScript,
        ...getURLS({section : section}),
        ...sharedScenarioData,
      }
    ),
  ),
  "paths": {
    "bitmaps_reference": `backstop_data/bitmaps_reference`,
    "bitmaps_test": `backstop_data/bitmaps_test`,
    "engine_scripts": `backstop_data/engine_scripts`,
    "html_report": `./backstop_data/html_report`,
    "ci_report": `backstop_data/ci_report`,
  },
  "report": ["browser"],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox"]
  },
  "asyncCaptureLimit": 5,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
});
