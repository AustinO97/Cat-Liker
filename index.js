const catCard = document.getElementById('cat-card') 

//fetch cats using forEach
function fetchCats() {
    fetch('http://localhost:3000/cats') 
        .then(res => res.json())
        .then(data => data.forEach(renderCats))
}
fetchCats()

//render each cat and append it to the page
function renderCats(cats) {   
    //creating elements
    const catName = document.createElement('h3')
    catName.innerText = cats.name

    const img = document.createElement('img')
    img.setAttribute('class', 'image')
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

    //create commentForm 
    //add submit eventListener to commentForm
    const commentform = document.createElement('form')
    commentform.setAttribute('id', 'comment-form')
    commentform.addEventListener('submit', (e) => {
        e.preventDefault()
        let pText = document.createElement('p')
        const userInput = e.target.querySelector('#new-comment')
        pText.innerText = userInput.value
        userInput.value = ''
        commentContainer.appendChild(pText)
    })

    //create likeBtn
    //add click eventListener to likeBtn
    //increases likes on each click
    const likeBtn = document.createElement('button')
    likeBtn.setAttribute('class', 'like-btn')
    likeBtn.innerText = 'Like' 
    likeBtn.addEventListener('click', () => {
        cats.likes ++
        p.innerText = cats.likes + ' likes'        
    })

    const isCuteBtn = document.createElement('button')
    isCuteBtn.setAttribute('class', 'is-cute-btn')
    isCuteBtn.innerText = 'Is Cute'
    isCuteBtn.addEventListener('mouseover', (e) => {
        e.target.innerText = 'True!'
    })
    
    //append elements to the DOM
    catCard.append(catName, commentform, commentContainer, isCuteBtn, likeBtn, p, img)
    commentform.append(input, inputSubmit)
}

function addNewCat(cat) {
    fetch(`http://localhost:3000/cats`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            'name': cat.name.value,
            'image': cat.image.value,
            'likes': 0
        })
    })
    .then(res => res.json())
    .then(data => renderCats(data))
} 

const catForm = document.querySelector('.new-cat-form')
catForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addNewCat(e.target)
    document.querySelector('.input-text').value = ''
    document.querySelector('.input-text-2').value = ''
})