General Information
---

### Gomoku Web Game
This is a solo continuation of [this](https://github.com/Ezuharad/CSE201-Final-Project) project with a focus on using object oriented design principles, cutting edge web technologies, and an AGILE development workflow.

### Author Information
- Project design and implementation by [Steven Chiacchira](https://github.com/Ezuharad)  
- Algorithms for game state calculations adapted from [Longze Li](https://github.com/LongzeLi)  
- Additional support provided by [Bolin Chen](https://github.com/SharkCh1L1) and [Shaobo Su](https://github.com/Shaobo-sus9)

Installation Instructions for
---
### Requirements
To get started you will need the following:
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) (last tested using Git v2.38.1)
- [Docker](https://docs.docker.com/engine/install/) (last tested using Docker v20.10.17)
- [Deno](https://deno.land/manual@v1.28.3/getting_started/installation) (last tested using Deno v1.27.2, v8 engine v10.8.164.4, and Typescript v4.8.3)
- [Sass](https://sass-lang.com/install) (last tested using dart sass v1.56.1)

### Installation (Windows 10)
Once these have been installed __and added to your path__, invoke windows powershell and execute the command:
> git clone https://github.com/Ezuharad/Gomoku-Web-Game \<download directory>

After executing the above command git should begin downloading from the github repo.  

Once this has finished you will need to compile the sass files to css files using sass. Navigate to the project root directory, then execute the command:
> sass --no-source-map .\src\public\sass:.\image-src\public\css

This should create a new `css` folder in the `image-src` folder which the HTML files will use.  
Finally you will need to create a docker image, build it, then run it. First ensure that Docker Desktop is running as a background process, then execute the following command from the project root directory:
> docker build ./ -t \<image name>

This will build a new docker image from the dockerfile using your own image name.

Use Instructions
---
### Running the Container
To run your docker container, simply execute:
> docker run -d -p \<port>:9999 \<image name> --name \<container name>

This should run your new image as a docker container and allow you to access it with your browser of choice.

### Accessing the Game (Windows 10)
To access the game, first open up powershell and execute:
> ipconfig

From here you should see information about your computer's IP address. Locate the one labeled "IPv4 Address" for your network of choice. Once you have found this, enter the ip address followed by the port number you bound the docker process to in your browser of choice.

### Deactivating the Container
To deactivate your docker container, execute: 
> docker stop \<container name>
