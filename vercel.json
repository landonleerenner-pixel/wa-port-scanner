# WA Port RFP/RFQ Scanner — Vercel Deploy Guide

## What's in this package

```
wa-port-scanner/
├── public/
│   └── index.html      ← The website (frontend)
├── api/
│   └── scan.js         ← Serverless function (holds your Gemini key)
├── vercel.json         ← Vercel routing config
└── README.md           ← This file
```

---

## Step 1 — Get a free Gemini API key (2 minutes)

1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with a Google account
3. Click **Create API Key**
4. Copy the key — it looks like: `AIzaSy...`

This key is **free**. Google's free tier gives you 1,500 requests/day and 1 million tokens/minute — more than enough for this tool.

---

## Step 2 — Deploy to Vercel (5 minutes)

### Option A — Deploy via Vercel website (easiest)

1. Create a free account at https://vercel.com (sign in with GitHub, Google, or email)
2. From your Vercel dashboard, click **Add New → Project**
3. Choose **"Import from your computer"** or upload via GitHub (see Option B below)
4. Drag and drop this entire `wa-port-scanner` folder
5. Click **Deploy**

### Option B — Deploy via GitHub (recommended for sharing)

1. Create a free GitHub account at https://github.com if you don't have one
2. Create a new repository called `wa-port-scanner`
3. Upload all files in this folder to that repository
4. Go to https://vercel.com → **Add New → Project**
5. Connect your GitHub account and select the `wa-port-scanner` repo
6. Click **Deploy**

---

## Step 3 — Add your Gemini API key to Vercel

This is the critical step. Your key lives here, not in the code.

1. In your Vercel project dashboard, go to **Settings → Environment Variables**
2. Click **Add New**
3. Set:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** *(paste your key from Step 1)*
   - **Environment:** Production, Preview, Development (check all three)
4. Click **Save**
5. Go to **Deployments** and click **Redeploy** (the key won't take effect until you redeploy)

---

## Step 4 — Share the URL

Once deployed, Vercel gives you a URL like:
```
https://wa-port-scanner.vercel.app
```

Send this URL to anyone at NELSON or AHBL. They open it in a browser — no login, no setup, no API key needed on their end. It just works.

---

## Notes

- **Cost:** $0. Vercel free tier + Gemini free tier.
- **Sharing:** Anyone with the URL can use it. If you want to restrict access, you can enable Vercel's password protection under Settings → Security (requires Vercel Pro, $20/month) — or just keep the URL private.
- **Updating:** Push changes to GitHub and Vercel auto-redeploys. Or re-upload files manually.
- **If the scan returns errors:** Double-check that your `GEMINI_API_KEY` environment variable is set correctly and that you redeployed after adding it.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "Server error 500" on scan | API key not set — check Vercel Environment Variables |
| "API key not configured" | Same as above — make sure you redeployed after adding the key |
| Scan returns 0 results | Try selecting more ports or removing keyword filters |
| Site not loading | Check Vercel dashboard for build errors |
