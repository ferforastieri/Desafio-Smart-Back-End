import pool from '../src/database';

const seed = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    await client.query('TRUNCATE TABLE cart_items, carts, products RESTART IDENTITY CASCADE');
    
    const products = [];
    for (let i = 1; i <= 50; i++) {
      products.push(`('Product ${i}', ${i * 10}, '/assets/product${i}.jpg', ${50 - i})`);
    }
    await client.query(`
      INSERT INTO products (name, price, imageUrl, stock) VALUES
      ${products.join(', ')}
    `);

    await client.query(`
      INSERT INTO carts (id) VALUES
      (1),
      (2),
      (3),
      (4);
    `);

    await client.query(`
      INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
      (1, 1, 2),
      (1, 2, 1),
      (1, 3, 5);
    `);

    await client.query(`
      INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
      (2, 4, 3),
      (2, 5, 2),
      (2, 6, 1);
    `);

    await client.query('COMMIT');
    console.log('Seed data inserted successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    if (error instanceof Error) {
      console.error('Error inserting seed data:', error.stack);
    } else {
      console.error('Unknown error:', error);
    }
  } finally {
    client.release();
  }
};

seed()
  .then(() => console.log('Seed completed'))
  .catch(err => {
    if (err instanceof Error) {
      console.error('Error seeding data:', err.stack);
    } else {
      console.error('Unknown error:', err);
    }
  })
  .finally(() => pool.end());
