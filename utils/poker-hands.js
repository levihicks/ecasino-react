export const convertRankToNum = (v) => {
  switch(v) {
    case "J": 
      return "11";
    case "Q":
      return "12";
    case "K":
      return "13";
    case "A":
      return "14";
    default:
      return v;
  }
};

const generateRankCounts = (h) => {
    let rankCounts = {};

    h.forEach((card) => {
      let cardValue = convertRankToNum(card.rank);
      if (rankCounts[cardValue] !== undefined)
        rankCounts[cardValue] += 1;
      else 
        rankCounts[cardValue] = 1;
    });

    return rankCounts;
}

const containsXOfAKind = (rc, x) => Object.values(rc).includes(x);

const containsFullHouse = (rc) => containsXOfAKind(rc, 3) && containsXOfAKind(rc, 2);

const containsTwoPair = (rc) => containsXOfAKind(rc, 2) && Object.values(rc).length === 3;

const containsJackOrBetter = (rc) => Object.keys(rc).filter(r => Number(r) > 10).length > 0;

const containsStraight = (rc) => {
    let handKeys = Object.keys(rc);
    let diff = Math.max(...handKeys) - Math.min(...handKeys);
    if(handKeys.length === 5 && diff === 4){
        return true;
    }
    else if (handKeys.includes("14")){
    let newRankCount = {};
    handKeys.forEach(hk => newRankCount[hk === "14" ? "1" : hk] = rc[hk])
    return containsStraight(newRankCount);
    }
    else
    return false;
};

const containsFlush = (h) => [...new Set(h.map(el => el.suit))].length === 1;

const containsStraightFlush = (h, rc) => {
    return containsFlush(h) && containsStraight(rc);
};

const containsRoyalFlush = (h, rc) => {
    return containsStraightFlush(h, rc) && Math.max(Object.keys(rc)) === "14";
};

export default function getHighestHand (hand) {
    let rankCounts = generateRankCounts(hand);

    switch(true) {
        case containsRoyalFlush(hand, rankCounts):
            return {result: "Royal Flush", reward: 250};
        case containsStraightFlush(hand, rankCounts):
            return {result: "Straight Flush", reward: 50};
        case containsXOfAKind(rankCounts, 4):
            return {result: "Four of a Kind", reward: 25};
        case containsFullHouse(rankCounts):
            return {result: "Full House", reward: 9};
        case containsFlush(hand):
            return {result: "Flush", reward: 6};
        case containsStraight(rankCounts):
            return {result: "Straight", reward: 4};
        case containsXOfAKind(rankCounts, 3):
            return {result: "Three of a Kind", reward: 3};
        case containsTwoPair(rankCounts):
            return {result: "Two Pair", reward: 2};
        case containsJackOrBetter(rankCounts):
            return {result: "Jacks or Better", reward: 1};
        default: 
            return {result: "No Winning Hand", reward: 0};
    }
}
    