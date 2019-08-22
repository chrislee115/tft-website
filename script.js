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
function ItemSelect(divId) {
    var top = -150;
    var left = -75;
    //skip the first element bc its the clicker
    var targets = document.getElementsByClassName("menu")[1].querySelectorAll('.btn');
    console.log(targets.length);
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
        targets[i].style.left = left + "px";
        targets[i].style.opacity = 100;
        targets[i].style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    }
}
