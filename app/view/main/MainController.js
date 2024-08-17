Ext.define('C.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    onGridRowSelect: function (sender, record) {
        this.setActiveEastCard(1);
        this.getViewModel().set('currentEntry', record);
    },

    onGridAddBtnClick: function () {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('entries'),
            newRobot = Ext.create('C.model.Entry', {
                id :'',
                name: '',
                type: '',
                year: new Date().getFullYear()
            });

        vm.set('currentEntry', newRobot);
        store.add(newRobot);
        me.getView().down('maingrid').getView().select(newRobot);
        me.setActiveEastCard(1);
        me.gridAddBtnSetDisabled(true);
    },

    onFormBtnClick: function (btn) {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('entries'),
            entry = vm.get('currentEntry'),
            url = entry.phantom
                ? 'http://12.97.81.154:7999/my-rest-api/api/robots'
                : 'http://12.97.81.154:7999/my-rest-api/api/robots/' + entry.get('id');
    
        if (btn.action === 'save') {
            if (me.getView().down('mainform').isValid()) {
                console.log('Sending data:', entry.getData()); // Debugging line to log data

                const { name, type, year } = entry.getData();
                
                Ext.Ajax.request({
                    url: url,
                    method: entry.phantom ? 'POST' : 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    jsonData: { name, type, year },
                    
                    success: function (response) {
                        console.log("success");
                        var responseData = Ext.decode(response.responseText);
                        if (entry.phantom) {
                            entry.set('id', responseData.id);
                        }
                        store.commitChanges();
                        store.load();
                        Ext.Msg.alert('Success', 'Robot ' + (entry.phantom ? 'added' : 'updated') + ' successfully.');
                        me.setActiveEastCard(0);
                        me.gridAddBtnSetDisabled(false);
                    },
                    failure: function (response) {
                        console.log("failure");
                        var responseText = Ext.decode(response.responseText, true) || {}; // Safely decode response
                        var errorMsg = 'Failed to ' + (entry.phantom ? 'add' : 'update') + ' the robot. Please try again.';
                        console.log(response.status);
    
                        // Handle specific HTTP status codes
                        if (response.status === 409) {
                            errorMsg = 'Conflict: A robot with the same details already exists.';
                        } else if (response.status === 400) {
                            errorMsg = 'Bad Request: Please check the data you are sending.';
                        }
                        Ext.Msg.alert('Error', errorMsg);
    
                        // Rollback changes if there's a conflict or error
                        if (entry.phantom) {
                            store.remove(entry);
                        } else {
                            store.rejectChanges();
                        }
                        me.gridAddBtnSetDisabled(false);
                    }
                });
            } else {
                Ext.Msg.alert('Invalid Data', 'Please correct form errors.');
                me.gridAddBtnSetDisabled(false);
            }
        } else if (btn.action === 'cancel') {
            store.rejectChanges();
            me.setActiveEastCard(0);
            me.gridAddBtnSetDisabled(false);
        }
    }
,    
    onGridDelBtnClick: function (grid, rowIndex) {
        var store = grid.getStore(),
            record = store.getAt(rowIndex);

        Ext.Ajax.request({
            url: 'http://12.97.81.154:7999/my-rest-api/api/robots/' + record.get('id'),
            method: 'DELETE',
            success: function () {
                Ext.Msg.alert('Success', 'Robot deleted successfully.');
                store.remove(record);
            },
            failure: function () {
                Ext.Msg.alert('Error', 'Failed to delete the robot. Please try again.');
            }
        });
    },

    setActiveEastCard: function (n) {
        this.getView().down('container[region=east]').setActiveItem(n);
    },

    gridAddBtnSetDisabled: function (disabled) {
        this.getView().down('button[action=add]').setDisabled(disabled);
    }
});
