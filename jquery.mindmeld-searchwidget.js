(function ($, MM) {

    $.widget('mindmeld.searchwidget', {

        options: {
//            onWidgetInitialized: function () {},
//            onWidget
        },

        _create: function () {
            this._initMM();
        },

        _initMM: function () {
            var config = {
                appid: this.options.appid
            };
        }
    });

}(jQuery, MM));