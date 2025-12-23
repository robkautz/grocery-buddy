# Grocery Buddy Deployment Guide

This guide covers various ways to deploy Grocery Buddy to production.

## Prerequisites

- Built application (`npm run build`)
- Static file hosting service or server
- Domain name (optional)

## Build Process

First, create a production build:

```bash
npm run build
```

This creates a `dist/` directory with optimized files ready for deployment.

## Deployment Options

### 1. Vercel (Recommended)

**Automatic Deployment:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on every push

**Manual Deployment:**
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 2. Netlify

**Automatic Deployment:**
1. Connect GitHub repository
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy

**Manual Deployment:**
1. Build the project: `npm run build`
2. Drag and drop `dist/` folder to Netlify
3. Configure custom domain (optional)

### 3. GitHub Pages

**Using GitHub Actions:**
1. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. Enable GitHub Pages in repository settings
3. Select "GitHub Actions" as source

### 4. Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize: `firebase init hosting`
3. Configure `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```
4. Deploy: `firebase deploy`

### 5. AWS S3 + CloudFront

1. Build the project: `npm run build`
2. Upload `dist/` contents to S3 bucket
3. Configure bucket for static website hosting
4. Set up CloudFront distribution
5. Configure custom domain (optional)

### 6. Self-Hosted Server

**Using Nginx:**
1. Build: `npm run build`
2. Copy `dist/` to server
3. Configure Nginx:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Using Apache:**
1. Build: `npm run build`
2. Copy `dist/` to web directory
3. Create `.htaccess`:
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## Environment Variables

For production builds, you may need to set environment variables:

```bash
# .env.production
VITE_APP_TITLE=Grocery Buddy
VITE_APP_VERSION=1.0.0
```

## Performance Optimization

### Build Optimization
- Minification is handled by Vite
- Code splitting is automatic
- Assets are optimized

### Runtime Optimization
- Enable gzip compression on server
- Set proper cache headers
- Use CDN for static assets

### Example Nginx Configuration:
```nginx
server {
    # ... other config ...
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Cache HTML files for shorter time
    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public";
    }
}
```

## Monitoring and Analytics

### Error Tracking
Consider adding error tracking:
- Sentry
- LogRocket
- Bugsnag

### Analytics
- Google Analytics
- Plausible
- Fathom

## Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **Headers**: Set security headers
3. **CSP**: Configure Content Security Policy
4. **Updates**: Keep dependencies updated

### Example Security Headers (Nginx):
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## Troubleshooting

### Common Issues

**404 on refresh:**
- Configure server to serve `index.html` for all routes
- This is a SPA routing issue

**Assets not loading:**
- Check base URL configuration
- Verify file paths are correct

**Build fails:**
- Check Node.js version (18+)
- Clear node_modules and reinstall
- Check for TypeScript errors

**Performance issues:**
- Enable gzip compression
- Use CDN for static assets
- Optimize images

## Domain Setup

1. **Purchase domain** from registrar
2. **Configure DNS** to point to hosting service
3. **Set up SSL certificate** (usually automatic with modern hosts)
4. **Update base URL** if needed

## Backup Strategy

Since Grocery Buddy stores data locally:
- Users should export/backup their recipes
- Consider adding cloud sync feature
- Document data export process

## Maintenance

1. **Regular updates**: Keep dependencies updated
2. **Security patches**: Apply security updates promptly
3. **Monitoring**: Set up uptime monitoring
4. **Backups**: Regular backups of configuration

## Support

For deployment issues:
1. Check this guide
2. Review hosting provider documentation
3. Check project issues
4. Create new issue with deployment details
