# Grocery Buddy Setup Guide

This guide will help you get Grocery Buddy running on your computer from scratch.

## System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

## Step-by-Step Setup

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
node --version
npm --version
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
git clone https://github.com/yourusername/grocery-buddy.git
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

## File Structure

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
├── e2e/                   # End-to-end tests
├── dist/                  # Production build (created after build)
├── node_modules/          # Dependencies (created after npm install)
├── package.json           # Project configuration
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # This file
```

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

1. Try uploading a recipe from the `examples/` folder
2. Test the selection and grocery list features
3. Explore the codebase in `src/`
4. Run the test suite to ensure everything works
5. Make your first contribution!

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to the project.
