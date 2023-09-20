document.addEventListener('DOMContentLoaded', function() {
    fetchCats()
})

//fetch cats using forEach
function fetchCats() {
    fetch('http://localhost:3000/cats') 
        .then(res => res.json())
        .then(data => console.log(data))
}

