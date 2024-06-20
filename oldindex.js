import {getTweetsFromTimeline} from "./src/getTweets.js";
import fs from 'fs';
// import {getTweetsCountByDay} from "./src/countTweets.js";

// Example usage
// const username = 'SpiritChirag'; // Replace with your Twitter username
// const fromDate = new Date('2024-02-01'); // Replace with your start date
// const toDate = new Date('2024-02-15'); // Replace with your end date
//
// getTweetsCountByDay(username, fromDate, toDate)
//     .then(tweetsByDay => {
//         // Optionally, you can save the results to a file
//         fs.writeFileSync('tweets_by_day.json', JSON.stringify(tweetsByDay, null, 2));
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// Example usage
const username = 'SpiritChirag'; // Replace with your Twitter username
const count = 10; // Number of tweets to retrieve

getTweetsFromTimeline(username, count)
    .then(tweets => {
        // Log the tweets
        console.log('Tweets from timeline:');
        tweets.forEach(tweet => {
            console.log(`- ${tweet.createdAt}: ${tweet.text}`);
        });

        // Optionally, you can save the tweets to a file
        fs.writeFileSync('timeline_tweets.json', JSON.stringify(tweets, null, 2));
    })
    .catch(error => {
        console.error('Error:', error);
    });