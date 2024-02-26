import db from '../../database.js';

export default async function handler(req, res) {
  try {
    let sql;
        const { updateDescription, oldProduct } = req.body;

        sql = 'UPDATE products SET description = ? WHERE name = ?';
        db.all(sql, [updateDescription, oldProduct], (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(200).json({ message: 'Success' });
        });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}