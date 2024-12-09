import type{ HandlerEvent } from "@netlify/functions";
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
  const { shop } = event.queryStringParameters || {};

  if (!shop) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing shop parameter' })
    };
  }

  // Redirect to the app settings page in Shopify Admin
  const adminUrl = `https://admin.shopify.com/store/${shop.split('.')[0]}/settings/apps/app_installations/app/react-router-app`;
  
  return {
    statusCode: 302,
    headers: {
      'Location': adminUrl
    },
    body: ''
  };
}