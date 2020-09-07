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
import { green, white } from "./utils/colors";

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
    <Tabs.Navigator tabBarOptions={tabBarOptions}>
      <Tabs.Screen
        name="DeckList"
        component={StackNavigator}
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
    <Stack.Navigator navigatorOptions={stackOptions}>
      <Stack.Screen
        name="DeckList"
        component={DeckList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Deck"
        component={Deck}
        options={({ route }) => ({
          title: route.params.title
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
  }

  render() {
    return (
      <Provider store={createStore(decks)}>
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
