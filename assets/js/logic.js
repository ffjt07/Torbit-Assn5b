var type2 = $('#type2');
var evol1 = $('#evol1');
var evol2 = $('#evol2');
var evol3 = $("#evol3");
var legend2 = $("#legend2");
var errorNode = $(".error-win")
var regSubmit = $("#reg-button");
var regForm = $("#registration-form");
var poll = $('input[name="poll"]');
var session1 = $('input[name="session-1"]');
var session2 = $('input[name="session-2"]');
var session3 = $('input[name="session-3"]');
var evolErrorMsg = "Cannot select any Pokémon Evolution sessions if Electric, Ground, Rock, Steel, Ice, Fighting Pokémon session is selected.";
var legErrorMsg = "Cannot select Two Series Legendary Pokémon session unless Double Evolution session is also selected.";
var errWinOpen = 'open';
var errMsg = 'err';
var confKey = ""
var formData = "";

if (document.title === "Registration Form") {
    localStorage.setItem(errWinOpen, 'false');
}

if (document.title === "Session Error") {
    var h3el = $('<h3>');
    if (localStorage.getItem(errMsg) === 'B') {
        h3el.text(evolErrorMsg);
        errorNode.prepend(h3el);
    }
    else {
        h3el.text(legErrorMsg);
        errorNode.prepend(h3el);
    }
}
    
function workshopCheck() {
    if (type2.is(":checked")) {
        if (sessionTwoCheck() === true) {
            clearRadio(session2);
            if (localStorage.getItem(errWinOpen) === 'false') {
                errWindow("B");
            }
        }
        else if (legend2.is(":checked")) {
            if (localStorage.getItem(errWinOpen) === 'false') {
                legend2.prop("checked", false);
                errWindow("H");
            }
        }
    }
    if (legend2.is(":checked") && !evol3.is(":checked")) {
        if (localStorage.getItem(errWinOpen) === 'false') {
            legend2.prop("checked", false);
            errWindow("H");
        }
    }
}


function errWindow(workshop) {
    const winHeight = 400;
    const winWidth = 500;
    let topOffset = screenY;
    let leftOffset = screenX;
    let top = topOffset + (outerHeight - winHeight) / 2;
    let left = leftOffset + (outerWidth - winWidth) / 2;
    let regerrorUrl = "regerror.html";
    let legenderrorUrl = "legenderror.html";
    let windowParams = `resizable=no,loacation=yes,width=${winWidth}, height=${winHeight}, left=${left}, top=${top}`;
    var errorWindow = window;
    
    localStorage.setItem(errWinOpen, 'true');
    if (workshop === "B") {
        localStorage.setItem(errMsg, 'B');
    }
    else {
        localStorage.setItem(errMsg, 'H');
    }
    errorWindow.open(regerrorUrl, "Error Window", windowParams);
}

function sessionTwoCheck() {
    isChecked = false;
    session2.each(function () {
        if ($(this).is(":checked")) {
            isChecked = true;
            return false;
        }
    });
    return isChecked;
}

function clearRadio(radioObject) {
    $(radioObject).prop("checked", false);
}

function evolCheck() {
    if (type2.is(":checked")) {
        evol1.removeAttr("required");
    }
}

function thankYouAlert() {
    poll.each(function () {
        if ($(this).is(":checked")) {
            alert("Thank you for voting for: " + $(this).val());
        }
    });
}

function closeWin() {
        let currWin = open(location, '_self');
        localStorage.setItem(errWinOpen, 'false');
        currWin.close();
}

function storeCookie(event) {
    var name;
    var value;
    event.preventDefault();
    regForm.find('input[type=text]').each(function () {
        name = $(this).attr('id');
        value = $(this).val();
        if (name === "conf-id") {
            confKey = value;
        }
        else if (value !== "") {
            if (name === "first-name") {
                formData += `${name}: ${value}`;
            }
            else {
                formData += `|${name}: ${value}`;
            }
        }
    });
    regForm.find('select').each(function () {
        name = $(this).attr('id');
        value = $(this).val();
        formData += `|${name}:${value}`;
    });
    session1.each(function () {
        if ($(this).is(":checked")) {
            name = $(this).attr('name');
            value = $(this).val();
            formData += `|${name}: ${value}`;
        }
    });
    if (evol1.attr('required')) {
        session2.each(function () {
            if ($(this).is(":checked")) {
                name = $(this).attr('name');
                value = $(this).val();
                formData += `|${name}: ${value}`;
            }
        });
    }
    else {
        formData += "|session-2: none";
    }
    
    session3.each(function () {
        if ($(this).is(":checked")) {
            name = $(this).attr('name');
            value = $(this).val();
            formData += `|${name}: ${value}`;
        }
    });
    Cookies.set(confKey, formData, { expires: 1 });
    console.log(Cookies.get());
    console.log(confKey);
    console.log(formData);
}

regForm.on('submit', function (event) {
    storeCookie(event);
});

type2.on('click', function () {
    workshopCheck();
});
legend2.on('click', function () {
    workshopCheck();
});
evol1.on('click', function () {
    workshopCheck();
});
evol2.on('click', function () {
    workshopCheck();
});
evol3.on('click', function () {
    workshopCheck();
});
regSubmit.on('click', function () {
    evolCheck();
});

if (document.title === "Thank You") {
    localStorage.removeItem(errWinOpen);
    localStorage.removeItem(errMsg);
}