const map = document.querySelector("#map")
const snakeHead = document.querySelector("#snake--head")
const lengthCounter = document.querySelector("#length")
const speedCounter = document.querySelector("#speed")
const minuteCounter = document.querySelector("#timer--minutes")
const secondsCounter = document.querySelector("#timer--seconds")

// Main, elapsed timer. Increases game speed at certain intervals
let timer

// Game speed timer, made dynamic with a second function. Courtesy of stack overflow
let play

// a second function for the "game speed" timer, to restart each time with the current game speed
let playTimer

const snakeBob = []
const positionTaken = []
let fruitSpot = ""

const head = {
   gridDepth: 15,
   gridWidth: 15,
   length: 1,
   seconds: 00,
   minutes: 0,
   speed: 500, // movement speed, in milliseconds
   speedDisplay: 1, // for external display only
   row: 0,
   column: 0,
   prevRow: 0,
   prevCol: 0,
   prevSpot: [],
   direction: "",
   // to get a random start position within the grid
   startPosition() {
      this.row = Math.floor(Math.random() * Number(this.gridDepth)) + 1
      this.column = Math.floor(Math.random() * Number(this.gridWidth)) + 1
      this.prevSpot[0] = this.row
      this.prevSpot[1] = this.column - 1
      this.positionSnake()
   },
   startGame() {
      timer = setInterval(seconds => {
         head.seconds++
         head.updateSeconds()
         head.updateMinutes()
         if (head.seconds % 15 == 0) {
            head.speed = head.speed - 100
            head.speedDisplay++
            head.updateSpeed()
         }
      }, 1000)

      play = setTimeout(() => {
         head.positionSnake()
         head.moveBob()
         head.updatePosition()
         playTimer()
      }, head.speed)

      playTimer = () => {
         play = setTimeout(() => {
            head.positionSnake()
            head.moveBob()
            head.updatePosition()
            playTimer()
         }, head.speed)
      }
   },
   updateLength() {
      lengthCounter.innerHTML = this.length
   },
   updateSpeed() {
      speedCounter.innerHTML = this.speedDisplay
   },
   updateSeconds() {
      const pad = (second) => { // to pad single digit values with a 0 in the front
         let check = second + ""
         if (check.length < 2) {
            return "0" + second
         } else {
            return second
         }
      }
      secondsCounter.innerHTML = pad((this.seconds % 60))
   },
   updateMinutes() {
      minuteCounter.innerHTML = Math.floor(this.seconds / 60)
   },
   positionSnake() { // position the snake at each interval based on the current direction
      switch (this.direction) {
         case "up":
            this.prevSpot[0] = this.row
            this.prevSpot[1] = this.column
            this.row--
            snakeHead.style.gridRow = this.row
            snakeHead.style.gridColumn = this.column
            break
         case "down":
            this.prevSpot[0] = this.row
            this.prevSpot[1] = this.column
            this.row++
            snakeHead.style.gridRow = this.row
            snakeHead.style.gridColumn = this.column
            break
         case "left":
            this.prevSpot[0] = this.row
            this.prevSpot[1] = this.column
            this.column--
            snakeHead.style.gridRow = this.row
            snakeHead.style.gridColumn = this.column
            break
         case "right":
            this.prevSpot[0] = this.row
            this.prevSpot[1] = this.column
            this.column++
            snakeHead.style.gridRow = this.row
            snakeHead.style.gridColumn = this.column
            break
         default:
            snakeHead.style.gridRow = head.row
            snakeHead.style.gridColumn = head.column
      }
      const currentPosition = `${this.row}:${this.column}`
      positionTaken.forEach(pos => {
         if (pos == currentPosition) {
            this.gameOver()
         }
      })

      if (currentPosition == fruitSpot) {
         this.length++
         this.updateLength()
         this.createFruit()
         this.updatePosition()
         newTail()
         const currentFruit = document.querySelector(".fruit")
         currentFruit.remove()
      }
      // check if Bob is hitting the walls
      if (this.row < 1 || this.row > this.gridWidth || this.column < 1 || this.column > this.gridDepth) {
         this.gameOver()
      }
   },
   updatePosition() {
      const currentPosition = `${this.row}:${this.column}`
      if (snakeBob.length > 1) {
         positionTaken.unshift(currentPosition)
      }
   },
   gameOver() {
      alert("Game over")
      play = ""
      timer = ""
      playTimer = ""
      this.row = Math.floor(this.gridRow / 2)
      this.column = Math.floor(this.gridColumn / 2)
      this.positionSnake()
      this.reset()
   },
   reset() {
      this.length = 1,
         this.seconds = 0,
         this.minutes = 0,
         this.speed = 500,
         this.speedDisplay = 1,
         this.row = 0,
         this.column = 0,
         this.direction = ""
      timer = ""
      play = ""
      playTimer = ""
      this.startPosition()
   },
   createFruit() {
      const row = Math.floor(Math.random() * Number(this.gridDepth)) + 1
      const column = Math.floor(Math.random() * Number(this.gridWidth)) + 1
      const newFruit = document.createElement("div")
      newFruit.style.gridRow = `${row}`
      newFruit.style.gridColumn = `${column}`
      newFruit.classList.add("fruit")
      map.appendChild(newFruit)
      fruitSpot = `${row}:${column}`
   },
   addTail() {
      const bobAteAFruit = new Growsnake(head.prevRow,
         head.prevCol, head.length, 0, 0)
      snakeTail.push(bobAteAFruit)
      const newTailPiece = document.createElement("div")
      newTailPiece.classList.add("tail")
      newTailPiece.style.gridRow = `
               $ {
                  snakeTail[bobAteAFruit.length - 1].row
               }
               `
      newTailPiece.style.gridCol = `
               $ {
                  snakeTail[bobAteAFruit.length - 1].column
               }
               `
      map.appendChild(newTailPiece)
   },
   moveBob() {
      for (i = 1; i < snakeBob.length; i++) {
         snakeBob[i].calcPosition()
      }
      for (i = 1; i < snakeBob.length; i++) {
         snakeBob[i].moveTail()
      }
   }
}

