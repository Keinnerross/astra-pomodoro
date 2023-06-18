import { View, StyleSheet, Text } from "react-native";
import { themes } from "../userTemplates/mainUserTemplates";
const MainNews = () => {
  return (
    <View style={styles.viewLevelContainer}>
      <View style={styles.settingLevelBtnSection}>
        <Text style={{ color: "white" }}>LEVEL 1</Text>
      </View>
      {/* <BadgeLevel />
      <LevelNotice /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  viewLevelContainer: {
    backgroundColor: themes[1].themeColor,
    width: "32%",
  },
});

export default MainNews;
