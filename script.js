//going to have more champs later so prob queryselectorall
const champs = document.querySelector(".champ");
const hexes = document.querySelectorAll(".hex");
//Fill Listeners
if (champs) {
    champs.addEventListener('dragstart', dragStart);
    champs.addEventListener('dragend', dragEnd);
}
//hex listeneres
if (hexes) {
    for (const hex of hexes) {
        hex.addEventListener('dragover', dragOver);
        hex.addEventListener('dragenter', dragEnter);
        hex.addEventListener('dragleave', dragLeave);
        hex.addEventListener('drop', dragDrop);
    }
}
//drag functions
function dragStart() {
    this.className += ' hold';
    setTimeout(() => (this.className = 'invisible'), 0);
}
function dragEnd() {
    this.className = 'champ';
}
function dragOver(e) {
    e.preventDefault();
}
function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered';
}
function dragLeave() {
    this.className = 'hex';
}
function dragDrop() {
    this.className = 'hex';
    this.append(champs);
}
//item functions
$('input[type="checkbox"]').on('click', function(e) {
    var checkbox = $(this);
    if (checkbox.is(":checked")) {
        e.preventDefault();
        return false;
    }
})

$('input[type="checkbox"]').on('change', function() {
   $(this).siblings('input[type="checkbox"]').prop('checked', false);
});

function ItemSelect(divId) {
    var top = -150;
    var left = -75;
    //select all the elements of the respective item menu
    var targets = $('#' + divId + '.menu > .btn');
    for (var i = 0; i < targets.length - 1; ++i) {
        if (document.getElementById(divId).checked == false) {
            targets[i].style.top = "0px";
            targets[i].style.left = "0px";
            targets[i].style.opacity = 0;
            targets[i].style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
            continue;
        }
        switch((i + 1) % 4) {
            case 0: 
                if (i > 4) { 
                    top -= 95;
                }
                else {
                    top += 95;
                }
                left /= 2;
                break;
            case 1: 
                left *= -1;
                break;
            case 2: 
                if (i > 4) { 
                    top -= 95;
                }
                else {
                    top += 95;
                }
                left *= 2;
                break;
            case 3: 
                top *= -1;
        }
        targets[i].style.top = top + "px";
        if (i < 4) { 
            targets[i].style.left = left + "px";
        }
        else { 
            targets[i].style.left = (left - 187) + "px";
        }
        console.log(top + " " + left);
        targets[i].style.opacity = 100;
        targets[i].style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    }
    //make sure the items that arent selected are not there;
    var deselect = $('.menu').not('#' + divId).find('.btn').not('#main');
    for (var i = 0; i < deselect.length; ++i) {
        deselect[i].style.top = "0px";
        deselect[i].style.left = "0px";
        deselect[i].style.opacity = 0;
        deselect[i].style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    }
    
    //only one top item
    var topItem = $('#' + divId + '.menu > #main');
    topItem[0].style.opacity = 100;
    var botItems = $('.menu > #main').not('#' + divId + '.menu > #main');
    for (var i = 0; i < botItems.length; ++i) {
        botItems[i].style.opacity = 0;
    }
}
