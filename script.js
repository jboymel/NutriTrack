// font size
let currentFontSize = parseInt(localStorage.getItem('fontSize')) || 100;
document.body.style.fontSize = currentFontSize + '%';

function increaseFontSize() {
  if (currentFontSize < 150) {
    currentFontSize += 10;
    document.body.style.fontSize = currentFontSize + '%';
    localStorage.setItem('fontSize', currentFontSize);
  }
}

function decreaseFontSize() {
  if (currentFontSize > 50) {
    currentFontSize -= 10;
    document.body.style.fontSize = currentFontSize + '%';
    localStorage.setItem('fontSize', currentFontSize);
  }
}

// theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
