import React, { useContext, useEffect } from 'react';

// ==================================== TYPES ====================================
import { StateType } from '../types';

// ==================================== STATE ====================================
import { MainContext } from '../state/main/mainProvider';
import InputField from './InputField';

// ==================================== STYLES ====================================
export default function Calculator({ }) {

    // STATE
    const { state, setters }: StateType = useContext(MainContext)

    // EVENTS
    const handleSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        console.log("SUBMIT")

    }

    const handleValueChange = (setter: (value: any) => void, isNumType: boolean | null) => (e: React.SyntheticEvent): void => {
        let value: string | number = (e.target as HTMLInputElement).value;
        if (isNumType) value = parseFloat(value);
        setter(value);
    }

    const handleDirectionToggle = (e: React.SyntheticEvent) => {
        setters.setDirection((prevState: StateType) => {
            return {direction: prevState.direction === "LONG" ? "SHORT" : "LONG"}
        })
    }

    // EFFECT
    useEffect(() => {

        try {
            const {symbol, accountValue, riskPercent, ratio, fillPrice, quantity, direction} = state;
            const microLot = state.pipData[state.symbol].microLot

            const singlePip = !!symbol.match(/JPY/gi) ? 0.01 : 0.0001 
            const pipValue =  (quantity/1000) * microLot

            const riskAmount = accountValue * riskPercent/100;
            const profitAmount = riskAmount * ratio

            const pipsToRisk = riskAmount / pipValue
            const pipsToProfit = profitAmount / pipValue
            console.log(pipsToRisk, pipsToProfit)

            let stoploss, takeProfit
            if (direction === "LONG"){
                stoploss = fillPrice - (pipsToRisk * singlePip)
                takeProfit = fillPrice + (pipsToProfit * singlePip) 
            } else {


            }

            console.log({stoploss, takeProfit})
        } catch (err) {


        }

    }, [state])


    return (
        <form className='sm:w-[66%] md:w-[75%] w-[95%] mx-auto p-4 rounded-sm bg-gray-100 shadow-sm shadow-gray-800' onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold">Forex Position Calculator</h1>
            <hr className='mb-2' />
            <div className='grid sm:grid-cols-12 grid-cols-1 gap-2'>

                <InputField
                    label="Symbol"
                    inputType='text'
                    value={state.symbol}
                    onChange={handleValueChange(setters.setSymbol, false)}
                    args={{}}
                    containerClassName='col-span-2'
                />

                <div className="grid grid-cols-3 gap-1 col-span-12">
                    <h3 className="bg-gray-600 text-gray-50 font-bold">Standard  Pip</h3>
                    <h3 className="bg-gray-600 text-gray-50 font-bold">Mini  Pip</h3>
                    <h3 className="bg-gray-600 text-gray-50 font-bold">Micro  Pip</h3>
                    <div>{"$" + state.pipData?.[state.symbol]?.standardLot?.toFixed(2) ?? "--"}</div>
                    <div>{"$" + state.pipData?.[state.symbol]?.miniLot?.toFixed(2) ?? "--"}</div>
                    <div>{"$" + state.pipData?.[state.symbol]?.microLot?.toFixed(2) ?? "--"}</div>
                </div>

                <InputField
                    label="Account Value (USD)"
                    inputType="number"
                    value={state.accountValue}
                    onChange={handleValueChange(setters.setAccountValue, true)}
                    args={{ step: 0.01 }}
                    containerClassName="sm:col-span-4 col-span-12"
                />
                <InputField
                    label="Fill Price"
                    inputType='number'
                    value={state.fillPrice}
                    onChange={handleValueChange(setters.setFillPrice, true)}
                    args={{}}
                    containerClassName="sm:col-span-4 col-span-12"
                />
                <InputField
                    label="Quantity"
                    inputType='number'
                    value={state.quantity}
                    onChange={handleValueChange(setters.setQuantity, true)}
                    args={{ min: 0, step: 10_000 }}
                    containerClassName="sm:col-span-4 col-span-12"
                />
                <InputField 
                    label="Direction"
                    inputType='toggleButton'
                    value={state.direction}
                    onChange={handleDirectionToggle}
                    args={{
                        options: ["LONG", "SHORT"],
                        colors: ["bg-green-500", "bg-red-500"]
                    }}
                    containerClassName="sm:col-span-12 col-span-12 "
                />
                <InputField
                    label="Risk %"
                    inputType="number"
                    value={state.riskPercent}
                    onChange={handleValueChange(setters.setRiskPercent, true)}
                    args={{}}
                    containerClassName="sm:col-span-6 col-span-12"
                />
                <InputField
                    label="Risk Reward Ratio"
                    inputType="number"
                    value={state.ratio}
                    onChange={handleValueChange(setters.setRatio, true)}
                    args={{}}
                    containerClassName="sm:col-span-6 col-span-12"
                />

            </div>
            <button className='block w-[33%] p-4 mx-auto text-2xl text-gray-50 font-bold bg-cyan-500 shadow-sm shadow-gray-800 '>Calculate</button>
        </form>
    )
}