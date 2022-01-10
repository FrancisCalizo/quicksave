const ClientClass = require('pg').Client;

const pgUrl =
  'postgres://tolabgxv:wCI6ydvOK26S-SsHFrssnevZ62qgeyVL@castor.db.elephantsql.com/tolabgxv';
const client = new ClientClass(pgUrl);

(async function connect(client) {
  try {
    await client.connect();
  } catch (ex) {
    console.log('Some error' + ex);
  }
})(client);

module.exports = client;

// Note: I was using Pool instead of Client before from a video tutorial. It
// seems to used more, but I couldn't connect to ElephantSQL using it, I could
// only connext to it using Client.

// const Pool = require('pg').Pool;
// const pool = new Pool({
//   user: 'postgres',
//   password: 'password',
//   host: 'postgres://tolabgxv:wCI6ydvOK26S-SsHFrssnevZ62qgeyVL@castor.db.elephantsql.com/tolabgxv',
//   port: 5432,
//   database: 'quicksave',
// });
// module.exports = pool;
