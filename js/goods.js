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
// var NUMBER_OF_PRODUCTS_ORDER = 3;
var AMOUNT_LITTLE = 1;
var AMOUNT_STOCK = 5;
var cart = [];

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
  for (var i = 0; i < amount; i++) {
    products.push({
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
    });
  }
  return products;
};

// Убераем у блока catalog__cards класс catalog__cards--load и скрываем, добавлением класса visually-hidden блок catalog__load.
var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = catalogCards.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

// Создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива
var templateCatalogCard = document.querySelector('#card').content.querySelector('.catalog__card').cloneNode(true);

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
/*
var renderProductsBasket = function (product, productsItem) {
  productsItem.querySelector('.card-order__title').textContent = product.name;
  productsItem.querySelector('img').src = product.picture;
  productsItem.querySelector('img').alt = product.name;
  productsItem.querySelector('.card-order__price').textContent = product.price + ' ₽';
  productsItem.querySelector('.card-order__count').value = product.amount;
};
*/

// Добавление выбранного товара в избранное
var cardFavoriteButtons = document.querySelectorAll('.card__btn-favorite');
for (var i = 0; i < cardFavoriteButtons.length; i++) {
  cardFavoriteButtons[i].addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__btn-favorite--selected');
  }
  );
}

// Управление товаром в корзине
/*
var orderDecreaseButtons = goodsCards.querySelectorAll('.card-order__btn--decrease');
var orderIncreaseButtons = goodsCards.querySelectorAll('.card-order__btn--increase');
// var orderCloseButtons = goodsCards.querySelectorAll('.card-order__close');
var cardsOrderedBasket = function () {
  var cardsBasket = goodsCards.querySelector('.goods_card');
  if (cardsBasket) {
    goodsCards.querySelector('.goods__card-empty').classList.add('visually-hidden');
  } else {
    goodsCards.querySelector('.goods__card-empty').classList.remove('visually-hidden');
  }
};

for (var i = 0; i < orderDecreaseButtons.length; i++) {
  orderDecreaseButtons[i].addEventListener('click', function (evt) {
    var goodsCard = evt.target.closest('.goods_card');
    var cardOrderCount = goodsCard.querySelector('.card-order__count');
    if (cardOrderCount.value > 1) {
      cardOrderCount.value--;
    } else {
      goodsCard.remove();
      cardsOrderedBasket();
    }
  }
  );
}

for (var i = 0; i < orderIncreaseButtons.length; i++) {
  orderIncreaseButtons[i].addEventListener('click', function (evt) {
    var goodsCard = evt.target.closest('.goods_card');
    var cardOrderCount = goodsCard.querySelector('.card-order__count');
    if (cardOrderCount.value < PRODUCT_AMOUNT.max) {
      cardOrderCount.value++;
    } else {
      cardOrderCount.value = PRODUCT_AMOUNT.max;
    }
  }
  );
}*/
/*
var getInnerAmount = function (evt) {
  var goodsCard = evt.target.closest('.goods_card');
  var cardOrderCount = goodsCard.querySelector('.card-order__count');
  if (cardOrderCount.value < PRODUCT_AMOUNT.max) {
    cardOrderCount.value++;
  } else {
    cardOrderCount.value = PRODUCT_AMOUNT.max;
  }
};
*/
/*
var getInnerAmount = function (evt) {
  var goodsCard = evt.target.closest('.goods_card');
  var cardOrderCount = goodsCard.querySelector('.card-order__count');
  if (cardOrderCount.value < PRODUCT_AMOUNT.max) {
    cardOrderCount.value++;
  } else {
    cardOrderCount.value = PRODUCT_AMOUNT.max;
  }
};
*/

// Добавление выбранного товара в корзину и управление товаром в корзине

var renderProductsBasket = function (product, productsItem, key) {
  productsItem.querySelector('.card-order__title').textContent = product.name;
  productsItem.querySelector('img').src = product.picture;
  productsItem.querySelector('img').alt = product.name;
  productsItem.querySelector('.card-order__price').textContent = product.price + ' ₽';
  productsItem.querySelector('.card-order__count').value = product.amount;
  productsItem.querySelector('.card-order__close').addEventListener('click', function () {
    cart.splice(key, 1);
    renderCart();
  });
  productsItem.querySelector('.card-order__btn--decrease').addEventListener('click', function () {
    if (product.amount > 1) {
      product.amount--;
    } else {
      cart.splice(key, 1);
    }
    renderCart();
  });
  productsItem.querySelector('.card-order__btn--increase').addEventListener('click', function () {
    if (product.amount < PRODUCT_AMOUNT.max) {
      product.amount++;
    } else {
      product.amount = PRODUCT_AMOUNT.max;
    }
    renderCart();
  });
};

