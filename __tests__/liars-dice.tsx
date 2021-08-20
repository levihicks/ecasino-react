import { render } from '../utils/test-utils'
import userEvent from "@testing-library/user-event"
import LiarsDice from '../pages/liars-dice'

test('gameplay round behavior', () => {
    const { getByRole, getAllByAltText, queryByText, getByText } = render(<LiarsDice />)
    const newGameButton = getByRole('button', { name: /new game/i })
    userEvent.click(newGameButton)
    const opponentDice = getAllByAltText('opponent die')
    const userDice = getAllByAltText('user die')
    expect(opponentDice.length).toEqual(5)
    expect(userDice.length).toEqual(5)
    let roundOverModalText = queryByText('wins.', {exact: false})
    while(!roundOverModalText) {
        let bidButton = getByRole('button', { name: /bid/i })
        userEvent.click(bidButton)
        roundOverModalText = queryByText('wins.', {exact: false})
    }
    const userWins = Boolean(queryByText('User wins.', {exact: false})) 
    // check later if exact is necessary
    const closeModalButton = getByText('Okay')
    userEvent.click(closeModalButton)
    expect(userWins ? opponentDice.length : userDice.length).toEqual(4) 
    // might need to reinitialize those variables
})