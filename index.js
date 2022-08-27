const allLinks = 
[
    {name: "gmail", url: "https://mail.google.com", category: "general"},
    {name: "notion", url: "https://notion.com", category: "general"},
    {name: "youtube", url: "https://youtube.com", category: "general"},

    {name: "github", url: "https://github.com", category: "code"},
    {name: "figma", url: "https://figma.com", category: "code"},
    {name: "js30", url: "https://javascript30.com", category: "code"},

    {name: "pinterest", url: "https://pinterest.com", category: "art"},
    {name: "pixiv", url: "https://pixiv.com", category: "art"},
    {name: "adorkastock", url: "https://adorkastock.com", category: "art"}
]

generateLinks('general');

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




