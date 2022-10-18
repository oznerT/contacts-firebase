// Archivo que arranca la aplicacion
const express = require('express');
const morgan = require('morgan'); //Middleware, siempre en medio de las peticiones del servidor
const exphbs = require('express-handlebars');
const path = require('path'); //nos permite poder trabajar con los modulos

const app = express();
//settings
//Voy a establecer el puerto de mi aplicacion
app.set('port', process.env.PORT || 4002)
app.set('views', path.join(__dirname, 'views')) //la carpeta views esta disponible y cone sta linea de codigo sabe donde esta ubicada
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main', //va a haber un archivo que va a tener codigo en comun y con esto se puede reutilizar
    extname: '.hbs' //Que tipo de extension tienen los archivos
}));  //Establecer el motor de plantillas, aca creamos la configuracion .hbs. El objeto permite configurar el boton, el
app.set('view engine', '.hbs')

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false })) //Cuando tengamos formularios podamos aceptar la información que llega


//routes
app.use(require('./routes/index'))

//static files, archivos que el navegador puede acceder
app.use(express.static(path.join(__dirname, 'public'))); //con esto sabe que la carpeta public está dentro del proyecto

module.exports = app;