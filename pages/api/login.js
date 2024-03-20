import db from '../../database.js';

export default function handler(req, res) {
  try {
      const { email } = req.query; 
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.all(sql, [email], (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            const password = rows.map((row) => row.password);
            const salt = rows.map((row) => row.salt);
            res.status(200).json({ password, salt });
        });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}