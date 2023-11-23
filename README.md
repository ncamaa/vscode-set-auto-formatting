# Set Auto Formatting Extension

This extension automatically sets up Prettier formatting for JavaScript, HTML, Vue, and other file types in a Visual Studio Code project.

## Features

- Automatically creates a `.prettierrc` file with predefined formatting rules.
- Updates the `.vscode/settings.json` to enable format on save and set Prettier as the default formatter for various file types.

## Usage

1. Install the extension.
2. Open your project in Visual Studio Code.
3. Run the command `Set Auto Formatting` from the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
4. The extension will configure Prettier and update your VS Code settings accordingly.

## Requirements

- Visual Studio Code 1.84.0 or higher.
- Prettier extension for Visual Studio Code (`esbenp.prettier-vscode`).

## Extension Settings

This extension contributes the following settings:

- `editor.formatOnSave`: Enables format on save.
- Prettier configuration settings in `.prettierrc`.

## Known Issues

No known issues at this time.

## Release Notes

### 1.0.0

Initial release of Set Auto Formatting

#### Added
- Command to set up auto formatting for JavaScript, HTML, Vue, etc.
- Automatic creation and updating of `.prettierrc` and `.vscode/settings.json`.

---

**Enjoy!**
