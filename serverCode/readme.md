Important things to note:
    - The server deal with serving the website code, just run the build with expo build:web to update
    - 


run the server from serverCode with npm start

start the website from websiteCode with expo start

docker build -t frasergame .

expo build:android to create an android build
expo build:web to update the web build served by the server

to setup the server :
npm run setup

For this to work you need to enable port forwarding on port 50 internal and external
UPNP might work but is unreliable
https://my.noip.com/dynamic-dns/duc can be used to update the dns record, use this
if we can get upnp working as well that would be awesome

to teardown the server : 
npm run teardown

Road map
-   Make the server more robust so it doesn't crash as often, change from a list to uing hashtables
-   Add pop up for when rules are done

low priority
-   Setup and teardown could be done with a cypress script
-   How feasible is a drawing game?
-   Rule generator page for me to create new rules
-   Animations and Intro video