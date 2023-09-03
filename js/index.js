// load category from api==================
const loadCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await response.json()
    const getCategory = data.data

    const btnContainer = document.getElementById('btn-container')

    getCategory.forEach(category => {
        const categoryName = category.category

        const div = document.createElement('div')
        div.innerHTML = `
            <button onclick="handleClick('${category.category_id}')" class="myBtn text-lg bg-gray-300 hover:bg-red-500 px-2 md:px-6 py-1 md:py-2 rounded">${categoryName}</button>
        `
        btnContainer.appendChild(div)
    })
}



// Display data to the page by clicking the category button 
const handleClick = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json()
    const getPost = data.data

    const postContainer = document.getElementById('post-container')
    postContainer.innerHTML = ' '

    if (getPost.length === 0) {
        postContainer.innerHTML = `
        <div class="card card-compact w-[90vw] mx-auto mb-8 items-center justify-center">
            <img class="w-28 py-8" h-auto src="./images/Icon.png" alt="">
            <h3 class="text-xl md:text-3xl text-center font-bold">Oops!! Sorry, There is no <br> content here</h3>
        </div>
        `
    }
    else {
        postContainer.classList.add('lg:grid-cols-4')

        let viewArr = []
        getPost.forEach(post => {
            const postThumbnail = post.thumbnail
            const postTitle = post.title
            const authors = post.authors[0]
            const profilePicture = authors.profile_picture
            const profileName = authors.profile_name
            const views = post.others.views
            const totalSec = post.others.posted_date

            const postTime = document.createElement('span')
            postTime.classList = "bg-gray-800 text-white text-sm p-2 rounded-lg absolute right-3 top-36"
            postTime.innerText = `${Math.floor(totalSec / 3600)}hrs ${Math.floor(totalSec / 60) % 60}min ago`


            const card = document.createElement('div')
            card.classList = 'card card-compact mb-8 relative'
            card.innerHTML = `
            <img class="rounded-xl h-48" src="${postThumbnail}" alt="Shoes" />
            
            <div class="flex gap-4 mt-5">
                <img class = "h-12 w-12 rounded-full" src="${profilePicture}" alt="">
                <div>
                    <h3 class="text-lg font-bold">${postTitle}</h3>     
                    <div class="flex gap-2 items-center">
                        <h3 class="text-md mt-2">${profileName}</h3>                      
                        <span class="mt-2">${authors.verified ? '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip - path="url(#clip0_11_34)"><path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/><path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE" /></g ><defs><clipPath id="clip0_11_34"><rect width="20" height="20" fill="white" /></clipPath></defs> </svg > ' : ''}</span>                                        
                    </div >
                    <h3 class="text-md mt-2">${views} views</h3>
                </div >
            </div >
            `
            if (totalSec != 0) {
                card.appendChild(postTime)
            }
            postContainer.appendChild(card)
        })
    }
}


loadCategory()
handleClick('1000')