import pool from '../src/database';

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price INT NOT NULL,
        imageUrl VARCHAR(255),
        stock INT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS carts (
        id SERIAL PRIMARY KEY
      );
      
      CREATE TABLE IF NOT EXISTS cart_items (
        cart_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        FOREIGN KEY (cart_id) REFERENCES carts(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      );
    `);
  } finally {
    client.release();
  }
};

createTables()
  .then(() => console.log('Tables created successfully'))
  .catch(err => console.error('Error creating tables', err.stack))
  .finally(() => pool.end());
