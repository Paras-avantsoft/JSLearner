/*
 * ==== Creating Model ====
 */
var jarvaze = Backbone.Model.extend({
    urlRoot: 'http://localhost:4968/config/',
    initialize: function() {
        console.log('Model initialized..');
        this.on('change', function() {
            console.log('Model Changed..');
            if (this.hasChanged('ram')) {
                console.log('Ram is updated from ' + this.previous('ram') + ' to ' + this.get('ram') + ' in Jarvaze..');
            }
            if (this.hasChanged('cpu')) {
                console.log('CPU is updated from ' + this.previous('cpu') + ' to ' + this.get('cpu') + ' in Jarvaze..');
            }
        });
    },
    // Default values of record in model
    defaults: [{
        ram: '6 GB',
        cpu: 'Intel i5 2nd Gen'
    }],
    // To validate modules as per requirement.
    validate: function(attrs) {
        if (attrs.ram === '3 GB') {
            return 'Ram should be atleast 6 GB';
        }
    },
    // Model function
    showConfig: function() {
        console.log('RAM : ' + this.get('ram') + ' & CPU : ' + this.get('cpu'));
    }
});

// Creating new instance of model.
var config = new jarvaze();

// Calling function of model
config.showConfig();

// config.set('ram', '3 GB'); // Will trigger change event
// console.log('Ram should be atleast 6 GB. Is model valid: ' + config.isValid());

// // Change event noy invoked
// config.set('cpu', 'Intel i7 3rd Gen', {
//     silent: false
// });

// Fetching data from node server.
config.fetch({
    success: function(model, response, options) {
        console.log('Model is Changed: ' + model.hasChanged());
        console.log('Config fetch successfully');

        // Creating instance of configView in success of request from server
        // so we can bind all data thet we are getting from server.
        var createConfigView = new configView();
    },
    error: function(model, response, options) {
        console.log('Config fetch error');
    }
});

// Creating view to represent fetched data from server
var configView = Backbone.View.extend({
    el: '#configContainer',
    template: _.template($('#configTemplate').html()),
    initialize: function() {
        this.render();
    },
    render: function() {
        var me = this,
            tmplt = me.template({
                'configData': config.attributes
            });

        me.$el.append(tmplt);
        return me;
    }
});

/*
 * ==== Extending Model ====
 */
// Extending jarvaze model
extendJarvaze = jarvaze.extend({
    getWebLink: function() {
        return 'Updated Jarvaze with ' + this.get('ram') + ' RAM and ' + this.get('cpu') + ' CPU.';
    },
    printDetails: function() {
        console.log('Extended Configs');
        //Call parent model function with use of prototype.
        jarvaze.prototype.showConfig.call(this);
    }
});

// Creating instance of extended model
var extendCondig = new extendJarvaze({
    ram: "16 GB",
    cpu: "Intel i10 6th Gen"
});

console.log(extendCondig.getWebLink());
extendCondig.printDetails();

/*
 * ==== Creating Collection ====
 */
var configCollection = Backbone.Collection.extend({
    model: 'jarvaze',
    initialize: function() {
        console.log('Collection initialized..');
    }
});

// passing config as model in collection
var configCollectionInstance = new configCollection(config);
