/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './screens/Home';
import { FoodCategory } from './screens/FoodCategory';
import { navigationRef } from './utils/context';
import { NavLeftCrossBtn } from './components/NavLeftCrossBtn';
const stack = createStackNavigator()

const HomeStack = ()=>{
  return(
    <NavigationContainer ref={navigationRef}>
    <stack.Navigator initialRouteName='Home' mode='modal' >
      <stack.Screen name='Home' component = {Home}/>
      <stack.Screen name='Food' 
          component = {FoodCategory}
          options={{ headerLeft:() => 
            (<NavLeftCrossBtn hendler={()=> navigationRef?.current.navigate('Home')}/>)}}/>
    </stack.Navigator>
  </NavigationContainer>
  )
}

const App: () => React$Node = () => {
  return (
    <HomeStack/>
  );
};



export default App;
