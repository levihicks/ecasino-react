import { useState, useReducer } from "react"
import PlayingCard from "../models/playing-card"
import { RANKS, SUITS } from '../constants/card-values'

const useDeck = () => {
    const [deck, setDeck] = useState<PlayingCard[]>([])

    const getShuffledDeck = () => {
        let newDeck: PlayingCard[] = []
        for(let s in SUITS) {
            for(let r in RANKS) {
                let randomIndex = Math.floor(Math.random() * 52)
                while(newDeck[randomIndex] !== undefined) 
                    randomIndex = Math.floor(Math.random() * 52)
                newDeck[randomIndex] = { suit: SUITS[s], rank: RANKS[r] }
            }
        }
        return [...newDeck]
    }

    const drawFromDeck = (amount: number, deck: PlayingCard[]) => {
        let newDeck = [...deck]
        let drawnCards = newDeck.splice(0, Math.min(deck.length, amount))
        setDeck(newDeck)
        return drawnCards
    }

    return { deck, getShuffledDeck, drawFromDeck }
}

export default useDeck