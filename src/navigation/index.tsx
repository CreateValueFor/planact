import React from 'react'
import { isLight } from '@/style/themes'
import {
  DarkTheme,
  DefaultTheme as NavDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import LinkingConfiguration from './LinkingConfiguration'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTabNavigator from './BottomTabNavigator'
import NotFoundScreen from '@/screens/NotFoundScreen'
import { useSelector } from 'react-redux'
import { GlobalState } from '@/modules'
import Auth from '@/screens/Auth/Auth'
import SetProfile from '@/screens/Auth/SetProfile'

export default function Navigation() {
  const theme = useSelector(({ theme }: GlobalState) => theme)
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={isLight(theme) ? NavDefaultTheme : DarkTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
export type RootStackParamList = {
  Root: undefined
  NotFound: undefined
  Auth: undefined
  SetProfile: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  const user = useSelector((state: GlobalState) => state.userAuth)
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
  )
  // return user ?.profile.nickname.indexOf('__init__') === -1 ?
  //     <Stack.Navigator screenOptions={{ headerShown: false }}>
  //       <Stack.Screen name="Root" component={BottomTabNavigator} />
  //       <Stack.Screen
  //         name="NotFound"
  //         component={NotFoundScreen}
  //         options={{ title: 'Oops!' }}
  //       />
  //     </Stack.Navigator>
  //   : (
  //     <Stack.Navigator headerMode="none">
  //         { !user ?
  //         <Stack.Screen name="Auth" component={Auth} />
  //         :
  //         <Stack.Screen name="SetProfile" component={SetProfile} />
  //         }
  //     </Stack.Navigator>
  // )
}
