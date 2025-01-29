import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookmark = () => {
  return (
    <SafeAreaView className="px-4 bg-primary h-full my-10">
      <Text className="text-2xl text-white font-psemibold">Bookmark</Text>
    </SafeAreaView>
  );
};

export default Bookmark;