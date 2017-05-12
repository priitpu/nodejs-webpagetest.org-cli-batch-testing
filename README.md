# webpagetest.org-cli-app-nodejs

Batch performance testing using [WebPageTest](https://webpagetest.org/).

## requirements

Make sure you have [node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

## installation

Run `npm install` in this directory.
  
## usage

Specify pages to test in `./urls.txt`, for example:

http://google.com
http://bing.com

Run `npm run test` in this directory.

Results are displayed from first view and repeat view.

```text
┌──────────────┬────────┬────────┐
│ View         │ First  │ Repeat │
├──────────────┼────────┼────────┤
│ Load Time    │ 4415ms │ 3392ms │
├──────────────┼────────┼────────┤
│ TTFB         │ 355ms  │ 398ms  │
├──────────────┼────────┼────────┤
│ Render       │ 1289ms │ 1279ms │
├──────────────┼────────┼────────┤
│ Fully Loaded │ 6593ms │ 5776ms │
├──────────────┼────────┼────────┤
│ Speed Index  │ 3368   │ 2657   │
└──────────────┴────────┴────────┘
```
