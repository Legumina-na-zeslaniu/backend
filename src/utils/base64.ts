import { Base64Encode } from 'base64-stream';
import concat from 'concat-stream';

export const streamToBase64 = (stream) => {
  return new Promise((resolve, reject) => {
    const base64 = new Base64Encode();

    const cbConcat = (base64) => {
      resolve(base64);
    };

    stream
      .pipe(base64)
      .pipe(concat(cbConcat))
      .on('error', (error) => {
        reject(error);
      });
  });
};
