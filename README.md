# Spotify Node Now Playing

![Image](img/preview.gif)

Local Node.js app designed for serving an html page with album art and animations.  This was written to be used as an overlay on Twitch.tv using [Open Broadcaster Software](https://obsproject.com/) with the [CLR Browser Plugin](https://obsproject.com/forum/resources/clr-browser-source-plugin.22/).

Note: The [spotify-node-web](https://github.com/TooTallNate/node-spotify-web) dependency is not officially supported by Spotify. Therefore, it breaks quite regularly. The following [fix](https://github.com/TooTallNate/node-spotify-web/issues/87) must be implemented into the npm package manually until it is rolled around to the npm package.

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
    - `export SPOTIFY_USERNAME=username`
    - `export SPOTIFY_PASSWORD=password`
4. `npm start`
5. Point the OBS CLR Browser plugin to `http://localhost:1337/index.html`