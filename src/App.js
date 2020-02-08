import React , { Component } from 'react';
import HeaderBar from  './components/HeaderBar';
import AccountValue from './components/AccountValue';
import ResourceOverview from './components/ResourceOverview';
import './App.scss';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      hasError: false,
      isLoaded: false,
      data: {},
      accountName: "genialwombat"
    };
  }

  componentDidMount() {
    if(this.state.accountName !== ""){
      fetch("https://api.eosn.io/v1/chain/get_account", {
        method: 'post',
        body: JSON.stringify({account_name: this.state.accountName}),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json())
      .then(
        (result) => {
          if(result.account_name === this.state.accountName){
            this.setState({
              isLoaded: true,
              data: result
            });
          }else{
            this.setState({
              isLoaded: true,
              hasError: true,
              error: result
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            hasError: true,
            error: "There was and error getting your account please update and try again"
          });
        }
      )
    }
  }
  render() {
    let { error, hasError, isLoaded, data, accountName } = this.state;
    if(hasError){
      return (
        <div className="app loading">
          <HeaderBar accountName={accountName}/>
          <AccountValue hasError={hasError} errorMassage={error} isLoaded={isLoaded}/>
        </div>
      );
    }
    else if(!isLoaded){
      return (
        <div className="app loading">
          <HeaderBar accountName={accountName}/>
          <AccountValue hasError={hasError} isLoaded={isLoaded}/>
        </div>
      );
    }else{
      return (
        <div className="app">
          <HeaderBar accountName={accountName}/>
          <AccountValue hasError={hasError} isLoaded={isLoaded} data={data} eosBalance={data.core_liquid_balance}/>
          <ResourceOverview data={data}/>
        </div>
      );
    }
  }
}

export default App;
