
import { promises as fs } from 'fs'
/*import crypto from "crypto";
console.log(crypto.randomBytes(5).toString("hex"));*/

//Funcion constructora
export class ProductManager  {
    constructor(path) { //Path como parametro para poderlo almacenar
        /* console.log('Nuevo objeto creado'); */
        this.path = path //La ruta donde van a estar alojado los elementos, Mi ruta va a ser ./products.json, cada vez que genere un nuevo productManager va a tranajar con esa ruta
    }


    //Consultar todos los productos
    async getProducts() {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        console.log(prods)
    }

    //Consultar un producto dado su Id
    async getProductById(id) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = prods.find(producto => producto.id === id)
        if (prod)
            console.log(prod)
        else
            console.log('Producto no existe')
    }

    //Funcion asincronica porque estamos utilizando Promises, esto seria Añadir un nuevo producto
    async addProduct(newProduct) { //Agregar producto me va a pedir como parametro un newProduct

        //Pregunto donde esta guardado mi Array de Productos
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8')) //Con esto voy a leer el array que esta alojado en la ruta que me enviaron, Por ejemplo: product.json 
        if (newProduct.code && newProduct.id && newProduct.title && newProduct.description && newProduct.price && newProduct.thumbnail && newProduct.code && newProduct.stock) {
        //Consultar si existe o no existe(Validaciones) 
        const indice = prods.findIndex(prod => prod.code === newProduct.code) //Buscame un producto cuyo => prods.code sea igual a lo que seria el code de el nuevo producto newProduct
        console.log(indice)
        if (indice === -1) { //Si el elemento no existe, osea es igual a -1

            prods.push(newProduct) //Lo agrego al array
            console.log(prods)
            await fs.writeFile(this.path, JSON.stringify(prods)) //await fs.writeFile de lo que seria este nuevo array con este nuevo producto, en esta locazion enviame este array (prods)
            console.log('Producto creado correctamente') //Y retorname lo que seria el mensaje

        } else { //Si no (si ya existe este producto)

            console.log('Producto ya existe en este array') // Retorname
        }
    } else {
        console.log('Debe ingresar un producto con todas las propiedades')
    }
}

//Actualizar producto
async updateProduct(id, nuevoProducto) {
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    const indice = prods.findIndex(producto => producto.id === id) //prods.findIndex = consulto por el indice
    if (indice != -1) { //Si el indice es Distinto de -1, el producto existe
        prods[indice].stock = nuevoProducto.stock
        prods[indice].price = nuevoProducto.price
        prods[indice].title = nuevoProducto.title
        prods[indice].thumbnail = nuevoProducto.thumbnail
        prods[indice].description = nuevoProducto.description
        prods[indice].code = nuevoProducto.code
        await fs.writeFile(this.path, JSON.stringify(prods))
        console.log('Producto actualizado correctamente')
    } else {
        console.log('Producto no existe')
    }


//Por ultimo eliminar
}    async deleteProduct(id) {
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    const indice = prods.findIndex(producto => producto.id === id)
    if (indice != -1) {
        const prodsFiltrados = prods.filter(prod => prod.id != id) //const prodsFiltrados va a ser = a prods.filter, filtrame x todos los productos cuyo ID sea distinto de el id ingresado
        await fs.writeFile(this.path, JSON.stringify(prodsFiltrados))
        console.log('Producto eliminado correctamente')
    } else {
        console.log('Producto no existe')
    }

}


}