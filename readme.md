# S3Helper

Proyecto que busca ser un helper para subir y obtener url de un archivo hospedado en s3 de aws.

## 1 Instalación

Se requiere instalar el paquete en el proyecto

```
npm i s3-helper-felcadev
```

Luego se debere requerir el paquete y almacenarlo en una variable.
Posterior a eso se debe inicializar la variable con la configuración de aws.

* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY
* AWS_BUCKET_NAME

En el siguiente ejemplo se ilustra la configuración inicial, se esta ocupando variables de entorno para dicha configuración.

```javascript
const S3Helper = require('s3-helper-felcadev');

const s3Helper = new S3Helper(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY, process.env.AWS_BUCKET_NAME);
```

## 2 ¿Como utilizar?

Ya que se inicializo s3Helper se pueden ocupar los siguientes metodos

* upload(fileName, fileContent) = Método que permite subir un archivo a s3 en el buckect ingresado anteriormente, require de un nombre del archivo destino y este quedara en la raiz del bucket o se puede introducir el path+name para ingresarlo en un directorio dentro del bucket

* temporalUrl(fileName, signedUrlExpireSeconds?) = Método que permite retornar un string con la url del archivo, require del filename especificado al momento de guardar el arhivo y signedUrlExpireSeconds que por defecto es de 60 * 5 que equivale a 5 minutos.

### Ejemplo 

```javascript
s3Helper.upload('fileName', fileContent).then( url => {
    console.log(url);
}).catch(err => {
    console.log(err);
});

s3Helper.temporalUrl('fileName').then( url => {
    console.log(url);
}).catch(err => {
    console.log(err);
});
```

## 3 Construido con 🛠️

* [NodeJS](https://nodejs.org/en/) - Entorno de ejecución
* [npm](https://www.npmjs.com/) - Sistema de gestión de paquetes para nodejs.