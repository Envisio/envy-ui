export type DetectedBrowser = {
  name: string;
  version: string;
  os: string;
  type: string;
  bot?: boolean;
};

export const detect = (): DetectedBrowser => ({
  name: 'mock-browser',
  version: '0.0.0',
  os: 'unknown',
  type: 'browser'
});
