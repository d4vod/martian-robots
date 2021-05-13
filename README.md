# Martian robots

## Description
Node program to simulate martian expeditions.

## How to run

### API

```
  npm run serve
```

Run with Docker:

```
  docker build -t martian-robots . 
  docker run -p 80:80 -it martian-robots
```

### CLI

Run with `node`:

```
  npm run start
```

Run with Docker:

```
  docker run -v "$PWD":/usr/src/app -w /usr/src/app node:alpine sh -c 'npm install'
```
