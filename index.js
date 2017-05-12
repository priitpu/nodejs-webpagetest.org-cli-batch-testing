/* eslint no-console: 0, indent:['error', 'tab'], no-tabs:0 */

const request = require('request');
const colors = require('colors');
const Lbl = require('line-by-line');
const CliTable = require('cli-table');

const apiKey = 'APIKEY';
const apiUrl = 'http://www.webpagetest.org/runtest.php?url=';
const lineReader = new Lbl('urls.txt');
const pageURLs = [];

function checkForChange(url) {
	request.get(url, (err, res, body) => {
		const json = JSON.parse(body);
		if (json.data.statusCode === 101 || json.data.statusCode === 100) {
			process.stdout.write('Fetching\r');
			setTimeout(() => { checkForChange(url); }, 3000);
		} else {
			const table = new CliTable({
				head: ['View', 'First', 'Repeat'],
				style: { head: ['green'], border: ['white'], body: ['red'] }
			});
			table.push(
				{ 'Load Time': [`${json.data.average.firstView.loadTime}ms`, `${json.data.average.repeatView.loadTime}ms`] },
				{ TTFB: [`${json.data.average.firstView.TTFB}ms`, `${json.data.average.repeatView.TTFB}ms`] },
				{ Render: [`${json.data.average.firstView.render}ms`, `${json.data.average.repeatView.render}ms`] },
				{ 'Fully Loaded': [`${json.data.average.firstView.fullyLoaded}ms`, `${json.data.average.repeatView.fullyLoaded}ms`] },
				{ 'Speed Index': [json.data.average.firstView.SpeedIndex, json.data.average.repeatView.SpeedIndex] }
			);
			console.log(json.data.testUrl, 'test id:', json.data.id);
			console.log(table.toString());
		}
	});
}

function getData(url) {
	const options = { method: 'POST', url:url };
	request(options, (err, res, body) => {
		if (JSON.parse(body).statusCode >= 400 && JSON.parse(body).statusCode < 500) {
			console.log(colors.red('##############################'));
			console.log(colors.red('#########'), colors.red(JSON.parse(body).statusCode), colors.red(JSON.parse(body).statusText));
			console.log(colors.red('##############################'));
			process.exit();
		}
		checkForChange(JSON.parse(body).data.jsonUrl);
	});
}

lineReader.on('line', (line) => {
	pageURLs.push(line);
	console.log(line);
});

lineReader.on('end', () => {
	console.log('\n');
	for (let i = 0; i < pageURLs.length; i += 1) {
		getData(`${apiUrl}${pageURLs[i]}&f=json&k=${apiKey}`);
	}
});
