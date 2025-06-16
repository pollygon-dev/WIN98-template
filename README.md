# WIN98 template

A fully functional website template that recreates the classic Windows 98 desktop experience in your browser. Perfect for retro-themed portfolios, personal websites, or anyone who wants to bring back the 90s computing aesthetic.

## ✨ Features

### 🖥️ **Authentic Windows 98 Experience**
- **Desktop interface** with WIN98's teal background
- **Draggable and resizable windows** with title bars
- **Working taskbar** with Start button and system clock
- **Start menu** with program shortcuts
- **Desktop icons** with proper selection states

### 🎮 **Built-in Applications**
- **About Me** - Personal introduction window
- **My Projects** - Portfolio showcase with iframe support
- **Calculator** - Fully functional calculator app
- **Themes** - Display Properties for customizing appearance
- **Notepad** - Text editor for quick notes

### 🌈 **Theme System**
- **5 Built-in themes**: Windows Standard, Pastel Pink, Cyberpunk, Lilac, Forest Green
- **Live preview** before applying themes
- **CSS custom properties** for easy theme creation
- **Authentic Display Properties window**

### 📱 **Modern Features**
- **Responsive design** - works on desktop, tablet, and mobile
- **FontAwesome icons** for crisp, scalable graphics
- **Clean separation** of HTML, CSS, and JavaScript
- **Easy customization** with helper functions

## 🚀 Quick Start

### 1. Download Files
```
windows98-template/
├── index.html
├── style.css
└── script.js
```

### 2. Basic Setup
1. Save all three files in the same folder
2. Open `index.html` in your web browser
3. Enjoy the nostalgic Windows 98 experience!

## 🎓 Complete Beginner's Guide

### Step 1: Understanding the Files

#### **index.html** - The Structure
This file contains all the windows, icons, and layout. Think of it as the blueprint of your desktop.

#### **style.css** - The Appearance  
This file makes everything look like Windows 98. It controls colors, fonts, and spacing.

#### **script.js** - The Behavior
This file makes windows draggable, buttons clickable, and themes work.

### Step 2: Your First Customization

#### **Change the About Me Content**
1. Open `index.html` in a text editor (like Notepad++)
2. Find this section (around line 67):
```html
<!-- About Window -->
<div class="window" id="about-window" style="top: 50px; left: 100px; width: 450px; height: 350px;">
```
3. Look for the content inside `<div class="window-content">`:
```html
<h3>Welcome to My Windows 98 Style Website!</h3>
<p>This nostalgic website brings back the classic Windows 98 interface that we all remember.</p>
```
4. Replace with your own text:
```html
<h3>Hi, I'm [Your Name]!</h3>
<p>I'm a [your profession] who loves [your interests].</p>
```

#### **Change Your Projects**
1. Find the Projects window (around line 95):
```html
<!-- Projects Window -->
<div class="window" id="projects-window"...>
```
2. Look for the iframe:
```html
<iframe src="https://example.com" width="100%" height="100%"...>
```
3. Replace `https://example.com` with your portfolio URL:
```html
<iframe src="https://yourportfolio.com" width="100%" height="100%"...>
```

### Step 3: Adding Your Own Desktop Icon

#### **Step 3a: Add the Icon**
1. Find the desktop icons section (around line 15):
```html
<!-- DESKTOP ICONS -->
<div class="desktop-icons">
```
2. Add a new icon after the existing ones:
```html
<!-- Icon 6: Your New App -->
<div class="icon" onclick="openWindow('myapp')">
    <div class="icon-image">
        <i class="fas fa-heart"></i>
    </div>
    <span class="icon-text">My App</span>
</div>
```

