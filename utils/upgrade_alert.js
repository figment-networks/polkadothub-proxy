const ncu = require('npm-check-updates');

const {rollbar} = require('./rollbar');

require('dotenv').config(); 

const runCheckForUpdates = async() => {
    if (process.env.UPDATE_PACKAGES) {
        console.log("Running check for packages update with interval", process.env.UPDATE_INTERVAL)
        setInterval(
            checkForUpdates()
        , process.env.UPDATE_INTERVAL);
    }
}

const checkForUpdates = async() => {
    const filter = process.env.UPDATE_FILTER;

    const upgraded = await ncu.run({
        packageFile: 'package.json',
        jsonUpgraded: true,
        silent: true,
        filter: filter
    })

    console.log("upgraded", upgraded)

    if (JSON.stringify(upgraded) !== "{}") {
        rollbar.error(`You need to update these packages ${upgraded}`)
    } 
}

module.exports = {
    runCheckForUpdates,
}
