import { isFunction, partial } from 'lodash';
import { detect } from 'detect-browser';
export { useResizeDetector } from 'react-resize-detector';
export { default as ellipsis } from 'smart-truncate';


const _classNameWrapper = value => ({ className: value });
const _noWrapper = value => value;

const _uiGeneric = (wrapper, blocksElements) => {
  if (isFunction(blocksElements)) {
    return wrapper(blocksElements``);
  }

  return wrapper(Array.isArray(blocksElements) ? blocksElements.join(' ') : blocksElements);
};

export const ui = partial(_uiGeneric, _classNameWrapper);
export const uiMerge = partial(_uiGeneric, _noWrapper);

export * from './from-dictionary/block_name';
export * from './react_select/rs_dropdown_menu';
export * from './react_select/rs_select';
export * from './react_select/rs_color_picker';
export * from './from-dictionary/color';
export * from './from-dictionary/z';

export const getClassActive = (...params) => {
  let [classFragment, statement] = params;

  if (typeof classFragment !== 'string') {
    statement = classFragment;
    classFragment = '';
  }

  return statement ? `${classFragment}active` : '';
};

export { default as getBestPosition } from './ui/get_best_position';
export { default as checkOverflow } from './ui/check_overflow';
export { default as makeMq } from './ui/make_mq';
export { visualSettings, statusModifiers, statusBgColors, statusHexColors } from './ui/ui_general_settings';
export { contrastColor, isTextLight, rgba2hex } from './utils/contrast_color';
export { styleObjectToString } from './utils/style_object_to_string';

export { default as Scrollbar } from './react_components/scrollbar';
export { OverlayScroll } from './react_components/scrollbar';
export { default as Portal } from './react_components/portal';
export { default as Tooltip } from './react_components/tooltip';

export const { name: browserName } = detect();

export { default as CheckboxWrapper } from './react_wrappers/checkbox_wrapper';
export { default as FlexScrollbarWrapper } from './react_wrappers/flex_scrollbar_wrapper';

export { default as useMediaQuery } from './react_hooks/use_mq';

export { default as uiTest } from './ui/ui_test';
