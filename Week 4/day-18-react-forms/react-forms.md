# React Forms
[⬅ Go Back](../week4.md)

## Notes
- Traditional forms
  ```Javascript
  <form method="post" action="/purchase">
    <!--inputs go here -->
    <button type="submit">Submit</button>
  </form>
  ```

- AJAX Forms
  - Use JavaScript instead of default HTML behavior
  - Add event listener for 'submit' event
  - **Prevent default behavior!**
  ```Javascript
  const form = document.getElementById('purchaseForm')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const firstName = event.target.username.value
    const lastName = event.target.lastName.value
    const address = event.target.address.value


    await axios.post('/api/purchase', {
      firstName, lastName, address
    })
    //etc
  })

  ```
## [Form Demo](react-forms.md)

### How to get data
- Collect from the change event while users are typing
  - Place the data on state
  - Able to calculate validations with each change
- Collect from the submit event
  - Does not keep any form data on state
  - Unable to perform any inline validation

<br>
- Controlled form components have their values directly controlled by state
  - Changes to the value on state update what you see in the form
  - Changes to what you see in the form update the value on state
  - Much easier to programmatically handle form's data

- Uncontrolled form components
  - Changes to what you see in the form update the value on state
  - BUT NOT THE OTHER WAY AROUND!!!
  ```Javascript
  render() {
    <form onSubmit={this.handleSubmit}>
      <input name='username' onChange={this.handleChange}>
      <button type='submit'>Submit</button>
    </form>
  }
  ```
    - Becomes controlled when you add `value={this.state.username}` to `input`
