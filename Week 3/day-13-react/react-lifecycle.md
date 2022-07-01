# React Lifecycle
[⬅ Go Back]

![react](/images/react-mounting.png)

## Notes
- Hooks
    - Like adding an eventListener

- ReactDOM.render -> render -> mounted component -> componentDidMount
    - mounted component - can you see it?

    ```Javascript
    class App extends React.Component {
        constructor() {
            super()
            console.log('The constructor has run')
        }
        componentDidMount() {
            console.log('This component HAS MOUNTED!')
        }
        render() {
            console.log('This component rendered!')
            return <div id='app-container'>{/* SOMETHING */}</div>
        }
    }

    // The constructor has run
    // This component rendered!
    // This component has mounted!
    ```
- componentDidMount
    - Fires after the initial rendering
    - Great place to:
        - perform AJAX requests to fetch data from server
        - attach event listeners to non-React elements
    ```Javascript
    class Blog extends React.Component {
        constrcutor(props) {
            super(props)
            this.state = {
                posts: []
            }
        }
        async componentDidMount() {
            const { data: posts } = await axios.get('/api/posts')
            this.setState({ posts }) // same as { posts: posts }
        }
        render() {
            // ...
        }
    }
    ```
- componentWillUnmount
    - Great place to "clean up" things
        - Clear timers or intervals