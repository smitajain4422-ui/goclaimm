export default async function handler(req, res) {
  const { tracking_id } = req.query;
  
  const wispByteIP = "http://85.215.131.70:15124"; 

  try {
    // Look closely at this line! Make sure it has the /check_status.php part at the end
    const response = await fetch(`${wispByteIP}/check_status.php?tracking_id=${tracking_id}`);
    
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

