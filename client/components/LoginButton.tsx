import React from "react";
import { Button, View } from "react-native";
import {
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const useProxy = true;

const discovery = {
  authorizationEndpoint: "https://id.resonate.coop/web/authorize",
  tokenEndpoint: "https://id.resonate.coop/v1/oauth/tokens",
  revocationEndpoint: "https://id.resonate.coop/v1/oauth/revoke",
};

export default function LoginButton() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "c9gk6i5vqc7o388g0jvg",
      scopes: ["read_write"],
      redirectUri: makeRedirectUri({
        scheme: "coop.resonate.dream",
      }),
      responseType: "code",
    },
    discovery
  );

  React.useEffect(() => {
    console.log("response", response);

    if (response?.type === "success") {
      const { code } = response.params;
    }
  }, [response]);

  return (
    <View>
      <Button
        disabled={!request}
        title="Log in"
        onPress={() => {
          promptAsync();
        }}
      ></Button>
    </View>
  );
}
