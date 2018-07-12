import React, { Component } from 'react';
import './App.css';
import Vending from "./components/Vending";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Change from "./components/Change";


class App extends Component {

  state = {
    items: [],
    money: '',
    quarters: '',
    dimes: '',
    nickels: '',
    pennies: '',
    message: '',
    currentDiv: ''

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
  }

  displayChange = div => {
    this.setState({ currentDiv: div });
  };

  renderPage = () => {
    if (this.state.currentDiv === "Change") {
      return <Change
        quarters={this.state.quarters}
        dimes={this.state.dimes}
        nickels={this.state.nickels}
        pennies={this.state.pennies}
        message={this.state.message}
        currentDiv={this.state.currentDiv}
        displayChange={this.displayChange}
      />
    }
  }


  purchase(id) {
    let money = this.state.money
    console.log(`id: ${id}, amount: ${money}`)
    fetch(`http://localhost:8080/money/${money}/item/${id}`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          quarters: response.quarters,
          dimes: response.dimes,
          nickels: response.nickels,
          pennies: response.pennies,
          message: response.message
        })
        this.displayChange('Change')
      })
      .catch(error => console.log(`Error with purchase: ${error} `));
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
      <div>
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
          </div>
        </Wrapper>
        {this.renderPage()}
      </div>
    );
  }
}

export default App;
