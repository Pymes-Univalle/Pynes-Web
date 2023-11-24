    Manual Técnico 

 

Introducción: 

Este documento proporciona una guía exhaustiva para la instalación, y configuración. Así como información detallada sobre las interacciones internas, roles de integrantes, requisitos y más. 

 

Descripción del proyecto: 

 

El proyecto "PYMES" es una solución integral diseñada para optimizar la gestión de información y administración en organizaciones, enfocado en pequeñas y medianas empresas y asociaciones de productores. Este sistema, compuesto por una plataforma web y una aplicación móvil, ofrece la centralización de procesos clave. 

 

En la plataforma web, los usuarios pueden llevar a cabo la gestión de productores, productos, insumos y proveedores de manera eficiente. Además, el sistema permite el registro de la producción y ventas, proporcionando una visión completa de las operaciones. La parte móvil del proyecto se traduce en una tienda virtual exclusiva para cada organización, brindando a los clientes la oportunidad de explorar el catálogo de productos y realizar compras a través de la aplicación.  

 

Roles / integrantes

 

   Alicia Natalia Virreira Idina (Team Leader / developer) 

   Alan Abdel Montaño Cruz (Integrador/ developer) 

   Cristian Jhoel Amaru Reyes (QA/ developer) 

   Eber Samuel Araoz Melendrez (BD architect /developer) 

 

Arquitectura del software 

 

