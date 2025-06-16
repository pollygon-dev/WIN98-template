/*
 * Windows 98 Style Website Template
 * Based on the original Windows template from HTML5-Templates.com
 * Original: https://html5-templates.com/preview/windows.html
 */

// ===== GLOBAL VARIABLES =====
let openWindows = new Set();
let activeWindow = null;
let zIndexCounter = 1000;
let draggedElement = null;
let offset = { x: 0, y: 0 };
let selectedIcon = null;

// Calculator variables
let calcExpression = '';
let calcDisplay = '0';

// ===== WINDOW MANAGEMENT =====
function openWindow(windowId) {
    const windowEl = document.getElementById(windowId + '-window');
    if (!windowEl) return;

    windowEl.classList.add('visible');
    windowEl.classList.remove('inactive');
    openWindows.add(windowId);
    setActiveWindow(windowId);
    addToTaskbar(windowId);
    closeStartMenu();
    
    // Clear icon selection
    clearIconSelection();
}

function closeWindow(windowId) {
    const windowEl = document.getElementById(windowId + '-window');
    if (!windowEl) return;

    windowEl.classList.remove('visible', 'active');
    windowEl.classList.add('inactive');
    openWindows.delete(windowId);
    removeFromTaskbar(windowId);
    
    // Set another window as active if available
    if (openWindows.size > 0) {
        const nextWindow = Array.from(openWindows)[0];
        setActiveWindow(nextWindow);
    } else {
        activeWindow = null;
    }
}

function minimizeWindow(windowId) {
    const windowEl = document.getElementById(windowId + '-window');
    if (!windowEl) return;

    windowEl.classList.remove('visible');
    windowEl.classList.remove('active');
    windowEl.classList.add('inactive');
    
    // Update taskbar item
    const taskbarItem = document.querySelector(`[data-window="${windowId}"]`);
    if (taskbarItem) {
        taskbarItem.classList.remove('active');
    }
}

function maximizeWindow(windowId) {
    const windowEl = document.getElementById(windowId + '-window');
    if (!windowEl) return;

    if (windowEl.style.width === '100vw' || windowEl.classList.contains('maximized')) {
        // Restore
        windowEl.classList.remove('maximized');
        windowEl.style.width = windowEl.dataset.originalWidth || '450px';
        windowEl.style.height = windowEl.dataset.originalHeight || '350px';
        windowEl.style.top = windowEl.dataset.originalTop || '100px';
        windowEl.style.left = windowEl.dataset.originalLeft || '200px';
    } else {
        // Store original dimensions
        windowEl.dataset.originalWidth = windowEl.style.width;
        windowEl.dataset.originalHeight = windowEl.style.height;
        windowEl.dataset.originalTop = windowEl.style.top;
        windowEl.dataset.originalLeft = windowEl.style.left;
        
        // Maximize
        windowEl.classList.add('maximized');
        windowEl.style.width = '100vw';
        windowEl.style.height = 'calc(100vh - 28px)';
        windowEl.style.top = '0';
        windowEl.style.left = '0';
    }
}

function setActiveWindow(windowId) {
    // Remove active class from all windows
    document.querySelectorAll('.window').forEach(w => {
        w.classList.remove('active');
        w.classList.add('inactive');
    });

    // Remove active class from all taskbar items
    document.querySelectorAll('.taskbar-item').forEach(t => {
        t.classList.remove('active');
    });

    // Set active window
    const windowEl = document.getElementById(windowId + '-window');
    if (windowEl) {
        windowEl.classList.add('active');
        windowEl.classList.remove('inactive');
        windowEl.style.zIndex = ++zIndexCounter;
        activeWindow = windowId;
    }

    // Set active taskbar item
    const taskbarItem = document.querySelector(`[data-window="${windowId}"]`);
    if (taskbarItem) {
        taskbarItem.classList.add('active');
    }
}

// ===== TASKBAR MANAGEMENT =====
function addToTaskbar(windowId) {
    const taskbarItems = document.getElementById('taskbar-items');
    
    // Don't add if already exists
    if (document.querySelector(`[data-window="${windowId}"]`)) return;

    const item = document.createElement('div');
    item.className = 'taskbar-item';
    item.setAttribute('data-window', windowId);
    item.textContent = getWindowTitle(windowId);
    item.onclick = () => toggleWindow(windowId);
    
    taskbarItems.appendChild(item);
}

