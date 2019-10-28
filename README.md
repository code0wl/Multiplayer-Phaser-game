# Multiplayer Phaser Game docker debug chapter 7

Once you have docker installed. you can build and run local image of this branch

While you are in the project directory then do the following...

## Create the local image

```bash
docker build -t test/chapter7 .
```

PS. this process could take up to a minute. This is because the nodejs installation step is being executed

## Run the local image

```bash
docker run -p 80:3000 -d test/chapter7
```

## Identify the port used

```bash
docker ps
```

For my instance I had to run it on `0.0.0.0:80`

Opening the browser using the normal http protocol should display the game at the chapter 7 state.