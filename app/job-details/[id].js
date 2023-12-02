import { StyleSheet, Text, View, SafeAreaView,ScrollView,ActivityIndicator,RefreshControl} from 'react-native'
import React from 'react'
import { useCallback,useState } from 'react'
import { Stack,useRouter , useGlobalSearchParams} from 'expo-router'
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn,Specifics} from "../../components"
import {COLORS,icons,SIZES} from "../../constants";
import useFetch from '../../hook/useFetch';
import About from '../../components/jobdetails/about/About'

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
    const params=useGlobalSearchParams();
    const router=useRouter();

    const {data,isLoading,error,refetch} = useFetch("job-details",{
        job_id:params.id,
    })

    const[refreshing,setRefreshinging]=useState(false)
    const [activeTab,setActiveTab]=useState(tabs[0])

    const onRefresh=()=>{

    }
    const displayTabContent=()=>{
        switch (activeTab) {
            case "Qualifications":
                return <Specifics 
                    title="Qualifications"
                    points={data[0].job_highlights?.qualifications ?? ['N/A']} //job_highlights veya qualifications null veya undefined ise, programın çökmesini önlemek ve varsayılan bir değer belirlemek için kullanışlıdır. Not Available 
                    />
            case "About":
                return <About 
                    title="About"
                    info={data[0].job_description ?? "No data provided"} //job_highlights veya qualifications null veya undefined ise, programın çökmesini önlemek ve varsayılan bir değer belirlemek için kullanışlıdır. Not Available 
                    />
            case "Responsibilities":
                return <Specifics 
                    title="Responsibilities"
                    points={data[0].job_highlights?.qualifications ?? ['N/A']} //job_highlights veya qualifications null veya undefined ise, programın çökmesini önlemek ve varsayılan bir değer belirlemek için kullanışlıdır. Not Available 
                    />
            default:
                break;
        }
    }


  return (
    <SafeAreaView style={{flex:1 ,backgroundColor:COLORS.lightWhite}}>
        <Stack.Screen 
            options={{
                headerStyle:{backgroundColor:COLORS.lightWhite},
                headerShadowVisible:false,
                headerBackVisible:false,
                headerLeft:()=>(
                    <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension="60%"
                        handlePress={()=>router.back() }
                    />
                ),
                headerRight:()=>(
                    <ScreenHeaderBtn
                        iconUrl={icons.share}
                        dimension="60%"
                    />
                ),
                headerTitle:""
            }}
        >
        </Stack.Screen>

        <>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl=
            {<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
             >
                {isLoading ? (
                   <ActivityIndicator size={SIZES.large} color={COLORS.primary}/> 
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : data.length === 0 ? (
                    <Text>No data</Text>
                ) : (
                    <View style={{padding:SIZES.medium, paddingBottom:100}}>
                        <Company
                            companyLogo={data[0].employer_logo}
                            jobTitle={data[0].job_title}
                            companyName={data[0].employer_name}
                            location={data[0].job_country}
                        />
                        <JobTabs
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        {displayTabContent()}
                    </View>
                )
            }
            </ScrollView>
            <JobFooter url={data[0]?.job_google_link ?? "https://careers.google.com/jobs/results"} />
        </>
    </SafeAreaView>
  )
}

export default JobDetails
