# Oldschool Runescape Progress Tracker

A simple static webapp to keep track of your progress in OSRS. Each image can be toggled _on_/_off_, you can input the number of clues you have completed at each tier, and you can show what stage of each Achievement diary you have completed.

The envisioned workflow is to toggle the icons representing the things you have achieved/collected, then rendering and downloading an image of your progress.

The project is far from perfect, and there will always be items that are not added. If you have a suggestion, feel free to add it!

## Development

### Adding objects
* All items should have a corresponding entry in `metadata.json`.
* In order to add another item to an existing group, simply add a new object with a reasonable id and the path to an image file.
* To add a new group (like a new GWD Boss), create a JSON object called _items_ with a group_id, an optional group_type and a JSON array of items.
* To add a new section, create a JSON object with a reasonable name, and add the necessary groups as above. In order for it to show on the page, you need to create your new section in `content.js`using `createSection(itemdata.your-new-section, "name-of-div");`

### Running a server
* To show the page, navigate to the root directory and run `python -m SimpleHTTPServer`
* Visit `localhost:8000` in your browser.
* Currently development has only been done on Unix.


## License

I mean, I would think that you are free to use this as you see fit, as long as my name is still there somewhere. The images used as icons are copyright of Jagex Ltd., but I would hope that this falls under Fair Use.
