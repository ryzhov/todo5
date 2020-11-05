const process = require('process');

const shutdown = message => {
    console.log(message);
    process.exit(0);
}

process.on('SIGINT',  () => shutdown('Exit on SIGINT'));
process.on('SIGTERM', () => shutdown('Exit on SIGTERM'));

const sleep = async () => { while(1) await new Promise(resolve => setTimeout(_ => resolve(), 3600000)); };
sleep();
