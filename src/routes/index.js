const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin')

admin.initializeApp({
    credential:admin.credential.applicationDefault(),
    databaseURL:'https://node-firebase-contactapp-default-rtdb.firebaseio.com/'//DIRECCION DE DONDE ESTÁ LA BASE DE DTATOS
})//

const db = admin.database(); //De todos los servicios que tengo, quiero conectarme a la basededatos

router.get('/',  (req, res)=>{
    db.ref('contactos').once('value', (snapshot)=>{ //Esta funcion de acá es para consultar la lista de contactos, va a traer todo lo que tenga esa lista, y los va a guardar en data
        const data = snapshot.val();
        res.render('index', {contactos:data});
    })
})

router.post('/new-contact', (req,res)=>{
    console.log(req.body)
    const nuevoContacto = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono
    }
    db.ref('contactos').push(nuevoContacto) //Nombre de la tabla
    res.redirect('/')
})

router.get('/deleteContact/:id', (req,res)=>{
    db.ref('contactos/' +req.params.id).remove();
    res.redirect('/')
})

module.exports = router;