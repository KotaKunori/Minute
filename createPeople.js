var members = [];

(function() {
    var commentInput = document.getElementById("commentInput");
    commentInput.addEventListener("keypress", enterKeyPress, false);

    var presenterInput = document.getElementById("presenterInput");
    presenterInput.addEventListener("keypress", enterKeyPresenter, false);

    var audienceInput = document.getElementById("audienceInput");
    audienceInput.addEventListener("keypress", enterKeyAudience, false);

    var anckerEnter = document.getElementById("anckerEnter");
    anckerEnter.addEventListener("change", anckerChecked, false);

    var topicEnter = document.getElementById("topicEnter");
    topicEnter.addEventListener("change", addTopicChecked, false);

    document.addEventListener("keydown", keyPress, false);

    var main = localStorage.getItem('content');
    var title = localStorage.getItem('title');
    if(main && title){
        document.getElementById("titleInput").value = title;

        var container = document.getElementsByClassName("mainText")[0];
        var texts = main.split(/\r\n|\n/);
        var par = document.createElement("p"); 
        var span = document.createElement("span");
        texts.forEach(text => {
            switch(text[0]){
                case "　":
                    span.innerText += text;
                    span.appendChild(document.createElement("br"));
                    break;
                case "~":
                    span = document.createElement("span");
                    span.innerText = text;
                    span.appendChild(document.createElement("br"));
                    span.addEventListener("click", dClick, false);
                    par.appendChild(span);
                    break;
                case "発":
                    par = document.createElement("p");
                    par.classList.add("note");
                    span = document.createElement("span");
                    span.innerText = text;
                    span.appendChild(document.createElement("br"));
                    par.appendChild(span);
                    par.addEventListener("click", pClick, false);
                    container.appendChild(par);
                    break;
                default:
                    break;
            }
        });
    }

    getResources();
})();

function getResources() {
    var req = new XMLHttpRequest();
    req.open("GET", "resources/members.csv");
    req.send(null);

    req.onload = function() {
        showMembers(req.responseText);
        createTable(members);
    }

    function showMembers(str) {
        var tmp = str.split(/\r\n|\n/);
        for(var i = 0; i < tmp.length; i++) {
            members[i] = tmp[i].split(',');
        }
    }
}

function createTable(data) {
    var table = document.createElement("table");
    table.id = "selectTable";
    var title = document.getElementById("audienceTitle");
    title.after(table);

    var tr = [];
    for(var i = 0; i < data.length + 2; i++) {
        tr[i] = document.createElement("tr");
        table.appendChild(tr[i]);
    }
    
    var tableHeader1 = document.createElement("th");
    tableHeader1.innerText = "名前";
    tr[0].appendChild(tableHeader1);
    var tableHeader2 = document.createElement("th");
    tableHeader2.innerText = "選択";
    tr[0].appendChild(tableHeader2);

    for(var i = 1; i < data.length + 1; i++) {
        var cell1 = document.createElement("td");
        cell1.innerText = data[i - 1][1];
        tr[i].appendChild(cell1);
        var cell2 = document.createElement("td");
        var input = document.createElement("input");
        input.type = "checkbox";
        input.id = "checkbox" + i;
        cell2.appendChild(input);
        tr[i].appendChild(cell2);
    }

    var cell1 = document.createElement("td");
    cell1.innerText = "全て選択";
    tr[i].appendChild(cell1);
    var cell2 = document.createElement("td");
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = "checkboxAll";
    input.addEventListener("change", checkChanged, false);
    cell2.appendChild(input);
    tr[i].appendChild(cell2);
}

function checkChanged(e) {
    var table = document.getElementById("selectTable");
    var checkbox = document.getElementById("checkboxAll");
    if(checkbox.checked) {
        var flag = true;
    }
    else {
        var flag = false;
    }
    for(var i = 1; i < table.children.length - 1; i++) {
        var box = document.getElementById("checkbox" + i);
        box.checked = flag;
    }
}

function addTopicChecked(e) {
    document.getElementById("anckerEnter").checked = false;
}

function anckerChecked(e) {
    document.getElementById("topicEnter").checked = false;
}

function createPerson() {
    var people = document.getElementsByClassName("people")[0];

    var newPerson = document.createElement("div");
    newPerson.classList.add("person");

    var newPersonImage = document.createElement("img");
    newPersonImage.src = "resources/person.png";
    newPersonImage.classList.add("personImage");
    newPerson.appendChild(newPersonImage);
    
    var newPersonName = document.createElement("div");
    var name = document.getElementById("audienceInput");
    newPersonName.innerText = name.value;
    name.value = "";
    newPersonName.classList.add("personName");
    newPerson.appendChild(newPersonName);

    newPerson.addEventListener("click", mClick, false);
    people.appendChild(newPerson);

    if(people.firstChild){
        var mark = document.getElementsByClassName("commentMark")[0];
        mark.style.left = people.firstChild.getBoundingClientRect().left + people.firstChild.offsetWidth / 2 - mark.offsetWidth / 2 + "px";
    }
}


