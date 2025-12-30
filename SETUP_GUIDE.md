# Pizza Vending Machine - Admin Setup Guide

## Overview

This application now includes a complete admin system for managing access requests through Shopify integration.

## Features

- ✅ Request access form submissions saved to Shopify
- ✅ Admin authentication with JWT tokens
- ✅ Admin dashboard to view all submissions
- ✅ Approve/Reject/Reset status for each request
- ✅ Filter requests by status (All, Pending, Approved, Rejected)
- ✅ Secure API endpoints with authentication

## Prerequisites

1. **Node.js** (v18 or higher)
2. **A Shopify Store** (any plan that supports custom apps)
3. **Vercel Account** (for deployment)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Shopify App via Dev Dashboard

Since you need API access for backend automation (saving form submissions and reading customer data), you'll use the **Dev Dashboard** method which is perfect for API-only apps.

#### a. Access Dev Dashboard

1. Go to your Shopify Admin panel
2. Navigate to **Settings** → **Apps and sales channels**
3. Click **App development** (at the top)
4. You'll see two options:
   - **Dev Dashboard** ← Choose this one
   - Build legacy custom apps (deprecated, don't use)
5. Click **Dev Dashboard** button

#### b. Create Your App in Dev Dashboard

1. You'll be redirected to [dev.shopify.com/dashboard](https://dev.shopify.com/dashboard)
2. Click **Create app** button
3. Choose **Create an app manually** (for API-only access)
4. Enter app details:
   - **App name**: "Pizza Anytime Access Requests" (or your preferred name)
   - **App URL**: You can use your Vercel domain (e.g., `https://your-app.vercel.app`) or a placeholder like `https://example.com` if you don't have it yet
5. Click **Create app**

#### c. Configure API Scopes (Permissions)

1. In your app dashboard, click on **Configuration** in the left sidebar
2. Scroll down to **Admin API access scopes**
3. Search for and enable the following permissions:
   - ✅ `read_customers` - Read customer data
   - ✅ `write_customers` - Create and update customers
4. Click **Save** at the top right

#### d. Install App and Get Access Token

1. In the left sidebar, click **API credentials**
2. Under **Admin API access token**, click **Install app** (if not already installed)
3. Review the permissions and click **Install**
4. After installation, you'll see **Admin API access token**
5. Click **Reveal token once** button
6. **IMPORTANT**: Copy this token immediately - you won't be able to see it again!
   - It will look like: `shpat_xxxxxxxxxxxxxxxxxxxxx`
   - Save it securely - you'll need it for your `.env` file

   Admin API access token=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

### 3. Configure Environment Variables

Create a `.env` file in the root of your project:

```env
# Shopify Configuration
SHOPIFY_STORE_DOMAIN=yourstore.myshopify.com
SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxxxxxxxxxx

# Admin Login Credentials
ADMIN_EMAIL=admin@pizzaanytime.com
ADMIN_PASSWORD=your_secure_password_here

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your_jwt_secret_key_here
```

**Security Notes:**
- Never commit the `.env` file to version control
- Use a strong password for the admin account
- Generate a secure JWT secret using: `openssl rand -base64 32`

### 4. Local Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 5. Vercel Deployment

#### a. Connect Your Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New Project**
3. Import your GitHub/GitLab repository

#### b. Configure Environment Variables

In your Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add all the environment variables from your `.env` file:
   - `SHOPIFY_STORE_DOMAIN`
   - `SHOPIFY_ADMIN_ACCESS_TOKEN`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `JWT_SECRET`

#### c. Deploy

Vercel will automatically deploy your application. The API endpoints will be available at:
- `https://your-domain.vercel.app/api/submit-access-request`
- `https://your-domain.vercel.app/api/admin-login`
- `https://your-domain.vercel.app/api/get-access-requests`
- `https://your-domain.vercel.app/api/update-request-status`

## Usage

### For Users

1. Navigate to the **Request Access** page
2. Fill out the form with their details
3. Submit the request
4. Submissions are automatically saved to Shopify as customers with tags

### For Admins

1. Navigate to `/login` or the **Login** page
2. Sign in with admin credentials
3. View all access requests in the dashboard
4. Filter by status (All, Pending, Approved, Rejected)
5. Approve or reject requests with one click
6. View detailed information for each submission

## Data Storage in Shopify

Each access request is stored in Shopify as:

- **Customer record** with email, first name, last name
- **Tags**: `access-request`, `pending-review`/`approved`/`rejected`
- **Metafields** (namespace: `access_request`):
  - `company` - Company name
  - `location` - Location
  - `machine_count` - Number of machines interested in
  - `role` - User's role
  - `message` - Additional message
  - `submitted_at` - Submission timestamp
  - `status` - Current status (pending/approved/rejected)

## API Endpoints

### POST `/api/submit-access-request`

Submit a new access request.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "company": "Example Corp",
  "location": "New York, USA",
  "machineCount": "5",
  "role": "Operations Manager",
  "message": "Looking for vending solutions"
}
```

### POST `/api/admin-login`

Authenticate as admin.

**Request Body:**
```json
{
  "email": "admin@pizzaanytime.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "email": "admin@pizzaanytime.com",
    "role": "admin"
  }
}
```

### GET `/api/get-access-requests`

Get all access requests (requires admin authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "requests": [...]
}
```

### POST `/api/update-request-status`

Update the status of a request (requires admin authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "customerId": 123456789,
  "status": "approved"
}
```

## Security Features

- ✅ JWT-based authentication for admin access
- ✅ API endpoints protected with token verification
- ✅ Secure password storage (environment variables)
- ✅ HTTPS enforced in production
- ✅ Input validation on all form fields
- ✅ CORS protection

## Troubleshooting

### "I see 'Build legacy custom apps' option - should I use it?"
**NO** - Don't use legacy custom apps (they're being deprecated January 1, 2026). Always use the **Dev Dashboard** option instead. According to [Shopify's documentation](https://shopify.dev/docs/apps/build/dev-dashboard), Dev Dashboard is the modern, recommended approach for all app development.

### "Server configuration error"
- Ensure all environment variables are set correctly in your `.env` file
- Check that Shopify credentials are valid
- Verify the Shopify app has the correct permissions (`read_customers` and `write_customers`)
- Make sure your `SHOPIFY_STORE_DOMAIN` is in the format: `yourstore.myshopify.com` (no `https://`)

### "Failed to fetch access requests"
- Check Shopify API access token is valid and starts with `shpat_`
- Ensure the app is installed in your Shopify store (check in Dev Dashboard → API credentials)
- Verify API permissions include both `read_customers` and `write_customers`
- Confirm the app is installed on the correct store

### "Invalid or expired token"
- Log out and log back in to get a new JWT token
- Check that JWT_SECRET is consistent across deployments
- Ensure JWT_SECRET is set in both local `.env` and Vercel environment variables

### "Where do I find my Shopify store domain?"
- Go to your Shopify Admin
- Look at the URL in your browser: `https://admin.shopify.com/store/your-store-name`
- Your domain is: `your-store-name.myshopify.com`

## Support

For technical issues or questions:
- Email: access@pizzaanytime.com
- Check Shopify Admin API documentation: https://shopify.dev/docs/api/admin

## License

Private and confidential. All rights reserved.

