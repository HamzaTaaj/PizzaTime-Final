import type { VercelRequest, VercelResponse } from '@vercel/node';

interface AccessRequest {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  location: string;
  machineCount: string;
  role: string;
  message: string;
  submittedAt: string;
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
    const formData: AccessRequest = {
      ...req.body,
      submittedAt: new Date().toISOString()
    };

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'company'];
    for (const field of requiredFields) {
      if (!formData[field as keyof AccessRequest]) {
        return res.status(400).json({ 
          error: `Missing required field: ${field}` 
        });
      }
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

    // Create a customer in Shopify with tags for tracking
    const customerData = {
      customer: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        tags: 'access-request,pending-review',
        note: `Company: ${formData.company}\nLocation: ${formData.location || 'N/A'}\nMachine Count: ${formData.machineCount || 'N/A'}\nRole: ${formData.role || 'N/A'}\nMessage: ${formData.message || 'N/A'}\nSubmitted: ${formData.submittedAt}`,
        metafields: [
          {
            namespace: 'access_request',
            key: 'company',
            value: formData.company,
            type: 'single_line_text_field'
          },
          {
            namespace: 'access_request',
            key: 'location',
            value: formData.location || '',
            type: 'single_line_text_field'
          },
          {
            namespace: 'access_request',
            key: 'machine_count',
            value: formData.machineCount || '0',
            type: 'single_line_text_field'
          },
          {
            namespace: 'access_request',
            key: 'role',
            value: formData.role || '',
            type: 'single_line_text_field'
          },
          {
            namespace: 'access_request',
            key: 'message',
            value: formData.message || '',
            type: 'multi_line_text_field'
          },
          {
            namespace: 'access_request',
            key: 'submitted_at',
            value: formData.submittedAt,
            type: 'single_line_text_field'
          },
          {
            namespace: 'access_request',
            key: 'status',
            value: 'pending',
            type: 'single_line_text_field'
          }
        ]
      }
    };

    // Send to Shopify
    const shopifyResponse = await fetch(
      `https://${shopifyDomain}/admin/api/2024-01/customers.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        },
        body: JSON.stringify(customerData)
      }
    );

    if (!shopifyResponse.ok) {
      const errorData = await shopifyResponse.json();
      console.error('Shopify API error:', errorData);
      
      // Check if customer already exists
      if (errorData.errors?.email) {
        return res.status(400).json({ 
          error: 'A request with this email already exists' 
        });
      }
      
      return res.status(500).json({ 
        error: 'Failed to submit request. Please try again.' 
      });
    }

    const result = await shopifyResponse.json();
    
    return res.status(200).json({ 
      success: true,
      message: 'Access request submitted successfully',
      id: result.customer.id
    });

  } catch (error) {
    console.error('Error submitting access request:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}

