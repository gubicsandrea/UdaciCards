import { AsyncStorage } from "react-native";

const UDACICARDS_STORAGE_KEY = "UdaciCards";

export function getDecks() {
  AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(result => {
    return result === null ? {} : JSON.parse(result);
  });
}

export function getDeck(id) {
  AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(result => {
    const data = JSON.parse(result);
    return data[id];
  });
}

export function saveDeckTitle(title) {
  AsyncStorage.mergeItem(
    UDACICARDS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    })
  );
}

export function addCardToDeck(title, card) {
  AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(result => {
    const data = JSON.parse(result);
    data[title].questions.push(card);
    AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(data));
  });
}
