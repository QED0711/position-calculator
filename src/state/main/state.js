
import testData from '../..//data/testData.json'
const pipData = process.env.NODE_ENV === "production"
    ? {}
    : testData

const state = {
    pipData,
    symbol: "",
    accountValue: 0,
    riskPercent: 0,
    ratio: 2,
    fillPrice: 0,
    quantity: 0,
    direction: "LONG",
}

export default state;
