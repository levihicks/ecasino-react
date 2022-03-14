import { render } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import Blackjack from '../pages/blackjack'

test('deal button functionality', () => {
    const {getByRole, getAllByTestId} = render(<Blackjack />)
    const dealButton = getByRole('button', {name: /deal/i})
    userEvent.click(dealButton)
    const cards = getAllByTestId('playing-card')
    expect(cards.length).toBeGreaterThanOrEqual(4)
})