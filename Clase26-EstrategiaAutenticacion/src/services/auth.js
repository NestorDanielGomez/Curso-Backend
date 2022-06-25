import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../model/user";

const strategyOptions = {
  usernameField: "usuario",
  passwordField: "contrasena",
  passReqToCallback: true,
};

const login = async (req, usuario, contrasena, done) => {
  console.log("LOGIN!!");
  const user = await UserModel.findOne({ usuario });

  if (!user || !user.isValidPassword(contrasena)) return done(null, false);

  console.log("ENCONTRE UN USUARIO");
  return done(null, user);
};

const signup = async (req, usuario, contrasena, done) => {
  console.log("SIGNUP!!");
  try {
    const newUser = await UserModel.create({ usuario, contrasena });
    return done(null, newUser);
  } catch (err) {
    console.log("Hubo un error al registrarse!");
    console.log(err);
    return done(null, false);
  }
};

export const loginFunc = new LocalStrategy(strategyOptions, login);
export const signupFunc = new LocalStrategy(strategyOptions, signup);

/*** Express-session crea un objeto session en la request* passport
 *  agrega a req.session un objeto llamado passport para guardar
 *  la info del usuario* Cuando llamamos a done en login o en signup
 *  y pasamos el usuario lo siguiente que ocurre es que se ejecuta
 * passport.serializeUser* Esta funcion agarra el usuario que recibio
 *  y lo guarda en req.session.passport* En este caso estamos creando
 *  una key llamado user con la info del usuario dentro de
 *  req.session.passport*/
passport.serializeUser((user, done) => {
  console.log("Se Ejecuta el serializeUser");
  done(null, user._id);
});

/**DeserializeUser Permite tomar la info que mandamos con el
 * serializeUser para hacer algun extra de busqueda de informacion*/
passport.deserializeUser((userId, done) => {
  console.log("Se Ejecuta el deserializeUser");
  UserModel.findById(userId).then((user) => {
    return done(null, user);
  });
});
