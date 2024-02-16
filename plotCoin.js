import R from 'r-script';
import fetch from 'node-fetch';
import fs from 'fs';
/*const days = 30; // Number of days to plot
const today = new Date();
const to = today.toISOString().slice(0, 10);
const from = new Date(today.getTime() - (days * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}`;
console.log(url);

//The url generated from this does not pull the data. while old dates of 2022 pulls the data. Trouble shoot
//May be use Cryptocompare api https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USD&limit=30&toTs=-1&api_key=YOURKEYHERE
//    https://min-api.cryptocompare.com/documentation?key=Historical&cat=dataHistoday
   
 */
const url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2022-02-28&end=2022-03-19';
fetch(url)
    .then(response => response.json())
    .then(data => {
        const x = Object.keys(data.bpi);
        const y = Object.values(data.bpi);
        const csv = 'date,price\n' + x.map((d, i) => `${d},${y[i]}`).join('\n');
        fs.writeFileSync('plotCoin.csv', csv);

        const rscript = R('plotCoin.R')
            .data({csvFile: 'plotCoin.csv'})
            .callSync();

        console.log(rscript);
    })
    .catch(error => console.error(error));
