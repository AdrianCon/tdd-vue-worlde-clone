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

  describe("End of game messages", () => { 
    test('A victory message appears when the user makes a guess that matches the word of the day', async () => {
      await playerSubmitsGuess(wordOfTheDay)
  
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })
  
    test("A defeat message appears if the user makes a guess that is incorrrect", async () => {
      await playerSubmitsGuess('WRONG')
  
      expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
    })
  
    test("No end-of-game appears if the user has not yet made a guess", async () => {
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    })
  })

  describe("Rules for defining the word of the day", () => { 
    test.each(
      [
        "TEST",
        "tests",
        "QWERT",
      ]
    )("If %s is provided, an error message appears", async (wordOfTheDay) => {
      console.warn = vi.fn()
  
      wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
  
      expect(console.warn).toHaveBeenCalled()
    })
  
    test("The word of the day must be all uppercase", async () => {
      console.warn = vi.fn()
  
      wrapper = mount(WordleBoard, {props: {wordOfTheDay: "tests"}})
  
      expect(console.warn).toHaveBeenCalled()
    })
  
    test("If the word of the day is not a real word, emmit a warning", async () => {
      console.warn = vi.fn()
  
      wrapper = mount(WordleBoard, {props: {wordOfTheDay: "QWERT"}})
  
      expect(console.warn).toHaveBeenCalled()
    })
  
    test("No warinign is emmited if the word of the day is a real uppercase English word with exactly 5 characters", async () => {
      console.warn = vi.fn()
  
      wrapper = mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})
  
      expect(console.warn).not.toHaveBeenCalled()
    })
  })

  describe("Player input", () => {
    test.todo("Player guesses are limited to 5 letters")
    test.todo("Player guesses can only be submitted fi they are real words")
    test.todo("Player guesses are not case-sensitive")
    test.todo("Player guesses can only contain letters")
   })
})
