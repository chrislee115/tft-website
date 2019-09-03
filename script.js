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
$(document).ready(function () {
$('input[type="checkbox"]').on('click', function(e) {
    $("#connectLines").css( {
        "display":"block"
    });
    var checkbox = $(this);
    if (checkbox.is(":checked")) {
        e.preventDefault();
        return false;
    }
});

$('input[type="checkbox"]').on('change', function() {
   $(this).siblings('input[type="checkbox"]').prop('checked', false);
});

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
//builder buttons
//is this extraneous?
$("#bfBtn").click(function () {
    $("#bench").append('<span class="item" id="bf"><img src="items/bf.png"></span>');
});
$("#rodBtn").click(function () {
    $("#bench").append('<span class="item" id="rod"><img src="items/rod.png"></span>');
});
$("#bowBtn").click(function () {
    $("#bench").append('<span class="item" id="bow"><img src="items/bow.png"></span>');
});
$("#beltBtn").click(function () {
    $("#bench").append('<span class="item" id="belt"><img src="items/belt.png"></span>');
});
$("#vestBtn").click(function () {
    $("#bench").append('<span class="item" id="bf"><img src="items/vest.png"></span>');
});
$("#cloakBtn").click(function () {
    $("#bench").append('<span class="item" id="cloak"><img src="items/cloak.png"></span>');
});
$("#tearBtn").click(function () {
    $("#bench").append('<span class="item" id="tear"><img src="items/tear.png"></span>');
});
$("#spatBtn").click(function () {
    $("#bench").append('<span class="item" id="spat"><img src="items/spat.png"></span>');
});
/*can be used in the wheel as well, tho is it worth it?*/
var allItems = [
    /*bf*/
    ["items/BF/ie.png", "items/BF/gunblade.png", "items/BF/divine.png", "items/BF/zekes.png", "items/BF/ga.png", "items/BF/bt.png", "items/BF/shojin.png", "items/BF/ass.png"],
    /*rod*/
    ["items/ROD/gunblade.png", "items/ROD/rabadon.png", "items/ROD/rageblade.png", "items/ROD/morello.png", "items/ROD/locket.png", "items/ROD/ionic.png", "items/ROD/ludens.png", "items/ROD/sorcerer.png"], 
    /*bow*/
    ["items/BOW/gunblade.png", "items/BOW/rageblade.png", "items/BOW/rapid.png", "items/BOW/titanic.png", "items/BOW/pd.png", "items/BOW/cursed.png", "items/BOW/shiv.png", "items/BOW/blademaster.png"], 
    /*belt*/
    ["items/BELT/gunblade.png", "items/BELT/morello.png", "items/BELT/titanic.png", "items/BELT/warmog.png", "items/BELT/red.png", "items/BELT/zephyr.png", "items/BELT/redemption.png", "items/BELT/glacial.png"], 
    /*vest*/
    ["items/VEST/ga.png", "items/VEST/locket.png", "items/VEST/pd.png", "items/VEST/red.png", "items/VEST/thorn.png", "items/VEST/swordbreaker.png", "items/VEST/fheart.png", "items/VEST/knight.png"], 
    /*cloak*/
    ["items/CLOAK/gunblade.png", "items/CLOAK/ionic.png", "items/CLOAK/cursed.png", "items/CLOAK/zephyr.png", "items/CLOAK/swordbreaker.png", "items/CLOAK/dragon.png", "items/CLOAK/hush.png", "items/CLOAK/runaans.png"], 
    /*tear*/
    ["items/TEAR/gunblade.png", "items/TEAR/ludens.png", "items/TEAR/shiv.png", "items/TEAR/redemption.png", "items/TEAR/fheart.png", "items/TEAR/hush.png", "items/TEAR/seraphs.png", "items/TEAR/demon.png"], 
    /*spat*/
    /*change hog to fon lol*/
    ["items/SPAT/gunblade.png", "items/SPAT/sorcerer.png", "items/SPAT/blademaster.png", "items/SPAT/glacial.png", "items/SPAT/knight.png", "items/SPAT/runaans.png", "items/SPAT/demon.png", "items/SPAT/hog.png"]
];
var bench = [];
function addItem(item) {
    bench.push(item);
    updateCombo();
}
//updates all the combinations you can create 
//0 is bf, 1 is rod, 2 is bow, 3 is belt, 4 is vest, 5 is cloak, 6 is tear, 7 is spat
function assignNumber(x) {
    switch (x) {
        case "bf": 
            return 0;
            break;
        case "rod": 
            return 1;
            break;
        case "bow": 
            return 2;
            break;
        case "belt": 
            return 3;
            break;
        case "vest": 
            return 4;
            break;
        case "cloak": 
            return 5;
            break;
        case "tear": 
            return 6;
            break;
        case "spat": 
            return 7;
    }
}
function updateCombo() {
    /*find the duplicates*/
//all are false until one of the items is found, if there is a duplicate, 
//it will update the items differently
    //need two dupe checks to avoid cases where it repeats
    var dupeCheckX = [false, false, false, false, false, false, false, false];
    //clear the results box to update
    $("[id=comboItem]").css({
        "padding":"0px"
    });
    $("#combos span").empty();
    for (var i = 0; i < bench.length - 1; ++i) {
        var x = assignNumber(bench[i]);
        if (!dupeCheckX[x]) {
        var dupeCheckY = dupeCheckX; 
            for (var j = i + 1; j < bench.length; ++j) {
                var y = assignNumber(bench[j]);
                if (dupeCheckY[y]) { 
                    continue;
                }
                //adds the item to the bench
                $("#combos").append('<span class="item" id="comboItem"></span>');
                //looks in the 2d array of all items to retrieve the combination
                //and then pushes it to the result box
                $(".item:last").prepend($('<img>', {src:allItems[x][y]}));
                dupeCheckY[y] = true;
            }
        }
        dupeCheckX[x] = true;
    }
}
function resetBench() {
    bench = [];
    $(".item").css({
        "padding":"0px"
    })
    $("#bench span").empty();
    $("#combos span").empty();
}