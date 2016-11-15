import http from 'http';
import { expect } from 'chai';
import Promise from 'bluebird';
import { run as runHttpServer } from '../lib/httpServer';

const getAsync = url => new Promise(resolve => http.get(url, resolve));

describe('Example Node Server', () => {
  it('should return 200', async () => {
    runHttpServer();
    const res = await getAsync('http://127.0.0.1:1109');
    expect(res.statusCode).to.equal(200);
  });
});
