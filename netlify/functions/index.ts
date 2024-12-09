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
  const { shop, hmac, timestamp } = event.queryStringParameters || {};

  if (!shop || !hmac) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required parameters' })
    };
  }

  try {
    // Begin OAuth
    const authPath = await shopify.auth.begin({
      shop: shop,
      callbackPath: '/api/auth/callback',
      isOnline: false,
    });

    return {
      statusCode: 302,
      headers: {
        'Location': authPath.destinationUrl
      },
      body: ''
    };
  } catch (error) {
    console.error('Installation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Installation failed' })
    };
  }
}