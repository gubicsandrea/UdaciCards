import "react-native-gesture-handler";
import React, { Component } from "react";
import { View, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";
import { Provider } from "react-redux";
import decks from "./reducers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import Deck from "./components/Deck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import { green, white } from "./utils/colors";
import { setLocalNotification } from "./utils/helpers";

const Tabs =
  Platform.IO === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const tabBarOptions = {
  activeTintColor: Platform.IO === "ios" ? green : white,
  style: {
    height: 56,
    backgroundColor: Platform.IO === "ios" ? white : green,
    shadowColor: "rgb(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  }
};

const deckListOptions = {
  tabBarLabel: "DECKS",
  tabBarIcon: ({ color }) => (
    <MaterialCommunityIcons name="cards" size={30} color={color} />
  )
};

const addDeckOptions = {
  tabBarLabel: "ADD DECK",
  tabBarIcon: ({ color }) => (
    <MaterialCommunityIcons name="plus-box-outline" size={30} color={color} />
  )
};

function TabNavigator(props) {
  return (
    <Tabs.Navigator tabBarOptions={tabBarOptions} initialRouteName={DeckList}>
      <Tabs.Screen
        name="DeckList"
        component={DeckList}
        options={deckListOptions}
      />
      <Tabs.Screen
        name="Add Deck"
        component={AddDeck}
        options={addDeckOptions}
      />
    </Tabs.Navigator>
  );
}

const Stack = createStackNavigator();

const stackOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: green
  }
};

function StackNavigator(props) {
  return (
    <Stack.Navigator navigatorOptions={stackOptions} initialRouteName={Tabs}>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Deck"
        component={Deck}
        options={({ route }) => ({
          title: route.params.title
        })}
      />
      <Stack.Screen
        name="Add Card"
        component={AddCard}
        options={({ route }) => ({
          title: route.params.title
        })}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={({ route }) => ({
          title: "Quiz (" + route.params.title + ")"
        })}
      />
    </Stack.Navigator>
  );
}

export default class App extends Component {
  componentDidMount() {
    console.log("before");
    debugger;
    console.log("after");
    setLocalNotification(new Date());
  }

  render() {
    return (
      <Provider store={createStore(decks)}>
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
