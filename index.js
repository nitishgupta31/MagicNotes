console.log("Magic Notes Project")
showNotes();


//accessing localstorage for Marking card 
let marked = localStorage.getItem("marked");
if (marked == null) {
    markedObj = []
}
else {
    markedObj = JSON.parse(marked)
}

localStorage.setItem("marked", JSON.stringify(markedObj));




// Adding a event listner
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push(addTxt.value);

    let addTitle = document.getElementById('addTitle');
    let title = localStorage.getItem("title");
    if (title == null) {
        titleObj = []
    }
    else {
        titleObj = JSON.parse(title)
    }
    titleObj.push(addTitle.value);
    localStorage.setItem("title", JSON.stringify(titleObj));
    /////////////////////////////////////////////////////////////////
    //--------MARKING NOTES PART-----------------------------------
    let marked = localStorage.getItem("marked");
    if (marked == null) {
        markedObj = []
    }
    else {
        markedObj = JSON.parse(marked)
    }
    markedObj.push(0);
    localStorage.setItem("marked", JSON.stringify(markedObj));

    //-----------------------------------------------------------------
    ///////////////////////////////////////////////////////////////////


    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = ""
    addTitle.value = ""
    showNotes(); // showing cards
})


// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }


    let title = localStorage.getItem("title");
    if (title == null) {
        titleObj = []
    }
    else {
        titleObj = JSON.parse(title)
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
              <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note <br>${titleObj[index]}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-outline-primary my-2 btn-block btn-md" style="display:block">Delete Note</button>

                        <button id="${index}"onclick="markImportant(this.id)" class="btn btn-outline-primary my-2" style="display:inline-block">MARK</button>
                        <button id="${index}"onclick="unmark(this.id)" class="btn btn-outline-primary my-2" style="display:inline-block">UNMARK</button>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h2>Nothing to show! Use "Add a Note" section above to add notes.</h2>`;
    }
    showMarked();  // showing marking on cards
}

// Function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    markedObj.splice(index, 1);
    titleObj.splice(index, 1);
    localStorage.setItem("marked", JSON.stringify(markedObj));
    localStorage.setItem("title", JSON.stringify(titleObj));
    showNotes();
}



let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})


//function to mark Card
function markImportant(index) {
    markedObj[index] = 1;
    localStorage.setItem("marked", JSON.stringify(markedObj));
    showNotes()
}

//function to unmark Card
function unmark(index) {
    markedObj[index] = 0;
    localStorage.setItem("marked", JSON.stringify(markedObj));
    showNotes()
}

//function to show marking on Cards
function showMarked() {
    let marked = localStorage.getItem("marked");
    if (marked == null) {
        markedObj = []
    }
    else {
        markedObj = JSON.parse(marked)
    }
    notesObj.forEach(function (element, index) {
        if (markedObj[index] == 1) {
            let element = document.getElementById(index).nextElementSibling
            element.style.background = "#ffd11a";
        }
        else {
            let element = document.getElementById(index).nextElementSibling
            element.style.background = "white";
        }
    });
}
setInterval(displayClock, 500)
function displayClock() {
    // var d = new Date()
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let period = "AM";

    if (hrs == 0) hrs = 12;
    if (hrs > 12) {
        hrs = hrs - 12;
        period = "PM";
    }

    hrs = hrs < 10 ? `0${hrs}` : hrs;
    mins = mins < 10 ? `0${mins}` : mins;
    secs = secs < 10 ? `0${secs}` : secs;

    let time = `${hrs}:${mins}:${secs} ${period}`;
    document.getElementById("date").innerText = time

}

