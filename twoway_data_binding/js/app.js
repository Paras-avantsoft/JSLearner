/*
 * ==== Creating Model ====
 */
var twoWaysBindingModel = Backbone.Model.extend({
    initialize: function() {
        console.log('Model initialized..');
    }
});

// Creating new instance of model.
var twoWayModel = new twoWaysBindingModel({
    'data': 'enter some text in field to bind with this area..'
});

// Creating view to represent fetched data from server
var twoWayBindingView = Backbone.View.extend({
    el: '#reflactionArea',
    template: _.template($('#reflectionField').html()),
    initialize: function() {
        this.render();
    },
    render: function() {
        var me = this,
            tmplt = me.template({
                'config': twoWayModel.attributes
            });

        me.$el.append(tmplt);
        return me;
    },
    events: {
        'keyup input[id=textfield]': 'bindDataWithModel'
    },
    bindDataWithModel: function(event) {
        twoWayModel.set({
            'data': event.target.value
        });
        var me = this,
            tmplt = me.template({
                'config': twoWayModel.attributes
            });

        // me.$el.html(tmplt);
        me.$el.children()[1].innerHTML = event.target.value;
        return me;
    }
});

var twoWayView = new twoWayBindingView();
