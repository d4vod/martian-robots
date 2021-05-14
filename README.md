# Martian robots

## Description
It is 1976 and NASA is about to launch the first robots to Mars, thus we need a way to plan and predict the path of each robot to gather as much information as possible about the land of the martian planet.
In order to have a successful landing, this program will allow users to predict the position of each robot for a limited set of instructions. 

Moreover, to make this more accurate, NASA scientist have taken into consideration the weird shape of Mars:
* It is rectangular, constrained by `x` and `y` axes.
* It is bounded. Meaning if a robot moves out of its limit, it will be lost forever.

Robots move across the Martian surface using a grid coordinate `x` and `y` and an orientation (N, S, E, W). Regarding the instructions, only the following are allowed:
* Left `L`: turn left 90º, ie: a robot heading North when turning to its left it will head to West
* Right `R`: turn right 90º, ie: a robot heading North, will head to East after turning right
* Forward `F`: moves forward one grid point in the direction of the current orientation, maintaining the same orientation.

After loading a valid set of instructions, robots will be able to explore the surface. They will keep track of each taken step, to extract further patterns or data. An exploration will end up showing the final position and orientation. Also, if any of the robots got lost, they will include the word "LOST".

For example, the following input:

```
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

Will produce the output:

```
1 1 E
3 3 N LOST
2 3 S
```

## How to run

### CLI

Run with `node`:

```
  npm run start
```

Run with Docker:

```
  docker run -v "$PWD":/usr/src/app -w /usr/src/app node:alpine sh -c 'npm start'
```

## Tests

```
  npm run test
```


## Tests

```
  npm run test
```
## Tests

```
  npm run test
```
