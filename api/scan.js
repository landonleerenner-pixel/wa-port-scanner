export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server.' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'No prompt provided.' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://wa-port-scanner.vercel.app',
        'X-Title': 'WA Port RFP Scanner'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [
          {
            role: 'system',
            content: 'You are a Washington State A/E procurement intelligence system. You MUST return ONLY a valid JSON array. No markdown, no code fences, no explanation. Start your response with [ and end with ]. Each item must have these exact fields: port, title, type, discipline, status, deadline, description, solicitation_number, url, source.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 2048
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || 'OpenRouter API error'
      });
    }

    let text = data?.choices?.[0]?.message?.content || '';
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    if (!text.startsWith('[')) {
      const start = text.indexOf('[');
      const end = text.lastIndexOf(']');
      if (start !== -1 && end !== -1) {
        text = text.substring(start, end + 1);
      }
    }

    return res.status(200).json({ text });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
