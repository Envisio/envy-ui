"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const figmaCodeGenerator_1 = require("./figmaCodeGenerator");
const tailwindToEnvyConverter_1 = require("./tailwindToEnvyConverter");
function activate(context) {
    console.log('Envy UI Figma Sync extension is now active!');
    const figmaGenerator = new figmaCodeGenerator_1.FigmaCodeGenerator();
    const tailwindConverter = new tailwindToEnvyConverter_1.TailwindToEnvyConverter();
    // Register command to generate from Figma
    let generateCommand = vscode.commands.registerCommand('envyui.generateFromFigma', async () => {
        try {
            await figmaGenerator.generateFromCurrentSelection();
        }
        catch (error) {
            vscode.window.showErrorMessage(`Figma sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    });
    // Register command to convert Tailwind to Envy UI
    let convertCommand = vscode.commands.registerCommand('envyui.convertTailwindToEnvyUI', async () => {
        try {
            await tailwindConverter.convertSelectedText();
        }
        catch (error) {
            vscode.window.showErrorMessage(`Conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    });
    context.subscriptions.push(generateCommand, convertCommand);
    // Show activation message
    vscode.window.showInformationMessage('Envy UI Figma Sync is ready! Use Ctrl+Shift+F to generate code from Figma.');
}
exports.activate = activate;
function deactivate() {
    console.log('Envy UI Figma Sync extension is now deactivated!');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map