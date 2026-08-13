const twilio = require('twilio');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch (e) { return { statusCode: 400, body: 'Invalid JSON' }; }
  const { page, title, url, time } = body;
  if (!page || !url) return { statusCode: 400, body: 'Missing page or url' };

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.NOTIFY_TO_NUMBER;
  if (!accountSid || !authToken || !from || !to) {
    return { statusCode: 500, body: 'Missing Twilio configuration' };
  }

  const client = twilio(accountSid, authToken);
  const ip = event.headers['x-forwarded-for'] || event.headers['x-nf-client-connection-ip'] || 'unknown';
  // Note: for production, implement a persistent rate limiter (Redis) to prevent abuse.

  const messageBody = `Site visit: ${page}\n${title}\n${url}\nTime: ${time}\nIP: ${ip}`;
  try {
    await client.messages.create({ body: messageBody, from, to });
    return { statusCode: 200, body: 'OK' };
  } catch (err) {
    console.error('Twilio error', err);
    return { statusCode: 500, body: 'SMS send failed' };
  }
};
