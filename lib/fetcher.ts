async function fetcher(url: string) {
    const res = await fetch(url, {
      headers: {
        "Authorization": "Bearer 214c6e2e-43b3-4332-b631-2ddfd60aa183", // Senin Test Token'in
      },
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch");
    }
    
    return res.json();
  }
  