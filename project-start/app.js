
function search_user(){
	console.log('searching');
}

/*async function getUsers() {
	console.log("hey");
	try{
		const response = await fetch('https://jsonplaceholder.typicode.com/users');
		const data = await response.json();
		data.forEach(el => console.log(el.name));
	} catch (error){
		console.error(error.message);
	}
}*/

function handleClick(event){
	const newTodo = document.getElementById('new-todo').value;
	event.preventDefault();
	//console.log(newTodo);
	if (newTodo){
		postTodo({
			userID: 0,
			title: newTodo,
			completed: false,
		});
		document.getElementById('new-todo').value = '';
	} else {
		alert('empty');
	}
}
function userbyID(userID){
	for (var i = 0; i<users.length; i++){
		if(users[i].id === userID){
			return users[i].name
		}
	}
}

function createTodo(value) {
	const div = document.createElement('div');
	div.className = 'todo-item';
	div.innerHTML += ('<input type="checkbox" id="check">' + `<span>${value.title} <i> by </i> <b>${userbyID(value.userId)}</b></span>`);//+ value.title + "by"
	div.innerHTML += ('<div class="close">x</div>')
	list.append(div)
	if (value.completed){
		div.querySelector("#check").checked = true;
	}
}

function removeToDo(){
	this.removeEventListener();
	this.remove();
}

function createUser(user){
	const opt = document.createElement('option');
	opt.id = user.id;
	opt.innerText = user.name;
	select_users.append(opt);
}

const todo = document.getElementById('new-todo');
const select_users = document.getElementById('user-todo');
const list = document.getElementById('todo-list');
const btn = document.querySelector('button');
let alltodos = [];
let users = [];
//const select_users = document.querySelector('option')
btn.addEventListener('click', handleClick);
todo.addEventListener('input', _.debounce(search_user, 1000));
//user.addEventListener('click', getUsers);
initToDos();

async function GetToDos(){
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos');
		const data = await response.json();
		if (response.ok) {
			return data;
		}
	} catch (error){
		console.error(error.message);
	}
}

async function postTodo(did){
	try{
		const response = await fetch('https://jsonplaceholder.typicode.com/todos',{
			method: 'POST',
			body: JSON.stringify(did),
			headers:{
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		console.log(data);
	} catch (error){
		console.error(error.message)
	}
}
		

async function GetUsers(){
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/users');
		const data = await response.json();
		if (response.ok) {
			return data;
		}
	} catch (error){
		console.error(error.message);
	}
}


function initToDos(){
	Promise.all([GetToDos(), GetUsers()]).then((values) => {
		[alltodos, users] = values;
		alltodos.forEach((value) => createTodo(value));
		users.forEach((user) => createUser(user));
	});
}
//TODOS.forEach((t) => console.log(t.title));
//fetch('https://jsonplaceholder.typicode.com/posts/1', {
//	method: 'POST',
//	body: JSON.stringify({
//		title: ''

