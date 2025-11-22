import { unserialize } from 'php-serialize';

/**
 * Detects if the input is PHP serialized format
 * @param {string} data - The serialized data string
 * @returns {boolean} - True if PHP serialized, false otherwise
 */
function isPHPSerialized(data) {
  if (typeof data !== 'string' || data.trim() === '') {
    return false;
  }
  
  // PHP serialized data typically starts with specific characters
  const trimmed = data.trim();
  const phpSerializedPatterns = [
    /^[aibdsONCr]:\d+:/,  // Basic types: a:array, i:int, b:bool, d:double, s:string, N:null, O:object, C:custom, r:reference
    /^a:\d+:\{/,          // Array format
    /^O:\d+:"/,           // Object format
  ];
  
  return phpSerializedPatterns.some(pattern => pattern.test(trimmed));
}

/**
 * Detects if the input is JSON format
 * @param {string} data - The serialized data string
 * @returns {boolean} - True if JSON, false otherwise
 */
function isJSON(data) {
  if (typeof data !== 'string' || data.trim() === '') {
    return false;
  }
  
  const trimmed = data.trim();
  return (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
         (trimmed.startsWith('[') && trimmed.endsWith(']'));
}

/**
 * Formats data for display in a readable way
 * @param {any} data - The unserialized data
 * @returns {string} - Formatted string representation
 */
function formatData(data) {
  if (data === null || data === undefined) {
    return 'null';
  }
  
  if (typeof data === 'string') {
    return data;
  }
  
  // For objects and arrays, use JSON.stringify with indentation
  try {
    return JSON.stringify(data, null, 2);
  } catch (e) {
    return String(data);
  }
}

/**
 * Unserializes data (PHP or JSON format)
 * @param {string} serializedData - The serialized data string
 * @returns {{success: boolean, data: any, error: string|null, format: string|null}}
 */
export function unserializeData(serializedData) {
  if (!serializedData || typeof serializedData !== 'string' || serializedData.trim() === '') {
    return {
      success: false,
      data: null,
      error: 'Serialized data is required',
      format: null
    };
  }

  const trimmed = serializedData.trim();

  // Try PHP unserialization first
  if (isPHPSerialized(trimmed)) {
    try {
      const unserialized = unserialize(trimmed);
      return {
        success: true,
        data: unserialized,
        error: null,
        format: 'PHP'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: `PHP unserialization failed: ${error.message}`,
        format: 'PHP'
      };
    }
  }

  // Try JSON parsing
  if (isJSON(trimmed)) {
    try {
      const parsed = JSON.parse(trimmed);
      return {
        success: true,
        data: parsed,
        error: null,
        format: 'JSON'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: `JSON parsing failed: ${error.message}`,
        format: 'JSON'
      };
    }
  }

  // If neither format detected, try both as fallback
  // Try JSON first (more common)
  try {
    const parsed = JSON.parse(trimmed);
    return {
      success: true,
      data: parsed,
      error: null,
      format: 'JSON (auto-detected)'
    };
  } catch (jsonError) {
    // Try PHP as last resort
    try {
      const unserialized = unserialize(trimmed);
      return {
        success: true,
        data: unserialized,
        error: null,
        format: 'PHP (auto-detected)'
      };
    } catch (phpError) {
      return {
        success: false,
        data: null,
        error: 'Unable to parse as PHP or JSON. Please check the format.',
        format: null
      };
    }
  }
}

/**
 * Formats the unserialized data for display
 * @param {any} data - The unserialized data
 * @returns {string} - Formatted string
 */
export function formatForDisplay(data) {
  return formatData(data);
}

