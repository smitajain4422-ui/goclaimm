export default async function handler(req, res) {
  const { ip, user_agent } = req.query;
  
  // Your secret API key is now safe on the server
  const apiKey = "38083|fqRt4E7BOs6reipIQVm21WNEvXnbNMNihYOgewUq8f871a6f";
  const endpoint = "https://applocked.store/api/v2";
  
  const apiURL = `${endpoint}?ip=${ip}&user_agent=${encodeURIComponent(user_agent)}&max=100&ctype=3`;

  try {
    const response = await fetch(apiURL, {
        method: "GET",
        headers: { "Authorization": `Bearer ${apiKey}` }
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch offers" });
  }
}

