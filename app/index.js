import { View, Text , ScrollView ,SafeAreaView} from 'react-native'
import React from 'react'
import { useState} from 'react'
import { Stack, useRouter } from 'expo-router'

import { COLORS,icons,images,SIZES } from '../constants'
import { Nearbyjobs,Popularjobs, ScreenHeaderBtn, Welcome} from "../components"
 
const Home = () => {

    const router = useRouter()  //creating router
    const [searchTerm,setSearchTerm]=useState("")

  return (
    <SafeAreaView style={{flex:1, backgroundColor:COLORS.lightWhite}}>
      
      <Stack.Screen
        options={
            {headerStyle:{ backgroundColor:COLORS.lightWhite},
                headerShadowVisible:false,
            headerLeft:()=>(
                <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
            ),
            headerRight:()=>(
                <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
            ),
            headerTitle:""
        }
        }
      />

        <ScrollView style={{backgroundColor:COLORS.lightWhite}}>
            <View
                style={{
                    flex:1,
                    padding:SIZES.medium
                }}
            >
                <Welcome
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleClick={()=>{
                        if(searchTerm){
                            router.push(`/search/${searchTerm}`)
                        } //search e gitmek için text inputtan
                    }}
                />
                <Popularjobs/> 
                <Nearbyjobs/>
            </View>
        </ScrollView>

    </SafeAreaView>
    
  )
}

export default Home