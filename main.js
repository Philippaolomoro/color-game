function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomColors(num) {
  let newArr = [];
  for (let i = 0; i < num; i++) {
    newArr.push(randomColor());
  }
  return newArr;
}
let numberOfSquares = 9;
let colors = generateRandomColors(numberOfSquares);

let squares = document.querySelectorAll('.squares');
let colorDisplay = document.querySelector('#color-display');
let tryAgain = document.querySelector('#try-again');
let headingContainer = document.querySelector('.heading-cont');
let resetButton = document.querySelector('#reset-btn');
let modeButtons = document.querySelectorAll('.mode');

let pickedColor = pickColor();

colorDisplay.textContent = pickedColor;

for (let i = 0; i < modeButtons.length; i++) {
  modeButtons[i].addEventListener('click', function () {
    modeButtons[0].classList.remove('selected');
    modeButtons[1].classList.remove('selected');
    modeButtons[2].classList.remove('selected');
    modeButtons[i].classList.add('selected');
    modeButtons[i].textContent === 'Easy'
      ? (numberOfSquares = 3)
      : modeButtons[i].textContent === 'Medium'
      ? (numberOfSquares = 6)
      : (numberOfSquares = 9);
    reset();
  });
}

function unifyColors(color) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

for (let i = 0; i < squares.length; i++) {
  squares[i].style.backgroundColor = colors[i];
  squares[i].addEventListener('click', () => {
    let clickedSquare = squares[i].style.backgroundColor;
    if (clickedSquare === pickedColor) {
      tryAgain.textContent = 'Correct';
      resetButton.textContent = 'Play Again?';
      unifyColors(clickedSquare);
      headingContainer.style.backgroundColor = pickedColor;
    } else {
      squares[i].style.backgroundColor = 'black';
      tryAgain.textContent = 'Try again';
    }
  });
}

function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

resetButton.addEventListener('click', function () {
  reset();
});

function reset() {
  colors = generateRandomColors(numberOfSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
  headingContainer.style.backgroundColor = '#fcf4dc';
  headingContainer.style.color = 'black';
  resetButton.textContent = 'New Colors';
  tryAgain.textContent = '';
}
