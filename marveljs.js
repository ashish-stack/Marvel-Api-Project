// Selecting the input and button elements
let inputEl = document.querySelector("#input-box");
let buttonEl = document.querySelector("#submit-button");
let searchListEl = document.querySelector(".list");

// Selecting the list for displaying all heroes
let displayHeroesEl = document.querySelector("#displayheroes");

// List for storing the favorite heroes
let listFav = [];
const favListEl = document.querySelector("#button-fav");

let date = new Date();
console.log(date.getTime());

// Constructing values for api data
const timestamp = '1709866604358';
const apiKey = '1287bb79320259bbf01788f7435133ed';
const hashValue = '2ccf544cb4cfaccf8f667a83cfa279d5';


// Fetching the list of all superheroes
window.onload = async () => {
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    jsonData.data["results"].forEach((element) => {
        console.log(element["name"]);
        const listEl = document.createElement("li");
        listEl.classList.add("eachheroes");
        listEl.innerHTML = `<div class="container-image">
        <img src="${element.thumbnail["path"]+"."+element.thumbnail["extension"]}">
        </div>
        <div class="container-name">
        ${element["name"]}
        </div>
        <div class="container-description">
        <h3>Description:</h3>
        ${element["description"]}
        </div>`;
        displayHeroesEl.appendChild(listEl);
        listEl.addEventListener("click", () => {

        });
    });
}


// auto-suggestion of names
window.onclick = () => {
    removeElements();
}

function removeElements(){
    searchListEl.innerHTML = "";
}

function displayWords(value){
    inputEl.value = value;
    removeElements();
}

inputEl.addEventListener("keyup", async () => {
    removeElements();
    if(inputEl.value.length < 4){
        return false;
    }
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${inputEl.value}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((element) => {
        let name = element.name;
        let div = document.createElement("div");
        div.style.cursor = "pointer";
        div.classList.add("autocomplete-items");
        div.setAttribute("onclick", "displayWords('"+name+"')");
        let word = "<b>"+name.substr(0, inputEl.value.length)+"</b>";
        word += name.substr(inputEl.value.length);
        div.innerHTML = `<p class="item">${word}</p>`;
        searchListEl.appendChild(div);
    });
});


// Adding click event for the submit button after search
buttonEl.addEventListener('click', async () => {
    if(inputEl.value.trim().length < 1){
        alert('Please enter superhero name');
    }
    displayHeroesEl.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${inputEl.value}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((element) => {
        const listEl = document.createElement("li");
        listEl.classList.add("eachheroes");
        listEl.innerHTML = `<div class="container-image">
        <img src="${element.thumbnail["path"]+"."+element.thumbnail["extension"]}">
        </div>
        <div class="container-name">
        ${element["name"]}
        </div>
        <div class="container-description">
        <h3>Description:</h3>
        ${element["description"]}
        </div>
        <button class="button-add" id="addToFav">Add to Favorites</button>`;
        displayHeroesEl.appendChild(listEl);
        let addToFavBtnEl = document.querySelector("#addToFav");
        addToFavBtnEl.addEventListener("click", () =>{
            let present = false;
            for(let i=0; i<listFav.length; i++){
                if(listFav[i]["id"] == element["id"]){
                    present = true;
                    break;
                }
            }
            if(!present){
                listFav.push(element);
            }
        });
    });
})

// Displaying all the favorite heroes
favListEl.addEventListener('click', () => {
    displayHeroesEl.innerHTML = "";
    listFav.forEach((element) => {
        const listEl = document.createElement("li");
        listEl.classList.add("eachheroes");
        listEl.innerHTML = `<div class="container-image">
        <img src="${element.thumbnail["path"]+"."+element.thumbnail["extension"]}">
        </div>
        <div class="container-name">
        ${element["name"]}
        </div>
        <div class="container-description">
        <h3>Description:</h3>
        ${element["description"]}
        </div>
        <button class="button-remove" id="removeFromFav">Remove from Favorites</button>`;
        displayHeroesEl.appendChild(listEl);
        let removeFavBtnEl = document.querySelector("#removeFromFav");
        removeFavBtnEl.addEventListener("click", () =>{
            for(let i=0; i<listFav.length; i++){
                if(listFav[i]["id"] == element["id"]){
                    console.log(listFav[i]["id"]);
                    listFav.splice(i,1);
                    break;
                }
            }
        });
    })
});