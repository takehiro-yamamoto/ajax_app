const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
 const form = document.getElementById("form");
 form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formDate = new FormData(form);
  const XHR = new XMLHttpRequest();
  XHR.open("POST", "/posts", true);
  XHR.responseType = "json";
  XHR.send(formDate);
  XHR.onload = () => {
    if (XHR.status != 200) {
      alert(`Error ${XHR.status}: ${XHR.statusText}`);
      return null;
    };
    const list = document.getElementById("list");
    const formText = document.getElementById("content"); 
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
    // 追加したHTMLを表示する
      formText.value = "";
  };
});
};

window.addEventListener('turbo:load', post);
