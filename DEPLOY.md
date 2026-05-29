# Deploying Usternium to usternium.com

## Overview
Usternium is a static site (no server needed). The easiest path:
**Vercel** hosts it for free → you point usternium.com DNS at Vercel → done.

---

## Step 1 — Push to GitHub

First put the project in a GitHub repo.

```bash
cd /Users/avi/usternium

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/usternium.git
git push -u origin main
```

---

## Step 2 — Deploy to Vercel

1. Go to **vercel.com** → sign up with GitHub (free)
2. Click **"Add New Project"**
3. Import your `usternium` GitHub repository
4. Vercel auto-detects Vite. Settings should be:
   - **Framework Preset:** Vite
   - **Build Command:** `bun run build` (or `npm run build`)
   - **Output Directory:** `dist`
5. Click **Deploy**

Vercel gives you a URL like `usternium.vercel.app`. Your site is live.

---

## Step 3 — Connect usternium.com

### In Vercel:
1. Open your project → **Settings → Domains**
2. Click **"Add Domain"**
3. Type `usternium.com` and click **Add**
4. Also add `www.usternium.com` → set it to redirect to `usternium.com`
5. Vercel shows you the DNS records to set. It will look like:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

### In your domain registrar (where you bought usternium.com):
Go to your registrar's DNS settings. Common ones:
- **Namecheap:** Dashboard → Domain List → Manage → Advanced DNS
- **GoDaddy:** My Products → DNS
- **Google Domains / Squarespace:** DNS settings
- **Cloudflare:** DNS → Records

Delete any existing A or CNAME records for `@` and `www`, then add:

| Type  | Name | Value               | TTL  |
|-------|------|---------------------|------|
| A     | @    | 76.76.21.21         | Auto |
| CNAME | www  | cname.vercel-dns.com| Auto |

**DNS propagates in 5–60 minutes** (sometimes up to 24h).

Back in Vercel → Domains, wait for the green ✓ checkmark next to `usternium.com`.

Vercel automatically provisions a free SSL certificate (HTTPS). No setup needed.

---

## Step 4 — Future updates

Every time you push to `main` on GitHub, Vercel auto-redeploys. Zero extra steps.

```bash
# Make changes, then:
git add .
git commit -m "Update content"
git push
# Vercel deploys in ~30 seconds
```

---

## Alternative: Netlify (also free)

If you prefer Netlify:
1. netlify.com → "Add new site" → "Import an existing project"
2. Connect GitHub, pick the repo
3. Build command: `bun run build`, publish dir: `dist`
4. Domains → Add custom domain → follow the same DNS steps above
   - Netlify uses different IPs — check their docs for current values

---

## Alternative: Cloudflare Pages (fastest CDN, free)

1. dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
2. Select your repo, set build command `npm run build`, output `dist`
3. If your domain is already on Cloudflare, the custom domain setup is automatic
4. If not: add your site to Cloudflare first, update nameservers at your registrar

---

## Quick checklist

- [ ] `bun run build` runs without errors locally
- [ ] Repo pushed to GitHub
- [ ] Vercel project created and connected to repo
- [ ] `usternium.com` added as custom domain in Vercel
- [ ] A record and CNAME set at registrar
- [ ] Green SSL checkmark in Vercel dashboard
- [ ] Visit https://usternium.com — site loads 🎉
