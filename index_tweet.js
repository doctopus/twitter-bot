import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
dotenv.config();

const handleTweet = () => {
    const twitterClient = new TwitterApi({
        appKey: process.env.X_API_KEY ?? '',
        appSecret: process.env.X_API_SECRET ?? '',
        accessToken: process.env.X_ACCESS_TOKEN ?? '',
        accessSecret: process.env.X_ACCESS_SECRET ?? '',
    });

    const tweetClient = twitterClient.readWrite;

    tweetClient.v2.tweet('Milliseconds since 01/01/1970: ' + Date.now());
};

handleTweet();

