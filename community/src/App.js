import "./App.css";
import erc721Abi from "./erc721Abi";
import TokenList from "./components/TokenList";
import { useState, useEffect } from "react";
import Web3 from "web3";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");
  const [newErc721Addr, setNewErc721Addr] = useState();
  const [erc721list, setErc721list] = useState([]);

  const addNewErc721Token = async () => {
    const tokenContract = await new web3.eth.Contract(
      erc721Abi,
      newErc721Addr,
      { from: account }
    );

    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const totalSupply = await tokenContract.methods.totalSupply().call();

    let arr = [];
    for (let i = 1; i <= totalSupply; i++) {
      arr.push(i);
    }

    for (let tokenId of arr) {
      let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();

      if (String(tokenOwner).toLowerCase() === account) {
        let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
        setErc721list((prevState) => {
          return [...prevState, { name, symbol, tokenId, tokenURI }];
        });
      }
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  //empty array runs only on first render.

  const connectWallet = async () => {
    var accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact />
        </Routes>
      </Router>
      <button
        className="metaConnect"
        onClick={() => {
          connectWallet();
        }}
      >
        connect to Metamask
      </button>
      <div className="userInfo">주소: {account}</div>

      <div className="newErc721">
        <input
          type="text"
          onChange={(e) => {
            setNewErc721Addr(e.target.value);
          }}
        ></input>
        <button onClick={addNewErc721Token}>add new erc721</button>
      </div>

      <TokenList
        web3={web3}
        account={account}
        erc721list={erc721list}
        contractAddress={newErc721Addr}
      />
    </div>
  );
}

export default App;
