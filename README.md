# ESPP music server

### Maintain guide
* Run `npm run build-maintain` to build the maintain script
* Run `npm run maintain` to start the maintain REPL
* In the maintain REPL, run `update()` to update the database
  * The `update()` function will add songs that have files in the song folder to the database if no song with the same file name is found, as well as removing songs from the database automatically if the files for the songs cannot be not found.
  * It will also create a `songs.json` file in the maintain folder. Change the song name and tag in this file and then run the `update()` function once more to update new song to the database
  * If the song file name is written in snake_case, the song name will be deducted automatically
* Run `.exit` to exit the REPL
