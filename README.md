# Personal website

A one page website with fullscreen menu. It's used as my personal website and you can check it out at jonasmeissner.com soon (not up yet).

Backend is made by my friend, check out his repository here: https://github.com/zoeesilcock/landing-page

## Installation

```
npm install
npm start
```

## Deployment

```
npm run build
```

## Usage

Fork it and add your own markup, styles and routes.

### Routes

It uses express as the backend and routes are defined in the `src/server.js`
file, see the `src/routes` directory for example routes.

### Styles

Create your own scss files in the `src/styles` directory and import them in
the `src/styles/main.scss` file.

### Views

It uses handlebars as the templating system, see the `src/views` directory for
examples. Currently helpers and partials are defined in the `src/server.js`
file.
