const http = require('http');

function fetch(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let s = '';
      res.on('data', c => s += c);
      res.on('end', () => resolve(s));
    }).on('error', e => reject(e));
  });
}

async function fetchWithRetry(url, attempts = 20, delayMs = 500) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetch(url)
    } catch (e) {
      if (i === attempts - 1) throw e
      await new Promise(r => setTimeout(r, delayMs))
    }
  }
}

(async () => {
  const ports = [3000, 3001]

  for (const port of ports) {
    try {
      const home = await fetchWithRetry(`http://127.0.0.1:${port}`, 20, 500);
      console.log(`PORT_${port}_HOME_HAS_GALLERY=`, home.includes('<section id="gallery">'));
    } catch (e) {
      console.error(`PORT_${port}_HOME_ERR`, e && e.message ? e.message : String(e));
    }

    try {
      const api = await fetchWithRetry(`http://127.0.0.1:${port}/api/gallery`, 20, 500);
      const j = JSON.parse(api);
      console.log(`PORT_${port}_API_OK`, Array.isArray(j.galleryImages), 'COUNT', j.galleryImages ? j.galleryImages.length : 0);
    } catch (e) {
      console.error(`PORT_${port}_API_ERR`, e && e.message ? e.message : String(e));
    }
  }
})();