#### **Step 3b: Create the Window**
1. Find the windows section (around line 54):
```html
<!-- WINDOWS -->
```
2. Add your new window after the existing ones:
```html
<!-- My App Window -->
<div class="window" id="myapp-window" style="top: 120px; left: 280px; width: 400px; height: 300px;">
    <div class="window-header">
        <span class="window-title">My Awesome App</span>
        <div class="window-controls">
            <a href="#" class="window-button minimize-btn" onclick="minimizeWindow('myapp')">_</a>
            <a href="#" class="window-button maximize-btn" onclick="maximizeWindow('myapp')">□</a>
            <a href="#" class="window-button close-btn" onclick="closeWindow('myapp')">×</a>
        </div>
    </div>
    <div class="window-content">
        <h3>Welcome to My App!</h3>
        <p>Put whatever content you want here!</p>
        <ul>
            <li>Lists work great</li>
            <li>You can add links: <a href="https://google.com">Google</a></li>
            <li>Or images: <img src="your-image.jpg" style="max-width: 100%;"></li>
        </ul>
        <button onclick="alert('Button clicked!')">Try This Button</button>
    </div>
</div>
```

#### **Step 3c: Add to Start Menu**
1. Find the start menu section (around line 278):
```html
<div class="start-menu-items">
```
2. Add your app to the menu:
```html
<div class="start-menu-item" onclick="openWindow('myapp')">
    <i class="fas fa-heart"></i>
    My App
</div>
```

#### **Step 3d: Tell JavaScript About Your Window**
1. Open `script.js`
2. Find the `getWindowTitle` function (around line 151):
```javascript
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
```
3. Add your window:
```javascript
function getWindowTitle(windowId) {
    const titles = {
        'about': 'About Me',
        'projects': 'My Projects',
        'calculator': 'Calculator',
        'themes': 'Display Properties',
        'notepad': 'Notepad',
        'myapp': 'My Awesome App'  // Add this line
    };
    return titles[windowId] || windowId;
}
```

### Step 4: Changing Colors and Themes

#### **Method 1: Pick an Existing Theme**
1. Open the website in your browser
2. Click the "Themes" icon
3. Try different themes and click "Apply"

#### **Method 2: Create Your Own Theme**
1. Open `style.css`
2. Find the themes section (around line 8)
3. Add your custom theme:
```css
/* My Custom Theme */
:root[data-theme="mycustom"] {
    --desktop-bg: #ff69b4;           /* Pink desktop */
    --window-bg: #ffffff;            /* White windows */
    --active-titlebar-start: #ff1493; /* Pink title bars */
    --active-titlebar-end: #ff69b4;
    --text-color: #000000;           /* Black text */
    --button-bg: #f0f0f0;            /* Light gray buttons */
    --button-hover: #e0e0e0;         /* Darker when hovering */
    --button-active: #d0d0d0;        /* Darker when clicked */
}
```
4. Add it to the themes window in `index.html`:
```html
<div style="margin: 8px 0;">
    <input type="radio" id="mycustom-theme" name="theme" value="mycustom" onchange="previewTheme('mycustom')">
    <label for="mycustom-theme">My Custom Theme</label>
</div>
```
5. Add it to the JavaScript in `script.js` (around line 470):
```javascript
const themes = {
    // ... existing themes ...
    mycustom: {
        desktop: '#ff69b4',
        window: '#ffffff',
        titlebar: 'linear-gradient(90deg, #ff1493 0%, #ff69b4 100%)',
        text: '#000000',
        button: '#f0f0f0'
    }
};
```

### Step 5: Common Customizations

#### **Change Desktop Icons**
Find any icon section and modify:
```html
<div class="icon" onclick="openWindow('about')">
    <div class="icon-image">
        <i class="fas fa-user"></i>  <!-- Change this icon -->
    </div>
    <span class="icon-text">About Me</span>  <!-- Change this text -->
</div>
```

