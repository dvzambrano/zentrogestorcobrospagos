/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package SGArqBase
 * @subpackage activitygroup
 * @author MSc. Donel Vázquez Zambrano
 * @version 1.0.0
 */

ActivitygroupApp = function() {
    return {
        init : function(ActivitygroupApp) {
			
            this.store = new Ext.data.GroupingStore({
                url: config.app_host + '/activitygroup/request/method/load',
                baseParams:{
                    component: 'grid',
                    entityid: config.multientityapp ? config.app_entityid : '',
                    start: 0,
                    limit: config.app_elementsongrid
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(store, records) { 
                        alertNoRecords(records, bundle.getMsg('activitygroup.tab.label').toLowerCase());
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });

            this.comboStore = new Ext.data.Store({
                url: config.app_host + '/activitygroup/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(store, records) { 
                        alertNoRecords(records, bundle.getMsg('activitygroup.tab.label').toLowerCase());
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });
			
            this.filters = new Ext.ux.grid.GridFilters({
                encode: true,
                local: false,
                menuFilterText: bundle.getMsg('app.languaje.find.label'),
                filters: [{
                    type: 'string',
                    dataIndex: 'code'
                },{
                    type: 'string',
                    dataIndex: 'name'
                },{
                    type: 'string',
                    dataIndex: 'comment'
                //                },{
                //                    type: 'decimal',
                //                    dataIndex: 'amount'
                },{
                    type: 'boolean',
                    dataIndex: 'fixed'
                }]
            });

            this.infoTextItem = new Ext.Toolbar.TextItem('');
			
            this.gridPanel = new Ext.grid.GridPanel({
                id: 'gridPanelActivitygroup',
                region:'center',
                layout: 'fit', 
                iconCls: Ext.ux.Icon('tag_orange'),
                title: config.app_showgridtitle ? bundle.getMsg("activitygroup.grid.title") : '',
                autoExpandColumn: 'activitygroupmaincolumn',
                store: this.store,
                loadMask: true,
                tools: [{
                    id:'print',
                    qtip: bundle.getMsg('app.languaje.report.printview'),
                    handler: function() {
                        App.printView(window['ActivitygroupApp'].gridPanel);
                    }
                }],
                keys: [panelKeysMap],
            
                listeners: {
                    activate: function(gridpanel){
                        gridpanel.getStore().load();
                    },
                    rowclick : function(grid, rowIndex, eventObject) {
                        var selectionModel = grid.getSelectionModel();
                        App.selectionChange(selectionModel);
                    },
                    rowdblclick : function(grid, rowIndex, eventObject) {
                        if(grid.updateBtn && !grid.updateBtn.disabled && !grid.updateBtn.hidden)
                            grid.updateBtn.fireEvent('click', grid.updateBtn);
                    },
                    filterupdate: function(){
                        var text = App.getFiltersText(window['ActivitygroupApp'].gridPanel);
                        if(text && text!=''){
                            Ext.fly(window['ActivitygroupApp'].infoTextItem.getEl()).update(String.format(bundle.getMsg('app.form.filteringby'), text));
                            window['ActivitygroupApp'].infoTextItem.getEl().highlight('#FFFF66', {
                                block:true
                            });
                        }
                        else
                            Ext.fly(window['ActivitygroupApp'].infoTextItem.getEl()).update('');
                    }
                },
				
                columns: [new Ext.grid.RowNumberer(), {
                    header: bundle.getMsg('activitygroup.field.name'), 
                    width: 60, 
                    sortable: true, 
                    dataIndex: 'name'
                },{
                    id:'activitygroupmaincolumn', 
                    header: bundle.getMsg('activitygroup.field.comment'), 
                    width: 200, 
                    sortable: true, 
                    dataIndex: 'comment'
                },{
                    header: bundle.getMsg('activitygroup.field.amount'), 
                    width: 60, 
                    sortable: true, 
                    dataIndex: 'amount',
                    renderer: function(value, metaData, record){
                        if(record && !record.get('fixed'))
                            return value + ' %';
                        return Ext.util.Format.usMoney(value);
                    }
                }],
				
                view: new Ext.grid.GroupingView({
                    markDirty: false,
                    forceFit:true,
                    groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? bundle.getMsg("app.form.elements") : bundle.getMsg("app.form.element")]})'
                }),
				
                plugins: [this.filters],
				
                stripeRows: true,			
                tbar: [{
                    text: bundle.getMsg('app.form.add'),
                    iconCls: Ext.ux.Icon('add'),
                    ref: '../addBtn',
                    listeners: {
                        click: function(button, eventObject, hideApply, callback) {
                            window['ActivitygroupApp'].gridPanel.getSelectionModel().clearSelections();
                            window['ActivitygroupApp'].gridPanel.updateBtn.fireEvent('click', button, eventObject, hideApply, callback);
                        }
                    }
                },{
                    ref: '../updateBtn',
                    text: bundle.getMsg('app.form.info'),
                    disabled: true,
                    iconCls: Ext.ux.Icon('information'),
                    listeners: {
                        click: function(button, eventObject, hideApply, callback) {
                            App.mask.show();
                            var record = window['ActivitygroupApp'].gridPanel.getSelectionModel().getSelected();
                            if (record){
                                window['ActivitygroupApp'].formPanel.getForm().loadRecord(record);
                                
                                var val = !record.get('fixed');
                                window['ActivitygroupApp'].formPanel.ispercentageRadioGroup.setValue('activitygrouppercentage', val);
                                window['ActivitygroupApp'].formPanel.ispercentageRadioGroup.setValue('activitygroupfixed', !val);
                            }
                            else
                                window['ActivitygroupApp'].formPanel.getForm().reset();
                            window['ActivitygroupApp'].showWindow(button.getEl(), hideApply, callback);
                            App.mask.hide();
                        }
                    }
                },{
                    ref: '../removeBtn',
                    text: bundle.getMsg('app.form.delete'),
                    disabled: true,
                    iconCls: Ext.ux.Icon('delete'),
                    listeners: {
                        click: function(button, eventObject, callback) {
                            Ext.defer(function(){
                                Ext.Msg.show({
                                    title: bundle.getMsg('app.msg.warning.title'),
                                    msg: bundle.getMsg('app.msg.warning.deleteselected.text'),
                                    buttons: Ext.Msg.YESNO,
                                    fn: function(btn, text){
                                        if (btn == 'yes'){											
                                            var records = window['ActivitygroupApp'].gridPanel.getSelectionModel().getSelections();
											
                                            var array = new Array();
                                            for (var i=0; i<records.length; i++)
                                                array.push(records[i].get('id'));
												
                                            new Ext.data.Connection().request({
                                                url: config.app_host + '/activitygroup/request/method/delete',
                                                params: {
                                                    ids: Ext.encode(array)
                                                },
                                                failure: requestFailed,
                                                success: requestSuccessful,
                                                callback : function(options, success, response) {
                                                    var object = Ext.decode(response.responseText);
                                                    if(object.success){
                                                        window['ActivitygroupApp'].store.load({
                                                            params:{
                                                                start: window['ActivitygroupApp'].gridPanel.getBottomToolbar().cursor
                                                            }
                                                        });
                                                        if(callback){
                                                            if(callback.fn)
                                                                callback.fn(callback.params);
                                                            else
                                                                callback();
                                                        }
                                                    }
                                                    else
                                                        requestFailed(response, false);
                                                    
                                                }
                                            });
                                        }
                                    },
                                    animEl: 'elId',
                                    icon: Ext.MessageBox.QUESTION
                                });
                            }, 100, this);
                        }
                    }
                }],
				
                bbar: new Ext.PagingToolbar({
                    pageSize: parseInt(config.app_elementsongrid),
                    store: this.store,
                    plugins: [new Ext.ux.ProgressBarPager(), this.filters],
                    items: [{
                        tooltip: bundle.getMsg('app.form.clearfilters'),
                        iconCls: Ext.ux.Icon('table_lightning'),
                        handler: function () {
                            window['ActivitygroupApp'].gridPanel.filters.clearFilters();
                            Ext.fly(window['ActivitygroupApp'].infoTextItem.getEl()).update('');
                            window['ActivitygroupApp'].gridPanel.getSelectionModel().clearSelections();
                        } 
                    },'-', this.infoTextItem],
                    displayInfo: true,
                    displayMsg: bundle.getMsg('app.form.bbar.displaymsg'),
                    emptyMsg: String.format(bundle.getMsg('app.form.bbar.emptymsg'), bundle.getMsg('app.form.elements').toLowerCase())
                }),
				
                sm: new Ext.grid.RowSelectionModel({
                    singleSelect:false, 
                    listeners: {
                        selectionchange: App.selectionChange
                    }
                })
            });
			
            this.gridPanel.getView().getRowClass = function(record, index, rowParams, store) {
                var css = '';
                if (!record.get('deleteable')) 
                    css = 'row-italic';
                return css;
            };
			
            this.formPanel = new Ext.FormPanel({
                labelWidth: 75,
                labelAlign: 'top',
                url: config.app_host + '/activitygroup/request/method/save',
                frame:true,
                bodyStyle:'padding:5px 5px 0',
                keys: [formKeyMaping],
                items: [{
                    xtype:'textfield',
                    name: 'name',
                    fieldLabel: bundle.getMsg('activitygroup.field.name')+'<span style="color:red;"><sup>*</sup></span>', 
					allowBlank:false, 
                    anchor:'-20'
                },{
                    xtype:'textarea',
                    name: 'comment',
                    fieldLabel: bundle.getMsg('activitygroup.field.comment'), 
                    anchor:'-20'
                },{
                    layout:'column',
                    items:[{
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                            ref: '../../amountField',
                            xtype: 'compositefield',
                            fieldLabel: bundle.getMsg('app.form.amount')+'<span style="color:red;"><sup>*</sup></span>',
                            combineErrors: false,
                            items: [new Ext.ux.form.SpinnerField({
                                name: 'amount',
                                fieldLabel: bundle.getMsg('app.form.amount'), 
								allowBlank:false,
                                flex: 1,
                                minValue: 0,
                                allowDecimals: true,
                                decimalPrecision: 1,
                                incrementValue: 0.5,
                                accelerate: true
                            }),{
                                ref: 'resumeField',
                                id: 'resumecouponcurrency',
                                width: 50,
                                xtype: 'displayfield',
                                value: ' '
                            }]
                        }]
                    },{
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                            ref: '../../ispercentageRadioGroup',
                            xtype: 'radiogroup',
                            fieldLabel: '',
                            labelSeparator: '',
                            items: [{
                                boxLabel: bundle.getMsg('app.form.fixedvalue'), 
                                id: 'activitygroupfixed', 
                                name: 'fixed', 
                                inputValue: true, 
                                checked: true
                            },{
                                boxLabel: bundle.getMsg('app.form.percent'), 
                                id: 'activitygrouppercentage',
                                name: 'fixed', 
                                inputValue: false
                            }],
                            listeners: {
                                change: function(radioGroup, radio) {
                                    if (radio.getId() == 'activitygrouppercentage')
                                        window['ActivitygroupApp'].formPanel.amountField.resumeField.setValue('%');
                                    else
                                        window['ActivitygroupApp'].formPanel.amountField.resumeField.setValue(' ');
                                }
                            }
                        }]
                    }]
                }]
            });

        },

        showWindow : function(animateTarget, hideApply, callback){
            window['ActivitygroupApp'].window = App.showWindow(bundle.getMsg('activitygroup.window.title'), 430, 280, window['ActivitygroupApp'].formPanel, 
                function(button){
                    if(!button){
                        button = new Object;
                        button.id = window['ActivitygroupApp'].window.submitBtn.id;
                    }

                    var records = window['ActivitygroupApp'].gridPanel.getSelectionModel().getSelections();
							
                    window['ActivitygroupApp'].formPanel.getForm().submit({
                        waitTitle : bundle.getMsg('app.msg.wait.title'), 
                        waitMsg: bundle.getMsg('app.msg.wait.text'), 
                        clientValidation: true,
                        params: {
                            entityid: config.multientityapp ? config.app_entityid : '',
                            id: records[0] ? records[0].get('id') : ''
                        },
                        success: function(form, action) {
                            checkSesionExpired(form, action);
                            window['ActivitygroupApp'].store.load({
                                params:{
                                    start: window['ActivitygroupApp'].gridPanel.getBottomToolbar().cursor
                                }
                            });
                            
                            submitFormSuccessful('ActivitygroupApp', form, action, button, !records[0], function(){
                                
                                }, callback);
                        },
                        failure: loadFormFailed
                    });

                }, 
                function(){
                    window['ActivitygroupApp'].formPanel.getForm().reset();
                    window['ActivitygroupApp'].window.hide();
                }, 
                animateTarget,
                false,
                false,
                false,
                hideApply ? hideApply : false);
        },

        applySecurity : function(groups, permissions){
            window['ActivitygroupApp'].gridPanel.addBtn.setVisible(permissions.indexOf('manageactivitygroup') != -1 || permissions.indexOf('manageactivitygroupadd') != -1);
            window['ActivitygroupApp'].gridPanel.updateBtn.setVisible(permissions.indexOf('manageactivitygroup') != -1 || permissions.indexOf('manageactivitygroupedit') != -1);
            window['ActivitygroupApp'].gridPanel.removeBtn.setVisible(permissions.indexOf('manageactivitygroup') != -1 || permissions.indexOf('manageactivitygroupdelete') != -1);
        }
    }
}();

