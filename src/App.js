import React from "react";
import './App.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      socks: [{ color: 0 }],
      pair: 0,
      money: 0,
      toy: [{ price: 0 }],
      totalToy: 0
    };
  }

  handleMoneyChange = evt => {
    this.setState({ money: evt.target.value });
  };

  handleSocksChange = idx => evt => {
    const newSocks = this.state.socks.map((socks, sidx) => {
      if (idx !== sidx) return socks;
      return { ...socks, color: evt.target.value };
    });

    this.setState({ socks: newSocks });
  };

  handleToyChange = idx => evt => {
    const newToy = this.state.toy.map((toy, sidx) => {
      if (idx !== sidx) return toy;
      return { ...toy, price: evt.target.value };
    });

    this.setState({ toy: newToy });
  };

  handleSubmitSocks = evt => {
    const { socks } = this.state;
    var newSocks = [];
    for (var k = 0; k < socks.length; k++) {
      newSocks.push(socks[k].color);
    }
    console.log(newSocks);
    var pairs = 0;
    for (var i = 0; i < socks.length; i++) {
      for (var j = i+1; j < socks.length; j++) {
          if (socks[i].color === socks[j].color) {
              socks.splice(j, 1);
              pairs = pairs + 1;
              break;
          }
      }
    }
    console.log(pairs, "pasang kaos kaki");
    this.setState({ pair: pairs });
    this.setState({ socks: [{ color: 0 }] });
  };

  handleSubmitToy = evt => {
    const { toy, money } = this.state;
    var newToy = [];
    for (var i = 0; i < toy.length; i++) {
      newToy.push(toy[i].price);
    }
    console.log(newToy);
    console.log(money);
    newToy.sort(function(a, b){return a - b});
    function hitung(newToy) {
      var jumlah = 0;
      var hasil = parseInt(newToy[0]);
      for (var j = 0; j < newToy.length; j++) {
          for (var k = j+1; k < newToy.length; k++) {
              hasil = hasil + parseInt(newToy[k]);
              jumlah = jumlah + 1;
              if (hasil > money) {
                  return jumlah
              }
          }
      }
    }
    var jumlah = hitung(newToy);
    console.log("jumlah mainan yang dapat dibeli",jumlah);

    this.setState({ totalToy: jumlah });
  };

  handleAddSocks = () => {
    this.setState({
      socks: this.state.socks.concat([{ color: 0 }])
    });
  };

  handleAddToy = () => {
    this.setState({
      toy: this.state.toy.concat([{ price: 0 }])
    });
  };

  handleRemoveSocks = idx => () => {
    this.setState({
      socks: this.state.socks.filter((s, sidx) => idx !== sidx)
    });
  };

  handleRemoveToy = idx => () => {
    this.setState({
      toy: this.state.toy.filter((t, sidx) => idx !== sidx)
    });
  };

  render() {
    const { pair, totalToy } = this.state;
    return (
      <div>
          <div className="grid-container pa4">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Question 1</legend>
                <label className="db fw6 lh-copy f5" htmlFor="name">
                  example for Question 1: [10, 20, 20, 10, 10, 30, 50, 10, 20]
                </label>
                  {this.state.socks.map((socks, idx) => (
                    <div className="mt3" key={idx}>
                      <label className="db fw6 lh-copy f6" htmlFor="name">Socks</label>
                      <div className="grid-container">
                        <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="number" 
                        name="socks"  
                        id="socks"
                        onChange={this.handleSocksChange(idx)}
                        />
                        <button
                          type="button"
                          onClick={this.handleRemoveSocks(idx)}
                          className="small"
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  ))}
                </fieldset>
                <div className="">
                  <a 
                  className="f6 link dim ba ph3 pv2 mb2 dib black pointer" 
                  onClick={this.handleAddSocks}
                  href="#0">Add Socks</a>
                  <a 
                  className="f6 link dim ba ph3 pv2 mb2 dib black pointer" 
                  onClick={this.handleSubmitSocks}
                  href="#0">Pair</a>
                </div>
                <div className='black f3'>
                        {`${pair} pair(s) of socks`}
                </div>
            </div>



            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Question 2</legend>
                <label className="db fw6 lh-copy f5" htmlFor="name">
                  example for Question 2: money = 50 and toy = [1, 12, 5, 111, 200, 1000, 10]
                </label>
                <label className="db fw6 lh-copy f6" htmlFor="name">Amount of money</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="number" 
                  name="money"  
                  id="money"
                  onChange={this.handleMoneyChange}
                />
                  {this.state.toy.map((toy, idx) => (
                    <div className="mt3" key={idx}>
                      <label className="db fw6 lh-copy f6" htmlFor="name">Toy</label>
                      <div className="grid-container">
                        <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="number" 
                        name="toy"  
                        id="toy"
                        onChange={this.handleToyChange(idx)}
                        />
                        <button
                          type="button"
                          onClick={this.handleRemoveToy(idx)}
                          className="small"
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  ))}
                </fieldset>
                <div className="">
                  <a 
                    className="f6 link dim ba ph3 pv2 mb2 dib black pointer" 
                    onClick={this.handleAddToy}
                    href="#0">Add Toy</a>
                  <a 
                    className="f6 link dim ba ph3 pv2 mb2 dib black pointer" 
                    onClick={this.handleSubmitToy}
                    href="#0">Count</a>
                </div>
                <div className='black f3'>
                        {`The amount of toy that can be purchased are ${totalToy}`}
                </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;