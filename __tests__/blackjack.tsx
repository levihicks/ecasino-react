import { render, waitFor } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import Blackjack from '../pages/blackjack'

test('deal button functionality', () => {
    const {getByRole, getAllByTestId} = render(<Blackjack />)
    const dealButton = getByRole('button', {name: /deal/i})
    userEvent.click(dealButton)
    const cards = getAllByTestId('playing-card')
    expect(cards).toHaveLength(4)
})

test('reward functionality', async () => {
    const { getByRole, getByText } = render(<Blackjack />)
    const BET_AMOUNT = 1
    const bankroll = getByText(/bankroll:/i)
    const bankrollValue = Number(bankroll.textContent!.split('$')[1])
    const dealButton = getByRole('button', { name: /deal/i })
    userEvent.click(dealButton)
    const standButton = getByRole('button', { name: /stand/i })
    userEvent.click(standButton)
    const winnerText = getByText(/wins/i)
    const winner = winnerText.textContent!.split(' ')[0]
    const newBankrollValue = Number(bankroll.textContent!.split('$')[1])
    let winnings = BET_AMOUNT
    if (winner === 'Player') 
      winnings = BET_AMOUNT
    else if (winner === 'Dealer') 
      winnings = -BET_AMOUNT
    else if (winner === 'Push.')
      winnings = 0
    else if (winner === 'Blackjack!')
      winnings = 1.5 * BET_AMOUNT
    waitFor(() => expect(newBankrollValue).toBe(bankrollValue + winnings))
})

