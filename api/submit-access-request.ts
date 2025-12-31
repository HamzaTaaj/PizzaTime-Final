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

    // Create a metaobject entry in Shopify for access request
    const metaobjectData = {
      metaobject: {
        type: 'access_request',
        fields: [
          { key: 'first_name', value: formData.firstName },
          { key: 'last_name', value: formData.lastName },
          { key: 'email', value: formData.email },
          { key: 'company', value: formData.company },
          { key: 'location', value: formData.location || '' },
          { key: 'machine_count', value: formData.machineCount || '' },
          { key: 'role', value: formData.role || '' },
          { key: 'message', value: formData.message || '' },
          { key: 'status', value: 'pending' },
          { key: 'submitted_at', value: formData.submittedAt }
        ]
      }
    };

    // Send to Shopify Metaobjects API
    const shopifyResponse = await fetch(
      `https://${shopifyDomain}/admin/api/2024-01/metaobjects.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        },
        body: JSON.stringify(metaobjectData)
      }
    );

    if (!shopifyResponse.ok) {
      const errorData = await shopifyResponse.json();
      console.error('Shopify API error:', errorData);
      
      // Check for common errors
      if (errorData.errors) {
        const errorMessage = JSON.stringify(errorData.errors);
        
        // Metaobject type doesn't exist
        if (errorMessage.includes('type') || errorMessage.includes('not found')) {
          return res.status(500).json({ 
            error: 'Metaobject type not configured. Please create "access_request" metaobject definition in Shopify admin first.',
            setupUrl: 'https://admin.shopify.com/store/pizza-anytime-2/settings/custom_data',
            details: errorData
          });
        }
        
        // Permission error
        if (errorMessage.includes('permission') || errorMessage.includes('access')) {
          return res.status(500).json({ 
            error: 'API permissions missing. Please add read_metaobjects and write_metaobjects permissions to your Shopify app.',
            details: errorData
          });
        }
      }
      
      return res.status(500).json({ 
        error: 'Failed to submit request. Please try again.',
        details: errorData
      });
    }

    const result = await shopifyResponse.json();
    
    return res.status(200).json({ 
      success: true,
      message: 'Access request submitted successfully',
      id: result.metaobject.id
    });

  } catch (error) {
    console.error('Error submitting access request:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}

