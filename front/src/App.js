import { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = 'wl_devs';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const TEST_GIFS = [
	'https://media2.giphy.com/media/3ornjSL2sBcPflIDiU/giphy.gif?cid=790b76115a9c8a6da219dacdd70f0304ce6693718e194a4d&rid=giphy.gif&ct=g',
	'https://media0.giphy.com/media/3ornk7nts29Am5LIfm/giphy.gif?cid=790b76110a20e9275860db9479846a7d3c712dbfc4642d63&rid=giphy.gif&ct=g',
	'https://media1.giphy.com/media/3o7ZeTmU77UlPyeR2w/giphy.gif?cid=790b76116b018d09204492f0376af88a63c59189bff661f5&rid=giphy.gif&ct=g',
	'https://media2.giphy.com/media/3ornk57KwDXf81rjWM/giphy.gif?cid=790b7611abae1d588e420f806669d3532cb024958dc974e8&rid=giphy.gif&ct=g',
  'https://media3.giphy.com/media/8McNH1aXZnVyE/giphy.gif?cid=790b761192d63b35161cbdab402a67c581f6394cff582eb4&rid=giphy.gif&ct=g',
  'https://media1.giphy.com/media/x0w62ZcupOMak/giphy.gif?cid=790b761143c2e555c1ce12be9b7bf2066ff6d390db0e12c5&rid=giphy.gif&ct=g',
  'https://media2.giphy.com/media/eEK9Hp9nAXtZDhoXbK/giphy.gif?cid=790b761178d96c9a612c3b23c8387cd3d4d21430f85f2fee&rid=giphy.gif&ct=g'
]

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana && solana.isPhantom) {
        console.log('Phantom wallet found!');

        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        );

        setWalletAddress(response.publicKey.toString());
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) { 
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
    } else {
      console.log('Empty input. Try again.');
    }
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => (
  <div className="connected-container">
    <input
      type="text"
      placeholder="Enter gif link!"
      value={inputValue}
      onChange={onInputChange}
    />
    <button className="cta-button submit-gif-button" onClick={sendGif}>Submit</button>
    <div className="gif-grid">
      {gifList.map(gif => (
        <div className="gif-item" key={gif}>
          <img src={gif} alt={gif} />
        </div>
      ))}
    </div>
  </div>
);

  useEffect(() => {
    window.addEventListener('load', async (event) => {
      await checkIfWalletIsConnected();
    });
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');
      
      // Call Solana program here.

      // Set state
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">Star Wars Portal</p>
          <p className="sub-text">
            View Star Wars GIF collection in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
