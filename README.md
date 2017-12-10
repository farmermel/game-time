# Game Time - Casey Dallavalle and Melena Suliteanu (FE - Module 2)

Game Time is the first project in Module 2 for Frontend Development at Turing School of Software and Design. 
[Project Specification](http://frontend.turing.io/projects/game-time.html)
[Starter Kit Repository](https://github.com/turingschool-examples/game-time-starter-kit-FEm1) which contains webkit and instructions for setting up testing in mocha.

## Game Inspiration: Winterbells
The game we replicate is [Winterbells](http://www.ferryhalim.com/orisinal/g3/bells.htm). 

## Our Game: SpaceHopper
In SpaceHopper we iterate on Winterbells with the original functionality as well as some added features. 
The bunny and bells from Winterbells become a ufo and planets. Birds that double points become a refueling station. We also add suns that decrement points but don't trigger a loss when the ufo jumps on them. The original game does not have levels, instead bells slowly get smaller as user progresses through the game. In SpaceHopper we add levels, which make the planets generated smaller based on a score threshold. Bunnies in spacesuits appear on all description screens to tie together the themes of Winterbells and SpaceHopper (and because astronaut bunnies are adorable). 

## Implementation
SpaceHopper is drawn on an HTML5 canvas element with div elements laid over it for start, instruction, and loss screens.

## Credits
Winterbells is an [Orisinal](http://www.ferryhalim.com/orisinal/) original game.
We take our planet images from [flaticon](https://www.flaticon.com/) and alter some of their colors.

## SpaceHopper Screenshots

#### Start Screen (fades out to instruction screen after 1.5 seconds)
![Instruction Screen](https://i.imgur.com/ZfQySAA.png)

#### Instruction Screen
![Instruction Screen](https://i.imgur.com/K7zly4z.png)

#### Level One Action
![Level One](https://i.imgur.com/Cb19SPk.png)

#### Level Two
![Level Two](https://i.imgur.com/zwY3MMM.png)

#### Crash Screen:
![Crash Screen](https://i.imgur.com/9rKwTFi.png)
