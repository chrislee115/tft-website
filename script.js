// SIMULATOR FUNCTIONS // 
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
    //makes the original spot invisible, but not sure if necessary?
    //TODO: 
    //if the orig spot is from the champ pool then dont invis
    //if just moving around in the map, then invis
    //setTimeout(() => (this.className = 'invisible'), 0);
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

function updateTraits() {
    var currentChamps = document.querySelectorAll('.hex .champ');
    for (const champ of currentChamps) {
        
    }
}
// WHEEL FUNCTIONS // 
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
// BUILDER FUNCTIONS //
//builder buttons
//adds item to bench when button is clicked
function addItem(item) {
    bench.push(item);
    $("#bench").append('<span class="item" id="bf"><img src="items/' + item + '.png"></span>');
    updateCombo();
}

/*can be used in the wheel as well, tho is it worth it?*/
//this makes it easier to look for duplicates
class Itm {
    constructor(path, name, desc) {
        this.path = path;
        this.found = false;
        //i suppose i could use a function here as well but idk
        this.name = name;
        this.desc = desc;
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
    getDesc(itm1, itm2) {
        return toSpan(this.name, this.desc, itm1, itm2);
    }
}
//the descriptions need to have the full html tags in order for the array to work
function toSpan (name, desc, itm1, itm2) {
    return "<span class=\"explanation\"><p id=\"expText\"><u>" + name +  "</u><br/>"
        + "<img src=items/" + itm1 + ".png height=\"30\" width=\"30\" />" + " + "
        + "<img src=items/" + itm2 + ".png height=\"30\" width=\"30\" /> <br/>" 
        + desc + "</p></span>";
}
//bf rod bow belt vest cloak tear spat 
//0  1   2   3    4    5     6    7
//works like a memo
//maybe find a way to make this a triangular matrix or something
var allItems = [
    /*bf*/
    [new Itm("items/BF/ie.png", "Infinity Edge", "Critical Strikes deal +200% damage"), 
     new Itm("items/BF/gunblade.png", "Hextech Gunblade", "Heal for 25% of all damage dealt"), 
     new Itm("items/BF/divine.png", "Sword of the Divine", "Every 1s gain a 7% chance to gain 100% Critical Strike"), 
     new Itm("items/BF/zekes.png", "Zeke's Herald", "On start of combat, allies 2 spaces to the left and right gain +15% Attack Speed"), 
     new Itm("items/BF/ga.png", "Guardian Angel", "Wearer revives with 500 Health after a 2 sec delay"), 
     new Itm("items/BF/bt.png", "Bloodthirster", "Attacks heal for 40% of damage"), 
     new Itm("items/BF/shojin.png", "Spear of Shojin", "After casting, gain 15% of max mana per attack"), 
     new Itm("items/BF/ass.png", "Youmuu's Ghostblade", "Wearer is also an Assassin")],
    /*rod*/
    [new Itm("items/ROD/gunblade.png", "Hextech Gunblade", "Heal for 25% of all damage dealt"), 
     new Itm("items/ROD/rabadon.png", "Rabadon's Deathcap", "Wearer's Ability Damage increased by 50%"), 
     new Itm("items/ROD/rageblade.png", "Guinsoo's Rageblade", "Attacks grant 5% Attack Speed. Stacks infinitely"), 
     new Itm("items/ROD/morello.png", "Morellonomicon", "Spells deal burn damage equal to 20% of enemy’s max hp over 10s & prevent healing"), 
     new Itm("items/ROD/locket.png", "Locket of the Iron Solari", "On start of combat, allies two spaces to the left and right gain a shield of 250 for 6 seconds"), 
     new Itm("items/ROD/ionic.png", "Ionic Spark", "Whenever an enemy casts a spell, they take 125 true damage"),
     new Itm("items/ROD/ludens.png", "Luden's Echo", "Deal 180 splash damage on ability hit"), 
     new Itm("items/ROD/sorcerer.png", "Yuumi", "Wearer is also a Sorcerer")], 
    /*bow*/
    [new Itm("items/BOW/divine.png", "Sword of the Divine", "Every 1s gain a 7% chance to gain 100% Critical Strike"), 
     new Itm("items/BOW/rageblade.png", "Guinsoo's Rageblade", "Attacks grant 5% Attack Speed. Stacks infinitely"), 
     new Itm("items/BOW/rapid.png", "Rapid Fire Cannon", "Attacks cannot be dodged. Attack Range is doubled"), 
     new Itm("items/BOW/titanic.png", "Titanic Hydra", "Attacks deal 10% of the wearer's max HP as splash"), 
     new Itm("items/BOW/pd.png", "Phantom Dancer", "Wearer dodges all Critial Strikes"), 
     new Itm("items/BOW/cursed.png", "Cursed Blade", "Attacks have a 20% chance to Shrink (Reduce enemy's star level by 1)"), 
     new Itm("items/BOW/shiv.png", "Stattik Shiv", "Every 3rd attack deals 100 splash magical damage to 2 additional targets"), 
     new Itm("items/BOW/blademaster.png", "Blade of the Ruined King", "Wearer is also a Blademaster")], 
    /*belt*/
    [new Itm("items/BELT/zekes.png", "Zeke's Herald", "On start of combat, allies 2 spaces to the left and right gain +15% Attack Speed"), 
     new Itm("items/BELT/morello.png", "Morellonomicon", "Spells deal burn damage equal to 20% of enemy’s max hp over 10s & prevent healing"), 
     new Itm("items/BELT/titanic.png", "Titanic Hydra", "Attacks deal 10% of the wearer's max HP as splash"), 
     new Itm("items/BELT/warmog.png", "Warmog's Armor", "Wearer regenerates 6% of missing health per second"), 
     new Itm("items/BELT/red.png", "Red Buff", "Attacks burn for 20% of max HP over 10s and disable healing"), 
     new Itm("items/BELT/zephyr.png", "Zephyr", "On start of combat, banish an enemy for 5 seconds"), 
     new Itm("items/BELT/redemption.png", "Redemption", "At 25% health heal all nearby allies for 1200 HP"), 
     new Itm("items/BELT/glacial.png", "Frozen Mallet", "Wearer is also a Glacial")], 
    /*vest*/
    [new Itm("items/VEST/ga.png", "Guardian Angel", "Wearer revives with 500 Health after a 2 sec delay"), 
     new Itm("items/VEST/locket.png", "Locket of the Iron Solari", "On start of combat, allies two spaces to the left and right gain a shield of 250 for 6 seconds"), 
     new Itm("items/VEST/pd.png", "Phantom Dancer", "Wearer dodges all Critical Strikes"),
     new Itm("items/VEST/red.png", "Red Buff", "Attacks burn for 20% of max HP over 10s and disable healing"), 
     new Itm("items/VEST/thorn.png", "Thornmail", "Reflect 100% of mitigated damage taken from attacks as magic damage"), 
     new Itm("items/VEST/swordbreaker.png", "Sword Breaker", "Attacks have a 25% chance to disarm"), 
     new Itm("items/VEST/fheart.png", "Frozen Heart", "Adjacent enemies lose 25% Attack Speed"),
     new Itm("items/VEST/knight.png", "Knight's Vow", "Wearer is also a Knight")], 
    /*cloak*/
    [new Itm("items/CLOAK/bt.png", "Bloodthrister", "Attacks heal for 40% of damage"), 
     new Itm("items/CLOAK/ionic.png", "Ionic Spark", "Whenever an enemy casts a spell, they take 125 true damage"), 
     new Itm("items/CLOAK/cursed.png", "Cursed Blade", "Attacks have a 20% chance to Shrink (Reduce enemy's star level by 1)"),
     new Itm("items/CLOAK/zephyr.png", "Zephyr", "On start of combat, banish an enemy for 5 seconds"), 
     new Itm("items/CLOAK/swordbreaker.png", "Sword Breaker", "Attacks have a 25% chance to disarm"), 
     new Itm("items/CLOAK/dragon.png", "Dragon's Claw", "83% resistance to magic damage"),
     new Itm("items/CLOAK/hush.png", "Hush", "33% chance on hit to prevent the enemy champion from gaining mana for 4 seconds"), 
     new Itm("items/CLOAK/runaans.png", "Runaan's Hurricane", "Attacks hit 1 additional enemy. This extra hit does 75% damage and applies on-hit effects")], 
    /*tear*/
    [new Itm("items/TEAR/shojin.png", "Spear of Shojin", "After casting, gain 15% of max mana per attack"), 
     new Itm("items/TEAR/ludens.png", "Luden's Echo", "Deal 180 splash damage on ability hit"),
     new Itm("items/TEAR/shiv.png", "Stattik Shiv", "Every 3rd attack deals 100 splash magical damage to 2 additional targets"), 
     new Itm("items/TEAR/redemption.png", "Redemption", "At 25% health heal all nearby allies for 1200 HP"), 
     new Itm("items/TEAR/fheart.png", "Frozen Heart", "Adjacent enemies lose 25% Attack Speed"), 
     new Itm("items/TEAR/hush.png", "Hush", "33% chance on hit to prevent the enemy champion from gaining mana for 4 seconds"),
     new Itm("items/TEAR/seraphs.png", "Seraph's Embrace", "Regain 20 mana each time a spell is cast"), 
     new Itm("items/TEAR/demon.png", "Darkin", "Wearer is also a Demon")], 
    /*spat*/
    /*change hog to fon lol*/
    [new Itm("items/SPAT/ass.png", "Youmuu's Ghostblade", "Wearer is also an Assassin"),
     new Itm("items/SPAT/sorcerer.png", "Yuumi", "Wearer is also a Sorcerer"),
     new Itm("items/SPAT/blademaster.png", "Blade of the Ruined King", "Wearer is also a Blademaster"), 
     new Itm("items/SPAT/glacial.png", "Frozen Mallet", "Wearer is also a Glacial"), 
     new Itm("items/SPAT/knight.png", "Knight's Vow", "Wearer is also a Knight"),
     new Itm("items/SPAT/runaans.png", "Runaan's Hurricane", "Attacks hit 1 additional enemy. This extra hit does 75% damage and applies on-hit effects"),
     new Itm("items/SPAT/demon.png", "Darkin", "Wearer is also a Demon"), 
     new Itm("items/SPAT/hog.png", "Force of Nature", "Gain + team size")]
];
var bench = [];
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
        
        //for explanation
        //I suppose this can go into one line but would it be worth?
        $("#explain").append(allItems[x][y].getDesc(bench[bench.length - 1], bench[i]));
        $(".explanation:last").prepend($('<img>', {src:allItems[x][y].getPath()}));
        
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
    $("#explain span").empty();
}