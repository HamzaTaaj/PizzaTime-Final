# Shopify Setup - Step-by-Step Visual Guide

## 🎯 What You're Seeing

When you navigate to **Settings** → **Apps and sales channels**, you see:

```
┌─────────────────────────────────────────────────────────────┐
│                    App development                          │
│                                                             │
│  Build and manage apps in your Dev Dashboard               │
│  Dev Dashboard is your new app development home, with       │
│  more capabilities and tools than legacy custom apps offer. │
│                                                             │
│  ┌──────────────────┐                                       │
│  │  Dev Dashboard   │  ← USE THIS ONE ✅                    │
│  └──────────────────┘                                       │
│                                                             │
│  Build legacy custom apps                                   │
│  Starting January 1, 2026, you will not be able to create  │
│  new legacy custom apps.                                    │
│                                                             │
│  ┌──────────────────────────────┐                          │
│  │  Generate an API key         │  ← DON'T USE THIS ❌      │
│  └──────────────────────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

## ✅ Correct Path: Use Dev Dashboard

Follow these exact steps:

### Step 1: Click "Dev Dashboard" Button

Click the **Dev Dashboard** button (the first option at the top).

**Why?** As mentioned in the [Shopify Dev Dashboard documentation](https://shopify.dev/docs/apps/build/dev-dashboard):
> "If your project focuses on backend automation, secure data sync, or API integration—and doesn't need an interface in the Shopify admin—you can create and configure an app directly in the Dev Dashboard."

This is exactly what we need for your pizza vending access request system!

### Step 2: Create App in Dev Dashboard

After clicking Dev Dashboard, you'll be redirected to `dev.shopify.com/dashboard`:

1. **Click "Create app"** button
2. Choose **"Create an app manually"** (for API-only apps)
3. Fill in the form:
   ```
   App name: Pizza Anytime Access Requests
   App URL: https://your-domain.vercel.app
   ```
   (You can use a placeholder URL if you don't have your Vercel domain yet)

### Step 3: Configure API Permissions

Once your app is created:

1. In the left sidebar, click **"Configuration"**
2. Scroll down to **"Admin API access scopes"**
3. In the search box, type: `customers`
4. Check these two boxes:
   - ✅ `read_customers` - Read customer data
   - ✅ `write_customers` - Write customer data
5. Click **"Save"** (top right corner)

### Step 4: Install App and Get Token

1. In the left sidebar, click **"API credentials"**
2. Click **"Install app"** button
3. Review the permissions and click **"Install"**
4. Under **"Admin API access token"**, click **"Reveal token once"**
5. **Copy the token immediately!** It looks like: `shpat_xxxxxxxxxxxxxxxxxxxxx`
6. Save it - you'll need it for your `.env` file

### Step 5: Get Your Store Domain

Your store domain is in this format: `yourstore.myshopify.com`

To find it:
- Look at your Shopify Admin URL in the browser
- Example: `https://admin.shopify.com/store/pizza-anytime-2024`
- Your domain is: `pizza-anytime-2024.myshopify.com`

### Step 6: Create .env File

Now create your `.env` file in the project root:

```env
SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxx
ADMIN_EMAIL=admin@pizzaanytime.com
ADMIN_PASSWORD=YourSecurePassword123!
JWT_SECRET=your_generated_jwt_secret
```

To generate JWT_SECRET:
```bash
openssl rand -base64 32
```

## ❌ Don't Use "Build legacy custom apps"

The second option ("Generate an API key") is for **legacy custom apps** which:
- Are being **deprecated on January 1, 2026**
- Have fewer capabilities than Dev Dashboard apps
- Are not recommended by Shopify

Always use Dev Dashboard for new apps!

## 🔗 Official Documentation

For more details, see:
- [Shopify Dev Dashboard Docs](https://shopify.dev/docs/apps/build/dev-dashboard)
- [Creating Apps in Dev Dashboard](https://shopify.dev/docs/apps/build/dev-dashboard#create-apps)

## ✅ Summary Checklist

- [ ] Click "Dev Dashboard" (not "Generate an API key")
- [ ] Create app manually in Dev Dashboard
- [ ] Configure API scopes: `read_customers` + `write_customers`
- [ ] Install app and copy access token
- [ ] Get your store domain (.myshopify.com format)
- [ ] Create `.env` file with all credentials
- [ ] Test locally with `npm run dev`
- [ ] Deploy to Vercel with environment variables

---

**You're all set! The Dev Dashboard approach gives you full API access for your access request system. 🚀**

