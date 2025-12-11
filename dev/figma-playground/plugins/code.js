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

// Plugin message handlers  
figma.ui.onmessage = (msg) => {
  if (msg.type === 'apply-layout') {
    applyAutoLayoutToSelection(msg.settings);
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

// Show UI
figma.showUI(__html__, { width: 300, height: 500 });