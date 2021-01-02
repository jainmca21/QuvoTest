import React, {useEffect, useState} from 'react'
import {View ,Text, StyleSheet, Image, TextInput} from 'react-native';
import { moderateScale } from '../utils/styling';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { renderIf } from '../utils/util';
import { SearchBar } from 'react-native-elements';



export const FoodCategory = () =>{

    const [categories, setCategories] = useState([])
    const [mainCategories, setMainCategories] = useState([])
    const [refreshRows, setRefreshRows] = useState([])

    const [query, setQuery] = useState('');
    
    useEffect(()=>{
        fetch('https://api.jsonbin.io/b/5fce7e1e2946d2126fff85f0')
            .then((resp) => resp.json())
            .then((resp) => {
            //Successful response from the API Call
            if(resp != null){
                setCategories(resp.categories)
                setMainCategories(resp.categories)
                setRefreshRows(new Array(mainCategories?.length).fill(false))
            }

        })
        .catch((error) => {
            console.error(error);
        });       
    }, [])

    function updateSearch(search){
        var categoriesV = []
        var subCatName = null

        mainCategories.forEach(categoryCol => {
            var subCatItems = []

            categoryCol.category.subcategories.forEach(subCategoryCol => {

                var items = []
                subCategoryCol.items.forEach(element => {
                    if(element.includes(search)){
                        items.push(element)
                    }
                });
                if(items.length > 0){
                    subCatItems.push({ 'items': items, 'subCategoryname': subCategoryCol.subCategoryname})

                }
                
            });
                       
            
            if(subCatItems.length > 0){
                var subcCategoryInfo = {'subcategories': subCatItems, 'quote': categoryCol.category.quote,
                'protip': categoryCol.category.protip,
                'imagePath': categoryCol.category.imagePath,
                'localImagePath': categoryCol.category.localImagePath,
                'categoryName': categoryCol.category.categoryName,
                'colorCode': categoryCol.category.colorCode,
                'servingSize': categoryCol.category.servingSize}
                var category = {'category':subcCategoryInfo}
                categoriesV.push(category)
            }
        });
        setQuery(search)
        setCategories(search.length == 0 ? mainCategories:categoriesV)
        setRefreshRows(refreshRows)
    }
   
    function getCategroy(categoryInfo, index){
        return( <View style = {styles.categoryHeader}>
            <TouchableOpacity style={{flexDirection:'row'}} onPress = {()=>{
                let rows = [...refreshRows]
                rows[index] = !rows[index]
                setRefreshRows(rows)
            }}>
                    
                <Image style={styles.headerImage} source={require('../assets/images/img1.png')}/>
                <View style={{flexDirection:'row'}}>
                    <Text style={[styles.categoryHeaderText, {color:categoryInfo.category.colorCode}]}>{categoryInfo.category.categoryName}</Text>
                    {renderIf(categoryInfo.category.servingSize !== undefined, 
                     <Text style={[styles.categoryHeaderText]}>{ `(${categoryInfo.category.servingSize})`}</Text>)}
                    
                </View>
            </TouchableOpacity>
            {renderIf(refreshRows[index], subCategory(categoryInfo.category.subcategories[0].items))}
          </View>)
    }

    function subCategory(subCategories){
        return(
            <FlatList style = {styles.subFlastList}
                ItemSeparatorComponent = {()=> getSeperator()}
                data={subCategories}
                renderItem={(item, index) => getSubCategroy(item)}
                extraData={refreshRows}/>
        )
    }

    return(
        <View style={styles.mainView}>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Approved Food List</Text>
            </View>
            <View style = {{flex:1}}>
                <SearchBar
                    inputStyle={styles.searchBar}
                    containerStyle={[styles.searchBar, styles.searchBarContainer]}
                    inputContainerStyle={[styles.searchBar,{height:moderateScale(30)}]}
                    placeholder='Try searching fat, sauces, names..'
                    onChangeText= {(text)=>{
                        updateSearch(text)
                    }}
                    value = {query}/>

                <FlatList style = {styles.flastList}
                    ItemSeparatorComponent = {()=> getSeperator()}
                    data={categories}
                    extraData={refreshRows}
                    renderItem={({item, index}) => getCategroy(item, index)}/>
            </View>
        </View>
    )
}

function getSeperator(){
    return( <View style = {styles.seperator}/>)
}

function getSubCategroy(subCategoryInfo){
    return( <View style = {styles.subCategoryHeader}>
        <Text style={styles.categoryHeaderText}>{subCategoryInfo.item}</Text>
      </View>)
}

const styles = StyleSheet.create({
    mainView:{
        backgroundColor:'#edecf1',
        flex:1
    },
    headerView:{
        margin:10,
        height: moderateScale(50),
        justifyContent:'center',

    },
    headerText:{
        flexDirection:'row',
        fontSize:moderateScale(24),
        fontWeight:'600',

    },

    categoryHeader:{
        flex:1,
        backgroundColor:'white',
        borderRadius:5

    },
    categoryHeaderText:{
        margin:5,
        textAlignVertical:'center',
        alignSelf:'center'
    },
    flastList:{
        margin:20,
    },
    subFlastList:{
        margin:5,
    },
    seperator:{
        flex:1,
        height:moderateScale(10)
    },
    headerImage:{
        width:45,
        height:45,
        margin:5,
        borderRadius:5
    },
      subCategoryHeader:{
        backgroundColor:'white',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#d6d6d6'
    },
    searchBar:{
        backgroundColor: '#dcebfa',
        height:moderateScale(45)
    },
    searchBarContainer:{
        marginLeft:20,
        marginRight:20,
        borderBottomColor:'#dcebfa',
        borderTopColor: '#dcebfa',
        borderRadius:5
    }
})