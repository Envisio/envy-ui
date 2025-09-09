import { isFunction, partial } from 'lodash';
import { detect } from 'detect-browser';
export { useResizeDetector } from 'react-resize-detector';
export { default as ellipsis } from 'smart-truncate';


const _classNameWrapper = value => ({ className: value });
const _noWrapper = value => value;

/**
 * Wraps a value or array of values into a className object or raw value.
 * @param {Function} wrapper - Function to wrap the value.
 * @param {string|string[]|Function} blocksElements - Elements or function returning elements.
 * @returns {object|string} Wrapped value.
 */
const _uiGeneric = (wrapper, blocksElements) => {
  if (isFunction(blocksElements)) {
    return wrapper(blocksElements``);
  }

  return wrapper(Array.isArray(blocksElements) ? blocksElements.join(' ') : blocksElements);
};

/**
 * Compose UI classes into a React spreadable props object.
 *
 * @param {string[]} classNames
 * @returns {{ className: string }}
 */
export const ui = partial(_uiGeneric, _classNameWrapper);

/**
 * Returns the raw value or joined string without wrapping.
 * @type {function(string|string[]|Function): string}
 */
export const uiMerge = partial(_uiGeneric, _noWrapper);

export * from './from-dictionary/block_name';
export * from './react_select/rs_dropdown_menu';
export * from './react_select/rs_select';
export * from './react_select/rs_color_picker';
export * from './from-dictionary/color';
export * from './from-dictionary/z';

/**
 * Returns 'active' class if statement is truthy.
 * @param {string} [classFragment] - Optional prefix class.
 * @param {boolean} statement - Condition for active class.
 * @returns {string} Active class string.
 */
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
