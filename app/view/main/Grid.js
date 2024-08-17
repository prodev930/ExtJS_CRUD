Ext.define('C.view.main.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'maingrid',
    publishes: ['currentEntry'],
    bind: {
        store: '{entries}',
        title: '{gridTitle}'
    },
    dockedItems: [{
        xtype: 'toolbar',
        items: ['->', {
            xtype: 'button',
            action: 'add',
            bind: '{addBtnText}',
            iconCls: 'fa-plus-circle',
            handler: 'onGridAddBtnClick'
        }]
    }],
    columns: [{
        xtype: 'actioncolumn',
        width: 40,
        align: 'center',
        items: [{
            action: 'del',
            iconCls: 'fa-minus-circle',
            handler: 'onGridDelBtnClick'
        }]
    }, {
        text: 'Id',
        dataIndex: 'id',
        width: 60,
    }, {
        text: 'Name',
        dataIndex: 'name',
        width: 200,
        editor: 'textfield'
    }, {
        text: 'Type',
        dataIndex: 'type',
        width: 250,
        editor: 'textfield'
    }, {
        text: 'Year',
        dataIndex: 'year',
        flex: 1,
        width: 100,
        editor: 'datefield',
         format: '2024'
    }],

    listeners: {
        select: 'onGridRowSelect'
    }
});