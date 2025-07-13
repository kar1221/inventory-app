import logger from '../logger';
import { getItemsOnCategory } from './queries';

const test = async () => {
  const items = await getItemsOnCategory('Terraria');

  items.forEach((i) => {
    logger.debug(`${i.item_id}: ${i.item_name}`);
  });
};

test();
