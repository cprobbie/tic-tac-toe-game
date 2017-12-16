# Naruto tic-tac-toe

I was required to just make a tic-tac-toe game, but as I went I think adding a theme would make this game more interesting.
I used html, css and javascript to create this game as well as Github to deploy.
All the nine sections of the board were just rectangular blocks and deployed as inline-blocks. 
The background changes to the desired symbol as players click.

Six functions were created and implemented in this program.  
- swapPlayer(): simple function to swap player after each click.
- areEqual(): compare if 3 strings are equal. if equal, return true.
- determineWinner(): base on the result array. check if the array has met any of the winning conditions, return true and settle the result.
- display(): to display the corresponding image in the blocks as players click.
- logResults(): to log which player has clicked and which block has been clicked, and update the result array as it goes.
- timeoutWinner: this function was created to force the opponent to win if the current player cannot finish the turn within 3 seconds.
- clearAll(): reset all variables to their initial conditions.

There are more function in the program but they were created for the theme contents instead of the tic-tac-toe game.

 

<a href="https://cprobbie23.github.io/tic-tac-toe-game/">Try it here...</a> Hope you enjoy it.