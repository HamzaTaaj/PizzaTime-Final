import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as jwt from 'jsonwebtoken';

// Verify JWT token
function verifyToken(token: string): boolean {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) return false;
    
    const decoded = jwt.verify(token, jwtSecret) as any;
    return decoded.role === 'admin';
  } catch (error) {
    return false;
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.substring(7);
    if (!verifyToken(token)) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Shopify Admin API configuration
    const shopifyDomain = process.env.SHOPIFY_STORE_DOMAIN;
    const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

    if (!shopifyDomain || !accessToken) {
      console.error('Missing Shopify configuration');
      return res.status(500).json({ 
        error: 'Server configuration error' 
      });
    }

    // Fetch customers with access-request tag
    const shopifyResponse = await fetch(
      `https://${shopifyDomain}/admin/api/2024-01/customers.json?tags=access-request&limit=250`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        }
      }
    );

    if (!shopifyResponse.ok) {
      const errorData = await shopifyResponse.json();
      console.error('Shopify API error:', errorData);
      return res.status(500).json({ 
        error: 'Failed to fetch access requests' 
      });
    }

    const data = await shopifyResponse.json();
    
    // Transform the data for frontend consumption
    const requests = await Promise.all(
      data.customers.map(async (customer: any) => {
        // Fetch metafields for each customer
        const metafieldsResponse = await fetch(
          `https://${shopifyDomain}/admin/api/2024-01/customers/${customer.id}/metafields.json`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Access-Token': accessToken
            }
          }
        );

        let metafields: any = {};
        if (metafieldsResponse.ok) {
          const metafieldsData = await metafieldsResponse.json();
          metafieldsData.metafields
            .filter((m: any) => m.namespace === 'access_request')
            .forEach((m: any) => {
              metafields[m.key] = m.value;
            });
        }

        return {
          id: customer.id,
          firstName: customer.first_name,
          lastName: customer.last_name,
          email: customer.email,
          company: metafields.company || '',
          location: metafields.location || '',
          machineCount: metafields.machine_count || '',
          role: metafields.role || '',
          message: metafields.message || '',
          submittedAt: metafields.submitted_at || customer.created_at,
          status: metafields.status || 'pending',
          tags: customer.tags
        };
      })
    );

    // Sort by submission date (newest first)
    requests.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    return res.status(200).json({ 
      success: true,
      requests
    });

  } catch (error) {
    console.error('Error fetching access requests:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}

