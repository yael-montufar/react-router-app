import { HandlerEvent } from "@netlify/functions";

export async function handler(event: HandlerEvent) {
  const { shop, hmac, host, timestamp } = event.queryStringParameters || {};

  // For now, just log the auth attempt
  console.log("Auth attempt from shop:", shop);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Auth endpoint ready",
      shop,
      host,
      timestamp
    })
  };
}