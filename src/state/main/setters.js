
const setters = {

    setSymbol(symbol){
        // this.setState({symbol: symbol?.toUpperCase()})
        this.setState(prevState => {
            const prevSymbol = prevState.symbol;
            if(prevSymbol.length === 2 && symbol.length === 3) {
                return {symbol: symbol.toUpperCase() + "/" }
            } else if (prevSymbol.length === 5 && symbol.length === 4) {
                return {symbol: symbol.toUpperCase().slice(0,3)}
            } else {
                return {symbol: symbol.toUpperCase()}
            }
        })
    }
}

export default setters;
