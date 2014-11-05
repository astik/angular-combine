To run this example :
npm install
grunt server

Check the console :

Add conf to angularCombine RegExp /^views\/admin\// views/admin.html
	--> This is our specific configuration (see into scripts/app.js)
GET http://127.0.0.1:9000/views/main.html
	--> Classic loading of a single partials into a single HTML file (this is usual Angular mechanism)

Click on a link "Enity 1" :
	
fetching all templates combined into views/admin.html
GET http://127.0.0.1:9000/views/admin.html
	--> The ajax call for the combine files is made

Click on another link : "Enity 2" or "Enity 3" :
	--> No additional HTTP call
