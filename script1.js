let x1 = document.getElementById('x1'), y1 = document.getElementById('y1'), z1 = document.getElementById('z1');
let x2 = document.getElementById('x2'), y2 = document.getElementById('y2'), z2 = document.getElementById('z2');
let x3 = document.getElementById('x3'), y3 = document.getElementById('y3'), z3 = document.getElementById('z3');

let a1 = document.getElementById('a1');
let a2 = document.getElementById('a2');
let a3 = document.getElementById('a3');

const answer_text = document.getElementById('answers');
const button = document.getElementById('button');

function determinator_calculating(matrix) {
    let d = matrix[0][0] * matrix[1][1] * matrix[2][2] + 
            matrix[0][1] * matrix[1][2] * matrix[2][0] + 
            matrix[1][0] * matrix[2][1] * matrix[0][2] - 
            matrix[0][2] * matrix[1][1] * matrix[2][0] - 
            matrix[0][1] * matrix[1][0] * matrix[2][2] - 
            matrix[0][0] * matrix[1][2] * matrix[2][1];
    return d;
}

function replaceColumn(matrix, columnIndex, newColumn) {
    return matrix.map((row, i) => {
        let newRow = row.slice();
        newRow[columnIndex] = newColumn[i];
        return newRow;
    });
}

button.addEventListener('click', function() {
    // Преобразуем значения из текстовых полей в числа
    const x1Value = parseFloat(x1.value);
    const y1Value = parseFloat(y1.value);
    const z1Value = parseFloat(z1.value);
    const x2Value = parseFloat(x2.value);
    const y2Value = parseFloat(y2.value);
    const z2Value = parseFloat(z2.value);
    const x3Value = parseFloat(x3.value);
    const y3Value = parseFloat(y3.value);
    const z3Value = parseFloat(z3.value);

    const a1Value = parseFloat(a1.value);
    const a2Value = parseFloat(a2.value);
    const a3Value = parseFloat(a3.value);

    // Создаем новую матрицу на основе введенных значений
    let matrix = [[x1Value, y1Value, z1Value], [x2Value, y2Value, z2Value], [x3Value, y3Value, z3Value]];

    // Вычисляем детерминанты
    let d = determinator_calculating(matrix);
    let d1 = determinator_calculating(replaceColumn(matrix, 0, [a1Value, a2Value, a3Value]));
    let d2 = determinator_calculating(replaceColumn(matrix, 1, [a1Value, a2Value, a3Value]));
    let d3 = determinator_calculating(replaceColumn(matrix, 2, [a1Value, a2Value, a3Value]));

    // Используем библиотеку Fraction.js для представления ответов как дробей
    let fractionX = new Fraction(d1).div(d);
    let fractionY = new Fraction(d2).div(d);
    let fractionZ = new Fraction(d3).div(d);

    // Выводим ответы в виде дробей
    answer_text.innerHTML = `x = ${fractionX.toFraction(true)}, y = ${fractionY.toFraction(true)}, z = ${fractionZ.toFraction(true)}`;
});

