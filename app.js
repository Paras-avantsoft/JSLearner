// Creating Backbone
var helloTemp = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    render: function() {
        var template = _.template($("#hellotemplate").html(), {
            commits: ''
        });

        this.$el.html(template);
    },
    events: {
        "click h1[id=fetchGitData]": "handleAjax"
    },
    handleAjax: function(event) {
        var me = this,
            // apiURL = 'https://api.github.com/repos/avantsoft/citicode/pulls?number=&access_token=a32e7aa47a245899f0f701715351bfc5f34d621f',
            apiURL = 'https://api.github.com/repos/avantsoft/citicode/commits?sha=release11_help2&access_token=a32e7aa47a245899f0f701715351bfc5f34d621f';
            // apiURL = 'https://api.github.com/repos/avantsoft/citicode?access_token=a32e7aa47a245899f0f701715351bfc5f34d621f';
            apiURL = "https://spreadsheets.google.com/feeds/list/1hA4LKZn9yKoqnSzaI6_73GQSj_ZVpB3O0kC93QM98Vs/od6/public/basic?alt=json";

        $.ajax({
            url: apiURL,
            dataType: "jsonp",
            success: function(response) {
                // commits = JSON.parse(data);
                console.log(response.feed.entry);
                var template = _.template($("#hellotemplate").html(), {
                    commits: response.data
                });

                me.$el.html(template);
            }
        });

        // xhr.open('GET', apiURL);
        // xhr.onload = function() {
        //     commits = JSON.parse(xhr.responseText);
        //     console.log(helloModel2.models[0].get('data'));
        //     console.log(commits);
        //     var template = _.template($("#hellotemplate").html(), {
        //         commits: commits
        //     });

        //     me.$el.html(template);
        // };

        // xhr.send();
    }
});


// Attaching template in specific container with use of Backbone.View
var helloTempCont = new helloTemp({
    el: $("#helloTempContainer")
});
/*
// Creating model
var hellpWorldModel = Backbone.Model.extend({
    initialize: function() {
        console.log('@@@@@ Model initialized @@@@@');
    }
});

// Creating collection
var hellpWorldCollection = Backbone.Collection.extend({
    model: hellpWorldModel
});
// Binding data with model
var helloModel1 = new hellpWorldModel({
    data: 'hello world !!'
});

// Binding model with collection
var helloModel2 = new hellpWorldCollection([helloModel1]);


// Detecting routes changing..
var AppRouter = Backbone.Router.extend({
    routes: {
        "*actions": "defaultRoute" // matches http://example.com/#anything-here
    }
});


// Initiate the router
var app_router = new AppRouter;

app_router.on('route:defaultRoute', function(actions) {
        console.log(actions || 'No change in route.');
    })
    // Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();
*/
