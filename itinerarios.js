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


//End point para obtener todos los itinerarios

app.get('/itinerarios',(req,res) => {
    //crear la consulta sql
    const query = 'SELECT * from itinerarios'
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

//End point para obtener todos los itinerarios por id
app.get('/itinerarios/:id',(req, res)=>{
    //se desestructura el id de los parametros
    const { id } = req.params
    //consulta sql
    const query = `SELECT * FROM itinerarios WHERE id=${id}`

    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if(resultado.length > 0){
            res.json(resultado[0])
            console.log('dato del endpoint:')
            console.log(resultado)
        }else{
            res.json('No hay registros con el id')
        }
    })
})





//End point para obtener agregar un itinerario
app.post('/itinerarios', (req, res) => {
    const itinerario = {
        nombre: req.body.nombre,
        dia_1: req.body.dia_1,
        actividades_dia_1: req.body.actividades_dia_1,
        dia_2: req.body.dia_2,
        actividades_dia_2: req.body.actividades_dia_2,
        dia_3: req.body.dia_3,
        actividades_dia_3: req.body.actividades_dia_3,
        dia_4: req.body.dia_4,
        actividades_dia_4: req.body.actividades_dia_4,
        alt_img: req.body.alt_img
    }

    const query = `INSERT INTO itinerarios SET ?`
    conexion.query(query, itinerario, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se inserto correctamente el itinerario')

    })
})


//End point para actualizar un itinerario
app.patch('/itinerarios/:id',(req, res) =>{
    const { id } = req.params
    const itinerario = {
        nombre: req.body.nombre,
        dia_1: req.body.dia_1,
        actividades_dia_1: req.body.actividades_dia_1,
        dia_2: req.body.dia_2,
        actividades_dia_2: req.body.actividades_dia_2,
        dia_3: req.body.dia_3,
        actividades_dia_3: req.body.actividades_dia_3,
        dia_4: req.body.dia_4,
        actividades_dia_4: req.body.actividades_dia_4,
        alt_img: req.body.alt_img
    }
    const query = `UPDATE itinerarios SET nombre='${itinerario.nombre}',
    dia_1='${itinerario.dia_1}', actividades_dia_1='${itinerario.actividades_dia_1}',
    dia_2='${itinerario.dia_2}', actividades_dia_2='${itinerario.actividades_dia_2}',
    dia_3='${itinerario.dia_3}', actividades_dia_3='${itinerario.actividades_dia_3}',
    dia_4='${itinerario.dia_4}', actividades_dia_4='${itinerario.actividades_dia_4}',
    alt_img='${itinerario.alt_img}' WHERE id=${id}`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se actualizó correctamente el itinerario')
        console.log(resultado)
    })  
})





//End point para borrar un itinerario por id
app.delete('/itinerarios/:id',(req, res) => {
    const { id } = req.params

    const query = `DELETE FROM itinerarios WHERE id=${id}`
    conexion.query(query, (error, resultado) =>{
        if(error) return console.error(error.message)
        
        res.json('Se eliminó correctamente el itinerario')
        console.log(res)
        
    })
})