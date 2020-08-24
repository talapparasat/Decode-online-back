const {postgres} = require('../config/vars');
const logger = require('../config/logger');
const {execFile} = require('child_process');

const backupDb = (callback) => {

    const date = new Date();
    const current_date = `${date.getFullYear()}-${date.getMonth() +
    1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    const backup_file_name = `export_${current_date}.sql`;
    const backup_file_path = `/app/services/db_backup_temp/${backup_file_name}`;

    let backup_script = `pg_dump --username=${postgres.username} --host=${postgres.host} ${postgres.database}`;

    execFile(
        './services/backup.sh',
        [backup_script, backup_file_path, postgres.password],
        (error, stdout, stderr) => {
            if (error) {
                console.log(error.stack);
                console.log('Error code: ' + error.code);
                console.log('Signal received: ' + error.signal);
                logger.error(error)
            }
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);

            callback(backup_file_name);
        }
    );

};

module.exports = backupDb;
