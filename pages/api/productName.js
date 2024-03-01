import db from '../../database.js';

export default function handler(req, res) {
    try {
        const { pid } = req.query; 
        const sql = 'SELECT * FROM realProducts WHERE pid = ?';
        db.all(sql, [pid], (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            const productName = rows.map((row) => row.name);
            res.status(200).json({ productName });
        });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

