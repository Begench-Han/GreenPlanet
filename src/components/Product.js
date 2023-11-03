import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import close from '../assets/close.svg';
import bagpack from '../bagpack.jpeg';
import bread from '../bread_bag.jpeg';
import phone from '../phone_case.webp';
const images = [bagpack, bread, phone];
const strings = ["Recycled Plastic Backpack", "Reusable Bread Bag", "Eco Friendly Phone Cases"]
const prices = ["0.07", "0.06", "0.01"]
const descs = ["The stylish Onya range of Backpacks are also made from rPET"]

const Product = ({ product, provider, account, greenplanet, togglePop }) => {
    const [hasBought, setHasBought] = useState(false)
    const [hasLended, setHasLended] = useState(false)
    const [hasInspected, setHasInspected] = useState(false)
    const [hasSold, setHasSold] = useState(false)

    const [buyer, setBuyer] = useState(null)
    const [lender, setLender] = useState(null)
    const [inspector, setInspector] = useState(null)
    const [seller, setSeller] = useState(null)

    const [owner, setOwner] = useState(null)
    const fetchDetails = async () => {
        // -- Buyer

        const buyer = await greenplanet.buyer(product.id)
        setBuyer(buyer)

        const hasBought = await greenplanet.approval(product.id, buyer)
        setHasBought(hasBought)

        // -- Seller

        const seller = await greenplanet.seller()
        setSeller(seller)

        const hasSold = await greenplanet.approval(product.id, seller)
        setHasSold(hasSold)

        // -- Lender

        // -- Inspector

        const inspector = await greenplanet.inspector()
        setInspector(inspector)

        // const hasInspected = await greenplanet.inspectionPassed(product.id)
        // setHasInspected(hasInspected)
    }
    const fetchOwner = async () => {
        if (await greenplanet.isListed(product.id)) return

        const owner = await greenplanet.buyerof(product.id)
        setOwner(owner)
    }
    const buyHandler = async () => {
        const greenplanetAmount = await greenplanet.amount(product.id)
        const signer = await provider.getSigner()
        console.log("inside")
        // Buyer approves...
        const transaction = await greenplanet.connect(signer).approve(product.id)
        await transaction.wait()

        setHasBought(true)
    }

    const inspectHandler = async () => {
        const signer = await provider.getSigner()

        // Inspector updates status
        console.log("inspector")
        const transaction = await greenplanet.connect(signer).updateInspection(product.id, true)
        await transaction.wait()

        setHasInspected(true)
    }


    const sellHandler = async () => {
        const signer = await provider.getSigner()

        // Seller approves...
        let transaction = await greenplanet.connect(signer).approve(product.id)
        await transaction.wait()

        // Seller finalize...
        transaction = await greenplanet.connect(signer).finalizeProcess(product.id)
        await transaction.wait()

        setHasSold(true)
    }
    useEffect(() => {
        fetchDetails()
        fetchOwner()
    }, [hasSold])
    return (
        <div className="product">
            <div className="product__details">
                <div  className="product__image">
                    <img src = {images[0]} alt = "Product"/>
                </div>
                <div className="product__overview">
                    <h1>{strings[0]}</h1>
                    <h2>{prices[0]} ETH</h2>

                    {owner ? (
                        <div className='product__owned'>
                            Owned by {owner.slice(0, 6) + '...' + owner.slice(38, 42)}
                        </div>
                    ) : (
                        <div>
                            {(account === inspector) ? (
                                <button className='product__buy' onClick={inspectHandler} disabled={hasInspected}>
                                    Approve Inspection
                                </button>
                            ) : (account === seller) ? (
                                <button className='product__buy' onClick={sellHandler} disabled={hasSold}>
                                    Approve & Sell
                                </button>
                            ) : (
                                <button className='product__buy' onClick={buyHandler} disabled={hasBought}>
                                    Buy
                                </button>
                            )}
                    <button className='product__contact' >
                        Contact Seller
                    </button>
                        </div>
                    )}
                    <hr />
                    <h2>Overview</h2>
                    <p>{descs[0]}</p>
                    <hr/>
                    
                    
                </div>
            </div>
        
            <button onClick={togglePop} className="product__close">
                    <img src={close} alt="Close" />
            </button>
        </div>
    );
}

export default Product;
