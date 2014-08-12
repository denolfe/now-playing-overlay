# Now Playing Overlay

![Image](img/preview.gif)

A music overlay for streaming on [Twitch.tv](http://www.twitch.tv/). It includes song information, album art, and flashy jQuery animations when a song is started or changed.

It is a Node.js app which serves an html page to be used in [Open Broadcaster Software](https://obsproject.com/) with the [CLR Browser Plugin](https://obsproject.com/forum/resources/clr-browser-source-plugin.22/).

**Note**: The [spotify-node-web](https://github.com/TooTallNate/node-spotify-web) dependency is not officially supported by Spotify. Therefore, it breaks quite regularly. 

~~The following [fix](https://github.com/TooTallNate/node-spotify-web/issues/87) must be implemented into the npm package manually until it is rolled around to the npm package.~~

The lib is currently unable to pull album art successfully until [this issue](https://github.com/TooTallNate/node-spotify-web/issues/87) is resolved.  It pulls in a generic album cover when no artwork is retrieved from the API.

Preview of it in action:

[![Spotify Overlay](http://img.youtube.com/vi/3AQ2ZLvIwDw/0.jpg)](https://www.youtube.com/watch?v=3AQ2ZLvIwDw)

## Dependencies

1. Spotify with Premium Account
2. Node.js
3. AutoHotkey

### Optional (in order to stream)

1. [Open Broadcaster Software](https://obsproject.com/)
2. [CLR Browser Plugin](https://obsproject.com/forum/resources/clr-browser-source-plugin.22/)

## Usage

1. Clone Repo
2. cd into repo, `npm install`
3. Set up credentials
    - `export SPOTIFY_USERNAME=username` use `SET` if using windows command prompt
    - `export SPOTIFY_PASSWORD=password` use `SET` if using windows command prompt
4. `npm start`
5. Point the OBS CLR Browser plugin to `http://localhost:1337/index.html`

## To Do

1. Solve issues when songs are changed too quickly.
2. Replace AutoHotkey with pure Node solution to get currently playing song
3. Implement Last.fm API for album art as fallback for Spotify's API
4. Optional positions and animation directions
