> 🛠 **Status: Active Development | Experimental**
>
> This project is currently broken and under very active development.

## 🎵 Resonate Mobile

A mobile app for playing music on [Resonate](https://stream.resonate.coop/), an open source music streaming co-op. 

This is a newer iteration, built completely in React Native and TypeScript, which aims to expand upon [`stream-app`](https://github.com/peterklingelhofer/stream-app), the initial [`react-native-webview`](https://github.com/react-native-webview/react-native-webview) implementation. Note that the [`stream-app`](https://github.com/peterklingelhofer/stream-app) is still being used on Google Play Store and Apple Stores, so please submit any issues for problems encountered [there](https://github.com/resonatecoop/stream-app/issues).


## 🎶 Description

Resonate is an open-source music streaming service run by a cooperative of artists and software developers.

If you want to know what we're building or want to get more involved, head over to the Platform category on our [forum](https://community.resonate.is/c/platform/l/latest?board=default) or read the [Developer Guide](https://community.resonate.is/docs?topic=2262) in our [Resonate Handbook](https://community.resonate.is/docs).

View the [project board](https://github.com/resonatecoop/mobile/projects/1) where work is tracked for this repository. If you're looking for a good first task, feel encouraged to take on an un-assigned [`help wanted` or `good first task` issues](https://github.com/resonatecoop/mobile/issues).

Are you building something using the Resonate [API](#api) and would like to request a change? Resonate welcomes #proposals in the [Co-Operation section of the forum](https://community.resonate.is/c/66).


## 🗂 Tech Stack

- React Native
- TypeScript


## 🔧 Installation & Start

Clone this repository, install dependencies, and start expo.

```sh
git clone https://github.com/resonatecoop/mobile.git
cd mobile
yarn
expo start
```

You can also use device-specific commands to run Expo on your preferred device:
```sh
yarn run android
yarn run ios
yarn run web
```

## 🧪 Testing
Expect your code contributions to be tested: we use [commitlint](https://commitlint.js.org) to lint commit messages, and [prettier](https://prettier.io) to lint code.

To test the `dark` theme on Android Studio, use the following command. Please try to ensure your changes work with both `light` and `dark` themes:

```sh
adb shell "cmd uimode night yes"
```

## 📚 Contributing

<a href="https://github.com/resonatecoop/stream/blob/master/CONTRIBUTING.md">Contributing</a> to others’ projects is an avenue to learn new software development skills and experience new technologies. The pull request is how your personal contributions will be added to the project. The following is an overview of the Git project management workflow:

Search project for contribution instructions and follow them if present.
Fork project repo from your personal Github account.
Copy the fork and clone repo onto your local machine.
Add the original repository (the you forked) as a remote called upstream.
If you created your fork a while ago be sure to pull upstream changes into your local repository.
Create a new branch to work on! Branch from develop if it exists, else from master.
Implement/fix your feature.
Follow the code style of the project, including indentation.
If the project has included tests use them.
Add additional tests or convert existing tests as necessary.
Add or convert project documentation as needed.
Push your working branch to your forked repo on Github.
Make a pull request from your forked repo to the origin master or development branch if present.
Once your pull request is merged, pull down upstream master to your local repo and delete any additional branch(es) you may have created.
Commit messages should be written in present tense describing what the committed code does and not what you changed in the code.


## 📖 References

- [React Native](https://reactnative.dev/)
- [TypeScript](https://typescriptlang.org/')


## 📑 License

`mobile` is licensed under the
[GNU General Public License v3.0](https://github.com/peterklingelhofer/stream-app/blob/master/LICENSE)

Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.
