# ESE 2018 - Team 6

## Installation
##### Initial Setup
- Install both [Node.js] and NPM. (NPM is installed automatically with latest versions of Node.js)
- Install [Angular CLI] globally on your computer.
- Clone this repository to your local machine and immediately delete the `.git` folder.

##### Backend
Navigate to the backend folder and install both the Node Package Manager and bcrypt (required for password hashing)

```sh
$ cd backend
$ npm install
$ npm install bcrypt --save
```

##### Frontend
Navigate to the frontend folder and install both the Node Package Manager and ngx-toastr (required for user feedback)

```sh
$ cd frontend
$ npm install
$ npm install ngx-toastr --save
$ npm install @angular/animations --save
$ npm install ng5-slider --save
```

##### Run the application
Now that everything is installed, it's time to run the page on your local machine.
First, navigate to the backend folder to compile the TypeScript code to JavaScript. Then start the backend server.

```sh
$ cd backend
$ npm run tsc
$ node build/server.js
```

Second, navigate to the frontend folder to start a dev server.

```sh
$ cd frontend
$ ng serve
```

You can now visit the page in your local browser using the following URL: `http://localhost:4200/`


[Node.js]: <https://nodejs.org/en/>
[Angular CLI]: <https://cli.angular.io/>
