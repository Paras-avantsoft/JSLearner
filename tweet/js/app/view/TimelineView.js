var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};

com.apress.view.TimelineView = Backbone.View.extend({
    el: '#timeline',
    template: Handlebars.compile($("#timeline-template").html()),
    timeline: null,
    initialize: function(options) {
        var me = this;
        //create a collection for this view to render
        me.timeline = new com.apress.collection.Timeline();
        //initial render
        me.render();
        //force the fetch to fire a reset event
        me.timeline.fetch({
            reset: true
        });
        me.listenTo(me.timeline, 'reset', me.render);
    },
    render: function() {
        var me = this;
        if (me.timeline.models.length > 0) {
            var output = me.template({
                tweet: me.timeline.toJSON()
            });
            me.$el.append(output);
        }
        return me;
    }
});
