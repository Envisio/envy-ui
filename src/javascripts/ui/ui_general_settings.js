import color from '../colors';

/**
 * Visual settings for UI elements.
 * @type {Object}
 * @property {{fontSizeValue: string, fontColor: string}} title - Settings for titles.
 * @property {{fontSizeValue: string, fontColor: string}} subtitle - Settings for subtitles.
 */
export const visualSettings = {
  title: {
    fontSizeValue: '18',
    fontColor: color.default,
  },
  subtitle: {
    fontSizeValue: '14',
    fontColor: color.mediumGray,
  },
};

/**
 * Common MIME types.
 * @type {Object<string,string>}
 */
export const mimeTypes = {
  png: 'image/png',
  pdf: 'application/pdf',
  svg: 'image/svg+xml',
};

/**
 * Mapping of status labels to modifier class suffixes.
 * @type {Record<string,string>}
 */
export const statusModifiers = {
  Completed: '--status-completed',
  'On Track': '--status-on-track',
  'Some Disruption': '--status-minor-disruption',
  'Major Disruption': '--status-major-disruption',
  Discontinued: '--status-discontinued',
  discontinued: '--status-discontinued',
  Upcoming: '--status-upcoming',
  'Status Pending': '--status-pending',
};

/**
 * Mapping of status labels to background color classes.
 * @type {Record<string,string>}
 */
export const statusBgColors = {
  Completed: 'color-bg-completed',
  'On Track': 'color-bg-on-track',
  'Some Disruption': 'color-bg-minor-disruption',
  'Major Disruption': 'color-bg-major-disruption',
  Discontinued: 'color-bg-discontinued',
  discontinued: 'color-bg-discontinued',
  Upcoming: 'color-bg-upcoming',
  'Status Pending': 'color-bg-status-pending',
};

/**
 * Mapping of status labels to hex color values.
 * @type {Record<string,string>}
 */
export const statusHexColors = {
  Completed: color.completed,
  'On Track': color.onTrack,
  'Some Disruption': color.minorDisruption,
  'Major Disruption': color.majorDisruption,
  Discontinued: color.discontinued,
  discontinued: color.discontinued,
  Upcoming: color.upcoming,
  'Status Pending': color.statusPending,
};
