document.addEventListener('DOMContentLoaded', function() {
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

    const input = document.createElement('input')
    input.setAttribute('id', 'new-comment')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', 'Add Comment')

    const inputSubmit = document.createElement('input')
    inputSubmit.setAttribute('type', 'submit')
    inputSubmit.setAttribute('class', 'submit')
    inputSubmit.setAttribute('value', 'submit')


    const comments = document.createElement('div')
    comments.setAttribute('id', 'comments')

    const commentContainer = document.createElement('div')
    commentContainer.setAttribute('id', 'comment-container')

    const pText = document.createElement('p')
    

    //create commentForm 
    //add submit eventListener to commentForm
    const commentform = document.createElement('form')
    commentform.setAttribute('id', 'comment-form')


    commentform.addEventListener('submit', (e) => {
        e.preventDefault()
        const userInput = e.target.querySelector('#new-comment')
        pText.innerText = userInput.value
        userInput.value = ''
    })

    //create likeBtn
    //add click eventListener to likeBtn
    //increases likes on each click
    const likeBtn = document.createElement('button')
    likeBtn.innerText = 'Like' 
    likeBtn.addEventListener('click', () => {
        cats.likes ++
        p.innerText = cats.likes + ' likes'
        updateCatLikes(cats)
    })
    cats.likes = ''
    //append elements to the DOM
    catCard.append(catName, comments, likeBtn, p, img)
    comments.append(commentform, commentContainer)
    commentform.append(input, inputSubmit)
    commentContainer.appendChild(pText)
}

//updates db.json file with the the current likes
function updateCatLikes(cats) {
    let likes = cats.likes
    fetch(`http://localhost:3000/cats/${cats.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({likes: likes})
    })
} 