const {port, env} = require('./config/vars');
const app = require('./config/express');
const logger = require('./config/logger');
const db = require('./models/index');
const backupTask = require('./services/backup-cron');

db.sequelize.sync({logging: false})
    .then(() => {
        console.log('All models synchronized to the DB');
    })
    .catch(err => {
        console.log(err)
    });

backupTask.start();


app.listen(port, '0.0.0.0', () => logger.info(`server started on port ${port} (${env})`));

module.exports = app;