function removeFromTaskbar(windowId) {
    const item = document.querySelector(`[data-window="${windowId}"]`);
    if (item) {
        item.remove();
    }
}

function toggleWindow(windowId) {
    const windowEl = document.getElementById(windowId + '-window');
    if (!windowEl) return;

    if (windowEl.classList.contains('visible') && activeWindow === windowId) {
        minimizeWindow(windowId);
    } else {
        windowEl.classList.add('visible');
        setActiveWindow(windowId);
    }
}

function getWindowTitle(windowId) {
    const titles = {
        'about': 'About Me',
        'projects': 'My Projects',
        'calculator': 'Calculator',
        'themes': 'Display Properties',
        'notepad': 'Notepad'
    };
    return titles[windowId] || windowId;
}

// ===== ICON MANAGEMENT =====
function clearIconSelection() {
    document.querySelectorAll('.icon').forEach(icon => {
        icon.classList.remove('selected');
    });
    selectedIcon = null;
}

// ===== START MENU =====
function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    const startButton = document.querySelector('.start-button');
    
    if (startMenu.classList.contains('visible')) {
        startMenu.classList.remove('visible');
        startButton.classList.remove('active');
    } else {
        startMenu.classList.add('visible');
        startButton.classList.add('active');
    }
}

function closeStartMenu() {
    const startMenu = document.getElementById('start-menu');
    const startButton = document.querySelector('.start-button');
    startMenu.classList.remove('visible');
    startButton.classList.remove('active');
}

function showShutdownDialog() {
    closeStartMenu();
    alert('Thanks for visiting my Windows 98 website!\n\nThis is just a demo shutdown dialog.');
}

// ===== CALCULATOR FUNCTIONS =====
function calcInput(value) {
    const display = document.getElementById('calc-display');
    if (calcDisplay === '0' && value !== '.') {
        calcDisplay = value;
    } else {
        calcDisplay += value;
    }
    display.value = calcDisplay;
}

function clearCalc() {
    calcDisplay = '0';
    calcExpression = '';
    document.getElementById('calc-display').value = calcDisplay;
}

function calcBackspace() {
    if (calcDisplay.length > 1) {
        calcDisplay = calcDisplay.slice(0, -1);
    } else {
        calcDisplay = '0';
    }
    document.getElementById('calc-display').value = calcDisplay;
}

function calcEqual() {
    try {
        // Replace × with * for evaluation
        const expression = calcDisplay.replace(/×/g, '*');
        const result = eval(expression);
        calcDisplay = result.toString();
        document.getElementById('calc-display').value = calcDisplay;
    } catch (error) {
        calcDisplay = 'Error';
        document.getElementById('calc-display').value = calcDisplay;
        setTimeout(() => {
            clearCalc();
        }, 1500);
    }
}

// ===== DRAG AND DROP =====
function initDragAndDrop() {
    document.addEventListener('mousedown', function(e) {
        const header = e.target.closest('.window-header');
        if (header && !e.target.closest('.window-controls')) {
            draggedElement = header.parentElement;
            const rect = draggedElement.getBoundingClientRect();
            offset.x = e.clientX - rect.left;
            offset.y = e.clientY - rect.top;
            
            // Set as active window
            const windowId = draggedElement.id.replace('-window', '');
            setActiveWindow(windowId);
            
            e.preventDefault();
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (draggedElement) {
            const x = e.clientX - offset.x;
            const y = e.clientY - offset.y;
            
            // Keep window within viewport
            const maxX = window.innerWidth - draggedElement.offsetWidth;
            const maxY = window.innerHeight - draggedElement.offsetHeight - 28; // Account for taskbar
            
            draggedElement.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
            draggedElement.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        draggedElement = null;
    });
}

// ===== CLOCK =====
function updateClock() {
    const clockEl = document.getElementById('clock');
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    clockEl.textContent = timeString;
}

// ===== UTILITY FUNCTIONS =====
function playWindowsSound() {
    // You can add Windows 98 sound effects here
    console.log('Windows sound played');
}

// ===== EVENT LISTENERS =====
document.addEventListener('click', function(e) {
    // Close start menu when clicking outside
    const startMenu = document.getElementById('start-menu');
    const startButton = document.querySelector('.start-button');
    
    if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
        closeStartMenu();
    }

    // Set window as active when clicked
    const window = e.target.closest('.window');
    if (window) {
        const windowId = window.id.replace('-window', '');
        setActiveWindow(windowId);
    }

    // Handle icon selection
    const icon = e.target.closest('.icon');
    if (icon) {
        clearIconSelection();
        icon.classList.add('selected');
        selectedIcon = icon;
    } else if (!window) {
        clearIconSelection();
    }
});

// Handle double-click on desktop icons
document.addEventListener('dblclick', function(e) {
    const icon = e.target.closest('.icon');
    if (icon) {
        icon.click();
    }
});

// Prevent default drag behavior on images and icons
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
});

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + Tab for window switching
    if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        // Implement window switching logic here
    }
    
    // Escape to close start menu
    if (e.key === 'Escape') {
        closeStartMenu();
    }
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initDragAndDrop();
    updateClock();
    setInterval(updateClock, 1000);
    
    // Open about window by default
    setTimeout(() => {
        openWindow('about');
    }, 500);
});

