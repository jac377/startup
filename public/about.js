function hideMenuItems(){
    const linksButton = document.querySelectorAll("#menuLink");
    document.querySelector("#logOutBtn").style.display = 'none';
    linksButton.forEach((item) => {
        item.style.display = 'none';
    });
}
 
function showMenuItems() {
    const linksButton = document.querySelectorAll("#menuLink");
    document.querySelector("#logOutBtn").style.display = 'show';
    linksButton.forEach((item) => {
        item.style.display = 'show';
    });
}

const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

if (isLoggedIn) {
    showMenuItems();
}
else {
    hideMenuItems();
}