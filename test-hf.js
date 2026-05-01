import 'dotenv/config';
import fetch from 'node-fetch';

async function test() {
  const key = process.env.HF_API_KEY;
  const model = process.env.HF_MODEL;

  console.log('Testing HF API:');
  console.log('Key:', key?.substring(0, 10) + '...');
  console.log('Model:', model);

  const url = `https://api-inference.huggingface.co/models/${model}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: 'You are a tutor. Student: What is photosynthesis? Tutor:',
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7
        }
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
