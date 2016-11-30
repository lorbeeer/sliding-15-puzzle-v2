var express = require('express');
var router = express.Router();
var model15 = [];

// returns a position of element above index or -1 if position is not available
router.get('/', function(req, res, next) {
  res.redirect('/15.html');
})


router.get('/start', function(req, res, next) {
  var arr = startNewModel();
  var x = {model: arr};
  res.json(x);
  console.log(x.model);
})

router.post('/move',function(req, res, next) {
  model15 = req.body.model;
  for (var i = 0; i < model15.length; i++)
    model15[i] = Number(model15[i]);
  tryMove(Number(req.body.move));
  var x = { model: model15 };
  res.json(x);
})


function startNewModel () {
    model15=[];
    while(model15.length<16){
        var randomNumber=Math.floor(Math.random()*16);
        var found = false;
        for (var i=0; i <=model15.length; i++){ // check if such value already exists
            if(model15[i] === randomNumber){
                found = true;
                break;
            }
        }
        if (!found) {  
            model15[model15.length]=randomNumber;
        }  
    }
            return model15;
        
};


function itemAbove(index) {
    if (index < 4 || index > 15) // the top row has no above position
        return -1;
    else
        return index - 4;
}


function itemBelow(index) {
    if (index < 0 || index > 11) // the bottom row has no below position
        return -1;
    else
        return index + 4;
}

function itemBefore(index) {
    if (index < 0 || index > 15 || index % 4 == 0) // the left column has no before position
        return -1;
    else
        return index - 1;
}

function itemAfter(index) {
    if (index < 0 || index > 15 || index % 4 == 3) // the right column has no after position
        return -1;
    else
        return index + 1;
}

// determines if a clicked item can be moved and moves accordingly
function tryMove(index) {

    var above = itemAbove(index);
    console.log(model15[above]);
    console.log("above"+above);

    if (above != -1 && model15[above] == 0) {
        move(index, above);
        return;
    };
    var below = itemBelow(index);
    console.log("below"+below);
    if (below != -1 && model15[below]== 0) 
    {
        move(index, below);
        return;
    };
    var before = itemBefore(index);
    console.log("before"+before);
    if (before != -1 && model15[before] == 0) {
        move(index, before);
        return;
    }
    var after = itemAfter(index);
    console.log("after"+after);
    if (after != -1 && model15[after] == 0) {
        move(index, after);
        return;
    }
};

 
function move(position1, position2) {
    var item1 = model15[position1];
    model15[position1] = model15[position2];
    model15[position2] = item1;
};  









module.exports = router;
