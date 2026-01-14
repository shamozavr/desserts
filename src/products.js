import { getItems, getItem } from './api.js'
import { addCartItem } from './cart.js';

const productList = document.querySelector('.product-list')

// eslint-disable-next-line no-unused-vars
const getProducts = (async () => {
  const resp = await getItems('/api/products');
  if (Array.isArray(resp) && resp.length > 0) {
    renderProducts(resp)
  } else {
    alert(resp)
  }
})();


const renderProducts = async (products) => {

  const productMarkup = products.map(
    (product) => `
        <div class="product">
            <picture>
            <source type="image/webp" srcset="${product.image.desktop}" media="(min-width: 1240px)">
            <source type="image/webp" srcset="${product.image.tablet}" media="(min-width: 768px)">
            <source type="image/webp" srcset="${product.image.mobile}" media="(min-width: 320px)">
            <source type="image/webp" srcset="${product.image.thumbnail}" media="(min-width: 0px)">
            <img src="${product.image.desktop}" alt="">
          </picture>
          <h2>${product.name}</h2>
          <span><i>Category:</i> ${product.category}</span>
          <p>$${product.price}</p>
          <button data-id="${product.id}" class="add-to-cart">
            <img src="./src/assets/icons/icon-add-to-cart.svg">
            <span>Add to cart</span>
          </button>
        </div>
      `
  )
  productList.insertAdjacentHTML('beforeend', productMarkup.join(''))
};

const prepareProduct = async (e) => {
  if (e.target.matches('.add-to-cart, .add-to-cart *')) {
    const id = e.target.closest('.product').querySelector('button').dataset.id;

    const resp = await getItem(`/api/products/${id}`, async (resp) => {
      if (!resp.ok) {
        throw new Error('Ошибка получения данных');
      }
      const data = await resp.json();
      return data;
    });

    if (resp instanceof Object) {
      return resp;
    } else {
      alert(resp);
      return false;
    }
  }
}

productList.addEventListener('click', async (e) => {
  const resp = await prepareProduct(e);
  if (resp) {
    const product = resp;
    addCartItem(product);
  }
});