var renderCart = function () {
  goodsCards.innerHTML = '';
  renderElementsByTemplate(cart, goodsCards, renderProductsBasket, templateOrderCard);
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

var productsCards = generateProducts(NUMBER_OF_PRODUCTS);
renderElementsByTemplate(productsCards, catalogCards, renderProduct, templateCatalogCard);
// renderElementsByTemplate(generateProducts(NUMBER_OF_PRODUCTS_ORDER), goodsCards, renderProductsBasket, templateOrderCard);

var cardButtons = document.querySelectorAll('.card__btn');

var findInCart = function (id) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      return cart[i];
    }
  }
  return false;
};

var updateCart = function (index, product) {
  var item = findInCart(index);
  if (item) {
    item.amount += 1;
  } else {
    cart.push(Object.assign({}, product[index], {amount: 1, id: index}));
  }
};

for (var i = 0; i < cardButtons.length; i++) {
  cardButtons[i].addEventListener('click', function (evt) {
    var index = evt.target.closest('article').dataset.id;
    updateCart(index, productsCards);
    renderCart();
  });
}

// Переключение вкладок в форме оформления заказа
// Выбор способа оплаты
var payment = document.querySelector('.payment');
var paymentCardButton = payment.querySelector('#payment__card');
var paymentCashButton = payment.querySelector('#payment__cash');
var paymentCardWrap = payment.querySelector('.payment__card-wrap');
var paymentCashWrap = payment.querySelector('.payment__cash-wrap');
var inputsPayment = paymentCardWrap.querySelectorAll('input');

var inputsSet = function (inputs, state) {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = state;
  }
};

paymentCardButton.addEventListener('click', function () {
  paymentCashWrap.classList.add('visually-hidden');
  paymentCardWrap.classList.remove('visually-hidden');
  inputsSet(inputsPayment, false);
});

paymentCashButton.addEventListener('click', function () {
  paymentCashWrap.classList.remove('visually-hidden');
  paymentCardWrap.classList.add('visually-hidden');
  inputsSet(inputsPayment, true);
});

// Валидация банковской карты по алгоритму Луна
var validateCard = function (cardNumber) {
  if (cardNumber === '') {
    return false;
  }
  var digits = cardNumber.split('');
  var value;
  var checkSum = 0;
  for (i = 0; i < cardNumber.length; i++) {
    var number = +digits[i];
    if (i % 2 === 0) {
      value = number * 2;
      if (value > 9) {
        value -= 9;
      }
      checkSum += value;
    } else {
      checkSum += number;
    }
  }
  return checkSum % 10 === 0;
};

// Валидация карты на поле с номером карты
var cardNumberInput = payment.querySelector('#payment__card-number');
cardNumberInput.addEventListener('blur', function () {
  if (validateCard(cardNumberInput.value)) {
    document.querySelector('.payment__card-status').textContent = 'Номер введен верно';
  } else {
    document.querySelector('.payment__card-status').textContent = 'Не определён';
  }
});

// Выбор способа доставки
var deliver = document.querySelector('.deliver');
var deliverStoreButton = deliver.querySelector('#deliver__store');
var deliverСourierButton = deliver.querySelector('#deliver__courier');
var deliverStore = deliver.querySelector('.deliver__store');
var deliverСourier = deliver.querySelector('.deliver__courier');
var inputsStore = deliverStore.querySelectorAll('input');
var inputsСourier = deliverСourier.querySelectorAll('input');

deliverStoreButton.addEventListener('click', function () {
  deliverСourier.classList.add('visually-hidden');
  deliverStore.classList.remove('visually-hidden');
  inputsSet(inputsStore, false);
  inputsSet(inputsСourier, true);
});

deliverСourierButton.addEventListener('click', function () {
  deliverСourier.classList.remove('visually-hidden');
  deliverStore.classList.add('visually-hidden');
  inputsSet(inputsStore, true);
  inputsSet(inputsСourier, false);
});

// Добавление карты согласно станции метро
var deliverStoreMapImg = document.querySelector('.deliver__store-map-img');
for (var i = 0; i < inputsStore.length; i++) {
  inputsStore[i].addEventListener('click', function (evt) {
    deliverStoreMapImg.src = 'img/map/' + evt.target.value + '.jpg';
  }
  );
}

// Первая фаза работы фильтра по цене
var range = document.querySelector('.range');
var rangeFilter = range.querySelector('.range__filter');
var rangeButtonLeft = range.querySelector('.range__btn--left');
var rangeButtonRight = range.querySelector('.range__btn--right');
var rangePriceMin = range.querySelector('.range__price--min');
var rangePriceMax = range.querySelector('.range__price--max');

range.addEventListener('mouseup', function () {
  rangePriceMin.textContent = Math.floor(100 * (rangeButtonLeft.offsetLeft) / rangeFilter.offsetWidth);
  rangePriceMax.textContent = Math.ceil(100 * (rangeButtonRight.offsetLeft + rangeButtonRight.offsetWidth) / rangeFilter.offsetWidth);
});
