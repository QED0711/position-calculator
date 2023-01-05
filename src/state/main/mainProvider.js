
import CantusFirmus from 'cantus-firmus';

import state from './state'
import setters from './setters'
import methods from './methods'


const main = new CantusFirmus(state)

main.addCustomSetters(setters)
main.addMethods(methods)



export const MainContext = main.context;
export const MainProvider = main.createProvider();

