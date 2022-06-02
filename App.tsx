import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Image, StatusBar, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/Home';

const BottomTab = createBottomTabNavigator();

const Home1 = () => {
  return null;
};

const Home2 = () => {
  return null;
};

const Home3 = () => {
  return null;
};

const Home4 = () => {
  return null;
};

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />

      <BottomTab.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: 'black'},
          headerShown: false,
          tabBarActiveTintColor: 'white',
        }}>
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/images/home.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />

        <BottomTab.Screen
          name="Discover"
          component={Home1}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/images/search.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="NewVideo"
          component={Home2}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/images/new-video.png')}
                style={[
                  styles.newVideoButton,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Inbox"
          component={Home3}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/images/message.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={Home4}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/images/user.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  bottomTabIcon: {
    width: 20,
    height: 20,
    backgroundColor: 'grey',
  },
  bottomTabIconFocused: {
    tintColor: 'white',
  },
  newVideoButton: {
    width: 48,
    height: 24,
  },
});

export default App;
