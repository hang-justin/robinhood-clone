import { useState } from "react"

const TestCoinGecko = () => {
    const [prices, setPrices] = useState([])

    const getBtcPrices = async () => {
        const response = await fetch('/api/testcg')
        const data = await response.json()
        console.log('fetch data is :', data)
    }

    const getAllPrices = async () => {
        const response = await fetch('/api/cg/all')
        const data = await response.json();
        console.log('fetch data from get all prices is :', data)
    }

    return (
        <>
            <h1>Test CoinGecko API here</h1>

            <button onClick={getBtcPrices}>Get bitcoin prices</button>

            <button onClick={getAllPrices}>Get all prices</button>
        </>
    )
}

export default TestCoinGecko
