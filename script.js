function Snake () {
  this.top = 10
  this.left = 10
  this.direction = 1

  this.move= function () { 
    if (this.direction === 1) this.top--
    if (this.direction === 2) this.left++
    if (this.direction === 3) this.top++
    if (this.direction === 4) this.left--
  }

  this.changeDirection = function (code) {
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
    clearInterval(gameId)
    window.alert('LOOOSER!')
    return true
  } 
    return false

}

function clearBoard () {
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

function animate () {
  clearBoard()
  snake.move()
  if (!gameOver()) {
}

function startGame () {
  drawBoard()
  gameId = setInterval(animate, 500)

}

var btnStart = document.getElementById('btn-start')
btnStart.onclick = startGame

window.addEventListener('keydown', function(e) {
  snake.changeDirection(e.code)

})


