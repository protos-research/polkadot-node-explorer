import { events } from '../constants';
import pubsub from '../services/pubsub';

export default {
  newBlock: {
    subscribe: () => pubsub.asyncIterator([events.BLOCK_ADDED]),
  },
};
