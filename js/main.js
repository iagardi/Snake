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
   gridRows: 30,
   gridColumns: 30,
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
      this.row = Math.floor(Math.random() * Number(this.gridRows)) + 1
      this.column = Math.floor(Math.random() * Number(this.gridColumns)) + 1
      this.prevRow = this.row
      this.prevCol = this.column - 1
      this.positionSnake()
   },
   startGame() {
      timer = setInterval(seconds => {
         head.seconds++
         head.updateSeconds()
         head.updateMinutes()
         if (head.seconds % 10 == 0) {
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

      playTimer = function () {
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
            this.prevRow = this.row
            this.prevCol = this.column
            this.prevSpot[0] = this.row
            this.prevSpot[1] = this.column
            this.row--
            snakeHead.style.gridRow = this.row
            snakeHead.style.gridColumn = this.column
            break
         case "down":
            this.prevRow = this.row
            this.prevCol = this.column
            this.prevSpot[0] = this.row
            this.prevSpot[1] = this.column
            this.row++
            snakeHead.style.gridRow = this.row
            snakeHead.style.gridColumn = this.column
            break
         case "left":
            this.prevRow = this.row
            this.prevCol = this.column
            this.prevSpot[0] = this.row
            this.prevSpot[1] = this.column
            this.column--
            snakeHead.style.gridRow = this.row
            snakeHead.style.gridColumn = this.column
            break
         case "right":
            this.prevRow = this.row
            this.prevCol = this.column
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
      if (currentPosition == fruitSpot) {
         this.length++
         this.updateLength()
         this.createFruit()
         const currentFruit = document.querySelector(".fruit")
         currentFruit.remove()
      }
      // check if Bob is hitting the walls
      if (this.row < 1 || this.row > 30 || this.column < 1 || this.column > 30) {
         this.gameOver()
      }
   },
   updatePosition() {
      const currentPosition = `${this.row}:${this.column}`
      positionTaken.push(currentPosition)
      console.log(currentPosition)

   },
   gameOver() {
      alert("SUXXXX")
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
      const row = Math.floor(Math.random() * Number(this.gridRows)) + 1
      const column = Math.floor(Math.random() * Number(this.gridColumns)) + 1
      const newFruit = document.createElement("div")
      console.log(`New fruit should be at ${row}:${column}`)
      newFruit.style.gridRow = `${row}`
      newFruit.style.gridColumn = `${column}`
      newFruit.classList.add("fruit")
      map.appendChild(newFruit)
      fruitSpot = `${row}:${column}`
      console.log(fruitSpot)
   },
   addTail() {
      const bobAteAFruit = new Growsnake(head.prevRow,
         head.prevCol, head.length, 0, 0)
      snakeTail.push(bobAteAFruit)
      const newTailPiece = document.createElement("div")
      newTailPiece.classList.add("tail")
      newTailPiece.style.gridRow = `${snakeTail[bobAteAFruit.length-1].row}`
      newTailPiece.style.gridCol = `${snakeTail[bobAteAFruit.length-1].column}`
      map.appendChild(newTailPiece)
   },
   moveBob() {
      snakeBob.forEach(snake => {
         if (snake.hasOwnProperty('calcPosition') && snake.hasOwnProperty('moveTail')) {
            snake.calcPosition()
            snake.moveTail()
         }
      })
   }
}

// initialize Bob's head at start 
head.startPosition()
head.createFruit()

// constructor class to grow Bob
class Growsnake {
   constructor(row, column, length, prevRow, prevCol) {
      this.row = head.prevRow,
         this.column = head.prevCol,
         this.length = head.length


   }
   // methods here
}
// After loading page, starts the game and sets direction. Any further keydown just changes the current direction. Need bugfixing
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

// --------------------------------------------
// hard coding in a few tail pieces to test movement

const snakeOne = document.createElement("div")
snakeOne.classList.add("tail")


const snake1 = {
   length: 2, // to be generated from the length stored in head obj
   row: 0, // to be generated from previous piece
   column: 0, // to be generated from previous piece
   prevRow: 0, // calculated internally after movement
   prevCol: 0, // calculated internally after movement
   prevSpot: [],
   calcPosition() {
      const myPos = this.length - 1
      this.row = snakeBob[myPos - 1].prevSpot[0]
      this.column = snakeBob[myPos - 1].prevSpot[1]
      console.log(`snake1 is at ${this.row}:${this.column}`)
   },
   moveTail() {
      snakeOne.style.gridRows = this.row
      snakeOne.style.gridColumn = this.column
      this.prevSpot[0] = this.row
      this.prevSpot[1] = this.column
   }
}

const snakeTwo = document.createElement("div")
snakeTwo.classList.add("tail2")


const snake2 = {
   length: 3, // to be generated from the length stored in head obj
   row: 0, // to be generated from previous piece
   column: 0, // to be generated from previous piece
   prevRow: 0, // calculated internally after movement
   prevCol: 0, // calculated internally after movement
   prevSpot: [],
   calcPosition() {
      const myPos = this.length - 1
      this.row = snakeBob[myPos - 1].prevSpot[0]
      this.column = snakeBob[myPos - 1].prevSpot[1]
      console.log(`snake2 is at ${this.row}:${this.column}`)
   },
   moveTail() {
      snakeOne.style.gridRows = this.row
      snakeOne.style.gridColumn = this.column
      this.prevSpot[0] = this.row
      this.prevSpot[1] = this.column
   }
}

snakeBob.push(head, snake1, snake2)
map.appendChild(snakeOne)