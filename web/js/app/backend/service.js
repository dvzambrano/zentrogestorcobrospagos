/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package SGArqBase
 * @subpackage service
 * @author MSc. Donel Vázquez Zambrano
 * @version 1.0.0
 */

ServiceApp = function() {
    return {
        init : function(ServiceApp) {
			
            this.store = new Ext.data.GroupingStore({
                url: config.app_host + '/service/request/method/load',
                baseParams:{
                    component: 'grid',
                    entityid: config.multientityapp ? config.app_entityid : '',
                    start: 0,
                    limit: config.app_elementsongrid
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(store, records) { 
                        alertNoRecords(records, bundle.getMsg('service.tab.label').toLowerCase());
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });

            this.comboStore = new Ext.data.Store({
                url: config.app_host + '/service/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(store, records) { 
                        alertNoRecords(records, bundle.getMsg('service.tab.label').toLowerCase());
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
                    dataIndex: 'name'
                },{
                    type: 'string',
                    dataIndex: 'comment'
                },{
                    type: 'float',
                    dataIndex: 'amount'
                }]
            });

            this.infoTextItem = new Ext.Toolbar.TextItem('');
			
            this.gridPanel = new Ext.grid.GridPanel({
                id: 'gridPanelService',
                region:'center',
                layout: 'fit', 
                iconCls: Ext.ux.Icon('tag_orange'),
                title: config.app_showgridtitle ? bundle.getMsg("service.grid.title") : '',
                autoExpandColumn: 'servicemaincolumn',
                store: this.store,
                loadMask: true,
                tools: [{
                    id:'print',
                    qtip: bundle.getMsg('app.languaje.report.printview'),
                    handler: function() {
                        App.printView(window['ServiceApp'].gridPanel);
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
                        var text = App.getFiltersText(window['ServiceApp'].gridPanel);
                        if(text && text!=''){
                            Ext.fly(window['ServiceApp'].infoTextItem.getEl()).update(String.format(bundle.getMsg('app.form.filteringby'), text));
                            window['ServiceApp'].infoTextItem.getEl().highlight('#FFFF66', {
                                block:true
                            });
                        }
                        else
                            Ext.fly(window['ServiceApp'].infoTextItem.getEl()).update('');
                    }
                },
				
                columns: [new Ext.grid.RowNumberer(),{
                    header: bundle.getMsg('service.field.name'), 
                    width: 80, 
                    sortable: true, 
                    dataIndex: 'name'
                },{
                    id:'servicemaincolumn', 
                    header: bundle.getMsg('service.field.comment'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'comment'
                },{
                    header: bundle.getMsg('service.field.amount'), 
                    width: 40, 
                    sortable: true, 
                    renderer: 'usMoney',
                    dataIndex: 'amount'
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
                            window['ServiceApp'].gridPanel.getSelectionModel().clearSelections();
                            window['ServiceApp'].gridPanel.updateBtn.fireEvent('click', button, eventObject, hideApply, callback);
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
                            var record = window['ServiceApp'].gridPanel.getSelectionModel().getSelected();
                            if (record){
                                window['ServiceApp'].formPanel.getForm().loadRecord(record);
                            }
                            else
                                window['ServiceApp'].formPanel.getForm().reset();
                            window['ServiceApp'].showWindow(button.getEl(), hideApply, callback);
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
                                            var records = window['ServiceApp'].gridPanel.getSelectionModel().getSelections();
											
                                            var array = new Array();
                                            for (var i=0; i<records.length; i++)
                                                array.push(records[i].get('id'));
												
                                            new Ext.data.Connection().request({
                                                url: config.app_host + '/service/request/method/delete',
                                                params: {
                                                    ids: Ext.encode(array)
                                                },
                                                failure: requestFailed,
                                                success: requestSuccessful,
                                                callback : function(options, success, response) {
                                                    var object = Ext.decode(response.responseText);
                                                    if(object.success){
                                                        window['ServiceApp'].store.load({
                                                            params:{
                                                                start: window['ServiceApp'].gridPanel.getBottomToolbar().cursor
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
                            window['ServiceApp'].gridPanel.filters.clearFilters();
                            Ext.fly(window['ServiceApp'].infoTextItem.getEl()).update('');
                            window['ServiceApp'].gridPanel.getSelectionModel().clearSelections();
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
                url: config.app_host + '/service/request/method/save',
                frame:true,
                bodyStyle:'padding:5px 5px 0',
                keys: [formKeyMaping],
                items: [{
                    layout:'column',
                    items:[{
                        columnWidth:.7,
                        layout: 'form',
                        items: [{
                            xtype:'textfield',
                            name: 'name',
                            fieldLabel: bundle.getMsg('activitygroup.field.name')+'<span style="color:red;"><sup>*</sup></span>', 
							allowBlank: false,
                            anchor:'-20'
                        }]
                    },{
                        columnWidth:.3,
                        layout: 'form',
                        items: [new Ext.ux.form.SpinnerField({
                            name: 'amount',
                            fieldLabel: bundle.getMsg('app.form.amount')+'<span style="color:red;"><sup>*</sup></span>', 
							allowBlank: false,
                            anchor:'-20',
                            minValue: 0,
                            allowDecimals: true,
                            decimalPrecision: 1,
                            incrementValue: 0.5,
                            accelerate: true
                        })]
                    }]
                },{
                    xtype:'textarea',
                    name: 'comment',
                    fieldLabel: bundle.getMsg('activitygroup.field.comment'), 
                    anchor:'-20'
                }]
            });

        },

        showWindow : function(animateTarget, hideApply, callback){
            window['ServiceApp'].window = App.showWindow(bundle.getMsg('service.window.title'), 370, 230, window['ServiceApp'].formPanel, 
                function(button){
                    if(!button){
                        button = new Object;
                        button.id = window['ServiceApp'].window.submitBtn.id;
                    }

                    var records = window['ServiceApp'].gridPanel.getSelectionModel().getSelections();
							
                    window['ServiceApp'].formPanel.getForm().submit({
                        waitTitle : bundle.getMsg('app.msg.wait.title'), 
                        waitMsg: bundle.getMsg('app.msg.wait.text'), 
                        clientValidation: true,
                        params: {
                            entityid: config.multientityapp ? config.app_entityid : '',
                            id: records[0] ? records[0].get('id') : ''
                        },
                        success: function(form, action) {
                            checkSesionExpired(form, action);
                            window['ServiceApp'].store.load({
                                params:{
                                    start: window['ServiceApp'].gridPanel.getBottomToolbar().cursor
                                }
                            });
                            
                            submitFormSuccessful('ServiceApp', form, action, button, !records[0], function(){
                                
                            }, callback);
                        },
                        failure: loadFormFailed
                    });

                }, 
                function(){
                    window['ServiceApp'].formPanel.getForm().reset();
                    window['ServiceApp'].window.hide();
                }, 
                animateTarget,
                false,
                false,
                false,
                hideApply ? hideApply : false);
        },

        applySecurity : function(groups, permissions){
            window['ServiceApp'].gridPanel.addBtn.setVisible(permissions.indexOf('manageservice') != -1 || permissions.indexOf('manageserviceadd') != -1);
            window['ServiceApp'].gridPanel.updateBtn.setVisible(permissions.indexOf('manageservice') != -1 || permissions.indexOf('manageserviceedit') != -1);
            window['ServiceApp'].gridPanel.removeBtn.setVisible(permissions.indexOf('manageservice') != -1 || permissions.indexOf('manageservicedelete') != -1);
        }
    }
}();

