# node-mock-api
Simple nodejs (expressjs) API example.

## Getting Started

To get you started you can simply clone the node-mock-api repository and install the dependencies.

### Clone node-mock-api

```
git clone https://github.com/martinbilek/node-mock-api.git
cd node-mock-api
```

### Install Dependencies

```
npm install
```

### Run the Application

```
npm start
```

Now browse to the app at `http://localhost:8989/`.

#### Example URLs:

GET `http://localhost:8989/heroes/`  # get list of heroes
GET `http://localhost:8989/heroes/15`  # get detail of hero with id 15
POST `http://localhost:8989/heroes/15`  # update hero with id 15
