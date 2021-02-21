Ext.ux.grid.GroupSummary.Calculations['totalCost'] = function(v, record, field){
    return v + (record.data.estimate * record.data.rate);
};
var summary = new Ext.ux.grid.GroupSummary();

TransactionApp = function() {
    return {
        init : function(TransactionApp) {
						
            this.store = new Ext.data.GroupingStore({
                url: config.app_host + '/transaction/request/method/load',
                baseParams:{
                    component: 'grid',
                    start:0,
					limit: 1000000
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: function(store, records, options){
                        store.each(function(record){
                            var obj = window['TransactionApp'].formatTransactionAnnexes(record);
                            record.set('obj', obj);
                        });  
                        
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : function(){}
                },
                groupField:'person'
            });
            
            this.comboStore = new Ext.data.Store({
                url: config.app_host + '/transaction/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(){},
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : function(){}
                }
            });
			
            this.filters = new Ext.ux.grid.GridFilters({
                encode: true,
                local: false,
                menuFilterText: bundle.getMsg('app.languaje.find.label'),
                filters: [{
                    type: 'numeric',
                    dataIndex: 'debit'
                },{
                    type: 'numeric',
                    dataIndex: 'credit'
                },{
                    type: 'date',
                    dataIndex: 'creationdate',
                    beforeText: bundle.getMsg('app.languaje.beforethandate'),
                    afterText: bundle.getMsg('app.languaje.afterthandate'),
                    onText: bundle.getMsg('app.languaje.ondate'),
                    dateFormat: Date.patterns.NonISO8601Short
                },{
                    type: 'numeric',
                    dataIndex: 'person_id'
                }]
            });
            
            this.expander = new Ext.ux.grid.RowExpander({
                tpl : new Ext.Template('{obj}')
            });
			
            this.gridPanel = new Ext.grid.GridPanel({
                id: 'gridPanelTransaction',
                region:'center',
                layout: 'fit', 
                title: config.app_showgridtitle ? bundle.getMsg("transaction.grid.title") : '',
                iconCls: Ext.ux.Icon('creditcards'),
                autoExpandColumn: 'transactionautoexpandcolumn',
                store: this.store,
                loadMask: true,
				
                columns:[this.expander, {
                    xtype: 'datecolumn', 
                    format: Date.patterns.NonISO8601Short, 
                    header: bundle.getMsg('app.form.date'), 
                    width: 80, 
                    summaryType: 'count',
                    summaryRenderer: function(v, params, data){
                        return ((v === 0 || v > 1) ? '<b>(' + v +' '+bundle.getMsg("transaction.tab.label")+')</b>' : '<b>(1 '+bundle.getMsg("transaction.field.label")+')<b>');
                    },
                    dataIndex: 'creationdate'
                },{
                    id:'transactionautoexpandcolumn', 
                    header: bundle.getMsg('app.form.comment'),
                    width: 200,
                    dataIndex: 'comment'
                },{
                    header: bundle.getMsg('person.field.label'),
                    width: 100,
                    hidden: true,
                    dataIndex: 'person'
                },{
                    header: bundle.getMsg('transaction.field.debit'), 
                    width: 80, 
                    sortable: true, 
                    summaryType: 'sum',
                    summaryRenderer: function(v, params, data){
                        return '<b>$'+ parseFloat(v).toFixed(2) +'</b>';
                    },
                    renderer : 'usMoney', 
                    dataIndex: 'balancedebit'
                },{
                    header: bundle.getMsg('transaction.field.credit'), 
                    width: 80, 
                    sortable: true, 
                    summaryType: 'sum',
                    summaryRenderer: function(v, params, data){
                        return '<b>$'+ parseFloat(v).toFixed(2) +'</b>';
                    },
                    renderer : 'usMoney', 
                    dataIndex: 'balancecredit'
                },{
                    header: bundle.getMsg('transaction.field.label'), 
                    width: 80, 
                    sortable: true,
                    renderer : 'usMoney',
                    dataIndex: 'balance'
                },{
                    header: ' ',
                    width: 100,
                    hidden: true,
                    dataIndex: 'person_id'
                }],
				
                view: new Ext.grid.GroupingView({
                    markDirty: false,
                    forceFit:true,
                    groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? bundle.getMsg("app.form.elements") : bundle.getMsg("app.form.element")]})'
                }),
				
                plugins: [this.filters, summary, this.expander],
				
                stripeRows: true,
            
                listeners: {
                    activate: function(gridpanel){
                        
                    }
                },
                
                tbar: [new Ext.Toolbar.TextItem(bundle.getMsg('app.form.name')+': '), new Ext.form.ComboBox({
                    store: window['PersonApp'].comboStore,
                    id: 'transactionperson',
                    width: 320, 
                    emptyText: bundle.getMsg('app.form.typehere'),
                    minChars: 1, //para q busque a partir de 1 caracter...
                    displayField: 'full_name',
                    typeAhead: false,
                    loadingText: bundle.getMsg('app.msg.wait.searching'),
                    pageSize: config.app_elementsongrid/2,
                    hideTrigger:true,
                    tpl: new Ext.XTemplate(
                        '<tpl for="."><div class="search-item">',
                        '<h3><span>{code}</span>{full_name}</h3>',
                        '{address}',
                        '</div></tpl>'
                        ),
                    itemSelector: 'div.search-item',
                    listeners: {
                        beforequery: function(queryEvent) {  
                            this.setValue(queryEvent.query);
                        },
                        select: function(combo, record, index ){
                            window['TransactionApp'].personRecord = record;
                            this.collapse();
                        },
                        blur: function(field) {		
                            if(field.getRawValue() == '')
                                window['TransactionApp'].personRecord = false;
                            else {
                                var record = field.getStore().getAt(field.getStore().find('full_name',field.getRawValue(), 0, true, true));								 
                                if(record && record.get('full_name') == field.getRawValue())
                                    window['TransactionApp'].personRecord = record;
                                else 
                                    window['TransactionApp'].personRecord = false;
                            }
                        }
                    },
                    allowBlank:false
                }),{
                    xtype: 'displayfield', 
                    value: '&nbsp;&nbsp;'
                }, new Ext.Toolbar.TextItem(bundle.getMsg('app.form.since')+':'), {
                    xtype:'datefield',
                    id: 'transactionfromdate',
                    allowBlank:false
                }, new Ext.Toolbar.TextItem('  '+bundle.getMsg('app.form.to')+':'), {
                    xtype:'datefield',
                    id: 'transactiontodate',
                    allowBlank:false
                },{
                    text: bundle.getMsg('app.form.apply'),
                    iconCls: Ext.ux.Icon('tickpluss', 'myicons'),
                    handler: function(){
                        //                        window['TransactionApp'].personRecord
                        
                        if (Ext.getCmp('transactionperson').isValid() && Ext.getCmp('transactionfromdate').isValid() && Ext.getCmp('transactiontodate').isValid()){
                            window['TransactionApp'].startdate = Ext.getCmp('transactionfromdate').getValue();
                            window['TransactionApp'].enddate = Ext.getCmp('transactiontodate').getValue();
                            
                            window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setValue({
                                'after': window['TransactionApp'].startdate,
                                'before': window['TransactionApp'].enddate
                            });
                            window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setActive(true);
                            
                            window['TransactionApp'].gridPanel.filters.getFilter('person_id').setValue({
                                'eq': window['TransactionApp'].personRecord.id
                            });
                            
                            window['TransactionApp'].gridPanel.filters.getFilter('person_id').setActive(true);
                            
                            window['TransactionApp'].gridPanel.filters.reload();
                            
                            
                            Ext.getCmp('transactionallfilter').setChecked(false);
                        }
                    }
                },'-',{
                    text: bundle.getMsg('app.form.applyfilters'),
                    iconCls: Ext.ux.Icon('table_gear'),
                    menu : {
                        items: [{
                            id: 'transactionallfilter',
                            text: bundle.getMsg('transaction.filter.all'),
                            checked: true,
                            group: 'theme',
                            listeners: {
                                click: function(button, eventObject) {
                                    window['TransactionApp'].gridPanel.filters.clearFilters();
                                    
                                    Ext.getCmp('transactionfromdate').reset();
                                    Ext.getCmp('transactiontodate').reset();
                                    
                                    window['TransactionApp'].startdate = false;
                                    window['TransactionApp'].enddate = false;
                                    
                                    if (Ext.getCmp('transactionperson').isValid()){
                                        window['TransactionApp'].gridPanel.filters.getFilter('person_id').setValue({
                                            'eq': window['TransactionApp'].personRecord.id
                                        });
                                    }
                                }
                            }
                        },'-','<b class="menu-title">En en tiempo</b>',{
                            text: bundle.getMsg('transaction.filter.month'),
                            checked: false,
                            group: 'theme',
                            listeners: {
                                click: function(button, eventObject) {
                                    if (Ext.getCmp('transactionperson').isValid()){
                                        var date = new Date();
                                        
                                        window['TransactionApp'].startdate = date.getFirstDateOfMonth();
                                        window['TransactionApp'].enddate = date.getLastDateOfMonth();
                                    
                                        window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setValue({
                                            'after': window['TransactionApp'].startdate,
                                            'before': window['TransactionApp'].enddate
                                        });
                                        window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setActive(true);
                            
                                        window['TransactionApp'].gridPanel.filters.getFilter('person_id').setValue({
                                            'eq': window['TransactionApp'].personRecord.id
                                        });
                            
                                        window['TransactionApp'].gridPanel.filters.getFilter('person_id').setActive(true);
                            
                                        window['TransactionApp'].gridPanel.filters.reload();
                                    }
                                }
                            }
                        },{
                            id: 'transactionfilteryear',
                            text: bundle.getMsg('transaction.filter.year'),
                            checked: false,
                            group: 'theme',
                            menu : {
                                id: 'transactionfilteryearmenu',
                                items: ['<b class="menu-title">'+bundle.getMsg('bar.field.year')+'</b>',
                                new Ext.ux.form.SpinnerField({
                                    minValue: 0,
                                    allowDecimals: true,
                                    decimalPrecision: 2,
                                    incrementValue: 0.5,
                                    accelerate: true,
                                    width: 70,
                                    listeners: {
                                        specialkey: function(field, e){
                                            if (e.getKey() == e.ENTER && Ext.getCmp('transactionperson').isValid()) {
                                                window['TransactionApp'].startdate = new Date('1/1/'+field.getValue());
                                                window['TransactionApp'].enddate = startdate.add(Date.YEAR , 1);
                                                
                                                window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setValue({
                                                    'after': window['TransactionApp'].startdate,
                                                    'before': window['TransactionApp'].enddate
                                                });
                                                window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setActive(true);
                            
                                                window['TransactionApp'].gridPanel.filters.getFilter('person_id').setValue({
                                                    'eq': window['TransactionApp'].personRecord.id
                                                });
                            
                                                window['TransactionApp'].gridPanel.filters.getFilter('person_id').setActive(true);
                            
                                                window['TransactionApp'].gridPanel.filters.reload();
                                                
                                                Ext.getCmp('transactionfilteryear').setChecked(true);
                                                Ext.getCmp('transactionfilteryearmenu').hide(true);
                                            }
                                        }
                                    }
                                })]
                            }
                        }]
                    }
                },'-',{
                    text: bundle.getMsg('app.languaje.report.label'),
                    iconCls: Ext.ux.Icon('report'),
                    listeners: {
                        click: function(button, eventObject) {
                            if (Ext.getCmp('transactionperson').isValid() && window['TransactionApp'].startdate && window['TransactionApp'].enddate){
                                App.printView('/transaction/reporttransactionbalance?start='+window['TransactionApp'].startdate.format('Y-m-d')+'&end='+window['TransactionApp'].enddate.format('Y-m-d')+'&person='+window['TransactionApp'].personRecord.get('full_name'), ' ');
                            }
                        }
                    }
                }],
            
                bbar: new Ext.PagingToolbar({
                    pageSize: 1000000,
                    store: this.store,
                    items: [{
                        tooltip: bundle.getMsg('app.form.deleterow'),
                        ref: 'deleteRowBtn',
                        hidden: true,
                        iconCls: Ext.ux.Icon('table_row_delete'),
                        listeners: {
                            click: function(button, eventObject) {
                            //                                Ext.Msg.show({
                            //                                    title: bundle.getMsg('app.msg.warning.title'),
                            //                                    msg: bundle.getMsg('app.msg.warning.deleteselected.text'),
                            //                                    buttons: Ext.Msg.YESNO,
                            //                                    fn: function(btn, text){
                            //                                        if (btn == 'yes'){
                            //											
                            //                                            var records = window['TransactionApp'].gridPanel.getSelectionModel().getSelections();
                            //											
                            //                                            var array=new Array();                                
                            //                                            for (var i=0; i<records.length; i++)
                            //                                                array.push(records[i].get('id'));
                            //												
                            //                                            new Ext.data.Connection().request({
                            //                                                url: config.app_host + '/transaction/request/method/delete',
                            //                                                params: {
                            //                                                    ids: Ext.encode(array)
                            //                                                },
                            //                                                failure: requestFailed,
                            //                                                success: requestSuccessful,
                            //                                                callback : function(options, success, response) {
                            //                                                    window['TransactionApp'].gridPanel.getStore().load();
                            //                                                }
                            //                                            });
                            //                                        }
                            //                                    },
                            //                                    animEl: 'elId',
                            //                                    icon: Ext.MessageBox.QUESTION
                            //                                });
                            }
                        }
                    },{
                        tooltip: bundle.getMsg('app.form.clearfilters'),
                        hidden: true,
                        iconCls: Ext.ux.Icon('table_lightning'),
                        handler: function () {
                            window['TransactionApp'].gridPanel.filters.clearFilters();
                        } 
                    }],
                    displayInfo: true,
                    displayMsg: bundle.getMsg('app.form.bbar.displaymsg'),
                    emptyMsg: bundle.getMsg('app.form.bbar.emptymsg')
                }),
                
                sm: new Ext.grid.RowSelectionModel({
                    singleSelect:false
                })
            });
        },
        
        formatTransactionAnnexes : function(record){
            
            var html = '<div style="width:100%">\
  <div style="width:5%; float:left">&nbsp;&nbsp;</div>\
  <div style="width:50%; float:left"><b>'+bundle.getMsg('element.field.label')+'</b></div>\
  <div style="width:45%; float:left"><b>'+bundle.getMsg('tax.field.amount')+'</b></div>\
</div>';
            
            for (var i = 0; i<record.get('annexes').length; i++){
                var cant = '$'+record.get('annexes')[i].amount;
                html += '<div style="width:100%">\
  <div style="width:5%; float:left">&nbsp;&nbsp;</div>\
  <div style="width:50%; float:left">'+record.get('annexes')[i].element+'</div>\
  <div style="width:45%; float:left">'+cant+'</div>\
</div>';
            }

            return html;
        },
        
        showWindow : function(animateTarget){
            
        },
        
        applySecurity : function(groups, permissions){
            
        }
    }
}();