Ext.define('C.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        formTitle: 'Robot Details',
        gridTitle: 'Robots',
        addBtnText: 'Add New Robot',
        currentEntry: null
    },

    stores: {
        entries: {
            model: 'C.model.Robot',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'http://12.97.81.154:7999/my-rest-api/api/robots',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }
});