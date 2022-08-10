let ts = 12345;
let hash = "9445f302db681e2ad5156377c9f49b86";

const api_key = "a3fbf3ef114685766d0a3f8332f28496"; //public key
const private_key= "1b9ea246c4f8de26d363401e8d7de960a11bcf56";
// console.log(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${api_key}&hash=${hash}`);


//Collecting all required DOM elements
const heroesList = document.getElementById("heroes-list");
const like_button = document.getElementById("heroes-list");
const search_button = document.getElementById("search");

//Array of heroes
let harray = [];
let favoriteHeros = [];
let searchArray = [];


// Fetching heroes/characters data from Marvel's API 
async function fetchHeroes()
{
    let offset = 0;
    let limit = 100;

    try
    {   
        for(let i=0; i<=15; i++)
        {
            
            let response = await fetch(`http://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${api_key}&hash=${hash}`);
            
            let out = await response.json();
            console.log("Total data : ", out.data.total);
            harray = harray.concat(out.data.results);
            
            renderHeroes(harray);

            offset = offset + 100;

        }
        console.log("Name : ",harray);
        console.log(`http://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${api_key}&hash=${hash}`);
        
        //Adding like property to individual hero object
        for(let i=0; i<harray.length; i++)
        {
            harray[i].like = false;
        } 

        

        return; 
    }
    catch(error)
    {
        console.log(error);
        return;
    }

}


//  adding the array item to the DOM (unordered list)
function addHeroesToDOM(hero)
{
    const li = document.createElement("li");

    li.innerHTML = 
    `       
        <img src =${hero.thumbnail.path +"."+ hero.thumbnail.extension} class="hero-thumbnail" width="200" height="100%" alt="image here">
        <p id="hero"><a href="./singleSuperHero.html" target="_blank" id="heroO" class="hero-link">${hero.name}</a></p>
        <i class="fa-solid fa-heart" id="like" data-id="${hero.id}"></i>
    `;

    heroesList.append(li);

}




// this function will pass the individual element of the main hero array (harray).
function renderHeroes(array)
{
    heroesList.innerHTML = "";   

    for(let i=0; i < array.length; i++)
    {   
        
        addHeroesToDOM(array[i]);   // adding the individual element/hero to DOM.
        // console.log("Name : "+ harray[i].name);
    }


}


// function to toggle like button and add/remove from favorite page.
function toggleLikeAndAddToFav(heroId, target)
{
    
    harray.forEach((ele)=>{
        if(ele.id === Number(heroId))
        {
            ele.like = !ele.like;
            // window.alert(`Hero: ${ele.name} , Like: ${ele.like}`);
            if(ele.like === true)
            {
                target.style.color = "red";
                favoriteHeros = favoriteHeros.concat(ele);
                localStorage.setItem("fav", JSON.stringify(favoriteHeros));     // adding favoriteHeroes array to local storage
            }
            else{
                target.style.color = "grey";
                let indexValue = favoriteHeros.indexOf(ele);
                favoriteHeros.splice(indexValue, 1);                            // removing hero from favoriteHeroes array.
                localStorage.setItem("fav", JSON.stringify(favoriteHeros));     //  adding favoriteHeroes array to local storage
            }
            return;
        }
    })
}



// Handling the click listener on like button and individual hero
function handleClickListener(e)
{
    const target = e.target;

    if(target.id === "like")    // cheking for like button
    {   
        // console.log("Inside hcl");
        const heroId = target.dataset.id;
        toggleLikeAndAddToFav(heroId, target);  //calling togglelike function
        return;
    }

    else if(target.id === "heroO")  // checking for individual hero
    {
        harray.forEach((element)=>{
            if(target.innerHTML === element.name)
            {  
                console.log(element.name);
                localStorage.clear("currentHero");
                localStorage.setItem("currentHero", JSON.stringify(element));
                return;
            }
        })

        // localStorage.setItem(); 

    }

}




// search box logic function
function handelInputKeyPress(e) {
    if(e.key == "Enter")
    {   
        searchArray.splice(0, searchArray.length); // clearing previous search elements from seacrh array
        const t = e.target.value;
        const text = t.charAt(0).toUpperCase() + t.slice(1) // Captitalizing first alphabet of search string : iron -> Iron
        console.log(text);
        if(!text) {
            alert("Search text can not be empty...");
            return;
        }

        // heroesList.innerHTML = "";
        harray.forEach((element)=>{
            if(element.name.includes(text))         // checking if the main hero array (harray) contains the search text/hero
            {
                console.log("hero found");
                searchArray = searchArray.concat(element);
            }
            else{
                // console.log("hero not found");
            }
        })

        
        renderHeroes(searchArray);      // rendering the searched items/heroes

        e.target.value="";


    }
};





function intializer()           // initializer function 
{
    fetchHeroes();
    document.addEventListener("click", handleClickListener);
    search_button.addEventListener("keyup", handelInputKeyPress);
}

intializer();




