import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VideoPoker from '../pages/video-poker'

test('betting button functionality', () => {
    const { getByRole } = render(<VideoPoker />)
    const betOneButton = getByRole('button', { name: /bet one/i })
    const betAmount = getByRole('heading', {name: /bet :/i})
    expect(betAmount).toHaveTextContent('1')
    userEvent.click(betOneButton)
    expect(betAmount).toHaveTextContent('2')
    const betMaxButton = getByRole('button', { name: /bet max/i })
    userEvent.click(betMaxButton)
    expect(betAmount).toHaveTextContent('5')
    userEvent.click(betOneButton)
    expect(betAmount).toHaveTextContent('1')
})

test('drawing and dealing functionality', () => {
    const { getByRole, getAllByTestId } = render(<VideoPoker />)
    const cards = getAllByTestId('playing-card')
    expect(cards).toHaveLength(5);
    expect(cards[0]).toHaveTextContent('eCASINO')
    const drawDealButton = getByRole('button', { name: /draw/i })
    userEvent.click(drawDealButton)
    expect(cards[0]).not.toHaveTextContent('eCASINO')
    userEvent.click(cards[0])
    userEvent.click(drawDealButton)
    expect(cards[0]).toHaveTextContent('HOLD')
    userEvent.click(drawDealButton)
    expect(cards[0]).not.toHaveTextContent('HOLD')
})

test('reward functionality', () => {
    const { getByRole, getByText } = render(<VideoPoker />)
    const bankroll = getByText(/bankroll: $/)
    const drawDealButton = getByRole('button', { name: /draw/i })
    userEvent.click(drawDealButton)
    userEvent.click(drawDealButton)
    const reward = getByText(/reward: $/i)
    const rewardAmount = Number(reward.textContent!.split('$')[1])
    const newBankrollAmount = Number(bankroll.textContent!.split('$')[1])
    expect(newBankrollAmount).toBe(999 + rewardAmount)
})