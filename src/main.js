import "./style.css";
const content = document.getElementById("content");
const topicList = document.getElementById("topic-list");
let dbData = {};
async function loadDatabase() {
    try {
        const response = await fetch("data.json");
        if (!response.ok)
            throw new Error("Failed to load file with data");
        dbData = await response.json();
        console.log("Database loaded successfuly!", dbData);
    }
    catch (error) {
        console.log("Failed to load database", dbData);
    }
}
const navigationBtns = [
    { id: '#about-btn', action: () => NavigationButtonClicked('about') },
    { id: '#education-btn', action: () => NavigationButtonClicked('education') },
    { id: '#projects-btn', action: () => NavigationButtonClicked('projects') }
];
function NavigationButtonClicked(topic) {
    if (topicList)
        topicList.innerHTML = "";
    if (content)
        content.innerHTML = "";
    const topics = dbData[topic];
    if (topics) {
        topics.forEach(topic => AddNewTopic(topic));
        content.innerHTML = topics.at(0)?.description;
    }
    else {
        console.warn(`There is no data in topic: ${topic}`);
    }
}
function AddNewTopic(topic) {
    if (!topicList)
        return;
    const newLi = document.createElement('li');
    newLi.innerText = topic.title;
    newLi.dataset.description = topic.description;
    topicList.appendChild(newLi);
}
// Clicks
navigationBtns.forEach(btnConfig => {
    const button = document.querySelector(btnConfig.id);
    if (button) {
        button.addEventListener(('click'), btnConfig.action);
    }
    else {
        console.error(`There is no such a button with ${btnConfig.id} id!`);
    }
});
if (topicList) {
    topicList.addEventListener('click', (event) => {
        const clickedLi = event.target;
        if (clickedLi && clickedLi.tagName === "LI") {
            const topicDescription = clickedLi.dataset.description;
            if (content && topicDescription) {
                content.innerHTML = topicDescription;
            }
        }
    });
}
loadDatabase();
//# sourceMappingURL=main.js.map