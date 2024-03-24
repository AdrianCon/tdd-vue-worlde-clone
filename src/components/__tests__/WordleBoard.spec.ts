import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '../../settings'

describe('WordleBoard', () => {
  let wordOfTheDay = 'TESTS'
  let wrapper: ReturnType<typeof mount>;
  beforeEach(() => {
    wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
  })

  async function playerSubmitsGuess(guess: string) {
    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue(guess)
    await guessInput.trigger('keydown.enter')
  }

  test('A victory message appears when the user makes a guess that matches the word of the day', async () => {
    // Act phase
    await playerSubmitsGuess(wordOfTheDay)

    // Assert phase
    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  test("A defeat message appears if the user makes a guess that is incorrrect", async () => {
    // Act phase
    await playerSubmitsGuess('WRONG')

    // Assert phase
    expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
  })

  test("No end-of-game appears if the user has not yet made a guess", async () => {
    // Assert phase
    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
  })
})
