import dotenv from 'dotenv';
dotenv.config();

import { TwitterApi } from 'twitter-api-v2';
import fs from 'fs';

const twitterClient = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
});

async function getTweetsFromTimeline(username, count = 10) {
    try {
        // Get user's timeline tweets
        const timelineResponse = await twitterClient.v2.userByUsername(username).tweets.timeline({ max_results: count });

        // Extract tweet data
        const tweets = timelineResponse.data.map(tweet => {
            return {
                id: tweet.id,
                text: tweet.text,
                createdAt: tweet.created_at,
            };
        });

        return tweets;
    } catch (error) {
        console.error('Error retrieving timeline tweets:', error);
        throw error;
    }
}

export { getTweetsFromTimeline };

