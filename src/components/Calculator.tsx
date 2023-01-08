import React, { useContext, useEffect, useState } from 'react';

// ==================================== STATE ====================================
import { MainContext } from '../state/main/mainProvider';
import InputField from './InputField';

// ==================================== TYPES ====================================
import { StateType } from '../types';

type CalculatorProps = {
    symbol: string,
    cardIndex: number
}
export default function Calculator({
    symbol="",
    cardIndex
 }: CalculatorProps) {


    // STATE
    const { state, setters }: StateType = useContext(MainContext)
    const [targets, setTargets] = useState({ stoploss: "", takeProfit: "" , pipsToRisk: 0, pipsToProfit: 0})
    const [quantity, setQuantity] = useState(state.quantity)
    const [riskPercent, setRiskPercent] = useState(state.riskPercent)
    const [ratio, setRatio] = useState(state.ratio)
    const [fillPrice, setFillPrice] = useState(0)
    const [direction, setDirection] = useState("LONG")

    // EVENTS
    const handleSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        console.log("SUBMIT")

    }

    const handleSymbolChange = (e: React.SyntheticEvent) => {
        const sym = (e.target as HTMLInputElement).value
        setters.setSymbolAtIndex(sym, cardIndex)
    }

    const handleValueChange = (setter: (value: any) => void, isNumType: boolean | null) => (e: React.SyntheticEvent): void => {
        let value: string | number = (e.target as HTMLInputElement).value;
        if (isNumType) value = parseFloat(value);
        setter(value);
    }

    const handleDirectionToggle = (e: React.SyntheticEvent) => {
        setDirection((direction: string) => {
            return direction === "LONG" ? "SHORT" : "LONG" 
        })
    }

    useEffect(() => {
        setRiskPercent(state.riskPercent)
        setRatio(state.ratio)
        setQuantity(state.quantity)
    }, [state.riskPercent, state.ratio, state.quantity])

    // EFFECT
    useEffect(() => {
        try {
            const {  accountValue } = state;
            const microLot = state.pipData[symbol].microLot

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

    }, [state.accountValue, symbol, quantity, fillPrice, riskPercent, ratio, direction])

    return (
        <form className='relative h-fit mx-auto p-4 rounded-sm bg-gray-100 shadow-sm shadow-gray-800' onSubmit={handleSubmit}>

            <div className='absolute top-2 right-2 cursor-pointer' onClick={() => {setters.removeSymbolAtIndex(cardIndex)}}>X</div>

            <div className='grid sm:grid-cols-12 grid-cols-1 gap-2'>
                <InputField
                    label="Symbol"
                    inputType='text'
                    value={symbol}
                    onChange={handleSymbolChange}
                    args={{}}
                    containerClassName='col-span-6'
                />
                <div className="grid grid-cols-3 gap-1 col-span-12">
                    <h3 className="bg-gray-600 text-gray-50 font-bold">Standard  Pip</h3>
                    <h3 className="bg-gray-600 text-gray-50 font-bold">Mini  Pip</h3>
                    <h3 className="bg-gray-600 text-gray-50 font-bold">Micro  Pip</h3>
                    <div>${state.pipData?.[symbol]?.standardLot?.toFixed(2) ?? "--"}</div>
                    <div>${state.pipData?.[symbol]?.miniLot?.toFixed(2) ?? "--"}</div>
                    <div>${state.pipData?.[symbol]?.microLot?.toFixed(2) ?? "--"}</div>
                </div>
                <InputField
                    label="Quantity"
                    inputType='number'
                    value={quantity}
                    onChange={handleValueChange(setQuantity, true)}
                    args={{ min: 0, step: 10_000 }}
                    containerClassName="sm:col-span-6 col-span-12"
                />
                <InputField
                    label="Fill Price"
                    inputType='number'
                    value={fillPrice}
                    onChange={handleValueChange(setFillPrice, true)}
                    args={{min: 0, step: symbol.match(/JPY/gi) ? 0.001 : 0.00001}}
                    containerClassName="sm:col-span-6 col-span-12"
                />
                <InputField
                    label="Direction"
                    inputType='toggleButton'
                    value={direction}
                    onChange={handleDirectionToggle}
                    args={{
                        options: ["LONG", "SHORT"],
                        colors: ["bg-green-500", "bg-red-500"]
                    }}
                    containerClassName="sm:col-span-12 col-span-12 "
                />
                <InputField
                    label={`Risk % ($${(state.accountValue * riskPercent/100).toFixed(2)})`}
                    inputType="number"
                    value={riskPercent}
                    onChange={handleValueChange(setRiskPercent, true)}
                    args={{
                        min: 0,
                        max: 100,
                        step: 0.05
                    }}
                    containerClassName="sm:col-span-6 col-span-12"
                />
                <InputField
                    label={`Reward Ratio ($${(state.accountValue * (riskPercent * ratio/100)).toFixed(2)})`}
                    inputType="number"
                    value={ratio}
                    onChange={handleValueChange(setRatio, true)}
                    args={{
                        min:0,
                        step: 0.05
                    }}
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