var model15;

$(document).ready(function() {
    init();
});

function init(){
    $.ajax({
        url: "/start"})
        .done(function(data){
            //console.log(data.model);
            model15=data.model;
            initTiles();
            updateView(model15);
        }); 
};



function tryMove2(index){
    var x = {move:index, model: model15};
    $.ajax({
        url: "/move",
        method: "POST",
        data: x,
        traditional: true,
        dataType: "json"})
        .done(function(data){
            model15=data.model;
            updateView(model15);
        });
};


// updates the DOM with values from a model
function updateView(model) {
    $("#Field15").children().each(
        function(index, element) {
            if (index < 16) { // model only have 16 items
                $(element).text(model[index]);
            }
        }
    );
}

// assigns the click handlers to the tiles
function initTiles() {
    $("#Field15").children().each(
        function(index, element) {
            if (index < 16) { // model only have 16 items
                $(element).on("click", function() {
                    tryMove2(index);
                });
            }
        }
    );
}
