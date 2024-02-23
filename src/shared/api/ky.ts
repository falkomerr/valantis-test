import ky from 'ky';
import md5 from 'md5';

const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');

export const $api = ky.create({
  prefixUrl: 'https://api.valantis.store:41000/',
  headers: {
    'X-Auth': md5('Valantis_' + timestamp),
  },
});
