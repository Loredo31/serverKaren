const md5 = require('md5');
const jwt = require('jsonwebtoken');

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

//End point para obtener todos los atractivos
app.get('/atractivos',(req,res) => {
    //crear la consulta sql
    const query = 'SELECT * from atractivos'
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

//End point para obtener todos los atractivos por id
app.get('/atractivos/:id',(req, res)=>{
    //se desestructura el id de los parametros
    const { id } = req.params
    //consulta sql
    const query = `SELECT * FROM atractivos WHERE id=${id}`

    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if(resultado.length > 0){
            res.json(resultado[0])
        }else{
            res.json('No hay registros con el id')
        }
    })
})

//End point para obtener agregar un atractivo
app.post('/atractivos', (req, res) => {
    const atractivo = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        tipologia: req.body.tipologia,
        localizacion: req.body.localizacion,
        descripcion: req.body.descripcion,
        accesibilidad: req.body.accesibilidad,
        actividades: req.body.actividades,
        num_visitante_ideal: req.body.num_visitante_ideal,
        fecha_ideal_visita: req.body.fecha_ideal_visita,
        segmento_mercado_potencial: req.body.segmento_mercado_potencial,
        costo: req.body.costo,
        servicio: req.body.servicio,
        alt_img: req.body.alt_img
    }

    const query = `INSERT INTO atractivos SET ?`
    conexion.query(query, atractivo, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se inserto correctamente el atractivo')

    })
})

//End point para actualizar un atractivo
app.patch('/atractivos/:id',(req, res) =>{
    const { id } = req.params
    const atractivo = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        tipologia: req.body.tipologia,
        localizacion: req.body.localizacion,
        descripcion: req.body.descripcion,
        accesibilidad: req.body.accesibilidad,
        actividades: req.body.actividades,
        num_visitante_ideal: req.body.num_visitante_ideal,
        fecha_ideal_visita: req.body.fecha_ideal_visita,
        segmento_mercado_potencial: req.body.segmento_mercado_potencial,
        costo: req.body.costo,
        servicio: req.body.servicio,
        alt_img: req.body.alt_img
    }
    const query = `UPDATE atractivos SET 
    nombre='${atractivo.nombre}',
    categoria='${atractivo.categoria}', 
    tipologia='${atractivo.tipologia}',
    localizacion='${atractivo.localizacion}', 
    descripcion='${atractivo.descripcion}',
    accesibilidad='${atractivo.accesibilidad}', 
    actividades='${atractivo.actividades}',
    num_visitante_ideal='${atractivo.num_visitante_ideal}',
    fecha_ideal_visita='${atractivo.fecha_ideal_visita}',
    segmento_mercado_potencial='${atractivo.segmento_mercado_potencial}',
    costo='${atractivo.costo}',
    servicio='${atractivo.servicio}', 
    alt_img='${atractivo.alt_img}' WHERE id=${id}`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se actualizó correctamente el atractivo')
        console.log(resultado)
    })  
})

//End point para borrar un atractivo por id
app.delete('/atractivos/:id',(req, res) => {
    const { id } = req.params

    const query = `DELETE FROM atractivos WHERE id=${id}`
    conexion.query(query, (error, resultado) =>{
        if(error) return console.error(error.message)
        
        res.json('Se eliminó correctamente la atractivo')
        console.log(res)
        
    })
})

// ---------------------------Hoteles------------------------------------------------------

//End point para obtener todos los hoteles
app.get('/hoteles',(req,res) => {
    //crear la consulta sql
    const query = 'SELECT * from hoteles'
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

//End point para obtener todos los hoteles por id
app.get('/hoteles/:id',(req, res)=>{
    //se desestructura el id de los parametros
    const { id } = req.params
    //consulta sql
    const query = `SELECT * FROM hoteles WHERE id=${id}`

    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if(resultado.length > 0){
            res.json(resultado[0])
        }else{
            res.json('No hay registros con el id')
        }
    })
})

//End point para obtener agregar un hotel
app.post('/hoteles', (req, res) => {
    const hotel = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        tipologia: req.body.tipologia,
        localizacion: req.body.localizacion,
        descripcion: req.body.descripcion,
        accesibilidad: req.body.accesibilidad,
        num_habitaciones: req.body.num_habitaciones,
        actividades: req.body.actividades,
        servicios: req.body.servicios,
        num_visitante_ideal: req.body.num_visitante_ideal,
        fecha_ideal_visita: req.body.fecha_ideal_visita,
        segmento_mercado_potencial: req.body.segmento_mercado_potencial,
        costo: req.body.costo,
        contacto: req.body.contacto,
        alt_img: req.body.alt_img
    }

    const query = `INSERT INTO hoteles SET ?`
    conexion.query(query, hotel, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se inserto correctamente el hotel')

    })
})

