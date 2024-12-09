import { HandlerEvent } from "@netlify/functions";
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  scopes: ['read_orders'],
  hostName: 'react-router-app-1.netlify.app',
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false
});

export async function handler(event: HandlerEvent) {
  try {
    const callback = await shopify.auth.callback({
      rawRequest: event
    });

    // Store the access token securely (you'll need to implement this)
    // For now, just log success
    console.log('Authentication successful');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Authentication successful' })
    };
  } catch (error) {
    console.error('Auth callback error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Authentication failed' })
    };
  }
}