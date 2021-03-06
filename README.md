# PokeDex Demo Project

This project is a front-end skills demonstration to show my competency in front-end design and development. This project mainly is created using React and Typescript. Backend information, images, and UI specification were provided while all else was created from scratch.

## To run:
1. Install [node.js](https://nodejs.org/en/download/)
2. Install [git](https://git-scm.com/downloads)
3. Download repository: `git clone https://github.com/scottdrichards/pokedex`
4. Open folder: `cd ./pokedex`
5. Install packages: `npm install`
6. Run: `npm start`

## Comments:
- Sizes, layouts, and colors are not pixel-perfect accurate.
- I was having trouble with the colorthief library for grabbing primary/secondary colors from images, so I wrote my own basic one. Because of security/CORS, the script cannot read pixel data from images from other origins. This will generate an error in the browser and automatically fall back to a Google proxy with more permissive CORS policies.
  - This dominant color script just counts colors and does not do any form of clustering. This makes it rather innacurate for most images but is sufficient to demonstrate the effect of dynamic theming.
- The specification called for a back button in the detail page. This can have ambiguous behavior as to whether it should do the browser history back or go to the list page. I do not believe I back button is appropriate within a browser as it conflicts with the native back functionality and can be confusing to the user. I implemented it so that it goes back (browser history) if the previous session history item is in the same domain and otherwise is a dumb link to the list.
## Improvements
- The server API calls are rather slow. With such a small amount of data crossing paths, I think it would be better to grab the entire database and store it in the browser storage, then keep a connection open for updates should they come. This would ease the burden on the server from having so many requests and speed up page operations.
- Pagination is a presentation attribute. It would be better to have the client handle pagination. For example, the client could request a range of items to be returned by the server. The server could set a limit for how many items can be sent at a time.
- Images seem to have variable amount of whitespace.
- I could update the detail page to have hard-coded sizes for (most?) elements to prevent pop-in when the data loads.
- When doing a search, the pagination links returned do not include the search queries. As this is a server-side error, I did not correct it.
for the end.

# Screenshots
## Desktop
### Main
<img src="screenshots/desktop_main.jpg" height="400" /><br />
### Pagination
<img src="screenshots/desktop_pagination.jpg" height="400" /><br />
### Search
<img src="screenshots/desktop_search.jpg" height="400" /><br />
### Detail
<img src="screenshots/desktop_detail.jpg" height="400" /><br />
## Mobile
### Detail
<img src="screenshots/mobile_detail.jpg" height="400" /><br />
### Search
<img src="screenshots/mobile_search.jpg" height="400" /><br />
### Pagination
<img src="screenshots/mobile_pagination.jpg" height="400" /><br />