// ===== THEME FUNCTIONS =====
let currentPreviewTheme = 'default';
let appliedTheme = 'default';

// Theme color definitions
const themes = {
    default: {
        desktop: '#008080',
        window: '#c0c0c0',
        titlebar: 'linear-gradient(90deg, #000080 0%, #0040c0 100%)',
        text: '#000000',
        button: '#c0c0c0'
    },
    pink: {
        desktop: '#f8bbd9',
        window: '#fdf2f8',
        titlebar: 'linear-gradient(90deg, #ec4899 0%, #be185d 100%)',
        text: '#000000',
        button: '#fdf2f8'
    },
    cyberpunk: {
        desktop: 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #000a1a 100%)',
        window: '#0d1117',
        titlebar: 'linear-gradient(90deg, #ff00ff 0%, #00ffff 100%)',
        text: '#00ffff',
        button: '#21262d'
    },
    lilac: {
        desktop: '#c8b2db',
        window: '#e6e6fa',
        titlebar: 'linear-gradient(90deg, #9370db 0%, #663399 100%)',
        text: '#000000',
        button: '#e6e6fa'
    },
    green: {
        desktop: '#228b22',
        window: '#f0fff0',
        titlebar: 'linear-gradient(90deg, #008000 0%, #004000 100%)',
        text: '#000000',
        button: '#f0fff0'
    }
};

function previewTheme(themeName) {
    currentPreviewTheme = themeName;
    updateThemePreview(themeName);
}

function updateThemePreview(themeName) {
    const theme = themes[themeName];
    const previewDesktop = document.getElementById('preview-desktop');
    const previewWindow = document.getElementById('preview-window');
    const previewTitlebar = document.getElementById('preview-titlebar');
    const previewContent = document.getElementById('preview-content');
    const previewButton = document.getElementById('preview-button');
    
    if (theme && previewDesktop && previewWindow && previewTitlebar && previewContent && previewButton) {
        previewDesktop.style.background = theme.desktop;
        previewWindow.style.background = theme.window;
        previewWindow.style.borderColor = theme.window;
        previewTitlebar.style.background = theme.titlebar;
        previewContent.style.background = theme.window;
        previewContent.style.color = theme.text;
        previewButton.style.background = theme.button;
        previewButton.style.borderColor = theme.button;
        previewButton.style.color = theme.text;
    }
}

function applyCurrentTheme() {
    changeTheme(currentPreviewTheme);
    appliedTheme = currentPreviewTheme;
    alert('Theme applied successfully!');
}

function changeTheme(themeName) {
    const root = document.documentElement;
    
    if (themeName === 'default') {
        root.removeAttribute('data-theme');
    } else {
        root.setAttribute('data-theme', themeName);
    }
}

function resetTheme() {
    // Reset to default
    changeTheme('default');
    previewTheme('default');
    appliedTheme = 'default';
    currentPreviewTheme = 'default';
    
    // Reset radio button
    document.getElementById('default-theme').checked = true;
}

