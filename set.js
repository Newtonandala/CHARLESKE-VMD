const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUxnT3AvbkNqK2RmV1J5VUZENi9DVTIxV3ZVU0JlVUZkRHU0RzU1UDJFYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidDBNVS9FWjd4UVozWGdxeitLRy90UG5JblZBVlFERDhxZXVFNUxtb2VtST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlS1JwRCttcU1QbkhncnZ4MWNpRU5yREVBeFV0L1ZSSU9LMnVOZzFLRlZBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtc0tIN3NFQVVQdWFXSVhSYzlFQjdVOEdrTmxOczN2czFTVGRCS2p4VVZJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVJWnhyUUhJZVl5WklRSTRZcGFoMzJucDdVQk1MeXdWL1EzQzAwOHFsbFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijc3Y2dvTlBHakJQZVRtNnU5NGNuMWdaUzJVQTA1eVh6eEIweUQ0TlBpa0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0NienB0Zi9LSWZUT2RGQW9JQUNJbFZpb29TUC9kTEk1aVBORjEwTzJYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWTRIVjdrOEwxVmg2TDVlT0EwV0JsYXJZM1hsZlBPamswUGJSSDlOQnJHbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZ0WnkydGJvZTB2OUNETzYyR1h0K1RkMjZiSmFXRGRYM0FLa3dFVk8xQjltVHJIK1hOYW9jNjhnZWRNWEZyTmFIRHp2Q0pRVUl2RDNmM0kyZnJ5TkJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQsImFkdlNlY3JldEtleSI6IjhucTkwcHkvWmo0TTEvMnhxRUlGL2gyN1d3UFV3NGZxSG5EbFliMGJqNWc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzkzNzUzMzI3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkY5NDQwMkQ2MEJDOTNGQkU3NTUwQkMyNjlGMzc3RDY1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDUzNDMzNjJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc5Mzc1MzMyN0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5NzI5Mjc0MTIyRTNCMTEwM0E3NDA5MjU4OTEyQUE4RiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1MzQzMzYyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3OTM3NTMzMjdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQ0MxREZERjQ1NkVFQkE2QTIxMzdEM0YxQzFDQTM0QzgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTM0MzM3OH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzkzNzUzMzI3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjhERkJGMDEzNzQ0QjBENTBCQjNERUJFRjI2MDdENTFGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDUzNDMzODZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc5Mzc1MzMyN0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0REUwNTJFRDE3NThDREQzM0QzOURBOTI0RTdFREY1NCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1MzQzMzkzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3OTM3NTMzMjdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMURCRDYwRUI0NzIwQ0VGNDMzNDU0M0Y5RkNCNjMwQkQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTM0MzQwMX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiLXd1eFdYTXZUay1sRVBROWx0Z1RpZyIsInBob25lSWQiOiI2Nzk0NTI4Zi02YmYwLTQzYjItODE3Mi1iYzcxN2Q5Y2Y5ZmMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ016dTdKMXk0Z3dNOUVIanRsQ2dZN0lPZXNJPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ing2UHUyZHpWRmFvWGUyMTZ5dm14YmxnZ1V0dz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiIzSFNMM1ZSSCIsIm1lIjp7ImlkIjoiMjU0NzkzNzUzMzI3OjUxQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Iu+uqdmo2YDvrqnvrqnZqNmA8J2Th25ld3Rvbu+uqdmo2YDvrqnvrqnZqNmAIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJZXRyZllERVBDbW44QUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJLNW16czhSaXNWbVk4d1ozYzVwMlBoVTVERFRvTDJ2bWRYT1pxei9PcmdVPSIsImFjY291bnRTaWduYXR1cmUiOiJSdUd4NkMza21mMmV4eHNEWjRVMW43T2hxd0FLREJITlUvbm1CMkptMmw1WjdjVENqRFgwRVRFbG9GZENCRWtkRnJST2tTL0pXZk9neko1Y1Izb09Ddz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNEtPckpOWFdHSEVBd0RHRTlscUVOd3RuL203NGJRMHo2TkJDajl6bW8rZm9sd3NyUnlZYXloaG1qNk1ZZ1RrbjVCZi9lS0ZHalc4dnRzMEpqMDJkRHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3OTM3NTMzMjc6NTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCU3VaczdQRVlyRlptUE1HZDNPYWRqNFZPUXcwNkM5cjVuVnptYXMvenE0RiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTM0MzM1OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJdHoifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "AndalaTheMr",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " AndalaTheMr",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'no',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

