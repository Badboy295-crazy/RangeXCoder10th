//Prevent right click
document.oncontextmenu = () =>  {
    alert("Don't try to right click")
    return false
}


//Still anyonecan inspect element by F12 key. View Page source by 
// Ctrl + U key. Copy by Ctrl + C key.  Paste by Ctrl + V key. Let's prevent this

document.onkeydown = e => {
    //Prevent F12 key
    if(e.key == "F12") {
        alert("Don't try to inspect element")
            return false
    } 

    //Prevent showing page source by Ctrl + u
    if(e.ctrlKey && e.key == "u"){
         alert("Don't try to view page source")
            return false
    } 
    
    //Prevent copying anything from the page 
    if(e.ctrlKey && e.key == "c"){
         alert("Don't try to copy page element")
            return false
    } 

    //Prevent paste anything from other sources
    if(e.ctrlKey && e.key == "v"){
        alert("Don't try to paste anything to page")
            return false
    }

    //Prevent from save
     if(e.ctrlKey && e.key == "s"){
         alert("Don't try to save page element")
            return false
    } 


}


  
function goToVideo(title, url) {
    window.location.href = `video.html?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  
}
