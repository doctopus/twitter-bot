// index.js

import generatePlot from './components/generatePlot.js';
import updateProfileBanner from './components/updateBanner.js';

async function main() {
    try {
        // Call generatePlot to generate Header1500x500.png
        await generatePlot();

        // Update profile banner
        await updateProfileBanner();

        console.log('Banner update process completed successfully!');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Execute the main function
main();