//End point para actualizar un hotel
app.patch('/hoteles/:id',(req, res) =>{
    const { id } = req.params
    const hotel = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        tipologia: req.body.tipologia,
        localizacion: req.body.localizacion,
        descripcion: req.body.descripcion,
        accesibilidad: req.body.accesibilidad,
        num_habitaciones: req.body.num_habitaciones,
        actividades: req.body.actividades,
        servicios: req.body.servicios,
        num_visitante_ideal: req.body.num_visitante_ideal,
        fecha_ideal_visita: req.body.fecha_ideal_visita,
        segmento_mercado_potencial: req.body.segmento_mercado_potencial,
        costo: req.body.costo,
        contacto: req.body.contacto,
        alt_img: req.body.alt_img
    }
    const query = `UPDATE hoteles SET 
    nombre='${hotel.nombre}',
    categoria='${hotel.categoria}', 
    tipologia='${hotel.tipologia}',
    localizacion='${hotel.localizacion}', 
    descripcion='${hotel.descripcion}',
    accesibilidad='${hotel.accesibilidad}', 
    num_habitaciones='${hotel.num_habitaciones}',
    actividades='${hotel.actividades}',
    servicios='${hotel.servicios}',
    num_visitante_ideal='${hotel.num_visitante_ideal}',
    fecha_ideal_visita='${hotel.fecha_ideal_visita}',
    segmento_mercado_potencial='${hotel.segmento_mercado_potencial}',
    costo='${hotel.costo}',
    contacto='${hotel.contacto}',
    alt_img='${hotel.alt_img}' WHERE id=${id}`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se actualizó correctamente el hotel')
        console.log(resultado)
    })  
})

//End point para borrar un hotel por id
app.delete('/hoteles/:id',(req, res) => {
    const { id } = req.params

    const query = `DELETE FROM hoteles WHERE id=${id}`
    conexion.query(query, (error, resultado) =>{
        if(error) return console.error(error.message)
        
        res.json('Se eliminó correctamente la hotel')
        console.log(res)
        
    })
})

// ---------------------------Restaurantes------------------------------------------------------

//End point para obtener todos los restaurantes
app.get('/restaurantes',(req,res) => {
    //crear la consulta sql
    const query = 'SELECT * from restaurantes'
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

//End point para obtener todos los restaurantes por id
app.get('/restaurantes/:id',(req, res)=>{
    //se desestructura el id de los parametros
    const { id } = req.params
    //consulta sql
    const query = `SELECT * FROM restaurantes WHERE id=${id}`

    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if(resultado.length > 0){
            res.json(resultado[0])
        }else{
            res.json('No hay registros con el id')
        }
    })
})

//End point para obtener agregar un restaurante
app.post('/restaurantes', (req, res) => {
    const restaurante = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        tipologia: req.body.tipologia,
        localizacion: req.body.localizacion,
        descripcion: req.body.descripcion,
        infraestructura: req.body.infraestructura,
        accesibilidad: req.body.accesibilidad,
        servicios: req.body.servicios,
        costo: req.body.costo,
        contacto: req.body.contacto,
        alt_img: req.body.alt_img
    }

    const query = `INSERT INTO restaurantes SET ?`
    conexion.query(query, restaurante, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se inserto correctamente el restaurante')

    })
})

//End point para actualizar un restaurante
app.patch('/restaurantes/:id',(req, res) =>{
    const { id } = req.params
    const restaurante = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        tipologia: req.body.tipologia,
        localizacion: req.body.localizacion,
        descripcion: req.body.descripcion,
        infraestructura: req.body.infraestructura,
        accesibilidad: req.body.accesibilidad,
        servicios: req.body.servicios,
        costo: req.body.costo,
        contacto: req.body.contacto,
        alt_img: req.body.alt_img
    }
    const query = `UPDATE restaurantes SET 
    nombre='${restaurante.nombre}',
    categoria='${restaurante.categoria}', 
    tipologia='${restaurante.tipologia}',
    localizacion='${restaurante.localizacion}', 
    descripcion='${restaurante.descripcion}',
    infraestructura='${restaurante.infraestructura}', 
    accesibilidad='${restaurante.accesibilidad}', 
    servicios='${restaurante.servicios}',
    costo='${restaurante.costo}',
    contacto='${restaurante.contacto}',
    alt_img='${restaurante.alt_img}' WHERE id=${id}`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se actualizó correctamente el restaurante')
        console.log(resultado)
    })  
})

