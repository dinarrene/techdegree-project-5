const randEmployees = 'https://randomuser.me/api/?nat=us&results=12';
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
        console.log(cardsArray.indexOf(e.target));
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






function generateModal() {
  // <div class="modal-container">
  //     <div class="modal">
  //         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
  //         <div class="modal-info-container">
  //             <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
  //             <h3 id="name" class="modal-name cap">name</h3>
  //             <p class="modal-text">email</p>
  //             <p class="modal-text cap">city</p>
  //             <hr>
  //             <p class="modal-text">(555) 555-5555</p>
  //             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
  //             <p class="modal-text">Birthday: 10/21/2015</p>
  //         </div>
  //     </div>

  //     <div class="modal-btn-container">
  //         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
  //         <button type="button" id="modal-next" class="modal-next btn">Next</button>
  //     </div>
  // </div>
}

