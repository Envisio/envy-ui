# Envy UI Design System

> A modern, atomic CSS design system with semantic component blocks and utility classes.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Design Tokens](#design-tokens)
- [Component System](#component-system)
- [Utility Classes](#utility-classes)
- [Figma Integration](#figma-integration)
- [Development Workflow](#development-workflow)
- [Migration Guide](#migration-guide)
- [API Reference](#api-reference)

## Overview

Envy UI is a hybrid design system that combines the best of both worlds:
- **Semantic component blocks** for consistent, maintainable UI patterns
- **Atomic utility classes** for flexible layout and spacing
- **Design token integration** with W3C DTCG standard compliance
- **Figma-to-code automation** for seamless design handoff

### Key Benefits

✅ **Semantic & Maintainable**: `uiButton uiButton--mint-blue` tells you exactly what it is  
✅ **Flexible Utilities**: `f f-gap-4 f-align-center` for precise layout control  
✅ **Design Token Powered**: Consistent colors, spacing, and typography  
✅ **Figma Integration**: Direct design-to-code workflow with metadata storage  
✅ **Performance Optimized**: Only includes CSS for components you use  

## Architecture

### Hybrid Approach

```html
<!-- Envy UI Component Pattern -->
<button class="uiButton uiButton--primary f f-gap-2 f-align-center">
  <svg class="uiIcon">...</svg>
  Button Text
</button>
```

Where:
- `uiButton` = **Block** (base component styling)
- `uiButton--primary` = **Modifier** (variant styling)
- `f f-gap-2 f-align-center` = **Utilities** (layout helpers)

### File Structure

```
src/stylesheets/
├── ui.scss                    # Main entry point
├── blocks/                    # Component blocks
│   ├── button2/               # Button component
│   ├── card/                  # Card component
│   └── modal/                 # Modal component
├── utils/                     # Utility classes
│   ├── flex.scss             # Flexbox utilities (f, f-gap, etc.)
│   ├── spacing.scss          # Margin/padding utilities
│   └── typography.scss       # Text utilities
├── custom-properties/         # Design tokens
│   ├── colors.scss           # Color tokens
│   ├── spacing.scss          # Spacing scale
│   └── typography.scss       # Font tokens
└── reset/                    # Base styles
```

## Getting Started

### Installation

```bash
# Install Envy UI
npm install @envisio/envy-ui

# Install peer dependencies
npm install style-dictionary
```

### Basic Setup

```scss
// Import Envy UI
@import '@envisio/envy-ui/src/stylesheets/ui.scss';

// Your custom overrides
:root {
  --color-brand-primary: #your-brand-color;
}
```

### Build Process

```javascript
// Build design tokens
npm run build-tokens

// Build CSS
npm run build-css

// Watch for changes
npm run dev
```

## Design Tokens

### W3C DTCG Format

Envy UI uses the W3C Design Tokens Community Group standard:

```json
{
  "color": {
    "brand": {
      "primary": {
        "$value": "#3b82f6",
        "$type": "color"
      }
    }
  },
  "spacing": {
    "scale": {
      "4": {
        "$value": "1rem",
        "$type": "dimension"
      }
    }
  }
}
```

### Token Categories

| Category | Prefix | Example |
|----------|--------|---------|
| **Colors** | `color-` | `--color-brand-primary` |
| **Spacing** | `spacing-` | `--spacing-scale-4` |
| **Typography** | `font-` | `--font-size-base` |
| **Borders** | `border-` | `--border-radius-md` |
| **Shadows** | `shadow-` | `--shadow-elevation-2` |

### Color System

```css
/* Semantic colors */
:root {
  --color-brand-primary: #3b82f6;
  --color-brand-secondary: #10b981;
  --color-neutral-50: #f9fafb;
  --color-neutral-900: #111827;
  
  /* Contextual colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
```

## Component System

### Button Component

#### Base Button
```html
<button class="uiButton">Default Button</button>
```

#### Button Variants
```html
<!-- Color variants -->
<button class="uiButton uiButton--primary">Primary</button>
<button class="uiButton uiButton--secondary">Secondary</button>
<button class="uiButton uiButton--mint-blue">Mint Blue</button>

<!-- Size variants -->
<button class="uiButton uiButton--small">Small</button>
<button class="uiButton uiButton--large">Large</button>

<!-- State variants -->
<button class="uiButton uiButton--loading">Loading</button>
<button class="uiButton" disabled>Disabled</button>

<!-- Shape variants -->
<button class="uiButton uiButton--circle">
  <svg class="uiIcon">...</svg>
</button>
```

#### Button with Utilities
```html
<button class="uiButton uiButton--primary f f-gap-2 f-align-center">
  <svg class="uiIcon">...</svg>
  Button with Icon
</button>
```

### Card Component

```html
<div class="uiCard">
  <div class="uiCard__header">
    <h3 class="uiCard__title">Card Title</h3>
  </div>
  <div class="uiCard__content">
    <p>Card content goes here...</p>
  </div>
  <div class="uiCard__actions f f-gap-2 f-justify-end">
    <button class="uiButton uiButton--secondary">Cancel</button>
    <button class="uiButton uiButton--primary">Confirm</button>
  </div>
</div>
```

### Modal Component

```html
<div class="uiModal" role="dialog" aria-labelledby="modal-title">
  <div class="uiModal__overlay"></div>
  <div class="uiModal__container">
    <div class="uiModal__header">
      <h2 id="modal-title" class="uiModal__title">Modal Title</h2>
      <button class="uiModal__close" aria-label="Close modal">×</button>
    </div>
    <div class="uiModal__content">
      <!-- Modal content -->
    </div>
  </div>
</div>
```

## Utility Classes

### Flexbox System

#### Display
```html
<div class="f">flex</div>
<div class="f-inline">inline-flex</div>
```

#### Direction
```html
<div class="f f-row">flex-direction: row</div>
<div class="f f-column">flex-direction: column</div>
```

#### Alignment
```html
<div class="f f-align-start">align-items: flex-start</div>
<div class="f f-align-center">align-items: center</div>
<div class="f f-align-end">align-items: flex-end</div>
<div class="f f-align-stretch">align-items: stretch</div>
```

#### Justification
```html
<div class="f f-justify-start">justify-content: flex-start</div>
<div class="f f-justify-center">justify-content: center</div>
<div class="f f-justify-end">justify-content: flex-end</div>
<div class="f f-justify-between">justify-content: space-between</div>
```

#### Gap
```html
<div class="f f-gap-1">gap: 0.25rem</div>
<div class="f f-gap-2">gap: 0.5rem</div>
<div class="f f-gap-4">gap: 1rem</div>
<div class="f f-gap-8">gap: 2rem</div>
```

### Spacing System

#### Margin
```html
<div class="m-0">margin: 0</div>
<div class="m-2">margin: 0.5rem</div>
<div class="m-auto">margin: auto</div>
<div class="mx-4">margin-left: 1rem; margin-right: 1rem</div>
<div class="my-2">margin-top: 0.5rem; margin-bottom: 0.5rem</div>
```

#### Padding
```html
<div class="p-0">padding: 0</div>
<div class="p-4">padding: 1rem</div>
<div class="px-6">padding-left: 1.5rem; padding-right: 1.5rem</div>
<div class="py-3">padding-top: 0.75rem; padding-bottom: 0.75rem</div>
```

### Typography

```html
<h1 class="uiHeading uiHeading--h1">Main Heading</h1>
<h2 class="uiHeading uiHeading--h2">Sub Heading</h2>
<p class="uiText">Regular text</p>
<p class="uiText uiText--muted">Muted text</p>
<p class="uiText uiText--small">Small text</p>
```

## Figma Integration

### Figma Plugin

Envy UI includes a Figma plugin for applying atomic CSS classes directly to designs:

1. **Select a frame** with auto-layout in Figma
2. **Run the Envy UI plugin** from the plugins menu
3. **Apply auto-layout classes** like `f f-gap-4 f-justify-between`
4. **Metadata is stored** in the Figma node for later code generation

#### Plugin Features
- Convert Figma auto-layout to Envy UI flexbox classes
- Store class metadata in Figma node data
- Generate clean semantic class combinations
- Support for gap, alignment, and direction properties

### VS Code Extension

Generate Envy UI code directly from Figma selections:

```bash
# Install the extension
code --install-extension envy-ui-figma-sync
```

#### Extension Commands
- `Ctrl+Shift+F`: Generate Envy UI code from Figma selection
- `Ctrl+Shift+T`: Convert Tailwind classes to Envy UI

#### Workflow
1. **Design in Figma** with auto-layout
2. **Apply Envy UI classes** via plugin (stores metadata)
3. **Select design in Figma**
4. **Press Ctrl+Shift+F in VS Code**
5. **Clean Envy UI code generated** at cursor position

## Development Workflow

### Component Development

#### 1. Create Component Block
```scss
// src/stylesheets/blocks/my-component/_my-component.scss
.uiMyComponent {
  // Base styles
  display: block;
  border-radius: var(--border-radius-md);
  
  // Modifiers
  &--variant {
    background-color: var(--color-brand-primary);
  }
  
  // States
  &:hover {
    opacity: 0.8;
  }
  
  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
}
```

#### 2. Add to Index
```scss
// src/stylesheets/blocks/_index.scss
@import 'my-component/my-component';
```

#### 3. Create Storybook Story
```javascript
// src/stories/MyComponent.stories.tsx
export default {
  title: 'Components/MyComponent',
  component: MyComponent,
};

export const Default = {
  args: {
    children: 'My Component',
  },
};

export const Variant = {
  args: {
    children: 'Variant Component',
    className: 'uiMyComponent--variant',
  },
};
```

### Utility Development

#### 1. Define Token
```json
// src/dictionary/properties/spacing.json
{
  "spacing": {
    "scale": {
      "12": {
        "$value": "3rem",
        "$type": "dimension"
      }
    }
  }
}
```

#### 2. Generate Utilities
```scss
// src/stylesheets/utils/_spacing.scss
@for $i from 0 through 12 {
  .p-#{$i} {
    padding: var(--spacing-scale-#{$i});
  }
  
  .m-#{$i} {
    margin: var(--spacing-scale-#{$i});
  }
}
```

### Build Process

```bash
# Development
npm run dev          # Watch and rebuild
npm run storybook    # Start Storybook

# Production
npm run build        # Build all assets
npm run build-tokens # Build design tokens only
npm run build-css    # Build CSS only

# Testing
npm run test         # Run tests
npm run lint         # Lint styles
```

## Migration Guide

### From Tailwind CSS

Use the built-in conversion utilities:

#### Automatic Conversion
```html
<!-- Before (Tailwind) -->
<div class="flex gap-4 items-center justify-between">

<!-- After (Envy UI) -->
<div class="f f-gap-4 f-align-center f-justify-between">
```

#### VS Code Extension
1. Select Tailwind classes in your code
2. Run "Convert Tailwind to Envy UI" command
3. Classes are automatically converted

#### Common Mappings
| Tailwind | Envy UI | Description |
|----------|---------|-------------|
| `flex` | `f` | Display flex |
| `flex-col` | `f-column` | Flex direction column |
| `items-center` | `f-align-center` | Align items center |
| `justify-between` | `f-justify-between` | Justify content space-between |
| `gap-4` | `f-gap-4` | Gap 1rem |
| `p-4` | `p-4` | Padding 1rem |
| `m-auto` | `m-auto` | Margin auto |

### From Bootstrap

#### Component Migration
```html
<!-- Bootstrap -->
<button class="btn btn-primary">Button</button>

<!-- Envy UI -->
<button class="uiButton uiButton--primary">Button</button>
```

#### Grid to Flexbox
```html
<!-- Bootstrap -->
<div class="row">
  <div class="col-md-6">Content</div>
  <div class="col-md-6">Content</div>
</div>

<!-- Envy UI -->
<div class="f f-gap-4">
  <div class="f-1">Content</div>
  <div class="f-1">Content</div>
</div>
```

### From Custom CSS

#### 1. Audit Current Components
```bash
# Find all CSS classes
grep -r "class=" src/ | sort | uniq
```

#### 2. Map to Envy UI Patterns
```css
/* Old custom CSS */
.my-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: blue;
}

/* New Envy UI approach */
/* Use: uiButton uiButton--primary f f-gap-2 f-align-center */
```

#### 3. Gradual Migration
- Start with utility classes (spacing, flexbox)
- Convert simple components to blocks
- Migrate complex components last

## API Reference

### CSS Custom Properties

#### Colors
```css
--color-brand-primary: #3b82f6;
--color-brand-secondary: #10b981;
--color-neutral-50: #f9fafb;
--color-neutral-900: #111827;
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
```

#### Spacing Scale
```css
--spacing-scale-0: 0;
--spacing-scale-1: 0.25rem;  /* 4px */
--spacing-scale-2: 0.5rem;   /* 8px */
--spacing-scale-3: 0.75rem;  /* 12px */
--spacing-scale-4: 1rem;     /* 16px */
--spacing-scale-5: 1.25rem;  /* 20px */
--spacing-scale-6: 1.5rem;   /* 24px */
--spacing-scale-8: 2rem;     /* 32px */
--spacing-scale-10: 2.5rem;  /* 40px */
--spacing-scale-12: 3rem;    /* 48px */
```

#### Typography Scale
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
```

#### Border Radius
```css
--border-radius-sm: 0.125rem;  /* 2px */
--border-radius-md: 0.375rem;  /* 6px */
--border-radius-lg: 0.5rem;    /* 8px */
--border-radius-xl: 0.75rem;   /* 12px */
--border-radius-full: 9999px;
```

### Component Classes

#### Button
```css
.uiButton                  /* Base button */
.uiButton--primary        /* Primary variant */
.uiButton--secondary      /* Secondary variant */
.uiButton--success        /* Success variant */
.uiButton--warning        /* Warning variant */
.uiButton--error          /* Error variant */
.uiButton--small          /* Small size */
.uiButton--large          /* Large size */
.uiButton--circle         /* Circle shape */
.uiButton--loading        /* Loading state */
```

#### Card
```css
.uiCard                   /* Base card */
.uiCard__header          /* Card header */
.uiCard__title           /* Card title */
.uiCard__content         /* Card content */
.uiCard__actions         /* Card actions */
.uiCard--elevated        /* Elevated variant */
.uiCard--bordered        /* Bordered variant */
```

#### Modal
```css
.uiModal                 /* Modal container */
.uiModal__overlay        /* Modal overlay */
.uiModal__container      /* Modal content container */
.uiModal__header         /* Modal header */
.uiModal__title          /* Modal title */
.uiModal__close          /* Modal close button */
.uiModal__content        /* Modal content */
.uiModal--small          /* Small modal */
.uiModal--large          /* Large modal */
```

### Utility Classes

#### Flexbox
```css
.f                       /* display: flex */
.f-inline               /* display: inline-flex */
.f-row                  /* flex-direction: row */
.f-column               /* flex-direction: column */
.f-wrap                 /* flex-wrap: wrap */
.f-nowrap               /* flex-wrap: nowrap */
.f-1                    /* flex: 1 */
.f-auto                 /* flex: auto */
.f-none                 /* flex: none */
.f-grow                 /* flex-grow: 1 */
.f-shrink               /* flex-shrink: 1 */
.f-shrink-0             /* flex-shrink: 0 */
```

#### Alignment
```css
.f-align-start          /* align-items: flex-start */
.f-align-center         /* align-items: center */
.f-align-end            /* align-items: flex-end */
.f-align-stretch        /* align-items: stretch */
.f-align-baseline       /* align-items: baseline */
```

#### Justification
```css
.f-justify-start        /* justify-content: flex-start */
.f-justify-center       /* justify-content: center */
.f-justify-end          /* justify-content: flex-end */
.f-justify-between      /* justify-content: space-between */
.f-justify-around       /* justify-content: space-around */
.f-justify-evenly       /* justify-content: space-evenly */
```

#### Gap
```css
.f-gap-0                /* gap: 0 */
.f-gap-1                /* gap: 0.25rem */
.f-gap-2                /* gap: 0.5rem */
.f-gap-3                /* gap: 0.75rem */
.f-gap-4                /* gap: 1rem */
.f-gap-5                /* gap: 1.25rem */
.f-gap-6                /* gap: 1.5rem */
.f-gap-8                /* gap: 2rem */
```

#### Spacing
```css
/* Margin */
.m-0, .m-1, .m-2, .m-3, .m-4, .m-5, .m-6, .m-8, .m-10, .m-12
.mx-*, .my-*, .mt-*, .mr-*, .mb-*, .ml-*
.m-auto

/* Padding */
.p-0, .p-1, .p-2, .p-3, .p-4, .p-5, .p-6, .p-8, .p-10, .p-12
.px-*, .py-*, .pt-*, .pr-*, .pb-*, .pl-*
```

---

## Contributing

### Development Setup
```bash
git clone https://github.com/envisio/envy-ui.git
cd envy-ui
npm install
npm run dev
```

### Code Style
- Use semantic class names for components (`uiButton`, `uiCard`)
- Use short, descriptive names for utilities (`f`, `f-gap-4`)
- Follow BEM methodology for component modifiers
- Write comprehensive Storybook documentation

### Testing
```bash
npm run test           # Unit tests
npm run test:visual    # Visual regression tests
npm run lint           # CSS and JS linting
npm run a11y           # Accessibility tests
```

---

**Documentation Version**: 1.0.0  
**Last Updated**: December 2025  
**Envy UI Version**: 3.0.0+