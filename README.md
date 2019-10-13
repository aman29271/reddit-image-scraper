# reddit-image-scraper
Reddit Image Scraper

**Reddit** is a simple command-line app written in Node.Js which fetches all media files on [Reddit](https://www.reddit.com) and stores it in `data.txt` file.

# Installation

```bash
git clone https://github.com/aman29271/reddit-image-scraper
cd reddit-image-scraper
# Open index.js file in any text-editor. Go to second last line  `let sr = "search-here"` and put your search name on [search-here].
node index.js
```

After running `node index.js` you may see that `data.txt` file has got populated. It contains links to all your media files.

for downloading media files I prefer [wget](https://www.gnu.org/software/wget/) as best option.

for linux users
```bash
# They can directly install wget by following command

pip install wget

# After installing wget go to directory where you want to download image and run

wget -i [path_to_txt_file] -nc --timeout=3 # i for input through file # nc for getting duplicated

# It will recursively download your media file in specified location. You may found documentation on wget by

man wget # in Linux
```
# Author
Aman Kumar