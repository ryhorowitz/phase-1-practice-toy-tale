let addToy = false;
const toysUrl = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCardsConainer = document.querySelector("#toy-collection")
console.log(toyCardsConainer)
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toys = fetch(toysUrl)
    .then( res => res.json())
    .then( data => {
      console.log(data)
      const cards = data.map( toy => {
        const card = document.createElement('div')
        card.className = 'card' 
        card.innerHTML = `  <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes}</p>
        <button class="like-btn" id=${toy.id}>Like ❤️</button>`
        return card
      })
      return cards
    })
    .then( cards => { 
      console.log(cards)
      cards.forEach( card => {
        toyCardsConainer.append(card)

      })
    })
    .catch( err => console.error(err.message))
});
