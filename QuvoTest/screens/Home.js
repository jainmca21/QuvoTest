import React from 'react'
import { View ,Text, TouchableOpacity, StyleSheet} from 'react-native'
import { navigationRef } from '../utils/context';


export const Home = () =>{
    return(
        <View style={styles.containerView}>
            <TouchableOpacity style={styles.content}
            activeOpacity = {0.5} 
            onPress={()=> {navigationRef?.current.navigate('Food')}}>
                 <Text style={styles.text}> Go for Food menu</Text>
            </TouchableOpacity>
        </View>
       
    )
}


const styles = StyleSheet.create({
    containerView:{
        flex:1,
        justifyContent:'center'
    },
    content:{
        width: 100,
        height: 100,
        alignSelf:'center',
        justifyContent:'center',
        borderColor:'grey',
        borderWidth:1,
        borderRadius:10
      },
      text:{
        flexDirection:'row',
        textAlign:'center',
        textAlignVertical:'center'
      }
  });