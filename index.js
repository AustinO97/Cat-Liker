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
function renderCats(cat) {
    const catCard = document.getElementById('cat-card')

    //creating elements
    const catName = document.createElement('h3')
    catName.innerText = cat.name

    const img = document.createElement('img')
    img.src = cat.image

    const p = document.createElement('p')
    p.innerText = `${cat.likes} likes`

    //create likeBtn
    //add click eventListener to likeBtn
    //increases likes on each click
    const likeBtn = document.createElement('button')
    likeBtn.innerText = 'Like'
    likeBtn.addEventListener('click', () => {
        cat.likes ++
        p.innerText = cat.likes
    })

    catCard.append(catName, likeBtn, p, img)
}