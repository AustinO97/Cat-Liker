document.addEventListener('DOMContentLoaded', function(cats) {
    fetchCats()
})


//fetch cats using forEach
function fetchCats() {
    fetch('http://localhost:3000/cats') 
        .then(res => res.json())
        .then(data => data.forEach(renderCats))
}
//render each cat and append it to the page
function renderCats(cats) {
    const catCard = document.getElementById('cat-card')
    

    //creating elements
    const catName = document.createElement('h3')
    catName.innerText = cats.name

    const img = document.createElement('img')
    img.src = cats.image

    const p = document.createElement('p')
    p.innerText = `${cats.likes} likes`


    //create commentForm 
    //add submit eventListener to commentForm
    const commentform = document.createElement('comment-form')
    commentform.addEventListener('submit', () => createComment)

    //create likeBtn
    //add click eventListener to likeBtn
    //increases likes on each click
    const likeBtn = document.createElement('button')
    likeBtn.innerText = 'Like' 
    likeBtn.addEventListener('click', () => {
        cats.likes ++
        p.textContent = cats.likes
        updateCatLikes(cats)
    })
    //append elements to the DOM
    catCard.append(catName, commentform, likeBtn, p, img)

}


function createComment(e) {
    e.preventDefault()
    console.log(e.target);
}


//updates db.json file with the the current likes
function updateCatLikes(cats) {
    let likes = cats.likes
    console.log(likes);
    fetch(`http://localhost:3000/cats/${cats.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({likes: likes})
    })
} 
