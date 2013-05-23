var items = [
    '"Project Gemini will save our bacon!" posted by Emily on the [company blog]. 2 minutes ago.',
    'A [commit] on Project Gemini by Alfred with comment "Adapted to new button design". A week ago.',
    '"Home Curing Of Bacon And Hams" has been [borrowed] by Edward. 9 days ago.',
    'The wiki page ["updated design guidelines for the button widget"] was updated by Jack. 12 days ago.',
    'Eric wrote on IRC: "git is AWESOME!" in channel [#gemini]. 14 days ago.',
    'Maggie wrote on IRC: "we are working on a major breaktrough in the design of the application" in channel [#gemini]. 14 days ago.',
    '"Principles for Successful Button Design" has been [borrowed] by Jack. A month ago.'
    ];

var at_home = true;

function search(event) {
    event.preventDefault();

    var html;
    var query = $(".search-query").val();

    var results = _.filter(items, function(item){ return item.toLowerCase().indexOf(query.toLowerCase()) != -1; });

    if(query && results.length > 0) {
        html = _.reduce(results, function(memo, result){
            return memo + "<p>" + result.replace("[", '<a href="#" class="link">').replace("]", '</a>') + "</p>";
        }, "");
    }
    else {
        html = '<h3>No results found..</h3>' +
            '<p>Maybe try searching for something else?</p>' +
            '<p>Like <a href="#" class="hint">design</p>';
    }

    var meta = '<div class="meta">' +
        '<span class="label label-info">Showing results for "' + $(".search-query").val() + '"</span>' +
        '&nbsp;' +
        '<a href="#" class="home">Return to the Dashboard</a>' +
        '</div>';

    $("#results").html(meta + html);

    at_home = false;
}

function go_home(event) {
    var html;
    var topics = get_watchlist_topics();

    if(topics) {
        var results = _.filter(items, function(item) {
            return _.some(topics, function(topic) {
                return item.toLowerCase().indexOf(topic.toLowerCase()) != -1;
            });
        });

        var meta = '<div class="meta">' +
            '<span class="label label-info">Showing results for your Watchlist</span>' +
            '</div>';

        if(results.length > 0) {
            html = _.reduce(results, function(memo, result){
                return memo + "<p>" + result.replace("[", '<a href="#" class="link">').replace("]", '</a>') + "</p>";
            }, meta);

            $("#results").html(html);

            at_home=true;

            return;
        }
    }

    html = '<h1>Welcome to Dashboard!</h1>' +
        '<h3>1: Search for something (eg. your name)</h3>' +
        '<h3>2: Look at the results updating in real time</h3>' +
        '<h3>3: Add to the watchlist the things you care for</h3>' +
        '<p>' +
        'Pssst.. You can even close this window and return later<br>' +
        'we will remember and show your watchlist results.<br>' +
        'But don\'t do that now! :-)' +
        '</p>' +
        '</div>';

    $("#results").html(html);

    at_home=true;
}

function get_watchlist_topics() {
    return _.uniq(_.map(document.getElementsByClassName("pill"), function(p){ return p.textContent; }));
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

    if(at_home)
        go_home(); // update results
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
    if(at_home)
        go_home(); // update results
    add_deletion_alert(term);
}

$(document).ready(function() {
    $(".form-search").on("submit", search);
    $(".add-watchlist").on("click", add_watchlist);
    $(document).on("click", ".hint", hint);
    $(document).on("click", ".link", link);
    $(document).on("click", ".home", go_home);
    $(document).on("click", ".delete-watchlist", delete_watchlist);
    $(document).on("click", ".undo-delete-watchlist", undo_delete_watchlist);
    go_home();
});
