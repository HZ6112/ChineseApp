import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: colors.dark,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};
