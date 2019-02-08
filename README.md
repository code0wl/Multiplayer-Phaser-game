# Multiplayer Phaser Game

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b1f5cc255c5f40b4a1dcc6f0431447a5)](https://www.codacy.com/app/o.lodriguez/Multiplayer-Phaser-game?utm_source=github.com&utm_medium=referral&utm_content=code0wl/Multiplayer-Phaser-game&utm_campaign=badger)
[![Build Status](https://travis-ci.org/code0wl/Multiplayer-Phaser-game.svg?branch=develop)](https://travis-ci.org/code0wl/Multiplayer-Phaser-game)

[![Apress book](https://images-na.ssl-images-amazon.com/images/I/41rqssFcz6L._SX327_BO1,204,203,200_.jpg)](https://www.apress.com/gp/book/9781484242483)

# Use great technologies

Such as TypeScript, Phaser and socket.io to create a fun little multi-player
game that can entertain you and your friends for a minute or two.

You will learn to animate sprites, work with physics, and develop logic to
create a modern multi-player spaceship shooter!

[The book is found here on Apress](https://www.apress.com/gp/book/9781484242483)

[A Live preview of the game is available](http://codeowl.tech/game)

Once you have forked or downloaded this repository you can start it with the following command

## How to run a preview

```bash
npm start
```

## Known issues
1. Currently when a ship gets destroyed, the window just refreshes with `location.reload()`. Updating this code with `location.reload(true)` will fix the issue where the reload causes just a black screen to appear. This forces the browser to reload all assets instead of partially reloading them, which in turn fixes the bug. This branch includes the fix, but in the book the issue is still there.

# Multiplayer functionality
If you are running on a local server on your computer, opening a second browser window and visiting the same `localhost` port (3000) will simulate the multi-player functionality.

## Issues
No project is without issues. Since this is associated with a printed book. The book sadly cannot fix any encountered issues. If encountered. Please mention the issues associated with this [github repo](https://github.com/code0wl/Multiplayer-Phaser-game/issues). I will then drop anything I am doing to assist as best I can! Thank you for your support and for giving me the opportunity to write something for you.
