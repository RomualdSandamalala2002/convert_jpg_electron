
window.addEventListener("DOMContentLoaded",()=>{

  document.getElementById('select-folder').addEventListener('click', async () => {
    const fileListElement = document.getElementById('file-list');
    fileListElement.innerHTML = ''; // Clear previous list
    const files = await window.electronAPI.selectFolder();
    for(let i=0; i<files.length; i++){
      const listItem = document.createElement('li');
      listItem.textContent = files[i];
      fileListElement.appendChild(listItem);
        window.electronAPI.reduceImage(files[i],files[i]).then(()=>{
          console.log("converted "+ files[i]);
        }).catch((err)=>{
          console.log("error "+ err)
        })
    }
  });
  
})
