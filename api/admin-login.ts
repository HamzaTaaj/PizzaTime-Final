import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as jwt from 'jsonwebtoken';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    // Get admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (!adminEmail || !adminPassword || !jwtSecret) {
      console.error('Missing admin configuration');
      return res.status(500).json({ 
        error: 'Server configuration error' 
      });
    }

    // Verify credentials
    if (email === adminEmail && password === adminPassword) {
      // Generate JWT token
      const token = jwt.sign(
        { 
          email: adminEmail,
          role: 'admin',
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
        },
        jwtSecret
      );

      return res.status(200).json({ 
        success: true,
        token,
        user: {
          email: adminEmail,
          role: 'admin'
        }
      });
    } else {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}

