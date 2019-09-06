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
//this makes it easier to look for duplicates
class Itm {
    constructor(path) {
        this.path = path;
        this.found = false;
    }
    reset() {
        this.found = false;
    }
    isFound() {
        return this.found;
    }
    getPath() {
        return this.path;
    }
    foundIt() {
        this.found = true;
    }
}
//works like a memo
var allItems = [
    /*bf*/
    [new Itm("items/BF/ie.png"), new Itm("items/BF/gunblade.png"), new Itm("items/BF/divine.png"), new Itm("items/BF/zekes.png"), 
     new Itm("items/BF/ga.png"), new Itm("items/BF/bt.png"), new Itm("items/BF/shojin.png"), new Itm("items/BF/ass.png")],
    /*rod*/
    [new Itm("items/ROD/gunblade.png"), new Itm("items/ROD/rabadon.png"), new Itm("items/ROD/rageblade.png"), new Itm("items/ROD/morello.png"), 
    new Itm("items/ROD/locket.png"), new Itm("items/ROD/ionic.png"), new Itm("items/ROD/ludens.png"), new Itm("items/ROD/sorcerer.png")], 
    /*bow*/
    [new Itm("items/BOW/gunblade.png"), new Itm("items/BOW/rageblade.png"), new Itm("items/BOW/rapid.png"), new Itm("items/BOW/titanic.png"), 
    new Itm("items/BOW/pd.png"), new Itm("items/BOW/cursed.png"), new Itm("items/BOW/shiv.png"), new Itm("items/BOW/blademaster.png")], 
    /*belt*/
    [new Itm("items/BELT/gunblade.png"), new Itm("items/BELT/morello.png"), new Itm("items/BELT/titanic.png"), new Itm("items/BELT/warmog.png"), 
    new Itm("items/BELT/red.png"), new Itm("items/BELT/zephyr.png"), new Itm("items/BELT/redemption.png"), new Itm("items/BELT/glacial.png")], 
    /*vest*/
    [new Itm("items/VEST/ga.png"), new Itm("items/VEST/locket.png"), new Itm("items/VEST/pd.png"), new Itm("items/VEST/red.png"), 
    new Itm("items/VEST/thorn.png"), new Itm("items/VEST/swordbreaker.png"), new Itm("items/VEST/fheart.png"), new Itm("items/VEST/knight.png")], 
    /*cloak*/
    [new Itm("items/CLOAK/gunblade.png"), new Itm("items/CLOAK/ionic.png"), new Itm("items/CLOAK/cursed.png"), new Itm("items/CLOAK/zephyr.png"), 
    new Itm("items/CLOAK/swordbreaker.png"), new Itm("items/CLOAK/dragon.png"), new Itm("items/CLOAK/hush.png"), new Itm("items/CLOAK/runaans.png")], 
    /*tear*/
    [new Itm("items/TEAR/gunblade.png"), new Itm("items/TEAR/ludens.png"), new Itm("items/TEAR/shiv.png"), new Itm("items/TEAR/redemption.png"), 
    new Itm("items/TEAR/fheart.png"), new Itm("items/TEAR/hush.png"), new Itm("items/TEAR/seraphs.png"), new Itm("items/TEAR/demon.png")], 
    /*spat*/
    /*change hog to fon lol*/
    [new Itm("items/SPAT/gunblade.png"), new Itm("items/SPAT/sorcerer.png"), new Itm("items/SPAT/blademaster.png"), new Itm("items/SPAT/glacial.png"), 
    new Itm("items/SPAT/knight.png"), new Itm("items/SPAT/runaans.png"), new Itm("items/SPAT/demon.png"), new Itm("items/SPAT/hog.png")]
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
function resetItems() {
    //there are 8 x 8 items in the matrix
    //how else can i reset all the items?
    for (var i = 0; i < 8; ++i) {
        for (var j = 0; j < 8; ++j) {
            allItems[i][j].reset();
        }
    }
}
function updateCombo() {
    //x is the last element that was put into the bench
    var x = assignNumber(bench[bench.length -1]);
    //compares the last element to all other existing items
    for (var i = 0; i < bench.length - 1; ++i) {
        var y = assignNumber(bench[i]);
        if (allItems[x][y].isFound()) { 
            continue;
        }
        //adds the item to the bench
        $("#combos").append('<span class="item" id="comboItem"></span>');
        //looks in the 2d array of all items to retrieve the combination
        //and then pushes it to the result box
        $(".item:last").prepend($('<img>', {src:allItems[x][y].getPath()}));
        //saves the item in the memo
        //need to switch x and y bc the item can exist in two spots
        allItems[x][y].foundIt();
        allItems[y][x].foundIt();
    }
}
function resetBench() {
    resetItems();
    bench = [];
    //the paddings don't get removed when the spans are cleared
    $(".item").css({
        "padding":"0px"
    });
    $("[id=comboItem]").css({
        "padding":"0px"
    });
    //clears all the span elements under the respective parent classes
    $("#bench span").empty();
    $("#combos span").empty();
}