/** @format */

/* const MAX_DATOS = 5;
let usuarios = [];
let cantidadUsuarios = 0;
let carrito = [];
const productosCosmeticos = [
	{ nombre: "Crema Facial", precio: 10 },
	{ nombre: "Shampoo", precio: 8 },
	{ nombre: "Perfume", precio: 25 },
];
const productosAlimenticios = [
	{ nombre: "Pan", precio: 2 },
	{ nombre: "Leche", precio: 1.5 },
	{ nombre: "Queso", precio: 5 },
];

function registrarUsuario() {
	if (cantidadUsuarios >= MAX_DATOS) {
		console.log("No se pueden registrar más usuarios ⚠️");
		return;
	}

	let nombre, apellido, edad;

	do {
		nombre = prompt("Ingrese su nombre:");
	} while (!nombre.trim());

	do {
		apellido = prompt("Ingrese su apellido:");
	} while (!apellido.trim());

	do {
		edad = prompt("Ingrese su edad:");
		if (!isNaN(edad) && parseInt(edad) > 0) {
			edad = parseInt(edad);
		} else {
			alert("La edad ingresada no es válida.");
		}
	} while (isNaN(edad) || parseInt(edad) <= 0);

	if (edad < 18) {
		alert(
			"Eres menor de edad y no podrás realizar compras. Solo quedas registrado."
		);
		usuarios.push({ nombre, apellido, edad });
		cantidadUsuarios++;
		console.log("Usuario menor de edad registrado correctamente ✅");
		return;
	}

	usuarios.push({ nombre, apellido, edad });
	cantidadUsuarios++;
	console.log("Usuario registrado correctamente ✅");
}

function verUsuariosRegistrados() {
	if (cantidadUsuarios === 0) {
		console.log("No hay usuarios registrados 🤷‍♂️");
		return;
	}

	usuarios.forEach((usuario, index) => {
		console.log(`Usuario ${index + 1}:`);
		console.log(`Nombre: ${usuario.nombre}`);
		console.log(`Apellido: ${usuario.apellido}`);
		console.log(`Edad: ${usuario.edad}`);
	});
}

function resetearUsuarios() {
	usuarios = [];
	cantidadUsuarios = 0;
	console.log("Registros reiniciados 🔄");
}

function agregarAlCarrito() {
	let opcionCategoria;
	do {
		opcionCategoria = prompt(
			`Submenú: 
1. Productos Cosméticos
2. Productos Alimenticios
3. Volver al Menú Principal
`
		);

		switch (opcionCategoria) {
			case "1":
				seleccionarProducto(productosCosmeticos, "Cosméticos");
				break;
			case "2":
				seleccionarProducto(productosAlimenticios, "Alimenticios");
				break;
			case "3":
				console.log("Volviendo al menú principal...");
				break;
			default:
				console.log("Opción inválida ❌");
		}
	} while (opcionCategoria !== "3");
}

function seleccionarProducto(productos, categoria) {
	let listaProductos = `Productos ${categoria}:`;
	productos.forEach((producto, index) => {
		listaProductos += `
${index + 1}. ${producto.nombre}= $${producto.precio}`;
	});
	listaProductos += `
${productos.length + 1}. Volver`;

	let opcionProducto;
	do {
		opcionProducto = parseInt(prompt(listaProductos));
		if (opcionProducto >= 1 && opcionProducto <= productos.length) {
			const productoSeleccionado = productos[opcionProducto - 1];
			carrito.push(productoSeleccionado);
			alert(`Agregaste "${productoSeleccionado.nombre}" al carrito.`);
			console.log(
				`Producto agregado: ${productoSeleccionado.nombre} - $${productoSeleccionado.precio}`
			);
		} else if (opcionProducto === productos.length + 1) {
			console.log("Volviendo al submenú...");
		} else {
			console.log("Opción inválida ❌");
		}
	} while (opcionProducto !== productos.length + 1);
}

function verCarrito() {
	if (carrito.length === 0) {
		console.log("El carrito está vacío 🛒");
		return;
	}

	console.log("Productos en el carrito:");
	carrito.forEach((producto, index) => {
		console.log(`${index + 1}. ${producto.nombre} = $${producto.precio}`);
	});

	const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);
	console.log(`Total: $${total.toFixed(2)}`);
}

function menu() {
	let opcion;
	do {
		opcion = prompt(
			`
Simulador de Compras y Registro:

Este simulador permite registrar usuarios y calcular el total de 
compras interactuando desde la Consola JS.

Menú: 
1. Registrarse 
2. Ver usuarios registrados 
3. Agregar productos al carrito 
4. Ver carrito 
5. Resetear datos 
6. Salir
`
		);

		switch (opcion) {
			case "1":
				registrarUsuario();
				break;
			case "2":
				verUsuariosRegistrados();
				break;
			case "3":
				agregarAlCarrito();
				break;
			case "4":
				verCarrito();
				break;
			case "5":
				resetearUsuarios();
				break;
			case "6":
				console.log("¡Hasta luego! 👋");
				break;
			default:
				console.log("Opción inválida ❌");
		}
	} while (opcion !== "6");
}

menu();
 */

