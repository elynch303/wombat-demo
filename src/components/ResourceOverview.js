import React from 'react';
import { ReactComponent as EOSLogo } from '../eos.svg';

class ResourceOverview extends React.Component {
  
  render() {
    if(this.props.data !== undefined){
      let cpuLimit = this.props.data.cpu_limit;
      let netLimit = this.props.data.net_limit;
      let totalResources = this.props.data.total_resources;
      let selfStake = {
        cpu_weight: "0.0000",
        net_weight: "0.0000"
      };
      if(this.props.data.self_delegated_bandwidth != null){
        selfStake = this.props.data.self_delegated_bandwidth;
      }
      
      return (
        <section className="resource-overview">
          <div className="resources">
            <div className="cpu">
              <p className="resource-title">CPU</p>
              <p className="staked">Staked:<span className="numbers">{parseFloat(totalResources.cpu_weight).toFixed(4)}</span> <EOSLogo/></p>
              <p className="staked">Staked by you:<span className="numbers">{parseFloat(selfStake.cpu_weight).toFixed(4)}</span> <EOSLogo/></p>
              <p><span className="numbers">{cpuLimit.used}</span> ms / <span className="numbers">{cpuLimit.max}</span> ms</p>
              <p><span className="numbers">{cpuLimit.available}</span> ms</p>
            </div>
            <div className="net">
              <p className="resource-title">NET</p>
              <p className="staked">Staked: <span className="numbers">{parseFloat(totalResources.net_weight).toFixed(4)}</span> <EOSLogo/></p>
              <p className="staked">Staked by you: <span className="numbers">{parseFloat(selfStake.net_weight).toFixed(4)}</span> <EOSLogo/></p>
              <p><span className="numbers">{netLimit.used}</span> b / <span className="numbers">{netLimit.max}</span> b</p>
              <p><span className="numbers">{netLimit.available}</span> b</p></div>
            <div className="ram">
              <p className="resource-title">RAM</p>
              <p><span className="numbers">{this.props.data.ram_usage}</span> kb / <span className="numbers">{totalResources.ram_bytes}</span> kb</p>
              </div>
          </div>
        </section>
      );
    }
  }
}

export default ResourceOverview;
