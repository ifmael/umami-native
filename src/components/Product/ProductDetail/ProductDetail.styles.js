import { StyleSheet } from "react-native";
import { windowWidth } from "/styles/theme";

const padding = 16;
const styles = StyleSheet.create({
  container: {
    padding: padding,
  },
  header: {
    marginBottom: 10,
  },
});

// Image widh is  the windows widthn -  padding Horizontal(from the container)
export const imageWidth = windowWidth - padding * 2;

// export const headerStyles = {
//   text: {
//     marginTop: 5,
//     fontSize: 18,
//     lineHeight: 25,
//   },
// };

export default styles;