// Definición de variables
// Variables globales
const MAX_DATOS = 5;
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Listado de productos
const productos = {
	cosmeticos: [
		{ nombre: "Crema Facial", precio: 10 },
		{ nombre: "Shampoo", precio: 8 },
		{ nombre: "Perfume", precio: 25 },
		{ nombre: "Jabón exfoliante", precio: 7 },
		{ nombre: "Protector solar SPF 50", precio: 18 },
	],
	alimenticios: [
		{ nombre: "Pan", precio: 2 },
		{ nombre: "Leche", precio: 1.5 },
		{ nombre: "Café molido", precio: 6 },
		{ nombre: "Aceite de oliva", precio: 10 },
		{ nombre: "Chocolate negro", precio: 8 },
	],
	electronica: [
		{ nombre: "Auriculares inalámbricos", precio: 45 },
		{ nombre: "Cargador portátil", precio: 30 },
		{ nombre: "Teclado mecánico", precio: 70 },
	],
	deportes: [
		{ nombre: "Mancuernas ajustables", precio: 50 },
		{ nombre: "Banda elástica", precio: 10 },
		{ nombre: "Botella térmica", precio: 20 },
	],
	hogar: [
		{ nombre: "Set de velas aromáticas", precio: 15 },
		{ nombre: "Planta decorativa", precio: 18 },
	],
};

// **Registro de usuarios**
function registrarUsuario() {
	if (usuarios.length >= MAX_DATOS) {
		alert("No se pueden registrar más usuarios ⚠️");
		return;
	}

	let nombre = document.getElementById("nombre").value.trim();
	let apellido = document.getElementById("apellido").value.trim();
	let edad = parseInt(document.getElementById("edad").value);

	if (!nombre || !apellido || isNaN(edad) || edad <= 0) {
		alert("Datos inválidos. Verifica la información ingresada.");
		return;
	}

	usuarios.push({ nombre, apellido, edad });
	localStorage.setItem("usuarios", JSON.stringify(usuarios));
	alert("Usuario registrado correctamente ✅");
	mostrarUsuarios();
}

// **Mostrar usuarios**
function mostrarUsuarios() {
	let contenedor = document.getElementById("listaUsuarios");
	contenedor.innerHTML =
		usuarios.length === 0 ? "<p>No hay usuarios registrados 🤷‍♂️</p>" : "";
	usuarios.forEach((usuario, index) => {
		contenedor.innerHTML += `<p><strong>${index + 1}.</strong> ${
			usuario.nombre
		} ${usuario.apellido} - Edad: ${usuario.edad}</p>`;
	});
}

// **Agregar productos al carrito**
function agregarAlCarrito(nombre, precio) {
	carrito.push({ nombre, precio });
	localStorage.setItem("carrito", JSON.stringify(carrito));
	alert(`Agregaste "${nombre}" al carrito 🛒`);
	mostrarCarrito();
}

// **Mostrar carrito**
function mostrarCarrito() {
	let contenedor = document.getElementById("listaCarrito");
	contenedor.innerHTML =
		carrito.length === 0 ? "<p>El carrito está vacío 🛒</p>" : "";

	let total = 0;
	carrito.forEach((producto, index) => {
		contenedor.innerHTML += `<p>${index + 1}. ${producto.nombre} - $${
			producto.precio
		} <button onclick="eliminarProducto('${producto.nombre}')">❌</button></p>`;
		total += producto.precio;
	});

	contenedor.innerHTML += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
}

// **Eliminar producto específico del carrito**
function eliminarProducto(nombre) {
	carrito = carrito.filter((producto) => producto.nombre !== nombre);
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();
	alert(`Eliminaste "${nombre}" del carrito ❌`);
}

// **Resetear datos**
function resetearUsuarios() {
	usuarios = [];
	localStorage.removeItem("usuarios");
	mostrarUsuarios();
	alert("Registros reiniciados 🔄");
}

function resetearCarrito() {
	carrito = [];
	localStorage.removeItem("carrito");
	mostrarCarrito();
	alert("Carrito reiniciado 🔄");
}

// **Filtrado de productos**
function filtrarProductos(texto) {
	let resultado = Object.values(productos)
		.flat()
		.filter((producto) =>
			producto.nombre.toLowerCase().includes(texto.toLowerCase())
		);
	mostrarListaFiltrada(resultado);
}

function filtrarPorPrecio(min, max) {
	let resultado = Object.values(productos)
		.flat()
		.filter((producto) => producto.precio >= min && producto.precio <= max);
	mostrarListaFiltrada(resultado);
}

function mostrarListaFiltrada(lista) {
	let contenedor = document.getElementById("listaFiltrada");
	contenedor.innerHTML =
		lista.length === 0 ? "<p>No se encontraron productos ❌</p>" : "";
	lista.forEach((producto) => {
		contenedor.innerHTML += `<p>${producto.nombre} - $${producto.precio}</p>`;
	});
}

// **Confirmación de compra**
function confirmarCompra() {
	if (carrito.length === 0) {
		alert("El carrito está vacío, agrega productos antes de comprar. 🛒");
		return;
	}

	let total = carrito.reduce((suma, producto) => suma + producto.precio, 0);
	if (
		confirm(`Total de la compra: $${total.toFixed(2)}\n¿Confirmas la compra?`)
	) {
		carrito = [];
		localStorage.removeItem("carrito");
		mostrarCarrito();
		alert("¡Compra realizada con éxito! 🎉");
	}
}
