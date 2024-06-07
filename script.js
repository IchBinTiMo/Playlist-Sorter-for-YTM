function toggle(toggled) {
    function createChild(name) {
        let child = document.createElement("div");
        child.id = "playlist-shelf-legend-" + name;
        child.textContent = name.charAt(0).toUpperCase() + name.slice(1);

        child.style.fontSize = "16px";
        child.style.fontWeight = "500";
        child.style.color = "rgba(255, 255, 255, 1)";
        child.setAttribute("order", 0);

        child.addEventListener("mouseover", function () {
            child.style.textDecoration = "underline";
            child.style.cursor = "pointer";
        });

        child.addEventListener("mouseout", function () {
            child.style.textDecoration = "none";
            child.style.cursor = "default";
        });

        return child;
    }

    function getSongs() {
        let songs = document.getElementsByTagName(
            "ytmusic-responsive-list-item-renderer"
        );
        songs = [...songs].filter(
            (element) => element.id !== "playlist-shelf-legend"
        );

        let res = new Map();

        for (let song of songs) {
            let attr = song.textContent
                .trim()
                .split(/\n/)
                .filter((element) => element.trim() !== "");
            let title = attr[0].trim();
            let duration = attr[attr.length - 1].trim();

            attr = song.getAttribute("secondary-flex-columns");
            attr = JSON.parse(attr);
            // console.log(attr);

            if (attr.length === 3) {
                let artist = "";
                if (attr && attr[0].text && attr[0].text.runs && attr[0].text.runs[0].text) {
                    artist = attr[0].text.runs[0].text;
                }

                let plays = "";
                if (attr && attr[0].text && attr[0].text.runs && attr[0].text.runs[0].text) {
                    plays = attr[0].text.runs[0].text;
                }

                let album = "";
                if (attr && attr[0].text && attr[0].text.runs && attr[0].text.runs[0].text) {
                    album = attr[0].text.runs[0].text;
                }

                res.set(song, {
                    title,
                    artist,
                    plays,
                    album,
                    duration,
                });
            } else {

                let artist = "";
                if (attr && attr[0].text && attr[0].text.runs && attr[0].text.runs[0].text) {
                    artist = attr[0].text.runs[0].text;
                }

                let album = "";
                if (attr && attr[0].text && attr[0].text.runs && attr[0].text.runs[0].text) {
                    album = attr[0].text.runs[0].text;
                }

                res.set(song, {
                    title,
                    artist,
                    album,
                    duration,
                });
            }
        }

        return [...res];
    }

    function sortByTitle(songs) {
        let contents = document.getElementsByClassName("style-scope ytmusic-playlist-shelf-renderer");
        contents = [...contents].filter((element) => element.id === "contents")[0];
        console.log(contents);

        songs.sort((a, b) => {
            return a[1].title.localeCompare(b[1].title);
        });
    }

    let contents = document.getElementById("contents").children[0];

    let songs = getSongs();

    if (toggled) {
        let template = contents.children[1];
        let legend = document.createElement(
            "ytmusic-responsive-list-item-renderer"
        );
        legend.id = "playlist-shelf-legend";
        if (template.children[0]) {
            legend.setAttribute(
                "num-flex-columns",
                template.children[0].attributes[2].value
            );
        } else {
            legend.setAttribute("num-flex-columns", "3");
        }

        contents.insertBefore(legend, contents.children[0]);

        legend.children[5].style.width = "100px";

        let title = createChild("title");

        title.addEventListener("click", () => {
            sortByTitle(songs);
        });

        let artist = createChild("artist");
        let album = createChild("album");
        let duration = createChild("duration");

        legend.children[4].children[0].children[0].insertBefore(
            title,
            legend.children[4].children[0].children[0].children[0]
        );

        if (template.children[0] && template.children[0].attributes[2].value === "4") {
            let plays = createChild("plays");

            artist.style.width = "48%";
            plays.style.width = "48%";
            album.style.width = "52.1%";

            legend.children[4].children[2].insertBefore(
                artist,
                legend.children[4].children[2].children[0]
            );
            legend.children[4].children[2].insertBefore(
                plays,
                legend.children[4].children[2].children[1]
            );
            legend.children[4].children[2].insertBefore(
                album,
                legend.children[4].children[2].children[2]
            );
        } else {
            artist.style.width = "49%";
            album.style.width = "50%";

            legend.children[4].children[2].insertBefore(
                artist,
                legend.children[4].children[2].children[0]
            );
            legend.children[4].children[2].insertBefore(
                album,
                legend.children[4].children[2].children[1]
            );
        }

        legend.children[6].appendChild(duration);
    } else {
        contents.removeChild(document.getElementById("playlist-shelf-legend"));
    }
}

export { toggle };
