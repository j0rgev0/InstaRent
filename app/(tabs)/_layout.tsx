import { Tabs } from 'expo-router';
import React from 'react';
import { Platform , StyleSheet} from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors['dark'].tint,
          headerShown: false,
          tabBarBackground: TabBarBackground,
          tabBarStyle: styles.tab, 

      }}>
      <Tabs.Screen
        name="noti"
        options={{
          title: 'Noti',

          
        }}
      />

      <Tabs.Screen
        name="like"
        options={{
          title: '',
        
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />

    </Tabs>
    
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: 'transparent',
    backdropFilter: 'blur(0px)',
    position: 'absolute',
    borderRadius: 100,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 30,
    marginLeft: 21,
    marginRight: 21,
    paddingTop: 15,
  },
});