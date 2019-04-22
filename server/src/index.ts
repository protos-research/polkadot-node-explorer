const { CronJob } = require('cron');
import polkadot from './services/polkadot';
import logger from './services/logger';
import { config } from './constants';
import { server } from './apollo-server';

server.listen().then((server: {url: string}) => {
  logger.debug(`🚀  Server ready at ${server.url}`);
});

const job = new CronJob(`0 */${config.SAMPLING_PERIOD} * * * *`, polkadot.recordNetworkSnapshot);

polkadot.recordNetworkSnapshot();
job.start();
polkadot.getNetworkInfo();
polkadot.subscribe();