import React, { ComponentType, PropsWithChildren } from "react";
import { SafeAreaView, StyleProp, View, ViewStyle } from "react-native";
import { Searchbar, Text } from "react-native-paper";
import { PLAYER_HEIGHT } from "../../constants";

const ScreenView: ComponentType<
  PropsWithChildren<{ style?: StyleProp<ViewStyle> }>
> = (props) => {
  return (
    <SafeAreaView>
      <View
        style={[
          {
            height: "100%",
          },
          props.style,
        ]}
      >
        {props.children}
      </View>
    </SafeAreaView>
  );
};

export default ScreenView;
