- Since we can scale our sprite down with each iteration, why not do the same for color? So far, we only have red as a color for each stamp. This makes it hard to see any sort of pattern. However, you can use **variables** to change the color of each stamp as it repeats.
- A variable is basically a placeholder. You control what value that placeholder has at any point in your code. You just need to set the starting value of the variable, and allow it to change as the code executes.
- ![setvar](./img/setvar.png) allows you to take the variable _color_, and set it to a specific starting value. This way, your design stays the same every time it runs. ![changevar](./img/changevar.png) allows you to update your variable by adding or subtracting a given amount. Using both of these blocks, and the ![repeat](./img/repeat.png), you can assign the ![set color effect](./img/setcoloreffect.png) block to the variable, _color_, and get a color change as your sprite repeats itself!
- ![scolorwheel](./img/colorwheel.png)