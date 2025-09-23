import ProfileCard from '@/components/ProifleCard'
import { icons } from '@/constants/icons'

import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'

const profile = () => {
  return (
       <ScrollView className="flex-1 bg-primary px-5">
        <View className="bg-primary flex-1 ">
            <View className="w-full mt-20 flex-row justify-center mb-10 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
                <Text className="text-purple-400 font-bold text-4xl ml-2">
                  Profile
                </Text>
          </View>
        </View>

      <View>
        <ProfileCard/>
      </View>

    </ScrollView>
  )
}

export default profile