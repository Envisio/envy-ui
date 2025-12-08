export type UiTemplateTag = (strings: TemplateStringsArray, ...predicates: unknown[]) => string;
export type UiClassArgument = string | UiTemplateTag;
export type UiClassInput = UiClassArgument | UiClassArgument[];

export function ui(classNames: UiClassInput): { className: string };
export function uiMerge(classNames: UiClassInput): string;
export function getClassActive(classFragment?: string, statement?: boolean): string;
export const browserName: string;

export { useResizeDetector } from 'react-resize-detector';
export { default as ellipsis } from 'smart-truncate';

export { default as getBestPosition } from './lib/ui/get_best_position';
export { default as checkOverflow } from './lib/ui/check_overflow';
export { default as makeMq } from './lib/ui/make_mq';
export { visualSettings, statusModifiers, statusBgColors, statusHexColors } from './lib/ui/ui_general_settings';
export { contrastColor, isTextLight, rgba2hex } from './lib/utils/contrast_color';
export { styleObjectToString } from './lib/utils/style_object_to_string';

export { default as Scrollbar, OverlayScroll } from './lib/react_components/scrollbar';
export { default as Portal } from './lib/react_components/portal';
export { default as Tooltip } from './lib/react_components/tooltip';
export { default as CheckboxWrapper } from './lib/react_wrappers/checkbox_wrapper';
export { default as FlexScrollbarWrapper } from './lib/react_wrappers/flex_scrollbar_wrapper';
export { default as useMediaQuery } from './lib/react_hooks/use_mq';
export { default as uiTest } from './lib/ui/ui_test';

export * from './from-dictionary/javascripts/block_name';
export * from './from-dictionary/javascripts/color';
export * from './from-dictionary/javascripts/z';
export * from './lib/react_select/rs_dropdown_menu';
export * from './lib/react_select/rs_select';
export * from './lib/react_select/rs_color_picker';
