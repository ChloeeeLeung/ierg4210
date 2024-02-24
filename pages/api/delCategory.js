import db from '../../database.js';

export default function handler(req, res) {
  try {
    let sql; 
    // sql = `DELETE FROM categories`
    // db.run(sql);
    const { delCategory } = req.body;
    if (delCategory != '' ) {
      sql = `DELETE FROM categories WHERE name = ?`;
      db.run(sql, [delCategory]); 
    }
    res.status(200).json({ message: 'Success', delCategory: delCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
