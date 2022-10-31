
function userbyName(name){
	for (var i = 0; i<users.length; i++){
		if (users[i].name === name){
			return users[i].id;
		}
	}
}
function userbyID(userID){
	for (var i = 0; i<users.length; i++){
		if(users[i].id === userID){
			return users[i].name
		}
	}
}

function handleClick(event){
	const newTodo = document.getElementById('new-todo').value;
	event.preventDefault();
	const us = document.getElementById('user-todo').value;
	if (newTodo && (us != "select user")){
		const obj = {
			userId: userbyName(us),
			title: newTodo,
			completed: false,
		};
		const post = postTodo(obj)
		.then((data) => {
			if (data.id === 201){
				createTodo(obj)
			}
		})
		.catch((error) => {
			console.log(error);
		});
		document.getElementById('new-todo').value = '';
	} else {
		alert('empty field');
	}
}

function createTodo(value) {
	const li = document.createElement('li');
	li.id = value.id;
	li.className = 'todo-item';
	li.innerHTML = `<span>${value.title} <i> by </i> <b>${userbyID(value.userId)}</b></span>`;
	const ch = document.createElement('input');
	ch.type = 'checkbox';
	ch.checked = value.completed;
	ch.addEventListener('change', checkboxChange)
	li.prepend(ch);
	const x = document.createElement('span');
	x.innerHTML = '&times;';
	x.className = 'close';
	x.addEventListener('click', handleClose);
	li.append(x);
	list.prepend(li);
}
function checkboxChange(){
	const id = this.parentElement.id;
	const completed = this.checked;
	patchTodo(id, completed);
}

function removeToDo(id){
	alltodos = alltodos.filter((todo) => todo.id !== id);
	remTodo = list.querySelector(`[id="${id}"]`);
	remTodo.querySelector('input').removeEventListener('change', checkboxChange);
	remTodo.querySelector('.close').removeEventListener('click', handleClose);
	remTodo.remove();
}

function handleClose(){
	const id = this.parentElement.id;
	deleteTodo(id);
}

function createUser(user){
	const opt = document.createElement('option');
	opt.id = user.id;
	opt.innerText = user.name;
	select_users.append(opt);
}

const select_users = document.getElementById('user-todo');
const list = document.getElementById('todo-list');
const btn = document.querySelector('button');
let alltodos = [];
let users = [];
btn.addEventListener('click', handleClick);
printValues();

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
		if (response.ok){
			return data;
		}
	} catch (error){
		console.error(error.message)
	}
}
	
async function patchTodo(id, completed){
	try{
		const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
			method: 'PATCH',
			body: JSON.stringify({completed}),
			headers:{
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		if (response.ok){
			return data;
		} else{
			throw new Error('Failed to patch');
		}
	} catch (error){
		console.error(error.message)
	}
}	

async function deleteTodo(id){
	try{
		const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
			method: 'DELETE',
			headers:{
				'Content-Type': 'application/json',
			},
		});
		if (response.ok){
			removeToDo(id);
		}
		else{
			throw new Error('Failed to delete');
		}
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

function printValues(){
	Promise.all([GetToDos(), GetUsers()]).then((values) => {
		[alltodos, users] = values;
		alltodos.forEach((value) => createTodo(value));
		users.forEach((user) => createUser(user));
	});
}


