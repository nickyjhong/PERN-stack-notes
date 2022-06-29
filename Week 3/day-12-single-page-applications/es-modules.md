# ES Modules

## Notes
- Front-end modules
- To build more sophisticated web apps
- Keywords:

``` Javascript
import <thing> from '<file>'
export <thing>
export default <thing>
```
### **Node.js Common JS style modules:**
- only supports synchronous module loading
- are dynamic (more flexible) 

**Default Export**
``` Javascript
a.js

const foo = () => {}

module.exports = foo

b.js

const foo = require('./a')
```
**Named Export**
```Javascript
a.js

const foo = () => {}
const bar = 'bar'

module.exports = {
    foo: foo,
    bar: bar
}

b.js

const {foo, bar} = require('./a')
```

- We **CANNOT** simultaneously use `named` and `default` exports in CommonJS modules


### **Import/export designed:**
- supports both sync and async module
- are not dynamic, which allows statis analysis --> restriction to more effectively eliminate bugs

**Default Export**
```Javascript
a.js 

const foo = () => {}
export default foo
// there can only be one export default

b.js

import foo from './a'
```
**Named Export**
```Javascript
a.js

export const foo = () => {}
export const bar = 'bar'

b.js

import {foo, bar} from './a'
```
- We **CAN** use `named` and `default` exports using ES Modules!
```Javascript
a.js

const foo = () => {}
const bar = 'bar'
const baz = 42

export foo
export bar
export default baz

b.js

import {foo, bar}, baz from './a'
```

## Webpack
- Use Webpack to compile code
    - Tool to put code together in one file
    - Traces dependencies so final bundled file has everything we need

### Configuration
1. `npm install --save-dev webpack webpack-cli`
2. Run `webpack` from the command line or:
    1. Create a file called `webpack.config.js`
    2. Within the config file:
        - **Mode**: "development mode" and "production mode"
        - **Entry**: tells Webpack where to start
        - **Output**: where to put resulting file and what to name it
            - Most common names are `bundle.js` or `main.js`
            - Client-facing resources in `public` folder but also can be `dist`

```Javascript
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    }
}
```
3. package.json -> scripts
```Javascript
"build": "webpack",
"build-watch": "webpack -w"
```
4. Run webpack using build script `npm run build`
    - `npm run build-watch` to auto-update code