let lang_eng = false;

let en_elements = document.getElementsByClassName("en");
let ru_elements = document.getElementsByClassName("ru");

function HideEnglish() {
    for (let i = 0; i < en_elements.length; ++i) {
        en_elements[i].style.display = "none";
    }
}

function HideRussian() {
    for (let i = 0; i < ru_elements.length; ++i) {
        ru_elements[i].style.display = "none";
    }
}

function ShowEnglish() {
    for (let i = 0; i < en_elements.length; ++i) {
        en_elements[i].style.display = "block";
    }
}

function ShowRussian() {
    for (let i = 0; i < ru_elements.length; ++i) {
        ru_elements[i].style.display = "block";
    }
}

HideEnglish();
ShowRussian();

function SwitchLanguage() {
    lang_eng = !lang_eng;
    console.log(lang_eng);
    if (lang_eng) {
        HideRussian();
        ShowEnglish();
    } else {
        HideEnglish();
        ShowRussian();
    }
}