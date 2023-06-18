import { View, Text, StyleSheet } from "react-native";
import { themes } from "../../userTemplates/mainUserTemplates";

const HabitCart = () => {
  return (
    <View style={styles.habitCardContainer}>
      <View style={styles.habitCardSection}>
        <View style={styles.circlePercentage}>
          <Text style={styles.textPercentage}>19d</Text>
        </View>
        <View style={styles.textHabitSection}>
          <Text style={styles.HabitText}> Soy un Hábito</Text>
          <Text style={styles.HabitTextDescription}>
            {" "}
            Soy la descripcion de un hábito
          </Text>
        </View>
        <View style={styles.controllersHabitSection}>
          <Text style={styles.HabitText}>O</Text>
          <Text style={styles.HabitText}>+</Text>
          <Text style={styles.HabitText}>++1</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  habitCardContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 7,
    padding: 10,
  },

  habitCardSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  circlePercentage: {
    width: 38,
    height: 38,
    borderWidth: 5,
    borderColor: "red",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  textPercentage: {
    fontSize: 10,
    color: themes[1].iconColor,
  },
  HabitText: {
    color: themes[1].iconColor,
  },

  HabitTextDescription: {
    color: themes[1].iconColor,
    fontSize: 12,
  },

  controllersHabitSection: {
    alignItems: "flex-end",
  },
});

export default HabitCart;
