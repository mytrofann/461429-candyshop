'use strict';

var PRODUCT_NAMES = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];
var PRODUCT_IMAGES = [
  'img/cards/gum-cedar.jpg',
  'img/cards/gum-chile.jpg',
  'img/cards/gum-eggplant.jpg',
  'img/cards/gum-mustard.jpg',
  'img/cards/gum-portwine.jpg',
  'img/cards/gum-wasabi.jpg',
  'img/cards/ice-cucumber.jpg',
  'img/cards/ice-eggplant.jpg',
  'img/cards/ice-garlic.jpg',
  'img/cards/ice-italian.jpg',
  'img/cards/ice-mushroom.jpg',
  'img/cards/ice-pig.jpg',
  'img/cards/marmalade-beer.jpg',
  'img/cards/marmalade-caviar.jpg',
  'img/cards/marmalade-corn.jpg',
  'img/cards/marmalade-new-year.jpg',
  'img/cards/marmalade-sour.jpg',
  'img/cards/marshmallow-bacon.jpg',
  'img/cards/marshmallow-beer.jpg',
  'img/cards/marshmallow-shrimp.jpg',
  'img/cards/marshmallow-spicy.jpg',
  'img/cards/marshmallow-wine.jpg',
  'img/cards/soda-bacon.jpg',
  'img/cards/soda-celery.jpg',
  'img/cards/soda-cob.jpg',
  'img/cards/soda-garlic.jpg',
  'img/cards/soda-peanut-grapes.jpg',
  'img/cards/soda-russian.jpg'
];
var PRODUCT_AMOUNT = {min: 0, max: 20};
var PRODUCT_PRICE = {min: 100, max: 1500};
var PRODUCT_WEIGHT = {min: 30, max: 300};
var PRODUCT_RATING = {
  value: {min: 1, max: 5},
  number: {min: 10, max: 900}
};
var PRODUCT_NUTRITION_FACTS = {
  sugar: [true, false],
  energy: {min: 70, max: 500},
  contents: [
    'молоко',
    'сливки',
    'вода',
    'пищевой краситель',
    'патока',
    'ароматизатор бекона',
    'ароматизатор свинца',
    'ароматизатор дуба',
    'идентичный натуральному',
    'ароматизатор картофеля',
    'лимонная кислота',
    'загуститель',
    'эмульгатор',
    'консервант: сорбат калия',
    'посолочная смесь: соль',
    'нитрит натрия',
    'ксилит',
    'карбамид',
    'вилларибо',
    'виллабаджо'
  ]
};
var NUMBER_OF_PRODUCTS = 26;
var NUMBER_OF_PRODUCTS_ORDER = 3;
var AMOUNT_LITTLE = 1;
var AMOUNT_STOCK = 5;

var getRandomElement = function (list) {
  return list[Math.floor(Math.random() * list.length)];
};

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomLengthList = function (list) {
  var begin = getRandomInteger(0, (list.length) / 2);
  var end = getRandomInteger((list.length) / 2, list.length - 1);
  return list.slice(begin, end);
};

// Функция, для создания массива из 26 сгенерированных объектов. Каждый объект массива представляет собой описание товара.
var generateProducts = function (amount) {
  var products = [];
  var oneProduct = {};
  for (var i = 0; i < amount; i++) {
    oneProduct = {
      name: getRandomElement(PRODUCT_NAMES),
      picture: getRandomElement(PRODUCT_IMAGES),
      amount: getRandomInteger(PRODUCT_AMOUNT.min, PRODUCT_AMOUNT.max),
      price: getRandomInteger(PRODUCT_PRICE.min, PRODUCT_PRICE.max),
      weight: getRandomInteger(PRODUCT_WEIGHT.min, PRODUCT_WEIGHT.max),
      rating: {
        value: getRandomInteger(PRODUCT_RATING.value.min, PRODUCT_RATING.value.max),
        number: getRandomInteger(PRODUCT_RATING.number.min, PRODUCT_RATING.number.max)
      },
      nutritionFacts: {
        sugar: getRandomElement(PRODUCT_NUTRITION_FACTS.sugar),
        energy: getRandomInteger(PRODUCT_NUTRITION_FACTS.energy.min, PRODUCT_NUTRITION_FACTS.energy.max),
        contents: getRandomLengthList(PRODUCT_NUTRITION_FACTS.contents).join()
      }
    };
    products.push(oneProduct);
  }
  return products;
};
// Убераем у блока catalog__cards класс catalog__cards--load и скрываем, добавлением класса visually-hidden блок catalog__load.
var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = catalogCards.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

// Создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива
var templateCatalogCard = document.querySelector('#card').content.querySelector('.catalog__card');

var renderProduct = function (product, productsItem, index) {
  var amount = product.amount;
  var sugar = product.nutritionFacts.sugar;

  if (amount > AMOUNT_STOCK) {
    productsItem.classList.add('card--in-stock');
  } else if (amount >= AMOUNT_LITTLE) {
    productsItem.classList.add('card--little');
  } else {
    productsItem.classList.add('card--soon');
  }
  productsItem.querySelector('.card__title').textContent = product.name;
  productsItem.querySelector('img').src = product.picture;
  productsItem.querySelector('img').alt = product.name;
  productsItem.querySelector('.card__price-block').textContent = product.price;
  productsItem.querySelector('.card__weight').textContent = '/ ' + product.weight + ' Г';

  var getStarsRating = function (rating) {
    var starsRating = '';
    switch (rating) {
      case 1:
        starsRating = 'stars__rating--one';
        break;
      case 2:
        starsRating = 'stars__rating--two';
        break;
      case 3:
        starsRating = 'stars__rating--three';
        break;
      case 4:
        starsRating = 'stars__rating--four';
        break;
      case 5:
        starsRating = 'stars__rating--five';
    }
    return starsRating;
  };
  productsItem.querySelector('.stars__rating').classList.add(getStarsRating(product.rating.value));
  productsItem.querySelector('.star__count').textContent = product.rating.number;
  productsItem.querySelector('.card__characteristic').textContent = sugar ? 'Содержит сахар' : 'Без сахара';
  productsItem.querySelector('.card__composition-list').textContent = product.nutritionFacts.contents;
  productsItem.setAttribute('data-id', index);
};
// По аналогии с исходным массивом данных создайте ещё один массив, состоящий из трёх элементов. Это будет массив объектов, который соответствует товарам, добавленным в корзину.
var goodsCards = document.querySelector('.goods__cards');
goodsCards.classList.remove('goods__cards--empty');
var goodsCardEmpty = goodsCards.querySelector('.goods__card-empty');
goodsCardEmpty.classList.add('visually-hidden');

// На основе шаблона goods_card создайте DOM-элементы товаров, добавленных в корзину.
var templateOrderCard = document.querySelector('#card-order').content.querySelector('.goods_card');

var renderProductsOrder = function (product, productsItem) {
  productsItem.querySelector('.card-order__title').textContent = product.name;
  productsItem.querySelector('img').src = product.picture;
  productsItem.querySelector('img').alt = product.name;
  productsItem.querySelector('.card-order__price').textContent = product.price + ' ₽';
};

var renderElementsByTemplate = function (products, block, render, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < products.length; i++) {
    var productsItem = template.cloneNode(true);
    fragment.appendChild(productsItem);
    render(products[i], productsItem, i);
  }
  block.appendChild(fragment);
};
renderElementsByTemplate(generateProducts(NUMBER_OF_PRODUCTS), catalogCards, renderProduct, templateCatalogCard);
renderElementsByTemplate(generateProducts(NUMBER_OF_PRODUCTS_ORDER), goodsCards, renderProductsOrder, templateOrderCard);

// Добавление выбранного товара в избранное
var cardFavoriteButtons = document.querySelectorAll('.card__btn-favorite');
for (var i = 0; i < cardFavoriteButtons.length; i++) {
  cardFavoriteButtons[i].addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__btn-favorite--selected');
  }
  );
}

// Добавление товара в корзину

// При нажатии на кнопку "Добавить +1" с классом card__btn
// карточка, соответствующая выбранному товару, добавляется в блок корзины.
// Если в корзине уже есть карточка, соответствующая выбранному товару, то
// количество выбранного товара увеличивается на единицу.

// При нажатии на кнопку "Добавить +1" с классом card__btn
var cardButtons = document.querySelectorAll('.card__btn');
for (var i = 0; i < cardButtons.length; i++) {
  cardButtons[i].addEventListener('click', function (evt) {
    // карточка, соответствующая выбранному товару, добавляется в блок корзины.
    var index = evt.target.closest('article').dataset.id;
    console.log(index);
    renderElementsByTemplate([products[index]], goodsCards, renderProductsOrder, templateOrderCard);
    // Надо скопировать карточку, на которой произошло событие и вставить в goodsCards
    // Если в корзине уже есть карточка, соответствующая выбранному товару /сравнить циклом по параметрам/, то
    // количество выбранного товара увеличивается на единицу card-order__count
  }
  );
}

// Управление количеством определенного товара в корзине;

// Переключение вкладок в форме оформления заказа;
