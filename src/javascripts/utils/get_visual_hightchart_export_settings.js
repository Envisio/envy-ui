import { eq, pick, map, cloneDeep, assign } from 'lodash';
import { visualSettings, mimeTypes } from '../settings';

export default function getVisualHightchartExportSettings({
  proportionsNode = null,
  mimeType = mimeTypes.png,
  titleText = '',
  titleFontSizeValue = visualSettings.title.fontSizeValue,
  titleColor = visualSettings,
  subtitleText = '',
  subtitleFontSizeValue = visualSettings.subtitle.fontSizeValue,
  subtitleColor = visualSettings.subtitle.fontColor,
  chartOptions = {},
} = {}) {
  const TEXT_BLOCK_HEIGHT_ADJUST = 1.8;
  const FONT_SIZE_DECREMENT = 1;
  const CHART_HEIGHT_INCREMENT = 70;
  const MIN_CHART_WIDTH = 100;
  const MIN_CHART_HEIGHT = 100;
  const chartSize = { width: 640, height: 480 };
  let exportOptions = {};

  if (proportionsNode) {
    const $proportionsNode = $(proportionsNode);
    const width = $proportionsNode.width();
    const height = $proportionsNode.height();
    chartSize.width = width > MIN_CHART_WIDTH ? width : MIN_CHART_WIDTH;
    chartSize.height = height > MIN_CHART_HEIGHT ? height : MIN_CHART_HEIGHT;
  }

  // if (eq(mimeType, mimeTypes.pdf)) {
  //   const darkStyle = { style: { color: '#222222', fontSize: '14px' } };
  //   const xAxisArr = pick(chartOptions, 'xAxis').xAxis;
  //   const yAxisArr = pick(chartOptions, 'yAxis').yAxis;

  //   const getAxisOptions = axis => map(cloneDeep(axis), (value) => {
  //     console.group('getAxisOptions');
  //     console.log('value: ', value);

  //     const newValue = cloneDeep(value);
  //     newValue.labels = assign(value.labels || {}, darkStyle);
  //     newValue.title = assign(value.title || {}, darkStyle);

  //     console.log('newValue', newValue);
  //     console.groupEnd();

  //     return newValue;
  //   });

  //   if (Array.isArray(xAxisArr) && Array.isArray(yAxisArr)) {
  //     exportOptions = { xAxis: getAxisOptions(xAxisArr), yAxis: getAxisOptions(yAxisArr) };
  //   }
  // }

  const getTextHeight = ({ textLength = 0, fontSize = 0 } = {}) => {
    return (
      textLength &&
      fontSize &&
      (fontSize * parseInt((textLength / ((chartSize.width / fontSize) * TEXT_BLOCK_HEIGHT_ADJUST)), 10))
    );
  };

  exportOptions.title = {
    text: titleText,
    style: {
      display: titleText.length ? 'block' : 'none',
      color: titleColor,
      fill: titleColor,
      fontSize: `${titleFontSizeValue - FONT_SIZE_DECREMENT}px`,
    },
    margin: 20,
    widthAdjust: 0,
  };

  exportOptions.subtitle = {
    text: subtitleText,
    style: {
      display: subtitleText.length ? 'block' : 'none',
      color: subtitleColor,
      fill: subtitleColor,
      fontSize: `${subtitleFontSizeValue - FONT_SIZE_DECREMENT}px`,
    },
    verticalAlign: 'bottom',
    margin: 10,
    widthAdjust: 0,
  };

  exportOptions.chart = {
    width: chartSize.width,
    height: chartSize.height +
    getTextHeight({ textLength: titleText.length, fontSize: titleFontSizeValue, containerWidth: chartSize.width }) +
    getTextHeight({ textLength: subtitleText.length, fontSize: subtitleFontSizeValue, containerWidth: chartSize.width }) +
    CHART_HEIGHT_INCREMENT,
  };

  return exportOptions;
}
