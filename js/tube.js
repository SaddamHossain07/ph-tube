// load data from api ======================
const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json()
    const allCategory = data.data
    showCategory(allCategory)
    console.log(allCategory)
}


const showCategory = allCategory => {
    const categoryContainer = document.getElementById('btn-container')
    allCategory.forEach(category => {
        const categoryName = category.category
        const categoryBtn = document.createElement('button')
        categoryBtn.classList = 'text-lg bg-red-500 px-6 py-2 rounded active'
        categoryBtn.innerText = categoryName
        categoryContainer.appendChild(categoryBtn)

    })
}

const getContent = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000')
    const data = await res.json()
    const post = data.data
    displayPost(post)
}

const displayPost = post => {
    console.log(post)
    const postContainer = document.getElementById('post-container')
    post.forEach(post => {
        const thumbnail = post.thumbnail
        const title = post.title
        const profileName = post.authors[0].profile_name
        const profilePicture = post.authors[0].profile_picture
        const verified = post.authors[0].verified
        console.log(verified)
        const verifiedIcon = document.getElementById('verified-icon')

        const posteDate = post.others.posted_date
        const views = post.others.views

        const postCard = document.createElement('div')
        postCard.classList = 'card card-compact mb-8'
        postCard.innerHTML = `
        <img class="rounded-xl h-48" src="${thumbnail}" alt="Shoes" /> 
        <div class="flex gap-4 mt-5">
            <img class = "h-12 w-12 rounded-full" src="${profilePicture}" alt="">
            <div>
                <h3 class="text-lg font-bold">${title}</h3>     
                <div class="flex gap-4">
                    <h3 class="text-md mt-2">${profileName}</h3>                      
                    <span id="verified-icon" class="mt-2"><i class="fa-solid text-blue-600 fa-circle-check"></i></span>                 
                </div>               
                <h3 class="text-md mt-2">${views} views</h3>
            </div>
        </div> 
        `

        postContainer.appendChild(postCard)
    })
}

getContent()
loadCategory()
