import React from 'react';
import { ReactComponent as EOSLogo } from '../eos.svg';

class AccountValue extends React.Component {
  constructor(props) {
    super(props);
    const testData = {};
    this.state = {
      usdBasePrice: "",
    };
  }
  componentDidMount() {
      fetch("https://api.coingecko.com/api/v3/simple/price?ids=eos&vs_currencies=usd", {
        method: 'get',
        headers: new Headers({'Content-Type': 'application/json'})
      }).then(res => res.json())
      .then((result) => {
        this.setState({
          usdBasePrice: result.eos.usd
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          hasError: true,
          error: "There was and error getting your account please update and try again"
        });
      });
  }

  CommaFormatted(amount) {
    var delimiter = ","; // replace comma if desired
    var a = amount.split('.',2);
    var d = a[1];
    var i = parseInt(a[0]);
    if(isNaN(i)) { return ''; }
    var minus = '';
    if(i < 0) { minus = '-'; }
    i = Math.abs(i);
    var n = String(i);
    var an = [];
    while(n.length > 3) {
      var nn = n.substr(n.length-3);
      an.unshift(nn);
      n = n.substr(0,n.length-3);
    }
    if(n.length > 0) { an.unshift(n); }
    n = an.join(delimiter);
    if(d.length < 1) { amount = n; }
    else { amount = n + '.' + d; }
    amount = minus + amount;
    return amount;
  }

  render() {
    if(this.props.isLoaded){
      if(this.props.hasError){
        return (
          <section className="account-value">
            <div className="error-message">{this.props.errorMassage}</div>
          </section>
        );
      }
      const totalResources = this.props.data.total_resources;
      const totalStake = (parseFloat(totalResources.cpu_weight) + parseFloat(totalResources.net_weight)).toFixed(4);
      const eosAvailable = parseFloat(this.props.eosBalance);
      const usdAvailable = this.CommaFormatted(parseFloat(eosAvailable * this.state.usdBasePrice).toFixed(2));
      const eosBalance = (parseFloat(eosAvailable) + parseFloat(totalStake)).toFixed(4);
      const usdBalance = this.CommaFormatted(parseFloat(eosBalance * this.state.usdBasePrice).toFixed(2));
      this.testData = {
        totalResources:totalResources,
        totalStake:totalStake,
        eosAvailable:eosAvailable,
        usdAvailable:usdAvailable,
        eosBalance:eosBalance,
        usdBalance:usdBalance
      }
      return (
        <section className="account-details">
          <div className="available-value">
            <p className="available-title">Available:</p>
            <div className="eos-balance"><span className="numbers">{eosAvailable}</span><EOSLogo/></div>
            <div className="usd-balance"><span className="numbers">${usdAvailable}</span>USD</div>
          </div>
          <div className="bottom-rail">
            <div>
              <p className="total-staked">Total Staked:<span className="numbers">{totalStake}</span><EOSLogo/></p>
            </div>
            <div>
              <p className="account-balance">
                <span>Account Balance:</span>
                <span className="account-balance--eos"><span className="numbers">{eosBalance}</span><EOSLogo/></span>
                <span className="account-balance--usd"><span className="numbers">${usdBalance}</span>USD</span>
              </p>
            </div>
          </div>
        </section>
      );
    }
    return (
      <section className="account-value">
        <div className="loading"><EOSLogo/></div>
      </section>
    );
  }
}

export default AccountValue;