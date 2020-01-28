# ESPP music server

## Installation
### Dependencies
This software officially support the following OS and sofware:
* Debian 10 (buster) on amd64
* NodeJS 10.16.2, npm 6.13.1
* OpenSSL 1.1.1d
* MongoDB 4.2.1  

Other versions or softwares are not guaranteed to be compatible with this software.
### Acquiring the software
Before installation, make sure you have the OS and all dependencies up and running.  
The software can be acquire from [github](https://github.com/VAMK-embedded-project-2019A/Backend "Backend").  
You can download the zip file or clone the git repos to your server machine.
### Generate RSA key
Run the script keygen.sh in the project root folder to generate the RSA keys. The keys will be stored in the ssl folder.
### Configured the database
Make sure you have the MongoDB database up and running, and acquire the connection string before hand.  
Open the `src/index.ts` file with your preferred text-editor and replace the string in the `connect()` function with your connection string.
### Running the server
In the project root folder, run `npm install` to install the dependencies.  
Run `npm run start` to start the server.
### Setup sftp
Follow [this guide](https://www.linuxtechi.com/configure-sftp-chroot-debian10/) to setup the sftp.  
Replace the line `ForceCommand internal-sftp` with `ForceCommand internal-sftp -R` in the `/etc/ssh/sshd_config` file to set the sftp server to be read-only.
### Maintainance for the database
Put the path to the folder containing the songs into the `song_path` constant declared in `maintain/index.ts`  
Run `npm run build-maintain` to build the maintain script  
Run `npm run maintain` to start the maintain REPL  
In the maintain REPL, run `update()` to update the database
* The `update()` function will add songs that have files in the song folder to the database if no song with the same file name is found, as well as removing songs from the database automatically if the files for the songs cannot be not found. This function work on wav and mp3 files only.
* It will also create a `songs.json` file in the maintain folder. Change the song name and tag in this file and then run the `update()` function once more to update new song to the database
* If the song file name is written in snake_case, the song name will be deducted automatically. For example, a song file "lioness\_-\_dayfox.wav" will have the name "Lioness - Dayfox".

Run `.exit` to exit the REPL
