import { render, waitFor } from '../utils/test-utils'
import userEvent from "@testing-library/user-event"
import LiarsDice from '../pages/liars-dice'

test('gameplay round behavior', async () => {
    const { getByRole, getAllByTestId, queryByText, getByText } = render(<LiarsDice />)
    const newGameButton = getByRole('button', { name: /new game/i })
    userEvent.click(newGameButton)
    const opponentDice = getAllByTestId('opponent die')
    const userDice = getAllByTestId('user die')
    expect(opponentDice.length).toEqual(5)
    expect(userDice.length).toEqual(5)
    let roundOverModalText = queryByText('wins.', {exact: false})
    while(!roundOverModalText) {
        let bidButton = getByRole('button', { name: /bid/i })
        userEvent.click(bidButton)
        roundOverModalText = queryByText('wins.', {exact: false})
    }
    const userWins = Boolean(queryByText('User wins.'))
    const closeModalButton = getByText('Okay')
    userEvent.click(closeModalButton)
    waitFor(() => expect(userWins ? opponentDice : userDice).toHaveLength(4))
})