//End point para borrar un restaurante por id
app.delete('/restaurantes/:id',(req, res) => {
    const { id } = req.params

    const query = `DELETE FROM restaurantes WHERE id=${id}`
    conexion.query(query, (error, resultado) =>{
        if(error) return console.error(error.message)
        
        res.json('Se eliminó correctamente la restaurante')
        console.log(res)
        
    })
})


// ---------------------------Experiencias------------------------------------------------------

//End point para obtener todos los experiencias
app.get('/experiencias',(req,res) => {
    //crear la consulta sql
    const query = 'SELECT * from experiencias'
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

//End point para obtener todos los experiencias por id
app.get('/experiencias/:id',(req, res)=>{
    //se desestructura el id de los parametros
    const { id } = req.params
    //consulta sql
    const query = `SELECT * FROM experiencias WHERE id=${id}`

    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if(resultado.length > 0){
            res.json(resultado[0])
        }else{
            res.json('No hay registros con el id')
        }
    })
})

//End point para obtener agregar un experiencia
app.post('/experiencias', (req, res) => {
    const experiencia = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        accesibilidad: req.body.accesibilidad,
        servicio: req.body.servicio,
        costo: req.body.costo,
        contacto: req.body.contacto,
        alt_img: req.body.alt_img
    }

    const query = `INSERT INTO experiencias SET ?`
    conexion.query(query, experiencia, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se inserto correctamente el experiencia')

    })
})

//End point para actualizar un experiencia
app.patch('/experiencias/:id',(req, res) =>{
    const { id } = req.params
    const experiencia = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        accesibilidad: req.body.accesibilidad,
        servicio: req.body.servicio,
        costo: req.body.costo,
        contacto: req.body.contacto,
        alt_img: req.body.alt_img
    }
    const query = `UPDATE experiencias SET 
    nombre='${experiencia.nombre}',
    descripcion='${experiencia.descripcion}', 
    accesibilidad='${experiencia.accesibilidad}', 
    servicio='${experiencia.servicio}',
    costo='${experiencia.costo}',
    contacto='${experiencia.contacto}',
    alt_img='${experiencia.alt_img}' WHERE id=${id}`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se actualizó correctamente el experiencia')
        console.log(resultado)
    })  
})

//End point para borrar un experiencia por id
app.delete('/experiencias/:id',(req, res) => {
    const { id } = req.params

    const query = `DELETE FROM experiencias WHERE id=${id}`
    conexion.query(query, (error, resultado) =>{
        if(error) return console.error(error.message)
        
        res.json('Se eliminó correctamente la experiencia')
        console.log(res)
        
    })
})

// ---------------------------Itinerarios------------------------------------------------------

//End point para obtener todos los itinerarios
app.get('/itinerarios', (req, res) => {
    const query = `SELECT itinerarios.iditinerario, itinerarios.nombre, 
                  actividades.idactividades, actividades.actividad, actividades.dia, actividades.hora
                  FROM itinerarios INNER JOIN actividades ON itinerarios.iditinerario = actividades.iditinerario`;

    conexion.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al obtener el itinerario' });
        }
        res.json(resultado);
    });
});


//End point para obtener todos los itinerarios por id
app.get('/itinerarios/:iditinerario', (req, res) => {
    const iditinerario = req.params.iditinerario
    const query = `SELECT itinerarios.iditinerario, itinerarios.nombre, 
                  actividades.idactividades, actividades.actividad, actividades.dia, actividades.hora
                  FROM itinerarios INNER JOIN actividades ON itinerarios.iditinerario = actividades.iditinerario
                  WHERE itinerarios.iditinerario = ?`;

    conexion.query(query, iditinerario, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al obtener el itinerario' });
        }
        res.json(resultado);
    });
});


//End point para agregar un itinerario
app.post('/itinerarios', (req, res) => {
    const itinerario = {nombre: req.body.nombre}
    const actividades = req.body.actividades

    const query = `INSERT INTO itinerarios (nombre) VALUES ('${itinerario.nombre}')`
    conexion.query(query, itinerario, (error, resultado) => {

        if(error) return console.error(error.message)
            
            console.log(resultado)

            actividades.forEach(actividad => {
                const query = `INSERT INTO actividades (actividad, dia, hora, iditinerario) VALUES ('${actividad.actividad}',
                '${actividad.dia}','${actividad.hora}',${resultado.insertId})`
                
                conexion.query(query, (error, resultado) => {
                    if(error) return console.error(error.message)
                });

            });
        res.json('Se inserto correctamente el itinerario')

    })
})

