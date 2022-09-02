
/* notepad functionality */
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

const allLinks = 
[
    {name: "notion", url: "https://www.notion.so/Web-Dev-09fe194545d0443994a9f3f409c9e2c4", category: "code"},
    {name: "github", url: "https://github.com", category: "code"},
    {name: "js30", url: "https://javascript30.com", category: "code"},

    {name: "figma", url: "https://figma.com", category: "design"},
    {name: "design principles", url: "https://principles.design", category: "design"},
    {name: "hack design", url: "https://hackdesign.org/lessons", category: "design"},
    {name: "behance", url: "https://behance.com", category: "design"},
    
    {name: "notion", url: "https://www.notion.so/Art-d4180dcd7ba54c498ee4dc7699974d03", category: "art"},
    {name: "gumroad", url: "https://gumroad.com/library", category: "art"},
    {name: "pinterest", url: "https://www.pinterest.com/marinlily11/", category: "art"},
    {name: "adorkastock", url: "https://adorkastock.com", category: "art"},
    {name: "pixiv", url: "https://pixiv.com", category: "art"},
    {name: "tegaki", url: "http://te2.tewi.us/", category: "art"},
    {name: "lospec", url: "http://lospec.com", category: "art"},

    {name: "genki", url: "https://archive.org/details/Genki/Genki%20-%20Elementary%20Japanese%20I/page/n34/mode/2up", category: "jp"},

    {name: "hxh manga", url: "https://mangadex.org/title/db692d58-4b13-4174-ae8c-30c515c0689c/hunter-x-hunter?order=asc", category: "fun"},
    {name: "daily puzzles", url: "https://likewordle.com/", category: "fun"},
    {name: "anilinks", url: "https://anilinks.neocities.org/", category: "fun"}

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

    var day = currentTime.getDay();
    var month = currentTime.toLocaleString('default', { month: 'long' });
    var d_str = month + ' ' + day;
    document.getElementById('date').innerHTML = d_str;
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

/* js30: konami code! */
const pressed = [];
const secretCode = 'ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a';

window.addEventListener('keyup', (e) => {
    console.log(e.key);
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join(' ').includes(secretCode)) {
        
    }
})

