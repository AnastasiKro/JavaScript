const todo = document.getElementById("new-todo")
const user = document.getElementById("user-todo")
todo.addEventListener('keydown', handleEvent)
user.addEventListener('click', handleEvent)

function handleEvent(event){
	console.log(event)
}