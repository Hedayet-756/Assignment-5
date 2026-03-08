const createElement = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
};


const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues") // promise of response
    .then(res => res.json())
    .then(json => displayIssues(json.data));
};

// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },

const displayIssues=(issues)=>{
    // get all issues container
    const issuesCard = document.getElementById("issues-card");
    issuesCard.innerHTML = "";
    // get every issue
    for(let issue of issues){
        // 3. create Element
        // console.log(issue);
        const issueDive = document.createElement("div");
        issueDive.innerHTML = `
         <div>
            <div class="">
                <img class="hidden" src="./assets/Open-Status.png" alt="">
                <img class="hidden" src="./assets/Closed- Status .png" alt="">
                <p class="status">${issue.status}</p>
            </div>

            <div class="">
                <h2 class="text-xl font-bold">${issue.title}</h2>
                <p class="text-[12px] font-medium text-gray-500">${issue.description}</p>
            </div>

            <div class="">
            </div>
        </div>
        <div class="border border-t-gray-50">
            <p class="text-[12px] font-medium text-gray-500"></p>
            <p class="text-[12px] font-medium text-gray-500"></p>
        </div>
        `;
        // 4. append into container
        issuesCard.append(issueDive);
    };
};

loadIssues();