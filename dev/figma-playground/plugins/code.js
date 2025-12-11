// Envy UI Auto-Layout Applier Plugin
// This plugin applies auto-layout settings to selected containers to match atomic CSS classes

function applyAutoLayoutToSelection(settings) {
  try {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Please select a frame or container first'
      });
      return;
    }
    
    let appliedCount = 0;
    const cssClasses = generateEnvyUIClasses(settings);
    
    selection.forEach(node => {
      if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE') {
        // Apply auto-layout settings
        applyLayoutSettings(node, settings);
        
        // Store Envy UI metadata in plugin data
        node.setPluginData('envyui-classes', cssClasses);
        node.setPluginData('envyui-settings', JSON.stringify(settings));
        node.setPluginData('envyui-timestamp', Date.now().toString());
        
        // Store in name as backup (visible in layers panel)
        const originalName = node.name;
        if (!originalName.includes('EnvyUI:')) {
          node.name = `${originalName} • EnvyUI: ${cssClasses}`;
        }
        
        appliedCount++;
      }
    });
    
    figma.ui.postMessage({
      type: 'success',
      message: `Applied auto-layout to ${appliedCount} container(s)`,
      classes: cssClasses
    });
    
  } catch (error) {
    figma.ui.postMessage({
      type: 'error',
      message: `Error applying auto-layout: ${error.message}`
    });
  }
}

function generateEnvyUIClasses(settings) {
  const cssClasses = [];
  
  // Display/Layout mode
  if (settings.display === 'flex') {
    cssClasses.push('f');
  } else if (settings.display === 'grid') {
    cssClasses.push('g');
  }
  
  // Direction
  if (settings.direction === 'column') {
    cssClasses.push('f-column');
  } else if (settings.direction === 'row-reverse') {
    cssClasses.push('f-row-reverse');
  } else if (settings.direction === 'column-reverse') {
    cssClasses.push('f-column-reverse');
  }
  
  // Gap
  if (settings.gap && settings.gap !== '0') {
    cssClasses.push(`f-gap-${settings.gap}`);
  }
  
  // Justify (primary axis)
  if (settings.justify && settings.justify !== 'start') {
    cssClasses.push(`f-justify-${settings.justify}`);
  }
  
  // Align (cross axis)
  if (settings.align && settings.align !== 'start') {
    cssClasses.push(`f-align-${settings.align}`);
  }
  
  return cssClasses.join(' ');
}

function applyLayoutSettings(node, settings) {
  // Display/Layout mode
  if (settings.display === 'flex') {
    node.layoutMode = settings.direction === 'column' ? 'VERTICAL' : 'HORIZONTAL';
  }
  
  // Direction
  if (settings.direction === 'column') {
    node.layoutMode = 'VERTICAL';
  } else if (settings.direction === 'row-reverse') {
    node.layoutMode = 'HORIZONTAL';
  } else if (settings.direction === 'column-reverse') {
    node.layoutMode = 'VERTICAL';
  }
  
  // Gap
  if (settings.gap && settings.gap !== '0') {
    node.itemSpacing = parseInt(settings.gap);
  }
  
  // Justify (primary axis)
  if (settings.justify && settings.justify !== 'start') {
    if (settings.justify === 'center') {
      node.primaryAxisAlignItems = 'CENTER';
    } else if (settings.justify === 'end') {
      node.primaryAxisAlignItems = 'MAX';
    } else if (settings.justify === 'space-between') {
      node.primaryAxisAlignItems = 'SPACE_BETWEEN';
    }
  } else {
    node.primaryAxisAlignItems = 'MIN'; // start
  }
  
  // Align (cross axis)
  if (settings.align && settings.align !== 'start') {
    if (settings.align === 'center') {
      node.counterAxisAlignItems = 'CENTER';
    } else if (settings.align === 'end') {
      node.counterAxisAlignItems = 'MAX';
    }
  } else {
    node.counterAxisAlignItems = 'MIN'; // start
  }
  
  // Set sizing behavior
  node.primaryAxisSizingMode = 'AUTO';
  node.counterAxisSizingMode = 'AUTO';
}

