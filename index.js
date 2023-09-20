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

    const img = document.createElement('img')
    img.src = cat.image

    catCard.append(img)
}