function Alert(msg) {
    let alert = document.getElementById('alert');
    let message = document.getElementById('msg');
    alert.style.display = "flex";
    message.innerHTML = msg;
}