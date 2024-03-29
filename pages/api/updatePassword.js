import db from '../../database.js';

export default async function handler(req, res) {
  try {
    let sql;
        const { userEmail, hashedPassword } = req.body;

        sql = 'UPDATE users SET password = ? WHERE email = ?';
        db.all(sql, [hashedPassword, userEmail], (err) => {
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