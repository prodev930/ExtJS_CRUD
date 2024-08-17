Ext.define('C.model.Robot', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'year', type: 'int' }
    ],
    proxy: {
        type: 'ajax',
        url: 'http://12.97.81.154:7999/my-rest-api/api/robots',
        reader: {
            type: 'json',
            rootProperty: 'data',
        },
        writer: {
            type: 'json'
        }
    }
});
