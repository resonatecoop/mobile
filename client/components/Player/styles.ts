import { Dimensions, StyleSheet } from "react-native";

import { FONT_SIZE } from "../../constants";

const { width: DEVICE_WIDTH } = Dimensions.get("window");

export const styles = StyleSheet.create({
  appBar: {
    alignContent: "center",
    width: "100%",
  },
  emptyContainer: {
    alignSelf: "stretch",
    position: "absolute",
  },
  container: {
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    left: 0,
    position: "absolute",
    right: 0,
  },
  wrapper: {},
  nameContainer: {
    height: FONT_SIZE,
  },
  space: {
    height: FONT_SIZE,
  },
  playbackContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    maxHeight: 80,
    minHeight: 40,
  },
  playbackSlider: {
    alignSelf: "stretch",
    marginBottom: 8,
  },
  trackInfoRow: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    minHeight: FONT_SIZE,
    textAlign: "center",
  },
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE,
  },
  buffering: {
    paddingLeft: 20,
    textAlign: "left",
  },
  timestamp: {
    paddingLeft: 20,
    textAlign: "right",
  },
  buttonsContainerBase: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonsContainerTopRow: {
    maxHeight: 40,
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  buttonsContainerMiddleRow: {
    alignSelf: "stretch",
    maxHeight: 40,
    paddingRight: 20,
  },
  volumeContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: DEVICE_WIDTH / 2.0,
    minWidth: DEVICE_WIDTH / 2.0,
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 2.0 - 40,
  },
  buttonsContainerBottomRow: {
    alignSelf: "stretch",
    maxHeight: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  rateSlider: {
    width: DEVICE_WIDTH / 2.0,
  },
  buttonsContainerTextRow: {
    alignItems: "center",
    maxHeight: FONT_SIZE,
    maxWidth: DEVICE_WIDTH,
    minWidth: DEVICE_WIDTH,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
