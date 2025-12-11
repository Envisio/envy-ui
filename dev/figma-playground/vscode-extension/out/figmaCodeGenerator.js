"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FigmaCodeGenerator = void 0;
const vscode = require("vscode");
class FigmaCodeGenerator {
    async generateFromCurrentSelection() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found');
            return;
        }
        try {
            // Show progress
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Generating Envy UI code from Figma...",
                cancellable: false
            }, async () => {
                // Call Figma MCP to get design context
                const figmaData = await this.getFigmaDesignContext();
                // Extract Envy UI classes from the data
                const envyUICode = this.convertFigmaToEnvyUI(figmaData);
                // Insert at cursor position
                await this.insertCodeAtCursor(editor, envyUICode);
                vscode.window.showInformationMessage('Envy UI code generated successfully!');
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getFigmaDesignContext() {
        // This would integrate with MCP in a real implementation
        // For now, return mock data that simulates MCP response
        return {
            code: `<div className="content-stretch flex gap-[25px] items-start justify-end relative size-full" data-node-id="1:327">
  <div className="bg-[#822121] h-[109px] shrink-0 w-[123px]" data-node-id="1:324" />
  <div className="bg-[#1b6e3b] h-[109px] shrink-0 w-[123px]" data-node-id="1:325" />
  <div className="bg-[#d9d9d9] h-[109px] shrink-0 w-[123px]" data-node-id="1:326" />
</div>`,
            metadata: {
                name: "Frame with EnvyUI: f f-gap-25 f-justify-end",
                hasEnvyUI: true,
                envyClasses: "f f-gap-25 f-justify-end"
            }
        };
    }
    convertFigmaToEnvyUI(figmaData) {
        const config = vscode.workspace.getConfiguration('envyui');
        const outputFormat = config.get('outputFormat', 'html');
        const indentation = config.get('indentation', 2);
        const includeComments = config.get('includeComments', true);
        // Check if we have direct Envy UI metadata
        if (figmaData.metadata?.hasEnvyUI) {
            return this.generateFromEnvyMetadata(figmaData.metadata.envyClasses, outputFormat, indentation, includeComments);
        }
        // Fallback: Convert from Tailwind classes
        return this.convertTailwindToEnvy(figmaData.code, outputFormat, indentation, includeComments);
    }
    generateFromEnvyMetadata(envyClasses, format, indent, includeComments) {
        const spaces = ' '.repeat(indent);
        const comment = includeComments ? `${spaces}/* Generated from Figma with stored Envy UI metadata */\n` : '';
        switch (format) {
            case 'react':
                return `${comment}<div className="${envyClasses}">
${spaces}{/* Your content here */}
</div>`;
            case 'vue':
                return `${comment}<div class="${envyClasses}">
${spaces}<!-- Your content here -->
</div>`;
            default: // html
                return `${comment}<div class="${envyClasses}">
${spaces}<!-- Your content here -->
</div>`;
        }
    }
    convertTailwindToEnvy(tailwindCode, format, indent, includeComments) {
        const spaces = ' '.repeat(indent);
        const comment = includeComments ? `${spaces}/* Generated from Figma (converted from Tailwind) */\n` : '';
        // Extract className from Tailwind code
        const classMatch = tailwindCode.match(/className="([^"]+)"/);
        const tailwindClasses = classMatch ? classMatch[1] : '';
        // Convert Tailwind to Envy UI
        const envyClasses = this.tailwindToEnvyUI(tailwindClasses);
        switch (format) {
            case 'react':
                return `${comment}<div className="${envyClasses}">
${spaces}{/* Converted from: ${tailwindClasses} */}
${spaces}{/* Your content here */}
</div>`;
            case 'vue':
                return `${comment}<div class="${envyClasses}">
${spaces}<!-- Converted from: ${tailwindClasses} -->
${spaces}<!-- Your content here -->
</div>`;
            default: // html
                return `${comment}<div class="${envyClasses}">
${spaces}<!-- Converted from: ${tailwindClasses} -->
${spaces}<!-- Your content here -->
</div>`;
        }
    }
    tailwindToEnvyUI(tailwindClasses) {
        const conversions = {
            'flex': 'f',
            'flex-col': 'f-column',
            'items-start': 'f-align-start',
            'items-center': 'f-align-center',
            'items-end': 'f-align-end',
            'justify-start': 'f-justify-start',
            'justify-center': 'f-justify-center',
            'justify-end': 'f-justify-end',
            'justify-between': 'f-justify-between',
            'justify-around': 'f-justify-around'
        };
        const classes = tailwindClasses.split(' ');
        const envyClasses = [];
        for (const cls of classes) {
            // Handle gap-[25px] pattern
            const gapMatch = cls.match(/gap-\[(\d+)px\]/);
            if (gapMatch) {
                envyClasses.push(`f-gap-${gapMatch[1]}`);
                continue;
            }
            // Handle standard conversions
            if (conversions[cls]) {
                envyClasses.push(conversions[cls]);
            }
        }
        return envyClasses.join(' ') || 'f';
    }
    async insertCodeAtCursor(editor, code) {
        const position = editor.selection.active;
        await editor.edit(editBuilder => {
            editBuilder.insert(position, code);
        });
    }
}
exports.FigmaCodeGenerator = FigmaCodeGenerator;
//# sourceMappingURL=figmaCodeGenerator.js.map