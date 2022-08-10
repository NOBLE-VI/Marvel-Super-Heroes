
//Collecting all required DOM elements
let heroName = document.getElementById("hero-name");
let heroDesc = document.getElementById("hero-description");
let heroimg = document.getElementById("hero-img");

const comics = document.getElementById("comic");
const events = document.getElementById("event");
const series = document.getElementById("series");
const stories = document.getElementById("stories");

const comicsList = document.getElementById("comic-list");
const eventsList = document.getElementById("event-list");
const seriesList = document.getElementById("series-list");
const storiesList = document.getElementById("stories-list");


let currentHero = JSON.parse(localStorage.getItem("currentHero"));  // getting current clicked hero from local storage


heroimg.src = `${currentHero.thumbnail.path}.${currentHero.thumbnail.extension}`;
heroName.innerHTML = currentHero.name;
heroDesc.innerHTML = currentHero.description.length>0 ? `${currentHero.description}` : `---No Description--`;

// showing total number of comics, events, etc...
function addDetailsToDOM()
{
    const p1 = document.createElement("p");
    
    p1.innerHTML = 
    `       
         Totals comics : &nbsp&nbsp${currentHero.comics.available} 

    `; 
    
    const p2 = document.createElement("p");

    p2.innerHTML = 
    `       
         Totals events : &nbsp&nbsp${currentHero.events.available} 

    `;

    const p3 = document.createElement("p");

    p3.innerHTML = 
    `       
         Totals series : &nbsp&nbsp${currentHero.series.available} 

    `;

    const p4 = document.createElement("p");

    p4.innerHTML = 
    `       
         Totals stories : &nbsp&nbsp${currentHero.stories.available} 

    `;



    comics.append(p1);
    events.append(p2);
    series.append(p3);
    stories.append(p4);

}



//  showing the list of Comics, Events, Series and Stories.
function addDetailsListToDOM()
{



    for(let i=0; i<currentHero.comics.items.length; i++)
    {
        const l1 = document.createElement("li");
        l1.innerHTML = 
        `       
             ${ currentHero.comics.items[i].name};
        
        `; 
        comicsList.append(l1);
    }
        

    for(let i=0; i<currentHero.events.items.length; i++)
    {
        const l2 = document.createElement("li");
        l2.innerHTML = 
        `       
            ${ currentHero.events.items[i].name};
        
        `; 
        eventsList.append(l2);
    }

    for(let i=0; i<currentHero.series.items.length; i++)
    {
        const l3 = document.createElement("li");
        l3.innerHTML = 
        `       
             ${ currentHero.series.items[i].name};
        
        `; 
        seriesList.append(l3);
    }

    for(let i=0; i<currentHero.stories.items.length; i++)
    {
        const l4 = document.createElement("li");
        l4.innerHTML = 
        `       
             ${ currentHero.stories.items[i].name.toLowerCase()};
        
        `; 
        storiesList.append(l4);
    }
    

}


addDetailsToDOM();
addDetailsListToDOM();