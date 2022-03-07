export const getHandValue = (cards) => {
    const cardValues = cards.map(c => {
        if (!Number(c.rank)) 
            return c.rank === 'A' ? 11 : 10
        else return Number(c.rank)
    })
    const acesCount = cardValues.filter(v => v === 11).length
    let handValueWithStrongAce = cardValues.reduce((prev, current) => prev + current, 0)
    for(let i = 0; i < acesCount; i++) {
        if (i === acesCount - 1 && handValueWithStrongAce <= 22)
            break;
        cardValues[cardValues.indexOf(11)] = 1
        handValueWithStrongAce = cardValues.reduce((prev, current) => prev + current, 0)
    }
    return handValueWithStrongAce
}