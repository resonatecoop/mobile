import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import Home from "../components/Home";
import Search from "../components/Search";
import Browse from "../components/Browse";
import Library from "../components/Library";

const Tab = createMaterialBottomTabNavigator();

export default function RootTabNavigator() {
  return (
    <Tab.Navigator
      id="rooTabNavigator"
      initialRouteName="Home"
      shifting={false}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <MaterialCommunityIcon name="home" size={24} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: () => <MaterialCommunityIcon name="magnify" size={24} />,
        }}
      />
      <Tab.Screen
        name="Browse"
        component={Browse}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcon name="telescope" size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: () => <MaterialCommunityIcon name="library" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}
