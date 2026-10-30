import React from 'react';
import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import App from './App';
export { pageMetadata, canonicalUrl } from './lib/pageMetadata';

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    const chunks: Buffer[] = [];

    output.on('data', chunk => chunks.push(Buffer.from(chunk)));
    output.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    output.on('error', reject);

    const stream = renderToPipeableStream(
      <React.StrictMode>
        <App initialPath={url} />
      </React.StrictMode>,
      {
        onAllReady() {
          stream.pipe(output);
        },
        onError(error) {
          reject(error);
        },
      }
    );
  });
}
