Ext.define('C.view.main.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'mainform',
    reference: 'robotForm',
    autoScroll: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 5,
    config: {
        currentEntry: null
    },
    bind: {
        title: '{formTitle}',
        currentEntry: '{currentEntry}'
    },
    defaults: {
        anchor: '100%',
        msgTarget: 'under'
    },
    items: [{
        fieldLabel: 'Name',
        name: 'name',
        xtype: 'textfield',
        allowBlank: false,  // Make Name field required
        bind: {
            value: '{currentEntry.name}'
        }
    }, {
        fieldLabel: 'Type',
        name: 'type',
        xtype: 'combobox',  // Change to combobox
        allowBlank: false,  // Make Type field required
        store: ['virtual', 'mechanical', 'droid'],  // Define options
        editable: false,  // Disable input field, only allow selection
        forceSelection: true,  // Only allow selection from the list
        bind: {
            value: '{currentEntry.type}'
        }
    },
    {
        fieldLabel: 'Year',
        name: 'year',
        xtype: 'numberfield',  // Use numberfield for year input
        allowBlank: false,  // Make Year field required
        minValue: 1900,  // Set a reasonable minimum year value
        maxValue: new Date().getFullYear(),  // Set the maximum year to the current year
        allowDecimals: false,  // Disable decimal input
        bind: {
            value: '{currentEntry.year}'
        }
    }
],
    buttons: [{
        text: 'Save',
        action: 'save',
        handler: 'onFormBtnClick'
    }, {
        text: 'Cancel',
        action: 'cancel',
        handler: 'onFormBtnClick'
    }]
});
