# Container Component Documentation

Generated from DTCG tokens: `container-manifest.json`

## Component Properties

### Display

**flex**
- Description: Flexbox display with horizontal auto-layout
- CSS: `display: flex !important`
- Figma: `auto-layout-horizontal`
- Class: `f`

**flex-inline**
- Description: Inline flexbox display
- CSS: `display: inline-flex !important`
- Figma: `auto-layout-horizontal`
- Class: `f-inline`

**block**
- Description: Block display with fixed positioning
- CSS: `display: block !important`
- Figma: `fixed`
- Class: `block`

**grid**
- Description: CSS Grid display
- CSS: `display: grid !important`
- Figma: `auto-layout-grid`
- Class: `g`

### Direction

**row**
- Description: Horizontal flex direction (default)
- CSS: `flex-direction: row !important`
- Figma: `horizontal`
- Class: ``

**column**
- Description: Vertical flex direction
- CSS: `flex-direction: column !important`
- Figma: `vertical`
- Class: `f-column`

**row-reverse**
- Description: Horizontal flex direction reversed
- CSS: `flex-direction: row-reverse !important`
- Figma: `horizontal-reverse`
- Class: `f-row-reverse`

**column-reverse**
- Description: Vertical flex direction reversed
- CSS: `flex-direction: column-reverse !important`
- Figma: `vertical-reverse`
- Class: `f-column-reverse`

### Gap

**0**
- Description: No gap between items
- CSS: `gap: 0px !important`
- Figma: `0`
- Class: `f-gap-0`

**1**
- Description: 1px gap between items
- CSS: `gap: 1px !important`
- Figma: `1`
- Class: `f-gap-1`

**2**
- Description: 2px gap between items
- CSS: `gap: 2px !important`
- Figma: `2`
- Class: `f-gap-2`

**3**
- Description: 3px gap between items
- CSS: `gap: 3px !important`
- Figma: `3`
- Class: `f-gap-3`

**4**
- Description: 4px gap between items
- CSS: `gap: 4px !important`
- Figma: `4`
- Class: `f-gap-4`

**5**
- Description: 5px gap between items (small)
- CSS: `gap: 5px !important`
- Figma: `5`
- Class: `f-gap-5`
- Alias: `f-gap-small`

**10**
- Description: 10px gap between items (default)
- CSS: `gap: 10px !important`
- Figma: `10`
- Class: `f-gap`

**15**
- Description: 15px gap between items (large)
- CSS: `gap: 15px !important`
- Figma: `15`
- Class: `f-gap-15`
- Alias: `f-gap-large`

**20**
- Description: 20px gap between items
- CSS: `gap: 20px !important`
- Figma: `20`
- Class: `f-gap-20`

**25**
- Description: 25px gap between items
- CSS: `gap: 25px !important`
- Figma: `25`
- Class: `f-gap-25`

**30**
- Description: 30px gap between items
- CSS: `gap: 30px !important`
- Figma: `30`
- Class: `f-gap-30`

### Justify

**start**
- Description: Align items to start of main axis
- CSS: `justify-content: flex-start !important`
- Figma: `packed-start`
- Class: `f-j-start`

**center**
- Description: Center items on main axis
- CSS: `justify-content: center !important`
- Figma: `packed-center`
- Class: `f-j-center`

**end**
- Description: Align items to end of main axis
- CSS: `justify-content: flex-end !important`
- Figma: `packed-end`
- Class: `f-j-end`

**space-between**
- Description: Distribute items with space between
- CSS: `justify-content: space-between !important`
- Figma: `space-between`
- Class: `f-j-space-between`

**space-around**
- Description: Distribute items with space around
- CSS: `justify-content: space-around !important`
- Figma: `space-around`
- Class: `f-j-space-around`

**space-evenly**
- Description: Distribute items with equal space
- CSS: `justify-content: space-evenly !important`
- Figma: `space-evenly`
- Class: `f-j-space-evenly`

### Align

**start**
- Description: Align items to start of cross axis
- CSS: `align-items: flex-start !important`
- Figma: `min`
- Class: `f-a-start`

**center**
- Description: Center items on cross axis
- CSS: `align-items: center !important`
- Figma: `center`
- Class: `f-a-center`

**end**
- Description: Align items to end of cross axis
- CSS: `align-items: flex-end !important`
- Figma: `max`
- Class: `f-a-end`

**baseline**
- Description: Align items to baseline
- CSS: `align-items: baseline !important`
- Figma: `baseline`
- Class: `f-a-baseline`

**stretch**
- Description: Stretch items to fill cross axis
- CSS: `align-items: stretch !important`
- Figma: `fill`
- Class: `f-a-stretch`

## Usage Examples

### Basic flexbox container

**Code:**
```jsx
<div {...ui([uiA`f`])}>
```

**Figma:** Display=Flex

**Classes:** f

### Vertical container with default gap

**Code:**
```jsx
<div {...ui([uiA`f f-column f-gap`])}>
```

**Figma:** Display=Flex, Direction=Column, Gap=10

**Classes:** f, f-column, f-gap

### Centered flexbox container

**Code:**
```jsx
<div {...ui([uiA`f f-j-center f-a-center f-gap-large`])}>
```

**Figma:** Display=Flex, Justify=Center, Align=Center, Gap=15

**Classes:** f, f-j-center, f-a-center, f-gap-large

