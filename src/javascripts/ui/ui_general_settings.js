import color from '../colors';

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

export const mimeTypes = {
  png: 'image/png',
  pdf: 'application/pdf',
  svg: 'image/svg+xml',
};

export const statusModifiers = {
  Completed: '--status-completed',
  'On Track': '--status-on-track',
  'Some Disruption': '--status-minor-disruption',
  'Major Disruption': '--status-major-disruption',
  Discontinued: '--status-discontinued',
  Upcoming: '--status-upcoming',
  'Status Pending': '--status-pending',
};
