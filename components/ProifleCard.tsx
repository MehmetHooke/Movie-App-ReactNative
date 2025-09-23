import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

const ProfileCard = () => {
  return (
    <View className="bg-dark-100 rounded-2xl p-5 items-center shadow-lg">

          <View className="flex-col justify-around mb-5 w-full mt-5">
            <View className="items-center">
            <Image
                source={{ uri: "https://placehold.co/200x200.png" }}
                className="w-24 h-24 rounded-full border-2 border-purple-400"/>
            </View>
            <View className="items-center">
                <Text className="text-white text-xl font-bold mt-3">Mehmet Höke</Text>
                <Text className="text-light-200 text-sm">hoke628@gmail.com</Text>
            </View>
          </View>

      <Text className="text-light-300 text-center mt-2">
        React Native junior developer.
      </Text>

      <View className="flex-row justify-around w-full mt-5">
        <View className="items-center">
          <Text className="text-white font-bold text-lg">12</Text>
          <Text className="text-light-200 text-sm">Saved</Text>
        </View>
        <View className="items-center">
          <Text className="text-white font-bold text-lg">34</Text>
          <Text className="text-light-200 text-sm">Watched</Text>
        </View>
      </View>

      <TouchableOpacity onPress={Linking.openURL("https://github.com/MehmetHooke/Movie-App-ReactNative")} className="bg-purple-500 w-full py-3 rounded-lg mt-6">
        <Text className="text-white font-semibold text-center">Check Project on GitHub</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;
