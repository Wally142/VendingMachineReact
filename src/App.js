import React, { Component } from 'react';
import './App.css';
import Vending from "./components/Vending";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";

class App extends Component {

  state = {
    items: [],
    money: ''
  }
  constructor(props) {
    super(props)
    this.handleMoney = this.handleMoney.bind(this)
    this.purchase = this.purchase.bind(this)
  }


  componentDidMount() {
    console.log('Vending Machine Items Loaded')
    this.getItems();
  }

  componentDidUpdate() {
    this.getItems();
  }

  handleMoney(event) {
    this.setState({
      money: event.target.value
    })
    let coins = this.state.money
    console.log(coins)
  }

  purchase(id) {
    
    let money = this.state.money
    console.log(`id: ${id}, amount: ${money}`)
    fetch(`http://localhost:8080/money/${money}/item/${id}`)
      .then(response => response.json())
      .catch(error => console.log(`Error with fetch getItems: ${error} `))
  }

  getItems() {
    fetch('http://localhost:8080/items')
      .then(response => response.json())
      .then(itemResponseArray => {
        this.setState({
          items: itemResponseArray
        })
      })
      .catch(error => console.log(`Error with fetch getItems: ${error} `));
  }

  render() {
    return (
      <Wrapper>
        <Title>Awesome Vending Machine</Title>
        {this.state.items.map(item => (
          <Vending
            id={item.id}
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onClick={this.purchase}
          />
        ))}
        <div>
          <p className="deposit">Deposit Money</p>
          <input type="text" value={this.state.money} onChange={this.handleMoney} />
          <p>{this.state.money}</p>
          {/* <button className="btn btn-primary" onClick={this.purchase}>Purchase</button> */}
        </div>
      </Wrapper>

    );
  }
}

export default App;
