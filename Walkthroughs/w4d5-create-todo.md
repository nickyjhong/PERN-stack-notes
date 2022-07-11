# [W4D5 CreateTodo Walkthrough](https://github.com/FullstackAcademy/PairExercise.TodoList.V2)
[⬅ Go Back](./walkthrough-directory.md)

## Introduction
- `npm i`
- `createdb todos`
- `npm run start:dev`

## Adding Todos (debugging)
- Error in DevTools that says "Warning: Failed prop type: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
  - Need to add `onChange` to input
  - Make a `handleChange` function and bind it in constructor
    - `<input.... onChange = {this.handleChange} />`
    - `this.handleChange = this.handleChange.bind(this)`
    - ```Javascript
      handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value
        })
      }
      ```
        - Use `[evt.target.name]` instead of making a setState for each element in the state

## Deleting Todos
- `server/api/todos.js` already has server-side routes
  - The last one is `router.delete`
- Make a new component called `EditTodo` in `client/component`
  - Add a delete button in the `render`
- In `App.js`, make another `<Route>` for `EditTodo`
  ```Javascript
  import EditTodo from './EditTodo';

  <Route path='/todos/:id' component={EditTodo} />
  ```
- **Thunk**
  - Action type and action creators already exist - make the thunk!
    - `client/store/todos.js`
      ```Javascript
      export const deleteTodo = (id, history) => {
        return async (dispatch) => {
          // { data: todo } is renaming the data to todo. Basically saying let todo = data
          const { data: todo } = await axios.delete(`/api/todos/${id}`);
          dispatch(_deleteTodo(todo));
          history.push('/')
        }
      }
      ```
  - Connect the redux store to the component
    - Import `deleteTodo` from the store
    - Create the `constructor` and pass in `props`
    - Make a `mapDispatch` and add `deleteTodo` so it can be used in `handleDelete`
    - Make a `handleDelete` for the button `onClick` and bind it
      - `handleDelete` uses `deleteTodo` and takes in id through `this.props.match.params.id`
    ```Javascript
    import React, { Component } from 'react'
    import { deleteTodo } from '../store/todos';
    import { connect } from 'react-redux'

    export class EditTodo extends Component {
      constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this);
      }
      handleDelete(evt) {
        evt.preventDefault();
        this.props.deleteTodo(this.props.match.params.id);
      }
      render() {
        return (
            <button type='delete' onClick={this.handleDelete}>Delete</button>
        );
      }
    }

    const mapDispatchToProps = (dispatch, { history }) => ({
      deleteTodo: todo => dispatch(deleteTodo(todo, history))
    })

    export default connect(null, mapDispatchToProps)(EditTodo)

    ```
## Editing Todos
- Create the thunk and actions for a specific (single) todo
  - `client/store/todo.js`
    ```Javascript
    const _setTodo = (todo) => {
      return {
        type: SET_TODO,
        todo
      }
    }

    export const fetchTodo = (id) => {
      return async (dispatch) => {
        const { data: todo } = await axios.get(`/api/todos/${id}`)
        dispatch(_setTodo(todo))
      }
    }
    ```
- `componentDidMount` the todo
  - Take the `id` from `this.props.match.params` (can `console.log(this.props)` to see this)
  - `fetchTodo` the id - have access to this because `mapDispatchToProps`
- Use `mapStateToProps` to access data within `EditTodo`
  - Add `fetchTodo`
- Add the JSX (copied and pasted from `CreateTodo` but added `delete` button)
  - Make `handleChange` button (same as `CreateTodo`)
  - `client/components/EditTodo.js`
    ```Javascript
    import { fetchTodo } from '../store/todo';

    componentDidMount() {
      const { id } = this.props.match.params
      this.props.fetchTodo(id);
    }

    render() {
      const { assignee, taskName } = this.state;
      const { handleSubmit, handleChange, handleDelete } = this;
      return (
        <div>
          <form id='todo-form' onSubmit={handleSubmit}>
            <label htmlFor='taskName'>Task Name:</label>
            <input name='taskName' value={taskName} onChange={handleChange}/>

            <label htmlFor='assignee'>Assign To:</label>
            <input name='assignee' value={assignee} onChange={handleChange}/>

            <button type='submit'>Submit</button>

          </form>

          <form>
            <button type='delete' onClick={handleDelete}>Delete</button>
          </form>

        </div>
      );
    }

    const mapStateToProps = (state) => ({
      todo: state.todo
    })

    const mapDispatchToProps = (dispatch, { history }) => ({
      deleteTodo: todo => dispatch(deleteTodo(todo, history)),
      fetchTodo: todo => dispatch(fetchTodo(todo, history))
    })

    export default connect(mapStateToProps, mapDispatchToProps)(EditTodo)
    ```
- [componentDidUpdate](https://reactjs.org/docs/react-component.html#componentdidupdate) - takes in `prevProps`
  - Operate on DOM when component has been updated
  - Good place to do network requests as long as you compare current props to previous props
  ```Javascript
    componentDidUpdate(prevProps) {
    if (this.props.todo.id !== prevProps.todo.id) {
      this.setState({
        taskName: this.props.todo.taskName,
        assignee: this.props.todo.assignee
      })
    }
  }
  ```
    - If the current todo.id is different from the previous todo.id, set the new state! 
      - We can do this because our store and component is hooked up
- Updating
  - `client/store/todos.js`
  ```Javascript
  const _updateTodo = (todo) => {
    return {
      type: UPDATE_TODO,
      todo
    }
  }

  export const updateTodo = (todo, history) => {
    return async (dispatch) => {
      const { data: updated } = await axios.put(`/api/todos/${todo.id}`, todo)
      dispatch(_updateTodo(updated))
      history.push('/')
    }
  }
  ```

  - `client/component/EditTodo.js`
  ```Javascript
  import { deleteTodo, updateTodo } from '../store/todos';

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateTodo({ ...this.props.todo, ...this.state })
  }

  const mapDispatchToProps = (dispatch, { history }) => ({
    deleteTodo: (todo) => dispatch(deleteTodo(todo, history)),
    updateTodo: (todo) => dispatch(updateTodo(todo, history)),
    fetchTodo: (id) => dispatch(fetchTodo(id)),
  })
  ```

- `componentWillUnmount` - current code is preventing page from pre-populating 
  - When we leave the form and go back to the todo list, the form **unmounts**! If it is unmounted, we should clear any data related to that component (single todo data)
  - `client/state/todo.js` - need to export _setTodo to use in `client/components/EditTodo.js` in `mapDispatchToProps`
  ```Javascript
  export const _setTodo = (todo) => {
    return {
      type: SET_TODO,
      todo
    }
  }
  ```

  ```Javascript
  componentWillUnmount() {
    this.props.clearTodo()
  }

  const mapDispatchToProps = (dispatch, { history }) => ({
    deleteTodo: (todo) => dispatch(deleteTodo(todo, history)),
    fetchTodo: (id) => dispatch(fetchTodo(id)),
    clearTodo: () => dispatch(_setTodo({}))
  })
  ```