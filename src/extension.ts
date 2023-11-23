import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    // Registering the "Set Formatting" command
    let disposable = vscode.commands.registerCommand('extension.setFormatting', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;

        // Check if a workspace is open
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found! Please open a project first.');
            console.error('Attempted to set formatting without an open workspace.');
            console.error('Attempted to set formatting without an open workspace.');
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;
        
        // Attempt to set up Prettier and VSCode settings
        try {
            setupPrettier(rootPath);
            vscode.window.showInformationMessage('Auto formatting set up successfully!');
            console.log('Auto formatting setup completed.');
        } catch (error) {
            vscode.window.showErrorMessage('Failed to set up auto formatting. Check the console for more details.');
            console.error('Error setting up auto formatting:', error);
        }
    });

    context.subscriptions.push(disposable);
}


/**
 * Sets up Prettier and updates VSCode settings for auto formatting.
 * @param rootPath The root path of the current workspace.
 */
function setupPrettier(rootPath: string) {
	// Prettier configuration
	const prettierConfig = {
			printWidth: 80,
			tabWidth: 2,
			useTabs: false,
			semi: false,
			singleQuote: true,
			trailingComma: 'es5',
			bracketSpacing: true,
			jsxBracketSameLine: false,
			arrowParents: 'always'
	};

	// Writing .prettierrc file
	const prettierConfigPath = path.join(rootPath, '.prettierrc');
	fs.writeFileSync(prettierConfigPath, JSON.stringify(prettierConfig, null, 2));
	console.log('.prettierrc file created/updated successfully.');

	// Path for .vscode/settings.json file
	const settingsPath = path.join(rootPath, '.vscode/settings.json');
	let settings = {};

	// Read existing settings if the file exists
	if (fs.existsSync(settingsPath)) {
			const content = fs.readFileSync(settingsPath, 'utf8');
			try {
					settings = JSON.parse(content);
			} catch (error) {
					console.error('Error reading existing settings.json file:', error);
					vscode.window.showErrorMessage('Failed to read existing settings.json. Check the console for more details.');
					return;
			}
	}

	// Define new settings to be added
	const newSettings = {
		'editor.formatOnSave': true,
		'editor.defaultFormatter': 'esbenp.prettier-vscode',
		'[javascript]': { 'editor.defaultFormatter': 'esbenp.prettier-vscode' },
		'[html]': { 'editor.defaultFormatter': 'esbenp.prettier-vscode' },
		'[css]': { 'editor.defaultFormatter': 'esbenp.prettier-vscode' },
		'[json]': { 'editor.defaultFormatter': 'esbenp.prettier-vscode' },
		'[vue]': { 'editor.defaultFormatter': 'esbenp.prettier-vscode' },
		// Add more language identifiers as needed
	};

	// Merge new settings with existing settings
	const mergedSettings = { ...settings, ...newSettings };

	// Ensure .vscode directory exists
	fs.mkdirSync(path.join(rootPath, '.vscode'), { recursive: true });

	// Write merged settings back to settings.json
	fs.writeFileSync(settingsPath, JSON.stringify(mergedSettings, null, 2));
	console.log('.vscode/settings.json file updated successfully.');
}