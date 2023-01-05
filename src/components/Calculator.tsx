import React, { useContext } from 'react';

// ==================================== TYPES ====================================
import { StateType } from '../types';

// ==================================== STATE ====================================
import { MainContext } from '../state/main/mainProvider';
import InputField from './InputField';

// ==================================== STYLES ====================================
export default function Calculator({}){

    // STATE
    const {state, setters}: StateType = useContext(MainContext)

    // EVENTS
    const handleSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        console.log("SUBMIT")

    }
    const handleAccountValueChange = (e: React.SyntheticEvent): void => {
        const value = parseFloat((e.target as HTMLInputElement).value)
        setters.setAccountValue(value)
    }

    const handleRiskPercentChange = (e: React.SyntheticEvent): void => {
        const value = parseFloat((e.target as HTMLInputElement).value)
        setters.setRiskPercent(value)
    }
    return (
        <form className='sm:w-[66%] md:w-[75%] w-[95%] mx-auto p-4 rounded-sm bg-gray-100 shadow-sm shadow-gray-800' onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold">Forex Position Calculator</h1>
            <hr className='mb-2'/>
            <InputField label="Account Value" inputType="number" value={state.accountValue} onChange={handleAccountValueChange} args={{}}  />
            <InputField label="Risk %" inputType="number" value={state.riskPercent} onChange={handleRiskPercentChange} args={{}}  />

            <button className='block w-[33%] p-4 mx-auto text-2xl text-gray-50 font-bold bg-green-400 shadow-sm shadow-gray-800 '>Calculate</button>
        </form>
    )
}