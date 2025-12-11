# Figma Plugin Installation Guide

## Quick Setup (5 minutes)

### 1. Install in Figma
1. **Open Figma Desktop** (required for plugin development)
2. **Menu** → **Plugins** → **Development** → **Import plugin from manifest**
3. **Select** the `manifest.json` file from the `figma-plugin` folder
4. **Plugin appears** in your Plugins menu as "Envy UI Container Generator"

### 2. Usage
1. **Run plugin**: Plugins → Development → Envy UI Container Generator
2. **Configure properties** in the UI:
   - Display: Flex
   - Direction: Column  
   - Gap: 10px
   - Justify: Start
   - Align: Start
3. **Click "Create Component"** 
4. **Component created** with proper auto-layout settings!

### 3. Real-time Preview
- **Code preview updates** as you change settings
- Shows exact equivalent: `<div {...ui([uiA\`f f-column f-gap\`])}>`
- **1:1 mapping** between Figma properties and your CSS classes

## Advanced Features

### Batch Creation
- Select different combinations
- Click "Create Instance" to make variations
- All instances follow the same atomic class logic

### Class Mapping
The plugin automatically maps:
```
Figma: Direction=Column, Gap=10
Code: f f-column f-gap
CSS: .a-f .a-f-column .a-f-gap
```

### Auto Layout Configuration
- **Direction=Column** → Figma Vertical Auto Layout
- **Gap=10** → Figma gap of 10px  
- **Justify=Center** → Figma packed center alignment
- **Align=Stretch** → Figma fill container

## Development

### Modify the Plugin
1. **Edit code.js** to add new properties
2. **Edit ui.html** to update the interface
3. **Reload** in Figma: Plugins → Development → Reload
4. **Test** your changes immediately

### Add New Components
- Copy the plugin structure
- Update the manifest for button2, typography, etc.
- Create specialized generators for each component type

**Result**: You now have a **design system plugin** that generates components matching your exact atomic CSS architecture! 🎯