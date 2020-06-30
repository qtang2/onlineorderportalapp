import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 6,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 8,
    marginTop: 8,
  },
  qtyinput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 2,
    backgroundColor: "pink",
    height: 20,
    width: 50,
    alignSelf: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#ECF0F1",
    alignSelf: "center",
    marginTop: 20,
  },
  text: {
    color: "#3B3B3B",
    textAlign: "center",
  },
  title: {
    fontSize: 26,
    color: "#3B3B3B",
    alignSelf: "center",
    marginBottom: 23,
  },
  logoImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  tableImage: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  line: {
    borderBottomColor: "#d4d4d9",
    borderBottomWidth: 1,
    marginBottom: 12,
    marginTop: 12,
  },
});
