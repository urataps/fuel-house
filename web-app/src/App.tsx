import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { CounterContractAbi__factory } from "./contracts";
import { BaseAssetId } from "fuels";

const CONTRACT_ID =
  "0x47465e2d256bc7e177923bcc4d47ce8861742eceeb9fc0e176f56839589d68c9";

function App() {
  const [account, setAccount] = useState<string>();
  const [connected, setConnected] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      checkConnection();
      if (connected) getCounter();
    }, 200);
  }, [connected]);

  const checkConnection = async () => {
    if (window.fuel) {
      const connected = await window.fuel.isConnected();
      const [account] = await window.fuel.accounts();
      setConnected(connected);
      setAccount(account);
    }
  };

  const getCounter = async () => {
    if (window.fuel && account) {
      const wallet = await window.fuel.getWallet(account);
      const contract = CounterContractAbi__factory.connect(CONTRACT_ID, wallet);
      const { value } = await contract.functions.counter().simulate();
      setCounter(value.toNumber());
    }
  };

  const increment = async () => {
    if (window.fuel && account) {
      const wallet = await window.fuel.getWallet(account);
      const contract = CounterContractAbi__factory.connect(CONTRACT_ID, wallet);
      await contract.functions
        .increment()
        .callParams({
          forward: [1, BaseAssetId],
        })
        .txParams({ gasPrice: 1 })
        .call();
      getCounter();
    }
  };

  const connect = async () => {
    if (window.fuel) {
      await window.fuel.connect();
      const [account] = await window.fuel.accounts();
      setAccount(account);
      setConnected(true);
    }
  };

  return (
    <div className="App">
      {connected ? (
        <div>
          <h2>Counter: {counter}</h2>
          <h2>Account: {account}</h2>
          <button onClick={increment}>Increment</button>
        </div>
      ) : (
        <div>
          <button onClick={connect}>Connect</button>
        </div>
      )}
    </div>
  );
}

export default App;
