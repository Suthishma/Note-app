const new_notesContainer = document.querySelector(".notes-container");
const new_addBtn = document.querySelector(".add-btn");


function storeData(){
    const noteData = [];
    const notes = document.querySelectorAll(".note");
    notes.forEach(note =>{
        noteData.push(note.value);
    });

    localStorage.setItem("noteData",JSON.stringify(noteData));
    
}


function loadNotesFromLocalStorage(){
    const savedNote = JSON.parse(localStorage.getItem("noteData"));
    if(savedNote && Array.isArray(savedNote)){
        savedNote.forEach(content =>{
            createContent(content);
        })
    }
}


function createContent(content=""){
    const textBox = document.createElement("textarea");
    textBox.className = "note";
    textBox.placeholder = "Take a note";
    textBox.setAttribute("contenteditable","true");
    textBox.value = content;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn tooltip";

    deleteButton.innerHTML = `<span class="tooltiptext-delete">Delete note</span>
                              <i class="fa-regular fa-trash-can"></i>`;

    const noteWrapper = document.createElement("div");
    noteWrapper.className = "notes-wrapper";

    noteWrapper.appendChild(textBox);
    noteWrapper.appendChild(deleteButton);

    new_notesContainer.appendChild(noteWrapper);
}


new_addBtn.addEventListener("click",()=>{    
    createContent();
    storeData();
})


new_notesContainer.addEventListener("click", (e) => {
    const button = e.target.closest("button.delete-btn");

    if (button) {
        const noteWrapper = button.closest(".notes-wrapper");
        if (noteWrapper) {
            noteWrapper.remove();
            storeData();
            
            
        }
    }
});

new_notesContainer.addEventListener("input",(e) => {
    if(e.target.classList.contains("note")){
        storeData();
        
    }
})

window.addEventListener("DOMContentLoaded",loadNotesFromLocalStorage);



