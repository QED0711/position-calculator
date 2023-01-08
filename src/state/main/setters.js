
const setters = {
    addCard(){
        this.setState(prevState => {
            return {symbols: [...prevState.symbols, ""]}
        })
    },

    setSymbolAtIndex(sym, index) {
        this.setState(prevState => {
            const symbols = [...prevState.symbols];
            const prevSymbol = symbols[index];

            if (prevSymbol.length === 2 && sym.length === 3) {
                symbols[index] = sym.toUpperCase() + "/"
            } else if (prevSymbol.length === 5 && sym.length === 4) {
                symbols[index] = sym.toUpperCase().slice(0, 3)
            } else {
                symbols[index] = sym.toUpperCase()
            }

            return {symbols}
        })
    },

    removeSymbolAtIndex(index){
        this.setState(prevState => {
            const symbols = [...prevState.symbols];
            symbols.splice(index, 1)
            return {symbols}
        })
    }
}

export default setters;
