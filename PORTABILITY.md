# Grocery Buddy - Portability Guide

This document explains how to make Grocery Buddy portable and share it with others.

## 🚀 Quick Start for New Users

### Option 1: GitHub Repository (Recommended)

1. **Fork or clone the repository:**
   ```bash
   git clone https://github.com/yourusername/grocery-buddy.git
   cd grocery-buddy
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the app:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`

### Option 2: Download and Run

1. **Download the project** as a ZIP file
2. **Extract** to your desired location
3. **Open terminal** in the project directory
4. **Run the commands** from Option 1

## 📋 Prerequisites

Before running Grocery Buddy, ensure you have:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for cloning repositories)

### Verify Installation

```bash
node --version    # Should show 18.x or higher
npm --version     # Should show 8.x or higher
git --version     # Any recent version
```

## 🔧 Setup Instructions

### Windows

1. **Install Node.js:**
   - Download from [nodejs.org](https://nodejs.org/)
   - Run installer with default settings
   - Restart Command Prompt

2. **Install Git:**
   - Download from [git-scm.com](https://git-scm.com/)
   - Run installer with default settings

3. **Clone and run:**
   ```cmd
   git clone https://github.com/yourusername/grocery-buddy.git
   cd grocery-buddy
   npm install
   npm run dev
   ```

### macOS

1. **Install Node.js:**
   - Download from [nodejs.org](https://nodejs.org/)
   - Or use Homebrew: `brew install node`

2. **Install Git:**
   - Usually pre-installed
   - Or use Homebrew: `brew install git`

3. **Clone and run:**
   ```bash
   git clone https://github.com/yourusername/grocery-buddy.git
   cd grocery-buddy
   npm install
   npm run dev
   ```

### Linux (Ubuntu/Debian)

1. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install Git:**
   ```bash
   sudo apt-get install git
   ```

3. **Clone and run:**
   ```bash
   git clone https://github.com/yourusername/grocery-buddy.git
   cd grocery-buddy
   npm install
   npm run dev
   ```

## 📁 Project Structure

```
grocery-buddy/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── state/             # State management
│   ├── services/          # API services
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript types
├── public/                # Static assets
├── examples/              # Sample recipes
├── dist/                  # Production build (after npm run build)
├── node_modules/          # Dependencies (after npm install)
├── package.json           # Project configuration
├── README.md              # Main documentation
├── SETUP.md               # Detailed setup guide
├── CONTRIBUTING.md        # Contribution guidelines
├── DEPLOYMENT.md          # Deployment options
└── PORTABILITY.md         # This file
```

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run code linting |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |

## 🌐 Sharing the Project

### Method 1: GitHub Repository

1. **Create a GitHub repository**
2. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/grocery-buddy.git
   git push -u origin main
   ```

3. **Share the repository URL**

### Method 2: ZIP File

1. **Create a ZIP file** of the project directory
2. **Share the ZIP file** via email, cloud storage, etc.
3. **Recipients extract and run** `npm install && npm run dev`

### Method 3: Deploy Online

1. **Deploy to Vercel/Netlify** (see DEPLOYMENT.md)
2. **Share the live URL**

## 🔍 Troubleshooting

### Common Issues

**"command not found: node"**
- Node.js not installed or not in PATH
- Solution: Reinstall Node.js and restart terminal

**"command not found: npm"**
- npm not installed
- Solution: Reinstall Node.js (npm comes with it)

**"EACCES: permission denied"**
- Permission issues with npm
- Solution: Fix npm permissions or use a Node version manager

**"Port 5173 is already in use"**
- Another process using the port
- Solution: Kill the process or use `npm run dev -- --port 3000`

**"Module not found" errors**
- Dependencies not installed
- Solution: Run `npm install` again

### Getting Help

1. **Check the documentation:**
   - [SETUP.md](SETUP.md) - Detailed setup guide
   - [README.md](README.md) - Main documentation
   - [CONTRIBUTING.md](CONTRIBUTING.md) - Development guidelines

2. **Check for errors:**
   - Browser console (F12)
   - Terminal output
   - Check Node.js and npm versions

3. **Common solutions:**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   
   # Check for updates
   npm update
   ```

## 📦 Production Deployment

To create a production build:

```bash
npm run build
```

The `dist/` folder contains the production files that can be deployed to any static hosting service.

## 🔄 Updating the Project

To get the latest changes:

```bash
git pull origin main
npm install
npm run dev
```

## 📞 Support

If you encounter issues:

1. **Check this guide** and other documentation
2. **Search existing issues** in the repository
3. **Create a new issue** with:
   - Your operating system
   - Node.js version (`node --version`)
   - Error messages
   - Steps to reproduce

## 🎉 Success!

Once you have Grocery Buddy running:

1. **Try uploading a recipe** from the `examples/` folder
2. **Test the selection and grocery list features**
3. **Explore the codebase** in `src/`
4. **Make your first contribution!**

---

**Happy cooking with Grocery Buddy!** 🍳📝
