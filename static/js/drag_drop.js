
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
    saveDropPosition(targetEl.id, sourceId);

    if (targetParentEl.id!==sourceIdParentEl.id){

        if (targetEl.className === sourceIdEl.className ){
           targetParentEl.appendChild(sourceIdEl);

        }else{
            console.log(sourceIdParentEl);
            let data = {'targetEl': targetEl.id, 'sourceIdEl': sourceIdEl.id};
            socket.emit('drop append', data);
             // targetEl.appendChild(sourceIdEl);

        }

    }else{
        let holderText=targetEl.textContent;
        targetEl.textContent=sourceIdEl.textContent;
        sourceIdEl.textContent=holderText;
        holderText='';
}

  }

function saveDropPosition(colId, card) {

    let boardid = document.querySelector('#' + colId).parentElement.parentElement.id.replace('columns', '');
    let data = {colId: colId.replace('board-col-cont' + boardid, ''), card: card.replace('card','')};
    console.log(colId.replace('board-col-cont' + boardid, ''));
    console.log(colId);

    fetch("/save-drop", {
          method: "POST",
          headers: { 'Accept': 'application/json',
              'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
}


  socket.on('all drop it', function (data) {
                document.querySelector('#' + data['targetEl']).appendChild(document.querySelector('#' + data['sourceIdEl']));
            });