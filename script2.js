
// Collecting DOM element
const favheroesList = document.getElementById("fav-heroes-list");

let favarray = JSON.parse(localStorage.getItem("fav")); // getting favouriteHerores array from local storage into favarray

// adding the array item to the DOM (unordered list) 
function addfavHeroesToDOM(favhero)
{
    const li = document.createElement("li");

    li.innerHTML = 
    `       
    <img src =${favhero.thumbnail.path +"."+ favhero.thumbnail.extension} class="hero-thumbnail" width="200" height="100%" alt="image here">
    <p>${favhero.name}</p>
    <!-- <i class="fa-solid fa-heart" id="like" data-id="${favhero.id}"></i> -->

    `;

    favheroesList.append(li);

}

// this function will pass the individual element of the main "favarray" array (which is comming from local storage)
function renderHeroes()
{
    favheroesList.innerHTML = "";


    for(let i=0; i < favarray.length; i++)
    {
        
         addfavHeroesToDOM(favarray[i]);  
        console.log(favarray[i]);
    }

}

renderHeroes();


function reload()
{

    location.reload();
}

setInterval(reload,5000);   // refreshing the page every 5 seconds