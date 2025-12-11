import * as vscode from 'vscode';
import { FigmaCodeGenerator } from './figmaCodeGenerator';
import { TailwindToEnvyConverter } from './tailwindToEnvyConverter';

export function activate(context: vscode.ExtensionContext) {
  console.log('Envy UI Figma Sync extension is now active!');

  const figmaGenerator = new FigmaCodeGenerator();
  const tailwindConverter = new TailwindToEnvyConverter();

  // Register command to generate from Figma
  let generateCommand = vscode.commands.registerCommand('envyui.generateFromFigma', async () => {
    try {
      await figmaGenerator.generateFromCurrentSelection();
    } catch (error) {
      vscode.window.showErrorMessage(`Figma sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Register command to convert Tailwind to Envy UI
  let convertCommand = vscode.commands.registerCommand('envyui.convertTailwindToEnvyUI', async () => {
    try {
      await tailwindConverter.convertSelectedText();
    } catch (error) {
      vscode.window.showErrorMessage(`Conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  context.subscriptions.push(generateCommand, convertCommand);

  // Show activation message
  vscode.window.showInformationMessage('Envy UI Figma Sync is ready! Use Ctrl+Shift+F to generate code from Figma.');
}

export function deactivate() {
  console.log('Envy UI Figma Sync extension is now deactivated!');
}