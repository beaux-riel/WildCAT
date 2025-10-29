# WildCAT Deployment Guide

Comprehensive guide for deploying WildCAT to production hosting platforms.

## 📦 Table of Contents

- [Quick Deploy](#quick-deploy)
- [GitHub Pages](#github-pages)
- [Vercel](#vercel)
- [Netlify](#netlify)
- [Custom Server](#custom-server)
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Post-Deployment](#post-deployment)

---

## 🚀 Quick Deploy

For the fastest deployment with zero configuration:

```bash
# Build the project
npm run build

# Choose your platform:
# 1. Drag dist/ folder to Netlify → Instant deployment
# 2. Run: vercel (if Vercel CLI installed)
# 3. Run: npm run deploy (if configured for GitHub Pages)
```

---

## 📘 GitHub Pages (Free, Git-based)

### Setup

1. **Install gh-pages package**:
   ```bash
   npm install -D gh-pages
   ```

2. **Add deploy script** to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Configure base path** in `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/wildcat/', // Replace with your repo name
     // ... rest of config
   })
   ```

### Deploy

```bash
# First time setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/wildcat.git
git push -u origin main

# Deploy to GitHub Pages
npm run deploy
```

### Configure GitHub Settings

1. Go to your repo: `https://github.com/yourusername/wildcat`
2. **Settings** → **Pages**
3. **Source**: Deploy from a branch
4. **Branch**: `gh-pages` → `/root` → **Save**
5. Wait 2-3 minutes for deployment

### Access Your App

**URL**: `https://yourusername.github.io/wildcat/`

### Custom Domain (Optional)

1. **Add CNAME file** to `public/` folder:
   ```
   wildcat.yourdomain.com
   ```

2. **Configure DNS** at your domain registrar:
   - Type: `CNAME`
   - Name: `wildcat`
   - Value: `yourusername.github.io`

3. **GitHub Settings** → **Pages** → **Custom domain**: `wildcat.yourdomain.com`

4. **Enable HTTPS** (automatic after DNS propagates)

---

## ⚡ Vercel (Free, Recommended)

### Why Vercel?

- ✅ Fastest global CDN
- ✅ Automatic HTTPS
- ✅ Zero configuration
- ✅ Preview deployments for every Git push
- ✅ Custom domains (free)
- ✅ Automatic builds on Git push

### Setup (CLI Method)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   # First deployment (answers setup questions)
   vercel

   # Production deployment
   vercel --prod
   ```

### Setup (Git Integration - Recommended)

1. **Push code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Visit**: [vercel.com](https://vercel.com)

3. **Import Project**:
   - Click **"Add New..."** → **"Project"**
   - Select your GitHub repo
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - Click **"Deploy"**

4. **Automatic deployments**:
   - Every `git push` triggers new deployment
   - Pull requests get preview URLs
   - Production branch auto-deploys

### Access Your App

**URL**: `https://wildcat-[hash].vercel.app`

### Custom Domain

1. **Vercel Dashboard** → Your project → **Settings** → **Domains**
2. **Add Domain**: `wildcat.yourdomain.com`
3. **Configure DNS** (Vercel provides instructions)
4. **HTTPS**: Automatic via Vercel

---

## 🌐 Netlify (Free, Drag-and-Drop)

### Why Netlify?

- ✅ Easiest deployment (drag-and-drop)
- ✅ Automatic HTTPS
- ✅ Forms support (if needed later)
- ✅ Serverless functions
- ✅ Split testing (A/B testing)

### Method 1: Drag-and-Drop (Fastest)

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Visit**: [app.netlify.com/drop](https://app.netlify.com/drop)

3. **Drag `dist/` folder** to the drop zone

4. **Instant deployment** (30 seconds)

5. **URL**: `https://[random-name].netlify.app`

### Method 2: Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Deploy**:
   ```bash
   # Build
   npm run build

   # Deploy (first time)
   netlify deploy

   # Production deployment
   netlify deploy --prod
   ```

### Method 3: Git Integration

1. **Push to GitHub**:
   ```bash
   git init && git add . && git commit -m "Init"
   git push
   ```

2. **Netlify Dashboard** → **New site from Git**

3. **Connect GitHub** → Select repo

4. **Build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

5. **Deploy site** → Automatic on every push

### Access Your App

**URL**: `https://wildcat-[hash].netlify.app`

### Custom Domain

1. **Netlify Dashboard** → Your site → **Domain settings**
2. **Add custom domain**: `wildcat.yourdomain.com`
3. **Configure DNS** (Netlify provides nameservers)
4. **HTTPS**: Automatic (Let's Encrypt)

### Netlify Configuration File (Optional)

Create `netlify.toml` in project root:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer-when-downgrade"
```

---

## 🖥️ Custom Server (Self-Hosted)

### Requirements

- Web server (Apache, Nginx, IIS)
- HTTPS certificate (Let's Encrypt free)
- SSH access or FTP

### Build

```bash
npm run build
```

Output: `dist/` folder with all production files

### Apache Deployment

1. **Upload files**:
   ```bash
   # Via SCP
   scp -r dist/* user@server:/var/www/html/wildcat/

   # Or use FTP client (FileZilla)
   ```

2. **Configure .htaccess** (create in `dist/` before upload):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /wildcat/
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /wildcat/index.html [L]
   </IfModule>

   # Security headers
   <IfModule mod_headers.c>
     Header set X-Content-Type-Options "nosniff"
     Header set X-Frame-Options "DENY"
     Header set X-XSS-Protection "1; mode=block"
   </IfModule>

   # Enable compression
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript
   </IfModule>
   ```

3. **Access**: `https://yourdomain.com/wildcat/`

### Nginx Deployment

1. **Upload files**:
   ```bash
   scp -r dist/* user@server:/usr/share/nginx/html/wildcat/
   ```

2. **Configure Nginx** (`/etc/nginx/sites-available/wildcat`):
   ```nginx
   server {
       listen 80;
       server_name wildcat.yourdomain.com;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name wildcat.yourdomain.com;

       ssl_certificate /etc/letsencrypt/live/wildcat.yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/wildcat.yourdomain.com/privkey.pem;

       root /usr/share/nginx/html/wildcat;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Security headers
       add_header X-Frame-Options "DENY" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header X-XSS-Protection "1; mode=block" always;

       # Caching
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

3. **Enable site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/wildcat /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

4. **SSL Certificate** (Let's Encrypt):
   ```bash
   sudo certbot --nginx -d wildcat.yourdomain.com
   ```

### IIS Deployment (Windows Server)

1. **Build and copy**:
   ```powershell
   npm run build
   xcopy dist\* C:\inetpub\wwwroot\wildcat\ /E /Y
   ```

2. **IIS Manager**:
   - Add New Website
   - **Site name**: WildCAT
   - **Physical path**: `C:\inetpub\wwwroot\wildcat`
   - **Binding**: HTTPS, port 443
   - **SSL certificate**: Select or import

3. **URL Rewrite** (install module if needed):
   ```xml
   <configuration>
     <system.webServer>
       <rewrite>
         <rules>
           <rule name="React Routes" stopProcessing="true">
             <match url=".*" />
             <conditions logicalGrouping="MatchAll">
               <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
               <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
             </conditions>
             <action type="Rewrite" url="/" />
           </rule>
         </rules>
       </rewrite>
     </system.webServer>
   </configuration>
   ```

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

### Build & Testing

- [ ] `npm run build` completes without errors
- [ ] `npm run preview` works correctly
- [ ] Test PWA installation in browser
- [ ] Test offline mode (disconnect network)
- [ ] Test CSV upload with sample files
- [ ] Test drag-and-drop column reordering
- [ ] Test save/load arrangements
- [ ] Test CSV export functionality
- [ ] Test on multiple browsers (Chrome, Safari, Firefox)
- [ ] Test on mobile devices (iOS, Android)

### Configuration

- [ ] Update `vite.config.js` base path (if using subpath)
- [ ] Verify PWA manifest has correct URLs
- [ ] Check all icons exist in `public/` folder
- [ ] Review `index.html` meta tags
- [ ] Verify HTTPS will be enabled (required for PWA)
- [ ] Set proper Content Security Policy headers

### Optimization

- [ ] Bundle size < 500 KB (check with `npm run build`)
- [ ] No console errors in production build
- [ ] Service worker caching working
- [ ] Lighthouse score > 90 (Performance, PWA, Accessibility)
- [ ] Images optimized (icons < 50 KB each)

### Documentation

- [ ] README.md updated with deployment URL
- [ ] INSTALLATION_GUIDE.md has correct app URL
- [ ] DEPLOYMENT.md reviewed
- [ ] Version number updated in package.json

### Security

- [ ] No API keys or secrets in code
- [ ] HTTPS enforced
- [ ] Security headers configured (CSP, X-Frame-Options, etc.)
- [ ] localStorage data is non-sensitive
- [ ] No tracking/analytics without user consent

---

## 🎉 Post-Deployment

### 1. Verify Deployment

```bash
# Check site is live
curl -I https://your-app-url.com

# Should return HTTP 200 and HTTPS
```

### 2. Test PWA Installation

1. **Desktop (Chrome)**:
   - Visit your URL
   - Click install icon in address bar
   - Verify standalone window opens

2. **Mobile (iOS)**:
   - Safari → Visit URL
   - Share → Add to Home Screen
   - Tap icon on home screen

3. **Test offline**:
   - Install app
   - Turn off Wi-Fi/mobile data
   - Reopen app
   - Should load instantly

### 3. Run Lighthouse Audit

1. **Open DevTools** (F12)
2. **Lighthouse tab**
3. **Generate report** (Mobile or Desktop)
4. **Target scores**:
   - Performance: >90
   - PWA: 100
   - Accessibility: >90
   - Best Practices: 100
   - SEO: >80

### 4. Monitor Initial Load

Check actual performance:

```javascript
// Add to src/main.jsx temporarily
if (import.meta.env.PROD) {
  window.addEventListener('load', () => {
    console.log('Time to Interactive:', performance.now().toFixed(2), 'ms')
  })
}
```

**Target**: < 3 seconds on 4G mobile

### 5. Share Your App

Update these locations with your live URL:

- [ ] README.md
- [ ] package.json (homepage field)
- [ ] Social media
- [ ] Documentation
- [ ] GitHub repo description

### 6. Set Up Analytics (Optional)

If you want usage insights:

```bash
npm install -D @vercel/analytics
```

```javascript
// src/main.jsx
import { inject } from '@vercel/analytics'
if (import.meta.env.PROD) inject()
```

### 7. Create Maintenance Plan

- **Weekly**: Check deployment still working
- **Monthly**: Update dependencies (`npm update`)
- **Quarterly**: Security audit (`npm audit fix`)
- **Yearly**: Review and optimize performance

---

## 🔄 Updating Production

### Quick Update (All Platforms)

```bash
# 1. Make changes locally
# 2. Test thoroughly
npm run dev

# 3. Build and test
npm run build
npm run preview

# 4. Deploy
git add .
git commit -m "Update: [description]"
git push

# Or manually:
npm run deploy  # GitHub Pages
vercel --prod   # Vercel
netlify deploy --prod  # Netlify
```

### Zero-Downtime Updates

Most platforms (Vercel, Netlify) automatically:
1. Build new version
2. Deploy to new servers
3. Switch traffic atomically
4. Keep old version running during build

**Rollback**: All platforms keep previous versions:
- **Vercel**: Deployments page → Promote to Production
- **Netlify**: Deploys page → Publish deploy
- **GitHub Pages**: Revert commit, redeploy

---

## 📊 Performance Optimization

### Before Deploying

1. **Analyze bundle**:
   ```bash
   npm run build
   npx vite-bundle-visualizer dist/stats.html
   ```

2. **Optimize images**:
   - Use WebP format
   - Compress PNG/JPG (TinyPNG)
   - Target: Icons < 50 KB

3. **Enable compression**:
   - Brotli (better than gzip)
   - Automatic on Vercel/Netlify
   - Configure manually on custom servers

### After Deploying

1. **CDN Caching**:
   - Set long cache times (1 year for assets)
   - Automatic on Vercel/Netlify
   - Configure on custom servers

2. **Monitor performance**:
   - Use Lighthouse CI
   - Real User Monitoring (RUM)
   - Check Core Web Vitals

---

## 🔒 Security Hardening

### Content Security Policy

Add to `index.html`:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               style-src 'self' 'unsafe-inline';
               script-src 'self';
               img-src 'self' data: blob:;">
```

### Security Headers (Server Config)

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: no-referrer-when-downgrade
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Automatic on**: Vercel, Netlify (with config)
**Manual setup**: Apache, Nginx, IIS

---

## 🆘 Deployment Troubleshooting

### Build Fails

**Error**: `npm run build` fails

**Solutions**:
1. Delete `node_modules/` and `package-lock.json`
2. Run `npm install`
3. Try `npm run build` again
4. Check Node.js version (need 18+)

### 404 Errors After Deployment

**Cause**: SPA routing not configured

**Solution**: Add rewrite rules (see platform-specific sections)

### PWA Not Installing

**Cause**: HTTPS not enabled

**Solution**:
- Verify URL uses `https://` (not `http://`)
- Check SSL certificate valid
- Use platform with automatic HTTPS

### Service Worker Errors

**Cause**: Caching issues

**Solution**:
1. Clear browser cache
2. Unregister old service worker (DevTools → Application → SW → Unregister)
3. Hard refresh (Ctrl + Shift + R)

### Assets Not Loading

**Cause**: Incorrect base path

**Solution**:
```javascript
// vite.config.js
export default defineConfig({
  base: './', // Relative paths (works everywhere)
  // Or specific path:
  base: '/wildcat/', // For subdirectory deployments
})
```

---

## 📈 Cost Comparison

### Free Tier Limits

| Platform | Bandwidth | Builds | Custom Domain | SSL |
|----------|-----------|--------|---------------|-----|
| **GitHub Pages** | 100 GB/month | Unlimited | ✅ | ✅ |
| **Vercel** | 100 GB/month | 100/month | ✅ | ✅ |
| **Netlify** | 100 GB/month | 300 min/month | ✅ | ✅ |

**All free tiers are sufficient** for typical usage (1000-10000 users/month)

### Custom Server Costs

- **VPS**: $5-10/month (DigitalOcean, Linode)
- **Shared hosting**: $3-8/month
- **SSL Certificate**: $0 (Let's Encrypt free)

**Recommendation**: Use Vercel/Netlify free tier unless specific server requirements

---

**Version**: 1.0.0
**Last Updated**: 2025-10-29
**Platforms Tested**: GitHub Pages, Vercel, Netlify, Apache, Nginx
