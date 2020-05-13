const WRAP = document.querySelector("#wrap");
const INPUT_WRAP_WIDTH = 210;
let addList = document.querySelectorAll(".js-add-list");

function paintListItem(ul, li, txt){
    li.setAttribute("draggable", "true");
    li.setAttribute("ondragstart", "event.dataTransfer.setData('text/plain',null)");
    li.innerHTML = `<a href="#"><span>${txt.value}</span></a>`;
    li.classList.add("content-list-item");
    li.classList.add("js-list-item");
    ul.appendChild(li);
}

function paintList(element) {
    
    const targetWrap = document.querySelector(".js-content-wrap");
    const listParent = element.parentNode;
    const wrap = listParent.parentNode;
    const ul = wrap.querySelector("ul");
    const li = document.createElement("li");
    const txtForm = element.querySelector(".js-txt-area");
    // const div = document.createElement("div");

    if(!element.parentNode.parentNode.classList.contains("js-list-wrap")){
        // console.log(element.parentNode.parentNode.classList);

        const underWorldCode = 
            `<h2 class="cont-list-title">
                ${txtForm.value}
            </h2>
            <ul>
            </ul>
            <div class="content-input-wrap">
                <a class="js-add-list" href="#">
                    + Add another card
                </a>
                <div class="js-txt-form content-txt-area">
                    <textarea class="js-txt-area content-textarea">
        
                    </textarea>
                    <div class="content-controll-wrap">
                        <input class="js-add-btn" type="submit" value="Add Item">
                        <a href="#" class="js-cancle content-cancle">
                            X
                        </a>
                    </div>
                </div>
            </div>`;

        const div = document.createElement("div");
        div.id = `${addList.length}`;
        div.setAttribute("draggable", "true");
        div.setAttribute("ondragstart", "event.dataTransfer.setData('text/plain',null)");
        div.classList.add("js-list-wrap");
        div.classList.add("content-list-wrap");
        console.log(typeof txtForm.value);
        element.setAttribute("style", "display:none;");
        // if(txtForm.value.length !== 37){
            div.innerHTML = underWorldCode;
            targetWrap.appendChild(div);
            addList = document.querySelectorAll(".js-add-list");
            // console.log(targetWrap);
            // console.log("list", addList.length);
            txtForm.value = "";
            startClickListener();
            setWrapWidth();
        // }
    }else{
        // console.log(element.parentNode.parentNode.classList);
        console.dir(txtForm.value.split());
        element.setAttribute("style", "display:none;");
        // if(txtForm.value.length !== 37){
            paintListItem(ul, li, txtForm);
            txtForm.value = "";
            startClickListener();
            setWrapWidth();
        // }
    }
    // console.log(txtForm.value);
}

function handleListEvent (e){
    const listWrap = e.target.parentNode;
    const form = listWrap.querySelector(".js-txt-form");
    const addBtn = form.querySelector(".js-add-btn");
    const cancle = form.querySelector(".js-cancle");
    // console.log(form);
    form.setAttribute("style", "display:block;");
    addBtn.onclick = function() {
        addBtn.preventDefault;
        paintList(form);
    }
    cancle.onclick = function() {
        form.setAttribute("style", "display:none;");
    }
}

function startClickListener(){
    addList.forEach(list => {
        list.addEventListener("click", handleListEvent);
    });
}

function setWrapWidth(){
    WRAP.setAttribute("style", `width:${INPUT_WRAP_WIDTH * addList.length + INPUT_WRAP_WIDTH}px;`);
}

function init(){
    startClickListener();
    setWrapWidth();
    
}

init();