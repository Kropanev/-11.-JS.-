let minValue,
    maxValue,
    orderNumber = 1,
    answerNumber,
    answerText = '',
    arrayField = [`Вы загадали неправильное число!\n\u{1F914}`, `Я сдаюсь..\n\u{1F92F}`, `Вы загадали некоректное число`],
    gameRun = true,
    string = [
        ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'],
        ['', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'],
        ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'],
        ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'],
    ];

findValue();

answerNumber = Math.floor((minValue + maxValue) / 2);

const orderNumberField = document.getElementById('orderNumberField'),
      answerField = document.getElementById('answerField');

alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);

orderNumberField.innerText = orderNumber;
if (answerNumber < 0) {
        answerText = numberToString(Math.abs(answerNumber)).length < 20 ? `минус ${numberToString(Math.abs(answerNumber))}` : answerNumber;   
}else{
    answerText = numberToString(answerNumber).length < 20 ? numberToString(answerNumber) : answerNumber;
}
answerField.innerText = `Вы загадали число ${answerText }?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    findValue();

    orderNumber = 1;
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    
    if (answerNumber < 0) {
        answerText = numberToString(Math.abs(answerNumber)).length < 20 ? `минус ${numberToString(Math.abs(answerNumber))}` : answerNumber;   
    }else{
        answerText = numberToString(answerNumber).length < 20 ? numberToString(answerNumber) : answerNumber;
    }

    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${answerText}?`;
    gameRun = true;
})

document.getElementById('btnEqual').addEventListener('click', function () {
    const phraseRandom = Math.round( Math.random() * 3);
    if (gameRun){
        answerField.innerText = `Я всегда угадываю\n\u{1F60E}`
        gameRun = false;
    }
})

function findValue() {
    minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
    maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));

    if (minValue < -999) {
        minValue = -999;
    }else if (maxValue > 999){
        maxValue = 999;
    }else if (isNaN(maxValue) || isNaN(minValue)){
        maxValue = 100;
        minValue = 0;
    }
}

function regulNum(btn, value) {
    document.getElementById(btn).addEventListener('click', function () {
        if (gameRun){
            const phraseRandom = Math.round( Math.random() * 2);
            console.log(phraseRandom);
            if (minValue === maxValue){
                const phraseRandom = Math.round( Math.random());
                const answerPhrase = arrayField[phraseRandom]; 
                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                let arrayQues = [`Вы загадали число ${answerText}?`, `Да это легко! Ты загадал ${answerText }`, `Наверное, это число ${answerText }`];
                eval(value);
                answerNumber  = Math.floor((minValue + maxValue) / 2);

                if (answerNumber < 0) {
                    answerText = numberToString(Math.abs(answerNumber)).length < 20 ? `минус ${numberToString(Math.abs(answerNumber))}` : answerNumber;   
                }else{
                    answerText = numberToString(answerNumber).length < 20 ? numberToString(answerNumber) : answerNumber;
                }

                orderNumber++;
                orderNumberField.innerText = orderNumber;
                answerField.innerText = arrayQues[phraseRandom];
            }
        }
    })
}

regulNum('btnLess', 'maxValue = answerNumber - 1;');
regulNum('btnOver', 'minValue = answerNumber + 1');

function numberToString(number) {
    if (number == 0) {
        return 0;
    }
    if (number > 0 && number <= 9) {
        return string[0][number - 1];
    }
    if (number >= 10 && number <= 19) {
        return string[1][number - 10];
    }
    if (number >= 20 && number <= 99) {
        let ds = Math.floor(number/10),
            ed = number % 10;

        return `${string[2][ds]} ${string[0][ed]}`;
    }
    if (number >= 100 && number <= 999) {
        let st = Math.floor(number/100),
            dsNum = Math.floor(number % 100),
            ds = Math.floor(dsNum/10),
            ed = dsNum % 10;

        return `${string[3][st]} ${string[2][ds]} ${string[0][ed]}`;
    }
}