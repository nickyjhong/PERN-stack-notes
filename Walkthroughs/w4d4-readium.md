# [W4D4 Readium Walkthrough](https://github.com/FullstackAcademy/PairExercise.Readium-with-Redux)
[⬅ Go Back](./walkthrough-directory.md)

## Instructions
- `npm install`
- `createdb readium`
- `npm run seed`
- `npm start`

## The First Route
- `client/components/Main.js`
  - Import HashRouter and make `<Router>` the parent of the main div
  ```Javascript
  import {HashRouter as Router} from 'react-router-dom'
  <Router>
    <div id='main'>
      // omitted for brevity
    </div>
  </Router>
  ```
  - Make a `<Route>` to stories with a component of `StoriesList`
  ```Javascript
  import {Route} from 'react-router-dom'
  
  render () {
      return (
        <Router>
          <div id='main'>
            <div className='column container'>
              <div id='header'>
                <h1>Readium</h1>
              </div>
              <Navbar />
            </div>
            <Route path='/stories' component={StoriesList} />
          </div>
        </Router>
      )
    }
  ```
  - Exact path! We want to make sure that we aren't fuzzy matching (matching both '/' and '/stories')
    - Put the [`exact`](https://v5.reactrouter.com/web/api/Route/exact-bool) prop in front of the '/' path so that it only matches if the path name is EXACT!!!
    - If fuzzy matched, the component will render twice
  ```Javascript
  <Route exact path='/' component={StoriesList} />
  <Route path='/stories' component={StoriesList} />
  ```
## Single Story Route
- Create a new file called SingleStory.js in `client/components`
  - Make this a class component (will eventually hook into `componentDidMount`)
  - Make a new `Route` on `Main` component
    - Import SingleStory
    - Path='/single-story' and component={SingleStory}
  ```Javascript
  import SingleStory from './SingleStory'
  <Route path='/single-story' component={SingleStory} />
  ```
    - This is good if we actually just want a single story, but we want to be dynamic!
      - Use the wildcard like in `express` (React Router has a similar feature)
      - Rewrite '/single-story' `Route`
        - This Route is a sibling of the stories Route!
    ```Javascript
    <Route path="/stories/:storyId" component={SingleStory} />
    ```
  - Add the `exact` prop to `<Route exact path='/stories' component={StoriesList} />` to avoid fuzzy matching!
  - Create a singleStory.js in `client/store` and put in action types, action creators, and a reducer for the new state
    ```Javascript
    const SET_SINGLE_STORY = 'SET_SINGLE_STORY'

    const setSingleStory = (story) => {
      return {
        type: SET_SINGLE_STORY,
        story
      }
    }

    const initialState = {}

    export default (state = initialState, action) => {
      switch (action.type) {
        case SET_SINGLE_STORY:
          return action.story
        default:
          return state
      }
    }
    ```
    - Dispatch the action that updates redux store with single story (THUNK)
      - Import axios
      - Make a thunk called `fetchSingleStory` that takes in the story `id`
      - Take the data from the axios GET call to '/api/stories/${id}' and dispatch it with `setSingleStory`
      ```Javascript
      import axios from 'axios'

      export const fetchSingleStory = (id) => {
        return async (dispatch) => {
          try {
            const { data } = await axios.get(`/api/stories/${id}`)
            dispatch(setSingleStory(data))
          } catch (err) {
            console.log(err)
          }
        }
      }
      ```
  - `client/store/index.js` - import singleStory and add it to the combineReducer
    ```Javascript
    import singleStory from './singleStory'
    ...
    const reducer = combineReducers({
      stories,
      singleStory
    })
    ```
  - `client/components/SingleStory.js`
    - Connect `SingleStory` to redux store
    - Create a `mapStateToProps` and `mapDispatchToProps` and connect component
      - `mapStateToProps` adds a `story` in `state` to `props` from the `singleStory` in `store`
      - `mapDispatchToProps` lets you add a function called `loadSingleStory` to props
    ```Javascript
    import {fetchSingleStory} from '../store/singleStory'
    import {connect} from 'react-redux'

    ...

    const mapStateToProps = (state) => {
      return {
        story: state.singleStory
      }
    }

    const mapDispatchToProps = (dispatch) => {
      return {
        loadSingleStory: (id) => dispatch(fetchSingleStory(id))
      }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(SingleStory)
    ```
    - At this point if you `console.log(this.props)` you'll see {`history`, `loadSingleStory`, `location`, `match`, `story`}
    - `componentDidMount()` 
      - Use the [`match`](https://v5.reactrouter.com/web/api/match) prop!
        - `Match` has a prop called `params` which has a key-value pair corresponding to the value of the url parameter (the part of the url with colon)
    ```Javascript
    componentDidMount () {
      this.props.loadSingleStory(this.props.match.params.storyId)
    }
    ```
    - Replace fake data with real data from state
      - Component initially renders once with the initial state (empty object) before getting real story from the server
      - Need to do "type-checking" to assign default values if untruthy!
      - To fix, add the following to `render()`:
        ```Javascript
        const story = this.props.story
        const content = story.content || '' // default to empty string
        const comments = story.comments || [] // default to empty array
        const title = story.title
        ```
      - The rest of the JSX:
        - Map the comments to account for various amounts of comments
        - `console.log(this.props.story.comments)` will return an array with objects
          - Object: { `author`: {`bio`, `id`, `imageUrl`, `name`}, 
                     `authorId`,
                     `content`,
                     `id`,
                     `storyId` }
        ```Javascript
        return (
          <div id='single-story' className='column'>
            <h1>{title}</h1>
            <p>{content}</p>
            <h3>Responses:</h3>

            <div id='comments'>
              {comments.map((comment) => (
                <div className='comment row' key={comment.id}>
                  <img src={comment.author.imageUrl} />
                  <div className='column'>
                    <a>
                      <h5>{comment.author.name}</h5>
                    </a>
                      <div>{comment.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
        ```
## Using Link
- `client/components/Navbar.js`
  - Change `<a>Stories</a>` to be a `<Link>` to `/stories`
  ```Javascript
  import {Link} from 'react-router-dom';
  ...
  <Link to='/stories'>Stories</Link>
  ```
- `client/components/StoriesList.js`
  - Swap out `<a>` around each story title so it links! 
  - Url should contain the story's id!
  ```Javascript
  import {Link} from 'react-router-dom'

  <div id='stories' className='column'>
    {
      stories.map(story => (
        <div className='story' key={story.id}>
          <Link to={`/stories/${story.id}`} />
            <h3>{story.title}</h3>
            <p>{story.author.name}</p>
          <hr />
        </div>
      ))
    }
  </div>
  ```
## All Authors
- Make a `authors.js` in `/client/store` and create action types, action creators, thunks, and reducers (using `stories.js` as a guide)
  - Same concept as `stories.js` but with authors
  ```Javascript
  import axios from 'axios'

  const SET_AUTHORS = 'SET_AUTHORS'

  export const setAuthors = (authors) => {
    return {
      type: SET_AUTHORS,
      authors
    }
  }

  export const fetchAuthors = () => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get('/api/authors')
        dispatch(setAuthors(data))
      } catch(err) {
        console.log(err)
      }
    }
  }

  const initialState = []

  export default (state = initialState, action) => {
    switch(action.type) {
      case SET_AUTHORS:
        return action.authors
      default:
        return state
    }
  }
  ```
  - Add authors' reducer to combineReducer in `client/store/index.js`
  ```Javascript
  import authors from './authors'

  const reducer = combineReducers({
    stories,
    singleStory,
    authors
  })
  ```
  - Load authors to state when Main component is rendered
    - Import `fetchAuthors`
    - Add `loadAuthors` to `mapDispatchToProps` to be accessed in `componentDidMount`
  ```Javascript
  import {fetchAuthors} from '../store/authors'

  class Main extends React.Component {
  componentDidMount() {
    this.props.loadStories()
    this.props.loadAuthors()
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      loadStories: () => dispatch(fetchStories()),
      loadAuthors: () => dispatch(fetchAuthors())
    }
  }
  ```
- Make `AllAuthors.js` in `client/components` - functional component
  - Connect to redux store
    - `mapStateToProps` - include `authors` so it is accessible as `props`
  - .map the authors to return a list with the author's picture and name

  ```Javascript
  import React from 'react'
  import {Link} from 'react-router-dom'
  import { connect } from 'react-redux'

  export const AllAuthors = (props) => {
    const authors = props.authors
    return (
      <div>
        {
          authors.map(author => (
            <Link to={`/authors/${author.id}`} key={author.id}>
              <div className='author row'>
                <img src={author.imageUrl} />
                <p>{author.name}</p>
              </div>
            </Link>
          ))
        }
      </div>
    )
  }

  const mapStateToProps = (state) => {
    return {
      authors: state.authors
    }}

  export default connect(mapStateToProps)(AllAuthors)
  ```
- `client/components/Navbar.js`
  - Change `<a>Authors</a>` to be a `<Link>` to `/authors`
  ```Javascript
  import {Link} from 'react-router-dom';
  ...
  <Link to='/stories'>Stories</Link>
  <Link to='/authors'>Authors</Link>
  ```
- `client/components/Main.js`
  ```Javascript
  <Route exact path='/authors' component={AllAuthors} />
  ```
- Make `SingleAuthor.js` in `client/components` - class component

- `client/components/Main.js`
  ```Javascript
  <Route path='/authors/:authorId' component={SingleAuthor} />
  ```
## Single Author
- Make `singleAuthor.js` in `/client/store` and create action types, action creators, thunks, and reducers
  - Want to display author information, stories, and comments (according to the image)
  ```Javascript
  import axios from 'axios'

  const SET_SINGLE_AUTHOR = 'SET_SINGLE_AUTHOR'
  const SET_AUTHOR_COMMENTS = 'SET_AUTHOR_COMMENTS'
  const SET_AUTHOR_STORIES = 'SET_AUTHOR_STORIES'

  const setSingleAuthor = (author) => {
    return {
      type: SET_SINGLE_AUTHOR,
      author
    }
  }

  const setAuthorComments = (comments) => {
    return {
      type: SET_AUTHOR_COMMENTS,
      comments
    }
  }

  const setAuthorStories = (stories) => {
    return {
      type: SET_AUTHOR_STORIES,
      stories
    }
  }

  // display single author information
  export const fetchSingleAuthor = (id) => {
    return async (dispatch) => {
      try {
        const {data} = await axios.get(`/api/authors/${id}`)
        dispatch(setSingleAuthor(data))
      } catch (err) {
        console.log(err)
      }
    }
  }

  // display author's comments
  export const fetchAuthorComments = (id) => {
    return async (dispatch) => {
      try {
        const {data} = await axios.get(`/api/authors/${id}/comments`)
        dispatch(setAuthorComments(data))
      } catch (err) {
        console.log(err)
      }
    }
  }
  
  // display author's stories
  export const fetchAuthorStories= (id) => {
    return async (dispatch) => {
      try {
        const {data} = await axios.get(`/api/authors/${id}/stories`)
        dispatch(setAuthorStories(data))
      } catch (err) {
        console.log(err)
      }
    }
  }
  const initialState = {info: {}, comments: [], stories: []}

  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_SINGLE_AUTHOR:
        return {...state, info: action.author}
      case SET_AUTHOR_COMMENTS:
        return {...state, comments: action.comments}
      case SET_AUTHOR_STORIES:
        return {...state, stories: action.stories}
      default:
        return state
    }
  }
  ```
- `client/store/index.js` 
  ```Javascript
  import singleAuthor from './singleAuthor'

  const reducer = combineReducers({
    stories,
    singleStory,
    authors,
    singleAuthor
  })
  ```
- `client/components/SingleAuthor.js
  - Import `fetchSingleAuthor` from `../store/singleAuthor`
  - `mapStateToProps` to add `author` to `props`
  - `mapDispatchToProps` to use `loadSingleAuthor` in `componentDidMount`
  - `componentDidMount` uses `loadSingleAuthor` in `props` with `this.props.match.params.authorId` for specific author
  ```Javascript
  import {connect} from 'react-redux'
  import { fetchSingleAuthor } from '../store/singleAuthor'

  componentDidMount(){
    this.props.loadSingleAuthor(this.props.match.params.authorId)
    console.log(this.props)
  }

  const mapStateToProps = (state) => {
    return {
      author: state.singleAuthor
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      loadSingleAuthor: (id) => dispatch(fetchSingleAuthor(id))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(SingleAuthor)
  ```
  - Fill in real data
    - `console.log(this.props.author)` has {`comments`: [], `info`: {}, `stories`: []}
    - Deconstruct and plug into JSX
      ```Javascript
      const author = this.props.author
      const { name, bio, imageUrl } = author.info
      const stories = author.stories
      const comments = author.comments

      return (
        <div id='single-author' className='column'>
          <div id='single-author-detail' className='row'>
            <div className='column mr1'>
              <h1>{name}</h1>
              <p>{bio}</p>
            </div>
            <img src={imageUrl} />
          </div>
          <hr />
          <div>
            <h4>STORIES</h4>
            <h4>COMMENTS</h4>
          </div>
        </div>
      )
      ```
- Make `CommentsList.js` in `client/components`
  ```Javascript
  import React from 'react'

  export default function CommentsList(props) {
    return (
      <div id='comments'>
        {
          props.comments.map((comment) => (
            <div className='comment row' key={comment.id}>
              <img src={comment.author.imageUrl} />
              
              <div className='column'>
                <a>
                  <h5>{comment.author.name}</h5>
                </a>
                  <div>{comment.content}</div>
              </div>
            </div>
        ))}
      </div>
    )
  }
  ```
  - Import `CommentsList` into `SingleStory` in place of pre-existing JSX / page should still load fine
  - Import 'CommentsList' and `fetchAuthorComments` into 'SingleAuthor
    - Pass in comments as a prop
    - Add `loadAuthorComments` to `mapDispatchToProps` to use in `componentDidMount`
  ```Javascript
  import { fetchAuthorComments, fetchSingleAuthor } from '../store/singleAuthor'
  import CommentsList from './CommentsList'
  ...
  componentDidMount(){
      this.props.loadSingleAuthor(this.props.match.params.authorId)
      this.props.loadAuthorComments(this.props.match.params.authorId)
  }
  ...
  <div>
    <h4>STORIES</h4>
    <h4>COMMENTS</h4>
      <CommentsList comments={comments} />
  </div>
  ...
  const mapDispatchToProps = (dispatch) => {
    return {
      loadSingleAuthor: (id) => dispatch(fetchSingleAuthor(id)),
      loadAuthorComments: (id) => dispatch(fetchAuthorComments(id))
    }
  }
  ```
- Refactor `StoriesList` to just render JSX - Make `AllStories.js` in `client/components` (functional component)
  - Connect to redux by `mapStateToProps({stories: state.stories})
    ```Javascript
    const mapStateToProps = (state) => {
      return {
        stories: state.stories
      }
    }

    export default connect(mapStateToProps)(AllStories)
    ```
  - Import `StoriesList` and return `StoriesList` - include `props.stories` as a prop
    ```Javascript
    const AllStories = (props) => {
      return (<StoriesList stories={props.stories}/>)
    }
    ```
  - In `Main.js`, change `StoriesList` to `AllStories`
  - Delete `mapStateToProps` and connection from `StoriesList` and export default unconnected functional component
  ```Javascript
  export default StoriesList
  ```
- `client/components/SingleAuthor.js`
  - Import `StoriesList` and render in stories `<h4>` and pass in author's stories as prop
  ```Javascript
  import StoriesList from './StoriesList'
  ...
  <div>
    <h4>STORIES</h4>
      <StoriesList stories={stories}/>
    <h4>COMMENTS</h4>
      <CommentsList comments={comments} />
  </div>
  ```
- `client/components/SingleAuthor.js`
  - Add `loadAuthorStories` to `mapDispatchToProps` to use in `componentDidMount`
  ```Javascript
  import { fetchAuthorComments, fetchSingleAuthor, fetchAuthorStories } from '../store/singleAuthor'
  ...
  componentDidMount(){
    this.props.loadSingleAuthor(this.props.match.params.authorId)
    this.props.loadAuthorComments(this.props.match.params.authorId)
    this.props.loadAuthorStories(this.props.match.params.authorId)
  }
  ...
  const mapDispatchToProps = (dispatch) => {
    return {
      loadSingleAuthor: (id) => dispatch(fetchSingleAuthor(id)),
      loadAuthorComments: (id) => dispatch(fetchAuthorComments(id)),
      loadAuthorStories: (id) => dispatch(fetchAuthorStories(id))
    }
  }
  ```
## Writing Sub-Routes
- Pass `props` to `Routes` using `render={() => <ComponentName />}
  - `Link` should lead to `this.props.author.info.id`/comments or /stories (deconstructed in example)
  - Make `<Route>` for specific comments and stories
    - Render the `CommentsList` and `StoriesList` there
  ```Javascript
  import {Link, Route} from 'react-router-dom'
  ...
  render() {
    const author = this.props.author
    const info = author.info
    const { name, bio, imageUrl } = info
    const stories = author.stories
    const comments = author.comments

    return (
      <div id='single-author' className='column'>
        <div id='single-author-detail' className='row'>
          <div className='column mr1'>
            <h1>{name}</h1>
            <p>{bio}</p>
          </div>
          <img src={url} />
        </div>
        <div id='single-author-nav'>
          <Link to={`/authors/${info.id}/comments`}>Comments</Link>
          <Link to={`/authors/${info.id}/stories`}>Stories</Link>
        </div>
        <hr />
        <div>
          <Route path='/authors/:authorId/comments' render={() => <CommentsList comments={comments}/>} />
          <Route path='/authors/:authorId/stories' render={() => <StoriesList stories={stories}/>} />
        </div>
      </div>
    )
  }
  ```