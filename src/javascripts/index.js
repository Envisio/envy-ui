import { isFunction, partial } from 'lodash';
import { detect } from 'detect-browser';
export { useResizeDetector } from 'react-resize-detector';
// import useResizeDetector from 'react-resize-detector';
export { default as ellipsis } from 'smart-truncate';

// import { $ui } from './ui/ui_names';
// import getBlock from './ui/get_block';

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

// // Abstract Library
// export const uiA = getBlock($ui.A);
// // Forms
// export const uiForm = getBlock($ui.Form);
// export const uiFormRow = getBlock($ui.FormRow);
// // Table
// export const uiTable = getBlock($ui.Table);
// // Containers
// export const uiPanel = getBlock($ui.Panel);
// export const uiCard = getBlock($ui.Card);
// export const uiWrapperScroll = getBlock($ui.WrapperScroll);
// export const uiInfo = getBlock($ui.Info);
// // Buttons & controls
// export const uiButton = getBlock($ui.Button);
// export const uiButtonSwitch = getBlock($ui.ButtonSwitch);
// export const uiCheckbox = getBlock($ui.Checkbox);
// export const uiCalendar = getBlock($ui.Calendar);
// // Inputs
// export const uiInputCollapse = getBlock($ui.InputCollapse);
// export const uiCollapser = getBlock($ui.Collapser);
// export const uiInputText = getBlock($ui.InputText);
// export const uiSelect = getBlock($ui.Select);
// export const uiInputGroup = getBlock($ui.InputGroup);
// // Menus
// export const uiMenuDropdown = getBlock($ui.MenuDropdown);
// export const uiMenuFolder = getBlock($ui.MenuFolder);
// // Others
// export const uiVisual = getBlock($ui.Visual);
// export const uiShowOnHover = getBlock($ui.ShowOnHover);
// export const uiFocus = getBlock($ui.Focus);

// export const uiIconStack = getBlock($ui.IconStack);
// export const uiIconSvg = getBlock($ui.IconSvg);

// export const uiBadge = getBlock($ui.Badge);
// export const uiAlert = getBlock($ui.Alert);

// export const uiLoader = getBlock($ui.Loader);

// export const uiAutosizeInput = getBlock($ui.AutosizeInput);

export const getClassActive = (...params) => {
  let [classFragment, statement] = params;

  if (typeof classFragment !== 'string') {
    statement = classFragment;
    classFragment = '';
  }

  return statement ? `${classFragment}active` : '';
};

// export { uiGp } from './ui/ui_names';
export { default as getBestPosition } from './ui/get_best_position';
export { default as checkOverflow } from './ui/check_overflow';
export { default as makeMq } from './ui/make_mq';
// export const uiS3Uploader = getBlock($ui.S3Uploader);
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
