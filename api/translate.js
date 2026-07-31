module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  const { text, from, to } = body;
  if (!text || !to) return res.status(400).json({ error: 'Text and target language are required.' });
  const key = process.env.TRANSLATOR_KEY;
  const region = process.env.TRANSLATOR_REGION;
  if (!key) return res.status(500).json({ error: 'Translator key is not configured on the server.' });
  const params = new URLSearchParams({ 'api-version': '3.0', to });
  if (from && from !== 'auto') params.set('from', from);
  const headers = { 'Ocp-Apim-Subscription-Key': key, 'Content-Type': 'application/json' };
  if (region && region.toLowerCase() !== 'global') headers['Ocp-Apim-Subscription-Region'] = region;
  try {
    const response = await fetch(`https://api.cognitive.microsofttranslator.com/translate?${params}`, { method: 'POST', headers, body: JSON.stringify([{ Text: text }]) });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'Microsoft Translator rejected the request.' });
    return res.status(200).json({ translation: data[0].translations[0].text });
  } catch (error) {
    return res.status(500).json({ error: 'Could not reach Microsoft Translator.' });
  }
};
