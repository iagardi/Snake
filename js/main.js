const map = document.querySelector("#map")
const snakeHead = document.querySelector("#snake--head")
const lengthCounter = document.querySelector("#length")
const speedCounter = document.querySelector("#speed")
const minuteCounter = document.querySelector("#timer--minutes")
const secondsCounter = document.querySelector("#timer--seconds")

const snakeLength = []

const basic = {
   gridRows: 40,
   gridColumns: 20,
   length: 1,
   seconds: 00,
   minutes: 0,
   speed: 500, // movement speed, in milliseconds
   speedDisplay: 1, // for external display only
   row: 0,
   column: 0,
   direction: "",
   // to get a random start position within the grid
   startPosition() {
      this.row = Math.floor(Math.random() * Number(this.gridRows)) + 1
      this.column = Math.floor(Math.random() * Number(this.gridColumns)) + 1
      this.positionSnake()
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
            this.row--
            snakeHead.style.gridRow = this.row
            snakeHead.style.gridColumn = this.column
            break
         case "down":
            this.row++
            snakeHead.style.gridRow = this.row
            snakeHead.style.gridColumn = this.column
            break
         case "left":
            this.column--
            snakeHead.style.gridRow = this.row
            snakeHead.style.gridColumn = this.column
            break
         case "right":
            this.column++
            snakeHead.style.gridRow = this.row
            snakeHead.style.gridColumn = this.column
            break
         default:
            snakeHead.style.gridRow = basic.row
            snakeHead.style.gridColumn = basic.column
      }
      // check if Bob is out of the map
      if (this.row < 0 || this.row > 40 || this.column < 0 || this.column > 20) {
         this.gameOver()
      }
   },
   playTimer() { // a second function for the "game speed" timer, to restart each time with the current game speed
      clearInterval(play)
      counter = basic.speed
      play = setInterval(() => {
         console.log("1")
         basic.positionSnake()
         basic.playTimer()
      }, counter)
   },
   gameOver() {
      clearInterval(timer, this.playTimer)
      alert("SUXXXX")
      this.row = Math.floor(this.gridRow / 2)
      this.column = Math.floor(this.gridColumn / 2)
      this.startPosition()
   }
}

// initialize Bob's head at start
basic.startPosition()

// constructor class to grow Bob
class Snake {
   constructor(row, column, length) {
      this.row = basic.row,
         this.column = basic.column,
         this.length = basic.length
   }
}

// Main, elapsed timer. Increases game speed at certain intervals
const timer = () => setInterval(seconds => {
   basic.seconds++
   basic.updateSeconds()
   basic.updateMinutes()
   if (basic.seconds % 10 == 0) {
      basic.speed = basic.speed - 100
      basic.speedDisplay++
      basic.updateSpeed()
   }
}, 1000)

// Game speed timer, made dynamic with a second function. Courtesy of stack overflow
let play


// After loading page, starts the game and sets direction. Any further keydown just changes the current direction. Need bugfixing
window.addEventListener("keydown", event => {
   switch (event.key) {
      case "ArrowUp":
         if (basic.seconds == 0 || !basic.direction) {
            timer()
            // Game speed timer, made dynamic with a second function. Courtesy of stack overflow
            play = setInterval(() => {
               console.log("1")
               basic.positionSnake()
               basic.playTimer()
            }, basic.speed)
            basic.direction = "up"
         } else {
            basic.direction = "up"
         }
         break
      case "ArrowDown":
         if (basic.seconds == 0 || !basic.direction) {
            timer()
            play = setInterval(() => {
               console.log("1")
               basic.positionSnake()
               basic.playTimer()
            }, basic.speed)
            basic.direction = "down"
         } else {
            basic.direction = "down"
         }
         break
      case "ArrowLeft":
         if (basic.seconds == 0 || !basic.direction) {
            timer()
            play = setInterval(() => {
               console.log("1")
               basic.positionSnake()
               basic.playTimer()
            }, basic.speed)
            basic.direction = "left"
         } else {
            basic.direction = "left"
         }
         break
      case "ArrowRight":
         if (basic.seconds == 0 || !basic.direction) {
            timer()
            play = setInterval(() => {
               console.log("1")
               basic.positionSnake()
               basic.playTimer()
            }, basic.speed)
            basic.direction = "right"
         } else {
            basic.direction = "right"
         }
         break
   }
})