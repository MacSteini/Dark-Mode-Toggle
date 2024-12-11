# Dark Mode Toggle

A lightweight, responsive, and accessible dark mode toggle. It supports localisation, right-to-left (RTL) languages, manual overrides, and adapts to user preferences and system settings while ensuring accessibility. Dark mode works even without JavaScript.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Usage](#usage)
- [Browser Compatibility](#browser-compatibility)
- [Dependencies](#dependencies)
- [Customisation](#customisation)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Licence](#licence)

## Features

- **Theme switching:** Easily toggle between light and dark modes with smooth transitions.
- **Localisation:** Tooltips support multiple languages, including region-specific codes and RTL languages
- **System preference integration:** Automatically applies the system’s preferred theme upon the first visit and dynamically updates based on changes
- **Accessibility:** Incorporates [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA "ARIA") attributes for enhanced accessibility and dynamically adjusts `dir` for RTL languages
- **Responsive design:** Fully responsive styles that adapt seamlessly to various screen sizes
- **Touch device optimisation:** Disables tooltips and focus styles on touch-capable devices to enhance usability
- **Fallback support:** Dark mode works without JavaScript, ensuring a consistent user experience
- **Sub-resource Integrity (SRI):** Utilises [SRI](https://en.wikipedia.org/wiki/Subresource_Integrity "Sub-resource Integrity (SRI)") for external resources like Font Awesome to enhance security by ensuring the integrity of fetched resources
- **Error handling:** Implements robust error handling to notify developers of missing essential DOM elements
- **Maintainable code:** Encapsulates JavaScript in an [IIFE](https://en.wikipedia.org/wiki/Immediately_invoked_function_expression "Immediately Invoked Function Expression (IIFE)") to prevent global namespace pollution and simplify maintenance

## Demo

A live demonstration is available [here](https://steinbrecher.co/Dark-Mode-Toggle "Dark Mode Toggle Demo").

## Usage

1. Open `index.html` in your browser:
   - You can simply double-click the file or use a live server extension for a better development experience
1. Toggle Dark Mode:
   - Use the toggle button located in the top-right corner to switch between light and dark modes
   - Tooltips display in your browser’s language, aligned for RTL and LTR layouts

## Browser Compatibility

- **Desktop Browsers**:
  - Apple Safari
  - Google Chrome
  - Microsoft Edge
  - Mozilla Firefox
  - Opera (untested – feedback welcome!)
- **Mobile Browsers**:
  - Mobile Safari (iOS)
  - Chrome for Android
  - Firefox for Android

## Dependencies

[Font Awesome](https://fontawesome.io/ "Font Awesome") is used for the toggle button icons.

**Security note**: For optimal security, always ensure that external resources like Font Awesome are loaded with proper Sub-resource Integrity (SRI) attributes to prevent resource tampering. Replace `sha512-[SRIHashHere]` with the actual SRI hash for the version you are using. You can generate the SRI hash using tools like [SRI Hash Generator](https://srihash.org/ "SRI Hash Generator"). Keep dependencies up to date for security patches and new features.

## Customisation

### Adding support for a new language:

1. Open `dark-mode.js`
1. Add your language to the `messages` object:
   ```javascript
   const messages = {
     // Existing languages
     // Add your language here
     xx: {
       switchToLight: "Your translation for light mode",
       switchToDark: "Your translation for dark mode",
     },
   };
   ```
1. **Region-specific codes**: If your language has region-specific variations (e. g., `pt-BR` for Brazilian Portuguese), add entries like `'pt-BR': { … }` to handle them appropriately

### RTL language support

The system dynamically applies RTL support for Arabic, Hebrew, Persian, and Urdu. To add support for additional RTL languages:

1. Open `dark-mode.js`:
1. Add the language code to the `rtlLanguages` array:
   ```javascript
   const rtlLanguages = ["ar", "he", "fa", "ur", "xx"]; // Add your language code if it requires RTL support
   ```

### Adjusting Styles

Edit `dark-mode.css` to customise colours, transitions, and layout. Use CSS variables under `:root` and `[data-theme="dark"]` for consistency.

**Ensure proper CSS handling**: The CSS uses the `dir` attribute to adjust styles for RTL layouts. Verify that any additional RTL languages are properly supported by testing the interface.

## Future Enhancements

- **Enhanced animations**: Add more sophisticated animations for smoother UI transitions
- **Localisation options**: Provide an option to disable localisation if required or allow users to select their preferred language manually
- **Expanded language support**: Continue to expand localisation to include additional languages and region-specific variations
- **Theming options**: Introduce more themes beyond light and dark modes, allowing users to customise colours and styles to their preference
- **Accessibility audits**: Ensure compliance with current accessibility standards

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository
1. Create a feature branch: `git checkout -b feature-branch`
1. Commit your changes: `git commit -m "Add feature"`
1. Push the branch: `git push origin feature-branch`
1. Submit a pull request

Please ensure all changes are well-documented and tested.

**Suggestions for improvements are highly encouraged!** Please ensure that your contributions adhere to the project’s coding standards and include appropriate documentation.

## Licence

This project is licenced under the [MIT Licence](https://opensource.org/license/mit "MIT Licence"). You are free to use, modify, and distribute this project in compliance with the licence terms.
