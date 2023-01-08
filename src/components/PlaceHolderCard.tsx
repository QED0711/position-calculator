import React, { useContext } from 'react';

// ============================================ STATE ============================================ 
import { MainContext } from '../state/main/mainProvider';

// ============================================ TYPES ============================================ 
import { StateType } from '../types';

export default function PlaceHolderCard({ }) {
    const { setters }: StateType = useContext(MainContext)

    return (
        <div className="h-[30rem] pt-[45%] bg-gray-100 text-center shadow-sm shadow-gray-800 rounded-sm cursor-pointer" onClick={() => { setters.addCard() }}>
            <span className='h-full p-4 border-2 border-black rounded-full text-4xl'>
                Add Symbol
            </span>
        </div>
    )
}