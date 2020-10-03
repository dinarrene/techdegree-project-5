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
  });



// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
  if (response.ok) {
      return Promise.resolve(response);
  } else {
      return Promise.reject(new Error(response.statusText));
  }
}

function generateCard(data) {
  data.map( employee => {
    const card = document.createElement('div');
    gallery.appendChild(card);
    card.setAttribute('class', 'card')
    card.innerHTML = ` 
        <div class="card-img-container">
            <img class="card-img" src="${employee.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
    `;
  });
}

