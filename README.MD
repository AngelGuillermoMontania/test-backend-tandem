# ***Test de conocimientos Back-End, Base de datos -- Tándem Digital***

<br>

### La aplicacion fue creada con `Node`, `express`, `express-validator`, `JWT` y `mssql`. El objetivo de este test es evaluar la capacidad de la persona para diseñar y desarrollar una aplicación web completa utilizando Vue.js en el front-end, Node.js en el back-end y SQL Server como base de datos.

<br>

#### Repositorio front end: https://github.com/AngelGuillermoMontania/test-frontend-tandem

<br>
<br>

Como iniciar la app:

1. Descargar el proyecto
2. En la carpeta raiz encontraras un archivo/script `SQLQuery1.sql`, abrir SQL Management Studio y ejecutar el script en el servidor. Previamente se puede o no, crear la base de datos, la cual debe llamarse `tandem`
3. Agregar un archivo `.env` en la raiz del proyecto. Colocar estas variables de entorno, completando segun corresponda.
~~~
PORT = 3001
DB_USER = sa
DB_PASSWORD = admin
DB_SERVER= localhost
DB_NAME= tandem
DB_PORT=1433
JWT_SECRET="tandem"    
~~~

- PORT (Opcional, el puerto en el que se ejecutara el backend. Si no se coloca, lo hara en el puerto 3001)
- DB_USER (Obligatorio, usuario administrador de SQLServer para nuestra base de datos)
- DB_PASSWORD (Obligatorio, contraseña de el usuario administrador mencionado anteriormente)
- DB_SERVER (Opcional, para modo desarrollo colocar `localhost`. Si no se coloca esta variable, se iniciara en modo desarrollador con `localhost`)
- DB_NAME (Obligatorio, colocar el valor `tandem` si los pasos anteriores se siguieron y el script `SQLQuery1.sql` fue ejecutado correctamente)
- DB_PORT (Opcional, el puerto en el que se ejecuta nuestro SQLServer, por defecto si no colocamos esta variable, sera el puerto `1433`)
- JWT_SECRET(Obligatorio, texto que funcionara de `secret` para la correcta ejecucion de JWT)
4. Instalar las dependencias necesarias ejecutando el comando `npm install` en la raiz del proyecto.
5. Escribir el comando `npm run start:dev` en el directorio raiz para iniciar el proyecto en modo desarrollador
6. LISTO!

EN EL SCRIPT YA VIENE CONFIGURADO UN USUARIO CON USUARIO: admin CON CONTRASEÑA admin
