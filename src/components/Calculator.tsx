import React, { useContext, useEffect, useState } from 'react';

// ==================================== TYPES ====================================
import { StateType } from '../types';

// ==================================== STATE ====================================
import { MainContext } from '../state/main/mainProvider';
import InputField from './InputField';

// ==================================== STYLES ====================================
export default function Calculator({ }) {

    // STATE
    const { state, setters }: StateType = useContext(MainContext)
    const [targets, setTargets] = useState({ stoploss: "", takeProfit: "" , pipsToRisk: 0, pipsToProfit: 0})

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
            return { direction: prevState.direction === "LONG" ? "SHORT" : "LONG" }
        })
    }

    // EFFECT
    useEffect(() => {
        try {
            const { symbol, accountValue, riskPercent, ratio, fillPrice, quantity, direction } = state;
            const microLot = state.pipData[state.symbol].microLot

            const singlePip = !!symbol.match(/JPY/gi) ? 0.01 : 0.0001
            const pipValue = (quantity / 1000) * microLot

            const riskAmount = accountValue * riskPercent / 100;
            const profitAmount = riskAmount * ratio

            const pipsToRisk = riskAmount / pipValue
            const pipsToProfit = profitAmount / pipValue

            let stoploss, takeProfit
            if (direction === "LONG") {
                stoploss = fillPrice - (pipsToRisk * singlePip)
                takeProfit = fillPrice + (pipsToProfit * singlePip)
            } else {
                stoploss = fillPrice + (pipsToRisk * singlePip)
                takeProfit = fillPrice - (pipsToProfit * singlePip)
            }

            setTargets({ 
                stoploss: stoploss.toFixed(5), 
                takeProfit: takeProfit.toFixed(5) ,
                pipsToRisk,
                pipsToProfit,
            })
        } catch (err) {
            setTargets({ 
                stoploss: "--", 
                takeProfit: "--",
                pipsToProfit: NaN,
                pipsToRisk: NaN
            })

        }

    }, [state])


    return (
        <form className='sm:w-[66%] md:w-[75%] w-[95%] mx-auto p-4 rounded-sm bg-gray-100 shadow-sm shadow-gray-800' onSubmit={handleSubmit}>
            <h1 className="text-4xl font-bold">Forex Position Calculator</h1>
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
                    args={{min: 0, step: state.symbol.match(/JPY/gi) ? 0.001 : 0.00001}}
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
                    label={`Risk % ($${(state.accountValue * state.riskPercent/100).toFixed(2)})`}
                    inputType="number"
                    value={state.riskPercent}
                    onChange={handleValueChange(setters.setRiskPercent, true)}
                    args={{
                        min: 0,
                        max: 100,
                        step: 0.05
                    }}
                    containerClassName="sm:col-span-6 col-span-12"
                />
                <InputField
                    label={`Reward Ratio ($${(state.accountValue * (state.riskPercent * state.ratio/100)).toFixed(2)})`}
                    inputType="number"
                    value={state.ratio}
                    onChange={handleValueChange(setters.setRatio, true)}
                    args={{}}
                    containerClassName="sm:col-span-6 col-span-12"
                />

            </div>
            <hr className='my-2'/>
            <div className="grid grid-cols-2 gap-1">
                    <h2 className="bg-gray-600 text-2xl font-bold text-red-400">Stoploss</h2>
                    <h2 className="bg-gray-600 text-2xl font-bold text-green-400">Take Profit</h2>
                    <h2 className="text-2xl font-bold text-red-500">{targets.stoploss} ({targets.pipsToRisk.toFixed(2)} pips)</h2>
                    <h2 className="text-2xl font-bold text-green-500">{targets.takeProfit} ({targets.pipsToProfit.toFixed(2)} pips)</h2>
            </div>
        </form>
    )
}