function applyCardStylingToSelection(settings) {
  try {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Please select a container first'
      });
      return;
    }
    
    let appliedCount = 0;
    const cssClasses = generateCardClasses(settings);
    
    selection.forEach(node => {
      if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE') {
        // Apply card styling settings
        applyCardSettings(node, settings);
        
        // Store Card metadata in plugin data
        node.setPluginData('envyui-card-classes', cssClasses);
        node.setPluginData('envyui-card-settings', JSON.stringify(settings));
        node.setPluginData('envyui-card-timestamp', Date.now().toString());
        
        // Store in name as backup (visible in layers panel)
        const originalName = node.name;
        if (!originalName.includes('Card:')) {
          node.name = `${originalName} • Card: ${cssClasses}`;
        }
        
        appliedCount++;
      }
    });
    
    figma.ui.postMessage({
      type: 'success',
      message: `Applied card styling to ${appliedCount} container(s)`,
      classes: cssClasses
    });
    
  } catch (error) {
    figma.ui.postMessage({
      type: 'error',
      message: `Error applying card styling: ${error.message}`
    });
  }
}

function generateCardClasses(settings) {
  const cssClasses = ['env-card'];
  
  // Shadow
  if (settings.shadow === 'none') {
    cssClasses.push('env-card--no-shadow');
  } else if (settings.shadow === 'strong') {
    cssClasses.push('env-card--shadow-strong');
  } else if (settings.shadow === 'xstrong') {
    cssClasses.push('env-card--shadow-xstrong');
  }
  
  // Border
  if (settings.border === 'none') {
    cssClasses.push('env-card--no-border');
  } else if (settings.border === 'brand') {
    cssClasses.push('env-card--brand-border');
  }
  
  // Variant
  if (settings.variant === 'plain') {
    cssClasses.push('env-card--plain');
  } else if (settings.variant === 'brand') {
    cssClasses.push('env-card--brand');
  } else if (settings.variant === 'muted') {
    cssClasses.push('env-card--muted');
  }
  
  // State
  if (settings.state === 'active') {
    cssClasses.push('env-card--active');
  } else if (settings.state === 'selected') {
    cssClasses.push('env-card--selected');
  }
  
  return cssClasses.join(' ');
}

function applyCardSettings(node, settings) {
  // Apply visual styling based on card settings
  
  // Shadow effects
  if (settings.shadow === 'none') {
    node.effects = [];
  } else if (settings.shadow === 'strong') {
    node.effects = [{
      type: 'DROP_SHADOW',
      color: {r: 0, g: 0, b: 0, a: 0.15},
      offset: {x: 0, y: 4},
      radius: 16,
      visible: true,
      blendMode: 'NORMAL'
    }];
  } else if (settings.shadow === 'xstrong') {
    node.effects = [{
      type: 'DROP_SHADOW',
      color: {r: 0, g: 0, b: 0, a: 0.25},
      offset: {x: 0, y: 8},
      radius: 24,
      visible: true,
      blendMode: 'NORMAL'
    }];
  } else {
    // Default shadow
    node.effects = [{
      type: 'DROP_SHADOW',
      color: {r: 0, g: 0, b: 0, a: 0.1},
      offset: {x: 0, y: 2},
      radius: 8,
      visible: true,
      blendMode: 'NORMAL'
    }];
  }
  
  // Border styling
  if (settings.border === 'none') {
    node.strokes = [];
  } else if (settings.border === 'brand') {
    node.strokes = [{
      type: 'SOLID',
      color: {r: 0.2, g: 0.4, b: 1.0} // Brand blue
    }];
    node.strokeWeight = 2;
  } else {
    // Default border
    node.strokes = [{
      type: 'SOLID',
      color: {r: 0.9, g: 0.9, b: 0.9} // Light gray
    }];
    node.strokeWeight = 1;
  }
  
  // Background colors for variants
  if (settings.variant === 'plain') {
    node.fills = [{
      type: 'SOLID',
      color: {r: 0.96, g: 0.96, b: 0.96} // Alabaster
    }];
  } else if (settings.variant === 'brand') {
    node.fills = [{
      type: 'SOLID',
      color: {r: 0.2, g: 0.4, b: 1.0} // Brand primary
    }];
  } else if (settings.variant === 'muted') {
    node.fills = [{
      type: 'SOLID',
      color: {r: 1, g: 1, b: 1} // White but will apply opacity
    }];
    node.opacity = 0.6;
  } else {
    // Default - white background
    node.fills = [{
      type: 'SOLID',
      color: {r: 1, g: 1, b: 1} // White
    }];
    node.opacity = 1;
  }
  
  // Corner radius for card appearance
  if (node.type === 'FRAME') {
    node.cornerRadius = 8;
  }
}  
figma.ui.onmessage = (msg) => {
  if (msg.type === 'apply-layout') {
    applyAutoLayoutToSelection(msg.settings);
  } else if (msg.type === 'apply-card') {
    applyCardStylingToSelection(msg.settings);
  } else if (msg.type === 'read-metadata') {
    readMetadataFromSelection();
  }
};

