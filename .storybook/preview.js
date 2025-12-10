import '../dist/css/ui.css';

// Load Source Sans Pro font
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

// Apply Source Sans Pro as default font to Storybook UI
const style = document.createElement('style');
style.textContent = `
  body, 
  .sb-main-padded, 
  .docs-story,
  .sbdocs,
  .sbdocs-content {
    font-family: 'Source Sans Pro', Arial, sans-serif !important;
  }
`;
document.head.appendChild(style);

/**
 * @type {import('@storybook/react').Preview}
 */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
