# tsup tailwindcss example

This is a simple example to show how to bundle a library with CSS files using tsup.

```
$ npm install
$ npm run build
```

The output CSS file is `dist/index.css`.

In you application, you can import the CSS file like this:

```js
// Import CSS
import '@stark/ui/dist/index.css'

// Import JS
import { MY_CLASS_NAME } from '@stark/ui'
```
