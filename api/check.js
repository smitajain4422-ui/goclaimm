export default async function handler(req, res) {
  const { tracking_id } = req.query;
  
  // Make sure this port matches whatever port your Express server is actually running on (10021 or 15124)
  const wispByteIP = "http://212.227.7.153:10021"; 

  try {
    // Changed from /check_status.php to /api/check to match your Express backend
    const response = await fetch(`${wispByteIP}/api/check?tracking_id=${tracking_id}`);
    
    if (!response.ok) {
        throw new Error(`Server responded with ${response.status} ${response.statusText}`);
    }

    const text = await response.text();

    try {
        const data = JSON.parse(text);
        res.status(200).json(data);
    } catch (e) {
        throw new Error(`Invalid JSON: ${text.substring(0, 100)}...`);
    }

  } catch (error) {
    res.status(500).json({ 
        status: 'error', 
        message: error.message, 
        target: wispByteIP 
    });
  }
}
