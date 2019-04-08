# scoop-form

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles for npm
```
yarn run build-npm
```

### Manually modify dist file
Because the utils are also imported within the components, we have some kind of circular dependency here.
I don't know how to solve this yet, so before the `npm publish` command you have to manually adjust the rendered file:
- replace the names `emptyFormElement$1` (etc) with the real names (e.g. `emptyFormElement`)
- in the bottom replace the names as well and remove the `as emptyFormElement` suffix

### Publish on npm
```
npm publish --access public
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
