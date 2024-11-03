function isAuthorizedAdmin(req, res, next) {
  const isAdmin = req.headers.is_admin;

  if (!isAdmin) {
    return res.status(401).json({ message: "No authorized access." });
  }
  next();
}

module.exports = isAuthorizedAdmin;
