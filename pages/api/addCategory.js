import db from '../../database.js';

export default function handler(req, res) {
  try {
    let sql; 
    // sql = `DELETE FROM realProducts WHERE pid =?`
    // db.run(sql, [2]);
    const { newCategory } = req.body;
    if (newCategory != '' ) {
      sql = `INSERT INTO categories (name) VALUES(?)`;
      db.run(sql, [newCategory]); 
    }
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}