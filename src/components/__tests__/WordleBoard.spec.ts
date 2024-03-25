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
    beforeEach(() => { 
      console.warn = vi.fn()
    })
    test.each(
      [
        {wordOfTheDay: "TEST", reason: "word of the day must have 5 characters"},
        {wordOfTheDay: "tests", reason: "word of the day must be all uppercase"},
        {wordOfTheDay: "QWERT", reason: "word of the day must be a valid English word"},
      ]
    )("Since $reason: $wordOfTheDay is invalid, therefore a warning must be emitted", async ({wordOfTheDay}) => {
      wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
  
      expect(console.warn).toHaveBeenCalled()
    })
  
    test("No warinign is emmited if the word of the day is a real uppercase English word with exactly 5 characters", async () => {
      wrapper = mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})
  
      expect(console.warn).not.toHaveBeenCalled()
    })
  })

  describe("Player input", () => {
    test("Player guesses are limited to 5 letters", async () => { 
      await playerSubmitsGuess(wordOfTheDay + 'EXTRA')
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })

    test("Player guesses can only be submitted if they are real words", async () => { 
      await playerSubmitsGuess('QWERT')
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    })

    test("Player guesses are not case-sensitive", async () => {
      await playerSubmitsGuess(wordOfTheDay.toLowerCase())
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })

    test("Player guesses can only contain letters", async () => { 
      await playerSubmitsGuess('H3!RT')
      expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toEqual('HRT')
    })

    test.skip("Non-letter characters do not render on the screen while being typed", async () => { 
      await playerSubmitsGuess('12')
      await playerSubmitsGuess("123")
      expect(wrapper.find<HTMLInputElement>("input[type=text]").element.value).toEqual('')
    })
  })
})
