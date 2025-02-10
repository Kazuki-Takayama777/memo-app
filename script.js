document.getElementById("save-btn").addEventListener("click", function () {
    const title = document.getElementById("memo-title").value.trim();
    const content = document.getElementById("memo-content").value.trim();

    if (!title || !content) {
        alert("タイトルとメモ内容を入力してください");
        return;
    }

    const memo = { title, content };
    const memos = JSON.parse(localStorage.getItem("memos")) || [];
    memos.push(memo);
    localStorage.setItem("memos", JSON.stringify(memos));

    document.getElementById("memo-title").value = "";
    document.getElementById("memo-content").value = "";

    displayMemos();
});

function displayMemos() {
    const memos = JSON.parse(localStorage.getItem("memos")) || [];
    const memoList = document.getElementById("memo-list");
    memoList.innerHTML = "";

    memos.forEach((memo, index) => {
        const memoElement = document.createElement("li");
        memoElement.innerHTML = `
            <h3>${memo.title}</h3>
            <p>${memo.content}</p>
            <button class="delete-btn" data-index="${index}">削除</button>
        `;
        memoList.appendChild(memoElement);
    });

    // 削除ボタンのイベントリスナーを設定
    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            deleteMemo(index);
        });
    });
}

function deleteMemo(index) {
    const memos = JSON.parse(localStorage.getItem("memos")) || [];
    memos.splice(index, 1);
    localStorage.setItem("memos", JSON.stringify(memos));
    displayMemos();
}

// ページ読み込み時にメモを表示
window.onload = displayMemos;
