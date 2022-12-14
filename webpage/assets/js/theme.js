let colorsBlue = {
    blue: '#305cfa',
    black: 'black',
    gray: '#1c1c1c',
    white: 'white'
};

let colorsGreen = {
    blue: '#4caf50',
    black: 'black',
    gray: '#1c1c1c',
    white: 'white'
};

let colors = colorsBlue;

function Switch() {
    if (colors === colorsBlue) {
        SetGreen();
    } else {
        SetBlue();
    }
}

function SetBlue() {
    colors = colorsBlue;
    document.body.style.setProperty('--blue', colors.blue);
    document.body.style.setProperty('--black', colors.black);
    document.body.style.setProperty('--gray', colors.gray);
    document.body.style.setProperty('--white', colors.white);
    document.getElementById('switch').src = "./assets/images/icon.gif";
    document.getElementById('title').style.gap = "0";
    document.getElementById('title').style.paddingLeft = "0";
}

function SetGreen() {
    colors = colorsGreen;
    document.body.style.setProperty('--blue', colors.blue);
    document.body.style.setProperty('--black', colors.black);
    document.body.style.setProperty('--gray', colors.gray);
    document.body.style.setProperty('--white', colors.white);
    document.getElementById('switch').src = "./assets/images/icon_green.gif";
    document.getElementById('title').style.gap = "30px";
    document.getElementById('title').style.paddingLeft = "30px";
}
