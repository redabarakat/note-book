const add =  document.querySelector(".card-add .add")
const popupApp = document.querySelector(".popup-app");
const Close = document.querySelector("ion-icon");
const headerpop = document.querySelector(".popup-app .header-popup h3");
const input = document.querySelector(".popup-app .popup input");
const textarea = document.querySelector(".popup-app .popup textarea");
const button = document.querySelector(".popup-app .popup button");
const notes = document.querySelector(".notes");
const dotes = document.querySelector(".notes .card-note .details .dotes");


let date = new Date();
let dummy;
let data;
let mood = "add"
if(window.localStorage.getItem("note")) {
    data = JSON.parse(window.localStorage.getItem("note"));
} else {
    data = []
}

add.addEventListener("click",()=> {
    popupApp.classList.add("active")
})
Close.addEventListener("click", ()=> {
    popupApp.classList.remove("active");
})

button.addEventListener("click",()=> {
    if(input.value === "" || textarea.value === "") return alert("من فضللك ادخل العنوان والوصف")
    if(mood == "add") {
        headerpop.innerHTML = "اضف ملاحظه جديده";
        button.innerHTML = "اضافه";
        datadeltails();
        showData();
        Close.click();
        input.value = "";
        textarea.value = "";
    }else {
        data[dummy].inputValue = input.value.trim()
        data[dummy].textareavalue = textarea.value.trim()
        window.localStorage.setItem("note", JSON.stringify(data));
        showData();
        Close.click();
        input.value = "";
        textarea.value = "";
        mood = "add"
    }
})

function datadeltails(){
    let obj = {
        inputValue: input.value.trim(),
        textareavalue: textarea.value.trim()
    }
    data.push(obj)
    window.localStorage.setItem("note",JSON.stringify(data))
}

function showData(){
    notes.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            notes.innerHTML += `
            <div class="card-note">
                <h3>${data[i].inputValue}</h3>
                <p>${data[i].textareavalue}</p>
                <div class="details">
                    <span class="history">${date.toDateString()}</span>
                    <span class="dotes" onclick= showedit(this)><ion-icon name="ellipsis-horizontal-sharp"></ion-icon></span>
                    <div class="edit-card">
                        <p class="edit" onclick = editdata(${i})>تعديل <span><ion-icon name="create-outline"></ion-icon></span></p>
                        <p class="delete" onclick=deleteItem(${i})>حذف <span><ion-icon name="trash-outline"></ion-icon></p>
                    </div>
                </div>
            </div>
        `;
        }
}
showData()
function showedit(ele){
    ele.classList.toggle("on")
}
function deleteItem(i){
    let confir = window.confirm("هل انت متاكد من مسح الملاحظه");
    if(!confir) return false
    data.splice(i,1)
    window.localStorage.setItem("note",JSON.stringify(data))
    showData();
}
function editdata(i){
    dummy = i
    mood = "edit"
    popupApp.classList.add("active");
    headerpop.innerHTML = "تعديل الملاحظه"
    button.innerHTML = "تعديل"
    input.value = data[i].inputValue
    textarea.value = data[i].textareavalue
}

