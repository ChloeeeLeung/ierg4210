import db from '../../database.js';

export default function handler(req, res) {
  try {
      let sql;
      const { userName, userEmail, userPassword, hashedPassword, admin } = req.body;

      if(userName && userEmail && userPassword){
        sql = `INSERT INTO users (name, email, password, isAdmin) VALUES(?,?,?,?)`;
        db.run(sql, [userName, userEmail, hashedPassword, admin]);
        res.status(200).json({ message: 'Success' });
      } else {
        res.status(505).json({ message: 'Not success' });
      }
    
  // try {
  //   const sql = `
  //     CREATE TABLE IF NOT EXISTS users (
  //       userid INTEGER PRIMARY KEY,
  //       name TEXT NOT NULL,
  //       email TEXT NOT NULL,
  //       password TEXT  NOT NULL,
  //       isAdmin BOOLEAN NOT NULL
  //     );
  //   `;
  //   // const sql = 'DROP TABLE users;';

  //   db.run(sql, (err) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //     } else {
  //       res.status(200).json({ message: 'Table created successfully' });
  //     }
  //   });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}