let addToy = false;
const toysUrl = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCardsConainer = document.querySelector("#toy-collection")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const getToys = fetch(toysUrl)
    .then( res => res.json())
    .then( data => {
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
      cards.forEach( card => {
        toyCardsConainer.append(card)

      })
    })
    .catch( err => console.error(err.message))

  const postToy = fetch(toysUrl, {
    method: 'POST',
    headers: {
      "Content-Type" : "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": "Jessie",
      "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "likes": 0
    })
  })
  .then( res => res.json())
  .then( data => { 
    console.log(data)
  })
  .catch( err => console.error(err.message))
});
