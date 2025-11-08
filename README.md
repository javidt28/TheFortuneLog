# 🍪 TheFortuneLog

A beautiful web app to track and manage your fortune cookie fortunes from Panda Express (or anywhere else!).

## Features

- ✨ **Add Fortunes**: Easily add new fortune cookie messages with automatic date tracking
- 📊 **Statistics Dashboard**: View total fortunes, monthly, and yearly counts
- 🔍 **Search & Filter**: Quickly find specific fortunes using the search bar
- 📅 **Date Tracking**: Each fortune is automatically timestamped when added
- 🗂️ **Sort Options**: Sort fortunes by newest, oldest, or alphabetically
- 💾 **Local Storage**: All data is stored locally in your browser
- 📤 **Export/Import**: Backup your fortunes as JSON files and import them on any device
- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices

## Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start adding your fortunes!

### Deploying to GitHub Pages (Free Hosting)

1. Create a new repository on GitHub (e.g., `TheFortuneLog`)
2. Push all files to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/TheFortuneLog.git
   git push -u origin main
   ```
3. Go to your repository settings on GitHub
4. Navigate to "Pages" in the left sidebar
5. Under "Source", select "Deploy from a branch"
6. Choose the `main` branch and `/ (root)` folder
7. Click "Save"
8. Your app will be live at `https://YOUR_USERNAME.github.io/TheFortuneLog/`

## Data Storage

The app uses **localStorage** to store your fortunes in your browser. This means:
- ✅ No server required - completely free hosting
- ✅ Works offline
- ✅ Fast and private
- ⚠️ Data is stored per browser/device

### Syncing Across Devices

To sync your fortunes across multiple devices:
1. Export your fortunes on one device (Export JSON button)
2. Import the JSON file on another device (Import JSON button)

You can also commit the exported JSON file to your GitHub repository for cloud backup!

## Tech Stack

- **React 18** - Modern UI library (via CDN)
- **Babel Standalone** - JSX transformation
- **localStorage** - Client-side data persistence
- **Pure CSS** - Modern styling with CSS variables and animations

## File Structure

```
TheFortuneLog/
├── index.html      # Main HTML file with React CDN links
├── styles.css      # Modern styling and responsive design
├── app.jsx         # React components and application logic
└── README.md       # This file
```

## Future Enhancements (Ideas)

- 📸 Photo uploads for fortune cookies
- 🏷️ Tags/categories for fortunes
- 📈 Advanced statistics and charts
- 🌙 Dark mode
- 🔗 Share individual fortunes
- 📱 PWA support for mobile app-like experience

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Feel free to use and modify this project for your personal use!

---

Made with ❤️ for fortune cookie enthusiasts

