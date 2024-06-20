// updateBanner.js

import fs from 'fs';
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Initialize Twitter API client
const twitterClient = new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_SECRET,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function updateProfileBanner() {
    console.log('Updating profile banner...');

    try {
        // Read the image file
        const imagePath = join(__dirname, 'Header1500x500.png');
        const image = fs.readFileSync(imagePath, { encoding: 'base64' });

        // Send a POST request to the Twitter API endpoint for updating the profile banner
        await twitterClient.v1.post('account/update_profile_banner.json', { banner: image });

        console.log('Profile banner updated successfully!');
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}

export default updateProfileBanner;
