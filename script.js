const optionContainer = document.querySelector('.option-container');
const container = document.querySelector('.container');
const loadingAnimation = document.querySelector('.loading-animation');
const leftBar = document.querySelector('.left-bar');
const leftBarBtn = document.querySelector('.left-bar-btn'); 
const sideOptionContainer = document.querySelector(".side-option-container");


const API_KEY = "bc625bf87bae4d43a2dd009548a1af77";
const options = [
    "general",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  
const countrylist = ['ae','ar','at','au','be','bg','br','ca','ch','cn','co','cu','cz','de','eg','fr','gb','gr','hk','hu','id','ie','il','in','it','jp','kr','lt','lv','ma','mx','my','ng','nl','no','nz','ph','pl','pt','ro','rs','ru','sa','se','sg','si','sk','th','tr','tw','ua','us','ve','za'];
var requestURL;
const country = 'in';

// left bar toggle
leftBarBtn.addEventListener('click',() => {
    leftBar.classList.toggle('left-bar-open');
    document.querySelector('.body-container').classList.toggle('with-body-slide');
});

// create new cards
const generalUI = (articles) => {
    container.innerHTML = "";
    let screenWidth = window.innerWidth;
    console.log(screenWidth);
    let flage = 0;
    for (var item of articles){
        console.log(item);
        let card = document.createElement('div'); 
        if(screenWidth <= 400){
            card.innerHTML = `
            <div class="news-card">
            <div class="news-img-container">
                <img src="${item.urlToImage || "./newspaper.jpg"}" alt="${item.title}">
            </div>
            <div class="news-content">
                <i>${item.author || ""}</i>
                <p>${item.publishedAt || ""}</p>
                <h3>${item.title || ""}</h3>
                <i>${item.description || ""}</i>
                <p>${item.content || ""}</p>
                <a href="${item.url || ""}" target="_blank">Read more</a>
            </div>
          </div>
          <hr>`;

        }else if(flage == 0){
            card.innerHTML = `
            <div class="news-card">
            <div class="news-img-container">
                <img src="${item.urlToImage || "./newspaper.jpg"}" alt="${item.title}">
            </div>
            <div class="news-content">
                <i>${item.author || ""}</i>
                <p>${item.publishedAt || ""}</p>
                <h3>${item.title || ""}</h3>
                <i>${item.description || ""}</i>
                <p>${item.content || ""}</p>
                <a href="${item.url || ""}" target="_blank">Read more</a>
            </div>
          </div>
          <hr>`;

          flage = 1;

        }else{
            card.innerHTML = `
              <div class="news-card">
              <div class="news-content">
                <i>${item.author || ""}</i>
                <p>${item.publishedAt || ""}</p>
                <h3>${item.title || ""}</h3>
                <i>${item.description || ""}</i>
                <p>${item.content || ""}</p>
              <a href="${item.url || ""}" target="_blank">Read more</a>
              </div>
              <div class="news-img-container">
                  <img src="${item.urlToImage || "./newspaper.jpg"}" alt="${item.title}">
              </div>
            </div>
            <hr>`;
            flage = 0;
        }
        

        container.appendChild(card);
    }
}


function createOptions(){
    for(let i of options){
        optionContainer.innerHTML += `<button class="option ${i == "general"?"active":""}" onclick="selectCatagory(event,'${i}')">${i}</button>`;
    }
}


async function selectCatagory(e, category){
    let options = document.querySelectorAll('.option');
    options.forEach((element) =>{
        element.classList.remove('active');
    });
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;
    e.target.classList.add("active");
    await getNews();

}

async function  getNews(){
    loadingAnimation.style.display = 'block';
    const response = await fetch(requestURL);
     if(!response.ok){
         console.log('something went wrong try again later!');
         return false;
     }
     let data = await response.json();
     loadingAnimation.style.display = 'none';
     generalUI(data.articles);
     
 
 }
 
async function init(){
    optionContainer.innerHTML = "";
    document.querySelector('#search').value = "";
    await getNews();
    createOptions();
}

async function search(){
    let searchInput = document.querySelector("#search").value;
    document.querySelector("#search").value = "";
    requestURL = `https://newsapi.org/v2/everything?q=${searchInput}&apiKey=${API_KEY}`;
    await getNews();
}


window.onload = ()=>{
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`
    init();
};


