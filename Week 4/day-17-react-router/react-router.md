# React Router
[⬅ Go Back](../week4.md)

## Notes
- AJAX!
  - To deal with url bar:
    - Use HTML5 Browser History API, or
    - Manipulate Document Fragment Identifier (#)

- React Router helps keep url in sync with what's being shown on the page
  - Also helps with navigation control

- What we need:
  - A router (HashRouter or BrowserRouter)
    - Similar to `<Provider>` for React-Redux
      - Needs to be the parent of almost everything because when the url changes, the Router component changes the state, which causes everything beneath it to re-render
      ```Javascript
      // HashRouter or BrowserRouter! Don't have to change everything else :)
      import React from 'react'
      import {createRoot} from 'react-dom/client'
      import {HashRouter as Router} from 'react-router-dom'
      // import {BrowserRouter as Router} from 'react-router-dom'

      const Main = () => {
        return (
          <Router>
          {/* basically everything else */}
          </Router>
        )
      }

      // OR

      const root = createRoot(document.getElementById('app'))

      root.render(
        <Provider>
          <Router>
            <Main />
          </Router>
        </Provider>
      )

      // Provider or Main can be first -- does not matter as long as Main is wrapped
      ```

  - Routes
    - Route = Path + Component
    - Lets us know when url bar matches a route, what to render
    ```Javascript
    <Route path='/somePath' component={SomeComponent} />
    ```
    ![React-Router-Route](/images/react-router-route.png)

    ```Javascript
    import React from 'react'
    import {createRoot} from 'react-dom/client'
    import {HashRouter as Router, Route} from 'react-router-dom'

    const Dogs = (props) => {
      return <h2>THIS IS THE DOGS COMPONENT</h2>
    }

    const Main = (props) => {
      return (
        <div id='container'>
          <div id='navbar'>{<ul></ul>}</div>

          <div id='main-section'>
            <Route path='/dogs' component={Dogs}>
            <h3>This is after Dogs </h3>
          </div>
        </div>
      )
    }
    ```
    - Fuzzy matching 
    - Just like `app.use`
    ![React-Router-Fuzzy](/images/react-router-fuzzy.png)
      - If you don't want fuzzy matching, you can do:
        ```Javascript
        <Route exact path='/somePath' component={SomeComponent} />
        ```
  - Link
    - Like an `<a>` tag but better
    - Redirect url without refreshing page
    ```Javascript
    <Link to='somePath'>Go to Some Path</Link>
    ```

    ![React-Router-Link](/images/react-router-link.png)
    ```Javascript
    import React from 'react'
    import {createRoot} from 'react-dom/client'
    import {HashRouter as Router, Route, Link} from 'react-router-dom'

    const Dogs = (props) => {
      return <h2>THIS IS THE DOGS COMPONENT</h2>
    }

    const Main = (props) => {
      return (
        <div id='container'>
          <div id='navbar'>
            {
              <ul>
                <Link to='/dogs'>Dogs</Link>
                <Link to='/dogs/special'>Special</Link>
                <Link to='/cats'>Cats</Link>
              </ul>
            }
          </div>

          <div id='main-section'>
            <Route path='/dogs' component={Dogs}>
            <h3>This is after Dogs </h3>
          </div>
        </div>
      )
    }
    ```