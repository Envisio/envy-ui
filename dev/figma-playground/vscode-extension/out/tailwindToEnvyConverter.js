"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TailwindToEnvyConverter = void 0;
const vscode = require("vscode");
class TailwindToEnvyConverter {
    async convertSelectedText() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found');
            return;
        }
        const selection = editor.selection;
        if (selection.isEmpty) {
            vscode.window.showWarningMessage('Please select some text with Tailwind classes');
            return;
        }
        try {
            const selectedText = editor.document.getText(selection);
            const convertedText = this.convertTailwindToEnvy(selectedText);
            await editor.edit((editBuilder) => {
                editBuilder.replace(selection, convertedText);
            });
            vscode.window.showInformationMessage('Tailwind classes converted to Envy UI!');
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error converting classes: ${error}`);
        }
    }
    convertTailwindToEnvy(text) {
        // Look for class attributes in HTML/JSX
        return text.replace(/className="([^"]+)"|class="([^"]+)"/g, (match, reactClasses, htmlClasses) => {
            const classes = reactClasses || htmlClasses;
            const envyClasses = this.tailwindToEnvyUI(classes);
            const attribute = reactClasses ? 'className' : 'class';
            return `${attribute}="${envyClasses}"`;
        });
    }
    tailwindToEnvyUI(tailwindClasses) {
        const conversions = {
            // Flexbox
            'flex': 'f',
            'flex-col': 'f-column',
            'flex-row': 'f-row',
            'flex-wrap': 'f-wrap',
            'flex-nowrap': 'f-nowrap',
            // Alignment
            'items-start': 'f-align-start',
            'items-center': 'f-align-center',
            'items-end': 'f-align-end',
            'items-stretch': 'f-align-stretch',
            'items-baseline': 'f-align-baseline',
            // Justify
            'justify-start': 'f-justify-start',
            'justify-center': 'f-justify-center',
            'justify-end': 'f-justify-end',
            'justify-between': 'f-justify-between',
            'justify-around': 'f-justify-around',
            'justify-evenly': 'f-justify-evenly',
            // Content alignment
            'content-start': 'f-content-start',
            'content-center': 'f-content-center',
            'content-end': 'f-content-end',
            'content-between': 'f-content-between',
            'content-around': 'f-content-around',
            'content-evenly': 'f-content-evenly',
            'content-stretch': 'f-content-stretch',
            // Flex grow/shrink
            'flex-1': 'f-1',
            'flex-auto': 'f-auto',
            'flex-initial': 'f-initial',
            'flex-none': 'f-none',
            'shrink-0': 'f-shrink-0',
            'grow': 'f-grow',
            'shrink': 'f-shrink',
            // Display
            'block': 'd-block',
            'inline': 'd-inline',
            'inline-block': 'd-inline-block',
            'hidden': 'd-none',
            'grid': 'd-grid',
            // Position
            'relative': 'position-relative',
            'absolute': 'position-absolute',
            'fixed': 'position-fixed',
            'sticky': 'position-sticky',
            'static': 'position-static',
            // Width/Height
            'w-full': 'w-full',
            'h-full': 'h-full',
            'size-full': 'w-full h-full',
            'w-auto': 'w-auto',
            'h-auto': 'h-auto',
            // Spacing
            'p-0': 'p-0',
            'p-1': 'p-1',
            'p-2': 'p-2',
            'p-3': 'p-3',
            'p-4': 'p-4',
            'p-5': 'p-5',
            'p-6': 'p-6',
            'm-0': 'm-0',
            'm-1': 'm-1',
            'm-2': 'm-2',
            'm-3': 'm-3',
            'm-4': 'm-4',
            'm-5': 'm-5',
            'm-6': 'm-6',
            'm-auto': 'm-auto'
        };
        const classes = tailwindClasses.split(' ').filter(cls => cls.trim());
        const envyClasses = [];
        for (const cls of classes) {
            // Handle gap patterns: gap-[25px] -> f-gap-25
            const gapMatch = cls.match(/gap-\[(\d+)px\]/);
            if (gapMatch) {
                envyClasses.push(`f-gap-${gapMatch[1]}`);
                continue;
            }
            // Handle regular gap: gap-4 -> f-gap-4
            const regularGap = cls.match(/gap-(\d+)/);
            if (regularGap) {
                envyClasses.push(`f-gap-${regularGap[1]}`);
                continue;
            }
            // Handle width patterns: w-[123px] -> w-123
            const widthMatch = cls.match(/w-\[(\d+)px\]/);
            if (widthMatch) {
                envyClasses.push(`w-${widthMatch[1]}`);
                continue;
            }
            // Handle height patterns: h-[109px] -> h-109
            const heightMatch = cls.match(/h-\[(\d+)px\]/);
            if (heightMatch) {
                envyClasses.push(`h-${heightMatch[1]}`);
                continue;
            }
            // Handle background color patterns: bg-[#822121] -> bg-custom (for now)
            const bgColorMatch = cls.match(/bg-\[#[0-9a-fA-F]{6}\]/);
            if (bgColorMatch) {
                // For custom colors, we might want to preserve them or convert to CSS variables
                envyClasses.push(cls); // Keep as is for now
                continue;
            }
            // Handle standard conversions
            if (conversions[cls]) {
                envyClasses.push(conversions[cls]);
                continue;
            }
            // If no conversion found, keep the original class (might be custom or already Envy UI)
            envyClasses.push(cls);
        }
        // Remove duplicates while preserving order
        const uniqueClasses = [...new Set(envyClasses)];
        return uniqueClasses.join(' ');
    }
    // Utility method for standalone class conversion
    convertClassString(tailwindClasses) {
        return this.tailwindToEnvyUI(tailwindClasses);
    }
}
exports.TailwindToEnvyConverter = TailwindToEnvyConverter;
//# sourceMappingURL=tailwindToEnvyConverter.js.map