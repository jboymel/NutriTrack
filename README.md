# NutriTrack – Interactive Features

For this project, I added two simple interactive features to the NutriTrack site using JavaScript. Both are designed to improve accessibility and user comfort while keeping the code and interface clean.

---

## 1. Font Size Adjuster

This feature lets users adjust the text size across the entire site using two buttons: **A+** to make the text larger and **A−** to make it smaller.

**How it works:**
- A+ increases the font size (up to 150%)
- A− decreases it (down to 50%)
- The font size setting is saved using localStorage, so it stays consistent even when navigating between pages or reloading the site

---

## 2. Theme Switcher

I also added a theme toggle that switches between light mode (default) and dark mode. The button is labeled **Toggle Theme**.

**How it works:**
- Clicking the button switches the site between light and dark themes
- The chosen theme is saved in localStorage, so it remembers your preference on other pages or future visits

---

## Accessibility Notes

Both features are fully keyboard-accessible and easy to use without a mouse. They don’t rely on animation, and the site stays readable and functional even with:
- Stylesheets turned off
- Images turned off
- JavaScript disabled (the base content still loads)
- Up to 400% zoom for magnification
- Screen readers and keyboard navigation

The goal was to keep the enhancements lightweight, accessible, and user-friendly.
