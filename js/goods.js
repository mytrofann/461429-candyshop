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

// Функция, для создания массива из 26 сгенерированных объектов. Каждый объект массива представляет собой описание товара.
function generateProducts() {

  function getRandomElement(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function getRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  function getRandomLengthList(list) {
    var begin = getRandomInteger(0, (list.length) / 2);
    var end = getRandomInteger((list.length) / 2, list.length - 1);
    return list.slice(begin, end);
  }

  var products = [];
  var oneProduct = {};
  for (var i = 0; i < NUMBER_OF_PRODUCTS; i++) {
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
}

// Убераем у блока catalog__cards класс catalog__cards--load и скрываем, добавлением класса visually-hidden блок catalog__load.
var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = catalogCards.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

// Создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива

// Скопировать catalog__card в разметку
var template = document.querySelector('#card').content.querySelector('.catalog__card');

function renderProducts(products) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < products.length; i++) {
    var productsItem = template.cloneNode(true);
    var amount = products[i].amount;
    fragment.appendChild(productsItem);

    // в зависимости от количества amount добавьте следующий класс:
    if (amount > 5) {
      productsItem.classList.add('card--in-stock');
    } else if (amount >= 1 && amount <= 5) {
      productsItem.classList.add('card--little');
    } else {
      productsItem.classList.add('card--soon');
    }

    // название вставьте в блок card__title
    productsItem.querySelector('.card__title').textContent = products[i].name;
    productsItem.querySelector('img').src = products[i].picture;

    // содержимое блока card__price должно выглядеть следующим образом
    productsItem.querySelector('.card__price').innerHTML = '';
    productsItem.querySelector('.card__price').insertAdjacentHTML('afterBegin', products[i].price + '<span class="card__currency">₽</span><span class="card__weight">/' + products[i].weight + 'Г</span>');

    // класс блока stars__rating должен соответствовать рейтингу. В зависимости от рейтинга, блоку должен выставляться класс
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

    productsItem.querySelector('.stars__rating').classList.add(getStarsRating(products[i].rating.value));

    // В блок star__count вставьте значение rating.number
    productsItem.querySelector('.star__count').textContent = products[i].rating.number;

    // Блок card__characteristic должен формироваться следующим образом:
    // 1. В зависимости от значения nutritionFacts.sugar, должно выводиться сообщение Без сахара или Содержит сахар;
    var sugar = products[i].nutritionFacts.sugar;
    productsItem.querySelector('.card__characteristic').textContent = sugar ? 'Содержит сахар' : 'Без сахара';

    // 2. card__composition-list должен содержать состав
    productsItem.querySelector('.card__composition-list').textContent = products[i].nutritionFacts.contents;
  }

  catalogCards.appendChild(fragment);
}
renderProducts(generateProducts());
