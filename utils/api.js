import { AsyncStorage } from "react-native";

const UDACICARDS_STORAGE_KEY = "UdaciCards";

function setEmptyData() {
  const emptyData = {};
  AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(emptyData));
  return emptyData;
}

export function getDecks() {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(result => {
    return result === null ? setEmptyData() : JSON.parse(result);
  });
}

export function getDeck(id) {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(result => {
    const data = JSON.parse(result);
    return data[id];
  });
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
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
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(result => {
    const data = JSON.parse(result);
    data[title].questions.push(card);
    AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(data));
  });
}
