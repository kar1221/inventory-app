import { query } from './db';

async function insertItem(itemName: string): Promise<void> {
  await query('INSERT INTO items (item_name) VALUES ($1)', [itemName]);
}

async function insertCategory(categoryName: string): Promise<void> {
  await query('INSERT INTO categories (category_name) VALUES ($1)', [
    categoryName
  ]);
}

interface Items {
  item_id: number;
  item_name: string;
}

async function fetchItems(): Promise<Items[]> {
  const { rows } = await query<Items>('SELECT * FROM items');

  return rows;
}

interface Categories {
  category_id: number;
  category_name: string;
}

async function fetchCategories(): Promise<Categories[]> {
  const { rows } = await query<Categories>('SELECT * FROM categories');

  return rows;
}

async function fetchItemsByCategory(categoryName: string): Promise<Items[]> {
  const queryString = `
    SELECT i.item_id, i.item_name 
    FROM items i
    JOIN itemsToCategories ic
    ON i.item_id = ic.item_id
    JOIN categories c
    ON ic.category_id = c.category_id
    WHERE c.category_name = $1
    ORDER BY i.item_id ASC;
`;

  const { rows } = await query<Items>(queryString, [categoryName]);

  return rows;
}

async function fetchCategoriesByItems(itemName: string): Promise<Categories[]> {
  const queryString = `
    SELECT c.category_id, c.category_name
    FROM categories c
    JOIN itemsToCategories ic
    ON c.category_id = ic.category_id
    JOIN items i
    ON ic.item_id = i.item_id
    WHERE i.item_name = $1
    ORDER BY c.category_id ASC;
`;

  const { rows } = await query<Categories>(queryString, [itemName]);

  return rows;
}

export {
  fetchCategories,
  fetchCategoriesByItems,
  fetchItems,
  fetchItemsByCategory,
  insertCategory,
  insertItem
};
