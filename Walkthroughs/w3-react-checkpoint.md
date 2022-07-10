# [W3 React Checkpoint Walkthrough](https://github.com/FullstackAcademy/Checkpoint-React-v2)
[⬅ Go Back](./walkthrough-directory.md)

## Instructions
- `npm install`
- `npm test`
- `npm start`

## Tier 1: SinglePet Component
- `src/components/SinglePet.js`
  - `console.log(this.props)` returns {pet: {...}}
  - Deconstruct the `name`, `description`, and `species` out of `this.props.pet`
    ```Javascript
    render() {
        console.log(this.props)
        const { name, description, species } = this.props.pet

        return (
          <div className="single-pet">
            <h3>{name}</h3>
            <p>{description}</p>
            <p>{species}</p>
          </div>
        )
      }
    ```
  - Toggle status for adoption - make a key in state called `adopted` and set to `false`
    - False = 'Available for adoption'
    - True = 'Adopted!'
  - Make a buttonToggle method
    - setState takes the previous state and sets adopted to the opposite of the previous state's adopted status (true <-> false)
    ```Javascript
    class SinglePet extends React.Component {
      constructor() {
        super()

        this.state = {
          adopted: false
        }
        this.buttonToggle = this.buttonToggle.bind(this)
      }
      buttonToggle() {
        this.setState((prevState) => ({ adopted: !prevState.adopted }))
      }
      render() {
        console.log(this.props)
        const { name, description, species } = this.props.pet

        return (
          // if this.state.adopted is true, the adopted css class will apply
          <div className={`single-pet ${this.state.adopted ? 'adopted' : ''}`}>
            <h3>{name}</h3>
            <p>{description}</p>
            <p>{species}</p>

            <!-- this.state.adopted can be deconstructed
            this will either display "Adopted!" or "Available for adoption" depending on state -->

            <p>{this.state.adopted ? 'Adopted!' : 'Available for adoption'}</p>

            <!-- this can also be deconstructed
            this will trigger the state to go from true <-> false -->

            <button onClick={this.buttonToggle}>Toggle Status</button>
          </div>
        )
      }
    }
    ```

## Tier 2: PetList Component
- `src/components/PetList.js`
  - `console.log(this.props)` returns an array of pet objects
    - .map over this.props.pets to just get the name of each pet (make the `key={pet.name}`)
    ```Javascript
    class PetList extends React.Component {
      render() {
        console.log(this.props)
        return (
          <>
            <div className="pet-list">
              {this.props.pets.map(pet => {
                return (
                  <SinglePet key={pet.name} pet={pet} />
                )
              })}
            </div>
          </>
        );
      }
    }
    ```
  - Basic dropdown menu:
    ```Javascript
    <div className="drop-down">
      <label>
      Filter by species:
        <select>
          <option>all</option>
          <option>cats</option>
          <option>dogs</option>
        </select>
      </label>
    </div>
    ```
  - To toggle by filter
    - Make the key `filtered` in `this.state` and set to `all` (default)
    - Add an `onChange={this.handleChange}` to `<select>`
    - `handleChange` will set the state of `filtered` to whichever animal is selected 
    - Make a filter to render only cats, only dogs, or all (do this before render)
      - When something is selected, the state will change to that value
      - If the value of `this.state.filtered` === the select value, the pet list will be filtered. When it is mapped, it will only show the pet names
    - The `value` of `<select>` will be whatever `this.state.filter` is set to
    ```Javascript
    class PetList extends React.Component {
      constructor() {
        super()

        this.state = {
          filtered: 'all'
        }
        this.handleChange = this.handleChange.bind(this)
      }
      handleChange(event) {
        this.setState({filtered: event.target.value})
      }
      render() {
        const petFilter = this.props.pets.filter((pet) => {
          if (this.state.filtered === 'cats') {
            return pet.species === 'cat'
          } else if (this.state.filtered === 'dogs') {
            return pet.species === 'dog'
          } else {
            return pet
          }
        })
        return (
          <>
            <div className="drop-down">
              <label>
                Filter by species:
                <select value={this.state.filtered} onChange={this.handleChange}>
                  <option>all</option>
                  <option>cats</option>
                  <option>dogs</option>
                </select>
              </label>
            </div>
            <div className="pet-list">
              {petFilter.map(pet => {
                return (
                  <SinglePet key={pet.name} pet={pet} />
                )
              })}

            </div>
          </>
        );
      }
    }

    export default PetList;
    ```
## Root Component
- `src/components/Root.js`
  - State should have a key called `pets` that is set to an empty array
  - Make an async function called `fetchPets` that awaits an axios GET call to '/api/pets' (given in specs)
    - setState so `this.state.pets` is equal to the `data` from the axios call
  - `componentDidMount` calls the new `fetchPets` function

  ```Javascript
  class Root extends React.Component {
    constructor() {
      super()
      this.state = {
        pets: [],

      }
    }
    async fetchPets() {
      try {
        const { data } = await axios.get('/api/pets')
        this.setState({pets: data})
      } catch(error) {
        console.error(error)
      }
    }
    componentDidMount() {
      this.fetchPets()
    }
    render() {
      return (
        <>
          <h1>Adoption Center</h1>
          <PetList pets={this.state.pets} />
        </>
      );
    }
  }

  export default Root;
  ```
  - Loading
    - Make a key in `this.state` called `loading` and set to `true`
    - In `fetchPets`, update `this.setState` to include `loading`
      - Before axios GET, `loading` is `true`
      - After axios GET, `loading` is `false`
    - In `render`, if `this.state.loading` is true, show `<h2>Loading</h2>`

    ```Javascript
    constructor() {
        super()
        this.state = {
          pets: [],
          loading: true
        }
      }
      async fetchPets() {
        try {
          this.setState({loading: true})
          const { data } = await axios.get('/api/pets')
          this.setState({pets: data, loading: false})
        } catch(error) {
          console.error(error)
        }
      }
      render() {
        return (
          <>
            {this.state.loading && <h2>Loading</h2>}
            <h1>Adoption Center</h1>
            <PetList pets={this.state.pets} />
          </>
        );
      }
    ```
  - Error 
    - Make a key in `this.state` called `error` and set to `null` (there shouldn't be an error to start with)
    - In `fetchPets`, update the catch `this.setState` so `error: error.message` and `loading: false`
      - `this.state.error` is set to the error.message from the catch to be rendered 
    - In `render`, if `this.state.error` is true, show `<h2>Error! {this.state.error}</h2>`

    ```Javascript
    class Root extends React.Component {
      constructor() {
        super()
        this.state = {
          pets: [],
          loading: true,
          error: null
        }
      }
      async fetchPets() {
        try {
          this.setState({loading: true})
          const { data } = await axios.get('/api/pets')
          this.setState({pets: data, loading: false})
        } catch(error) {
          this.setState({error: error.message, loading: false})
        }
      }
      componentDidMount() {
        this.fetchPets()
      }
      render() {
        return (
          <>
            {this.state.loading && <h2>Loading</h2>}
            {this.state.error && <h2>Error! {this.state.error}</h2>}
            <h1>Adoption Center</h1>
            <PetList pets={this.state.pets} />
          </>
        );
      }
    }

    export default Root;
    ```