//End point para actualizar un itinerario
app.patch('/itinerarios/:iditinerario', (req, res) => {
    const iditinerario = req.params.iditinerario;
    const itinerario = { nombre: req.body.nombre };
    const actividades = req.body.actividades;

    const queryItinerario = `UPDATE itinerarios SET nombre='${itinerario.nombre}' WHERE iditinerario=${iditinerario}`;
    conexion.query(queryItinerario, (error, resultado) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(resultado);

        actividades.forEach(actividad => {
            const queryActividad = `UPDATE actividades SET actividad='${actividad.actividad}', dia='${actividad.dia}', 
            hora='${actividad.hora}' WHERE idactividades=${actividad.idactividades} AND iditinerario=${iditinerario}`;
            conexion.query(queryActividad, (error, resultado) => {
                if (error) {
                    return console.error(error.message);
                }
            });
        });

        res.json('Se actualizó correctamente el itinerario');
    });
});


//End point para borrar un itinerario por id
app.delete('/itinerarios/:iditinerario', (req, res) => {
    const { iditinerario } = req.params;

    const query = 'DELETE FROM itinerarios WHERE iditinerario = ?';
    conexion.query(query, iditinerario, (error) => {
        console.error(error?.message);
        res.status(error ? 500 : 200).json(
            error ? { error: 'Error al eliminar el itinerario' } :
            { message: 'Se eliminó correctamente el itinerario' }
        );
    });
});



// ---------------------------Paquetes------------------------------------------------------
//End point para obtener todos los paquetes
app.get('/paquetes',(req,res) => {
    //crear la consulta sql
    const query = 'SELECT * from paquetes'
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

//End point para obtener todos los paquetes por id
app.get('/paquetes/:id',(req, res)=>{
    //se desestructura el id de los parametros
    const { id } = req.params
    //consulta sql
    const query = `SELECT * FROM paquetes WHERE id=${id}`

    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if(resultado.length > 0){
            res.json(resultado[0])
        }else{
            res.json('No hay registros con el id')
        }
    })
})

//End point para obtener agregar un paquete
app.post('/paquetes', (req, res) => {
    const paquete = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        dia: req.body.dia,
        noche: req.body.noche,
        hotel: req.body.hotel,
        restaurante: req.body.restaurante,
        experiencia: req.body.experiencia,
        actividad: req.body.actividad,
        costo: req.body.costo,
        alt_img: req.body.alt_img
    }

    const query = `INSERT INTO paquetes SET ?`
    conexion.query(query, paquete, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se inserto correctamente el paquete')

    })
})

//End point para actualizar un paquete
app.patch('/paquetes/:id',(req, res) =>{
    const { id } = req.params
    const paquete = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        dia: req.body.dia,
        noche: req.body.noche,
        hotel: req.body.hotel,
        restaurante: req.body.restaurante,
        experiencia: req.body.experiencia,
        actividad: req.body.actividad,
        costo: req.body.costo,
        alt_img: req.body.alt_img
    }
    const query = `UPDATE paquetes SET 
    nombre='${paquete.nombre}',
    descripcion='${paquete.descripcion}',
    dia='${paquete.dia}',
    noche='${paquete.noche}',
    hotel='${paquete.hotel}',
    restaurante='${paquete.restaurante}',
    experiencia='${paquete.experiencia}',
    actividad='${paquete.actividad}',
    costo='${paquete.costo}',
    alt_img='${paquete.alt_img}' WHERE id=${id}`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se actualizó correctamente el paquete')
        console.log(resultado)
    })  
})

//End point para borrar un paquete por id
app.delete('/paquetes/:id',(req, res) => {
    const { id } = req.params

    const query = `DELETE FROM paquetes WHERE id=${id}`
    conexion.query(query, (error, resultado) =>{
        if(error) return console.error(error.message)
        
        res.json('Se eliminó correctamente la paquete')
        console.log(res)
        
    })
})

//--------------- Registro --------------------------
app.post('/registro', (req, res) => {
    const{ usuario,email,pass } = req.body
    const passEncriptada = md5(pass)

    const query = `INSERT INTO usuarios (usuario,email,pass) VALUES ('${usuario}', '${email}', '${passEncriptada}')`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)
            else
            res.json('Se registro correctamente')
    })

});

//--------------Login-----------------
app.post('/login', (req, res) => {
    const{ usuario, pass } = req.body
    const query = `Select * from usuarios where usuario='${usuario}'`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)
        if(resultado.length > 0){
            console.log(usuario)
            const passEncriptada = md5(pass)
            if(passEncriptada === resultado[0].pass){
                //token
                const payload = {
                    usuario: resultado[0].usuario,
                    email: resultado[0].email
                }
                //firmar el token
                const token = jwt.sign(payload, 'hola')
                res.json({autenticado:true, token:token})

            }else{
                res.json({autenticado:false, token:null})
            }
        }else{
            res.json({autenticado:false, token:null})
        }
    })
});
