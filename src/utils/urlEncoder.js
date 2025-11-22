import pako from 'pako';

/**
 * Encodes entries data to a compressed base64 string for URL
 * @param {Array} entries - Array of entry objects
 * @returns {string} - Compressed base64 encoded string
 */
export function encodeEntries(entries) {
  if (!entries || entries.length === 0) {
    return '';
  }

  // Only store essential data (title and serializedData)
  // We'll unserialize again when loading from URL
  const dataToEncode = entries.map(entry => ({
    title: entry.title || null,
    serializedData: entry.serializedData
  }));

  try {
    // Convert to JSON string
    const jsonString = JSON.stringify(dataToEncode);
    
    // Compress using deflate (gzip compatible)
    const compressed = pako.deflate(jsonString);
    
    // Convert Uint8Array to base64 (handle large arrays)
    let binaryString = '';
    const chunkSize = 0x8000; // 32KB chunks
    for (let i = 0; i < compressed.length; i += chunkSize) {
      const chunk = compressed.subarray(i, i + chunkSize);
      binaryString += String.fromCharCode.apply(null, chunk);
    }
    const base64 = btoa(binaryString);
    
    return base64;
  } catch (error) {
    console.error('Error encoding entries:', error);
    return '';
  }
}

/**
 * Decodes compressed base64 string back to entries data
 * @param {string} encodedString - Compressed base64 encoded string
 * @returns {Array|null} - Array of entry objects or null if decoding fails
 */
export function decodeEntries(encodedString) {
  if (!encodedString || encodedString.trim() === '') {
    return null;
  }

  try {
    // Decode from base64
    const binaryString = atob(encodedString);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Decompress using gzip
    const decompressed = pako.inflate(bytes, { to: 'string' });
    
    // Parse JSON
    const entries = JSON.parse(decompressed);
    
    return entries;
  } catch (error) {
    console.error('Error decoding entries:', error);
    return null;
  }
}

/**
 * Updates the URL with encoded entries data
 * @param {Array} entries - Array of entry objects
 */
export function updateURL(entries) {
  const encoded = encodeEntries(entries);
  const url = new URL(window.location.href);
  
  if (encoded) {
    url.searchParams.set('data', encoded);
  } else {
    url.searchParams.delete('data');
  }
  
  // Update URL without page reload
  window.history.replaceState({}, '', url.toString());
}

/**
 * Gets entries data from URL
 * @returns {Array|null} - Array of entry objects or null if not found/invalid
 */
export function getEntriesFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedData = urlParams.get('data');
  
  if (!encodedData) {
    return null;
  }
  
  return decodeEntries(encodedData);
}

/**
 * Copies the current URL to clipboard
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export async function copyURLToClipboard() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    return true;
  } catch (error) {
    console.error('Error copying URL:', error);
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      console.error('Fallback copy failed:', fallbackError);
      return false;
    }
  }
}

