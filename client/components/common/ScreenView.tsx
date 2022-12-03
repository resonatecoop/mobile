import React, { ComponentType, PropsWithChildren } from "react";
import {
  SafeAreaView,
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { useTheme } from "react-native-paper";

import { PLAYER_HEIGHT } from "../../constants";

const ScreenView: ComponentType<
  PropsWithChildren<{ style?: StyleProp<ViewStyle> }>
> = (props) => {
  const theme = useTheme();
  return (
    <SafeAreaView>
      <View
        style={[
          { backgroundColor: theme.colors.background },
          styles.content,
          props.style,
        ]}
      >
        {props.children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: PLAYER_HEIGHT,
  },
});

export default ScreenView;
