import erc721Abi from "../erc721Abi";
import { useState } from "react";

function Erc721({ web3, account, erc721list, contractAddress }) {
  const [to, setTo] = useState("");
  console.log(account);
  console.log(web3);

  const sendToken = async function (tokenAddr, tokenId) {
    const tokenContract = await new web3.eth.Contract(erc721Abi, tokenAddr, {
      from: account,
    });
    tokenContract.methods
      .transferFrom(account, to, tokenId)
      .send({
        from: account,
      })
      .on("receipt", (receipt) => {
        setTo("");
      });
  };

  return (
    <div className="erc721list">
      {erc721list.map((token) => {
        return (
          <div className="erc721token" key={token.tokenId}>
            Name: <span className="name">{token.name}</span>(
            <span className="symbol">{token.symbol}</span>)
            <div className="nft">id: {token.tokenId}</div>
            <img src={token.tokenURI} width={300} />
            <div className="tokenTransfer">
              To:{" "}
              <input
                type="text"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                }}
              ></input>
              <button
                className="sendErc20Btn"
                onClick={sendToken.bind(this, contractAddress, token.tokenId)}
              >
                send Token
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Erc721;
