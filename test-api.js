import 'dotenv/config';
import fetch from 'node-fetch';

async function testAPI() {
  const key = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL;

  console.log('Testing with:');
  console.log('Key:', key?.substring(0, 10) + '...');
  console.log('Model:', model);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: 'Hello, what is 2+2?' }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 250
        }
      })
    });

    const data = await response.json();
    console.log('\nStatus:', response.status);
    console.log('Full response:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testAPI();
