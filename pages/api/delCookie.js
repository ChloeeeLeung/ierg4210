export default (req, res) => {
  res.setHeader('Set-Cookie', 'auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
  res.status(200).json({ message: 'Cookie deleted' });
};