import passport from "passport";
import os from "os";
import { Router } from "express";

const router = Router();

const numCPUs = os.cpus().length;
console.log("nro CPUs -->> ", numCPUs);

const infodelProceso = {
  args: process.argv.slice(2),
  plataforma: process.platform,
  nodeVersion: process.version,
  memoria: JSON.stringify(process.memoryUsage.rss()),
  execPath: process.cwd(),
  processID: process.pid,
  carpeta: process.argv[1],
  cantidadNucleos: numCPUs,
};

router.get("/info", (req, res) => {
  const data = infodelProceso;
  res.render("info", { data });
});

//PASSPORT
const passportOptions = { badRequestMessage: "falta username / password" };

//MIDDLEWARE
const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  } else {
    next();
  }
};

//Register

router.get("/signup", (req, res) => {
  res.render("register");
});
//SIGN UP
router.post("/signup", (req, res, next) => {
  passport.authenticate("signup", passportOptions, (err, user, info) => {
    console.log("Info SIGNUP");
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.render("register-error");

    res.render("usuarioCreado");
  })(req, res, next);
});

//LOGIN-ERROR
router.get("/login-error", (req, res) => {
  res.render("login-error");
});

//LOGIN
router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login-error",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/datos");
  }
);

//DATOS

router.get("/datos", isLoggedIn, async (req, res) => {
  const datos = req.user;
  const nombre = datos.username;
  res.render("datos", { nombre });
});

//GET
router.get("/", (req, res) => {
  res.redirect("/datos");
});

//LOGOUT
router.get("/logout", (req, res) => {
  const datos = req.user;
  const nombre = datos.username;
  res.render("logout", { nombre });
  req.session.destroy();
});

export default router;
