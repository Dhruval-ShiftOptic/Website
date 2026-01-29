# Hosting Guide for ShiftOptic Website

## Option 1: GitHub Pages (FREE - Recommended for Beginners)

### Step 1: Enable GitHub Pages
1. Go to your repository: https://github.com/Dhruval-ShiftOptic/Website
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### Step 2: Configure Custom Domain
1. In the same **Pages** settings, scroll to **Custom domain**
2. Enter your domain (e.g., `shiftoptic.com` or `www.shiftoptic.com`)
3. GitHub will create a CNAME file automatically

### Step 3: Configure DNS Records
Go to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.) and add these DNS records:

**For apex domain (shiftoptic.com):**
- Type: `A`
- Name: `@` or leave blank
- Value: 
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

**For www subdomain (www.shiftoptic.com):**
- Type: `CNAME`
- Name: `www`
- Value: `Dhruval-ShiftOptic.github.io`

**OR use only CNAME (if your registrar supports it):**
- Type: `CNAME`
- Name: `@` or leave blank
- Value: `Dhruval-ShiftOptic.github.io`

### Step 4: Wait for DNS Propagation
- DNS changes can take 24-48 hours to propagate
- Check status at: https://www.whatsmydns.net/

**Your site will be live at:** `https://shiftoptic.com`

---

## Option 2: Netlify (FREE - Very Easy, Great Performance)

### Step 1: Deploy to Netlify
1. Go to https://www.netlify.com and sign up (free)
2. Click **Add new site** → **Import an existing project**
3. Connect your GitHub account
4. Select your `Website` repository
5. Build settings:
   - **Build command:** (leave empty)
   - **Publish directory:** `/` (root)
6. Click **Deploy site**

### Step 2: Add Custom Domain
1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain: `shiftoptic.com`
4. Follow Netlify's DNS instructions

### Step 3: Configure DNS
Netlify will provide you with specific DNS records. Typically:
- **A Record** or **CNAME** pointing to Netlify's servers
- Netlify provides exact values in their dashboard

**Benefits:**
- Free SSL certificate (HTTPS)
- Fast CDN
- Easy continuous deployment
- Custom domain support

---

## Option 3: Vercel (FREE - Great for Modern Sites)

### Step 1: Deploy to Vercel
1. Go to https://vercel.com and sign up
2. Click **Add New Project**
3. Import your GitHub repository
4. Framework Preset: **Other**
5. Click **Deploy**

### Step 2: Add Custom Domain
1. Go to project **Settings** → **Domains**
2. Add your domain: `shiftoptic.com`
3. Follow DNS configuration instructions

### Step 3: Configure DNS
Vercel will provide specific DNS records to add at your registrar.

**Benefits:**
- Free SSL
- Global CDN
- Automatic deployments
- Great performance

---

## Option 4: Cloudflare Pages (FREE - Advanced)

### Step 1: Deploy
1. Sign up at https://pages.cloudflare.com
2. Connect GitHub repository
3. Build settings: Leave empty (static site)
4. Deploy

### Step 2: Add Custom Domain
1. Go to **Custom domains**
2. Add your domain
3. Configure DNS through Cloudflare (recommended) or your registrar

**Benefits:**
- Free SSL
- Fast global network
- DDoS protection
- Free if you use Cloudflare DNS

---

## Option 5: Traditional Web Hosting (Paid)

If you prefer traditional hosting (cPanel, etc.):

### Providers:
- **Bluehost** (~$3-5/month)
- **SiteGround** (~$3-10/month)
- **HostGator** (~$3-5/month)
- **A2 Hosting** (~$3-5/month)

### Steps:
1. Purchase hosting plan
2. Point domain to hosting provider's nameservers
3. Upload files via FTP or cPanel File Manager
4. Configure domain in hosting panel

---

## Recommended: GitHub Pages or Netlify

**For simplicity:** Use **GitHub Pages** (already set up with workflow)
**For better performance:** Use **Netlify** (faster CDN, better features)

Both are free and support custom domains with free SSL certificates!

---

## DNS Configuration Quick Reference

### Common DNS Record Types:
- **A Record:** Points domain to IP address
- **CNAME:** Points domain to another domain name
- **Nameservers:** Points entire domain to hosting provider

### Typical Setup:
```
A Record:     @ → 185.199.108.153 (GitHub Pages IP)
CNAME:        www → yourusername.github.io
```

---

## SSL Certificate (HTTPS)

All recommended platforms (GitHub Pages, Netlify, Vercel, Cloudflare) provide **free SSL certificates** automatically. Your site will be accessible via `https://shiftoptic.com` once configured.

---

## Need Help?

- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Netlify Docs:** https://docs.netlify.com
- **DNS Checker:** https://www.whatsmydns.net
