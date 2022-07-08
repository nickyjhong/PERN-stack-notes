import React from 'react'

export default class SignUpForm extends React.Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: ''
    };
    this.changeHandler = this.changeHandler.bind(this)
  }
  changeHandler(event) {
    // event.target refers to a DOM element specifically
    // console.log(event.target) // <input type='text' name='username' />
    // console.log(event.target.value) // logs every single change made in input. We want this in our state
    const value = event.target.value
    // need to bind this or it won't work
    this.setState({
      [event.target.name]: value
    })
  }
  // create handler that takes an event
  submitHandler(event) {
    // start with console.log to make sure it works -- NEED TO ADD PREVENT DEFAULT FIRST OR IT'LL JUST REFRESH!!
    event.preventDefault();
    // console.log('Submitted');
  
    // .username is in JSX and HTML
    const username = event.target.username.value
    // if we had a backend:
    // const response = await axios.post('/api/login')
  }
  render() {
    // console.log(this.state) // logs state on every page update - will update without pressing submit
    return (
      <form onSubmit={this.submitHandler}>
        <input type ='text' name='username' onChange={this.changeHandler} value={this.state.username} />
        <input type="password" name="password" onChange={this.changeHandler} value={this.state.password} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}