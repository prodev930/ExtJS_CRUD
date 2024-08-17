Ext.define('C.model.Entry', {
    extend: 'Ext.data.Model',
    schema: {
        namespace: "C.model"
    },

    fields: [{
        name: 'name',
        type: 'auto'
    }, {
        name: 'type',
        type: 'auto'
    }, {
        name: 'year',
        type: 'int'
    }],
    proxy: {
        type: 'rest',
        url: 'http://12.97.81.154:7999/my-rest-api/api/robots',
        reader: {
            type: 'json',
            rootProperty: 'data'  // Adjust based on actual API response structure
        },
        writer: {
            type: 'json',
            writeAllFields: true
        },
        api: {
            create: 'http://12.97.81.154:7999/my-rest-api/api/robots',
            read: 'http://12.97.81.154:7999/my-rest-api/api/robots',
            update: 'http://12.97.81.154:7999/my-rest-api/api/robots',
            destroy: 'http://12.97.81.154:7999/my-rest-api/api/robots/{id}'  // Use {id} for delete
        }
    }
});
