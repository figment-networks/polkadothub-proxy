'use strict';


const HTTP_PORT = process.env.HTTP_PORT || 8381


const cluster = require('cluster');
const express = require('express');

const metricsServer = express();
const AggregatorRegistry = require('prom-client').AggregatorRegistry;
const aggregatorRegistry = new AggregatorRegistry();

if (cluster.isMaster) {
	for (let i = 0; i < 1; i++) {
		cluster.fork();
	}

	metricsServer.get('/metrics', async (req, res) => {
		try {
			const metrics = await aggregatorRegistry.clusterMetrics();
			res.set('Content-Type', aggregatorRegistry.contentType);
			res.send(metrics);
		} catch (ex) {
			res.statusCode = 500;
			res.send(ex.message);
		}
	});

	metricsServer.listen(HTTP_PORT);
	console.log(`Cluster metrics server listening to ${HTTP_PORT}, metrics exposed on /metrics`);
} else {
	require('./index.js');
}
