const Admin = true;

const validarAdmin = (req, res, next) => {
  if (Admin) next();
  else res.status(401).json({ msg: "Usted no esta autorizado" });
};

module.exports = {
  validarAdmin,
};
