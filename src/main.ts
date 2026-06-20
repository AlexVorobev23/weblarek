import './scss/styles.scss';

import { apiProducts } from './utils/data';

import { CatalogModel } from './components/Models/CatalogModel';
import { BasketModel } from './components/Models/BasketModel';
import { CustomerModel } from './components/Models/CustomerModel';
import { WebLarekApi } from './components/Models/WebLarekApi';

import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';



console.log('Тестирование моделей');

console.log('Тестирование CatalogModel');
const catalogModel = new CatalogModel();

catalogModel.setItems(apiProducts.items);
console.log('setItems() - каталог сохранен');
console.log('getItems():', catalogModel.getItems());

const productById = catalogModel.getProductById('b06cde61-912f-4663-9751-09956c0eed67');
console.log('getProductById():', productById);

catalogModel.setPreview(productById || null);
console.log('setPreview() - товар установлен для просмотра');
console.log('getPreview():', catalogModel.getPreview());

console.log('Тестирование BasketModel');
const basketModel = new BasketModel();
const product1 = apiProducts.items[0];
const product2 = apiProducts.items[1];

basketModel.addItem(product1);
basketModel.addItem(product2);
console.log('addItem() x2 - добавлено 2 товара');
console.log('getItems():', basketModel.getItems());
console.log('getItemCount():', basketModel.getItemCount());
console.log('getTotalPrice():', basketModel.getTotalPrice());

basketModel.removeItem(product1.id);
console.log('removeItem() - удален товар');
console.log('getItemCount():', basketModel.getItemCount());
console.log('hasItem():', basketModel.hasItem(product2.id));

basketModel.clear();
console.log('clear() - корзина очищена');
console.log('getItems():', basketModel.getItems());

basketModel.addItem(product2);
console.log('addItem() - товар добавлен');
console.log('hasItem():', basketModel.hasItem(product2.id));

console.log('Тестирование CustomerModel');
const costomerModel = new CustomerModel();

console.log('validateFields() пустых полей:', costomerModel.validateFields());

costomerModel.setPayment('card');
costomerModel.setAddress('Санкт-Петербург');
costomerModel.setEmail('test@yandex.com');
costomerModel.setPhone('+7 (999) 000 00 00');
console.log('Данные заполнены:');
console.log('payment:', costomerModel.payment);
console.log('address:', costomerModel.address);
console.log('email:', costomerModel.email);
console.log('phone:', costomerModel.phone);

console.log('validateFields():', costomerModel.validateFields());
console.log('getCustomerData():', costomerModel.getCustomerData());

costomerModel.clear();
console.log('clear() - данные очищены');
console.log('getCustomerData():', costomerModel.getCustomerData());



console.log('Подключение к серверу');

const api = new Api(API_URL);
const webLarekApi = new WebLarekApi(api);
const serverCatalogModel = new CatalogModel();

console.log('Выполняется GET запрос к серверу /product...');
webLarekApi.getProducts()
.then(data => {
    console.log('Ответ от сервера получен:', data);
    serverCatalogModel.setItems(data.items);

    console.log('Массив товаров сохранен в CatalogModel');
    console.log('getItems():', serverCatalogModel.getItems());
    console.log('Количество товаров на сервере:', data.total);

    console.log('Товары из каталога сервера:');
    serverCatalogModel.getItems().forEach((product, index) => {
        console.log(`${index + 1}. ${product.title} - ${product.price ? product.price + '₽' : 'Нет цены'}`);
    });
})
.catch(err => {
    console.error('Ошибка при загрузке каталога:', err);
});

console.log('Конец');