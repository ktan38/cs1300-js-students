var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?filter[author]=Sm.&token=yrSJoHRw9E3yA01cgbSvaBSZoLc4MXSrmO-kHrdd3XM";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      var edible  = JSON.parse(request.response);
      edible = edible.data;
      edible.forEach(printPlant);
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////

function printPlant(plantData){
  var div = document.createElement('div');
  div.className = "grid-item";
  var url = plantData.image_url
  if (url !== null) {
    var img = document.createElement('img'); 
    img.src = url;
    div.appendChild(img);
  }
  var tag = document.createElement("p");
  var text = document.createTextNode(plantData.scientific_name);
  tag.appendChild(text);
  div.appendChild(tag);
  var element = document.getElementById("parent");
  element.appendChild(div);
}
