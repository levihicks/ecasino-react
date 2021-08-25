import { render, waitFor } from "../utils/test-utils"
import userEvent from '@testing-library/user-event'
import Slots from '../pages/slots'

test('slot machine round functionality', async () => {
    const { getByRole, findByText } = render(<Slots />)
    const betText = await findByText(/bet: /i)
    const betAmount = Number(betText.textContent?.split('$')[1])
    const spinButton = getByRole('button', { name: /spin/i })
    userEvent.click(spinButton)
    let rewardText: any;
    waitFor(() => rewardText = findByText(/reward/i))
    const rewardAmount = Number(rewardText.textContent?.split('$')[1])
    const bankrollText = await findByText(/bankroll:/i)
    expect(Number(bankrollText.textContent?.split('$'[1])))
        .toEqual(1000 + rewardAmount === 0 ? -betAmount : rewardAmount)
})