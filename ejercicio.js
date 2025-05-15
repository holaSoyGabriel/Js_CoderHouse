/** @format */

// Variables globales
const MAX_DATOS = 5;
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para generar saldo aleatorio entre $50 y $500
function generarSaldo() {
	return Math.floor(Math.random() * (500 - 50 + 1)) + 50;
}

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
		{ nombre: 'Monitor de 24"', precio: 150 },
	],
	deportes: [
		{ nombre: "Mancuernas ajustables", precio: 50 },
		{ nombre: "Banda elástica", precio: 10 },
		{ nombre: "Botella térmica", precio: 20 },
		{ nombre: "Bicicleta estática", precio: 200 },
	],
	hogar: [
		{ nombre: "Set de velas aromáticas", precio: 15 },
		{ nombre: "Almohada ergonómica", precio: 25 },
		{ nombre: "Planta decorativa", precio: 18 },
		{ nombre: "Estantería flotante", precio: 35 },
	],
};

// **Registro de usuarios con saldo aleatorio**
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

	let saldo = generarSaldo(); // Asignar saldo aleatorio

	let nuevoUsuario = { nombre, apellido, edad, saldo };
	usuarios.push(nuevoUsuario);
	localStorage.setItem("usuarios", JSON.stringify(usuarios));

	alert(`Usuario registrado correctamente ✅ Saldo asignado: $${saldo}`);
	mostrarUsuarios();
}

// **Mostrar usuarios con saldo**
function mostrarUsuarios() {
	let contenedor = document.getElementById("listaUsuarios");
	contenedor.innerHTML =
		usuarios.length === 0 ? "<p>No hay usuarios registrados 🤷‍♂️</p>" : "";

	usuarios.forEach((usuario, index) => {
		contenedor.innerHTML += `<p><strong>${index + 1}.</strong> ${
			usuario.nombre
		} ${usuario.apellido} - Edad: ${usuario.edad} - Saldo: <strong>$${
			usuario.saldo
		}</strong></p>`;
	});
}

// **Agregar productos al carrito**
function agregarAlCarrito(nombre, precio) {
	carrito.push({ nombre, precio });
	localStorage.setItem("carrito", JSON.stringify(carrito));
	verificarSaldo(); // Comprobamos el saldo después de agregar productos
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
	verificarSaldo();
}

// **Eliminar producto específico del carrito**
function eliminarProducto(nombre) {
	carrito = carrito.filter((producto) => producto.nombre !== nombre);
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();
	verificarSaldo();
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
	verificarSaldo();
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

// **Confirmación de compra con verificación de saldo**
function confirmarCompra() {
	if (carrito.length === 0) {
		alert("El carrito está vacío, agrega productos antes de comprar. 🛒");
		return;
	}

	let total = carrito.reduce((suma, producto) => suma + producto.precio, 0);
	let usuario = usuarios[usuarios.length - 1];

	if (total > usuario.saldo) {
		alert("❌ Saldo insuficiente. No puedes realizar esta compra.");
		return;
	}

	usuario.saldo -= total;
	localStorage.setItem("usuarios", JSON.stringify(usuarios));

	carrito = [];
	localStorage.removeItem("carrito");
	mostrarCarrito();
	mostrarUsuarios();
	alert("✅ Compra realizada con éxito!");
}

// **Verificar saldo y mostrar mensaje en el DOM**
function verificarSaldo() {
	let usuario = usuarios[usuarios.length - 1];
	let total = carrito.reduce((suma, producto) => suma + producto.precio, 0);
	let mensaje = document.getElementById("mensajeSaldo");

	if (total > usuario.saldo) {
		mensaje.innerHTML = `<p style="color:red;">❌ Saldo insuficiente: No puedes comprar. Tu saldo: $${usuario.saldo}</p>`;
	} else {
		mensaje.innerHTML = `<p style="color:green;">✅ Puedes comprar. Tu saldo: $${usuario.saldo}</p>`;
	}
}
