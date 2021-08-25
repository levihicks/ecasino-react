const numberOf = (symbolsArray, symbol) =>  symbolsArray.filter(s => s === symbol).length;

export const getPayoutMultiplier = (symbols) => {
    switch(true) {
        case numberOf(symbols, 'orange') === 3: 
            return 100;
        case numberOf(symbols, 'grapes') === 3: 
            return 60;
        case numberOf(symbols, 'lemon') === 3: 
            return 40;
        case numberOf(symbols, 'seven') === 3: 
            return 30;
        case numberOf(symbols, 'bar') === 3: 
            return 20;
        case numberOf(symbols, 'bell') === 3: 
            return 10;
        case numberOf(symbols, 'cherry') === 3: 
            return 10;
        case numberOf(symbols, 'cherry') === 2: 
            return 5;
        case numberOf(symbols, 'cherry') === 1: 
            return 1;
        default: 
            return 0;
    }
}
