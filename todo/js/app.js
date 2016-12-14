// Creating global app object to bind view, model, collection and router in one place.
var app = app || {},
    ENTER_KEY = 13,
    ESC_KEY = 27;

$(function () {
    'use strict';

    // Creating AppView in app object to bind it globally
    new app.AppView();
});