Arquitectura: 

 ![Captura de pantalla 2023-11-24 113902](https://github.com/Pymes-Univalle/Pynes-Web/assets/90225797/7ddfc883-23d3-4212-9279-13a9aad5ff49)


 

Componentes Principales: 

Aplicación Web (Next.js) 

Aplicación Móvil (React Native) 

Base de Datos (MySQL) 

API (Prisma) 

 

Interacciones entre Componentes: 

La Aplicación Web y la Aplicación Móvil se comunican con la API para realizar operaciones en la base de datos. 

La API utiliza el estructurado de Prisma para interactuar con la base de datos y gestionar las solicitudes provenientes de las aplicaciones cliente. 

Ambas aplicaciones comparten la misma base de datos, asegurando la coherencia y flujo de los datos en todo el sistema. 

 

Requisitos del sistema 

Requerimientos de Hardware (mínimo): (cliente) 

 - Una computadora con conexión a internet para poder usar el sistema 

Requerimientos de Software: (cliente) 

 - Sacar repositorios de Github y seguir al pie de la letra los pasos requeridos 	para el sistema web y movil 

Requerimientos de Hardware (server/ hosting/BD) 

 - Tener servicio de MySQL 

Requerimientos de Software (server/ hosting/BD) 

 - Asegurarse de tener el archivo dockerfile_mysql 

 

Instalación, configuración y procedimiento de hosteado: 

 

Aplicación Web 

Ambiente de dockerización de la App Web: contiene dos contenedores 	(Para la parte web y la base de datos MySQL) 

 

Paso 1: Contar con una conexión wifi/Ethernet 

 

Paso 2: Descargar el repositorio con el comando: 

git clone https://github.com/Pymes-Univalle/Pynes-Web.git 

 

Paso 3: Para realizar el deployment utilizar el comando:  

      docker-compose up –d 

#Al realizar este comando se crearán automáticamente los contenedores de la base de datos y la aplicación web que ya está conectadas y se comunican mediante el api que esta almacenada en la aplicación web. También se creará una imagen de docker llamada “pynes-web_app” la cual ya tiene los contenedores de la base de datos y el proyecto web. Esta imagen es la que se debe de hostear.	 

 

Paso 4: Ingresar a http://localhost:5000 para poder acceder a la app web. 

 

Problemas menores: 

En caso de encontrar problemas con las imágenes o querer modificar la aplicación, reinicie el contenedor con las imagenes con los siguientes comandos: 

      docker-compose down –volumes –rmi all 
Y luego el para volver a crear la imagen:

      docker-compose up -d 

 

En case de ver la barra de navegación en vez del Login, solo proceda a cerrar la aplicación haciendo click en el icono de usuario y seleccionando “cerrar sesion”. Despues de esto, deberia visualizarse el “Login” (Problema extraño con docker) 

 

Usuarios de prueba: 

   Administrador:  
   
   Gmail: prueba@gmail.com 
   
   Contraseña: 123456 
   
   Organización: 
   
   Gmail: samuelaraoz789@gmail.com 
   
   Contraseña: 123456 
   
   Productor: 
   
   Gmail: correo@ejemplo.com 
   
   Contraseña: 12345678 

 

Aplicación Móvil 

 

Vinculación de Móvil con la Imagen de Docker para la API 

 

Paso 1: Descargar el repositorio con ‘git clone https://github.com/Pymes-		Univalle/Pymes-AppMobile.git’ y tener la pp “Expo Go” en el 		móvil 

 

Paso 2: Contar con una conexión wifi/Ethernet entre ambos dispositivos 	ordenador/móvil 

 

Paso 3: Configurar las variables del .env en el proyecto movil 

		EXPO_PUBLIC_IP=”IP de la red wifi o ethernet” 

EXPO_PUBLIC_PORT=”Puerto en el que funciona el Docker” 

 

Paso 4: Correr “npm i" en el proyecto - instalando modulos 

 

Paso 5: Correr “npx expo start” iniciar el proyecto 

 

Paso 6: Leer el QR con Expo Go en Android o usando la camara en IOS 

 

 

GIT 

Proyecto Web:  

Repositorio: Pynes-Web 

Rama: main 

Proyecto Móvil: 

Repositorio: Pymes-AppMobile 

Rama: main 

 

Personalización y configuración 

	Moficación de la app para que pertenezca a una organización 

	 

Paso 1: Configurar el id de la organización en el .env del proyecto movil 

EXPO_PUBLIC_ORGANIZATION_ID=”ID de la organización a la que queremos que pertenezca la app móvil - Podemos bucarlo en la base de datos MySql y asegurarnos de que esta exista” 

 

	Obtener id de una organización 

 

Paso 1: Abrir MySql Workbecnh 

 
![Captura de pantalla 2023-11-24 113948](https://github.com/Pymes-Univalle/Pynes-Web/assets/90225797/654bca05-0864-4345-88eb-48a0b687f954)

Paso 2: Crear una conexión con la base en Docker 

![Captura de pantalla 2023-11-24 114142](https://github.com/Pymes-Univalle/Pynes-Web/assets/90225797/8017a68c-46a0-4426-bea2-b27f60ec8a75)


Paso 3: Conectar a la base con 

	 

Paso 4: Ingresar la contraseña “univalle” y realizar la conexión 

 

Paso 5: Realizamos un select de la tabla organización en la base de datos “pymes” 		y seleccionamos el id de la organización que queremos 

 

Creación de cuenta y configuración de Cloudinary  

Paso 1: 

Para poder subir imágenes desde la app web, se necesitará una cuenta de google la cual ya fue creada por el equipo siendo lo siguiente: 

correo: admid991@gmail.com  

contraseña: Admin123_ 

Esta cuenta ya está registrada y configurada para el uso de cloudinary , los cambios a realizar en la app web serían los siguientes: 

Dirigirse a la carpeta:   app/api/producto/route.ts 

Y ahí el linea de código 111 encontrara una dirección url del api debe remplazarla por la siguiente: 
 ‘https://api.cloudinary.com/v1_1/dx3ex26da/image/upload’ 

EL siguiente cambio se realizaría en: app/api/producto/[id]/route.ts 
 y en la línea de código 119 de la misma manera remplazar por  
‘https://api.cloudinary.com/v1_1/dx3ex26da/image/upload’ 

Paso 2: 

De no funcionar el paso 1, se crear una cuenta en cloudinary y realizar la siguiente configuración 

 ![Captura de pantalla 2023-11-24 114234](https://github.com/Pymes-Univalle/Pynes-Web/assets/90225797/2c02f96d-5de3-4a26-b506-ad93c80d6a24)

Dirigir se al icono de ajustes 

![Imagen1](https://github.com/Pymes-Univalle/Pynes-Web/assets/113220241/734a6edb-5e6e-4c68-9ee7-1046be476e90)

Luego a upload 
 
![Imagen1](https://github.com/Pymes-Univalle/Pynes-Web/assets/113220241/b47bccf3-1622-4dc3-9e1d-0bbce305d098)

Luego a Add upload preset 

![Imagen1](https://github.com/Pymes-Univalle/Pynes-Web/assets/113220241/36c9881b-1be5-46f7-bb87-6a2f8dc688d6)

Cambiar el Upload preset_name por test_pymes 

 ![Imagen1](https://github.com/Pymes-Univalle/Pynes-Web/assets/113220241/7de2fe50-f62b-4c16-b5e6-3b6642014925)


Abajo en Signing Mode: cámbialo a Unsigned click en el botón Save de arriba de color naranja 

 ![Imagen1](https://github.com/Pymes-Univalle/Pynes-Web/assets/113220241/59f08615-9cc6-4c6c-bb17-3bd333e4b506)


Ahora en la ventana anterior en la parte de Upload presets: debería aparecerle uno con el nombre de test_pymes , en mode Unsigned. 
 
 ![Imagen1](https://github.com/Pymes-Univalle/Pynes-Web/assets/113220241/92146781-ae0b-4f15-8e70-53590e1df4f5)

Una vez acabado de configurar el entorno, ahora diríjase a la ventana principal, haga click en el botón de abajo del icono de la nube del lado de la esquina superior izquierda, luego diríjase a dashboard, luego a More info de Api Environment variable 

 ![Imagen1](https://github.com/Pymes-Univalle/Pynes-Web/assets/113220241/b02f2bb0-3b22-495f-8190-dfe0acc72531)

Luego copie el cuarto link 

Y lo que copie en este ejemplo es  

https://api.cloudinary.com/v1_1/dx3ex26da  

Debe aumentar las siguientes palabras 

/ image/upload 

Quedando un link de la siguiente manera 
 
https://api.cloudinary.com/v1_1/dx3ex26da/image/upload 

Luego esto remplazarlo en el paso 1 indicado anteriormente 

 

Seguridad 

 

Gestión de accesos y permisos: 

En la plataforma web, se gestionan diferentes niveles de acceso y permisos mediante roles específicos. El rol de administrador tiene la capacidad de administrar organizaciones, mientras que las organizaciones pueden gestionar sus proveedores y estos, a su vez, administran sus propios productos. Cada usuario accede a sus respectivas configuraciones según el rol asignado al momento del inicio de sesión. En la aplicación móvil, los clientes tienen acceso únicamente a los productos de la organización a la que pertenece la app. 

 

Autenticación del sistema: 

El sistema utiliza un método de autenticación basado en cookies generadas por la API al momento del inicio de sesión. Esto permite una identificación segura y el acceso a las funciones correspondientes según el rol del usuario. 

 

Protección de datos y cifrado: 

Los datos sensibles en la base de datos están protegidos con el algoritmo de hash MD5. Sin embargo, es importante señalar que MD5, aunque útil para verificar la integridad de los datos, no es el método más seguro para proteger información confidencial debido a sus vulnerabilidades conocidas. Se están considerando medidas adicionales para mejorar la seguridad de los datos almacenados. 

 

Depuración y solución de problemas: Instrucciones sobre cómo identificar y solucionar problemas comunes, mensajes de error y posibles conflictos con otros sistemas o componentes. 

 

	Posibles conflictos con mapa de Google maps , para que funcione correctamente 	bien, se debe volver a cargar la página desde el login. 

	Los mensajes de error son visibles desde la consola de visual code , o la consola 	de Google accediendo apretando F12. 

	 

 

Glosario de términos 

 

Algoritmo de hash: Un algoritmo que toma datos de entrada y produce una cadena de caracteres (hash) de longitud fija, utilizada principalmente para verificar la integridad de datos. 

MD5: Un algoritmo de hash criptográfico que produce un hash de 128 bits, a menudo utilizado para verificar la integridad de archivos, pero no se recomienda para almacenar contraseñas debido a vulnerabilidades conocidas. 

API (Interfaz de Programación de Aplicaciones): Conjunto de reglas y protocolos que permiten a diferentes sistemas de software comunicarse entre sí. 

Prisma: Una herramienta ORM (Mapeo Objeto-Relacional) que simplifica y facilita la interacción con bases de datos en aplicaciones web, proporcionando una capa de abstracción para la gestión de datos. 

Cookies: Pequeños archivos de texto almacenados en el dispositivo del usuario que contienen información sobre la interacción con sitios web y se utilizan para autenticación y seguimiento. 

Autenticación de dos factores (2FA): Método de seguridad que requiere dos formas diferentes de identificación para acceder a una cuenta, generalmente una contraseña y un código único enviado al dispositivo del usuario. 

Cifrado de extremo a extremo: Proceso de encriptación que protege los datos mientras se transmiten desde el remitente hasta el destinatario, asegurando que solo los extremos puedan descifrar la información. 

 

 

Referencias y recursos adicionales 

 

	Documentacion: 

Next.Js : Docs | Next.js (nextjs.org) 

Prisma: Prisma Documentation | Concepts, Guides, and Reference 

Deploy - Docker : Building Your Application: Deploying | Next.js (nextjs.org) 

	 

	Turoriales: 

Cloudinary https://youtu.be/_Xkdn1QpPG0 

Prisma: https://youtu.be/5k7ZGhL3pI0 , https://youtu.be/dNRCqYeirks 

 

Herramientas de Implementación 

 

Lenguajes de programación: Typescript 

Base de datos: MySQL 

Frameworks:  

Web: Next 

Movil: React Native Expo 

APIs de terceros, etc:  

API: Prisma 

Almacenamiento de imágenes: Cloudinary 

Mapa: Api Google Maps 
