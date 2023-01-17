const { exec } = require("child_process");

exec("cd ./user && npm start");
exec("cd ./post && npm start");
exec("cd ./gateway && npm start");

console.log('Services running with Gateway on http://localhost:8000/');
