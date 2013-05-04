function search(event) {
    event.preventDefault();
    var results;

    if($(".search-query").val() == "design") {
	results = '<b>design</b>';
    }
    else {
	results = '<h3>No results found..</h3>' +
	    '<h3>Maybe try searching for something else?</h3>' +
	    '<h3>Like <a href="#" class="hint">design</h3>';
    }
    $("#main").html(results);
}

function hint(event) {
    event.preventDefault();
    $(".search-query").val("design");
    search(event);
}

$(document).ready(function() {
    $(".form-search").on("submit", search);
    $(document).on("click", ".hint", hint);
});
