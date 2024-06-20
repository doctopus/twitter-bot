import dotenv from 'dotenv';
dotenv.config();

import { TwitterApi } from 'twitter-api-v2';
import fs from 'fs';
const twitterClient = new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_SECRET,
});

async function updateProfileBanner(imagePath) {
    try {
        // Read the image file
        const image = fs.readFileSync(imagePath, { encoding: 'base64' });
        // Send a POST request to the Twitter API endpoint for updating the profile banner
        await twitterClient.v1.post('account/update_profile_banner.json', { banner: image });
        console.log('Profile banner updated successfully!');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Usage example:

updateProfileBanner('./components/Example1500x500.png')
    .then(() => console.log('Banner updated successfully!'))
    .catch(err => console.error('An error occurred:', err));