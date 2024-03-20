import db from '../../database.js';

export default function handler(req, res) {
  try {
      let sql;
      const { userName, userPassword, hashedPassword, admin } = req.body;

      if(userName != '' && userPassword !=''){
          sql = `INSERT INTO users (email, password, isAdmin) VALUES(?,?,?)`;
          db.run(sql, [userName, hashedPassword, admin]);

          res.status(200).json({ message: 'Success' });
      } else {
          res.status(505).json({ message: 'Input incomplete' });
      }
    
  // try {
  //   const sql = `
  //     CREATE TABLE IF NOT EXISTS users (
  //       userid INTEGER PRIMARY KEY,
  //       email TEXT NOT NULL,
  //       password TEXT  NOT NULL,
  //       isAdmin BOOLEAN NOT NULL,
  //       salt NOT NULL
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