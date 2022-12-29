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

      const form = document.querySelector('.add-toy-form')
      form.addEventListener('submit', e => {
        e.preventDefault()
        // console.log('I was clicked')
        const newToy = {
          name: form.elements[0].value,
          imageURL: form.elements[1].value
        }
        // console.log( newToy )

        postToy(newToy)
      })
    } else {
      toyFormContainer.style.display = "none";
    }


  });

  function renderCard(toy) {
    const card = document.createElement('div')
    card.className = 'card'

    card.innerHTML = `  <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes}</p>
    <button class="like-btn" id=${toy.id}>Like ❤️</button>`

    return card
  }
  function getToys() {
    fetch(toysUrl)
      .then(res => res.json())
      .then(data => data.map(renderCard))
      // const h2 = document.createElement('h2')
      // const img = document.createElement('img')
      // const p = document.createElement('p')
      // const button = document.createElement('button')
      // h2.textContent = toy.name
      // img.src = toy.image
      // img.className = 'toy-avatar'
      // p.textContent = toy.likes
      // button.className = 'like-btn'
      // button.id = toy.id
      // button.textContent = 'Like ❤️'
      // card.append(h2)
      // h2.append(img)
      // img.append(p)
      // p.append(button)

      // add eventListener for click of like button
      .then(cards => cards.forEach(card => {
        const likeBtn = card.childNodes[7]
        console.log(likeBtn.id)
        likeBtn.addEventListener('click', updateLikes)
        appendToy(card)
      }))
      .catch(err => console.error(err.message))
  }
  function postToy(toy) {
    fetch(toysUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy.name,
        "image": toy.imageURL,
        "likes": 0
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newToy = renderCard(data)
        // console.log(newToy.childNodes[7])
        const likeBtn = newToy.childNodes[7]
        likeBtn.addEventListener('click', updateLikes)
        appendToy(newToy)
      })
      .catch(err => console.error(err.message))
  }
  function appendToy(toy) {
    toyCardsConainer.append(toy)
  }

  function updateLikes() {
    console.log('i\'ve been clicked', this.parentNode.childNodes[5].textContent) //gets string of likes
    const likesNum = Number(this.parentNode.childNodes[5].textContent)
    console.log('likesNum', likesNum)
    const increamentedLike = likesNum + 1
    console.log('increamentedLike', increamentedLike)
    // add patch request
    fetch(toysUrl + '/' + this.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": increamentedLike
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.error(err.message))

  }

  getToys()
});
