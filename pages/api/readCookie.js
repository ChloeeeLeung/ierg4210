export default (req, res) => {
  const cookieValue = req.cookies['auth'];

  let auth = false;

  if (cookieValue) {
    auth = true;
  } else {
    auth = false;
  }

  res.status(200).json({ auth: auth });
};