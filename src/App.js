import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Search from './components/Search';
import Product from './components/Product';
// import product from './components/product';

// ABIs
import GreenToken from './abis/GreenToken.json'
import greenplanet from './abis/greenplanet.json'

// Config
import config from './config.json';
import bagpack from './bagpack.jpeg';
import bread from './bread_bag.jpeg';
import phone from './phone_case.webp';
const images = [bagpack, bread, phone];
const strings = ["Recycled Plastic Backpack", "Reusable Bread Bag", "Eco Friendly Phone Cases"]
const prices = ["0.07", "0.06", "0.01"]
function App() {
  const [account, setAccount] = useState(null); 
  const [provider, setProvider] = useState(null)
  const [planetgreen, setGreenplanet] = useState(null)
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({})
  const [toggle, setToggle] = useState(false);
  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork();
    // console.log(network)
    const greenToken = new ethers.Contract(config[network.chainId].GreenToken.address, GreenToken, provider)
    const greenPlanet = new ethers.Contract(config[network.chainId].greenplanet.address, greenplanet, provider)
    
    const totalsupply = await greenToken.totalSupply();
    // console.log(totalsupply)
    setGreenplanet(greenPlanet)
    const products = []
    
    for (let i = 1; i <= totalsupply; i++) {
      // console.log("fonawegegwaegwa")
      const uri = await greenToken.tokenURI(i);
      console.log(uri)
      const response = await fetch(uri);
      // console.log("fewaefwefdsf")
      const metadata = await response.json();
      
      products.push(metadata);
    }
    setProducts(products);
    console.log(products)
   
    // config[network.chainId].GreenToken.address
    // config[network.chainId].greenplanet.address
    // console.log(config[network.chainId].GreenToken.address, config[network.chainId].greenplanet.address)
    console.log(products)
    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })
  };
  useEffect(() => {
    loadBlockchainData();
  }, [])
  const togglePop = (product) => {
    setProduct(product)
    toggle ? setToggle(false) : setToggle(true);
  }


  return (
    <div>
      <Navigation account = {account} setAccount = {setAccount}/>
      <Search/>
      <div className='cards__section'>

    <h3>Things you can buy</h3>

    <hr />

    <div className='cards'>
              

    {products.map((product, index) => (
            <div className='card' key={index} onClick={() => togglePop(product)}>
              <div className='card__image'>
                <img src={images[index]} alt="product" />
              </div>
              <div className='card__info'>
                <h4>{prices[0]} ETH</h4>
                <p>{strings[index]}</p>
              </div>
            </div>
          ))}
    </div>
    </div>
    {toggle && (
        <Product product={product} provider={provider} account={account} greenplanet={planetgreen} togglePop={togglePop} />
      )}
    </div>
  );
}

export default App;
