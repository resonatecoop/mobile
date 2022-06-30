<div align="center">
  <h1 align="center">stream2own</h1>
  <strong>Play fair.</strong>
</div>
<br />

<div align="center">
  <h3>
    <a href="https://resonate.is">
      Website
    </a>
    <span> | </span>
    <a href="https://www.twitter.com/resonatecoop/">
      Twitter
    </a>
    <span> | </span>
    <a href="https://github.com/resonatecoop/stream2own/blob/master/CONTRIBUTING.md">
      Contributing
    </a>
    <span> | </span>
    <a href="https://community.resonate.is/t/dev-volunteers-needed-to-build-the-resonate-ecosystem/2262">
      Developer Guide
    </a>
    <span> | </span>
    <a href="https://docs.resonate.coop">
      Resonate Docs
    </a>
  </h3>
</div>
<br />

## 🎵 Resonate Stream App

A mobile app for playing music on [Resonate](https://stream.resonate.coop/), an open source music streaming co-op. 

This is a newer iteration, built completely in React Native and TypeScript, which aims to expand upon [`stream-app`](https://github.com/peterklingelhofer/stream-app), the initial `react-native-webview` implementation.


## 🎶 Description

Resonate is an open-source music streaming service run by a cooperative of artists and software developers.

If you want to know what we're building or want to get more involved, head over to the Platform category on our [forum](https://community.resonate.is/c/platform/l/latest?board=default) or read the [Developer Guide](https://community.resonate.is/docs?topic=2262) in our [Resonate Handbook](https://community.resonate.is/docs).

View the [project board](https://github.com/resonatecoop/dream/projects/1) where work is tracked for this repository. If you're looking for a good first task, feel encouraged to take on an un-assigned [`help wanted` or `good first task` issues](https://github.com/resonatecoop/dream/issues).

Are you building something using the Resonate [API](#api) and would like to request a change? Resonate welcomes #proposals in the [Co-Operation section of the forum](https://community.resonate.is/c/66).


## 🗂 Tech Stack

- Babel
- React
- React Native
- TypeScript


## 🔧 Installation & Start

Clone this repository, install dependencies, and start expo.

```sh
git clone https://github.com/resonatecoop/dream.git
cd dream
yarn
```

Run instructions for Android:

  • Have an Android emulator running (quickest way to get started), or a device connected.

  • ```cd "/Users/peterklingelhofer/Dev/dream" && npx react-native run-android```

Run instructions for iOS:

  • ```cd "/Users/peterklingelhofer/Dev/dream" && npx react-native run-ios```

  or

  • Open `dream/ios/dream.xcworkspace` in Xcode or run `xed -b ios`
  • Hit the Run button


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

`dream` is licensed under the
[GNU General Public License v3.0](https://github.com/peterklingelhofer/stream-app/blob/master/LICENSE)

Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.