function createPeople() {
    var people = document.getElementsByClassName("people")[0];
    while(people.firstChild) {
        people.removeChild(people.firstChild);
    }

    members.forEach(member => {
        var newPerson = document.createElement("div");
        newPerson.classList.add("person");

        var newPersonImage = document.createElement("img");
        newPersonImage.src = "resources/person.png";
        newPersonImage.classList.add("personImage");
        newPerson.appendChild(newPersonImage);
        
        var newPersonName = document.createElement("div");
        newPersonName.innerText = member;
        newPersonName.classList.add("personName");
        newPerson.appendChild(newPersonName);

        newPerson.addEventListener("click", mClick, false);
        people.appendChild(newPerson);
    });

    if(people.firstChild){
        var mark = document.getElementsByClassName("commentMark")[0];
        mark.style.left = people.firstChild.getBoundingClientRect().left + people.firstChild.offsetWidth / 2 - mark.offsetWidth / 2 + "px";
    }
}

function save() {
    localStorage.clear();

    var main = document.getElementsByClassName("mainText")[0];
    var title = document.getElementById("titleInput");
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if(month < 10) {
        var strMonth = "0" + month; 
    }
    else{
        var strMonth = "" + month;
    }
    if(day < 10) {
        var strDate = "0" + day; 
    }
    else{
        var strDate = "" + day;
    }

    var str = 'リンクはこれ\r\n<!-- wp:paragraph -->\r\n<p><a href="#' + strMonth + strDate + '"><u>' + year + '年' + month + '月' + day + '日 ' + title.value + '</u></a></p>\r\n<!-- /wp:paragraph -->\r\n\r\n';
    str += '見出しはこれ\r\n<!-- wp:heading {"level":1} -->\r\n<h1 id="' + strMonth + strDate + '">' + year + '年' + month + '月' + day + '日 ' + title.value + '</h1>\r\n<!-- /wp:heading -->\r\n\r\n';
    str += "本文はこれ\r\n" + main.innerText;
    var array = str.split('');
    var blob = new Blob(array, {type:"text/plan"});
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    if(title.value != "") {
        var fileName = title.value + ".txt";
    }
    else {
        var fileName = "test.txt"
    }
    link.download = fileName;
    link.click();
}

function mClick(e) {
    var selected = document.getElementsByClassName("selected")[0];
    if(selected){
        selected.classList.remove("selected");
    }
    this.classList.add("selected");

    var people = document.getElementsByClassName("people")[0];
    if(this != people.firstChild) {
        people.insertBefore(this, people.firstChild);
    }
}

function dClick(e) {
    var selectedFlag = true;
    var selectedDiv = document.getElementsByClassName("selectedDiv")[0];
    var selectedPar = document.getElementsByClassName("selectedPar")[0];
    if(this.classList.contains("selectedDiv")) {
        var editable = document.getElementById("editEnable");
        if(editable.checked){
            selectedDiv.contentEditable = true;
            e.stopPropagation();
            return false;
        }
        else{
            selectedFlag = false;
        }
    }
    if(selectedDiv) {
        selectedDiv.classList.remove("selectedDiv");
        selectedDiv.contentEditable = false;
    }
    if(selectedPar) {
        selectedPar.classList.remove("selectedPar");
        selectedPar.contentEditable = false;
    }
    if(selectedFlag) {
        this.classList.add("selectedDiv");
    }
    e.stopPropagation();
}

function pClick(e) {
    var selectedFlag = true;
    var selectedDiv = document.getElementsByClassName("selectedDiv")[0];
    var selectedPar = document.getElementsByClassName("selectedPar")[0];
    if(this.classList.contains("selectedPar")) {
        var editable = document.getElementById("editEnable");
        if(editable.checked){
            selectedPar.contentEditable = true;
            e.stopPropagation();
            return false;
        }
        else{
            selectedFlag = false;
        }
    }
    if(selectedDiv) {
        selectedDiv.classList.remove("selectedDiv");
        selectedDiv.contentEditable = false;
    }
    if(selectedPar){
        selectedPar.classList.remove("selectedPar");
        selectedPar.contentEditable = false;
    }
    if(selectedFlag) {
        this.classList.add("selectedPar");
    }
    e.stopPropagation();
}

function enterKeyPress(e) {
    if(e.keyCode === 13) {
        var topicEnter = document.getElementById("topicEnter");
        var anckerEnter = document.getElementById("anckerEnter");
        if(e.shiftKey) {
            anckerEnter.checked = !anckerEnter.checked;
            topicEnter.checked = false;
        }
        else if(e.altKey){
            topicEnter.checked = !topicEnter.checked;
            anckerEnter.checked = false;
        }
        else {
            enter();
        }
    }
}