**Popular FontAwesome icons:**
- `fas fa-home` - House
- `fas fa-envelope` - Email
- `fas fa-phone` - Phone
- `fas fa-camera` - Camera
- `fas fa-music` - Music note
- `fas fa-gamepad` - Game controller
- Find more at: [fontawesome.com/icons](https://fontawesome.com/icons)

#### **Add Your Social Media Links**
Add to any window content:
```html
<div style="margin: 20px 0;">
    <h4>Find Me Online:</h4>
    <p><a href="https://twitter.com/yourhandle" target="_blank">
        <i class="fab fa-twitter"></i> Twitter
    </a></p>
    <p><a href="https://github.com/yourusername" target="_blank">
        <i class="fab fa-github"></i> GitHub
    </a></p>
    <p><a href="mailto:your@email.com">
        <i class="fas fa-envelope"></i> Email
    </a></p>
</div>
```

#### **Change Window Sizes and Positions**
Each window has these properties you can modify:
```html
<div class="window" id="about-window" style="top: 50px; left: 100px; width: 450px; height: 350px;">
```
- `top: 50px` - Distance from top of screen
- `left: 100px` - Distance from left of screen  
- `width: 450px` - How wide the window is
- `height: 350px` - How tall the window is

**Note:** Users can resize windows by dragging the corners/edges on desktop and tablet devices. On mobile, windows automatically fit the screen for better usability.

#### **Add Images**
To add images to any window:
```html
<img src="your-photo.jpg" alt="Description" style="max-width: 100%; height: auto;">
```

#### **Create Lists**
```html
<ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ul>
```

#### **Add Buttons**
```html
<button onclick="alert('Hello!')">Click Me</button>
<button onclick="window.open('https://google.com')">Visit Google</button>
```

## 🔧 Troubleshooting

### **Common Issues:**

#### **My changes don't show up**
- Save your files and refresh the browser (Ctrl+F5 for hard refresh)
- Check for typos in your HTML tags

#### **Window won't open**
- Make sure the `onclick="openWindow('windowid')"` matches your window's ID
- Check that you added the window to the `getWindowTitle` function

#### **Theme doesn't work**
- Verify you added it to all three places: CSS, HTML, and JavaScript
- Make sure the theme name is exactly the same in all files

#### **Icon doesn't show**
- Check the FontAwesome icon name at [fontawesome.com](https://fontawesome.com/icons)
- Make sure you include the correct prefix (`fas`, `fab`, etc.)

### **Testing Your Changes:**
1. Save all files
2. Open `index.html` in your browser
3. Try clicking your new icons
4. Test that windows open, close, and resize properly
5. Check that themes work in the Themes window

## 🎨 Available Themes

| Theme | Description |
|-------|-------------|
| **Windows Standard** | Classic teal and gray Windows 98 colors |
| **Pastel Pink** | Soft pink theme with modern appeal |
| **Cyberpunk** | Futuristic dark theme with neon pink and cyan glows |
| **Lilac** | Purple and lavender color scheme |
| **Forest Green** | Nature-inspired green theme |

## 📱 Browser Support

- ✅ **Chrome** (recommended)
- ✅ **Firefox**
- ✅ **Safari**
- ✅ **Edge**
- ⚠️ **Internet Explorer** (limited support)

## 📄 License

This project is released under the [Unlicense](https://unlicense.org) - you can do whatever you want with it, no strings attached!

**However, please remember to credit HTML5-Templates.com** for the original template that this is based on, as they deserve recognition for their foundational work. You don't need to credit this version or the author, but giving a shout-out to HTML5-Templates.com is the right thing to do.

Example attribution:
```
Based on the original Windows template from HTML5-Templates.com
Original: https://html5-templates.com/preview/windows.html
```
## 🙏 Acknowledgments

- **HTML5-Templates.com** - Original Windows template inspiration from [windows.html](https://html5-templates.com/preview/windows.html)
- **Microsoft** - For the original Windows 98 design and interface
- **FontAwesome** - For the beautiful icon library
- **Google Fonts** - For web font support

## 📞 Support

If you encounter any issues or have questions:
Chat with me on Bluesky: **[@pollygon.dev](https://bsky.app/profile/pollygon.dev)**
