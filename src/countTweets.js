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

async function getTweetsCountByDay(username, fromDate, toDate) {
    try {
        // Get user's tweets within the specified date range
        const tweetsResponse = await twitterClient.v2.userTimeline(username).tweets.timeline({
            start_time: fromDate.toISOString(),
            end_time: toDate.toISOString(),
            max_results: 100 // Adjust as needed
        });

        // Group tweets by date
        const tweetsByDay = {};
        tweetsResponse.data.forEach(tweet => {
            const createdAt = new Date(tweet.created_at);
            const dateKey = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}-${createdAt.getDate()}`;
            tweetsByDay[dateKey] = (tweetsByDay[dateKey] || 0) + 1;
        });

        // Log the number of tweets per day
        for (const [date, count] of Object.entries(tweetsByDay)) {
            console.log(`${date}: ${count} tweets`);
        }

        return tweetsByDay;
    } catch (error) {
        console.error('Error retrieving tweets:', error);
        throw error;
    }
}

export { getTweetsCountByDay }
