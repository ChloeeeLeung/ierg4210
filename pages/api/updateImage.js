import db from '../../database.js';

export default async function handler(req, res) {
  try {
    let sql;
        const { updateImage, oldProduct } = req.body;

        sql = 'UPDATE realProducts SET image = ? WHERE name = ?';
        db.all(sql, [updateImage, oldProduct], (err) => {
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