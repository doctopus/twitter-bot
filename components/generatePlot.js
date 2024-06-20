// generatePlot.js

import fetch from 'node-fetch';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function fetchData() {
    const apiUrl = 'https://min-api.cryptocompare.com/data/v2/histoday';
    const endDate = Math.floor(Date.now() / 1000); // Today's date in Unix timestamp (seconds)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // 30 days ago
    const startDateUnix = Math.floor(startDate.getTime() / 1000);

    const url = `${apiUrl}?fsym=BTC&tsym=USD&limit=30&toTs=${endDate}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();

        console.log('API Response:', json); // Log the entire API response

        if (!json.Data || !json.Data.Data || !Array.isArray(json.Data.Data)) {
            throw new Error('Invalid response from CryptoCompare API');
        }

        // Extract the required data from the API response
        const data = json.Data.Data.map(day => ({
            date: new Date(day.time * 1000).toISOString().split('T')[0],
            price: day.close,
        }));

        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

async function saveDataToFile(data, filePath) {
    try {
        const csvData = convertDataToCsv(data); // Implement your data to CSV conversion
        writeFileSync(filePath, csvData);
        console.log(`Data saved to ${filePath}`);
    } catch (error) {
        console.error('Error saving data to file:', error.message);
        throw error;
    }
}

function convertDataToCsv(data) {
    // Convert data to CSV format with date and closing price
    const csv = data.map(item => `${item.date},${item.price}\n`);
    return `date,price\n${csv.join('')}`;
}

async function generatePlot() {
    const inputCsvFile = join(__dirname, 'plotCoin.csv');
    const outputImageFile = join(__dirname, 'Header1500x500.png');

    try {
        const data = await fetchData();
        await saveDataToFile(data, inputCsvFile);

        // Run R script to generate plot
        const cmd = `Rscript ${join(__dirname, 'plotCoin.R')} ${inputCsvFile} ${outputImageFile}`;
        execSync(cmd);
        console.log(`Generated plot saved to ${outputImageFile}`);
    } catch (error) {
        console.error('Error generating plot:', error.message);
        throw error;
    }
}

export default generatePlot;
