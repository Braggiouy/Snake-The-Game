function Snake () {
  this.top = 10
  this.left = 10
  this.direction = 1 // Snakes direction. If value is 1, it goes up. Value 2, goes right. 3 is down, and 4 is left. 

  this.move= function () { // It s how the snake moves, it moves the snake, therefore, it s a method from object Snake. 
    if (this.direction === 1) this.top--
    if (this.direction === 2) this.left++
    if (this.direction === 3) this.top++
    if (this.direction === 4) this.left--
  }

  this.changeDirection = function (code) { // this method allows us the change the snake direction.
    if (code === 'ArrowUp') this.direction = 1
    if (code === 'ArrowRight') this.direction = 2
    if (code === 'ArrowDown') this.direction = 3
    if (code === 'ArrowLeft') this.direction = 4
  }

}
 
var snake = new Snake()

var apple = {
  top: 5,
  left: 5
}

var gameId

function gameOver () { 
  if (snake.top === 0 || snake.top === 21 || snake.left === 0 || snake.left === 21) {
    clearInterval(gameId) // for the snake to stop
    window.alert('LOOOSER!') // Game is over
    return true
  } 
    return false

}

function clearBoard () { // it erases the snake while it moves
  var row = document.getElementsByClassName('row' + snake.top)[0]
  var cell = row.getElementsByClassName('col' + snake.left)[0]
  cell.classList.remove('snake') 
}

function drawBoard () {
  var row = document.getElementsByClassName('row' + snake.top)[0]
  var cell = row.getElementsByClassName('col' + snake.left)[0]
  cell.classList.add('snake')

  row = document.getElementsByClassName('row' + apple.top)[0]
  cell = row.getElementsByClassName('col' + apple.left)[0]
  cell.classList.add('apple')
}

function animate () { // animation bucle that draws the board
  clearBoard() // it erase the board before it starts
  snake.move() // the snake moves, and it starts painting its way while it moves.
  if (!gameOver()) { // 
  drawBoard()}
}

function startGame () {
  drawBoard()
  gameId = setInterval(animate, 500) // callback function

}

var btnStart = document.getElementById('btn-start')
btnStart.onclick = startGame // boton to initialize the game

window.addEventListener('keydown', function(e) { // e = current is what activates the game
  snake.changeDirection(e.code)

})


