const map = document.querySelector("#map")
const snakeHead = document.querySelector("#snake--head")
const lengthCounter = document.querySelector("#length")
const speedCounter = document.querySelector("#speed")
const minuteCounter = document.querySelector("#timer--minutes")
const secondsCounter = document.querySelector("#timer--seconds")

const snakeLength = []

const basic = {
   length: 1,
   seconds: 00,
   minutes: 0,
   speed: 1000,
   speedDisplay: 1,
   row: 30,
   column: 15,
   direction: "",
   updateLength() {
      lengthCounter.innerHTML = this.length
   },
   updateSpeed() {
      speedCounter.innerHTML = this.speed
   },
   updateSeconds() {
      const pad = (second) => {
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
   positionSnake() {
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
   },
   playTimer() {
      clearInterval(play)
      counter = basic.speed
      play = setInterval(basic.playTimer, counter)
   }
}

basic.positionSnake()

class Snake {
   constructor(row, column, length) {
      this.row = basic.row,
         this.column = basic.column,
         this.length = basic.length
   }
}

const snakeStart = snakeLength.push(new Snake(basic.row, basic.column, basic.length))

const timer = () => setInterval(seconds => {
   basic.seconds++
   basic.updateSeconds()
   basic.updateMinutes()
   if (basic.seconds % 5 == 0) {
      basic.speed = basic.speed - 100
      console.log(basic.speed)
   }
}, 1000)

let play = setInterval(() => {
   console.log("1")
   basic.positionSnake()
   basic.playTimer()
}, basic.speed)

window.addEventListener("keydown", event => {
   switch (event.key) {
      case "ArrowUp":
         if (basic.seconds == 0 || !basic.direction) {
            timer()

            basic.direction = "up"
         } else {
            basic.direction = "up"
         }
         break
      case "ArrowDown":
         if (basic.seconds == 0 || !basic.direction) {
            timer()

            basic.direction = "down"
         } else {
            basic.direction = "down"
         }
         break
      case "ArrowLeft":
         if (basic.seconds == 0 || !basic.direction) {
            timer()

            basic.direction = "left"
         } else {
            basic.direction = "left"
         }
         break
      case "ArrowRight":
         if (basic.seconds == 0 || !basic.direction) {
            timer()

            basic.direction = "right"
         } else {
            basic.direction = "right"
         }
         break
   }
})