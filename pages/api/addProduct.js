import db from '../../database.js';

export default async function handler(req, res) {
  try {
      let sql;
    //  sql = `DELETE FROM products`
    // db.run(sql);
    const { productName, productPrice, productInventory, productDescription, productImage, newProductCategory } = req.body;

    if (productName !== '') {
      sql = `INSERT INTO products (cid, name, price, description, inventory, image) VALUES(?,?,?,?,?,?)`;
      db.run(sql, [newProductCategory, productName, productPrice, productDescription, productInventory, productImage]);

      res.status(200).json({ message: 'Success' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}