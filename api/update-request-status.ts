import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

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
  // Only allow POST requests
  if (req.method !== 'POST') {
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

    const { customerId, status } = req.body;

    if (!customerId || !status) {
      return res.status(400).json({ 
        error: 'Customer ID and status are required' 
      });
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

    // First, get the existing metafield ID for status
    const metafieldsResponse = await fetch(
      `https://${shopifyDomain}/admin/api/2024-01/customers/${customerId}/metafields.json`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        }
      }
    );

    if (!metafieldsResponse.ok) {
      return res.status(500).json({ 
        error: 'Failed to fetch metafields' 
      });
    }

    const metafieldsData = await metafieldsResponse.json();
    const statusMetafield = metafieldsData.metafields.find(
      (m: any) => m.namespace === 'access_request' && m.key === 'status'
    );

    // Update the status metafield
    const updateUrl = statusMetafield
      ? `https://${shopifyDomain}/admin/api/2024-01/customers/${customerId}/metafields/${statusMetafield.id}.json`
      : `https://${shopifyDomain}/admin/api/2024-01/customers/${customerId}/metafields.json`;

    const updateResponse = await fetch(updateUrl, {
      method: statusMetafield ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify({
        metafield: {
          namespace: 'access_request',
          key: 'status',
          value: status,
          type: 'single_line_text_field'
        }
      })
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      console.error('Shopify API error:', errorData);
      return res.status(500).json({ 
        error: 'Failed to update status' 
      });
    }

    // Update customer tags based on status
    let newTags = 'access-request';
    if (status === 'approved') {
      newTags = 'access-request,approved';
    } else if (status === 'rejected') {
      newTags = 'access-request,rejected';
    } else {
      newTags = 'access-request,pending-review';
    }

    await fetch(
      `https://${shopifyDomain}/admin/api/2024-01/customers/${customerId}.json`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        },
        body: JSON.stringify({
          customer: {
            id: customerId,
            tags: newTags
          }
        })
      }
    );

    return res.status(200).json({ 
      success: true,
      message: 'Status updated successfully'
    });

  } catch (error) {
    console.error('Error updating request status:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}

