const serverapp = require(`./services/server`);
const puerto = 8080;
serverapp.listen(puerto, () => console.log("Server up en puerto", puerto));
