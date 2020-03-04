

function allowDrop(ev) {
    ev.preventDefault();
  }
  function dragStart(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    console.log(ev.target);
  }
  function dropIt(ev) {
    ev.preventDefault();
    let sourceId = ev.dataTransfer.getData("text/plain");
    let sourceIdEl=document.getElementById(sourceId);
    let sourceIdParentEl=sourceIdEl.parentElement;
    let targetEl=document.getElementById(ev.target.id);
    let targetParentEl=targetEl.parentElement;
    console.log(ev.dataTransfer.getData("text/plain"));
    console.log('source id');
    saveDropPosition(targetEl.id, sourceId, function (data) {
        console.log("aok");
        console.log(data)
    });

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

function saveDropPosition(colId, card, callback) {
    let data = {colId: colId.slice(-1), card: card.replace('card','')};

    fetch("/save-drop", {
          method: "POST",
          headers: { 'Accept': 'application/json',
              'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
            .then(data => callback(data));
}
