//import { TwitterApi } from 'twitter-api-v2';
import Twit from 'twit';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const handleUpdateBanner = async () => {
    const twitterClient = new Twit({
        consumer_key: process.env.X_API_KEY ?? '',
        consumer_secret: process.env.X_API_SECRET ?? '',
        access_token: process.env.X_ACCESS_TOKEN ?? '',
        access_token_secret: process.env.X_ACCESS_SECRET ?? '',
        timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    });

    const b64content = fs.readFileSync('./output/Header1500x500.png', { encoding: 'base64' });
    await twitterClient.post('account/update_profile_banner', {banner: b64content }, () => {});
};

handleUpdateBanner();