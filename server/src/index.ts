const { CronJob } = require('cron');
import polkadot from './services/polkadot';
import logger from './services/logger';
import { config } from './constants';
import { server } from './apollo-server';

server.listen().then((server: {url: string}) => {
  logger.debug(`🚀 Server 0.1.0 ready at ${server.url}`);
});

const job = new CronJob(`0 */${config.SAMPLING_PERIOD} * * * *`, async function() {
  await polkadot.recordNetworkSnapshot();
});

polkadot.recordNetworkSnapshot();
job.start();
polkadot.getNetworkInfo();
polkadot.subscribe();