// referenser
const form = document.querySelector('#todoForm');
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const dateElement = document.getElementById("date"); //datum


let todos = []; //spara allting som hämtas

const fetchTodos = () => { // funktion, där data hämtas
  fetch('https://jsonplaceholder.typicode.com/todos')
  .then(res => res.json()) //returnerar
  .then(data => { // tillgång till data
    todos = data;
    console.log(todos); //så de syns i konsolen
    listTodos(); // funktion, skapad längre ner
  })
}

fetchTodos();

const newTodo = (todo) =>{ //new todo funktion, där de skapas komponenter

  let card = document.createElement('div'); //skapar en div 
  card.classList.add('card', 'p-3', 'my-3', 'todo'); // klasserna i diven

  let innerCard = document.createElement('div'); 
  innerCard.classList.add('d-flex', 'justify-content-between');

  let title = document.createElement('h3');
  title.classList.add('title');
  title.innerText = todo.title; //todo objektet + titeln

  let button = document.createElement('button');
  button.classList.add('btn-delete');
  button.innerText = 'X';
  button.addEventListener('click', () => console.log(todo.id)); //lyssna på klick + funktion

  innerCard.appendChild(title);
  innerCard.appendChild(button);
  card.appendChild(innerCard);
  output.appendChild(card);
} 


const listTodos = () => { //list todo funktionen
  output.innerHTML = ''; // nolla output, så den ej plussar på varje gång
  todos.forEach(todo => {
    newTodo(todo); //funktion, där varje todo matas in
  })
}

const createTodo = (title) => { //funktion för att skapa en todo 

  fetch('https://jsonplaceholder.typicode.com/todos',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8' //json skrivet med UTF 8
    },
    body: JSON.stringify({ //stringifiera datan, så de blir en textstring = json
      title,
      completed: false
    })
  })

  .then(res => res.json()) // så det blir json man får tillbaka
  .then(data => {
    console.log(data)
    todos.unshift(data); 
    listTodos();
  })
}


const validateText = id => { //validerings funktion
  const input = document.querySelector('#'+ id);
  const error = document.querySelector('#'+id+'-error');

  if(input.type === "text"){ //om inputen är text
    if(input.value === ''){ // om fältet är tomt
      error.innerText = 'Fyll i fältet';
      return false;
    } else if(input.value.length <2 ){ //om de är för få tecken
      error.innerText = 'minst 2 tecken';
      return false;
    }else{
      error.innerText = '';
      return true;
    }
}
}


const validate = () => {
  document.querySelectorAll('input').forEach(input => {
    if(input.type === "text") {
      validateText(input.id);
    }  
  })
}


form.addEventListener('submit', (e) => { //väntar på submit för att lägga till
  e.preventDefault(); //förhindrar att förmuläret skickas om
    validate();
    if(validateText('input')){
      createTodo(input.value);
      input.value = '';
    }
})


// datum
const options = {weekday: "long", month: "short", day:"numeric"};
const today = new Date ();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);