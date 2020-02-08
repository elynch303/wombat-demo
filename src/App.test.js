import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';
import AccountValue from './components/AccountValue';
import ResourceOverview from './components/ResourceOverview';
const data = {
  "account_name": "genialwombat",
  "head_block_num": 104010304,
  "head_block_time": "2020-02-08T00:19:34.000",
  "privileged": false,
  "last_code_update": "2019-12-16T09:18:46.500",
  "created": "2019-04-25T08:09:21.500",
  "core_liquid_balance": "1799.2726 EOS",
  "ram_quota": 945461,
  "net_weight": 1000,
  "cpu_weight": 1000,
  "net_limit": {
      "used": 463,
      "available": 99986,
      "max": 100449
  },
  "cpu_limit": {
      "used": 2954,
      "available": 0,
      "max": 9
  },
  "ram_usage": 213813,
  "permissions": [
      {
          "perm_name": "active",
          "parent": "owner",
          "required_auth": {
              "threshold": 1,
              "keys": [
                  {
                      "key": "EOS6a9CiWhhq1cN3n6Dn6AjLpshAP7MAdQiTf98411DGR6qCZvBsx",
                      "weight": 1
                  }
              ],
              "accounts": [
                  {
                      "permission": {
                          "actor": "genialwombat",
                          "permission": "eosio.code"
                      },
                      "weight": 1
                  }
              ],
              "waits": []
          }
      },
      {
          "perm_name": "msig",
          "parent": "active",
          "required_auth": {
              "threshold": 1,
              "keys": [
                  {
                      "key": "EOS8KYAgkbZFvZzdBYqbTDXmiN783D1cBLYVf8fphRXxw4L3zDgkS",
                      "weight": 1
                  }
              ],
              "accounts": [],
              "waits": []
          }
      },
      {
          "perm_name": "ops",
          "parent": "active",
          "required_auth": {
              "threshold": 1,
              "keys": [
                  {
                      "key": "EOS77CKUbsYgQYuno5YtQxf9szZDXMeffvex9bTevRYaXanDeVn51",
                      "weight": 1
                  }
              ],
              "accounts": [],
              "waits": []
          }
      },
      {
          "perm_name": "owner",
          "parent": "",
          "required_auth": {
              "threshold": 1,
              "keys": [
                  {
                      "key": "EOS72rwufcJNbfmLn7F15idfvSdHgSMjQr5wJajJSebDeUw5XKS1m",
                      "weight": 1
                  }
              ],
              "accounts": [],
              "waits": []
          }
      }
  ],
  "total_resources": {
      "owner": "genialwombat",
      "net_weight": "0.1000 EOS",
      "cpu_weight": "0.1000 EOS",
      "ram_bytes": 944061
  },
  "self_delegated_bandwidth": null,
  "refund_request": {
      "owner": "genialwombat",
      "request_time": "2020-02-07T16:46:25",
      "net_amount": "924.4003 EOS",
      "cpu_amount": "15647.8016 EOS"
  },
  "voter_info": {
      "owner": "genialwombat",
      "proxy": "proxy4nation",
      "producers": [],
      "staked": 4838000,
      "last_vote_weight": "5719619296800.00000000000000000",
      "proxied_vote_weight": "667159920527.92456054687500000",
      "is_proxy": 0,
      "flags1": 0,
      "reserved2": 0,
      "reserved3": "0 "
  },
  "rex_info": null
};

test('account name is genialwombat', () => {
  //App.props.accountName = "genialwombat";
  const { getByText } = render(<App/>);
  const ancountNameElement = getByText(/genialwombat/i);
  expect(ancountNameElement).toBeInTheDocument();
});

test("account values are calculating correctly", () =>{
  let state = {
    hasError:false,
    isLoaded:true
  };
  let node = document.createElement('div');
  const comp = ReactDOM.render(<AccountValue hasError={state.hasError} isLoaded={state.isLoaded} data={data} eosBalance={data.core_liquid_balance}/>, node);
  const aEOS = comp.testData.eosAvailable;//1799.2726
  const tStaked = comp.testData.totalStake;//0.2000
  const tEOS = comp.testData.eosBalance;//1799.4726
  expect(aEOS).toEqual(1799.2726);
  expect(tStaked).toEqual("0.2000");
  expect(tEOS).toEqual("1799.4726");
});