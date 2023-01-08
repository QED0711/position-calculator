
import testData from '../..//data/testData.json'
const pipData = process.env.NODE_ENV === "production"
    ? {}
    : testData

const state = {
    pipData,
    accountValue: 0,
    riskPercent: 0,
    ratio: 2,
    quantity: 0,

    symbols: ["",],
    numPanels: 2
}

export default state;
