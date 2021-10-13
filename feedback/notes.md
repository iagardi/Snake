# Feedback

## Goals

1. A working Game - done

   - 100% So many challenging features you have added and have got most of them to work.

2. Practice using Git & Github-flow - done

   - 110% 4 Branches, 21 commits

3. Apply what you are learning - done

- SCSS , Classes etc.... So much good stuff

## Specification

- PSEUDOCODE - not sure

  - Your code is commented so this could be pseudo code.
  - Each part has been broken down into its sections so I am pretty confident in your ability to break a problem down into its steps.

- Github repo & README.MD - technically done

  - Repo has been set up perfect
  - You want to add more to the README.md
    - How much respect do you have for the guys at nokia?
    - Talk about the project, what was the brief? How long did it take?
    - How do you clone it and set it up?
    - The link to the live site?

- 25 Commits - close

  - 21 so close you do have 4 branches as well.

- Use click or key press event in JS - done

- Mobile first/Responsive - not done

  - It is going to be hard to convert this to a mobile game as you are using key press.
  - I think it would mean refactoring it all so its probably best to come back to this. You do have options though.

- No tutorials - done

- Link to the project on your portfolio - not sure

## Overall

This is a great desktop game. You have pushed yourself and even though you were warned about collision detection you have got it working, so kudo's to you. It is crazy how you have managed to get the tail to follow the head using CSS grid. It is a interesting take on the game and I have to applaud you for breaking it down and using grid to solve it. It makes sense.

The styling is simple but when you look at the code you can see how much work you have put into it.

## To work on

There isn't much more to do, in my opinion these should be things to focus on if you have the time.

### Game over restart

I think the thing to work on as a priority is the game over restart. At the moment it breaks the game, or it doesn't want to play ball. A quick fix would be to refresh the page ;). It isn't ideal as you will lose score etc. It is a good fix until you find a solution though.

### You should

1. Update the readme with a little bit more info on it.

2. Style it.

3. If you have time the get it working on Mobile.

   - This might mean that you have a option at the start to choose if it is desktop or mobile?

   - If it is mobile perhaps you add buttons to control the direction.

### Dry & Nested control flow

I think you should try and simplify some of your logic. Sometimes you have to nest if & switch statements but you should try and avoid this as it becomes more and more unreadable the more you nest if statements. If you are doing similar things in each switch try and think how you can avoid repeating your self.

Your code;

```js
window.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowUp":
      if (head.seconds == 0 && head.direction == "") {
        head.direction = "up";
        head.startGame();
      } else {
        head.direction = "up";
      }
      break;
    case "ArrowDown":
      if (head.seconds == 0 && head.direction == "") {
        head.direction = "down";
        head.startGame();
      } else {
        head.direction = "down";
      }
      break;
    case "ArrowLeft":
      if (head.seconds == 0 && head.direction == "") {
        head.direction = "left";
        head.startGame();
      } else {
        head.direction = "left";
      }
      break;
    case "ArrowRight":
      if (head.seconds == 0 && head.direction == "") {
        head.direction = "right";
        head.startGame();
      } else {
        head.direction = "right";
      }
      break;
  }
});
```

could be.

```js
window.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowUp":
      head.direction = "up";
      break;
    case "ArrowDown":
      head.direction = "down";
      break;
    case "ArrowLeft":
      head.direction = "left";
      break;
    case "ArrowRight":
      head.direction = "right";
      break;
  }

  if (head.seconds == 0 && head.direction == "") {
    head.startGame();
  }
});
```

You use the switch to set the `head.direction` then do the if check to start the game afterwards.

Let me know if you want me to explain any of the points from the file.

---
