import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'url'; 
import path, { dirname, join, resolve } from 'path';
import bootstrap from './src/main.server';
import { enableProdMode } from '@angular/core';
import * as isbotModule from 'isbot';


// All regular routes use the Angular engine


// server.get('*', (req, res) => {
//   if (isbot(req.headers['user-agent'])) {
//     console.log('bot and running on SSR');
//   res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
//   } else {
//     console.log('Running on CSR');
//     res.sendFile(join(distFolder, `index.html`));
//   }
// });


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const isbot: any = isbotModule;
  const commonEngine = new CommonEngine();
  const distFolder = resolve(serverDistFolder, '../browser');
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
server.get('*', (req, res) => {
  if (isbot(req.headers['user-agent'])) {
    console.log('bot and running on SSR');
  res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  } else {
    console.log('Running on CSR');
    res.sendFile(join(distFolder, `index.html`));
  }
});

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000; // Use PORT instead of 'PORT'

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
