/*
 * Windows 98 Style Website Template
 * Based on the original Windows template from HTML5-Templates.com
 * Original: https://html5-templates.com/preview/windows.html
 */

let openWindows = new Set();
let activeWindow = null;
let zIndexCounter = 1000;
let draggedElement = null;
let offset = { x: 0, y: 0 };
let selectedIcon = null;

let calcExpression = '';
let calcDisplay = '0';

function openWindow(windowId) {
    const windowEl = document.getElementById(windowId + '-window');
    if (!windowEl) return;

    windowEl.classList.add('visible');
    windowEl.classList.remove('inactive');
    openWindows.add(windowId);
    setActiveWindow(windowId);
    addToTaskbar(windowId);
    closeStartMenu();
    
    clearIconSelection();
}

function closeWindow(windowId) {
    const windowEl = document.getElementById(windowId + '-window');
    if (!windowEl) return;

    windowEl.classList.remove('visible', 'active');
    windowEl.classList.add('inactive');
    openWindows.delete(windowId);
    removeFromTaskbar(windowId);
    
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
    
    const taskbarItem = document.querySelector(`[data-window="${windowId}"]`);
    if (taskbarItem) {
        taskbarItem.classList.remove('active');
    }
}

function maximizeWindow(windowId) {
    const windowEl = document.getElementById(windowId + '-window');
    if (!windowEl) return;

    if (windowEl.style.width === '100vw' || windowEl.classList.contains('maximized')) {
        windowEl.classList.remove('maximized');
        windowEl.style.width = windowEl.dataset.originalWidth || '450px';
        windowEl.style.height = windowEl.dataset.originalHeight || '350px';
        windowEl.style.top = windowEl.dataset.originalTop || '100px';
        windowEl.style.left = windowEl.dataset.originalLeft || '200px';
    } else {
        windowEl.dataset.originalWidth = windowEl.style.width;
        windowEl.dataset.originalHeight = windowEl.style.height;
        windowEl.dataset.originalTop = windowEl.style.top;
        windowEl.dataset.originalLeft = windowEl.style.left;
        
        windowEl.classList.add('maximized');
        windowEl.style.width = '100vw';
        windowEl.style.height = 'calc(100vh - 28px)';
        windowEl.style.top = '0';
        windowEl.style.left = '0';
    }
}

function setActiveWindow(windowId) {
    document.querySelectorAll('.window').forEach(w => {
        w.classList.remove('active');
        w.classList.add('inactive');
    });

    document.querySelectorAll('.taskbar-item').forEach(t => {
        t.classList.remove('active');
    });

    const windowEl = document.getElementById(windowId + '-window');
    if (windowEl) {
        windowEl.classList.add('active');
        windowEl.classList.remove('inactive');
        windowEl.style.zIndex = ++zIndexCounter;
        activeWindow = windowId;
    }

    const taskbarItem = document.querySelector(`[data-window="${windowId}"]`);
    if (taskbarItem) {
        taskbarItem.classList.add('active');
    }
}

function addToTaskbar(windowId) {
    const taskbarItems = document.getElementById('taskbar-items');
    
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

function clearIconSelection() {
    document.querySelectorAll('.icon').forEach(icon => {
        icon.classList.remove('selected');
    });
    selectedIcon = null;
}

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

function initDragAndDrop() {
    document.addEventListener('mousedown', function(e) {
        const header = e.target.closest('.window-header');
        if (header && !e.target.closest('.window-controls')) {
            draggedElement = header.parentElement;
            const rect = draggedElement.getBoundingClientRect();
            offset.x = e.clientX - rect.left;
            offset.y = e.clientY - rect.top;
            
            const windowId = draggedElement.id.replace('-window', '');
            setActiveWindow(windowId);
            
            e.preventDefault();
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (draggedElement) {
            const x = e.clientX - offset.x;
            const y = e.clientY - offset.y;
            
            const maxX = window.innerWidth - draggedElement.offsetWidth;
            const maxY = window.innerHeight - draggedElement.offsetHeight - 28;
            
            draggedElement.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
            draggedElement.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        draggedElement = null;
    });
}

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

function playWindowsSound() {
    console.log('Windows sound played');
}

document.addEventListener('click', function(e) {
    const startMenu = document.getElementById('start-menu');
    const startButton = document.querySelector('.start-button');
    
    if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
        closeStartMenu();
    }

    const window = e.target.closest('.window');
    if (window) {
        const windowId = window.id.replace('-window', '');
        setActiveWindow(windowId);
    }

    const icon = e.target.closest('.icon');
    if (icon) {
        clearIconSelection();
        icon.classList.add('selected');
        selectedIcon = icon;
    } else if (!window) {
        clearIconSelection();
    }
});

document.addEventListener('dblclick', function(e) {
    const icon = e.target.closest('.icon');
    if (icon) {
        icon.click();
    }
});

document.addEventListener('dragstart', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
    }
    
    if (e.key === 'Escape') {
        closeStartMenu();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    initDragAndDrop();
    updateClock();
    setInterval(updateClock, 1000);
    
    setTimeout(() => {
        openWindow('about');
    }, 500);
});

let currentPreviewTheme = 'default';
let appliedTheme = 'default';

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
    changeTheme('default');
    previewTheme('default');
    appliedTheme = 'default';
    currentPreviewTheme = 'default';
    
    document.getElementById('default-theme').checked = true;
}
