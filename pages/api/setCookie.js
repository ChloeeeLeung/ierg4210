export default function handler(req, res) {
  const { cookie } = req.body;

  res.setHeader('Set-Cookie', cookie);

  res.status(200).json({ message: 'Cookie set successfully' });
}