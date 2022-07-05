// Функция для вывода случайного числа
const getRandom = (max, min) => {
    if (max < 0 || min < 0) {
        return -1;
    };

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandom(1, 10);

// Функция для проверки количества символов

const stringCount = (text, amount) => {
return text.length <= amount;
};

stringCount('Проверка кол-ва символов', 140);