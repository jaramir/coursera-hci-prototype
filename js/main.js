function search(event) {
    event.preventDefault();
    var results;

    if($(".search-query").val() == "design") {
	results = '<p>A <a href="#" class="link">commit</a> on Project Gemini by Alfred with comment "Adapted to new button design". A week ago.</p>' +
	    '<p>The wiki page <a href="#" class="link">"updated design guidelines for the button widget"</a> was updated by Jack. 12 days ago.</p>' +
	    '<p>Maggie wrote on IRC: "we are working on a major breaktrough in the design of the application" in channel <a href="#" class="link">#gemini</a>. 14 days ago.</p>' +
	    '<p>"Principles for Successful Button Design" has been <a href="#" class="link">borrowed</a> by Jack. A month ago.</p>';
    }
    else {
	results = '<h3>No results found..</h3>' +
	    '<p>Maybe try searching for something else?</p>' +
	    '<p>Like <a href="#" class="hint">design</p>';
    }
    $("#results").html(results);
}

function hint(event) {
    event.preventDefault();
    $(".search-query").val("design");
    search(event);
}

function link(event) {
    event.preventDefault();
    alert("This final implementation\nwill link to company resources\nthat are not available in this prototype");
}

function add_term(term) {
    if(!term) return;
    $("#watchlist").append('<div class="pill">' + term + '<i class="delete-watchlist icon-remove"></i></div>');
}

function add_watchlist(event) {
    event.preventDefault();
    var term = $(".search-query").val();
    add_term(term);
}

function undo_delete_watchlist(event) {
    event.preventDefault();
    var alert = $(this).parent();
    var term = alert.data("term");
    add_term(term);
    alert.alert('close');
}

function add_deletion_alert(term) {
    var alert = $('<div class="alert undo-message">"' + term + '" was removed from the Watchlist. <a class="btn btn-warning undo-delete-watchlist">Undo</a></div>');
    alert.data("term", term);
    $("#alerts").append(alert);
    alert.alert();
    window.setTimeout(function() {
	alert.alert('close');
    }, 5000);
}


function delete_watchlist(event) {
    event.preventDefault();
    var parent = $(this).parent();
    var term = parent.text();
    parent.remove();
    add_deletion_alert(term);
}

$(document).ready(function() {
    $(".form-search").on("submit", search);
    $(".add-watchlist").on("click", add_watchlist);
    $(document).on("click", ".hint", hint);
    $(document).on("click", ".link", link);
    $(document).on("click", ".delete-watchlist", delete_watchlist);
    $(document).on("click", ".undo-delete-watchlist", undo_delete_watchlist);
});
