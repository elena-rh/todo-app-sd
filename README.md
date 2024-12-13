# Waffles - The to-do app: NGINX add-on

This repository hosts the project for the "Distributed Systems" course; this solo submission consists of the addition of server replication via NGINX to [the project that was previously developed](https://github.com/cake-lier/todo-app) as a team for another exam.

From the [README](https://github.com/cake-lier/todo-app/blob/main/README.md) of the original project:


> We developed a single-page application for saving all your precious to-do lists, so you can keep track of all the things you need to remember during your day. But here's the thing: each item in a list is associated with a count, so you can use our app also for writing your grocery list, keeping track of the clothes you put into your luggage, and tracking whatever you want to count.
>
> The first thing you'll see logging in is the roll-up of all the fundamental things you wanted to remember or which are essential to remember because they will, are, or were due.
>
> We also provide easy-to-use charts. They allow you to see more clearly how your progression in completing the items in your lists is going. A calendar is also available for grouping the items by the day they'll be due or by the day you told us to remind them.
>
>You don't have to worry about having too many lists or too many to-dos. With our efficient search functionality, you can search between all items you previously tagged and see in which list you inserted them.
>
>But the most prominent feature is collaboration! You can share your lists with your friends to make them help you. In this way, you can complete the tasks you created together. No account is required! A new member can access the list as an anonymous user: you decide if it can access the list or not. Moreover, the access is only temporary: when the user leaves the page will need to request access to the list again. Whenever anyone modifies a list you're in will receive a notification in real-time about what happened.
>
>This app keeps on giving: a system of achievements is in place, making the organization of your daily tasks fun!

My addition to this project was a reverse proxy implemented via NGINX, to which two replicas of the Node app are available, for improved reliability, availability and future scaling.

## How to run

(See the original [README](https://github.com/cake-lier/todo-app/blob/main/README.md) for more.)
⚠️ Project's Node version is 16.1.1. ⚠️

### Pull the required images from DockerHub

1. Clone this repo.
2. Move to the main folder of this repo with ```cd todo-app-sd```.
3. Deploy the application using ```make up```.

When the messages

> "nodeapp1 started"
> 
> "nodeapp2 started"
> 
> "Connection with the database established"

appear on-screen, the installation of this app onto your system is complete. If you want to use it, reach `localhost:9000` from your browser to access the app. The app may take some seconds to make those messages appear, so be patient for a bit. If the app exits unexpectedly during this phase, please retry.


## How to use and shut down the application

The database is pre-populated with some accounts showcasing use cases. The accounts are as follows:

| Username | Email                     | Password  |
|----------|---------------------------|-----------|
| sara     | sara.camporesi@mail.com   | Password1 |
| lucy     | lucia.hu@mail.com         | Password1 |
| chiarina | chiara.lombardi@mail.com  | Password1 |
| marco_98 | marco.venturi@mail.com    | Password1 |
| ale      | alessandro.raggi@mail.com | Password1 |
| dalia    | dalia.giunchi@mail.com    | Password1 |

If you want to shut down the application, you only need to execute the command ```make down``` and Docker will shut down all containers and delete them.


## Tests

### Load balancing

I prepared a simple test that simulates 10 clients to showcase how the NGINX reverse proxy distributes their requests across the two available proxy servers `nodeapp1` and `nodeapp2`.
From the main folder, simply execute ```npm test```.

The test is run on Newman, Postman's CLI tool.

### Fault tolerance

To test the fault tolerance of the NGINX add-on, simply login (with local client it connects to server `nodeapp1`), perform whatever operation you desire, then stop the Docker container running `nodeapp1` with the command ```docker container stop nodeapp1```. The browser interface will show no sign of disconnection, and you can keep using the site undisturbed.

I also prepared two Postman collections located in folder `/test/test_collections` that can be imported into the Postman application and ran, pausing in between collections to stop the `nodeapp1` container to simulate a crash.

The collections test that the user can login, create a list A, (`nodeapp1` fails), get automatically redirected to healthy proxy server, view list A, create list B correctly, all without needing to login again.
