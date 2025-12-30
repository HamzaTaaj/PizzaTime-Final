# Admin System - Quick Start Guide

## 🚀 What's Been Added

Your Pizza Vending application now has a complete admin system with:

1. **Request Access Form** → Saves submissions to Shopify
2. **Admin Login** → Secure authentication with JWT
3. **Admin Dashboard** → View and manage all access requests
4. **Status Management** → Approve/Reject/Reset requests

## 📋 Quick Setup (5 Minutes)

### Step 1: Create Shopify App via Dev Dashboard

1. Go to your Shopify Admin
2. **Settings** → **Apps and sales channels** → **App development**
3. Click **Dev Dashboard** button (NOT "Build legacy custom apps")
4. In Dev Dashboard, click **Create app** → **Create an app manually**
5. Name it "Pizza Access Requests", add any URL
6. Go to **Configuration** → **Admin API access scopes**
7. Enable these permissions:
   - ✅ `read_customers`
   - ✅ `write_customers`
8. Click **Save** → Go to **API credentials** → **Install app**
9. Copy the **Admin API access token** (you'll only see it once!)
   - Format: `shpat_xxxxxxxxxxxxx`

### Step 2: Set Environment Variables

Create a `.env` file in the project root:

```env
SHOPIFY_STORE_DOMAIN=yourstore.myshopify.com
SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxxxxxxxxxx
ADMIN_EMAIL=admin@pizzaanytime.com
ADMIN_PASSWORD=YourSecurePassword123!
JWT_SECRET=generate_with_openssl_rand_base64_32
```

**Generate JWT Secret:**
```bash
openssl rand -base64 32
```

### Step 3: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add the same environment variables in **Settings** → **Environment Variables**
5. Deploy!

## 🎯 How to Use

### For Users (Request Access)
1. Visit: `https://your-domain.com` → Click "Request Access"
2. Fill out the form
3. Submit → Data saved to Shopify automatically

### For Admins (Manage Requests)
1. Visit: `https://your-domain.com/login`
2. Login with your admin credentials
3. View all submissions in the dashboard
4. Click **Approve** or **Reject** to update status

## 🔍 Where Data is Stored

All submissions are stored in **Shopify** as:
- **Customer records** (searchable by email, name, company)
- **Tags**: `access-request`, `pending-review`, `approved`, or `rejected`
- **Metafields**: All form data (company, location, machine count, etc.)

### View in Shopify:
1. Go to **Customers** in Shopify Admin
2. Filter by tag: `access-request`
3. Click any customer to see full details

## 🛠️ API Endpoints

| Endpoint | Method | Auth Required | Description |
|----------|--------|---------------|-------------|
| `/api/submit-access-request` | POST | No | Submit new request |
| `/api/admin-login` | POST | No | Admin login |
| `/api/get-access-requests` | GET | Yes | Get all requests |
| `/api/update-request-status` | POST | Yes | Update request status |

## 🔐 Security Features

- ✅ JWT authentication for admin
- ✅ Secure token storage
- ✅ Environment variables for secrets
- ✅ HTTPS in production
- ✅ Input validation

## 📱 Testing Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Visit http://localhost:5173
```

**Test the flow:**
1. Go to Request Access page → Submit a test request
2. Go to Login page → Login as admin
3. View the submission in the dashboard
4. Try approving/rejecting it

## 🐛 Troubleshooting

### "Server configuration error"
→ Check your `.env` file has all 5 variables

### "Failed to fetch requests"
→ Verify Shopify API token and permissions

### "Invalid credentials"
→ Double-check ADMIN_EMAIL and ADMIN_PASSWORD in `.env`

## 📞 Need Help?

See the full `SETUP_GUIDE.md` for detailed documentation.

---

**That's it! Your admin system is ready to go! 🎉**

