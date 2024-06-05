document.getElementById("switch").addEventListener("change", function(event) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var currentTab = tabs[0]; // Get the first tab object in the array

      if(currentTab.url.includes("https://music.youtube.com/playlist?")) {
          let toggled = event.target.checked;

          console.log("toggled");
          let contents = tabs;
          console.log(contents);
          chrome.scripting.executeScript({
              target: { tabId: currentTab.id },
              func: toggle,
              args: [toggled],
          })
      }
    });
  });

function toggle(toggled) {
  function createChild(name) {
    let child = document.createElement("div");
    child.className = "style-scope ytmusic-playlist-shelf-renderer";
    child.id = "playlist-shelf-" + name;
    child.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    child.style.fontSize = "16px";
    child.style.fontWeight = "500";
    child.style.color = "#AAAAAA";


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
      let legend = document.createElement("div");
      legend.id = "playlist-shelf-legend";
      legend.className = "style-scope ytmusic-playlist-shelf-renderer";
    
      legend.clientWidth = contents.children[1].clientWidth;
      legend.scrollWidth = contents.children[1].scrollWidth;
      legend.clientHeight = contents.children[1].clientHeight;
      legend.scrollHeight = contents.children[1].scrollHeight;
      legend.style.display = "flex";
      legend.style.justifyContent = "space-around";

      let title = createChild("title");
      legend.appendChild(title);

      let artist = createChild("artist");
      legend.appendChild(artist);
      
      let album = createChild("album");
      legend.appendChild(album);
      
      let duration = createChild("duration");
      legend.appendChild(duration);
    
      // let title = document.createElement("div");
      // title.className = "style-scope ytmusic-playlist-shelf-renderer";
      // title.id = "playlist-shelf-title";
      // title.textContent = "Title";
      // title.style.fontSize = "16px";
      // title.style.fontWeight = "500";
      // title.style.color = "#AAAAAA";
      // legend.appendChild(title);
    
      // let artist = document.createElement("div");
      // artist.className = "style-scope ytmusic-playlist-shelf-renderer";
      // artist.id = "playlist-shelf-artist";
      // artist.textContent = "Artist";
      // artist.style.fontSize = "16px";
      // artist.style.fontWeight = "500";
      // artist.style.color = "#AAAAAA";
      // legend.appendChild(artist);
    
      // let album = document.createElement("div");
      // album.className = "style-scope ytmusic-playlist-shelf-renderer";
      // album.id = "playlist-shelf-album";
      // album.textContent = "Album";
      // album.style.fontSize = "16px";
      // album.style.fontWeight = "500";
      // album.style.color = "#AAAAAA";
      // legend.appendChild(album);
    
      // let duration = document.createElement("div");
      // duration.className = "style-scope ytmusic-playlist-shelf-renderer";
      // duration.id = "playlist-shelf-duration";
      // duration.textContent = "Duration";
      // duration.style.fontSize = "16px";
      // duration.style.fontWeight = "500";
      // duration.style.color = "#AAAAAA";
      // legend.appendChild(duration);
    
      contents.insertBefore(legend, contents.children[1]);
  } else {
      contents.removeChild(document.getElementById("playlist-shelf-legend"));
  }

}

