import fs from 'fs/promises';

export async function api_key() {
    try {
        const key = await fs.readFile('./api_key.txt', 'utf-8'); // Read the file
        return key.trim(); // Trim any extra whitespace or newline characters
    } catch (error) {
        console.error('Error reading API key:', error);
        throw new Error('Could not read API key');
    }
}
