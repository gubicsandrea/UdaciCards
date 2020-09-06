import { AsyncStorage } from "react-native";

const UDACICARDS_STORAGE_KEY = "UdaciCards";

function setDummyData() {
  const dummyData = {
    defaultDeck: {
      title: "defaultDeck",
      questions: []
    }
  };
  AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(dummyData));
  return dummyData;
}

export function getDecks() {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(result => {
    return result === null ? setDummyData() : JSON.parse(result);
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
