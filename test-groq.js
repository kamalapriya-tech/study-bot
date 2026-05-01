import 'dotenv/config';
import fetch from 'node-fetch';

async function test() {
  const key = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL;

  console.log('Testing Groq API:');
  console.log('Key:', key?.substring(0, 10) + '...');
  console.log('Model:', model);

  const url = 'https://api.groq.com/openai/v1/chat/completions';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: 'You are a helpful tutor.' },
          { role: 'user', content: 'What is photosynthesis?' }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    const data = await response.json();
    console.log('\nStatus:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
