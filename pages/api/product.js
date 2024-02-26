import db from '../../database.js';

export default function handler(req, res) {
  try {
    const { pathname } = req.body;
    // let sql = `INSERT INTO categories (name) VALUES(?)`;
    //   db.run(sql, [pathname]); 
    let sql = `SELECT * FROM categories WHERE cid = ?`;
    db.all(sql, [pathname], (err, categoryRows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      
      const categoryAll = categoryRows.map((row) => row);
      
      if (categoryAll.length === 0) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }
            
      sql = `SELECT * FROM products WHERE cid = ?`;
      db.all(sql, [categoryAll[0].cid], (err, productRows) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        
        const productAll = productRows.map((row) => row);
        
        res.status(200).json({ categoryAll, productAll, pathname });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}