# Mastermind-in-JS
Mastermind made with JavaScript

## How to play
You have several circles at the moments with colors. At the beginning you need to choose some colors to start. Afterwards you will see on the right side, how many little circles are black and how many gray. This will show you how many colors are

1. Black: The right colors and at the right place
2. Gray: The right colors but NOT in the right place
3. White: You picked a color that isn't in the range

## Description about the code
An array "colorcode" is initialized to store the game's secret code.
Variables are initialized to track the player's progress and state: IndexOfColorInArray (to track the index of the last circle the player filled in), buttonClick (to track how many circles the player has filled in on the current turn), win (to indicate if the player has won the game), attempts (to track how many attempts the player has taken), rightPosition and notRightPosition (to track how many of the filled circles are in the correct position and how many are correct but in the wrong position), rightPositionCounter and notRightPositionCounter (used to display the number of correct and incorrect circles in the rating at the end of each turn), winmodal and lostmodal (DOM elements that display modals when the player wins or loses the game), colors (an array of color names to use for the game's circles), and placeholder (a temporary variable used to generate the game's secret code).
The code generates a random secret code by selecting four colors from the "colors" array and storing them in "colorcode". It ensures that the same color is not selected twice by using a while loop that continues generating new random colors until a unique color is found.
The code listens for click events on the game's circles (DOM elements with the class "circles"). When a circle is clicked, the code checks if the player has won or if they have reached the maximum number of attempts (10). If not, it retrieves the clicked circle's color and sets it to hidden, then calls the "rightOrNotRight" function to check if the color is in the right position or not. It then calls the "putSelectedColorInCircle" function to display the selected color in the correct position on the game board. The code increments "buttonClick" to track the number of circles filled in on the current turn, and if four circles have been filled in, the code checks if the player has won or lost the game and updates the game state accordingly. If the player has not won or lost, the code updates the game state to start a new turn and resets the "buttonClick" and "IndexOfColorInArray" variables.
The "rightOrNotRight" function checks if the selected color is in the secret code and if so, whether it is in the correct position or not. If the color is in the code but in the wrong position, "notRightPosition" is incremented; if it is in the correct position, "rightPosition" is incremented.
The "putSelectedColorInCircle" function displays the selected color in the correct position on the game board by setting the background color of the circle at position "buttonClick" in the current attempt's row to the selected color.
The "rateing" function displays the correct and incorrect circles in the rating for the current turn by setting the background color of the rating circles at position "rightPositionCounter" and "notRightPositionCounter" to black and gray, respectively. It also resets the visibility of all circles to visible to show all colors that can be selected in the next turn, and resets "rightPositionCounter" and "notRightPositionCounter".
The "showResult" function is called when the player loses the game and displays the secret code by setting the background color of the result circles to the colors in the "colorcode" array.
The game "Mastermind" is implemented using JavaScript. The game generates a secret code consisting of four colors chosen randomly from an array of color names. The player must guess the code in 10 attempts or less by filling in circles on the game board with colors they select. After each turn, the game provides feedback by displaying the number of circles that are in the correct position and the number of circles that are correct but in the wrong position. The game ends when the player correctly guesses the secret code or when they have used up all of their attempts. The game's state is tracked using variables, and various functions are used to update the game board and provide feedback to the player. Modals are displayed when the player wins or loses the game.

## Errors and findings I would have liked to know
Issue 1: How to get the background-color of an element with JavaScript?<br>
Solution: When you have the code like this:

HTML
```html
<!-- Color options for the user -->
<div id="circle-options">
    <button class="circles"></button>
    <button class="circles"></button>
    <button class="circles"></button>
    <button class="circles"></button>
    <button class="circles"></button>
    <button class="circles"></button>
    <div class="delete"><i class="fa fa-angle-left"></i> Delete</div>
</div>
```

CSS
```css
.circles:nth-child(1) {
    height: 50px;
    width: 50px;
    background-color: pink;
    border-radius: 50%;
    border: 2px solid black;
    margin-right: 2rem;
    cursor: pointer;
}
.circles:nth-child(2) {
    height: 50px;
    width: 50px;
    background-color: red;
    border-radius: 50%;
    border: 2px solid black;
    display: inline-block;
    margin-right: 2rem;
    cursor: pointer;
}
.circles:nth-child(3) {
    height: 50px;
    width: 50px;
    background-color: lightblue;
    border-radius: 50%;
    border: 2px solid black;
    display: inline-block;
    margin-right: 2rem;
    cursor: pointer;
}
.circles:nth-child(4) {
    height: 50px;
    width: 50px;
    background-color: blue;
    border-radius: 50%;
    border: 2px solid black;
    display: inline-block;
    margin-right: 2rem;
    cursor: pointer;
}
.circles:nth-child(5) {
    height: 50px;
    width: 50px;
    background-color: yellow;
    border-radius: 50%;
    border: 2px solid black;
    display: inline-block;
    margin-right: 2rem;
    cursor: pointer;
}
.circles:nth-child(6) {
    height: 50px;
    width: 50px;
    background-color: orange;
    border-radius: 50%;
    border: 2px solid black;
    display: inline-block;
    margin-right: 0.1rem;
    cursor: pointer;
}
```

JavaScript
```javascript
document.addEventListener("click", (e) => {
    var element = e.target;
    if (element.tagName == "BUTTON") {
        console.log(element.style.backgroundColor);
})
```
It won't work, because JavaScript can't see the CSS style from a separate file. 
JavaScript doesn't even show an error message, which is for my opinion quite weird. It just displays anything and when you add the variable to the console.log() function it starts a new line in the console, but it doesn't display something.
The only thing you could do here is to specify the background-color yourself.
Here's the link in where I realised that: <br>
http://www.java2s.com/Tutorials/Javascript/Style/Color/Get_background_Color_in_JavaScript.htm <br>
I was testing the code in codepen.com first and it worked. But when I put all the css into the css folder, I didn't work anymore.
And there I realised this issue. I was a bit disappointing because in the internet no one says that it doesn't work that way.