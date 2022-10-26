
//////////// NOTEPAD FUNCTIONALITY
const notes = localStorage.getItem('notes') || '';
const textarea = document.getElementById('notesInput');
textarea.addEventListener('change', handleNote);

function handleNote() {
    console.log(textarea.value);
    localStorage.setItem('notes', textarea.value);
}

function restoreNote() {
    textarea.innerHTML = notes;
}
restoreNote();


//////////// TODO FUNCTIONALITY
const todos = JSON.parse(localStorage.getItem('todos')) || [];
const todoList = document.getElementById('todoList');
populateList(todos, todoList);

function handleTodo(e) {
    e.preventDefault(); 
    const text = (this.querySelector('[name=todo]')).value;
    const item = {
      text,
      done: false
    };
    todos.push(item);
    populateList(todos, todoList);
    localStorage.setItem('todos', JSON.stringify(todos)); // have to convert objects to strings to store in localstorage
    this.reset(); // resets the input form
}

function populateList(todos = [], todoList) {
    todoList.innerHTML = todos.map((todo, i) => {
        return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${todo.done ? 'checked' : ''} style="word-wrap:break-all" />
            <label for="item${i}">${todo.text}</label>
        </li>
        `;
    }).join('');
}

function deleteAll() {
    todos.splice(0, todos.length);
    todoList.innerHTML = '';
  }

function toggleDone(e) {
    if (!e.target.matches('input')) return; // we should only pay attn to the checkboxes! (which are type input)
    const index = e.target.dataset.index;
    todos[index].done = !todos[index].done;
    localStorage.setItem('todos', JSON.stringify(todos));
    populateList(todos, todoList);
}

const addTodos = document.querySelector('.add-todos');
addTodos.addEventListener('submit', handleTodo);

todoList.addEventListener('click', toggleDone); 

const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', deleteAll);
// event delegation- we assign an event listener to the whole todolist, 
// rather than individual checkboxes (which may get created later, and therefore not have the necessary event listener attached!)
// toggleDone only takes action when a checkbox is clicked!


//////////// THE LINKS
const allLinks = 
[
    {name: "notion", url: "https://www.notion.so/Web-Dev-09fe194545d0443994a9f3f409c9e2c4", category: "code"},
    {name: "github", url: "https://github.com", category: "code"},
    {name: "mdn web docs", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript", category: "code"},
    {name: "freecodecamp", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#basic-javascript", category: "code"},

    {name: "figma", url: "https://figma.com", category: "design"},
    {name: "design principles", url: "https://principles.design", category: "design"},
    {name: "hack design", url: "https://hackdesign.org/lessons", category: "design"},
    {name: "behance", url: "https://behance.com", category: "design"},
    
    {name: "notion", url: "https://www.notion.so/Art-d4180dcd7ba54c498ee4dc7699974d03", category: "art"},
    {name: "gumroad", url: "https://gumroad.com/library", category: "art"},
    {name: "pinterest", url: "https://www.pinterest.com/", category: "art"},
    {name: "adorkastock", url: "https://adorkastock.com", category: "art"},
    {name: "pixiv", url: "https://pixiv.com", category: "art"},
    {name: "lospec", url: "http://lospec.com", category: "art"},

    {name: "youtube", url: "https://youtube.com/", category: "fun"},
    {name: "shounen jump", url: "https://www.viz.com/shonenjump", category: "fun"},
    {name: "sakuga", url: "https://www.sakugabooru.com/", category: "fun"},
    {name: "daily puzzles", url: "https://likewordle.com/", category: "fun"},

]

generateLinks('code');

/*
TIME: Should be updated in real time.
*/
updateTime();

function updateTime(){
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10){
        minutes = "0" + minutes
    }
    var t_str = hours + ":" + minutes + " ";
    document.getElementById('time').innerHTML = t_str;
}
setInterval(updateTime, 1000);

/*
CATEGORIES
render a different set of links depending on the category selected.
*/
const categories = document.querySelectorAll('#categoriesList li');
categories.forEach(category => category.addEventListener('click', toggleLinks));
categories.forEach(category => category.addEventListener('mouseover', toggleLinks));

function toggleLinks(e) {
    // filter allLinks to just the selected category
    generateLinks(e.target.id);
}

function generateLinks(selectedCategory) {
    const linklist = document.getElementById('linklist');
    linklist.innerHTML = '';

    let newArray = allLinks.filter(value => value.category === selectedCategory)

    for (let i = 0; i < newArray.length; i++) {
        var listitem = linklist.appendChild(document.createElement("li"))
        var link = listitem.appendChild(document.createElement("a"));
        link.innerHTML = newArray[i].name;
        link.setAttribute('href', newArray[i].url);
        link.setAttribute('target', '_blank');
    }
}

/* night mode */
var currentTime = new Date();
let isNight = false;
//currentTime.getHours >= 17 ? isNight = true : isNight = false;


const nightBtn = document.getElementById('nightBtn');
nightBtn.addEventListener('click', handleNightMode);
handleNightMode();


function handleNightMode() {

    if (isNight === false) {
        nightBtn.innerText = "☼";
        document.documentElement.style.setProperty(`--txt`, '#6575f0');
        document.documentElement.style.setProperty(`--bg`, '#000000');

        document.documentElement.style.setProperty(`--imgUrl`, 'url(./img/png7-edit2.png)');
        document.documentElement.style.setProperty(`--imgSize`, '600px');
        document.documentElement.style.setProperty(`--imgOpacity`, '0.5');
    } else if (isNight === true) {
        nightBtn.innerText = "☾";
        document.documentElement.style.setProperty(`--txt`, '#d65476');
        document.documentElement.style.setProperty(`--bg`, '#f2e7b9');

        document.documentElement.style.setProperty(`--imgUrl`, 'url(./img/png12.png)');
        document.documentElement.style.setProperty(`--imgSize`, '600px');
        document.documentElement.style.setProperty(`--imgOpacity`, '0.3');
    }
    isNight = !isNight;
}

/* music button */
const musicBtn = document.getElementById('musicBtn');
musicBtn.addEventListener('click', toggleMusic);

let musicVisible = false;
function toggleMusic() {
    musicVisible = !musicVisible;
    const musicDiv = document.getElementById('music');
    musicVisible ? musicDiv.style.display = 'block': musicDiv.style.display = 'none';
}

// playlist options
const playlists = document.querySelector('#playlists');
const playlistOptions = playlists.getElementsByTagName('li');
Array.from(playlistOptions).forEach(link => link.addEventListener('click', selectPlaylist));

function selectPlaylist(e) {
    let playlistId = e.target.id;
    console.log(playlistId);
    let youtubeVid = document.querySelector('#youtubeVid');
    console.log('https://www.youtube.com/embed/'+playlistId);
    youtubeVid.setAttribute('src', 'https://www.youtube.com/embed/'+playlistId);
}

/* js30: konami code! 
const pressed = [];
const secretCode = 'ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a';

window.addEventListener('keyup', (e) => {
    console.log(e.key);
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join(' ').includes(secretCode)) {
        
    }
})
*/
