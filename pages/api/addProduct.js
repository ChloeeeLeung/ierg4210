import db from '../../database.js';
import { writeFile } from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  try {
    const { productName, productPrice, productInventory, productDescription, productImage, newProductCategory } = req.body;
  // const sql = `INSERT INTO categories (name) VALUES(?)`;
  //     db.run(sql, [productImage]);
    if (productName !== '') {
      const sql = `INSERT INTO realProducts (cid, name, price, description, inventory, image) VALUES(?,?,?,?,?,?)`;
      db.run(sql, [newProductCategory, productName, productPrice, productDescription, productInventory, productImage]);

      const productId = productName;

      const filename = `product_${productId}.jpg`;
      await writeFile(path.join(process.cwd(), 'public/uploads', filename), productImage);

      res.status(200).json({ message: 'Success' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
