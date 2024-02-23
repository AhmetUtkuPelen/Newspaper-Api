// ! API KEY ! \\
const API_KEY = '9018c98f43cc4f5f8a7a42207ae84947'



// ! VARIABLES ! \\

let currentPage = 1

let currentCategory = null

let currentKeyWord = null

let isLoading = false

let lastArticleCount = 0



// ! FETCH FUNCTION ! \\

function fetchNews(isSearching){

    if(isLoading)return

    isLoading = true

    let url

    if(isSearching){

        const keyword = document.getElementById('searchKeyword').value 

        url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEY}&page=${currentPage}`

    }else{
        
        const category = currentCategory || document.getElementById('category').value

        url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}&page=${currentPage}`

    }

    fetch(url).then(response => response.json()).then(data => {

        const newsContainer = document.getElementById('newsContainer')

        if(currentPage === 1){
        
            newsContainer.innerHTML= ''

        }

        const articlesWithImage = data.articles.filter(article => article.urlToImage)

        if(articlesWithImage.length === 0 || articlesWithImage === lastArticleCount){

            displayNoMoreNews()
            return

        }

        lastArticleCount = articlesWithImage.length


        articlesWithImage.forEach(article => {

            const newsItem = 
            
            `
            
            <div class="newsItem">
        
            <div class="newsImage">
        
            <img src="${article.urlToImage}" alt="${article.title}">
        
            </div>
        
            <div class="newsContent">
        
            <div class="info">
        
            <h5>${article.source.name}</h5>
        
            <span>|</span>
        
            <h5>${article.publishedAt}</h5>
        
            </div>
        
            <h2>${article.title}</h2>
        
            <p>${article.description}</p>
        
            <a href="${article.url}" target="_blank">Read More</a>
        
            </div>
        
            </div>
            
            `

            newsContainer.innerHTML += newsItem 



        })

        currentPage++

        isLoading = false

    }).catch(error => {

        // ! CATCH IF ANY ERROR HAPPENS ! \\

        console.error("An error happened fetching the news",error)

        isLoading = false

    })

}


// ! NO MORE NEWS TO LOAD ! \\

function displayNoMoreNews(){

    const newsContainer = document.getElementById('newsContainer') 

    newsContainer.innerHTML += `<p>No More News To Load...</p>` 

}

window.onscroll = function(){

    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10){

        if(currentKeyWord){

            fetchNews(true)

        }else{
            fetchNews(false)
        }

    }

}


document.getElementById('searchKeyword').addEventListener('input',function(){

    currentPage = 1

    currentCategory = null

    currentKeyWord = this.value


})

document.getElementById('fetchCategory').addEventListener('click',function(){

    currentPage = 1

    currentKeyword = null

    fetchNews(false)

})