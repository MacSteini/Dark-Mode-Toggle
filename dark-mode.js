/*
# Dark Mode Toggle Script
#
# Author:
# Name: Marco Steinbrecher
# Email: dtm@steinbrecher.co
# GitHub: https://github.com/MacSteini/dark-mode-toggle
#
# Provides full functionality for toggling dark mode. Includes:
# - Localised ARIA labels and tooltips
# - Adaptations for RTL languages and touch devices
# - User preference handling (localStorage)
#
# Features:
# - Supports localisation for tooltips and accessibility
# - Detects and adapts to RTL languages
# - Automatically respects system colour-scheme preferences
# - Accessible and mobile-friendly design
#
# MIT Licence applies. See GitHub for details.
*/

// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(() => {
  // Remove the 'hidden' class when JavaScript is enabled
  const darkModeToggleBox = document.getElementById("darkModeToggleBox");
  if (darkModeToggleBox) {
    darkModeToggleBox.classList.remove("hidden");
  } else {
    console.error("Element with ID 'darkModeToggleBox' not found.");
  }

  // Localization for button tooltips
  const messages = {
    ar: { switchToLight: "التبديل إلى الوضع الفاتح", switchToDark: "التبديل إلى الوضع الداكن" }, // Arabic
    bg: { switchToLight: "Превключване към светъл режим", switchToDark: "Превключване към тъмен режим" }, // Bulgarian
    de: { switchToLight: "Zum hellen Modus wechseln", switchToDark: "Zum dunklen Modus wechseln" }, // German
    en: { switchToLight: "Switch to light mode", switchToDark: "Switch to dark mode" }, // English
    es: { switchToLight: "Cambiar al modo claro", switchToDark: "Cambiar al modo oscuro" }, // Spanish
    fr: { switchToLight: "Passer au mode clair", switchToDark: "Passer au mode sombre" }, // French
    he: { switchToLight: "עבור למצב בהיר", switchToDark: "עבור למצב כהה" }, // Hebrew
    fa: { switchToLight: "تغییر به حالت روشن", switchToDark: "تغییر به حالت تاریک" }, // Persian
    hi: { switchToLight: "हल्के मोड में स्विच करें", switchToDark: "डार्क मोड में स्विच करें" }, // Hindi
    hu: { switchToLight: "Váltás világos módra", switchToDark: "Váltás sötét módra" }, // Hungarian
    it: { switchToLight: "Passa alla modalità chiara", switchToDark: "Passa alla modalità scura" }, // Italian
    ja: { switchToLight: "ライトモードに切り替え", switchToDark: "ダークモードに切り替え" }, // Japanese
    ko: { switchToLight: "라이트 모드로 전환", switchToDark: "다크 모드로 전환" }, // Korean
    pt: { switchToLight: "Mudar para o modo claro", switchToDark: "Mudar para o modo escuro" }, // Portuguese
    ro: { switchToLight: "Schimbați la modul luminos", switchToDark: "Schimbați la modul întunecat" }, // Romanian
    ru: { switchToLight: "Переключиться на светлый режим", switchToDark: "Переключиться на тёмный режим" }, // Russian
    ur: { switchToLight: "ہلکے موڈ پر جائیں", switchToDark: "ڈارک موڈ پر جائیں" }, // Urdu
    "zh-CN": { switchToLight: "切换到浅色模式", switchToDark: "切换到深色模式" }, // Simplified Chinese
    "zh-TW": { switchToLight: "切換到淺色模式", switchToDark: "切換到深色模式" }, // Traditional Chinese
    zh: { switchToLight: "切换到浅色模式", switchToDark: "切换到深色模式" }, // Simplified Chinese
    // Add more language codes and translations as needed
  };

  // Detect user's language preference, including region-specific codes
  const detectLanguage = () => {
    const langFull = navigator.language || navigator.userLanguage; // Fallback for older browsers
    const langPrimary = langFull.slice(0, 2).toLowerCase();
    const langRegion = langFull.slice(0, 5).toLowerCase(); // e.g., 'zh-TW'

    // Check for region-specific translation first
    if (messages[langRegion]) {
      return messages[langRegion];
    }

    // Fallback to primary language code
    return messages[langPrimary] || messages.en; // Default to English if unsupported
  };

  const currentLang = detectLanguage(); // Get current language translations

  // Determines if the language uses right-to-left text direction
  const isRtlLanguage = (langFull) => {
    const rtlLanguages = ["ar", "he", "fa", "ur"];
    const langPrimary = langFull.slice(0, 2).toLowerCase();
    return rtlLanguages.includes(langPrimary);
  };

  // Apply the selected theme and update UI
  const applyTheme = (theme, manual = false) => {
    if (document.documentElement.getAttribute("data-theme") === theme) return;

    document.documentElement.setAttribute("data-theme", theme);

    if (manual) {
      localStorage.setItem("theme", theme); // Save manual preference
    } else if (!localStorage.getItem("theme")) {
      localStorage.removeItem("theme"); // Ensure system preference is respected
    }

    updateUI(theme);
  };

  // Update UI elements like button icon and tooltip
  const updateUI = (theme) => {
    const toggleButton = document.getElementById("darkModeToggle");
    if (!toggleButton) {
      console.error("Element with ID 'darkModeToggle' not found.");
      return;
    }

    const icon = toggleButton.querySelector("i");
    if (!icon) {
      console.error("Icon element inside 'darkModeToggle' not found.");
      return;
    }

    const ariaLabel =
      theme === "dark" ? currentLang.switchToLight : currentLang.switchToDark;

    toggleButton.setAttribute("aria-label", ariaLabel); // Update aria-label for accessibility
    toggleButton.setAttribute("aria-checked", theme === "dark"); // Update aria-checked attribute

    // Update the icon class based on the theme
    icon.className = theme === "dark" ? "fas fa-moon" : "fas fa-sun";

    adjustTooltipPosition(toggleButton); // Adjust tooltip positioning dynamically
  };

  // Ensure tooltips dynamically reposition based on window size and direction
  const adjustTooltipPosition = (toggleButton) => {
    const rect = toggleButton.getBoundingClientRect(); // Get button position
    toggleButton.removeAttribute("data-tooltip-position"); // Reset previous positioning

    if (rect.left < 50) {
      // Threshold can be adjusted as needed
      toggleButton.setAttribute("data-tooltip-position", "left"); // Align tooltip to the left
    } else if (rect.right > window.innerWidth - 50) {
      // Threshold can be adjusted as needed
      toggleButton.setAttribute("data-tooltip-position", "right"); // Align tooltip to the right
    } else {
      toggleButton.setAttribute("data-tooltip-position", "top"); // Default tooltip position
    }
  };

  // Listen for system preference changes
  const listenToSystemChanges = () => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Modern browsers support 'addEventListener' on matchMedia
    if (typeof darkModeQuery.addEventListener === "function") {
      darkModeQuery.addEventListener("change", (event) => {
        if (!localStorage.getItem("theme")) {
          // Apply system preference only if no manual override
          applyTheme(event.matches ? "dark" : "light");
        }
      });
    } else if (typeof darkModeQuery.addListener === "function") {
      // Fallback for older browsers
      darkModeQuery.addListener((event) => {
        if (!localStorage.getItem("theme")) {
          // Apply system preference only if no manual override
          applyTheme(event.matches ? "dark" : "light");
        }
      });
    }
  };

  // Initialize the theme based on user preferences
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const defaultTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    applyTheme(defaultTheme, false); // Apply default theme without saving as manual preference
    listenToSystemChanges(); // Start listening for system changes
  };

  // Add toggle button functionality
  const setupToggleButton = () => {
    const toggleButton = document.getElementById("darkModeToggle");
    if (!toggleButton) {
      console.error("Element with ID 'darkModeToggle' not found.");
      return;
    }

    toggleButton.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      // Prevent visual artifacts during transition
      toggleButton.style.background = "transparent";

      applyTheme(newTheme, true); // Apply and save the theme
    });
  };

  // Dynamically change the <html> element's direction based on browser language
  const setupLanguageAttributes = () => {
    const langFull = navigator.language || navigator.userLanguage; // Fallback for older browsers
    const direction = isRtlLanguage(langFull) ? "rtl" : "ltr"; // Determine text direction

    document.documentElement.setAttribute("lang", langFull.toLowerCase()); // Sets the `lang` attribute for the `<html>` tag
    document.documentElement.setAttribute("dir", direction); // Sets the `dir` attribute for text direction (ltr or rtl)

    // Adjust tooltip alignment based on text direction
    const toggleButton = document.getElementById("darkModeToggle");
    if (toggleButton) {
      if (direction === "rtl") {
        toggleButton.setAttribute("data-tooltip-align", "left");
      } else {
        toggleButton.setAttribute("data-tooltip-align", "right");
      }
    }

    console.log(`Language set to: ${langFull}, Direction set to: ${direction}`); // Debug log
  };

  // Disable tooltip for touch devices
  const disableTooltipsOnTouch = () => {
    const toggleButton = document.getElementById("darkModeToggle");
    if (!toggleButton) {
      console.error("Element with ID 'darkModeToggle' not found.");
      return;
    }

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0; // Check if the device supports touch

    if (isTouchDevice) {
      toggleButton.classList.add("no-tooltip");
      toggleButton.classList.add("no-focus");
    }
  };

  // Event listener for DOMContentLoaded to ensure the DOM is fully loaded before executing scripts
  document.addEventListener("DOMContentLoaded", () => {
    setupLanguageAttributes(); // Set language and direction attributes
    setupToggleButton(); // Initialize toggle button functionality
    disableTooltipsOnTouch(); // Disable tooltips if on a touch device
  });

  // Initialize the theme based on user preferences when the script loads
  initializeTheme(); // Initialize on page load
})();
