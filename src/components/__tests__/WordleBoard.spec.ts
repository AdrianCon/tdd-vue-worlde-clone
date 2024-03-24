import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '../../settings'

describe('WordleBoard', () => {
  let wordOfTheDay = 'TESTS'
  test('A victory message appears when the user makes a guess that matches the word of the day', async () => {
    // Arrange phase
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
    
    // Act phase
    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue('TESTS')
    await guessInput.trigger('keydown.enter')

    // Assert phase
    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  test("A defeat message appears if the user makes a guess that is incorrrect", async () => {
    // Arrange phase
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
    
    // Act phase
    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue('WRONG')
    await guessInput.trigger('keydown.enter')

    // Assert phase
    expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
  })

  test("No end-of-game appears if the user has not yet made a guess", async () => {
    // Arrange phase
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
    
    // Assert phase
    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
  })
})
