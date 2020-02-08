import React from 'react';

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        active: false
    };
  }
  openDialog(){
    //this.setState({active: true});
    this.setState({active:true});
  }
  render(){
    return (
        <header className="app-header">
            <p className="account-name">{this.props.accountName}</p>
        </header>
    );
  }
}

export default HeaderBar;