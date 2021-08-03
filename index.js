var Snake = function() {
  this.left = 10
  this.top = 10
  this.direction = 1   // 1-up, 2-right, 3-down, 4-left
  this.head
  this.body = []

  this.startPosition = function() {
    this.left = 10
    this.top = 10
    this.direction = 1
    this.head = document.getElementsByClassName(`row${this.top}`)[0].getElementsByClassName(`col${this.left}`)[0]
  }

  this.changeDirection = function(code) {
    if (code === 'ArrowUp') this.direction = 1
    if (code === 'ArrowRight') this.direction = 2
    if (code === 'ArrowDown') this.direction = 3
    if (code === 'ArrowLeft') this.direction = 4
  }

  this.move = function () {
    if (this.body.length > 0) {
      this.body.unshift({ top: this.top, left: this.left })
      this.body.pop()
    }

    if (this.direction === 1) this.top--
    if (this.direction === 2) this.left++
    if (this.direction === 3) this.top++
    if (this.direction === 4) this.left--
  }

  this.grow = function () {
    this.body.unshift({ top: this.top, left: this.left })
    if (this.direction === 1) this.top--
    if (this.direction === 2) this.left++
    if (this.direction === 3) this.top++
    if (this.direction === 4) this.left--
  }
}

var snake = new Snake()
var apple = {
  top: Math.floor(Math.random() * 20) + 1,
  left: Math.floor(Math.random() * 20) + 1
}
var speed = 1000
var gameId

function createApple() {
  var appleCell = document.getElementsByClassName(`row${apple.top}`)[0].getElementsByClassName(`col${apple.left}`)[0]
  appleCell.classList.remove('apple')
  apple.top = Math.floor(Math.random() * 20) + 1,
  apple.left = Math.floor(Math.random() * 20) + 1
  appleCell = document.getElementsByClassName(`row${apple.top}`)[0].getElementsByClassName(`col${apple.left}`)[0]
  appleCell.classList.add('apple')
}

function eatApple() {
  if(snake.top === apple.top &&
    snake.left === apple.left) {
      createApple()
      snake.grow()
      speedUp()
    }
}

function speedUp() {
  speed -= 100
  clearInterval(gameId)
  gameId = setInterval(animate, speed)
}

function clearBoard() {
  snake.head.classList.remove('snake')

  var snakeBody

  snake.body.forEach(function(section) {
    snakeBody = document.getElementsByClassName(`row${section.top}`)[0].getElementsByClassName(`col${section.left}`)[0]
    snakeBody.classList.remove('snake')
  })
}

function drawBoard() {
  snake.head = document.getElementsByClassName(`row${snake.top}`)[0].getElementsByClassName(`col${snake.left}`)[0]
  snake.head.classList.add('snake')

  var snakeBody

  snake.body.forEach(function(section) {
    snakeBody = document.getElementsByClassName(`row${section.top}`)[0].getElementsByClassName(`col${section.left}`)[0]
    snakeBody.classList.add('snake')
  })

  var appleCell = document.getElementsByClassName(`row${apple.top}`)[0].getElementsByClassName(`col${apple.left}`)[0]
  appleCell.classList.add('apple')
}

function endGame() {
  return snake.left === 0 || snake.top === 0 || snake.left === 21 || snake.top === 21
}

function animate() {
  clearBoard()
  snake.move()
  if (endGame()) {
    clearInterval(gameId)
    window.alert('Game Over')
  } else {
    eatApple()
    drawBoard()
  }
}

function startGame() {
  snake.startPosition()
  gameId = setInterval(animate, speed)
}

var btnStart = document.getElementById('btn-start')
btnStart.onclick = function() {
  startGame()
}

window.addEventListener('keydown', function(e) {
  snake.changeDirection(e.code)
})


