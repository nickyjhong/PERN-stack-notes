# [W1 DOM Checkpoint Walkthrough](https://github.com/FullstackAcademy/Checkpoint.DOM)
[⬅ Go Back](./walkthrough-directory.md)

## Instructions
- `npm install`
- `npm  test`
- `npm run`

## Slice 1: Clicking & Incrementing Coffee]
- `updateCoffeeView` function
  - Call `document.getElementById()` - go to `index.html` to get the id `coffee_counter`
  ```Javascript
  function updateCoffeeView(coffeeQty) {
    const coffeeCounter_span = document.getElementById('coffee_counter')
    coffeeCounter_span.innerText = coffeeQty
  }
  ```
- `clickCoffee` function
  - `data` object has a key called `coffee` with an initial value of 0
  - Use the `updateCoffeeView` function to update the quantity
  ```Javascript
  function clickCoffee(data) {
    data.coffee++
    updateCoffeeView(data.coffee)
  }
  ```

## Slice 2: Unlocking and Rendering Producers
- `unlockProducers` function
  - `data` object has a new key called `producers` whose value is an array with `id`, `price`, `unlocked`
  - .map the producers to check if each producer should be unlocked - do not add an else statement or it will lock the producer again
  ```Javascript
  function unlockProducers(producers, coffeeCount) {
    producers.map(producer => {
      if (coffeeCount >= producer.price / 2) {
        producer.unlocked = true;
      }
    })
  }
  ```
- `getUnlockedProducers` function
  - .filter the producers to only return the ones where `producer.unlocked === true` (or `producer.unlocked`)
  ```Javascript
  function getUnlockedProducers(data) {
    return data.producers.filter(producer => producer.unlocked === true)
  }
  ```
- `makeDisplayNameFromId` function
  - .split each name using ('_')
  - .map over the array
    - Capitalize the first letter using .charAt(0) and .toUpperCase()
    - Add on the rest of the name using .slice(1)
  - .join the array back into a string using (' ')
  ```Javascript
  function makeDisplayNameFromId(id) {
    return id
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  ```
- `makeProducerDiv` function is already written out and will pass specs
- [`deleteAllChildNodes`](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild) function
  - While the parent node still has a child, remove that child
  ```Javascript
  function deleteAllChildNodes(parent) {
    while(parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  ```
- [`renderProducers`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) function
  - Call `document.getElementById()` to get `producer_container`, which holds all of the producers
  - Call `unlockProducers()` function - takes in producers and coffeeCount
  - Call `deleteAllChildNodes()` - takes in a parent
  - Call `getUnlockedProducers()` - which takes in data
    - Append the child
    ```Javascript
    function renderProducers (data) {
      const producerContainer = document.getElementById('producer_container')
      unlockProducers(data.producer, data.coffee)
      deleteAllChildNodes(producerContainer)
      getUnlockedProducers(data)
        .map(producer => producerContainer.appendChild(makeProducerDiv(producer)))
    }
    ```
- `clickCoffee` function 
  - Go back to `clickCoffee` function and add `renderProducers` to update the DOM to reflect newly unlocked producers
  ```Javascript
  function clickCoffee(data) {
    data.coffee++;
    updateCoffeeView(data.coffee);
    renderProducers(data);
  }
  ```
## Slice 3: Buying Producers and  Tick
- `getProducerById` function
  ```Javascript
  function getProducerById(data, producerId) {
    return data.producers.find(producer => producer.id === producerId)
  }
  ```
- `canAffordProducer` function
  - Compare the amount of coffee in data to the producer's price (use `getProducerById`)
  ```Javascript
  function canAffordProducer(data, producerId) {
    return data.coffee >= getProducerById(data, producerId).price 
  }
  ```
- `updateCPSView` function
  - Call `document.getElementById()` to get `cps`
  - Make the innerText = cps
  ```Javascript
  function updateCPSView(cps) {
    const cps_span = document.getElementById('cps');
    cps_span.innerText = cps;
  }
  ```
- `updatePrice` function
  - `parseInt()` and `Math.floor` to get an integer that is rounded down
  ```Javascript
  function updatePrice(oldPrice) {
    return parseInt(Math.floor(oldPrice * 1.25))
  }
  ```
- `attemptToBuyProducer` function
  ```Javascript
  function attemptToBuyProducer(data, producerId) {
    if (canAffordProducer(data, producerId)) {
      let producer = getProducerById(data, producerId);
      producer.qty++;
      data.coffee -= producer.price;
      producer.price = updatePrice(producer.price)
      data.totalCPS += producer.cps
      return true
    } else {
      return false
    }
  }
  ```
- `buyButtonClick` function
  - Alert using `window.alert('')` (else statement)
  - `event` is given with `target` and `tagname` keys (`event.target.tagName`)
    - If this is equal to the tagName (`BUTTON`)
    - Get the producer id by taking off the 'buy_' in the id using .slice(4)
      - Use `attemptToBuyProducer` as a boolean to see whether to use `renderProducer`, `updateCoffeeView`, and `updateCPSView`

  ```Javascript
  function buyButtonClick(event, data) {
    if (event.target.tagName === 'BUTTON') {
      let producerId = event.target.id.slice(4)
      let canBuy = attemptToBuyProducer(data, producerId)
      if(canBuy) {
        renderProducers(data);
        updateCoffeeView(data.coffee);
        updateCPSView(data.totalCPS)
      } else {
        window.alert('Not enough coffee!')
      }
    }
  }
  ```
- `tick` function
  ```Javascript
  function tick(data) {
    data.coffee += data.totalCPS;
    updateCoffeeView(data.coffee);
    renderProducers(data);
  }
  ```