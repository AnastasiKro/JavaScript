
function toggle_spoiler(){
	if (sp.classList.contains('closed') === true){
		document.body.addEventListener('keydown', keyHandle)
	} else {
		document.body.removeEventListener('keydown', keyHandle)
	}
	sp.classList.toggle('closed')
}

function keyHandle(ev){
	if (ev.key === 'Escape'){
		document.body.removeEventListener('keydown', keyHandle)
		sp.classList.toggle('closed')
	}
}
	
const btn = document.querySelector("#myBtn")
const sp = document.querySelector("#spoiler")
btn.addEventListener('click', toggle_spoiler)

