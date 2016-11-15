import http from 'http';
import { expect } from 'chai';
import { runServer } from '../lib/httpServer';

const getAsync = url => new Promise(resolve => http.get(url, resolve));

describe('Example Node Server', () => {
  it('should return 200', async () => {
    runServer();
    const res = await getAsync('http://127.0.0.1:1109');
    expect(res.statusCode).to.equal(200);
  });
});
