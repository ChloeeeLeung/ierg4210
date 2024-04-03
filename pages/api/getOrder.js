import db from '../../database.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  try {
    const { cartList } = req.query;
    console.log(cartList);

    const testList = [
        { pid: 6, quantity: 1 },
        { pid: 8, quantity: 3 }
    ];

    const quantities = [];
    const items = [];
    const names = [];
    const prices = [];

    for (let i = 0; i < testList.length; i++) {
        quantities.push(testList[i].quantity);
    }

    const sql = 'SELECT * FROM realProducts WHERE pid = ?';

    await Promise.all(
        testList.map(async (item) => {
            const rows = await new Promise((resolve, reject) => {
            db.all(sql, [item.pid], (err, rows) => {
                if (err) {
                reject(err);
                } else {
                resolve(rows);
                }
            });
            });

            const productName = rows.map((row) => row.name);
            const productPrice = rows.map((row) => row.price);

            names.push(productName);
            prices.push(productPrice);
        })
        );

        for (let i = 0; i < testList.length; i++) {
            items.push({
                name: names[i][0],
                unit_amount: { currency_code: 'USD', value: parseInt(prices[i][0]) },
                quantity: quantities[i]
            });
        }

        let total = 0;
        for (let i = 0; i < testList.length; i++) {
            total += quantities[i] * parseInt(prices[i][0]);
        }

        const amount = {
            currency_code: 'USD',
            value: total,
            breakdown: { item_total: { currency_code: 'USD', value: total } }
        };

        const invoice_id = uuidv4();

        const email = 'sb-xukaw30219907@business.example.com';
        const generateDigest = async () => {
            const salt = await bcrypt.genSalt(10);
            const digest = await bcrypt.hash(`${items}, ${amount}, ${email}`, salt);
            return digest;
        };

        const custom_id = await generateDigest();

        const purchase_units = [{
            amount,
            items,
            custom_id,
            invoice_id
        }];

    res.status(200).json({ purchase_units });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}