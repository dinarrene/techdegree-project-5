const randEmployees = 'https://randomuser.me/api/?nat=us&results=12';
const body = document.querySelector('body');
const gallery = document.getElementById('gallery');
let employeeData = [];

function fetchData(url) {
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.log('Error Fetching Data:', error))    
}

fetchData(randEmployees)
  .then(data => {
    data.results.map(result => employeeData.push(result))
    generateCard(employeeData)  

    const cards = document.querySelectorAll('.card');
    const cardsArray = Array.from(cards);

    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        const clickedCard = e.target.closest('.card')
        const cardIndex = cardsArray.indexOf(clickedCard);
        generateModal(employeeData[cardIndex], cardIndex);
      }) 
    })
  });



// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function generateCard(data) {
  data.map( employee => {
    const html = ` 
      <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${employee.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
      </div>
    `;
    gallery.insertAdjacentHTML('beforeend', html)
  }); 
}




function generateModal(employee, index) {
  const modalHtml = `
    <div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
              <p class="modal-text">${employee.email}</p>
              <p class="modal-text cap">${employee.location.city}</p>
              <hr>
              <p class="modal-text">${employee.cell.replace(/-/, ' ')}</p>
              <p class="modal-text">${employee.location.street.number} ${employee.location.street.name} ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
              <p class="modal-text">Birthday: ${employee.dob.date.slice(5,7)}/${employee.dob.date.slice(8,10)}/${employee.dob.date.slice(2,4)}</p>
          </div>
      </div>
    `;
  body.insertAdjacentHTML('beforeend', modalHtml)


  const modal = document.querySelector('.modal-container');
  const closeBtn = document.querySelector('.modal-close-btn');

  function removeModal(){
    if(modal){
      modal.remove();
    }
  }

  modal.addEventListener('click', (e) => {
    if(e.target.className === 'modal-container') {
      removeModal();
    }
  })

  closeBtn.addEventListener('click', (e) => {
    const clickedCloseBtn = e.target.closest('.modal-close-btn')
    if(clickedCloseBtn.className === 'modal-close-btn') {
      removeModal();
    }
  })
}






