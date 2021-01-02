import React from "react";
import { Image, Text, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("screen").width

export const NavLeftCrossBtn = ({hendler})=>{
    return(
        <>
            <TouchableOpacity style={styles.containerView} onPress={hendler}>
                <Text style={styles.text}>X</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    containerView:{
        flexWrap:"wrap",
        width: windowWidth/2,
        height:35,
        margin: 10,
        top:10,
        marginLeft:20
    },
    image:{
        width:35,
        height:20,
        marginLeft:5
    },
    text:{
        textAlign:'center',
        textAlignVertical:'center',
        flexWrap:'wrap',
        fontSize:20,
        fontWeight:'600'
    }
})