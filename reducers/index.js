import {
  GET_ALL_DECKS,
  GET_DECK,
  ADD_DECK,
  ADD_CARD_TO_DECK
} from "../actions";

export default function decks(state = {}, action) {
  switch (action.type) {
    case GET_ALL_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case GET_DECK:
      return {
        ...state[action.title]
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      };
    case ADD_CARD_TO_DECK: {
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: state[action.title].questions.concat(card)
        }
      };
    }
    default:
      return state;
  }
}
