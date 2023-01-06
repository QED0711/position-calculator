import React, { useContext } from 'react';

// ============================================ TYPES ============================================ 
import { StateType } from './types';

// ============================================ STATE ============================================ 
import { MainContext } from './state/main/mainProvider';

// ============================================ COMPONENTS ============================================ 
import Calculator from './components/Calculator';
import Banner from './components/Banner';

// ============================================ STYLES ============================================ 
import './App.css';

function App() {
  const { state }: StateType = useContext(MainContext)
  return (
    <div className={`h-full w-full bg-gray-200 overflow-hidden`}>
      <Banner />
      <div className={`grid grid-cols-${Math.min(state.numPanels, 3)} gap-4 h-full w-full p-4 bg-gray-200`}>
        {
          Array.from({ length: state.numPanels }).map((p, i) => {
            return <React.Fragment key={i}><Calculator key={i} /></React.Fragment>
          })
        }
      </div>
    </div>
  );
}

export default App;
