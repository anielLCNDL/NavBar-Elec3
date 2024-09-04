(() =>{
// Selecting relevant DOM elements
    const openNavMenu = document.querySelector(".open-nav-menu"),
    closeNavMenu = document.querySelector(".close-nav-menu"),
    navMenu = document.querySelector(".nav-menu"),
    menuOverlay = document.querySelector(".menu-overlay"),
    mediaSize= 991;
// Function to toggle navigation menu visibility
    openNavMenu.addEventListener("click", toggleNav);
    closeNavMenu.addEventListener("click", toggleNav);
    menuOverlay.addEventListener("click", toggleNav);

    function toggleNav(){
        navMenu.classList.toggle("open");
        menuOverlay.classList.toggle("active");
        document.body.classList.toggle("hidden-scrolling");
    }
// Function to collapse sub-menus
    navMenu.addEventListener("click", (event) =>{
        if(event.target.hasAttribute("data-toggle") &&
          window.innerWidth <= mediaSize){
            //Prevent default anchor click behavior
            event.preventDefault();
            const menuItemHasChild = event.target.parentElement;
            //If menuItemHasChild is already expanded,collapse it
            if(menuItemHasChild.classList.contains("active")){
                collapseSubMenu();
            }
            else{
            //Colapse existing expanded menuItemHasChild
              if(navMenu.querySelector(".menu-item-has-child.active")){
                collapseSubMenu();
              }
            //Expand new menuItemHasChild
              menuItemHasChild.classList.add("active");
              const subMenu = menuItemHasChild.querySelector(".sub-menu");
              subMenu.style.maxHeight = subMenu.scrollHeight + "px";
             }
           }
    });
    // Function to collapse the sub-menu
    function collapseSubMenu(){
        navMenu.querySelector(".menu-item-has-child.active .sub-menu")
        .removeAttribute("style");
        navMenu.querySelector(".menu-item-has-child.active")
        .classList.remove("active");
    }
    // Function to resize the screen and reset styles if needed
    function resizeFix(){
        //If navMenu is open close it
        if(navMenu.classList.contains("open")){
            toggleNav();
        }
        //If menuItemHasChild is expanded, collapse it
        if(navMenu.querySelector(".menu-item-has-child.active")){
            collapseSubMenu();
          }

    }
// Event listener for window resize to apply responsive design changes
    window.addEventListener("resize", function(){
        if(this.innerWidth > mediaSize){
            resizeFix();
        }
    });


    

})();