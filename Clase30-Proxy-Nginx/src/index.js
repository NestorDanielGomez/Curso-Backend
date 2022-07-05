import Server from './services/server';
import { initDb } from './services/db'
import cluster from 'cluster'
import minimist from 'minimist';
import os from 'os'

const numCPUs = os.cpus().length;

const optionalArgsObject = {
  alias: {
    //Para pasar un alias a los argumentos que nos envian
    p: 'puerto',
    m: 'modo'
  },
  default: {
    //Si no nos envian el argumento, se setea por default
    p: 8080,
    m:'FORK'
  },
};
const args = minimist(process.argv.slice(2), optionalArgsObject);

export const PORT = args.puerto;
const modoCluster = args.modo === 'CLUSTER'


if (modoCluster && cluster.isPrimary) {
  console.log('MODO CLUSTER');
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
  
} else {

  const init = async () => {
    console.log('MODO FORK');
    await initDb()
    console.log('Conectado a la DB');
  
    const server = Server.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
    
    server.on('error', (error) => console.log(`Error en servidor: ${error}`));
    
  }
  init()
}
