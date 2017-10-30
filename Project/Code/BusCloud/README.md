### CMPE281
Final project for CMPE281 -- Cloud technology

###### Demo

[![Everything Is AWESOME]](https://www.youtube.com/watch?v=9mgMhlu86yg "Everything Is AWESOME")

###### DB Command

```
npm i --save sequelize
npm i --save mysql

sequelize init

sequelize model:create --name=Author --attributes name:string,bio:text --underscored

```

###### How to run application

```
//Install node from https://nodejs.org/en/download/

npm i
PORT=8000 nodemon index.js

```


###### Create your .env file in the main folder for development

```
DATABASE_URL=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PW=
```

##### Technology

* MySQL
* Sequelize
* ExpressJS
* Angular
* HandleBar


##### How to deploy to heroku

```
//Create app in heroku
//Go to settings to set up your .env variable, copy variables for each entry based on your .env file

//Add git to your heroku
heroku git:remote -a <your_heroku_app>

//Deploy to your heroku
git push heroku <master-branch to deploy>

//See how query run by tailing your logs
heroku logs -t -a <your_app>

```


##### Experiment with Load Balancer implementation on Node

```
node index.js 8001 & node index.js 8002 & node index.js 8003 & node load-balancer.js 8000
```

##### View console.log with node-monkey
```
//Load
http://localhost:50500/
```

##### EC2

npm i forever -g



```

netstat -an | grep "LISTEN "

### Run application
forever start index.js 8001 & forever start index.js 8002 & forever start index.js 8003 & forever start load-balancer.js 8080

### Stop application
forever stop load-balancer.js
forever stop index.js

sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to 8080
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to 8000
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to 8001
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to 8002
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to 8003

```

