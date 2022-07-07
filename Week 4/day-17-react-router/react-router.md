# React Router
[⬅ Go Back](../week4.md)

## Notes
### **REACT ROUTER IS SPECIFICALLY FOR FRONT END DISPLAYING**
THIS DOES NOT REPLACE EXPRESS (BACKEND) ROUTES

<br>

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
  - HashRouter puts `/#/` in the url which tells us where the route starts
    - Don't need to change anything in Express
  - BrowserRouter doesn't add `/#/` to the url
    - Need to change a few things in Express (is it frontend or backend?)
    - 

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
- 404 Handler
  ```Javascript
  import {Route, Link, Switch} from 'react-router-dom'

  const fourOhFour = (props) => {
    return 
    <h2 className='box'>
      OH NO! Couldn't find page!
      <Link to='/'>Go Home</Link>
    </h2>
  }

  <Switch>
    // Home page
    // <React.Fragment></React.Fragment> is a null component / empty page
    <Route path='/' render={() => <React.Fragment></React.Fragment>} />
    // put this at the bottom to go through everything FIRST. Anything that doesn't match the routes above '*' will return the fourOhFour
    <Route path='*' component={fourOhFour} />
  </Switch>
  ```


### React Router Props
  - History
    - Used to manipulate browser's history programmatically using `history.push`
      - `push` just sends you to another page
      - Other methods: `goBack`, `goForward`
    - `props.history` uses the history rather than a specific link
      - Can use in axios call -> can programmatically move user as a response to something else
    ```Javascript
    class Puppy extends React.Component {
      handleClick = () => {
        console.log('You clicked!')
        this.props.history.push('/elsewhere')
      }
      render() {
        return (
          <button onClick={this.handleClick}>
            Go Elsewhere
          </button>
        )
      }
    }
    ```

  - Location
    ![react-router-props-location](/images/react-router-props-location.png)
    - Contains information about where the URL is currently
    - Don't really use this unless talking specifically about search parameters

  - Match
    - Contains information about how the path matched the current URL
    - Contains `params` key (like Express route for params)
    ```Javascript
    <Route path='/puppies/:puppyId' component={Puppy} />
    const Puppy = (props) => {
      return <div>{props.match.params.puppyId}</div>
    }

    // http://localhost:3000/#/puppies/1
    // props.match.params.puppyId: 1
    ```

    ```Javascript
    import React from 'react'  

    const Cats = (props) => {
      console.log(props)
      return <h2 className='box'>Cats! Cat #{props.match.params.id}</h2>
    }

    export default Cats
    ```
  - **NOTE**: 
    - RENDER LETS US HAVE OUR OWN PROPS!
    - To access routeProps AND add your own props, you need to spread them out:
      ```Javascript
      <Route
        path='/dogs'
        render={(routeProps) => <Dogs {...routeProps} myOwnProps='Nicky' /> }
      />
      ```