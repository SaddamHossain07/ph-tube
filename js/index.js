// load category from api==================
const loadCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await response.json()
    const getCategory = data.data

    const btnContainer = document.getElementById('btn-container')

    getCategory.forEach(category => {
        console.log(category)
        const categoryName = category.category

        const div = document.createElement('div')
        div.innerHTML = `
            <button onclick="handleClick('${category.category_id}')" class="text-lg bg-red-500 px-6 py-2 rounded active">${categoryName}</button>
        `
        btnContainer.appendChild(div)
    })
}


// load data to the page by clicking the category button 
const handleClick = async (categoryId) => {
    console.log(categoryId)
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json()
    const getPost = data.data

    const postContainer = document.getElementById('post-container')
    postContainer.innerHTML = ' '
    // console.log(getPost)

    getPost.forEach(post => {
        // console.log(post)
        const postThumbnail = post.thumbnail
        const postTitle = post.title
        const authors = post.authors[0]
        const profilePicture = authors.profile_picture
        const profileName = authors.profile_name
        const verified = authors.verified
        const posteDate = post.others.posted_date
        const views = post.others.views

        const card = document.createElement('div')
        card.classList = 'card card-compact mb-8'
        card.innerHTML = `
        <img class="rounded-xl h-48" src="${postThumbnail}" alt="Shoes" />
        <div class="flex gap-4 mt-5">
            <img class = "h-12 w-12 rounded-full" src="${profilePicture}" alt="">
            <div>
                <h3 class="text-lg font-bold">${postTitle}</h3>     
                <div class="flex gap-4">
                    <h3 class="text-md mt-2">${profileName}</h3>                      
                    <span id="verified-icon" class="mt-2"><i class="fa-solid text-blue-600 fa-circle-check"></i></span>                 
                </div>               
                <h3 class="text-md mt-2">${views} views</h3>
            </div>
        </div>
        `

        postContainer.appendChild(card)

    })
}


loadCategory()
handleClick('1000')