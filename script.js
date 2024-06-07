function toggle(toggled) {
    function createChild(name) {
      let child = document.createElement("div");
      child.id = "playlist-shelf-legend-" + name + "AAA";
      child.textContent = name.charAt(0).toUpperCase() + name.slice(1);

      child.style.fontSize = "16px";
      child.style.fontWeight = "500";
      child.style.color = "rgba(255, 255, 255, 1)";
  
  
      child.addEventListener("mouseover", function() {
        child.style.textDecoration = "underline";
        child.style.cursor = "pointer";
      })
  
      child.addEventListener("mouseout", function() {
        child.style.textDecoration = "none";
        child.style.cursor = "default";
      })
  
      return child;
    }
  
    let contents = document.getElementById("contents").children[0];
  
    if (toggled) {
        let template = contents.children[1];
        let legend = document.createElement("ytmusic-responsive-list-item-renderer");
        legend.id = "playlist-shelf-legend";
        legend.className = "style-scope ytmusic-playlist-shelf-renderer";
        legend.setAttribute("num-flex-columns", template.children[0].attributes[2].value);
        legend.setAttribute("should-render-subtitle-separators", "true");
        legend.setAttribute("secondary-flex-columns", "[]");
        legend.setAttribute("has-thumbnail-overlay", "true");

        console.log(template.children[0].attributes);
        
        contents.insertBefore(legend, contents.children[0]);
        
        legend.children[5].style.width = "100px";
        
        let title = createChild("title");
        let artist = createChild("artist");
        let album = createChild("album");
        let duration = createChild("duration");
        
        legend.children[4].children[0].children[0].insertBefore(title, legend.children[4].children[0].children[0].children[0]);
        
        if (template.children[0].attributes[2].value === "4") {
            let play = createChild("play");
            
            artist.style.width = "48%";
            play.style.width = "48%";
            album.style.width = "52.1%";
            
            legend.children[4].children[2].insertBefore(artist, legend.children[4].children[2].children[0]);
            legend.children[4].children[2].insertBefore(play, legend.children[4].children[2].children[1]);
            legend.children[4].children[2].insertBefore(album, legend.children[4].children[2].children[2]);
        } else {
            artist.style.width = "49%";
            album.style.width = "50%";
            
            legend.children[4].children[2].insertBefore(artist, legend.children[4].children[2].children[0]);
            legend.children[4].children[2].insertBefore(album, legend.children[4].children[2].children[1]);
        }
        
        legend.children[6].appendChild(duration);

    } else {
        contents.removeChild(document.getElementById("playlist-shelf-legend"));
    }
  
  }

export { toggle }