import Erc721 from "./Erc721";

function TokenList({ web3, account, erc721list, contractAddress }) {
  return (
    <div className="tokenList">
      <Erc721
        web3={web3}
        account={account}
        erc721list={erc721list}
        contractAddress={contractAddress}
      />
    </div>
  );
}

export default TokenList;
