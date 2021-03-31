'use strict';

const { register, Histogram } = require('prom-client');

const callDurationHistogram = new Histogram({
	name: 'proxy_call_duration',
	help: 'Polkadot proxy call',
	labelNames: ['type'],
});


const calculateTime = function(startTime) {
    const end = process.hrtime(startTime);
    return(end[0]* 1000000000 + end[1]) / 1000000000;
  };

module.exports = {
    callDurationHistogram, calculateTime
  };
