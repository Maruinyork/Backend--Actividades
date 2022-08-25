class Usuario {
  constructor(nombre, apellido, libros = [], mascotas = []) {
    this.nombre = nombre
    this.apellido = apellido
    this.libros = libros
    this.mascotas = mascotas
  }

  //Metodos//

  getFullName() {
    return `El nombre del usuario es ${this.nombre} ${this.apellido}`
  }
  addMascota(mascota) {
    this.mascotas.push(mascota)
  }
  countMascotas() {
    return `El usuario posee ${this.mascotas.length} mascotas`
  }
  addBook(nombre, autor) {
    this.libros.push({ nombre, autor })
  }
  getBookNames() {
    return this.libros.map((libro) => ` ${libro.nombre}, ${libro.autor}`)
  }
}

const usuario = new Usuario('Mariano', 'Moreno')
console.log(usuario.getFullName()) //Muestra el nombre y apellido

usuario.addBook('El principito', 'Antoine de Saint-Exupéry') //Agrego un libro

console.log(usuario.mascotas) //Verifico que no tenga ninguna mascota, se vera el array vacio
usuario.addMascota('Ayudante de Santa') //Le agrego una mascota
console.log(usuario.mascotas) // Observo que quedo agregada
usuario.addMascota('Bola de Nieve') //Le agrego otra mascota
console.log(usuario.mascotas) //Muestra los nombres de las mascotas
console.log(usuario.countMascotas()) //Muestra la cantidad de mascotas

console.log(usuario.getBookNames()) //Verifico cual es el nombre del libro ingresado en linea 31
console.log(usuario.libros) //Verifico que libros hay

/*-------Otro Usuario-------*/
const otroUsuario = new Usuario('Manuel', 'Belgrano', [], [])
console.log(otroUsuario.getFullName()) //Muestra el nombre y apellido
otroUsuario.addBook('El Señor de los Anillos', 'J.R.R Tolkien') //Agrego un libro
otroUsuario.addMascota('Garfield') //Le agrego una mascota
console.log(otroUsuario.countMascotas()) //Muestra la cantidad de mascotas
console.log(otroUsuario.getBookNames())
