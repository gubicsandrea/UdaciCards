import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";

const NOTIFICATION_KEY = "UdaciCards:notifications";

function createNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false
    })
  });
}

function createNotification(date) {
  let trigger = new Date();
  trigger.setDate(date.getDate());
  trigger.setHours(11);
  trigger.setMinutes(30);
  return {
    content: {
      title: "Take a quiz",
      body: "👋 don't forget to take a quiz today!"
    },
    trigger
  };
}

export function setLocalNotification(date) {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();
            createNotificationHandler();
            Notifications.scheduleNotificationAsync(createNotification(date));
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}
