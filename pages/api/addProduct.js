// import db from '../../database.js';

// export default async function handler(req, res) {
//   try {
//     let sql;
//     const { productName, productPrice, productInventory, productDescription, productImage, newProductCategory } = req.body;

//     if (productName !== '') {
        
//       sql = `SELECT cid FROM categories WHERE name = ?`;
      
//       const categoryResult = db.run(sql, [newProductCategory]);
//       const categoryId = categoryResult ? categoryResult.cid : null;

//       sql = `INSERT INTO products (cid, name, price, description, inventory, image) VALUES(?,?,?,?,?,?)`;
//       db.run(sql, [categoryId, productName, productPrice, productDescription, productInventory, productImage]);
//         res.status(200).json({ message: 'Success',  categoryResult:categoryResult});
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

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