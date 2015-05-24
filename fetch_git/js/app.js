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
            apiURL = 'https://api.github.com/repos/avantsoft/citicode/commits?sha=release12&access_token=a32e7aa47a245899f0f701715351bfc5f34d621f';
            // apiURL = 'https://api.github.com/repos/avantsoft/citicode?access_token=a32e7aa47a245899f0f701715351bfc5f34d621f';
            // apiURL = "https://spreadsheets.google.com/feeds/list/1hA4LKZn9yKoqnSzaI6_73GQSj_ZVpB3O0kC93QM98Vs/od6/public/basic?alt=json";

        $.ajax({
            url: apiURL,
            dataType: "jsonp",
            success: function(response) {
                console.log(response.data);
                var template = _.template($("#hellotemplate").html(), {
                    commits: response.data
                });

                me.$el.html(template);
            }
        });
    }
});


// Attaching template in specific container with use of Backbone.View
var helloTempCont = new helloTemp({
    el: $("#helloTempContainer")
});