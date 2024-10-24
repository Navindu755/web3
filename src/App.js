import React, { useEffect } from 'react';
import { getWeb3Connector } from '@binance/w3w-web3-connector';
import { useWeb3React } from '@web3-react/core';

const Connector = getWeb3Connector();
const binanceConnector = new Connector({
  lng: 'zh-CN',
  supportedChainIds: [1, 56], // 1 = Ethereum, 56 = Binance
  rpc: {
    56: 'https://bsc-dataseed.binance.org/',
  },
});

if (!binanceConnector) {
  console.error('Failed to initialize Binance connector');
}

function App() {
  const { activate, deactivate, account, library, error } = useWeb3React();

  useEffect(() => {
    if (error) {
      console.error('Web3React error:', error);
    }
  }, [error]);

  async function enable() {
    try {
      await activate(binanceConnector);
    } catch (e) {
      console.error('Error activating Binance connector:', e);
    }
  }

  async function getAccount() {
    if (account) {
      console.log('Account:', account);
    } else {
      console.log('No account connected');
    }
  }

  return (
    <div>
      <h2>Web3 Connector</h2>
      <button onClick={enable}>Enable</button>
      <button onClick={() => deactivate()}>Disconnect</button>
      <button onClick={getAccount}>Get Account</button>
      {account && <p>Connected account: {account}</p>}
      <button onClick={() => library?.getSigner().signMessage('hello')}>Sign Message</button>
    </div>
  );
}

export default App;
