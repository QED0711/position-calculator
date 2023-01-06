import React, { useContext } from 'react';
import { MainContext } from '../state/main/mainProvider';
import { StateType } from '../types';
import InputField from './InputField';

export default function Banner({}){
    const {state, setters}: StateType = useContext(MainContext)
    return (
        <div className='grid grid-cols-4 gap-2 p-4 bg-gray-600'>
           <InputField
                label={"Account Balance"}
                value={state.accountValue}
                inputType="number"
                onChange={(e: React.SyntheticEvent) => setters.setAccountValue(parseFloat((e.target as HTMLInputElement).value))}
                textClassName={"text-gray-50"}
                args={{
                    min: 0,
                    step: 0.01
                }}
           /> 
           <InputField
                label={"Risk %"}
                value={state.riskPercent}
                inputType="number"
                onChange={(e: React.SyntheticEvent) => setters.setRiskPercent(parseFloat((e.target as HTMLInputElement).value))}
                textClassName={"text-gray-50"}
                args={{
                    min: 0,
                    step: 0.05
                }}
           /> 
           <InputField
                label={"Reward Ratio"}
                value={state.ratio}
                inputType="number"
                onChange={(e: React.SyntheticEvent) => setters.setRatio(parseFloat((e.target as HTMLInputElement).value))}
                textClassName={"text-gray-50"}
                args={{
                    min: 0,
                    step: 0.05
                }}
           /> 
           <InputField
                label={"Num Panels"}
                value={state.numPanels}
                inputType="number"
                onChange={(e: React.SyntheticEvent) => setters.setNumPanels(parseFloat((e.target as HTMLInputElement).value))}
                textClassName={"text-gray-50"}
                args={{
                    min: 1,
                    max: 6,
                }}
           /> 
        </div>
    )
}