snakeBob.push(head)
head.startPosition()
head.createFruit()
head.moveBob()

// After loading the page, start the game and set direction. Any further keydown just changes the current direction. 
window.addEventListener("keydown", event => {
   switch (event.key) {
      case "ArrowUp":
         if (head.seconds == 0 && head.direction == "") {
            head.direction = "up"
            head.startGame()
         } else {
            head.direction = "up"
         }
         break
      case "ArrowDown":
         if (head.seconds == 0 && head.direction == "") {
            head.direction = "down"
            head.startGame()
         } else {
            head.direction = "down"
         }
         break
      case "ArrowLeft":
         if (head.seconds == 0 && head.direction == "") {
            head.direction = "left"
            head.startGame()
         } else {
            head.direction = "left"
         }
         break
      case "ArrowRight":
         if (head.seconds == 0 && head.direction == "") {
            head.direction = "right"
            head.startGame()
         } else {
            head.direction = "right"
         }
         break

   }
})

window.addEventListener("keypress", event => {
   switch (event.key) {
      case "p":
         timer = ""
         play = ""
         playTimer = ""
         head.direction = ""
   }
})


const createTail = (name) => {
   name = document.createElement("div")
   const id = Array.from(`tail${head.length}`).join("")
   name.setAttribute("id", id)
   name.classList.add(`tail`)
   map.appendChild(name)
}

const newTail = () => {
   const name = `tail${head.length}`
   const tail = new Growsnake(name)
   snakeBob.push(tail)
   createTail(name)
}

// constructor class to grow Bob
class Growsnake {
   constructor(name, length, row, column, prevSpot, index) {
      this.name = name;
      this.length = head.length;
      this.row = snakeBob[snakeBob.length - 1].prevSpot[0];
      this.column = snakeBob[snakeBob.length - 1].prevSpot[1];
      this.prevSpot = [];
      this.index = this.length - 1;
   }

   calcPosition() {
      this.row = snakeBob[this.index - 1].prevSpot[0]
      this.column = snakeBob[this.index - 1].prevSpot[1]
   }
   moveTail() {
      const name = this.name
      const snake = document.getElementById(name)
      snake.style.gridRow = this.row
      snake.style.gridColumn = this.column
      this.prevSpot[0] = this.row
      this.prevSpot[1] = this.column
      if ((Number(this.length == snakeBob.length))) {
         positionTaken.pop()
      }
   }
}