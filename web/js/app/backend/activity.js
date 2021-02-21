/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package SGArqBase
 * @subpackage activity
 * @author MSc. Donel Vázquez Zambrano
 * @version 1.0.0
 */

ActivityApp = function() {
    return {
        init : function(ActivityApp) {
			
            this.store = new Ext.data.GroupingStore({
                url: config.app_host + '/activity/request/method/load',
                baseParams:{
                    component: 'grid',
                    entityid: config.multientityapp ? config.app_entityid : '',
                    start: 0,
                    limit: config.app_elementsongrid
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(store, records) { 
                        alertNoRecords(records, bundle.getMsg('activity.tab.label').toLowerCase());
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });

            this.comboStore = new Ext.data.Store({
                url: config.app_host + '/activity/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(store, records) { 
                        alertNoRecords(records, bundle.getMsg('activity.tab.label').toLowerCase());
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });
            
            this.selectedElementsComboStore = new Ext.data.Store({
                url: config.app_host + '/activity/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader()
            });
            
            this.selectedTaxesComboStore = new Ext.data.Store({
                url: config.app_host + '/activity/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader()
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
                id: 'gridPanelActivity',
                region:'center',
                layout: 'fit', 
                iconCls: Ext.ux.Icon('tag_orange'),
                title: config.app_showgridtitle ? bundle.getMsg("activity.grid.title") : '',
                autoExpandColumn: 'activitymaincolumn',
                store: this.store,
                loadMask: true,
                tools: [{
                    id:'print',
                    qtip: bundle.getMsg('app.languaje.report.printview'),
                    handler: function() {
                        App.printView(window['ActivityApp'].gridPanel);
                    }
                }],
                keys: [panelKeysMap],
            
                listeners: {
                    activate: function(gridpanel){
                        window['ElementApp'].comboStore.load();
                        window['TaxApp'].comboStore.load();
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
                        var text = App.getFiltersText(window['ActivityApp'].gridPanel);
                        if(text && text!=''){
                            Ext.fly(window['ActivityApp'].infoTextItem.getEl()).update(String.format(bundle.getMsg('app.form.filteringby'), text));
                            window['ActivityApp'].infoTextItem.getEl().highlight('#FFFF66', {
                                block:true
                            });
                        }
                        else
                            Ext.fly(window['ActivityApp'].infoTextItem.getEl()).update('');
                    }
                },
				
                columns: [new Ext.grid.RowNumberer(),{
                    id:'activitymaincolumn', 
                    header: bundle.getMsg('activity.field.name'), 
                    width: 260, 
                    sortable: true, 
                    dataIndex: 'name'
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
                            window['ActivityApp'].gridPanel.getSelectionModel().clearSelections();
                            window['ActivityApp'].gridPanel.updateBtn.fireEvent('click', button, eventObject, hideApply, callback);
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
                            var record = window['ActivityApp'].gridPanel.getSelectionModel().getSelected();
                            if (record){
                                window['ActivityApp'].formPanel.getForm().loadRecord(record);
                                
                                var val = record.get('fixed');                                
                                window['ActivityApp'].formPanel.tabPanel.generalPanel.percentageRadioGroup.setValue('activitypercentage', !val);
                                window['ActivityApp'].formPanel.tabPanel.generalPanel.percentageRadioGroup.setValue('activityfixed', val);
                                
                                var i, index;
                                var elements = record.get('Elements');
                                if (elements)											
                                    for (i = 0; i < elements.length; i++){
                                        index = window['ElementApp'].comboStore.find('id', elements[i].id);
                                        if (index > -1)
                                            window['ActivityApp'].selectedElementsComboStore.add(window['ElementApp'].comboStore.getAt(index));
                                    }
                                var taxes =record.get('Taxes');
                                if (taxes)	
                                    for (i = 0; i < taxes.length; i++){
                                        index = window['TaxApp'].comboStore.find('id', taxes[i].id);
                                        if (index > -1){   
                                            var currentrecord = window['TaxApp'].comboStore.getAt(index);
                                            var relpos = taxes[i].TaxActivityRelation.length-1;
                                            currentrecord.set('amount', taxes[i].TaxActivityRelation[relpos].amount);
                                            currentrecord.set('fixed', taxes[i].TaxActivityRelation[relpos].fixed);
                                        
                                            var str = taxes[i].TaxActivityRelation[relpos].amount;
                                            if(taxes[i].TaxActivityRelation[relpos].fixed)
                                                str = '$' + str;
                                            else
                                                str = str + '%';
                                            currentrecord.set('amountstr', str);
                                            
                                            window['ActivityApp'].selectedTaxesComboStore.add(currentrecord);
                                        }
                                    }
                                
                            }
                            else
                                window['ActivityApp'].formPanel.getForm().reset();
                            window['ActivityApp'].showWindow(button.getEl(), hideApply, callback);
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
                                            var records = window['ActivityApp'].gridPanel.getSelectionModel().getSelections();
											
                                            var array = new Array();
                                            for (var i=0; i<records.length; i++)
                                                array.push(records[i].get('id'));
												
                                            new Ext.data.Connection().request({
                                                url: config.app_host + '/activity/request/method/delete',
                                                params: {
                                                    ids: Ext.encode(array)
                                                },
                                                failure: requestFailed,
                                                success: requestSuccessful,
                                                callback : function(options, success, response) {
                                                    var object = Ext.decode(response.responseText);
                                                    if(object.success){
                                                        window['ActivityApp'].store.load({
                                                            params:{
                                                                start: window['ActivityApp'].gridPanel.getBottomToolbar().cursor
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
                            window['ActivityApp'].gridPanel.filters.clearFilters();
                            Ext.fly(window['ActivityApp'].infoTextItem.getEl()).update('');
                            window['ActivityApp'].gridPanel.getSelectionModel().clearSelections();
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
                url: config.app_host + '/activity/request/method/save',
                layout:'fit',
                border:false,					        
                keys: [formKeyMaping],
                items: [new Ext.TabPanel({
                    ref: 'tabPanel',
                    defaults:{
                        autoHeight:false, 
                        border:false
                    }, 			
                    activeTab: 0,
                    border:false,
                    items:[{
                        ref: 'generalPanel',
                        title: bundle.getMsg('app.form.generaldata'),
                        frame:true,	
                        border:false,	
                        layout:'form',
                        bodyStyle:'padding:5px',
                        items: [{
                            xtype:'textfield',
                            name: 'name',
                            fieldLabel: bundle.getMsg('activity.field.name')+'<span style="color:red;"><sup>*</sup></span>', 
							allowBlank:false, 
                            anchor:'-20'
                        },{
                            layout:'column',
                            items:[{
                                columnWidth:.5,
                                layout: 'form',
                                items: [{
                                    layout:'column',
                                    items:[{
                                        columnWidth:.4,
                                        layout: 'form',
                                        items: [{
                                            xtype:'textfield',
                                            name: 'onatcode',
                                            fieldLabel: bundle.getMsg('activity.field.onatcode'), 
                                            anchor:'-20'
                                        }]
                                    },{
                                        columnWidth:.4,
                                        layout: 'form',
                                        items: [{
                                            xtype:'textfield',
                                            name: 'mtsscode',
                                            fieldLabel: bundle.getMsg('activity.field.mtsscode'), 
                                            anchor:'-20'
                                        }]
                                    }]
                                }]
                            },{
                                columnWidth:.5,
                                layout: 'form',
                                items: [{
                                    layout:'column',
                                    items:[{
                                        columnWidth:.4,
                                        layout: 'form',
                                        items: [{
                                            ref: '../../../../amountField',
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
                                                ref: 'typeField',
                                                width: 25,
                                                xtype: 'displayfield',
                                                value: ' '
                                            }]
                                        }]
                                    },{
                                        columnWidth:.55,
                                        layout: 'form',
                                        items: [{
                                            ref: '../../../../percentageRadioGroup',
                                            xtype: 'radiogroup',
                                            fieldLabel: '',
                                            labelSeparator: '',
                                            items: [{
                                                boxLabel: bundle.getMsg('app.form.fixedvalue'), 
                                                id: 'activityfixed', 
                                                name: 'fixed', 
                                                inputValue: true, 
                                                checked: true
                                            },{
                                                boxLabel: bundle.getMsg('app.form.percent'), 
                                                id: 'activitypercentage',
                                                name: 'fixed', 
                                                inputValue: false
                                            }],
                                            listeners: {
                                                change: function(radioGroup, radio) {
                                                    if (radio.getId() == 'activitypercentage')
                                                        window['ActivityApp'].formPanel.tabPanel.generalPanel.amountField.typeField.setValue('%');
                                                    else
                                                        window['ActivityApp'].formPanel.tabPanel.generalPanel.amountField.typeField.setValue(' ');
                                                }
                                            }
                                        }]
                                    }]
                                }]
                            }]
                        },{
                            xtype:'textarea',
                            name: 'comment',
                            height: 90,
                            fieldLabel: bundle.getMsg('activity.field.comment'), 
                            anchor:'-20'
                        }]
                    }, new Ext.grid.GridPanel({
                        ref: 'taxesGridPanel',
                        stripeRows: true,
                        autoExpandColumn: 'activitytaxmaincolumn',
                        title: bundle.getMsg('tax.tab.label'),	
                        iconCls: Ext.ux.Icon('coins'),
                        store: this.selectedTaxesComboStore,
                        sm: new Ext.grid.RowSelectionModel({
                            singleSelect:true, 
                            listeners: {
                                selectionchange: function(selectionModel) {
                                    window['ActivityApp'].formPanel.tabPanel.taxesGridPanel.removeBtn.setDisabled(selectionModel.getCount() < 1);
                                }
                            }
                        }),	
                        view: new Ext.grid.GridView({
                            markDirty: false,
                            forceFit:true
                        }),
                        columns: [new Ext.grid.RowNumberer(),{
                            header: bundle.getMsg('tax.field.code'),
                            width: 40, 
                            sortable: true, 
                            dataIndex: 'code'
                        },{
                            id:'activitytaxmaincolumn', 
                            header: bundle.getMsg('tax.field.name'),
                            width: 140, 
                            sortable: true, 
                            dataIndex: 'name'
                        },{
                            header: bundle.getMsg('tax.field.amount'),
                            width: 50, 
                            sortable: true, 
                            dataIndex: 'amountstr'
                        }],
                        tbar: [new Ext.Toolbar.TextItem(bundle.getMsg('app.form.name')+': '),new Ext.form.ComboBox({
                            ref: '../elementCombo',
                            store: window['TaxApp'].comboStore,
                            width: 230, 
                            emptyText: bundle.getMsg('app.form.typehere'),
                            minChars: 1, //para q busque a partir de 1 caracter...
                            displayField: 'name',
                            typeAhead: false,
                            loadingText: bundle.getMsg('app.msg.wait.searching'),
                            pageSize: config.app_elementsongrid/2,
                            hideTrigger:true,
                            tpl: new Ext.XTemplate(
                                '<tpl for="."><div class="search-item">',
                                '<h3>{code}</h3>',
                                '{name}',
                                '</div></tpl>'
                                ),
                            itemSelector: 'div.search-item',
                            listeners: {
                                beforequery: function(queryEvent) {
                                    var taxes = new Array();
                                    
                                    var r = new Object;
                                    r.id = config.app_maintax;
                                    taxes.push(r);
                                    
                                    window['ActivityApp'].selectedTaxesComboStore.each(function(record){
                                        var r = new Object;
                                        r.id = record.get('id');
                                        taxes.push(r);
                                    });
                                    window['TaxApp'].comboStore.baseParams.distinct = Ext.encode(taxes);
                                    this.setValue(queryEvent.query);
                                },
                                select: function(combo, record, index ){
                                    window['ActivityApp'].taxRecord = record;
                                    this.collapse();
                                },
                                blur: function(field) {		
                                    if(field.getRawValue() == '')
                                        window['ActivityApp'].taxRecord = false;
                                    else {
                                        var record = field.getStore().getAt(field.getStore().find('name',field.getRawValue(), 0, true, true));								 
                                        if(record && record.get('name') == field.getRawValue())
                                            window['ActivityApp'].taxRecord = record;
                                        else 
                                            window['ActivityApp'].taxRecord = false;
                                    }
                                    window['TaxApp'].comboStore.baseParams.distinct = '';
                                }
                            }
                        }),{
                            xtype: 'displayfield', 
                            value: '&nbsp;&nbsp;'
                        },{
                            ref: '../fixedRadioGroup',
                            xtype: 'radiogroup',
                            width: 140, 
                            labelSeparator: '',
                            items: [{
                                boxLabel: bundle.getMsg('app.form.fixedvalue'), 
                                id: 'activitytaxfixed', 
                                name: 'activitytaxfixed', 
                                inputValue: true, 
                                checked: true
                            },{
                                boxLabel: bundle.getMsg('app.form.percent'), 
                                id: 'activitytaxpercentage',
                                name: 'activitytaxfixed', 
                                inputValue: false
                            }],
                            listeners: {
                                change: function(radioGroup, radio) {
                                    if (radio.getId() != 'activitytaxfixed')
                                        window['ActivityApp'].formPanel.tabPanel.taxesGridPanel.amounttypeField.setValue('%');
                                    else
                                        window['ActivityApp'].formPanel.tabPanel.taxesGridPanel.amounttypeField.setValue(' ');
                                }
                            }
                        },{
                            xtype: 'displayfield', 
                            value: '&nbsp;&nbsp;'
                        },new Ext.ux.form.SpinnerField({
                            ref: '../amountField',
                            width: 70,
                            minValue: 0,
                            allowDecimals: true,
                            decimalPrecision: 1,
                            incrementValue: 0.5,
                            accelerate: true
                        }),{
                            xtype: 'displayfield', 
                            value: '&nbsp;&nbsp;'
                        },{
                            ref: '../amounttypeField',
                            xtype: 'displayfield',
                            value: ' '
                        }, '->',{
                            tooltip: bundle.getMsg('app.form.addrow'),
                            iconCls: Ext.ux.Icon('table_row_insert'),
                            listeners: {
                                click: function(button, eventObject) {                            
                                    if(window['ActivityApp'].taxRecord && window['ActivityApp'].formPanel.tabPanel.taxesGridPanel.amountField.isValid()){
                                        var fixed = window['ActivityApp'].formPanel.tabPanel.taxesGridPanel.fixedRadioGroup.getValue().getId()=='activitytaxfixed';
                                        
                                        window['ActivityApp'].taxRecord.set('amount', window['ActivityApp'].formPanel.tabPanel.taxesGridPanel.amountField.getValue());
                                        window['ActivityApp'].taxRecord.set('fixed', fixed);
                                        
                                        var str = window['ActivityApp'].formPanel.tabPanel.taxesGridPanel.amountField.getValue();
                                        if(fixed)
                                            str = '$'+str;
                                        else
                                            str = str+'%';
                                        window['ActivityApp'].taxRecord.set('amountstr', str);
                                        
                                        
                                        window['ActivityApp'].selectedTaxesComboStore.insert(window['ActivityApp'].selectedTaxesComboStore.getCount(), window['ActivityApp'].taxRecord);
                                        
                                        
                                        window['ActivityApp'].formPanel.tabPanel.taxesGridPanel.reconfigure(window['ActivityApp'].formPanel.tabPanel.taxesGridPanel.getStore(), window['ActivityApp'].formPanel.tabPanel.taxesGridPanel.getColumnModel());
                                        
                                        window['ActivityApp'].formPanel.tabPanel.taxesGridPanel.amountField.reset();
                                        window['ActivityApp'].formPanel.tabPanel.taxesGridPanel.fixedRadioGroup.reset();
                                        window['ActivityApp'].formPanel.tabPanel.taxesGridPanel.elementCombo.reset();
                                        
                                        window['ActivityApp'].taxRecord = false;
                                    }
                                }
                            }
                        },{
                            ref: '../removeBtn',
                            tooltip: bundle.getMsg('app.form.deleterow'),
                            disabled: true,
                            iconCls: Ext.ux.Icon('table_row_delete'),
                            listeners: {
                                click: function(button, eventObject) {
                                    var records = window['ActivityApp'].formPanel.tabPanel.taxesGridPanel.getSelectionModel().getSelections();
                                    window['ActivityApp'].selectedTaxesComboStore.remove(records);
                                }
                            }
                        }]
                    }), new Ext.grid.GridPanel({
                        ref: 'elementsGridPanel',
                        title: bundle.getMsg('element.tab.label'),	
                        iconCls: Ext.ux.Icon('bricks'),
                        stripeRows: true,
                        autoExpandColumn: 'activityelementmaincolumn',
                        store: this.selectedElementsComboStore,
                        sm: new Ext.grid.RowSelectionModel({
                            singleSelect:true, 
                            listeners: {
                                selectionchange: function(selectionModel) {
                                    window['ActivityApp'].formPanel.tabPanel.elementsGridPanel.removeBtn.setDisabled(selectionModel.getCount() < 1);
                                }
                            }
                        }),	
                        view: new Ext.grid.GridView({
                            markDirty: false,
                            forceFit:true
                        }),
                        columns: [new Ext.grid.RowNumberer(), {
                            header: bundle.getMsg('element.field.name'),
                            width: 60, 
                            sortable: true, 
                            dataIndex: 'name'
                        },{
                            id: 'activityelementmaincolumn', 
                            header: bundle.getMsg('element.field.comment'),
                            width: 130, 
                            sortable: true, 
                            dataIndex: 'comment'
                        }],
                        tbar: [new Ext.Toolbar.TextItem(bundle.getMsg('app.form.name')+': '),new Ext.form.ComboBox({
                            ref: '../elementCombo',
                            store: window['ElementApp'].comboStore,
                            width: 230, 
                            emptyText: bundle.getMsg('app.form.typehere'),
                            minChars: 1, //para q busque a partir de 1 caracter...
                            displayField: 'name',
                            typeAhead: false,
                            loadingText: bundle.getMsg('app.msg.wait.searching'),
                            pageSize: config.app_elementsongrid/2,
                            hideTrigger:true,
                            tpl: new Ext.XTemplate(
                                '<tpl for="."><div class="search-item">',
                                '<h3>{name}</h3>',
                                '{comment}',
                                '</div></tpl>'
                                ),
                            itemSelector: 'div.search-item',
                            listeners: {
                                beforequery: function(queryEvent) {
                                    var elements = new Array();
                                    window['ActivityApp'].selectedElementsComboStore.each(function(record){
                                        var r = new Object;
                                        r.id = record.get('id');
                                        elements.push(r);
                                    });
                                    window['ElementApp'].comboStore.baseParams.distinct = Ext.encode(elements);
                                    this.setValue(queryEvent.query);
                                },
                                select: function(combo, record, index ){
                                    window['ActivityApp'].elementRecord = record;
                                    this.collapse();
                                },
                                blur: function(field) {		
                                    if(field.getRawValue() == '')
                                        window['ActivityApp'].elementRecord = false;
                                    else {
                                        var record = field.getStore().getAt(field.getStore().find('name',field.getRawValue(), 0, true, true));								 
                                        if(record && record.get('name') == field.getRawValue())
                                            window['ActivityApp'].elementRecord = record;
                                        else 
                                            window['ActivityApp'].elementRecord = false;
                                    }
                                    window['ElementApp'].comboStore.baseParams.distinct = '';
                                }
                            }
                        }), '->',{
                            tooltip: bundle.getMsg('app.form.addrow'),
                            iconCls: Ext.ux.Icon('table_row_insert'),
                            listeners: {
                                click: function(button, eventObject) {                            
                                    if(window['ActivityApp'].elementRecord){
                                        window['ActivityApp'].selectedElementsComboStore.insert(window['ActivityApp'].selectedElementsComboStore.getCount(), window['ActivityApp'].elementRecord);
                                        
                                        window['ActivityApp'].formPanel.tabPanel.elementsGridPanel.reconfigure(window['ActivityApp'].formPanel.tabPanel.elementsGridPanel.getStore(), window['ActivityApp'].formPanel.tabPanel.elementsGridPanel.getColumnModel());
                                        
                                        window['ActivityApp'].formPanel.tabPanel.elementsGridPanel.elementCombo.reset();
                                        window['ActivityApp'].elementRecord = false;
                                    }
                                }
                            }
                        },{
                            ref: '../removeBtn',
                            tooltip: bundle.getMsg('app.form.deleterow'),
                            disabled: true,
                            iconCls: Ext.ux.Icon('table_row_delete'),
                            listeners: {
                                click: function(button, eventObject) {
                                    var records = window['ActivityApp'].formPanel.tabPanel.elementsGridPanel.getSelectionModel().getSelections();
                                    window['ActivityApp'].selectedElementsComboStore.remove(records);
                                }
                            }
                        }]
                    })]
                })]
            });

        },

        showWindow : function(animateTarget, hideApply, callback){
            window['ActivityApp'].window = App.showWindow(bundle.getMsg('activity.window.title'), 620, 340, window['ActivityApp'].formPanel, 
                function(button){
                    if(!button){
                        button = new Object;
                        button.id = window['ActivityApp'].window.submitBtn.id;
                    }

                    var elements = new Array();
                    window['ActivityApp'].selectedElementsComboStore.each(function(record){
                        var r = new Object;
                        r.id = record.get('id');
                        elements.push(r);
                    });
                    
                    var taxes = new Array();
                    window['ActivityApp'].selectedTaxesComboStore.each(function(record){
                        var r = new Object;
                        r.id = record.get('id');
                        r.amount = record.get('amount');
                        r.fixed = record.get('fixed');
                        taxes.push(r);
                    });
                    var records = window['ActivityApp'].gridPanel.getSelectionModel().getSelections();
							
                    window['ActivityApp'].formPanel.getForm().submit({
                        waitTitle : bundle.getMsg('app.msg.wait.title'), 
                        waitMsg: bundle.getMsg('app.msg.wait.text'), 
                        clientValidation: true,
                        params: {
                            entityid: config.multientityapp ? config.app_entityid : '',
                            id: records[0] ? records[0].get('id') : '',
                            elements: Ext.encode(elements),
                            taxes: Ext.encode(taxes)
                        },
                        success: function(form, action) {
                            checkSesionExpired(form, action);
                            window['ActivityApp'].store.load({
                                params:{
                                    start: window['ActivityApp'].gridPanel.getBottomToolbar().cursor
                                }
                            });
                            
                            submitFormSuccessful('ActivityApp', form, action, button, !records[0], function(){
                                window['ActivityApp'].selectedTaxesComboStore.removeAll();
                                window['ActivityApp'].selectedElementsComboStore.removeAll();
                                
                            }, callback);
                        },
                        failure: loadFormFailed
                    });

                }, 
                function(){
                    window['ActivityApp'].formPanel.getForm().reset();
                    window['ActivityApp'].selectedTaxesComboStore.removeAll();
                    window['ActivityApp'].selectedElementsComboStore.removeAll();
                    window['ActivityApp'].window.hide();
                }, 
                animateTarget,
                false,
                false,
                false,
                hideApply ? hideApply : false);
        },

        applySecurity : function(groups, permissions){
            window['ActivityApp'].gridPanel.addBtn.setVisible(permissions.indexOf('manageactivity') != -1 || permissions.indexOf('manageactivityadd') != -1);
            window['ActivityApp'].gridPanel.updateBtn.setVisible(permissions.indexOf('manageactivity') != -1 || permissions.indexOf('manageactivityedit') != -1);
            window['ActivityApp'].gridPanel.removeBtn.setVisible(permissions.indexOf('manageactivity') != -1 || permissions.indexOf('manageactivitydelete') != -1);
        }
    }
}();

