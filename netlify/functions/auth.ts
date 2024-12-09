import type { HandlerEvent } from "@netlify/functions";
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!, // Your app's client_id from shopify.app.toml
  apiSecretKey: process.env.SHOPIFY_API_SECRET!, // You'll need to set this in Netlify
  scopes: ['read_orders'], // Add whatever scopes you need
  hostName: 'react-router-app-1.netlify.app',
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false
});

export async function handler(event: HandlerEvent) {
  try {
    const { shop } = event.queryStringParameters || {};
    
    if (!shop) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing shop parameter' })
      };
    }

    // Initialize the OAuth process
    const authRoute = await shopify.auth.begin({
      shop,
      callbackPath: '/api/auth/callback',
      isOnline: false,
    });

    return {
      statusCode: 302,
      headers: {
        Location: authRoute.destinationUrl
      },
      body: ''
    };
  } catch (error) {
    console.error('Auth error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to initialize OAuth' })
    };
  }
}