import { Text, View, StyleSheet } from "react-native";
import HabitCart from "./components/habitCard";
import { themes } from "../userTemplates/mainUserTemplates";

const MainHabits = () => {
  return (
    <View style={styles.MainHabitsContainer}>
      <Text style={styles.title}>Habits</Text>
      <HabitCart />
      <HabitCart />
      <HabitCart />
    </View>
  );
};

const styles = StyleSheet.create({
  MainHabitsContainer: {
    maxWidth: "100%",
    boxSizing: "content-box",
    backgroundColor: themes[1].themeColor,
    borderRadius: 7,
    padding: 30,
    gap: 18,
  },
  title: {
    color: themes[1].iconColor,
    fontSize: 20,
  },
});

export default MainHabits;
