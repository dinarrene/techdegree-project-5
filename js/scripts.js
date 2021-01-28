// ------------------------------------------
//  Global Variables
// ------------------------------------------

const randEmployees = 'https://randomuser.me/api/?nat=us&results=12';
const body = document.querySelector('body');
const gallery = document.getElementById('gallery');
const searchContainer = document.querySelector('.search-container')
let cardsArray = [];
let employeeData = [];
let index = ''

// ------------------------------------------
//  FETCH API REQUEST
// ------------------------------------------

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
    cardsArray = Array.from(cards);

    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        const clickedCard = e.target.closest('.card')
        index = cardsArray.indexOf(clickedCard);
        generateModal(employeeData[index], index);
      })
    })
  });

generateSearch();

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

//HTML TO GENERATE/ADD SEARCH FIELD FUNCTION

function generateSearch() {
  const searchHtml = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
  `;
  searchContainer.insertAdjacentHTML('beforeend', searchHtml)
}

const searchInput = document.querySelector('.search-input');
const searchSubmit = document.querySelector('.search-submit');


// SEARCH EMPLOYEE RECORDS FUNCTION

function searchEmployees(searchInput, searchList) {

  for (let i = 0; i < searchList.length; i++) {
    let employeeName = searchList[i].querySelector('#name').textContent;
    if (employeeName.toLowerCase().includes(searchInput.value.toLowerCase())) {
      searchList[i].style.display = '';
    } else {
      searchList[i].style.display = 'none';
    }
  }
}


// SEARCH FIELD EVENT LISTENERS 

searchInput.addEventListener('keyup', () => {
  searchEmployees(searchInput, cardsArray);
});

searchInput.addEventListener('search', () => {
  searchEmployees(searchInput, cardsArray);
});

searchSubmit.addEventListener('click', (e) => {
  searchEmployees(searchInput, cardsArray);
});



// CREATE HTML FOR EMPLOYEE CARDS FUNCTION

function generateCard(data) {
  data.map(employee => {
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


// CREATE HTML FOR MODAL OVERLAY

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

      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    </div>
  `;
  body.insertAdjacentHTML('beforeend', modalHtml)


  // MODAL VARIABLES

  const modal = document.querySelector('.modal-container');
  const closeBtn = document.querySelector('.modal-close-btn');
  const prevBtn = document.querySelector('.modal-prev');
  const nextBtn = document.querySelector('.modal-next');


  // REMOVE MODAL FUNCTION

  function removeModal() {
    if (modal) {
      modal.remove();
    }
  }


  // TOGGLE THROUGH MODAL RECORDS FUNCTION

  function toggleModal(employee, index) {
    document.querySelector('.modal-container').remove();
    generateModal(employee, index);
  }


  // ------------------------------------------
  //  MODAL EVENT LISTENERS
  // ------------------------------------------

  modal.addEventListener('click', (e) => {
    if (e.target.className === 'modal-container') {
      removeModal();
    }
  })

  closeBtn.addEventListener('click', (e) => {
    const clickedCloseBtn = e.target.closest('.modal-close-btn')
    if (clickedCloseBtn.className === 'modal-close-btn') {
      removeModal();
    }
  })

  prevBtn.addEventListener('click', (e) => {
    if (index > 0) {
      toggleModal(employeeData[index - 1], index - 1);
    }
  })

  nextBtn.addEventListener('click', (e) => {
    if (index < 11) {
      toggleModal(employeeData[index + 1], index + 1);
    }
  })
}