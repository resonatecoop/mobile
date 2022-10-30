import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";

import Browse from "../components/Browse";
import Home from "../components/Home";
import Library from "../components/Library";
import Search from "../components/Search";

const Tab = createMaterialBottomTabNavigator();

export default function RootTabNavigator() {
  return (
    <Tab.Navigator id="rooTabNavigator" initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon name="magnify" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Browse"
        component={Browse}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon name="telescope" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon name="library" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