function keyPress(e){
    if(e.keyCode === 38) {
        var selectedDiv = document.getElementsByClassName("selectedDiv")[0];
        var selectedPar = document.getElementsByClassName("selectedPar")[0];
        if(selectedDiv) {
            var selected = selectedDiv;

            var parent = selected.parentElement;
            var pre = selected.previousElementSibling;
            if(pre == parent.firstChild) {
                parent.lastChild.after(selected);
            }
            else {
                pre.before(selected);
            }

            e.preventDefault();
        }
        if(selectedPar) {
            var selected = selectedPar;

            var parent = selected.parentElement;
            var pre = selected.previousElementSibling;
            if(pre == null) {
                parent.lastChild.after(selected);
            }
            else {
                pre.before(selected);
            }

            e.preventDefault();
        }
    }
    else if(e.keyCode === 40){
        var selectedDiv = document.getElementsByClassName("selectedDiv")[0];
        var selectedPar = document.getElementsByClassName("selectedPar")[0];
        if(selectedDiv) {
            var selected = selectedDiv;

            var parent = selected.parentElement;
            var next = selected.nextElementSibling;
            if(next == null) {
                parent.firstChild.after(selected);
            }
            else {
                next.after(selected);
            }

            e.preventDefault();
        }
        if(selectedPar) {
            var selected = selectedPar;

            var parent = selected.parentElement;
            var next = selected.nextElementSibling;
            if(next == null) {
                parent.firstChild.before(selected);
            }
            else {
                next.after(selected);
            }

            e.preventDefault();
        }
    }
}

function enterKeyPresenter(e) {
    if(e.keyCode === 13) {
        enterPresenter();
    }
}

function enterKeyAudience(e) 
{
    if(e.keyCode === 13) {
        createPerson();
    }
}

function enter() {
    var check = document.getElementById("topicEnter");
    if(check.checked) {
        enterTopic();
    }
    else {
        enterText();
    }
    var main = document.getElementsByClassName("mainText")[0];
    var title = document.getElementById("titleInput");

    localStorage.setItem('title', title.value);
    localStorage.setItem('content', main.innerText);
}

function enterText() {
    var selected = document.getElementsByClassName("selected")[0];
    if(!selected) {
        return false;
    }

    var main = document.getElementsByClassName("mainText")[0];
    if(main.children.length == 0) {
        return false;
    }

    if(document.getElementsByClassName("selectedDiv")[0]){
        var destination = document.getElementsByClassName("selectedDiv")[0];
    }
    else {
        var selectedPar = document.getElementsByClassName("selectedPar")[0];
        if(selectedPar) {
            if(selectedPar.children.length != 0) {
                var destination = selectedPar.children[selectedPar.children.length - 1];
            }
            else {
                return false;
            }
        }
        else {
            for(var i = main.children.length - 1; i >= 0; i--) {
                var tmpPar = main.children[i];
                if(tmpPar.children.length != 0) {
                    var destination = tmpPar.children[tmpPar.children.length - 1];
                    break;
                }
            }
        }
    }

    var input = document.getElementById("commentInput");
    var inputText = input.value;
    if(inputText == "") {
        return false;
    }

    var personName = selected.children[1];
    var name = personName.innerText;

    if(document.getElementById("anckerEnter").checked) {
        var indent = "　→";
    }
    else {
        var indent = "　";
    }
    destination.innerText += indent + name +": " + inputText;

    destination.appendChild(document.createElement("br"));

    input.value = "";
}

function enterTopic() {
    var main = document.getElementsByClassName("mainText")[0];
    if(main.children.length == 0) {
        return false;
    }

    if(document.getElementsByClassName("selectedPar")[0]){
        var destination = document.getElementsByClassName("selectedPar")[0];
    }
    else {
        var destination = main.children[main.children.length - 1];
    }

    var input = document.getElementById("commentInput");
    var inputText = input.value;
    if(inputText == "") {
        return false;
    }

    var par = document.createElement("span");
    par.innerText = "~" + inputText + "~";
    par.appendChild(document.createElement("br"));
    par.addEventListener("click", dClick, false);
    destination.appendChild(par);

    input.value = "";
}

function enterPresenter() {
    var destination = document.getElementsByClassName("mainText")[0];

    var input = document.getElementById("presenterInput");
    var inputText = input.value;
    if(inputText == "") {
        return false;
    }

    var par = document.createElement("p");
    par.classList.add("note");
    var span = document.createElement("span");
    span.innerText = "発表者: " + inputText;
    span.appendChild(document.createElement("br"));
    par.appendChild(span);
    par.addEventListener("click", pClick, false);
    destination.appendChild(par);

    input.value = "";
}

function selectPeople() {
    var table = document.getElementById("selectTable");
    members = [];
    for(var i = 1; i < table.children.length - 1; i++) {
        if(document.getElementById("checkbox" + i).checked) {
            members.push(table.children[i].children[0].innerText);
        }
    }

    createPeople();
}