import React, { useContext } from 'react';

// ============================================ TYPES ============================================ 
import { StateType } from './types';

// ============================================ STATE ============================================ 
import { MainContext } from './state/main/mainProvider';

// ============================================ COMPONENTS ============================================ 
import Banner from './components/Banner';
import Calculator from './components/Calculator';
import PlaceHolderCard from './components/PlaceHolderCard';

// ============================================ STYLES ============================================ 
import './App.css';

function App() {
    const { state }: StateType = useContext(MainContext)

    // RENDERERS
    const renderCalculatorCards = (symbols: (string | null)[]) => {
        if (symbols.length < 6) {
            symbols = [...symbols, null]
        }
        return symbols.map((sym: string | null, i: number) => {
            if (typeof sym === "string") {
                return <React.Fragment key={i}><Calculator symbol={sym} cardIndex={i} /></React.Fragment>
            } else {
                return <React.Fragment key={i}><PlaceHolderCard /></React.Fragment>
            }
        })
    }

    return (
        <div className={`h-full w-full  bg-gray-200 lg:overflow-hidden overflow-auto`}>
            <Banner />
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full w-full p-4 bg-gray-200`}>
                {renderCalculatorCards(state.symbols)}
            </div>
        </div>
    );
}

export default App;
