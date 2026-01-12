import type { VercelRequest, VercelResponse } from '@vercel/node';

// Shopify Admin API configuration
const SHOPIFY_STORE_DOMAIN = 'pizzaanytime.myshopify.com';
const SHOPIFY_ADMIN_ACCESS_TOKEN = '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';
const SHOPIFY_API_VERSION = '2024-10';

interface NotesRequest {
  customerId: string;
  company?: string;
  location?: string;
  machineCount?: string;
  role?: string;
  message?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customerId, company, location, machineCount, role, message } = req.body as NotesRequest;

    if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    // Format notes
    const note = `
REQUEST ACCESS FORM
-------------------
Company: ${company || '-'}
Location: ${location || '-'}
Machines: ${machineCount || '-'}
Role: ${role || '-'}
Message:
${message || '-'}
Submitted: ${new Date().toISOString()}
    `.trim();

    // Admin API GraphQL mutation
    const query = `
      mutation customerUpdate($input: CustomerInput!) {
        customerUpdate(input: $input) {
          customer {
            id
            note
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query,
          variables: {
            input: {
              id: customerId,
              note,
            },
          },
        }),
      }
    );

    const result = await response.json();
    console.log('Admin API response:', JSON.stringify(result, null, 2));

    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      return res.status(400).json({ error: 'Failed to update notes', details: result.errors });
    }

    const userErrors = result.data?.customerUpdate?.userErrors;
    if (userErrors && userErrors.length > 0) {
      console.error('User errors:', userErrors);
      return res.status(400).json({ error: userErrors[0].message });
    }

    return res.status(200).json({ 
      success: true, 
      note,
      customer: result.data?.customerUpdate?.customer 
    });
  } catch (error) {
    console.error('Error updating customer notes:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
