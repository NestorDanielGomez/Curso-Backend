import Server from './services/server';
import { initDb } from './services/db'
import minimist from 'minimist';

const optionalArgsObject = {
  alias: {
    //Para pasar un alias a los argumentos que nos envian
    p: 'puerto'
  },
  default: {
    //Si no nos envian el argumento, se setea por default
    p: 8080
  },
};
const args = minimist(process.argv.slice(2), optionalArgsObject);

const PORT = args.puerto;

const init = async () => {
  await initDb()
  console.log('Conectado a la DB');

  const server = Server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
  
  server.on('error', (error) => console.log(`Error en servidor: ${error}`));
  
}
init()