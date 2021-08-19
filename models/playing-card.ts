export default interface PlayingCard {
    flipped?: boolean;
    suit: string;
    rank: string;
    held?: boolean;
    disabled?: boolean | null;
    index?: number;
}