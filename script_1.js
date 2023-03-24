let graduation_timestamp = 1686607200;
let grad_date = graduation_timestamp * 1000;
let langFredag = 1680818400 * 1000;
let curDate = Date.now();
let endDate;
if (curDate < langFredag){
    endDate = new Date(langFredag); 
}
else {
    endDate = new Date(grad_date);
}
let startDate = new Date(Date.now());
let numberOfDays = dayNumber(startDate, endDate);
let cost = document.getElementById('dayCost').value;

let removeDays = 0;
if (curDate < 1677279600 * 1000){ // sportlov
    removeDays += 3;
}
if (curDate < langFredag){ //påsklov
    removeDays += 4;
}
if (curDate < 1682892000 * 1000 && curDate > langFredag){ //1:a maj
    removeDays += 1;
}
if (curDate < 1684360800 * 1000 && curDate > langFredag){ //kristi him
    removeDays += 1;
}


if (curDate < langFredag){
    document.getElementById('daysUntilGraduation').textContent = "Antal dagar kvar till p\xE5sklov:";
}
else if (curDate > langFredag){
    document.getElementById('daysUntilGraduation').textContent = "Antal dagar kvar till studenten:";
}

let days = ((endDate - curDate) / 86400000).toFixed(0) - (numberOfDays[0] + numberOfDays[6]) - removeDays;

document.getElementById('text').textContent = days;

setInterval(ChangeField(), 500)
setInterval(ChangeFieldTuesday(), 500)
setInterval(ChangeFieldFriday(), 500)

function dayNumber(startDate, endDate){
    let startDateDay = startDate.getDay();
    let endDateDay = endDate.getDay();
    let totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

    let daysCount = [0, 0, 0, 0, 0, 0, 0];

    let totalWeeks = Math.ceil(totalDays / 7);
    for (let i = 0; i <= 6; i++) {
        daysCount[i] += totalWeeks;
    }

    let i = endDateDay + 1;
    if (i > 6) {
        i -= 7;
    }
    while (i != startDateDay) {
        daysCount[i] -= 1;
        i += 1;
        if (i > 6) {
            i -= 7;
        }
    }

    return daysCount;
}

function ChangeField() {
    balance = document.getElementById('balance').value;
    cost = document.getElementById('dayCost').value;
    if (cost <= 0){
        cost = 1
    }
    let daysLeft = (balance / cost).toFixed(0);
    
    document.getElementById('text').textContent = days
    document.getElementById('text1').textContent = daysLeft
    document.getElementById('cost').textContent = cost
}

function ChangeFieldTuesday() {
    if (document.getElementById('tuesdayCheck').checked == true){
        days -= numberOfDays[2];
    }
    else if (document.getElementById('tuesdayCheck').checked == false){
        if (document.getElementById('fridayCheck').checked == true){
            days = ((langFredag - curDate) / 86400000).toFixed(0) - (numberOfDays[0] + numberOfDays[6]) - numberOfDays[5];
        }
        else {
            days = ((langFredag - curDate) / 86400000).toFixed(0) - (numberOfDays[0] + numberOfDays[6]);
        }
    }

    let balance = document.getElementById('balance').value;
    let daysLeft = (balance / cost).toFixed(0);

    document.getElementById('text').textContent = days
    document.getElementById('text1').textContent = daysLeft
}

function ChangeFieldFriday() {
    if (document.getElementById('fridayCheck').checked == true){
        days -= numberOfDays[5];
    }
    else if (document.getElementById('fridayCheck').checked == false){
        if (document.getElementById('tuesdayCheck').checked == true){
            days = ((langFredag - curDate) / 86400000).toFixed(0) - (numberOfDays[0] + numberOfDays[6]) - numberOfDays[2];
        }
        else {
            days = ((langFredag - curDate) / 86400000).toFixed(0) - (numberOfDays[0] + numberOfDays[6]);
        }
    }
    
    let balance = document.getElementById('balance').value;
    let daysLeft = (balance / cost).toFixed(0);

    document.getElementById('text').textContent = days
    document.getElementById('text1').textContent = daysLeft
}

function daysUntilText() {
    if (Date.now < langFredag){
        document.getElementById('daysUntilGraduation').textContent = "Antal dagar kvar till p\xE5sklov";
    }
    else if (Date.now > langFredag){
        document.getElementById('daysUntilGraduation').textContent = "Antal dagar kvar till studenten";
    }
}

document.querySelectorAll('button').forEach(occurence => {
    let id = occurence.getAttribute('id');
    if (id == "button1") {
        occurence.addEventListener('click', ChangeField)
    }
});
