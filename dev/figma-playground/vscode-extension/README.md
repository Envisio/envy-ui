# Envy UI VS Code Extension

A VS Code extension for seamless Figma-to-Envy UI code generation and Tailwind class conversion.

## Features

### 🎨 Figma Integration
- **Generate from Figma**: Convert Figma selections directly to Envy UI atomic CSS code
- **Smart Detection**: Automatically detects stored Envy UI metadata in Figma designs
- **Multiple Output Formats**: Support for HTML, React, and Vue.js code generation

### 🔄 Tailwind Conversion  
- **Class Conversion**: Convert Tailwind CSS classes to Envy UI atomic classes
- **Bulk Processing**: Convert entire files or selected text
- **Intelligent Mapping**: Smart conversion with fallback for unmapped classes

## Commands

| Command | Shortcut | Description |
|---------|----------|-------------|
| `Envy UI: Generate from Figma` | `Ctrl+Shift+F` | Generate Envy UI code from current Figma selection |
| `Envy UI: Convert Tailwind to Envy UI` | `Ctrl+Shift+T` | Convert selected Tailwind classes to Envy UI |

## Configuration

```json
{
  "envyui.outputFormat": "html",      // html, react, vue
  "envyui.indentation": 2,            // Number of spaces for indentation
  "envyui.includeComments": true      // Include generation comments
}
```

## Setup for Development

### Prerequisites
- Node.js 16+ 
- VS Code 1.74+
- npm or yarn

### Installation
```bash
cd dev/figma-playground/vscode-extension
npm install
```

### Building
```bash
npm run compile
```

### Testing
1. Open VS Code in the extension directory
2. Press `F5` to launch Extension Development Host
3. Test commands in the new VS Code window

### Packaging
```bash
npm run package
```

## How It Works

### Figma Integration
1. Extension calls Figma MCP to get design context from current selection
2. Checks for stored Envy UI metadata in Figma node's `pluginData`
3. If metadata exists, generates clean Envy UI code directly
4. If not, converts from Tailwind classes to Envy UI equivalents

### Tailwind Conversion
```javascript
// Input
<div className="flex gap-4 items-center justify-between">

// Output  
<div className="f f-gap-4 f-align-center f-justify-between">
```

### Conversion Mappings
| Tailwind | Envy UI | Notes |
|----------|---------|--------|
| `flex` | `f` | Base flexbox |
| `flex-col` | `f-column` | Column direction |
| `gap-[25px]` | `f-gap-25` | Custom gaps |
| `items-center` | `f-align-center` | Align items |
| `justify-between` | `f-justify-between` | Justify content |

## Integration with Figma Plugin

This extension works best with the Envy UI Figma Plugin:

1. **Design in Figma**: Use auto-layout and apply Envy UI classes via plugin
2. **Store Metadata**: Plugin stores class information in node metadata  
3. **Generate Code**: Extension reads metadata and generates perfect code
4. **No Conversion**: Direct mapping eliminates conversion errors

## File Structure

```
src/
├── extension.ts              # Main extension entry point
├── figmaCodeGenerator.ts     # Figma MCP integration & code generation
└── tailwindToEnvyConverter.ts # Tailwind to Envy UI conversion
```

## Troubleshooting

### Common Issues

**"No active editor found"**
- Ensure you have a file open in VS Code

**"Please select some text with Tailwind classes"** 
- Select text containing className attributes for conversion

**Figma connection issues**
- Verify Figma MCP is properly configured
- Check that Figma desktop app is running

### Debug Mode
Enable debug logging in VS Code settings:
```json
{
  "envyui.debug": true
}
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`) 
5. Open Pull Request

## License

MIT License - see LICENSE file for details.