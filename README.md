=== Fake API Rest

== A quoi, cela sert-il ?

Elle permet de rapidement avoir une API Rest pour la coneption de vos conceptions Front-end 

== Utilisation par la commande :

node server.js

== Visualisation de l'exmple sur l'adresse suivante : http://localhost:3001/

En mode de développement :

Décommenter les lignes :

//const cors = require('cors')
//app.use(cors())


Source : 

/// 
const express = require('express')
const app = express()
const port = 3001

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())

/// Décommenter pour un accès non limité à l'api
//const cors = require('cors')
//app.use(cors())

app.use(express.static('./dist')) // Répertoire des sources compilées

/// Déclaration de la fake Rest API
const {fakerQuery} = require('./controllers/fakerQuery')

const products = new fakerQuery({
    data:[				// Données par défaut 
        { id:1,nom:'Chat 1', prix:'250', description:'desc1', image:'https://loremflickr.com/360/200' },
        { id:2,nom:'Chat 2', prix:'150', description:'desc2', image:'https://loremflickr.com/360/200' },
        { id:3,nom:'Chat 3', prix:'350', description:'desc3', image:'https://loremflickr.com/360/200' },
        { id:4,nom:'Chat 4', prix:'450', description:'desc4', image:'https://loremflickr.com/360/200' },
        { id:5,nom:'Chat 5', prix:'500', description:'desc5', image:'https://loremflickr.com/360/200' },
        { id:6,nom:'Chat 6', prix:'750', description:'desc6', image:'https://loremflickr.com/360/200' },
        { id:7,nom:'Chat 7', prix:'1250',description:'desc7', image:'https://loremflickr.com/360/200' }
    ],
    struct:{ id:'integer', nom:'string', prix:'integer', description:'string', image:'string' } // Structure de donnée
})

/// ---- Délacaration des REST API ----
app.get('/api/products',(req,res)=>{ products.restApiGet(req,res) })
app.get('/api/products/:id',(req,res)=>{ products.restApiGetId(req,res) })
app.post('/api/products',(req,res)=>{ products.restApiPost(req,res) })
app.put('/api/products',(req,res)=>{ products.restApiPut(req,res) })
app.delete('/api/products/:id',(req,res)=>{ products.restApiDelete(req,res) })
/// ---- Fin de déclaration ----

//// Lancement du serveur
app.listen(port,()=>{ console.log('Server Web Running') })