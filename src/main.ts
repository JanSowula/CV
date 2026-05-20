import "./style.css";

interface TopicItem{
    title: string;
    description: string;
}
interface CVData{
    [key: string]: TopicItem[];
}

const content = document.getElementById("content") as HTMLDivElement;
const topicList = document.getElementById("topic-list") as HTMLUListElement;
let dbData: CVData = {};

async function loadDatabase() {
    try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Failed to load file with data");

        dbData = await response.json();
        console.log("Database loaded successfuly!", dbData);
    }
    catch(error) {
        console.log("Failed to load database", dbData);
    }
}

const navigationBtns = [
    { id: '#about-btn', action: () => NavigationButtonClicked('about') },
    { id: '#education-btn', action: () => NavigationButtonClicked('education') },
    { id: '#projects-btn', action: () => NavigationButtonClicked('projects') }
];

function NavigationButtonClicked(topic: string) {
    if (topicList) topicList.innerHTML = "";
    if (content) content.innerHTML = "";

    const topics = dbData[topic];
    if (topics) {
        topics.forEach(topic => AddNewTopic(topic));
        content.innerHTML = topics.at(0)?.description as string;
    } else { 
        console.warn(`There is no data in topic: ${topic}`)
    }
}

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