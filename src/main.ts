import "./style.css";
import topicData from "./data.json"

//interfaces
interface TopicItem{
    title: string;
    description: string;
}
interface CVData{
    [key: string]: TopicItem[];
}

//variables
const content = document.getElementById("content") as HTMLDivElement;
const topicList = document.getElementById("topic-list") as HTMLUListElement;
const sidebarTitle = document.getElementById("sidebar-title") as HTMLHeadingElement;
let dbData: CVData = {};

// Get Data from data.json
function loadDatabase() {
    try {
        dbData = topicData;
        console.log("Database loaded successfuly!", dbData);
        InitLinksAndDescription();
    }
    catch(error) {
        console.log("Failed to load database", dbData);
    }
}

function InitLinksAndDescription() {
    NavigationButtonClicked('About');
}

// Set functions to buttons
const navigationBtns = [
    { id: '#about-btn', action: () => NavigationButtonClicked('About') },
    { id: '#education-btn', action: () => NavigationButtonClicked('Education') },
    { id: '#projects-btn', action: () => NavigationButtonClicked('Projects') }
];

function NavigationButtonClicked(topic: string) {
    // Clear lists
    if (topicList) topicList.innerHTML = "";
    if (content) content.innerHTML = "";

    
    const topics = dbData[topic];
    if (topics) {
        sidebarTitle.innerHTML = topic;
        topics.forEach(topic => AddNewTopic(topic));
        // Setup first description as a default
        content.innerHTML = topics.at(0)?.description as string;
    } else { 
        console.warn(`There is no data in topic: ${topic}`)
    }
}

// Add Li
function AddNewTopic(topic: TopicItem) {
    if (!topicList) return;
    const newLi = document.createElement('li') as HTMLLIElement;
    newLi.innerText = topic.title;
    newLi.dataset.description = topic.description;
    topicList.appendChild(newLi);
}


// Clicks
navigationBtns.forEach(btnConfig => {
    const button = document.querySelector<HTMLButtonElement>(btnConfig.id);

    if (button) {
        button.addEventListener(('click'), btnConfig.action);
    } else {
        console.error(`There is no such a button with ${btnConfig.id} id!`);
    }
});

if (topicList) {
    topicList.addEventListener('click', (event: MouseEvent) => {
        const clickedLi = event.target as HTMLLIElement;
        
        if (clickedLi && clickedLi.tagName === "LI") {
            const topicDescription = clickedLi.dataset.description;

            if (content && topicDescription) {
                content.innerHTML = topicDescription;
            }
        }
    });
}

loadDatabase();