CREATE DATABASE nestordb;
SHOW DATABASES;
USE nestordb;

CREATE TABLE productos(
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(20) NOT NULL,
precio INT NOT NULL
);

INSERT INTO productos (nombre, precio) VALUES ("remera", 300);

SELECT * FROM productos;
SELECT nombre FROM productos;
SELECT * FROM productos WHERE precio>200;

UPDATE productos
SET precio=900
WHERE id=1;


DELETE FROM productos WHERE  id=3;