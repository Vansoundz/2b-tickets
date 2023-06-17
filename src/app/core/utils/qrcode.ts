import * as qrcode from 'qrcode';

const createCode = async (params: Record<string, any>) => {
  //
  return new Promise((resolve, reject) => {
    qrcode.toDataURL('vansoundz', (error, url) => {
      if (error) return reject(error);
      resolve(url);
    });
  });
};

export { createCode };
