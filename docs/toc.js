document.addEventListener("DOMContentLoaded", function () {
    var tocItems = document.querySelectorAll('.book-summary ul.summary li a');

    tocItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
            var parentLi = this.parentElement; // 클릭한 링크의 부모 <li> 찾기
            var subMenu = parentLi.querySelector("ul"); // 하위 <ul> 찾기

            // 하위 항목을 보이거나 숨기기
            if (subMenu) { 
                if (subMenu.style.display === "block") {
                    subMenu.style.display = "none"; // 현재 열려 있으면 닫기
                    parentLi.classList.remove("active");
                } else {
                    subMenu.style.display = "block"; // 닫혀 있으면 열기
                    parentLi.classList.add("active");
                }
            }

            // 링크 이동을 하도록 설정
            setTimeout(function () {
                window.location.href = item.getAttribute("href"); // 링크로 이동
            }, 200); // 하위 항목 표시 후 200ms 대기
        });
    });
});
