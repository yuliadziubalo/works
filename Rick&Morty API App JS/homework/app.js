/* eslint-disable no-magic-numbers */ 
const root = document.getElementById('root');

const search = document.getElementById('search-input');
const searchWrap = document.getElementById('search-wrap');
const searchBtn = document.getElementById('search-btn');
const loadmore = document.querySelector('.load-more');
let container = document.getElementById('characters-wrap');

let storedId;
let img;
let charDiv;
let removeBtn;
let arrayAllChars = getIds('arrayAllChars');
let url = 'https://rickandmortyapi.com/api/character/';
const rec = 826;
let moreChars = 5;

getCharacters('arrayAllChars'); //on load

async function getUserAsync(id) {
    let response = await fetch(`${url}${id}`);
    let data = await response.json();
    return data;
}

searchBtn.onclick = function() {
    if (search.value.match(/^[-+]?[0-9]+$/g) && search.value <= rec){
        if(contains(getIds('arrayAllChars'), search.value)){
            alert('Character is already in the list');
        } else{

            getUserAsync(search.value)
            .then(data => data);

            arrayAllChars.unshift(search.value); //all
            localStorage.setItem('arrayAllChars', JSON.stringify(arrayAllChars));
            getCharacters('arrayAllChars');
        }
        
    } else {
        alert('Character not found');
    }
};

function getCharacters(arr) {
    let array = getIds(arr);
    if(typeof array !== 'undefined' && array !== null && array.length !== null && array.length > 0){
        container.remove();
        container = document.createElement('div');
        container.setAttribute('id', 'characters-wrap');

        root.insertBefore(container, searchWrap);
        if(arr !== 'ids'){
            array = array.slice(0,moreChars);
        }
       
        for(let id of array){
            getUserAsync(id).then(data => {
                img = document.createElement('img');
                charDiv = document.createElement('div');
                removeBtn = document.createElement('button');
                removeBtn.setAttribute('class', 'remove');
                removeBtn.setAttribute('id', `${id}`);
                removeBtn.setAttribute('onClick', 'give(this.id)');
                removeBtn.textContent = 'X';

                charDiv.classList.add('character');
                img.src = data.image;
                container.appendChild(charDiv);
                charDiv.appendChild(removeBtn);
                charDiv.appendChild(img);
            });
        }
    } else {
        alert('Hello in the application!');
    }
}

let y;
function give(val) {
    y = val;
}

function getIds(arr){
    storedId = localStorage.getItem(arr);
    storedId = JSON.parse(storedId);
    if(typeof storedId !== 'undefined' && storedId !== null && storedId.length !== null && storedId.length > 0){
        return storedId;
    } else {
        return [];
    }
}

function contains(arr, elem) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}

loadmore.onclick = function() {
    moreChars+= 5;
    getCharacters('arrayAllChars');
    window.scrollTo(0, document.body.scrollHeight);
};

window.addEventListener('load', function() { 
    document.getElementById('characters-wrap').addEventListener('click', function(e) {
        const tgt = e.target;
        if (tgt.classList.contains('remove')) {
            e.preventDefault();
            if (window.confirm('Do you want to remove the character?')){
                let array = getIds('arrayAllChars');
                for (let i = 0; i < array.length; i++) {
                    if(array[i]===y){
                        array.splice(i,1);
                        localStorage.setItem('arrayAllChars', JSON.stringify(array));
                        document.location.reload();
                    }
                }
            }
        }
    });
});
