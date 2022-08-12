let clickCount = 0;
let timer;
const sec = 5000;

//let nickname = document.getElementById('nickname').value;
let startBtn = document.getElementById('start');
sessionStorage.setItem('bestRes', 0);
localStorage.setItem('bestResAll', 0);
startBtn.onclick = function() {
	try{
		const nickname = document.getElementById('nickname').value;
		//re = /^\S+$/;
		if(nickname === '' || !/^\S+$/.test(nickname)) {
			throw 'Empty nickname'; 
		}

		timer = setTimeout(function() {
			alert('You clicked ' + clickCount +' times');

			if(clickCount > sessionStorage.getItem('bestRes')){
				sessionStorage.setItem('bestRes', clickCount);
				if(clickCount > localStorage.getItem('bestResAll')){
					localStorage.setItem('bestResAll', clickCount);
					localStorage.setItem('best', nickname);
				}
				//localStorage.setItem('best', nickname);
			}

			localStorage.setItem(nickname, localStorage.getItem('bestResAll'));
			clickCount = 0;

		}, sec);

	} catch(err){
		alert(err);
	}
}
const btnClick = document.getElementById('btnClick');
btnClick.onclick = () => clickCount++; 

const bestResult = document.getElementById('bestResult');
bestResult.onclick = () => alert('Best result is: ' + sessionStorage.getItem('bestRes'));

const bestResultAll = document.getElementById('bestResultAll');
bestResultAll.onclick = () => alert('Best result for the whole time is: ' +
	localStorage.getItem('bestResAll') + ' by ' + localStorage.getItem('best'));

const clear = document.getElementById('clear');
clear.onclick = () => {
	//sessionStorage.removeItem('bestRes');
	sessionStorage.setItem('bestRes', 0);
	alert('Best result is cleared');
}
const clearAll = document.getElementById('clearAll');
clearAll.onclick = () => {
	//localStorage.removeItem('bestResAll');
	localStorage.setItem('bestResAll', 0);
	localStorage.setItem('best', null);
	alert('Best result for the whole time is cleared');
}