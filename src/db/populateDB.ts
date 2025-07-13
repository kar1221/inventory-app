import logger from '../logger';
import client from './client';

const query = `
CREATE TABLE IF NOT EXISTS items (
    item_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    item_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
    category_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS itemsToCategories (
    item_id INT NOT NULL
        REFERENCES items(item_id)
        ON DELETE CASCADE,
    category_id INT NOT NULL
        REFERENCES categories(category_id)
        ON DELETE CASCADE,
    
    PRIMARY KEY (item_id, category_id)
);

INSERT INTO items (item_name) VALUES
    ('Apple'),
    ('Magic Mirror'),
    ('Diamond Sword'),
    ('Galaxy Sword'),
    ('Ancient Fruit'),
    ('Iridium Pickaxe'),
    ('Netherite Ingot'),
    ('Wall Of Flesh'),
    ('Wither'),
    ('Mayor''s Short')
ON CONFLICT DO NOTHING;

INSERT INTO categories (category_name) VALUES
    ('Terraria'),
    ('Minecraft'),
    ('Stardew Valley')
ON CONFLICT DO NOTHING;

WITH desired_pairs (item_name, category_name) as (
  VALUES
    ('Apple', 'Stardew Valley'),
    ('Apple', 'Minecraft'),
    ('Apple', 'Terraria'),
    ('Magic Mirror', 'Terraria'),
    ('Diamond Sword', 'Minecraft'),
    ('Galaxy Sword', 'Stardew Valley'),
    ('Ancient Fruit', 'Stardew Valley'),
    ('Iridium Pickaxe', 'Stardew Valley'),
    ('Netherite Ingot', 'Minecraft'),
    ('Wall Of Flesh', 'Terraria'),
    ('Wither', 'Minecraft'),
    ('Mayor''s Short', 'Stardew Valley')
)
INSERT INTO itemsToCategories (item_id, category_id)
SELECT
  i.item_id,
  c.category_id
FROM desired_pairs dp
  JOIN items i ON i.item_name = dp.item_name
  JOIN categories c ON c.category_name = dp.category_name
ON CONFLICT DO NOTHING;
`;

const seed = async () => {
  try {
    await client.connect();
    await client.query(query);
  } catch (error) {
    logger.error(error);
    throw error;
  } finally {
    await client.end();
  }
};

seed()
  .then(() => {
    logger.info('Database populated');
  })
  .catch((error) => {
    logger.error(`An error occured: ${error}`);
  });
