# Contributing to Grocery Buddy

Thank you for your interest in contributing to Grocery Buddy! This document provides guidelines and information for contributors.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/robkautz/grocery-buddy.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Start the development server: `npm run dev`

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style and patterns
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep functions small and focused

### Testing

- Write tests for new features
- Ensure all tests pass: `npm run test:run`
- Maintain or improve test coverage
- Test on multiple browsers if possible

### Git Workflow

1. Make your changes
2. Run tests: `npm run test:run`
3. Run linting: `npm run lint`
4. Commit with descriptive messages
5. Push to your fork
6. Create a pull request

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add recipe search functionality
fix: resolve ingredient parsing issue
docs: update README with new features
test: add unit tests for recipe parser
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Basic UI components (Button, Input, etc.)
│   └── ...            # Feature-specific components
├── pages/             # Page components
├── state/             # State management (Zustand)
├── services/          # API and data services
├── lib/               # Utility functions
│   ├── parse/         # Recipe parsing logic
│   ├── units/         # Unit conversion
│   └── aggregate/     # Ingredient aggregation
├── types/             # TypeScript type definitions
└── schemas/           # Data validation schemas
```

## Areas for Contribution

### High Priority
- Recipe parsing improvements
- Unit conversion accuracy
- Mobile responsiveness
- Accessibility features
- Performance optimizations

### Medium Priority
- Additional recipe formats
- Export functionality
- Recipe categories
- Search improvements
- UI/UX enhancements

### Low Priority
- PWA features
- Offline support
- Advanced filtering
- Recipe scaling
- Print improvements

## Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, browser, Node.js version
6. **Screenshots**: If applicable

## Feature Requests

When requesting features:

1. **Use Case**: Describe the problem you're trying to solve
2. **Proposed Solution**: How you think it should work
3. **Alternatives**: Other solutions you've considered
4. **Additional Context**: Any other relevant information

## Pull Request Process

1. **Fork and Clone**: Fork the repo and clone your fork
2. **Create Branch**: Create a feature branch from `main`
3. **Make Changes**: Implement your changes
4. **Test**: Ensure all tests pass
5. **Lint**: Run `npm run lint` and fix any issues
6. **Commit**: Make clear, atomic commits
7. **Push**: Push your branch to your fork
8. **Pull Request**: Create a PR with a clear description

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] New tests added for new features
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

## Code Review Process

1. **Automated Checks**: CI will run tests and linting
2. **Review**: Maintainers will review the code
3. **Feedback**: Address any feedback or requested changes
4. **Approval**: Once approved, the PR will be merged

## Pushing Updates to Main Branch

If you have write access to the repository and want to push updates directly to the `main` branch:

### Workflow for Direct Pushes

1. **Make sure you're on the main branch:**
   ```bash
   git checkout main
   ```

2. **Pull the latest changes to ensure you're up to date:**
   ```bash
   git pull origin main
   ```

3. **Make your changes** to the codebase

4. **Test your changes:**
   ```bash
   npm run test:run
   npm run lint
   ```

5. **Stage your changes:**
   ```bash
   git add .
   ```

6. **Commit with a descriptive message:**
   ```bash
   git commit -m "feat: add new feature"  # or "fix: resolve bug", etc.
   ```

7. **Push to the main branch:**
   ```bash
   git push origin main
   ```

### Important Notes

- **Always pull before pushing** to avoid conflicts
- **Run tests and linting** before pushing
- **Use clear commit messages** following the conventional commit format
- **For significant changes**, consider creating a feature branch and PR instead
- **After pushing**, changes will be automatically deployed if CI/CD is configured

### Handling Merge Conflicts

If you encounter conflicts when pulling:

1. **Stash your changes** (if needed):
   ```bash
   git stash
   ```

2. **Pull the latest:**
   ```bash
   git pull origin main
   ```

3. **Apply your stashed changes:**
   ```bash
   git stash pop
   ```

4. **Resolve conflicts** in the affected files

5. **Stage resolved files:**
   ```bash
   git add .
   ```

6. **Complete the merge:**
   ```bash
   git commit -m "Merge: resolve conflicts"
   ```

7. **Push your changes:**
   ```bash
   git push origin main
   ```

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Setup
```bash
git clone https://github.com/robkautz/grocery-buddy.git
cd grocery-buddy
npm install
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## License

By contributing to Grocery Buddy, you agree that your contributions will be licensed under the MIT License.

## Questions?

If you have questions about contributing:

1. Check existing issues and discussions
2. Create a new issue with the "question" label
3. Join our community discussions (if available)

Thank you for contributing to Grocery Buddy! 🎉
