let products = []
let total = 0

function add(product, price) {
  console.log(product, price)
  products.push(product)
  total = total + price
  document.getElementById('checkout').innerHTML = `A pagar $${total}`
}

function pay() {
  window.alert(products.join(', \n'))
}

//----

window.onload = async () => {
  const productList = await (await fetch('/api/productos')).json()
  console.log(productList)
  displayProducts(productList)
}

function displayProducts(productList) {
  let productsHTML = ''
  productList.forEach((element) => {
    productsHTML += `<div class="product-container">
          <h5>${element.title}</h5>
          <h6>${element.description}</h6>
          <img src="${element.thumbnail}" />
          <h2>$${element.price}</h2>
          <button class="button-add" onclick="add(${element.id}, ${element.price})"><i class="fa-solid fa-cart-plus"></i></button>
      </div>`
  })
  document.getElementById('page-content').innerHTML = productsHTML
}
