document.addEventListener("DOMContentLoaded", function () {
    var tocItems = document.querySelectorAll('.book-summary ul.summary li a');

    tocItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.preventDefault(); // 기본 이동 방지 (페이지 새로고침 방지)

            var parentLi = this.parentElement; // 클릭한 링크의 부모 <li> 찾기
            var subMenu = parentLi.querySelector("ul"); // 하위 <ul> 찾기

            if (subMenu) { // 하위 <ul>이 있는 경우에만 동작
                if (subMenu.style.display === "block") {
                    subMenu.style.display = "none"; // 현재 열려 있으면 닫기
                    parentLi.classList.remove("active");
                } else {
                    subMenu.style.display = "block"; // 닫혀 있으면 열기
                    parentLi.classList.add("active");
                }
            }
        });
    });
});
