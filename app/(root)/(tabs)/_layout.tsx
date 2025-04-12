import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet} from 'react-native';

export default function RootLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: "#353949",
        tabBarStyle: styles.tab
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: " ",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  tab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    position: 'absolute',
    borderRadius: 30,
    paddingTop: 10,
    height: Platform.OS === 'ios' ? 80 : 60,
    borderColor: 'rgba(255, 255, 255, 0)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  }
})