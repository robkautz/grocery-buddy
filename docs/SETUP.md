# Grocery Buddy Setup Guide

This guide will help you get Grocery Buddy running on your computer from scratch, whether you're setting it up for the first time or sharing it with others.

## System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

## Quick Start

### Option 1: GitHub Repository (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/robkautz/grocery-buddy.git
   cd grocery-buddy
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`

### Option 2: Download and Run

1. **Download the project** as a ZIP file from GitHub
2. **Extract** to your desired location
3. **Open terminal** in the project directory
4. **Run the commands** from Option 1

## Step-by-Step Installation

### 1. Install Node.js

**Windows:**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version (recommended)
3. Run the installer and follow the instructions
4. Restart your command prompt/terminal

**macOS:**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version
3. Run the installer
4. Or use Homebrew: `brew install node`

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify installation:**
```bash
node --version    # Should show 18.x or higher
npm --version     # Should show 8.x or higher
```

### 2. Install Git

**Windows:**
1. Download from [git-scm.com](https://git-scm.com/)
2. Run the installer with default settings

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

### 3. Clone the Repository

```bash
git clone https://github.com/robkautz/grocery-buddy.git
cd grocery-buddy
```

### 4. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 5. Start the Development Server

```bash
npm run dev
```

You should see output like:
```
VITE v7.1.3  ready in 93 ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 6. Open in Browser

Navigate to `http://localhost:5173` in your browser.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run code linting |
| `npm run test` | Run unit tests |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run tests with coverage |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:e2e:ui` | Run e2e tests with UI |

## Updating to the Latest Version

If you already have Grocery Buddy installed and want to update to the latest version:

1. **Navigate to your project directory:**
   ```bash
   cd grocery-buddy
   ```

2. **Fetch the latest changes from GitHub:**
   ```bash
   git fetch origin
   ```

3. **Pull the latest changes:**
   ```bash
   git pull origin main
   ```

4. **Update dependencies (if package.json changed):**
   ```bash
   npm install
   ```

5. **Restart the development server:**
   ```bash
   npm run dev
   ```

**Note:** If you have local changes that conflict with the updates, Git will let you know. You may need to:
- Commit your changes first: `git add . && git commit -m "Your commit message"`
- Or stash them: `git stash` (then `git stash pop` after pulling)

## Troubleshooting

### Common Issues

**"command not found: node"**
- Node.js is not installed or not in PATH
- Solution: Reinstall Node.js and restart terminal

**"command not found: npm"**
- npm is not installed
- Solution: Reinstall Node.js (npm comes with it)

**"EACCES: permission denied"**
- Permission issues with npm
- Solution: Fix npm permissions or use a Node version manager

**"Port 5173 is already in use"**
- Another process is using the port
- Solution: Kill the process or use a different port
- To use a specific port: `npm run dev -- --port 3000`

**"Module not found" errors**
- Dependencies not installed
- Solution: Run `npm install` again

**"Cannot find module" errors**
- Missing dependencies
- Solution: Delete `node_modules` and `package-lock.json`, then run `npm install`

### Port Issues

If port 5173 is busy, Vite will automatically try the next available port (5174, 5175, etc.).

To use a specific port:
```bash
npm run dev -- --port 3000
```

### Network Access

To access from other devices on your network:
```bash
npm run dev -- --host
```

Then use your computer's IP address: `http://192.168.1.100:5173`

### Performance Issues

**Slow startup:**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall

**Slow hot reload:**
- Close unnecessary browser tabs
- Disable browser extensions temporarily

## Development Workflow

### Making Changes

1. Edit files in `src/`
2. Changes appear automatically in browser (hot reload)
3. Check browser console for errors

### Running Tests

```bash
# Run all tests
npm run test

# Run tests once
npm run test:run

# Run with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

### Building for Production

```bash
npm run build
```

Files will be created in `dist/` directory.

## Project Structure

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
│   └── recipes/          # Recipe files (public and private)
├── docs/                  # Documentation
├── e2e/                   # End-to-end tests
├── dist/                  # Production build (created after build)
├── node_modules/          # Dependencies (created after npm install)
├── package.json           # Project configuration
├── vite.config.ts         # Vite configuration
└── README.md              # Main documentation
```

## Sharing the Project

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

1. **Deploy to Vercel/Netlify** (see [DEPLOYMENT.md](DEPLOYMENT.md))
2. **Share the live URL**

## Getting Help

If you encounter issues:

1. Check this troubleshooting guide
2. Look at the browser console for errors
3. Check the terminal output for build errors
4. Search existing issues in the repository
5. Create a new issue with:
   - Your operating system
   - Node.js version (`node --version`)
   - npm version (`npm --version`)
   - Error messages
   - Steps to reproduce

## Next Steps

Once you have Grocery Buddy running:

1. Check out the recipes in `public/recipes/` folder
2. Test the selection and grocery list features
3. Explore the codebase in `src/`
4. Run the test suite to ensure everything works
5. Make your first contribution!

## Related Documentation

- **[README.md](../README.md)** - Main documentation and quick start
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment options and guides
