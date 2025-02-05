let x1 = document.getElementById('x1'), y1 = document.getElementById('y1'), z1 = document.getElementById('z1');
let x2 = document.getElementById('x2'), y2 = document.getElementById('y2'), z2 = document.getElementById('z2');
let x3 = document.getElementById('x3'), y3 = document.getElementById('y3'), z3 = document.getElementById('z3');

let a1 = document.getElementById('a1');
let a2 = document.getElementById('a2');
let a3 = document.getElementById('a3');

const answer_text = document.getElementById('answers');
const button = document.getElementById('button');

function gcd(a, b) {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function determinator_calculating(matrix) {
    return matrix[0][0] * matrix[1][1] * matrix[2][2] + 
           matrix[0][1] * matrix[1][2] * matrix[2][0] + 
           matrix[1][0] * matrix[2][1] * matrix[0][2] - 
           matrix[0][2] * matrix[1][1] * matrix[2][0] - 
           matrix[0][1] * matrix[1][0] * matrix[2][2] - 
           matrix[0][0] * matrix[1][2] * matrix[2][1];
}

function replaceColumn(matrix, columnIndex, newColumn) {
    return matrix.map((row, i) => {
        let newRow = [...row];
        newRow[columnIndex] = newColumn[i];
        return newRow;
    });
}

function loadMathJax() {
    if (typeof MathJax === 'undefined') {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
        document.head.appendChild(script);

        let mathjax = document.createElement('script');
        mathjax.type = 'text/javascript';
        mathjax.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
        document.head.appendChild(mathjax);
    }
}

button.addEventListener('click', function() {
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

    let matrix = [[x1Value, y1Value, z1Value], [x2Value, y2Value, z2Value], [x3Value, y3Value, z3Value]];

    let d = determinator_calculating(matrix);
    if (d === 0) {
        answer_text.innerHTML = "No unique solution (determinant is zero)";
        return;
    }

    let d1 = determinator_calculating(replaceColumn(matrix, 0, [a1Value, a2Value, a3Value]));
    let d2 = determinator_calculating(replaceColumn(matrix, 1, [a1Value, a2Value, a3Value]));
    let d3 = determinator_calculating(replaceColumn(matrix, 2, [a1Value, a2Value, a3Value]));

    let gcd_x = gcd(d1, d);
    let gcd_y = gcd(d2, d);
    let gcd_z = gcd(d3, d);

    let x_numerator = d1 / gcd_x;
    let x_denominator = d / gcd_x;

    let y_numerator = d2 / gcd_y;
    let y_denominator = d / gcd_y;

    let z_numerator = d3 / gcd_z;
    let z_denominator = d / gcd_z;

    answer_text.innerHTML = `\\[ x = \\frac{${x_numerator}}{${x_denominator}}, \\quad y = \\frac{${y_numerator}}{${y_denominator}}, \\quad z = \\frac{${z_numerator}}{${z_denominator}} \\]`;

    if (window.MathJax) {
        MathJax.typesetPromise([answer_text]);
    } else {
        loadMathJax();
    }
});
