// Verificar mais tarde
export default async function handler(req, res) {
  // Permitir apenas GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, per_page = 8 } = req.query;
  
  // Validar parâmetros
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  // Adicionar headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // Verificar se a chave da API existe
    if (!process.env.PEXELS_API_KEY) {
      throw new Error('PEXELS_API_KEY não configurada');
    }

    const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${per_page}`, {
      method: 'GET',
      headers: {
        'Authorization': process.env.PEXELS_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data = await response.json();
    
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error fetching images:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch images',
      details: error.message 
    });
  }
}