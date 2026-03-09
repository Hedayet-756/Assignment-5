const createElement = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
};

let allIssues = [];




const loadIssues = () => {
    const spinner = document.getElementById("loading-spinner");
    spinner.classList.remove('hidden');
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues") // promise of response
    .then(res => res.json())
    .then(json => {
        allIssues = json.data;
        spinner.classList.add('hidden');
        const allIssue = document.getElementById("length-issues");
        allIssue.innerText = `${allIssues.length}`;
        displayIssues(allIssues);
        document.getElementById('btn-all').classList.add('active');
    });   
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



const filterIssues = (status, event) => {
    const spinner = document.getElementById("loading-spinner");
    const issuesCard = document.getElementById("issues-card");

    if(spinner){
        spinner.classList.remove('hidden');
        issuesCard.innerHTML = "";
        issuesCard.appendChild(spinner);
    }else{
        issuesCard.innerHTML = "";
    }
    // spinner.classList.remove('hidden');
    // issuesCard.innerHTML = '';
    // issuesCard.appendChild(spinner);

    const colorButton = document.querySelectorAll('.filter-btn');
    colorButton.forEach(btn => btn.classList.remove('active'));
    if(event){
        event.target.closest('.filter-btn').classList.add('active');
    };

    let filteredData = status === 'all' ? allIssues:allIssues.filter(i => i.status === status);
    
    const allIssue = document.getElementById("length-issues");
    allIssue.innerText = filteredData.length;

    //spinner.classList.add('hidden');
    displayIssues(filteredData);
};

document.getElementById('btn-all').addEventListener('click', (event) => filterIssues('all', event));
document.getElementById('btn-open').addEventListener('click', (event) => filterIssues('open', event));
document.getElementById('btn-Closed').addEventListener('click', (event) => filterIssues('closed', event));

const displayIssues=(issues)=>{
    // get all issues container
    const issuesCard = document.getElementById("issues-card");
    issuesCard.innerHTML = "";
    // get every issue
    for(let issue of issues){
        // 3. create Element
        // console.log(issue);
        const issueCard = document.createElement("div");
        issueCard.innerHTML = `
        <div class="flex flex-col h-full border-t-4 border-solid ${issue.status === 'open'?'border-green-500':'border-violet-500'} rounded-md shadow-md bg-white">
            <div class="p-2 space-y-3">
                <div class="flex justify-between items-start mb-4 p-4">
                    <div class="">
                        ${issue.status === 'open'?`<img class="" src="./assets/Open-Status.png" alt="open">`:`<img class="" src="./assets/Closed- Status .png" alt="close">`}
                    </div>
                    <p class="${issue.priority === 'high' ? 'bg-red-100 border-red-300 text-red-600':issue.priority === 'medium'? 'bg-yellow-100 border-yellow-300 text-yellow-600': 'bg-gray-100 broder-gray-300 text-gray-600'} rounded-md" p-0>${issue.priority.toUpperCase()}</p>
                </div>

                <div class="">
                    <h2 class="text-xl font-bold">${issue.title}</h2>
                    <p class="text-sm font-medium text-gray-500">${issue.description}</p>
                </div>

                <div class="flex flex-wrap gap-2 mb-4">
                    ${issue.labels.map(label => `<span class="flex items-start gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${label === 'bug'?'bg-red-50 border-red-300 text-red-500':label === 'help wanted'?'bg-yellow-50 border-yellow-200 text-yellow-500':'bg-green-50 border-green-200 text-green-500'}"> ${label === 'bug' ? '🐞' : label === 'help wanted' ? '🙋' : '🏷️'}
                        ${label}</span>`).join('')}
                </div>
            </div>
            <div class="border-t border-gray-200 mt-4 p-2">
                <p class="text-sm font-medium text-gray-500"># ${issue.id} ${issue.author}</p>
                <p class="text-sm font-medium text-gray-500">${new Date(issue.createdAt).toLocaleDateString('en-GB')}</p>
            </div>
        </div>    
        `;
        // 4. append into container
        issuesCard.append(issueCard);
    };
};

loadIssues();

document.querySelector('input[type="search"]').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const result = allIssues.filter(issue => issue.title.toLowerCase().includes(term));
    displayIssues(result);
});
