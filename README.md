# Blaze Face Detection

Node Version: `16.20.2`

```bash
nvm list
nvm install 16.20.2
nvm use 16.20.2
```

Installing the project using legacy dependacies flag

```bash
npm install --legacy-peer-deps
```

or

```bash
yarn install
```

## Node Options

Set the Node Options to openssl legacy provider

### WindowsOS

Use this command on a windows only

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
```

### Linux & MacOS\*\*

Use this command on a linux or macOS device only

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

## Run the App

Run the application to test the pose estimation task with the below command

```bash
npm start
```

or

```bash
yarn run start
```

## Hosting on Github

### 1. Install gh-pages

```bash
npm install gh-pages --save-dev
```

or

```bash
yarn add gh-pages
```

### 2. Add a homepage property

```json
{
    "name": "my-app",
    "version": "0.1.0",
+   "homepage": "https://billy-06.github.io/BlazeFaceDetection",
    "private": true,
    ...
}
```

### 3. Add predeploy and deploy scripts

```json
"scripts": {
+   "predeploy": "npm run build",
+   "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
}
```

### Predeploy then deploy

Deploy

```bash
npm run predeploy
```

or

```bash
yarn run predeploy
```

predeploy (optional to add a message)

```bash
npm run deploy -- -m "Deploy React app to GitHub Pages"
```

or

```bash
yarn run deploy -- -m "Deploy React app to GitHub Pages"
```

### Configure Deployment branch on GitPages

Set deployment branch to `gh-pages`

Set the directory to `/root`

### All set

Check the browser at [your gh link](https://billy-06.github.io/BlazeFaceDetection)
