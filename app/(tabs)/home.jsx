import { View, Text, FlatList, Image, RefreshControl} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


const Home = () => {
  const {user,setUser,setIsLogged} = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({item})=>(
        <VideoCard 
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
        />
      )}
      ListHeaderComponent={()=>(
        <View className="flex my-6 px-4 space-y-6">
          <View className="flex justify-between items-start flex-row mb-6">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Welcome Back,
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                {user?.username}
              </Text>
            </View>

            <View className="mt-1.5">
              <Image
                source={images.logoSmall}
                className="w-9 h-10"
                resizeMode="contain"
              />
            </View>
          </View>

          <SearchInput />
          <View>
            <Text className="text-white">
              Latest Posts
            </Text>
            <Trending posts={latestPosts ?? [] }/>
          </View>
        </View>
      )}
      ListEmptyComponent={()=> (
        <EmptyState 
        title="no videos found"
        subtitle="no videos created yet"
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      />
    </SafeAreaView>
  )
}

export default Home