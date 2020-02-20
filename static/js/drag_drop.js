


function allowDrop(ev) {
    ev.preventDefault();
  }
  function dragStart(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
  }
  function dropIt(ev) {
    ev.preventDefault();
    let sourceId = ev.dataTransfer.getData("text/plain");
    let sourceIdEl=document.getElementById(sourceId);
    let sourceIdParentEl=sourceIdEl.parentElement;
    let targetEl=document.getElementById(ev.target.id);
    let targetParentEl=targetEl.parentElement;

    if (targetParentEl.id!==sourceIdParentEl.id){
        if (targetEl.className === sourceIdEl.className ){
           targetParentEl.appendChild(sourceIdEl);

        }else{
             targetEl.appendChild(sourceIdEl);

        }

    }else{
        let holderText=targetEl.textContent;
        targetEl.textContent=sourceIdEl.textContent;
        sourceIdEl.textContent=holderText;
        holderText='';
}

  }