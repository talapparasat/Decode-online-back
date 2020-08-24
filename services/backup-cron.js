const cron = require('node-cron');
const backupDb = require('./backup-db');
const uploadToDrive = require('./uploadToDrive');

// const task = cron.schedule('0 0 */3 * *', () =>  {
const task = cron.schedule('* * * * *', () =>  {
    backupDb(uploadToDrive);
}, {
    scheduled: false
});

module.exports = task;
