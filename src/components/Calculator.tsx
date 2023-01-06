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

    // EFFECT
    useEffect(() => {
        console.log(state.pipData[state.symbol])
    }, [state.symbol])


    return (
        <form className='sm:w-[66%] md:w-[75%] w-[95%] mx-auto p-4 rounded-sm bg-gray-100 shadow-sm shadow-gray-800' onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold">Forex Position Calculator</h1>
            <hr className='mb-2' />
            <div className='grid sm:grid-cols-2 grid-cols-1 gap-2'>

                <InputField
                    label="Symbol"
                    inputType='text'
                    value={state.symbol}
                    onChange={handleValueChange(setters.setSymbol, false)}
                    args={{}}
                    containerClassName='col-span-2'
                />

                <div className="grid grid-cols-3 gap-1 col-span-2">
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
                    args={{step: 0.01}}
                />
                <InputField
                    label="Risk %"
                    inputType="number"
                    value={state.riskPercent}
                    onChange={handleValueChange(setters.setRiskPercent, true)}
                    args={{}}
                />
                <InputField
                    label="Risk Reward Ratio"
                    inputType="number"
                    value={state.ratio}
                    onChange={handleValueChange(setters.setRatio, true)}
                    args={{}}
                />
                <InputField
                    label="Fill Price"
                    inputType='number'
                    value={state.fillPrice}
                    onChange={handleValueChange(setters.setFillPrice, true)}
                    args={{}}
                />
                <InputField
                    label="Quantity"
                    inputType='number'
                    value={state.quantity}
                    onChange={handleValueChange(setters.setQuantity, true)}
                    args={{min: 0, step: 10_000}}
                />

            </div>
            <button className='block w-[33%] p-4 mx-auto text-2xl text-gray-50 font-bold bg-green-400 shadow-sm shadow-gray-800 '>Calculate</button>
        </form>
    )
}