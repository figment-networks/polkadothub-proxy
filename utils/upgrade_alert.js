const ncu = require('npm-check-updates');

const {rollbar} = require('./rollbar');

require('dotenv').config(); 

const runCheckForUpdates = async() => {
    const updateInterval = process.env.UPDATE_INTERVAL;
    if (updateInterval) {
        console.log("Running check for packages update with interval", updateInterval)
        await checkForUpdates();
        setInterval(function (){
            checkForUpdates()
        }, updateInterval);
    }
}

const checkForUpdates = async() => {
    const upgraded = await ncu.run({
        packageFile: 'package.json',
        jsonUpgraded: true,
        silent: true,
        filter: '@polkadot/api @polkadot/types-known @polkadot/util',
    })

    const upgradedStr = JSON.stringify(upgraded);
    if (upgradedStr !== "{}") {
        rollbar.error(`You need to update these packages ${upgradedStr}`)
    } 
}

module.exports = {
    runCheckForUpdates,
}
