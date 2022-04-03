function generateMcqs() {
    const vals = [];
    document.querySelectorAll('input').forEach(elem => vals.push(elem.value));
    const [ques, opts] = vals;
    console.log(ques, opts);

    const mcqs = document.querySelector('#mcqs');
    let question = document.querySelector('#ques-list');
    question.innerHTML = '';
    for (let i = 1; i <= ques; i++) {
        question.innerHTML += `
            <li id="ques-${i}">This is the question statement for question #${i}&emsp;
            <button onclick="showCategoryInput(${ques}, ${i})">Categorize</button>
            <span class="inp-catg"></span>
            <span id="inp-catg-opts"></span>
            <div id="ques-choices-${i}"></div>
            <br></li>
        `;
        getChoices(opts, i);
        // question.innerHTML += choices.innerHTML;
    }
    // mcqs.innerHTML += question.innerHTML;
}

function showCategoryInput(que, i) {
    const selector = `#ques-${i} .inp-catg`;
    const inpCatg = document.querySelector(selector);
    inpCatg.innerHTML = `<input type="number" id="catg-${i}" placeholder="# of categories"> <button onclick="renderCategories(${i})">Go</button>`
}

function renderCategories(q) {
    const selector = `#ques-choices-${q}`;
    const categoryToBe = document.querySelector(selector);
    categoryToBe.innerHTML = '';

    let startOption = 65;  // 'A'
    const categoryCount = document.querySelector(`#catg-${q}`).value;
    for (let i = 1; i <= categoryCount; i++) {
        categoryToBe.innerHTML += `Category ${i}: &emsp;`;
        for (let j = 0; j <= 2; j++) {
            const button = getButtonHTML(q, startOption-65, startOption++);
            categoryToBe.innerHTML += button;
        }
        categoryToBe.innerHTML += '<br>'
    }
}

function getChoices(n, q) {
    const selector = `#ques-choices-${q}`;
    console.log(selector);
    let choices = document.querySelector(selector);
    // choices.setAttribute("id", ``);
    for (let i = 0; i < n; i++) {
        // const choice = document.createElement('button');
        let choice = getButtonHTML(q, i, i+65);
        choices.innerHTML += choice;
    }
    choices.innerHTML += '<br>'
    console.log(choices);
    // return choices;
}

function getButtonHTML(q, opt, ascii) {
    return `<button id="choice-${q}-${opt}" onclick="toggleChoice(${q}, ${opt})">${String.fromCharCode(ascii)}</button>`;
}

function toggleChoice(q, opt) {
    const id = `#choice-${q}-${opt}`;
    const choice = document.querySelector(id);
    // console.log(choice.className)
    if (choice.classList.contains('selected')) {
        choice.classList.remove('selected');
    } else {
        choice.classList.add('selected');
    }
}