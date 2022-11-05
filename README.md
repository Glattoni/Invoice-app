# About
This project is a full-stack invoice application. It was build using `MEAN` (MongoDB, Express, Angular, Node) stack.
If you are interested in the API, you can find it by this [link](https://github.com/Glattoni/invoice-app-api). The project features custom form elements such as custom datepicker and multiselect inputs. In case you are interested in the development process, you can check out the issues and pull requests on the `development` branch. I have tried to keep everything documented. In case you found any bug or have any suggestions about improving code quality, do not hesitate to open an issue or create a pull request.

## Getting started
_Note: If you are a firefox user, you might need to set this flag `layout.css.has-selector.enabled` to true as `:has` pseudo-selector has not yet been enabled by default._

You will need to have `Node.js` installed. You can get it by visiting https://nodejs.org or by using any of the node version managers. It is recommended to use [fnm](https://github.com/Schniz/fnm).

## Architecture
Data is stored in the `MongoDB` database. `Express.js` and `Mongoose` are used to communicate with a database.


<div align="center">
  <img src="./src/assets/images/architecture.svg" alt="i use arch btw">
</div>


## Development
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
