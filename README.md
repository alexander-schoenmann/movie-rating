# Webserver ```movie-rating```
The current vaccination rate in Austria is compared with movie ratings. The vaccination data comes from the website of the Austrian Ministry of Health, the movie data comes from IMDb. For each rating level, only those film ratings are used which have been rated most frequently.

## 1 Usage

### 1.1 Preparation
Download the project from the master branch and save the zip file on your local machine. Unzip the zip file into a new folder (e.g. project).

### 1.2 Server
It is possible to run the webserver via localhost as well as via webhosting. 

The procedure is the same for both variants. Navigate to https://nodejs.org/en/download/ and download the latest LTS version of Node.js. Originally I used the following versions for the development of the project:
- node: 14.16.0
- npm: 6.14.11

Navigate to the folder "project", open a terminal and install the necessary packages with the command ```npm install```
With ```set PORT=3000``` you can specify a custom port (e.g. 3000). It has to be a free port number.
After that the file data.tsv (contains all ratings as .tsv) needs to be converted into the file movie-data.json (contains the 50 most rated movies per rating level as .json).

#### Note: 
To prevent the use of the file data.tsv (about 20MB), the process of file-reading can also be done using fetch. For this, the corresponding lines in the data.js file must be enabled. 

To create the movie-data.json file, the command ```node data.js``` is necessary. 

### 1.3 Launch the webserver
Afterwards, the web server can be started using ```node server.js``` From now on the website is available on the webserver at http://localhost:3000.

## 2 Administration corner
### 2.1 Contribution
Pull Requests are gladly welcome! Nevertheless please don't forget to add an issue and connect it to your pull requests. This is very helpful to understand what kind of issue the PR is going to solve.

Bugfixes: Please describe what kind of bug your fix solve and give me feedback how to reproduce the issue. I'm going to accept only bugfixes if I can reproduce the issue.

Features: Not every feature is relevant for the bulk of ```movie-rating``` users. In addition: I don't want to make ```movie-rating``` even more complicated in usability for an edge case feature. It helps to have a discussion about a new feature before you open a pull request.

### 2.2 Contact
If you have any questions regarding the project, please do not hesitate to contact me. I can be reached at alexander@schoenmann.co.at.
