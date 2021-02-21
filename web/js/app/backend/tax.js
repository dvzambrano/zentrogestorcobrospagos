/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package SGArqBase
 * @subpackage tax
 * @author MSc. Donel Vázquez Zambrano
 * @version 1.0.0
 */

TaxApp = function() {
    return {
        init : function(TaxApp) {
			
            this.store = new Ext.data.GroupingStore({
                url: config.app_host + '/tax/request/method/load',
                baseParams:{
                    component: 'grid',
                    entityid: config.multientityapp ? config.app_entityid : '',
                    start: 0,
                    limit: config.app_elementsongrid
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(store, records) { 
                        alertNoRecords(records, bundle.getMsg('tax.tab.label').toLowerCase());
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                },
                groupField:'period'
            });

            this.comboStore = new Ext.data.Store({
                url: config.app_host + '/tax/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(store, records) { 
                        alertNoRecords(records, bundle.getMsg('tax.tab.label').toLowerCase());
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });
            
            
            this.monthNames = new Array();
            for (var i=0; i<Date.monthNames.length; i++){
                var month  = new Array();
                month.push(i+1, Date.monthNames[i]);
                this.monthNames.push(month);
            }            
            this.monthsStore = new Ext.data.ArrayStore({
                fields: ['id', 'name']
            }); 
            this.monthsStore.loadData(this.monthNames);
            

            this.selectedBarsComboStore = new Ext.data.GroupingStore({
                url: config.app_host + '/bar/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader(),
                groupField:'year'
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
                }]
            });

            this.infoTextItem = new Ext.Toolbar.TextItem('');
			
            this.gridPanel = new Ext.grid.GridPanel({
                id: 'gridPanelTax',
                region:'center',
                layout: 'fit', 
                iconCls: Ext.ux.Icon('tag_orange'),
                title: config.app_showgridtitle ? bundle.getMsg("tax.grid.title") : '',
                autoExpandColumn: 'taxmaincolumn',
                store: this.store,
                loadMask: true,
                tools: [{
                    id:'print',
                    qtip: bundle.getMsg('app.languaje.report.printview'),
                    handler: function() {
                        App.printView(window['TaxApp'].gridPanel);
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
                        var text = App.getFiltersText(window['TaxApp'].gridPanel);
                        if(text && text!=''){
                            Ext.fly(window['TaxApp'].infoTextItem.getEl()).update(String.format(bundle.getMsg('app.form.filteringby'), text));
                            window['TaxApp'].infoTextItem.getEl().highlight('#FFFF66', {
                                block:true
                            });
                        }
                        else
                            Ext.fly(window['TaxApp'].infoTextItem.getEl()).update('');
                    }
                },
				
                columns: [new Ext.grid.RowNumberer(),{
                    header: bundle.getMsg('tax.field.code'), 
                    width: 60, 
                    sortable: true, 
                    dataIndex: 'code'
                },{
                    header: bundle.getMsg('tax.field.name'), 
                    width: 180, 
                    sortable: true, 
                    dataIndex: 'name'
                },{
                    id:'taxmaincolumn', 
                    header: bundle.getMsg('tax.field.comment'), 
                    width: 260, 
                    sortable: true, 
                    dataIndex: 'comment'
                },{
                    header: bundle.getMsg('tax.field.period'), 
                    width: 60, 
                    hidden: true, 
                    sortable: true, 
                    dataIndex: 'period',
                    renderer : function(val) {
                        switch(val){
                            case 'Y':
                                val = 'Anual';
                                break;
                            case 'M':
                                val = 'Mensual';
                                break;
                            case 'T':
                                val = 'Trimestral';
                                break;
                            default:
                                break;
                        }
                        return val;
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
                            window['TaxApp'].gridPanel.getSelectionModel().clearSelections();
                            window['TaxApp'].gridPanel.updateBtn.fireEvent('click', button, eventObject, hideApply, callback);
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
                            var record = window['TaxApp'].gridPanel.getSelectionModel().getSelected();
                            if (record){
                                window['TaxApp'].formPanel.getForm().loadRecord(record);
                                
                                window['TaxApp'].formPanel.barsGridPanel.setDisabled(false);
                                window['TaxApp'].selectedBarsComboStore.load({
                                    params:{
                                        query: record.get('id')
                                    }
                                });
                            }
                            else{
                                window['TaxApp'].formPanel.getForm().reset();
                                window['TaxApp'].formPanel.barsGridPanel.setDisabled(true);
                            }
                            window['TaxApp'].showWindow(button.getEl(), hideApply, callback);
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
                                            var records = window['TaxApp'].gridPanel.getSelectionModel().getSelections();
											
                                            var array = new Array();
                                            for (var i=0; i<records.length; i++)
                                                array.push(records[i].get('id'));
												
                                            new Ext.data.Connection().request({
                                                url: config.app_host + '/tax/request/method/delete',
                                                params: {
                                                    ids: Ext.encode(array)
                                                },
                                                failure: requestFailed,
                                                success: requestSuccessful,
                                                callback : function(options, success, response) {
                                                    var object = Ext.decode(response.responseText);
                                                    if(object.success){
                                                        window['TaxApp'].store.load({
                                                            params:{
                                                                start: window['TaxApp'].gridPanel.getBottomToolbar().cursor
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
                            window['TaxApp'].gridPanel.filters.clearFilters();
                            Ext.fly(window['TaxApp'].infoTextItem.getEl()).update('');
                            window['TaxApp'].gridPanel.getSelectionModel().clearSelections();
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
                url: config.app_host + '/tax/request/method/save',
                frame:true,
                bodyStyle:'padding:5px 5px 0',
                keys: [formKeyMaping],
                items: [{
                    xtype:'textfield',
                    name: 'name',
                    fieldLabel: bundle.getMsg('tax.field.name')+'<span style="color:red;"><sup>*</sup></span>', 
					allowBlank:false, 
                    anchor:'-20'
                },{
                    layout:'column',
                    items:[{
                        columnWidth:.7,
                        layout: 'form',
                        items: [{
                            xtype:'textarea',
                            name: 'comment',
                            fieldLabel: bundle.getMsg('tax.field.comment'), 
                            anchor:'-20'
                        }]
                    },{
                        columnWidth:.3,
                        layout: 'form',
                        items: [{
                            xtype:'textfield',
                            name: 'code',
                            fieldLabel: bundle.getMsg('tax.field.code')+'<span style="color:red;"><sup>*</sup></span>', 
							allowBlank:false, 
                            anchor:'-20'
                        },new Ext.form.ComboBox({
                            ref: '../../periodCombo',
                            fieldLabel: bundle.getMsg('tax.field.period')+'<span style="color:red;"><sup>*</sup></span>', 
							allowBlank:false, 
                            id: 'periodid',
                            name: 'period',
                            editable: false,
                            store: new Ext.data.ArrayStore({
                                fields: ['id', 'name'],
                                data : [
                                ['M', 'Mensual'],           
                                ['T', 'Trimestral'],           
                                ['Y', 'Anual']
                                ]
                            }),
                            valueField: 'id',    
                            displayField: 'name',
                            typeAhead: true,
                            mode: 'local',
                            triggerAction: 'all',
                            selectOnFocus:true,
                            emptyText: bundle.getMsg('app.form.select'),
                            anchor:'-20'
                        })]
                    }]
                },new Ext.grid.GridPanel({
                    ref: 'barsGridPanel',
                    stripeRows: true,
                    anchor:'-20',
                    height: 280,
                    autoExpandColumn: 'taxbarmaincolumn',
                    store: this.selectedBarsComboStore,
                    sm: new Ext.grid.RowSelectionModel({
                        singleSelect:false, 
                        listeners: {
                            selectionchange: function(selectionModel) {
                                window['TaxApp'].formPanel.barsGridPanel.btnRemove.setDisabled(selectionModel.getCount() < 1);
                            }
                        }
                    }),	
                    
				
                    view: new Ext.grid.GroupingView({
                        markDirty: false,
                        forceFit:true,
                        groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? bundle.getMsg("app.form.elements") : bundle.getMsg("app.form.element")]})'
                    }),
                
                    columns: [new Ext.grid.RowNumberer(), {
                        header: bundle.getMsg('bar.field.year'), 
                        width: 40, 
                        hidden: true, 
                        sortable: true, 
                        dataIndex: 'year'
                    },{
                        id:'taxbarmaincolumn', 
                        header: bundle.getMsg('bar.field.month'), 
                        width: 70, 
                        sortable: true, 
                        dataIndex: 'month',
                        renderer: function (val) {
                            return Date.monthNames[val-1];
                        }
                    },{
                        header: bundle.getMsg('bar.field.general'), 
                        width: 50, 
                        sortable: true, 
                        dataIndex: 'general'
                    },{
                        header: bundle.getMsg('bar.field.simplified'), 
                        width: 50, 
                        sortable: true, 
                        dataIndex: 'simplified'
                    }],				
                
                    tbar: [{
                        xtype: 'displayfield', 
                        value: '&nbsp;&nbsp;'+bundle.getMsg('bar.field.year')+':&nbsp;'
                    },{
                        ref: '../yearField',
                        xtype: 'spinnerfield',
                        minValue: 0,
                        allowDecimals: false,
                        accelerate: true,
                        allowBlank: false, 
                        width: 60
                    },{
                        xtype: 'displayfield', 
                        value: '&nbsp;&nbsp;'+bundle.getMsg('bar.field.month')+':&nbsp;'
                    },new Ext.form.ComboBox({
                        ref: '../monthCombo',
                        editable: false,
                        store: window['TaxApp'].monthsStore,
                        valueField: 'id',    
                        displayField: 'name',
                        tpl: '<tpl for="."><div ext:qtip="{comment}" class="x-combo-list-item">{name}</div></tpl>',
                        typeAhead: true,
                        mode: 'local',
                        triggerAction: 'all',
                        selectOnFocus:true,
                        emptyText: bundle.getMsg('app.form.select'), 
                        width: 90
                    }),{
                        xtype: 'displayfield', 
                        value: '&nbsp;&nbsp;'+bundle.getMsg('bar.field.general')+':&nbsp;'
                    }, {
                        ref: '../generalbarField',
                        xtype:'textfield',
                        allowBlank: false, 
                        width: 50
                    },{
                        xtype: 'displayfield', 
                        value: '&nbsp;&nbsp;'+bundle.getMsg('bar.field.simplified')+':&nbsp;'
                    }, {
                        ref: '../simplifiedbarField',
                        xtype:'textfield',
                        allowBlank: false, 
                        width: 50
                    },'->',{
                        tooltip: bundle.getMsg('app.form.addrow'),
                        iconCls: Ext.ux.Icon('table_row_insert'),
                        listeners: {
                            click: function(button, eventObject) { 
                                var record = window['TaxApp'].gridPanel.getSelectionModel().getSelected();
                                if(window['TaxApp'].formPanel.barsGridPanel.yearField.isValid() && window['TaxApp'].formPanel.barsGridPanel.monthCombo.isValid() && window['TaxApp'].formPanel.barsGridPanel.generalbarField.isValid() && window['TaxApp'].formPanel.barsGridPanel.simplifiedbarField.isValid() && record){
                                   
                                    new Ext.data.Connection().request({
                                        url: config.app_host + '/bar/request/method/save',
                                        params: {
                                            year: window['TaxApp'].formPanel.barsGridPanel.yearField.getValue(),
                                            taxid: record.get('id'),
                                            general: window['TaxApp'].formPanel.barsGridPanel.generalbarField.getValue(),
                                            simplified: window['TaxApp'].formPanel.barsGridPanel.simplifiedbarField.getValue(),
                                            monthid: window['TaxApp'].formPanel.barsGridPanel.monthCombo.getValue()
                                        },
                                        failure: requestFailed,
                                        success: requestSuccessful,
                                        callback : function(options, success, response) {
                                            var object = Ext.decode(response.responseText);
                                            if(object.success){
                                                var record = window['TaxApp'].gridPanel.getSelectionModel().getSelected();
                                                window['TaxApp'].selectedBarsComboStore.load({
                                                    params:{
                                                        query: record.get('id')
                                                    }
                                                });
                                            }
                                            else
                                                requestFailed(response, false);
                                                    
                                        }
                                    });
                                            
                                    window['TaxApp'].formPanel.barsGridPanel.yearField.reset();
                                    window['TaxApp'].formPanel.barsGridPanel.monthCombo.reset();
                                    window['TaxApp'].formPanel.barsGridPanel.generalbarField.reset();
                                    window['TaxApp'].formPanel.barsGridPanel.simplifiedbarField.reset(); 
                                }
                            }
                        }
                    },{
                        ref: '../btnRemove',
                        tooltip: bundle.getMsg('app.form.deleterow'),
                        disabled: true,
                        iconCls: Ext.ux.Icon('table_row_delete'),
                        listeners: {
                            click: function(button, eventObject) {
                                Ext.Msg.show({
                                    title: bundle.getMsg('app.msg.warning.title'),
                                    msg: bundle.getMsg('app.msg.warning.deleteselected.text'),
                                    buttons: Ext.Msg.YESNO,
                                    fn: function(btn, text){
                                        if (btn == 'yes'){			
                                            var records = window['TaxApp'].formPanel.barsGridPanel.getSelectionModel().getSelections();
											
                                            var array=new Array();                                
                                            for (var i=0; i<records.length; i++)
                                                array.push(records[i].get('id'));
												
                                            new Ext.data.Connection().request({
                                                url: config.app_host + '/bar/request/method/delete',
                                                params: {
                                                    ids: Ext.encode(array)
                                                },
                                                failure: requestFailed,
                                                success: requestSuccessful,
                                                callback : function(options, success, response) {
                                                    var object = Ext.decode(response.responseText);
                                                    if(object.success){
                                                        var record = window['TaxApp'].gridPanel.getSelectionModel().getSelected();
                                                        window['TaxApp'].selectedBarsComboStore.load({
                                                            params:{
                                                                query: record.get('id')
                                                            }
                                                        });
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
                            }
                        }
                    }]
                })]
            });

        },

        showWindow : function(animateTarget, hideApply, callback){
            window['TaxApp'].window = App.showWindow(bundle.getMsg('tax.window.title'), 630, 530, window['TaxApp'].formPanel, 
                function(button){
                    if(!button){
                        button = new Object;
                        button.id = window['TaxApp'].window.submitBtn.id;
                    }

                    var records = window['TaxApp'].gridPanel.getSelectionModel().getSelections();
							
                    window['TaxApp'].formPanel.getForm().submit({
                        waitTitle : bundle.getMsg('app.msg.wait.title'), 
                        waitMsg: bundle.getMsg('app.msg.wait.text'), 
                        clientValidation: true,
                        params: {
                            entityid: config.multientityapp ? config.app_entityid : '',
                            id: records[0] ? records[0].get('id') : '',
                            periodid: window['TaxApp'].formPanel.periodCombo.getValue()
                        },
                        success: function(form, action) {
                            checkSesionExpired(form, action);
                            window['TaxApp'].store.load({
                                params:{
                                    start: window['TaxApp'].gridPanel.getBottomToolbar().cursor
                                }
                            });
                            
                            submitFormSuccessful('TaxApp', form, action, button, !records[0], function(){
                                window['TaxApp'].selectedBarsComboStore.removeAll();
                                
                            }, callback);
                        },
                        failure: loadFormFailed
                    });

                }, 
                function(){
                    window['TaxApp'].formPanel.getForm().reset();
                    window['TaxApp'].selectedBarsComboStore.removeAll();
                    window['TaxApp'].window.hide();
                }, 
                animateTarget,
                false,
                false,
                false,
                hideApply ? hideApply : false);
        },

        applySecurity : function(groups, permissions){
            window['TaxApp'].gridPanel.addBtn.setVisible(permissions.indexOf('managetax') != -1 || permissions.indexOf('managetaxadd') != -1);
            window['TaxApp'].gridPanel.updateBtn.setVisible(permissions.indexOf('managetax') != -1 || permissions.indexOf('managetaxedit') != -1);
            window['TaxApp'].gridPanel.removeBtn.setVisible(permissions.indexOf('managetax') != -1 || permissions.indexOf('managetaxdelete') != -1);
        }
    }
}();

