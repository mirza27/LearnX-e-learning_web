export function SidebarListener() {
  // style js for sidebar
  const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

  allSideMenu.forEach((item) => {
    const li = item.parentElement;

    item.addEventListener("click", function () {
      if (li) {
        allSideMenu.forEach((i) => {
          const parent = i.parentElement;
          if (parent) {
            // Periksa apakah parent null atau tidak
            parent.classList.remove("active");
          }
        });
        li.classList.add("active");
      }
    });

    // TOGGLE SIDEBAR
    const menuBar = document.querySelector("#content nav .bx.bx-menu");
    const sidebar = document.getElementById("sidebar");
    if (sidebar && menuBar) {
      menuBar.addEventListener("click", function () {
        sidebar.classList.toggle("hide");
      });
    }

    const searchButton = document.querySelector(
      "#content nav form .form-input button"
    );
    const searchButtonIcon = document.querySelector(
      "#content nav form .form-input button .bx"
    );
    const searchForm = document.querySelector("#content nav form");

    if (searchForm && searchButton && searchButtonIcon) {
      searchButton.addEventListener("click", function (e) {
        if (window.innerWidth < 576) {
          e.preventDefault();
          searchForm.classList.toggle("show");
          if (searchForm.classList.contains("show")) {
            searchButtonIcon.classList.replace("bx-search", "bx-x");
          } else {
            searchButtonIcon.classList.replace("bx-x", "bx-search");
          }
        }
      });
    }

    if (window.innerWidth < 768 && sidebar) {
      sidebar.classList.add("hide");
    } else if (window.innerWidth > 576 && searchButtonIcon && searchForm) {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
      searchForm.classList.remove("show");
    }

    window.addEventListener("resize", function () {
      if (this.innerWidth > 576 && searchButtonIcon && searchForm) {
        searchButtonIcon.classList.replace("bx-x", "bx-search");
        searchForm.classList.remove("show");
      }
    });

    const switchMode = document.querySelector("#switch-mode");

    if (switchMode) {
      switchMode.addEventListener("change", function () {
        if (this.checked) {
          document.body.classList.add("dark");
        } else {
          document.body.classList.remove("dark");
        }
      });
    }
  });
}
