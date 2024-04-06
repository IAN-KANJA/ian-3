// Your code here

// const tickets = document.getElementById('tickets');
// let ticketsBuy = Number(firstMovie.capacity - firstMovie.tickets_sold)
// ticketsBuy,addEventListener('click') ,()=>{
// let remainingTickets = 3;

// function buyTicket() {
//   if (remainingTickets > 0) {
//     remainingTickets--;
//     updateTicketsDisplay();
//   } else {
//     alert('Sorry, no more tickets available!');
//   }
// }

// function updateTicketsDisplay() {
//   tickets.innerText = `Available tickets: ${availableTickets}`;
// }
// }
// updateTicketsDisplay(remainingTickets);

let URL = 'https://project-code-challenge-3.vercel.app/db.json';
const listHolder = document.getElementById('films');
document.addEventListener('DOMContentLoaded', () => {
  document.getElementsByClassName('film item')[0].remove();
  fetchOne(URL);
  fetchMovies(URL);
});


function fetchOne(URL) {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      setUpMovieDetails(data.films[0]);
    });
}


function fetchMovies(URL) {
  fetch(URL)
    .then((resp) => resp.json())
    .then((movies) => {
      movies.films.forEach((movie) => {
        displayMovie(movie);
      });
    });
}


function displayMovie(movie) {
  const list = document.createElement('li');
  list.style.cursor = "cell";
  list.textContent = movie.title;
  listHolder.appendChild(list);
  addClickEvent();
}


function addClickEvent() {
  let children = listHolder.children;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    child.addEventListener('click', () => {
      fetch(`${URL}`)
        .then((res) => res.json())
        .then((movie) => {
          document.getElementById('buy-ticket').textContent = 'Buy Ticket';
          setUpMovieDetails(movie.films[i]);
        });
    });
  }
}


function setUpMovieDetails(funMovie) {
  const preview = document.getElementById('poster');
  preview.src = funMovie.poster;
 

}


const btn = document.getElementById('buy-ticket');
btn.addEventListener('click', function (event) {
  let remainingTickets = document.querySelector('#ticket-number').textContent;
  event.preventDefault();
  if (remainingTickets > 0) {
    document.querySelector('#ticket-number').textContent = remainingTickets - 1;
  } else if (parseInt(remainingTickets, 0) === 0) {
    btn.textContent = 'Sold Out';
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const URL = 'https://project-code-challenge-3.vercel.app/db.json';
    const listHolder = document.getElementById('films');
    const btn = document.getElementById('buy-ticket');
  
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        document.querySelector('.film.item')?.remove();
        setUpMovieDetails(data.films[0]); 
  
        data.films.forEach((movie, index) => {
          const listItem = document.createElement('li');
          listItem.style.cursor = "pointer";
          listItem.textContent = movie.title;
          listItem.onclick = () => setUpMovieDetails(data.films[index]);
          listHolder.appendChild(listItem);
        });
      });
  
    function setUpMovieDetails(movie) {
      document.getElementById('poster').src = movie.poster;
      document.getElementById('title').textContent = movie.title;
      document.getElementById('runtime').textContent = `${movie.runtime} minutes`;
      document.getElementById('film-info').textContent = movie.description;
      document.getElementById('showtime').textContent = movie.showtime;
      document.getElementById('ticket-number').textContent = movie.capacity - movie.tickets_sold;
    }
  
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      let remainingTickets = parseInt(document.getElementById('ticket-number').textContent, 10);
      if (remainingTickets > 0) {
        document.getElementById('ticket-number').textContent = remainingTickets - 1;
      } else {
        btn.textContent = 'Sold Out';
      }
    });
  });
  console.log(btn)
  