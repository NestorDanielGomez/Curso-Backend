const serverApp = require("./services/server");
const PORT = 8080;
serverApp.listen(PORT, () => console.log("ESTAMOS LISTOS"));
