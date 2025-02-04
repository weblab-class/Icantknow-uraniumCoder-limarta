
# Creative Alchemy
This is a simple merging game where you drag elements together to form new elements

# How to Play
To start, click the main game button in the left of home page to play the main game, or the find games button to browse all of our available games.
You must log in through google in order to play.

In the game page, simply follow the instructions. Click on elements in the left to move them into the merging board, and drag elements on top of each other to try to merge them.
Don't cheat!! If you drag many elements in the same spot, the game will only try to merge new elements with the first element put in the board.

Progress is automatically saved to our backend database.

# Citations
Borrowed Code From:  https://github.com/weblab-workshops/skeleton
# Project Skeleton

## What we provide

- Google Auth (Skeleton.js & auth.js)
- Socket Infrastructure (client-socket.js & server-socket.js)
  - Disclaimer: Socket isn't being taught until the second week.
- User Model (auth.js & user.js)

## What you need to change

- Change the font in utilities.css
- Change the Frontend CLIENT_ID for Google Auth (Skeleton.js) (we'll talk about it at the end of week 2)
- Change the Server CLIENT_ID for Google Auth (auth.js) (we'll talk about it at the end of week 2)
- Change the Database SRV for Atlas (server.js)
- Change the Database Name for MongoDB (server.js)
- Add a favicon to your website at the path client/dist/favicon.ico
- Update website title in client/dist/index.html
- Update this README file ;)

## Socket stuff
Note: we'll be getting to this in lecture in week 2, so don't worry if you don't know it yet

- If you're not using realtime updating or don't need server->client communication, you can remove socket entirely! (server-socket.js, client-socket.js, and anything that imports them)
- If you are using socket, consider what you want to do with the FIXME in server-socket.js


## How to integrate into your own project

On GitHub download this repository as a zip file, then extract the files into your own repository.
Warning: make sure you copy the hidden files too: .babelrc, .gitignore, .npmrc, and .prettierrc

## don't touch

the following files students do not need to edit. feel free to read them if you would like.

```
client/src/index.js
client/src/utilities.js
client/src/client-socket.js
server/validator.js
server/server-socket.js
.babelrc
.npmrc
.prettierrc
package-lock.json
webpack.config.js
```

## Good luck on your project :)
