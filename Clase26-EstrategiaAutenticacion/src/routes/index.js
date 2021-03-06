import passport from "passport";
import { Router } from "express";

const router = Router();

const passportOptions = { badRequestMessage: "falta usuario / contraseña" };

//Middleware
const isLoggedIn = (req, res, next) => {
  console.log("Middleware Authenticated");
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) res.redirect("/login");
  next();
};

/* --------- REGISTER ---------- */
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

    res.render("userCreated");
  })(req, res, next);
});

/* --------- LOGIN ---------- */
router.get("/login", (req, res) => {
  res.render("login");
});
/* --------- LOGIN-Error---------- */
router.get("/login-error", (req, res) => {
  res.render("login-error");
});
/* --------- LOGIN-Post---------- */
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

/* --------- DATOS ---------- */
router.get("/datos", isLoggedIn, async (req, res) => {
  const nombre = req.user.usuario;
  res.render("datos", { nombre });
});

//GET
router.get("/", (req, res) => {
  res.redirect("/datos");
});

/* --------- LOGOUT ---------- */
router.get("/logout", (req, res) => {
  const nombre = req.user.usuario;
  res.render("logout", { nombre });
  req.session.destroy();
});

export default router;
