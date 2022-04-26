<h1 align="center">
  <p align="center">UTimeManager</p>
  <p align="center" width="100%">
  <a href="https://utimemanager.netlify.app/">
    <img src="./docs/static/img/favicon.ico" width="200px" align="center">
  </a>
  </p>
  <h4 align="center">Plan, Record and Review your weekly schedule
</h4>
  <p align="center" width="100%">
    <a href="https://sustainazon.web.app/">https://utimemanager.netlify.app/</a>
  </p>
</h1>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#installation">Installation</a> •
  <a href="#running-the-app">Running the App</a>
</p>

## Introduction

Plan, Record and Review your weekly schedule

- **Easy to Use**

  > In just a few clicks, you can plan out your schedule for the week to follow!

- **Focus on What Matters**

  > From your planned out time schedule, you can spend more time focusing on your studies!

## Installation

### Github

1. Download the repository

```
git clone https://github.com/GDSCUTM-CommunityProjects/UTimeManager
```

### Installation

1. Install the following requirements

- Yarn >= 2+
- Node >= 14.17.0

2. Install the dependencies for the client

```
cd client
yarn install
```

3. Install the dependencies for the server

```
cd backend
yarn install
```

### Running the app

#### Client Setup

1. Running the client

```
yarn run start
```

#### Server Setup

1. Setting up the server `.env` file

```
JWT_SECRET="YOUR JWT SECRET"
MONGO_URI="YOUR MONGO URI"
NODE_ENV="YOUR NODE ENVIRONMENT"
PORT="SERVER PORT"
```

2. Running the server

```
yarn run start
```

**Note**: The server will fail to start if the server can't connec to your Mongo database.

The client and server will be listening and serving on port `3000` and `5000` respectively.

