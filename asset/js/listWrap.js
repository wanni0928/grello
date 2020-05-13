const ITEM_EFFECT_CSS = "background-color : rgba(0, 0, 0, 0.2)";
const CONTENT_WRAP = "js-content-wrap";
const CONTENT = "js-list-wrap";
const LIST = "js-list-item";

const contentWrap = document.querySelector(`.${CONTENT_WRAP}`);

let wrapTrigger = false;

let dragged;
let targeted;

let draggedConts;
let targetedConts;

function handleDrop(e){
    if(e.target.classList.contains(CONTENT)){
        // console.log("drop", e.target);
        dragged.setAttribute("style", "");
        draggedConts.forEach(content => {
            content.style.opacity = "";
        });
        targeted.setAttribute("style", "");
        targetedConts.forEach(content => {
            content.style.opacity = "";
        });
        // console.log("before dragged", dragged);
        // console.log(" before target", targeted);
        const tempDrag = dragged.innerHTML;
        const tempTarget = targeted.innerHTML;
        // dragged.parentNode.removeChild(dragged);
        // targeted.parentNode.removeChild(targeted);
        // console.log(tempDrag);
        // console.log(tempTarget);
        // console.dir(targeted);
        
        dragged.innerHTML = tempTarget;
        targeted.innerHTML = tempDrag;
        addList = document.querySelectorAll(".js-add-list");
        // console.log(targetWrap);
        // console.log("list", addList.length);
        // console.log("list", addList);
        startClickListener();
        // dragged = targeted;
        // targeted = temp;
        // console.log("after dragged", dragged);
        // console.log("after target", targeted);
    }else if(e.target.parentNode.classList.contains(LIST)){
        console.log("drag", dragged);
        console.log("target", targeted)
        const tempDrag = dragged.innerHTML;
        const tempTarget = targeted.innerHTML;
        targeted.style = "";
        dragged.innerHTML = tempTarget;
        targeted.innerHTML = tempDrag;
        // startDragDrop();
        addList = document.querySelectorAll(".js-add-list");
        // console.log(targetWrap);
        // console.log("list", addList.length);
        // console.log("list", addList);
        startClickListener();
    }else{
        return;
    }
}

function handleDragLeave(e){
    // console.log("dragLeave", e.target)
    if(e.target.classList.contains(CONTENT)){
        // console.log("dragLeave", e.target);
        targeted.setAttribute("style", "");
        targetedConts.forEach(content => {
            content.style.opacity = "";
        });
    }else if(e.target.parentNode.classList.contains(LIST)){
        targeted.style.opacity = "";
    }else{
        return;
    }
}

function handleDragEnter(e){
    if(e.target.classList.contains(CONTENT)){
        // console.log("dragEnter", e.target)
    }
}

// textarea, input 같은 입력태그에 드래그 해서 놓으면, 입력이 진행되는 기본기능을 차단한다.
function handleDragOver(e){
    e.preventDefault();
    if(e.target.classList.contains(CONTENT)){
        // console.log("dragOver", e.target);
        targeted = e.target;
        targetedConts = targeted.querySelectorAll(".js-list-wrap > *");
        targeted.setAttribute("style", ITEM_EFFECT_CSS);
        targetedConts.forEach(content => {
            content.style.opacity = 0;
        });
    }else if(e.target.parentNode.classList.contains(LIST)){
        // console.log("over", e.target.parentNode);
        targeted = e.target.parentNode;
        targeted.style.opacity = 0.2;
    }else{
        return;
    }
}

function handleDragEnd(e){
    // console.log("dragEnd", e.target);
    if(e.target.classList.contains(CONTENT)){
        dragged.setAttribute("style", "");
        draggedConts.forEach(content => {
            content.style.opacity = 1;
        });
    }else if(e.target.parentNode.classList.contains(LIST)){
        dragged.style.opacity = "";
    }else{
        return;
    }
}

function handelDragStart(e){    
    // console.log(e.target.parentNode);
    if(e.target.classList.contains(CONTENT)){
        console.log("dragstart", e.target);
        dragged = e.target;
        draggedConts = dragged.querySelectorAll(".js-list-wrap > *");
        dragged.setAttribute("style", ITEM_EFFECT_CSS);
        draggedConts.forEach(content => {
            content.style.opacity = 0;
        });
    }else if(e.target.parentNode.classList.contains(LIST)){
        dragged = e.target.parentNode;
        dragged.style.opacity = 0.2;
        console.log("list", dragged);
    }else{
        return;
    }
}

function startDragDrop(){
    contentWrap.addEventListener("drag", function(e){}, false);
    contentWrap.addEventListener("dragstart", handelDragStart, false);
    contentWrap.addEventListener("dragend", handleDragEnd, false);
    contentWrap.addEventListener("dragover", handleDragOver, false);
    contentWrap.addEventListener("dragenter", handleDragEnter, false);
    contentWrap.addEventListener("dragleave", handleDragLeave, false);
    contentWrap.addEventListener("drop", handleDrop, false);
}

function init(){
    // console.log(contentWrap.querySelector(`.${LIST}`));
    startDragDrop();
}

init();