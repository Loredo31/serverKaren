const cors= require('cors');
//Creacion de la API
//Creacion de las instancias de lad dependencias instaladas
const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')

//Se crea la app en express
const app = express()

//Uso de cors
app.use(cors());

//Configuración de la cabecera donde se solicita permita
//peticiones de todos los sitios y todos los metodos que consuma la app
app.use(function(req, res, next){
    res.setHeader('Access-control-Allow-Origin','*')
    res.setHeader('Access-control-Allow-Methods','*')
    next()
})

//En este punto se utiliza el bodyparser
app.use(bodyParser.json())

//Se configura el puerto a utilizar
const PUERTO = 3000

//Se crea la instancia de la conexion a Base de datos
const conexion = mysql.createConnection(
    {
        host: 'localhost',
        //nombre de la base de datos
        database: 'proyecto',
        //credenciales de mysql
        user:'root',
        password:'123456'
    }
)

//Puerto a utilizar y se muestra mensaje de ejecución
app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`)
})

//Verificar que la conexión sea exitosa
conexion.connect(error =>{
    if (error) throw error
    console.log('Conexión exitosa a la BD')
})

//End point para obtener todos los agencias
app.get('/agencias',(req,res) => {
    //crear la consulta sql
    const query = 'SELECT * from agencias'
    //se pasa la consulta a la conexion
    conexion.query(query, (error,resultado) => {
        //si hay un error muestra en consola el error
        if (error) return console.error(error.message)
        //si el resultado es mayor que 0 se tienen los registros
        //y envia en formato json el resultado
        if (resultado.length > 0){
            res.json(resultado)
        }else{
            res.json('No hay registros')
        }
    })
})

//End point para obtener todos los agencias por id
app.get('/agencias/:id',(req, res)=>{
    //se desestructura el id de los parametros
    const { id } = req.params
    //consulta sql
    const query = `SELECT * FROM agencias WHERE id=${id}`

    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if(resultado.length > 0){
            res.json(resultado[0])
        }else{
            res.json('No hay registros con el id')
        }
    })
})

//End point para obtener agregar un agencia
app.post('/agencias', (req, res) => {
    const agencia = {
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        ubicacion: req.body.ubicacion,
        direccion: req.body.direccion,
        contactos: req.body.contactos,
        red_social: req.body.red_social,
        correo: req.body.correo,
        alt_img: req.body.alt_img
    }

    const query = `INSERT INTO agencias SET ?`
    conexion.query(query, agencia, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se inserto correctamente la agencia')

    })
})

//End point para actualizar un agencia
app.patch('/agencias/:id',(req, res) =>{
    const { id } = req.params
    const agencia = {
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        ubicacion: req.body.ubicacion,
        direccion: req.body.direccion,
        contactos: req.body.contactos,
        red_social: req.body.red_social,
        correo: req.body.correo,
        alt_img: req.body.alt_img
    }
    const query = `UPDATE agencias SET nombre='${agencia.nombre}',
    tipo='${agencia.tipo}', ubicacion='${agencia.ubicacion}',
    direccion='${agencia.direccion}', contactos='${agencia.contactos}',
    red_social='${agencia.red_social}', correo='${agencia.correo}', alt_img='${agencia.alt_img}' WHERE id=${id}`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se actualizó correctamente la agencia')
        console.log(resultado)
    })  
})

//End point para borrar un agencia por id
app.delete('/agencias/:id',(req, res) => {
    const { id } = req.params

    const query = `DELETE FROM agencias WHERE id=${id}`
    conexion.query(query, (error, resultado) =>{
        if(error) return console.error(error.message)
        
        res.json('Se eliminó correctamente la agencia')
        console.log(res)
        
    })
})

// ---------------------------Atractivos------------------------------------------------------

