/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package SGArqBase
 * @subpackage testing
 * @author MSc. Donel Vázquez Zambrano
 * @version 1.0.0
 */

TestingApp = function() {
    return {
        init : function(TestingApp) {
			
            this.store = new Ext.data.GroupingStore({
                url: config.app_host + '/testing/request/method/load',
                baseParams:{
                    component: 'grid',
                    start: 0,
                    limit: config.app_elementsongrid
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    beforeload: beforeloadStore,
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(store, records) { 
                        alertNoRecords(records, bundle.getMsg('testing.tab.label').toLowerCase());
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });

            this.comboStore = new Ext.data.Store({
                url: config.app_host + '/testing/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    beforeload: beforeloadStore,
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(store, records) { 
                        alertNoRecords(records, bundle.getMsg('testing.tab.label').toLowerCase());
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
                    dataIndex: 'nick'
                },{
                    type: 'string',
                    dataIndex: 'comment'
                },{
                    type: 'int',
                    dataIndex: 'parentid'
                }]
            });

            this.infoTextItem = new Ext.Toolbar.TextItem('');
			
            this.gridPanel = new Ext.grid.GridPanel({
                id: 'gridPanelTesting',
                region:'center',
                layout: 'fit', 
                iconCls: Ext.ux.Icon('tag_orange'),
                title: config.app_showgridtitle ? bundle.getMsg("testing.grid.title") : '',
                autoExpandColumn: 'testingcolname',
                store: this.store,
                loadMask: true,
                tools: [{
                    id:'print',
                    qtip: bundle.getMsg('app.languaje.report.printview'),
                    handler: function() {
                        App.printView(window['TestingApp'].gridPanel);
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
                        var text = App.getFiltersText(window['TestingApp'].gridPanel);
                        if(text && text!=''){
                            Ext.fly(window['TestingApp'].infoTextItem.getEl()).update(String.format(bundle.getMsg('app.form.filteringby'), text));
                            window['TestingApp'].infoTextItem.getEl().highlight('#FFFF66', {
                                block:true
                            });
                        }
                        else
                            Ext.fly(window['TestingApp'].infoTextItem.getEl()).update('');
                    }
                },
				
                columns: [new Ext.grid.RowNumberer(),{id:'testingcolname', 
                    header: bundle.getMsg('testing.field.code'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'code'
                },{
                    header: bundle.getMsg('testing.field.name'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'name'
                },{
                    header: bundle.getMsg('testing.field.nick'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'nick'
                },{
                    header: bundle.getMsg('testing.field.comment'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'comment'
                },{
                    header: bundle.getMsg('testing.field.parentid'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'parentid'
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
                            window['TestingApp'].gridPanel.getSelectionModel().clearSelections();
                            window['TestingApp'].gridPanel.updateBtn.fireEvent('click', button, eventObject, hideApply, callback);
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
                            var record = window['TestingApp'].gridPanel.getSelectionModel().getSelected();
                            if (record){
                                window['TestingApp'].formPanel.getForm().loadRecord(record);
                            }
                            else
                                window['TestingApp'].formPanel.getForm().reset();
                            window['TestingApp'].showWindow(button.getEl(), hideApply, callback);
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
                                            var records = window['TestingApp'].gridPanel.getSelectionModel().getSelections();
											
                                            var array = new Array();
                                            for (var i=0; i<records.length; i++)
                                                array.push(records[i].get('id'));
												
                                            new Ext.data.Connection().request({
                                                url: config.app_host + '/testing/request/method/delete',
                                                params: {
                                                    ids: Ext.encode(array)
                                                },
                                                failure: requestFailed,
                                                success: requestSuccessful,
                                                callback : function(options, success, response) {
                                                    var object = Ext.decode(response.responseText);
                                                    if(object.success){
                                                        window['TestingApp'].store.load({
                                                            params:{
                                                                start: window['TestingApp'].gridPanel.getBottomToolbar().cursor
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
                            window['TestingApp'].gridPanel.filters.clearFilters();
                            Ext.fly(window['TestingApp'].infoTextItem.getEl()).update('');
                            window['TestingApp'].gridPanel.getSelectionModel().clearSelections();
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
            };;
			
            this.formPanel = new Ext.FormPanel({
                labelWidth: 75,
                labelAlign: 'top',
                url: config.app_host + '/testing/request/method/save',
                frame:true,
                bodyStyle:'padding:5px 5px 0',
                keys: [formKeyMaping],
                items: [{
                    xtype:'textfield',
                    name: 'code',
                    fieldLabel: bundle.getMsg('testing.field.code'), 
                    anchor:'-20'
                },{
                    xtype:'textfield',
                    name: 'name',
                    fieldLabel: bundle.getMsg('testing.field.name'), 
                    anchor:'-20'
                },{
                    xtype:'textfield',
                    name: 'nick',
                    fieldLabel: bundle.getMsg('testing.field.nick'), 
                    anchor:'-20'
                },{
                    xtype:'textfield',
                    name: 'comment',
                    fieldLabel: bundle.getMsg('testing.field.comment'), 
                    anchor:'-20'
                },{
                    xtype:'textfield',
                    name: 'parentid',
                    fieldLabel: bundle.getMsg('testing.field.parentid'), 
                    anchor:'-20'
                }]
            });

        },

        showWindow : function(animateTarget, hideApply, callback){
            window['TestingApp'].window = App.showWindow(bundle.getMsg('testing.window.title'), 370, 230, window['TestingApp'].formPanel, 
                function(button){
                    if(!button){
                        button = new Object;
                        button.id = window['TestingApp'].window.submitBtn.id;
                    }

                    var records = window['TestingApp'].gridPanel.getSelectionModel().getSelections();
							
                    window['TestingApp'].formPanel.getForm().submit({
                        waitTitle : bundle.getMsg('app.msg.wait.title'), 
                        waitMsg: bundle.getMsg('app.msg.wait.text'), 
                        clientValidation: true,
                        params: {
                            entityid: config.multientityapp ? config.app_entityid : '',
                            id: records[0] ? records[0].get('id') : ''
                        },
                        success: function(form, action) {
                            checkSesionExpired(form, action);
                            window['TestingApp'].store.load({
                                params:{
                                    start: window['TestingApp'].gridPanel.getBottomToolbar().cursor
                                }
                            });
                            
                            submitFormSuccessful('TestingApp', form, action, button, !records[0], function(){
                                
                            }, callback);
                        },
                        failure: loadFormFailed
                    });

                }, 
                function(){
                    window['TestingApp'].formPanel.getForm().reset();
                    window['TestingApp'].window.hide();
                }, 
                animateTarget,
                false,
                false,
                false,
                hideApply ? hideApply : false);
        },

        applySecurity : function(groups, permissions){
//            window['TestingApp'].gridPanel.addBtn.setVisible(permissions.indexOf('managetesting') != -1 || permissions.indexOf('managetestingadd') != -1);
//            window['TestingApp'].gridPanel.updateBtn.setVisible(permissions.indexOf('managetesting') != -1 || permissions.indexOf('managetestingedit') != -1);
//            window['TestingApp'].gridPanel.removeBtn.setVisible(permissions.indexOf('managetesting') != -1 || permissions.indexOf('managetestingdelete') != -1);
        }
    }
}();

