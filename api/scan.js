export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server.' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'No prompt provided.' });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a Washington State A/E procurement intelligence system. Return only valid JSON arrays with no markdown, no code fences, and no explanation text outside the array.\n\n${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
        }
      })
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      return res.status(200).json({ 
        text: '',
        debug_error: data?.error?.message || 'Unknown error',
        debug_status: geminiRes.status,
        debug_full: JSON.stringify(data)
      });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.status(200).json({ text });

  } catch (err) {
    return res.status(200).json({ 
      text: '',
      debug_error: err.message,
      debug_full: err.toString()
    });
  }
}

