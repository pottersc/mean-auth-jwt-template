# mean-auth-jwt-template
This is a template MEAN stack app that contains all the baseline code for authentication using JSON Web Token (JWT) and includes a Angular NavBar to register, login, and logout.

### Prerequistes
+ [Nodejs](https://nodejs.org)
+ npm (npm install –g nodemon)
+ angular-cli (npm install –g angular-cli)
+ [MongoDB](https://www.mongodb.com/)
+ run `npm install` from the `client` folder
+ rename file `\server\config\config-private.js.txt` to `\server\config\config-private.js.txt` and configure as described in file


### Client
The client was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.3.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng build` to build the project. The build artifacts will be stored in the `/server/dist/` directory. Use the `-prod` flag for a production build.

### Server
The server was built using express and mongoDB

Run `nodemon` for a dev server.  Server will be hosted on `http://localhost:3000/`. The app will automatically reload if you change any of the source files