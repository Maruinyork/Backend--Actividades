# Lista de comandos utilizados

- Crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

```console
use ecommerce;
```

```console
db.createCollection('productos');
db.createCollection('carritos');
```
[![collections.jpg](https://i.postimg.cc/DZZ2pjHC/collections.jpg)](https://postimg.cc/LqcKnTHf)


- Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. 

```console
db.productos.insertMany([ 
    { 
        "timestamp": ISODate(), 
        "title": "SAUVAGE", 
        "price": 120, 
        "description":"EDT Dior Sauvage x 100 ml", 
        "code": "COD1212", 
        "image": "https://getthelookar.vteximg.com.br/arquivos/ids/158911-600-600/200577_eau-de-toilette-dior-sauvage-x-100-ml_imagen-1.jpg", 
        "stock": 10 
    }, 
    { 
        "timestamp": ISODate(), 
        "title": "MISS DIOR", 
        "price": 580, 
        "description":"Eau de Parfum Dior Miss Dior Absolutely Blooming x 50 ml", 
        "code": "COD1010", 
        "image": "https://getthelookar.vteximg.com.br/arquivos/ids/160601-600-600/216916_eau-de-parfum-dior-miss-dior-absolutely-blooming-x-50-ml_imagen-1.jpg", 
        "stock": 20 
    }, 
    { 
        "timestamp": ISODate(), 
        "title": "J'ADORE", 
        "price": 900, 
        "description":"EDP Dior J'adore Infinissime x 100 ml", 
        "code": "COD1210", 
        "image": "https://perfugroupar.vtexassets.com/arquivos/ids/158251-300-300?v=637681173850300000&width=300&height=300&aspect=true", 
        "stock": 30 
    }, 
    { 
        "timestamp": ISODate(), 
        "title": "DIOR HOMME", 
        "price": 1280, 
        "description":"EDT Dior Homme Sport x 75 ml", 
        "code": "COD1215", 
        "image": "https://getthelookar.vteximg.com.br/arquivos/ids/160934-600-600/200578_eau-de-toilette-dior-homme-sport-x-75-ml_imagen-1.jp", 
        "stock": 40 
    }, 
    { 
        "timestamp": ISODate(), 
        "title": "POISON GIRL", 
        "price": 1700, 
        "description":"Eau de Parfum Dior Poison Girl x 30 ml", 
        "code": "COD1216", 
        "image": "https://getthelookar.vteximg.com.br/arquivos/ids/160989-600-600/209991_eau-de-parfum-dior-poison-girl-x-30-ml_imagen-1.jpg", 
        "stock": 50 
    }, 
    { 
        "timestamp": ISODate(), 
        "title": "CALVIN KLEIN", 
        "price": 2300, 
        "description":"EDT Calvin Klein Everyone Unisex x 100 ml", 
        "code": "COD1217", 
        "image": "https://getthelookar.vteximg.com.br/arquivos/ids/160605-600-600/216926_eau-de-toilette-calvin-klein-everyone-unisex-x-100-ml_imagen-1.jpg", 
        "stock": 60 
    }, 
    { 
        "timestamp": ISODate(), 
        "title": "KENZO", 
        "price": 2860, 
        "description":"EDT Kenzo By Flower x 30 ml", 
        "code": "XP-7", 
        "image": "https://getthelookar.vteximg.com.br/arquivos/ids/164585-600-600/223425_eau-de-toilette-kenzo-by-flower-x-30-ml_imagen-1.jpg?v=637638709260400000", 
        "stock": 25 
    }, 
    { 
        "timestamp": ISODate(), 
        "title": "NINA RICCI", 
        "price": 3350, 
        "description":"EDT Nina Ricci Fleur Re x 80 ml", 
        "code": "XP-8", 
        "image": "https://getthelookar.vteximg.com.br/arquivos/ids/169690-600-600/229738_edt-nina-ricci-fleur-re-x-80-ml_imagen-1.jpg?v=637986047513800000", 
        "stock": 8 
    }, 
    { 
        "timestamp": ISODate(), 
        "title": "GIVENCHY", 
        "price": 4990, 
        "description":"EDT Givenchy L'Interdit x 35 ml", 
        "code": "XP-9", 
        "image": "https://getthelookar.vteximg.com.br/arquivos/ids/170004-600-600/229912_edt-givenchy-linterdit-x-35-ml_imagen-1.jpg?v=637993856966170000", 
        "stock": 9 
    }, 
    { 
        "timestamp": ISODate(), 
        "title": "MARC JACOBS", 
        "price": 4320, 
        "description":"EDT Marc Jacobs Daisy x 50 ml", 
        "code": "XP-10", 
        "image": "https://getthelookar.vteximg.com.br/arquivos/ids/166309-600-600/225393_edt-marc-jacobs-daisy-x-50-ml_imagen-1.jpg?v=637741310020400000", 
        "stock": 100 
    } 
]); 
```


- Insertar algo en el carrito

```console
db.carritos.insertMany([{timestamp: ISODate()}, {timestamp: ISODate()}])
```

- Listar todos los documentos en cada colección

```console
db.productos.find();
```


- Mostrar la cantidad de documentos almacenados en cada una de ellas.

```console
db.productos.countDocuments();
```


- Agregar otro producto más a *productos*

```console
db.productos.insertOne({
        "timestamp": ISODate(),
        "title": "CAROLINA HERRERA",
        "price": 5000,
        "description":"EDT Carolina Herrera CH x 50 ml1",
        "code": "XP-11",
        "image": "https://getthelookar.vteximg.com.br/arquivos/ids/155988-600-600/139567_eau-de-toilette-ch-x-50-ml_imagen-1.jpg",
        "stock": 11
    });
```

- Listar los productos con precio menor a 1000 pesos:

```console
db.productos.find({price: {$lt: 1000}});
```
[![menora1000.jpg](https://i.postimg.cc/LsDtBwBn/menora1000.jpg)](https://postimg.cc/cKKtdDzS)


- Listar los productos con precio entre los 1000 a 3000 pesos.

```console
db.productos.find ({price: {$gt: 1000, $lt: 3000 }});
```
[![entre1000y3000.jpg](https://i.postimg.cc/1X2cVF0B/entre1000y3000.jpg)](https://postimg.cc/H807fVh8)


- Listar los productos con precio mayor a 3000 pesos.

```console
db.productos.find({price: {$gt: 3000}});
```
[![mayora3000.jpg](https://i.postimg.cc/FFBx6ttS/mayora3000.jpg)](https://postimg.cc/8sLWF0zk)


- Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

```console
db.productos.find({},{title:1, _id:0}).sort({price:1}).skip(2).limit(1);
```


- Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100

```console
db.productos.updateMany({}, {$inc: {stock: 100}});
```


- Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 

```console
db.productos.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}});
```
[![stocka0.jpg](https://i.postimg.cc/q71KCn4K/stocka0.jpg)](https://postimg.cc/jWJ2pDWq)



- Borrar los productos con precio menor a 1000 pesos 

```console
db.productos.deleteMany({price: {$lt: 1000}});
```


- Crear un usuario **pepe**, con contraseña: **asd456**. Permiso solo de lectura
  
```console
db.createUser({user: "pepe", pwd: "asd456", roles: [{role: "read", db: "ecommerce"}]});
```
resp: { ok: 1 }

- Muestro los usuarios creados, uno en admin y el otro en la db ecommerce

```console
show users

[ { _id: 'ecommerce.pepe',
    userId: UUID("218fa314-d9df-4663-8661-c650c556704c"),
    user: 'pepe',
    db: 'ecommerce',
    roles: [ { role: 'read', db: 'ecommerce' } ],
    mechanisms: [ 'SCRAM-SHA-1', 'SCRAM-SHA-256' ] } ]


[ { _id: 'admin.pepeadmin',
    userId: UUID("cde6d309-6e3e-43c8-8764-d0b9358f83c6"),
    user: 'pepeadmin',
    db: 'admin',
    roles: [ { role: 'read', db: 'ecommerce' } ],
    mechanisms: [ 'SCRAM-SHA-1', 'SCRAM-SHA-256' ] } ]
```

[![pepelogin.jpg](https://i.postimg.cc/pVG0thjp/pepelogin.jpg)](https://postimg.cc/5jz5BtnV)

user: pepe no puede acceder desde la consola como admin, la autenticacion es fallida. 
user: pepeadmin puede ingresar desde la consola

