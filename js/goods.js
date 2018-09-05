'use strict';

//Функция, для создания массива из 26 сгенерированных объектов. Каждый объект массива представляет собой описание товара.
function generateProducts () {
  var PRODUCT_NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
  var PRODUCT_AMOUNT = {min: 0, max: 20};
  var PRODUCT_PRICE = {min: 1000, max: 1000000};
  var PRODUCT_WEIGHT = {min: 100, max: 1000};
  var PRODUCT_RATING = {
    value: {min: 1, max: 5},
    number: {min: 10, max: 900}
  };
  var PRODUCT_NUTRITION_FACTS = {
    sugar: [true, false],
    energy: {min: 70, max: 500},
    contents: ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба', 'идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль', 'нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
  };
  var NUMBER_OF_PRODUCTS = 26;

  function getRandomElement (list) {
    return list[Math.floor(Math.random() * list.length)];
  };

  function getRandomInteger (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  function getRandomLengthList (list) {
    var begin = getRandomInteger(0, (list.length) / 2);
    var end = getRandomInteger((list.length) / 2, list.length - 1);
    return list.slice(begin, end);
  };

  var producrs = [];
  var oneProduct = {};

  for (var i = 0; i < NUMBER_OF_PRODUCTS; i++) {
    oneProduct = {
      name: getRandomElement(PRODUCT_NAMES),
      amount: getRandomInteger(PRODUCT_AMOUNT.min, PRODUCT_AMOUNT.max),
      price: getRandomInteger(PRODUCT_PRICE.min, PRODUCT_PRICE.max),
      weight: getRandomInteger(PRODUCT_WEIGHT.min, PRODUCT_WEIGHT.max),
      rating: {
        value: getRandomInteger(PRODUCT_RATING.value.min, PRODUCT_RATING.value.max),
        number: getRandomInteger(PRODUCT_RATING.number.min, PRODUCT_RATING.number.max)
      },
      nutrition_facts: {
        sugar: getRandomElement(PRODUCT_NUTRITION_FACTS.sugar),
        energy: getRandomInteger(PRODUCT_NUTRITION_FACTS.energy.min, PRODUCT_NUTRITION_FACTS.energy.max),
        contents: getRandomLengthList(PRODUCT_NUTRITION_FACTS.contents)
      }
    };
    producrs.push(oneProduct);
  }
  return producrs;
};