function readMetadataFromSelection() {
  try {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Please select a container first'
      });
      return;
    }
    
    const metadataResults = [];
    
    selection.forEach((node, index) => {
      if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE') {
        const envyClasses = node.getPluginData('envyui-classes');
        const envySettings = node.getPluginData('envyui-settings');
        const envyTimestamp = node.getPluginData('envyui-timestamp');
        
        const result = {
          nodeType: node.type,
          nodeName: node.name,
          hasMetadata: !!envyClasses,
          classes: envyClasses || 'No Envy UI classes stored',
          settings: envySettings ? JSON.parse(envySettings) : 'No settings stored',
          timestamp: envyTimestamp ? new Date(parseInt(envyTimestamp)).toLocaleString() : 'Never applied'
        };
        
        metadataResults.push(result);
      }
    });
    
    figma.ui.postMessage({
      type: 'metadata-read',
      results: metadataResults
    });
    
  } catch (error) {
    figma.ui.postMessage({
      type: 'error',
      message: `Error reading metadata: ${error.message}`
    });
  }
}

function readContainerSettings(container) {
  try {
    // First try to read from stored plugin data
    const storedSettings = container.getPluginData('envyui-settings');
    if (storedSettings) {
      return JSON.parse(storedSettings);
    }
    
    // Fallback to reading from Figma's auto-layout properties
    const settings = {
      display: 'block',
      direction: 'row',
      gap: '0',
      justify: 'start',
      align: 'start'
    };
    
    // Map Figma layout properties to our settings
    if (container.layoutMode === 'HORIZONTAL' || container.layoutMode === 'VERTICAL') {
      settings.display = 'flex';
      settings.direction = container.layoutMode === 'HORIZONTAL' ? 'row' : 'column';
      
      // Map gap
      if (container.itemSpacing) {
        settings.gap = container.itemSpacing.toString();
      }
      
      // Map justify (primary axis alignment)
      switch (container.primaryAxisAlignItems) {
        case 'CENTER':
          settings.justify = 'center';
          break;
        case 'MAX':
          settings.justify = 'end';
          break;
        case 'SPACE_BETWEEN':
          settings.justify = 'between';
          break;
        default:
          settings.justify = 'start';
      }
      
      // Map align (cross axis alignment)
      switch (container.counterAxisAlignItems) {
        case 'CENTER':
          settings.align = 'center';
          break;
        case 'MAX':
          settings.align = 'end';
          break;
        default:
          settings.align = 'start';
      }
    }
    
    return settings;
  } catch (error) {
    console.error('Error reading container settings:', error);
    return null;
  }
}
figma.showUI(__html__, { width: 370, height: 500 });

// Monitor selection changes
figma.on('selectionchange', () => {
  const selection = figma.currentPage.selection;
  const hasValidSelection = selection.length > 0 && 
    selection.some(node => node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE');
  
  let containerSettings = null;
  
  if (hasValidSelection) {
    const container = selection.find(node => node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE');
    containerSettings = readContainerSettings(container);
  }
  
  figma.ui.postMessage({
    type: 'selection-changed',
    hasSelection: hasValidSelection,
    containerSettings: containerSettings
  });
});

// Send initial selection state
const initialSelection = figma.currentPage.selection;
const hasInitialSelection = initialSelection.length > 0 && 
  initialSelection.some(node => node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE');

let initialContainerSettings = null;
if (hasInitialSelection) {
  const container = initialSelection.find(node => node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE');
  initialContainerSettings = readContainerSettings(container);
}

figma.ui.postMessage({
  type: 'selection-changed',
  hasSelection: hasInitialSelection,
  containerSettings: initialContainerSettings
});