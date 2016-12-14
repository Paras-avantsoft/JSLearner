// Global app, ENTER_KEY, ESC_KEY
var app = app || {};

$(function() {
    'use strict';

    // Starting view part
    // ------------------

    // Creating view in AppView to access it globally
    app.AppView = Backbone.View.extend({
        el: '#todoapp',

        template: '',
        initialize: function() {
            // Will call when view will initilize
            console.log('view is loaded!!');
        },

        router: function() {
            // Will call when route will change
        },

        events: {
            'keypress #new-todo': 'createNoteOnEnterClick',
            // Register events that you want to bind with view/template
        },
        createNoteOnEnterClick: function(e) {
            if ((e.which === ENTER_KEY) && e.target.value.trim()) {
                e.target.value = '';
                console.log('New todo created!!');
                // Add code to create new todo item below inputfield..
            }
        }
    });
});