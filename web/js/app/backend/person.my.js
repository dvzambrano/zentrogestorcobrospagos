/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package SGArqBase
 * @subpackage person
 * @author MSc. Donel Vázquez Zambrano
 * @version 1.0.0
 */

PersonApp = function() {
    return {
        init : function(PersonApp) {
            
            var loadFn = function(store, records) { 
                alertNoRecords(records, bundle.getMsg('person.tab.label').toLowerCase());
                        
                for(var i = 0; i < records.length; i++){
                    records[i].set('first_name', records[i].get('sfGuardUser').first_name);
                    records[i].set('last_name', records[i].get('sfGuardUser').last_name);
                    records[i].set('full_name', records[i].get('sfGuardUser').first_name + ' ' + records[i].get('sfGuardUser').last_name);
                    records[i].set('location', records[i].get('Location').name);
                }
            };
			
            this.store = new Ext.data.GroupingStore({
                url: config.app_host + '/person/request/method/load',
                baseParams:{
                    component: 'grid',
                    entityid: config.multientityapp ? config.app_entityid : '',
                    start: 0,
                    limit: config.app_elementsongrid
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: loadFn,
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });

            this.comboStore = new Ext.data.Store({
                url: config.app_host + '/person/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: loadFn,
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });

            this.selectedEmployeesComboStore = new Ext.data.Store({
                url: config.app_host + '/person/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader()
            });

            this.selectedActivitiesComboStore = new Ext.data.Store({
                url: config.app_host + '/person/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader()
            });

            this.selectedTaxesComboStore = new Ext.data.Store({
                url: config.app_host + '/person/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader()
            });

            this.selectedServicesComboStore = new Ext.data.Store({
                url: config.app_host + '/person/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader()
            });
            
            this.paymentsMenu = new Ext.menu.Menu();
            window['TaxApp'].monthsStore.each(function(record){                
                window['PersonApp'].paymentsMenu.add({
                    id: 'person-menubtn-month-'+record.get('id'),
                    text: record.get('name'),
                    listeners: {
                        click: function(button, eventObject) {
                            var record = window['PersonApp'].gridPanel.getSelectionModel().getSelected();
                            if (record){                            
                                window['PersonApp'].obligationPaymentsStore.baseParams.personid = record.get('id');
                                window['PersonApp'].obligationPaymentsStore.baseParams.month = button.id.replace('person-menubtn-month-', '');
                                window['PersonApp'].obligationPaymentsStore.load({
                                    callback: function(records, options, success ){
                                        if(records.length>0)
                                            window['PersonApp'].window = App.showWindow(String.format(bundle.getMsg('person.window.payments.title'), record.get('full_name'), button.text), 800, 450, window['PersonApp'].obligationPaymentsGridPanel, 
                                                function(){
                                                    var payments = new Array();
                                                    window['PersonApp'].obligationPaymentsStore.each(function(pr){
                                                        var r = new Object;
                                                        r.id = pr.get('id');
                                                        r.colectorid = pr.get('colectorid');
                                                        r.deposited = pr.get('deposited');
                                                        r.payed = pr.get('payed');
                                                        r.paymentdate = pr.get('paymentdate');
                                                        payments.push(r);
                                                    });
                                        
                                                    var pr = window['PersonApp'].gridPanel.getSelectionModel().getSelected();
                                                    new Ext.data.Connection().request({
                                                        url: 'person/request/method/savepayment',
                                                        params: {
                                                            personid: record.id,
                                                            payments: Ext.encode(payments)
                                                        },
                                                        callback : function(options, success, response) {
                                                            window['PersonApp'].window.hide();
                                                        }
                                                    });
                                        
                                                },
                                                function(){
                                                    window['PersonApp'].window.hide();
                                                },
                                                button.getEl());
                                        else
                                            Ext.Base.msg(bundle.getMsg('app.msg.info.title'), String.format(bundle.getMsg('person.window.payments.error'), button.text, record.get('full_name')));
                                    }
                                }); 
                            }                            
                        }
                    }
                });
            });      
            
            this.personActivitiescomboStore = new Ext.data.ArrayStore({
                fields: ['id', 'name']
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
                    dataIndex: 'full_name'
                },{
                    type: 'string',
                    dataIndex: 'patent'
                },{
                    type: 'string',
                    dataIndex: 'nit'
                },{
                    type: 'string',
                    dataIndex: 'inscription'
                },{
                    type: 'string',
                    dataIndex: 'address'
                },{
                    type: 'string',
                    dataIndex: 'phone'
                },{
                    type: 'string',
                    dataIndex: 'cellphone'
                }]
            });

            this.infoTextItem = new Ext.Toolbar.TextItem('');
			
            this.gridPanel = new Ext.grid.GridPanel({
                id: 'gridPanelPerson',
                region:'center',
                layout: 'fit', 
                iconCls: Ext.ux.Icon('tag_orange'),
                title: config.app_showgridtitle ? bundle.getMsg("person.grid.title") : '',
                autoExpandColumn: 'personmaincolumn',
                store: this.store,
                loadMask: true,
                tools: [{
                    id:'print',
                    qtip: bundle.getMsg('app.languaje.report.printview'),
                    handler: function() {
                        App.printView(window['PersonApp'].gridPanel);
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
                        var text = App.getFiltersText(window['PersonApp'].gridPanel);
                        if(text && text!=''){
                            Ext.fly(window['PersonApp'].infoTextItem.getEl()).update(String.format(bundle.getMsg('app.form.filteringby'), text));
                            window['PersonApp'].infoTextItem.getEl().highlight('#FFFF66', {
                                block:true
                            });
                        }
                        else
                            Ext.fly(window['PersonApp'].infoTextItem.getEl()).update('');
                    }
                },
				
                columns: [new Ext.grid.RowNumberer(),{
                    header: bundle.getMsg('person.field.identification'), 
                    width: 50, 
                    sortable: true, 
                    dataIndex: 'code'
                },{
                    header: bundle.getMsg('app.form.longname'), 
                    width: 110, 
                    sortable: true, 
                    dataIndex: 'full_name'
                },{
                    header: bundle.getMsg('person.field.patent'), 
                    width: 40, 
                    sortable: true, 
                    dataIndex: 'patent'
                },{
                    header: bundle.getMsg('person.field.nit'), 
                    width: 80, 
                    sortable: true, 
                    dataIndex: 'nit'
                },{
                    header: bundle.getMsg('person.field.inscription'), 
                    width: 40, 
                    sortable: true, 
                    hidden: true, 
                    dataIndex: 'inscription'
                },{
                    id:'personmaincolumn', 
                    header: bundle.getMsg('app.form.address'), 
                    width: 130, 
                    sortable: true, 
                    dataIndex: 'address'
                },{
                    header: bundle.getMsg('sex.field.label'), 
                    width:50, 
                    hidden: true, 
                    sortable: true, 
                    dataIndex: 'sex'
                },{
                    header: bundle.getMsg('app.form.phone'), 
                    width: 50, 
                    hidden: true,  
                    sortable: true, 
                    dataIndex: 'phone'
                },{
                    header: bundle.getMsg('app.form.cellphone'), 
                    width: 50, 
                    hidden: true, 
                    sortable: true, 
                    dataIndex: 'cellphone'
                },{
                    header: bundle.getMsg('person.field.age'), 
                    width: 30, 
                    sortable: true,
                    hidden: true, 
                    dataIndex: 'age'
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
                            window['PersonApp'].gridPanel.getSelectionModel().clearSelections();
                            window['PersonApp'].gridPanel.updateBtn.fireEvent('click', button, eventObject, hideApply, callback);
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
                            
                            var finalFn = function(){
                                var record = window['PersonApp'].gridPanel.getSelectionModel().getSelected();
                                if (record){
                                    window['PersonApp'].loadPersonDetails(function() {
                                        var record = window['PersonApp'].gridPanel.getSelectionModel().getSelected();
                                        console.info('este', record);
                                         
                                        window['PersonApp'].calculateBirthday(record.get('code'));
                                            
                                        window['PersonApp'].formPanel.getForm().loadRecord(record);
  
                                        if (record.get('picture') && record.get('picture')!='')
                                            Ext.getDom('personpicture').src = record.get('picture');
                                    
									//http://localhost/copa/graph.php?graph=barcode
                                        if (record.get('nit') && record.get('nit')!='')
                                            Ext.getDom('bar').src = config.app_host + '/graph.php?graph=barcode&data='+record.get('nit')+'&type=code39&trick=barcode.png';
										
										console.log('bar', record.get('nit'), Ext.getDom('bar').src);
                                        var i, currentrecord, index;
                                        var employees = record.get('PersonPersonRelation');
                                        if (employees)	
                                            for (i = 0; i<employees.length; i++){
                                                window['PersonApp'].selectedEmployeesComboStore.insert(window['PersonApp'].selectedEmployeesComboStore.getCount(), new Ext.data.Record({
                                                    id: employees[i].Employee.id,
                                                    code: employees[i].Employee.code,
                                                    full_name: employees[i].Employee.sfGuardUser.first_name + ' '  + employees[i].Employee.sfGuardUser.last_name,
                                                    address: employees[i].Employee.address,
                                                    salary: employees[i].amount
                                                }));
                                            }
  
  
                                        var activities = record.get('PersonActivityRelation');
                                        if (activities)	
                                            for (i = 0; i < activities.length; i++){
                                                var amountstr = '';
                                                if(activities[i].Activity.fixed)
                                                    amountstr = '$'+activities[i].Activity.amount;
                                                else
                                                    amountstr = activities[i].Activity.amount+'%';
                                        
                                                currentrecord = new Ext.data.Record({
                                                    id: activities[i].Activity.id,
                                                    name: activities[i].Activity.name,
                                                    Taxes: activities[i].Activity.Taxes,
                                                    amountstr: amountstr,
                                                    fromdate: Date.parseDate(activities[i].fromdate, 'Y-m-d')
                                                });
                                                var obj = window['PersonApp'].formatActivityTaxes(currentrecord);
                                                currentrecord.set('obj', obj);
                                                window['PersonApp'].selectedActivitiesComboStore.insert(window['PersonApp'].selectedActivitiesComboStore.getCount(), currentrecord);
                                            }
  
  
                                        var taxes = record.get('Taxes');
                                        if (taxes)	
                                            for (i = 0; i < taxes.length; i++){
                                                index = window['TaxApp'].comboStore.find('id', taxes[i].id);
                                                if (index > -1){
                                                    currentrecord = window['TaxApp'].comboStore.getAt(index);
                                                    currentrecord.set('amount', taxes[i].TaxPersonRelation[0].amount);
                                                    currentrecord.set('fixed', taxes[i].TaxPersonRelation[0].fixed);
 
                                                    var str = taxes[i].TaxPersonRelation[0].amount;
                                                    if(taxes[i].TaxPersonRelation[0].fixed)
                                                        str = '$' + str;
                                                    else
                                                        str = str + '%';
                                                    currentrecord.set('amountstr', str);
  
                                                    window['PersonApp'].selectedTaxesComboStore.add(currentrecord);
                                                }
                                            }
  
                                        var services = record.get('Services');
                                        if (services)	
                                            for (i = 0; i < services.length; i++){
                                                index = window['ServiceApp'].comboStore.find('id', services[i].id);
                                                if (index > -1){
                                                    currentrecord = window['ServiceApp'].comboStore.getAt(index);
                                                    currentrecord.set('amount', services[i].ServicePersonRelation[0].amount);
                                                    currentrecord.set('collectday', services[i].ServicePersonRelation[0].collectday);
  
                                                    window['PersonApp'].selectedServicesComboStore.add(currentrecord);
                                                }
                                            }
                                                
                                                
                                        window['PersonApp'].showWindow(button.getEl(), hideApply, callback);
                                        App.mask.hide();
                                    });                                    
                                }
                                else{
                                    window['PersonApp'].formPanel.getForm().reset();
                                    window['PersonApp'].disposeForm();
                                    
                                    window['PersonApp'].showWindow(button.getEl(), hideApply, callback);
                                    App.mask.hide();
                                }
                            };
                            
                            syncLoad([
                                window['SexApp'].comboStore,
                                window['TaxApp'].comboStore,
                                window['PlaceApp'].comboStore,
                                window['ServiceApp'].comboStore,
                                window['ActivityApp'].comboStore
                                ], finalFn);
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
                                            var records = window['PersonApp'].gridPanel.getSelectionModel().getSelections();
											
                                            var array = new Array();
                                            for (var i=0; i<records.length; i++)
                                                array.push(records[i].get('id'));
												
                                            new Ext.data.Connection().request({
                                                url: config.app_host + '/person/request/method/delete',
                                                params: {
                                                    ids: Ext.encode(array)
                                                },
                                                failure: requestFailed,
                                                success: requestSuccessful,
                                                callback : function(options, success, response) {
                                                    var object = Ext.decode(response.responseText);
                                                    if(object.success){
                                                        window['PersonApp'].store.load({
                                                            params:{
                                                                start: window['PersonApp'].gridPanel.getBottomToolbar().cursor
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
                },'-',{
                    ref: '../paymentBtn',
                    text: bundle.getMsg('person.btn.payments'),
                    disabled: true,
                    iconCls: Ext.ux.Icon('money'),
                    menu: this.paymentsMenu
                },{
                    ref: '../balanceBtn',
                    text: bundle.getMsg('person.btn.accountant'),
                    disabled: true,
                    iconCls: Ext.ux.Icon('text_signature'),
                    listeners: {
                        click: function(button, eventObject) {
                            var record = window['PersonApp'].gridPanel.getSelectionModel().getSelected();
                            if (record){
                                window['PersonApp'].disableBalancePanel(true);
                                
                                window['PersonApp'].loadPersonDetails(function() {
                                    var record = window['PersonApp'].gridPanel.getSelectionModel().getSelected();
                                    if (record){
                                        window['PersonApp'].personActivitiescomboStore.removeAll();
                                
                                        var activities = record.get('PersonActivityRelation');
                                        if (activities)	
                                            for (var i = 0; i < activities.length; i++){
                                                var currentrecord = new Ext.data.Record({
                                                    id: activities[i].Activity.id,
                                                    name: activities[i].Activity.name
                                                });
                                                window['PersonApp'].personActivitiescomboStore.insert(window['PersonApp'].personActivitiescomboStore.getCount(), currentrecord);
                                            }
                                            
                                        window['PersonApp'].window = App.showWindow(String.format(bundle.getMsg('person.window.transactions.title'), record.get('full_name')), 800, 450, {  
                                            id: 'transactionContentPanel',
                                            region:'center',
                                            margins: '0 0 0 0',
                                            border: false,
                                            defaults: {
                                                border: false
                                            },
                                            layout: 'card',
                                            activeItem: 0,
                                            tbar: [new Ext.Toolbar.TextItem(bundle.getMsg('activity.field.label')+': '), new Ext.form.ComboBox({
                                                store: window['PersonApp'].personActivitiescomboStore,
                                                width: 680, 
                                                listeners: {
                                                    select: function(combo, record, index ){                                                
                                                        window['PersonApp'].activity4BalanceRecord = record;
                                                
                                                        window['PersonApp'].disableBalancePanel(false);
                                                    },
                                                    blur: function(field) {		
                                                        if(field.getRawValue() == ''){
                                                            window['PersonApp'].activity4BalanceRecord = false;
                                                            window['PersonApp'].disableBalancePanel(true);
                                                        }
                                                        else {
                                                            var record = field.getStore().getAt(field.getStore().find('name',field.getRawValue(), 0, true, true));								 
                                                            if(record && record.get('name') == field.getRawValue()){
                                                                window['PersonApp'].activity4BalanceRecord = record;
                                                                window['PersonApp'].disableBalancePanel(false);
                                                            }
                                                            else{ 
                                                                window['PersonApp'].activity4BalanceRecord = false;
                                                                window['PersonApp'].disableBalancePanel(true);
                                                            }
                                                        }
                                                    }
                                                },
                                                valueField: 'id', 
                                                displayField: 'name',
                                                typeAhead: true,
                                                mode: 'local',
                                                triggerAction: 'all',
                                                selectOnFocus:true,
                                                forceSelection:true,
                                                //                                        emptyText: bundle.getMsg('app.form.select'),
                                                allowBlank: false
                                            })],
                                            items: [window['PersonApp'].transactionGridPanel, window['PersonApp'].regannexGridPanel]
                                        }, function(){
                                            var transactions = new Array();
                                            window['PersonApp'].selectedTransactionsComboStore.each(function(tr){
                                                var r = new Object;
                                                r.transactiondate = tr.get('transactiondate');
                                                r.comment = tr.get('name');
                                                r.debit = tr.get('debit');
                                                r.credit = tr.get('credit');
                                                r.regannex = tr.get('regannex');
                                                transactions.push(r);
                                            });
                                        
                                            new Ext.data.Connection().request({
                                                url: 'transaction/request/method/save',
                                                params: {
                                                    personid: record.id,
                                                    activityid: window['PersonApp'].activity4BalanceRecord ? window['PersonApp'].activity4BalanceRecord.get('id') : '',
                                                    transactions: Ext.encode(transactions)
                                                },
                                                callback : function(options, success, response) {
                                                    window['PersonApp'].selectedTransactionsComboStore.removeAll();
                                                    window['PersonApp'].selectedRegannexsComboStore.removeAll();
                                            
                                                    window['PersonApp'].disableBalancePanel(true);
                                            
                                                    window['PersonApp'].window.hide();
                                                }
                                            });
                                        },
                                        function(){
                                            window['PersonApp'].selectedTransactionsComboStore.removeAll();
                                            window['PersonApp'].selectedRegannexsComboStore.removeAll();
                                    
                                            window['PersonApp'].disableBalancePanel(true);
                                            
                                            window['PersonApp'].window.hide();
                                        },
                                        button.getEl());
                                    }
                                });
                            }
                        }
                    }
                },'-',{
                    ref: '../exportBtn',
                    text: bundle.getMsg('person.action.export'),
                    iconCls: Ext.ux.Icon('database_go'),
                    menu: {
                        items: [{
                            text: bundle.getMsg('person.action.export.create'),
                            menu : {
                                items: [{
                                    id: 'exportPerson',
                                    disabled: true,
                                    text: 'Personas seleccionadas',
                                    listeners: {
                                        click: window['PersonApp'].exportPlanFn
                                    }
                                },{
                                    text: 'Personas creadas en rango de fechas',
                                    listeners: {
                                        click: function(){
                                            window['PersonApp'].showDateRangeWindow(window['PersonApp'].gridPanel.exportBtn.getEl(), true, function(){});
                                        }
                                    }
                                }]
                            }
                        },{
                            text: bundle.getMsg('person.action.export.explore'),
                            listeners: {
                                click: window['PersonApp'].importPlanFn
                            }
                        }]
                    }
                },{
                    ref: '../reportBtn',
                    text: bundle.getMsg('app.languaje.report.label'),
                    iconCls: Ext.ux.Icon('report'),
                    menu : {
                        items: ['<b class="menu-title">'+bundle.getMsg('person.tab.onat')+'</b>', {
                            text: bundle.getMsg('person.btn.vector'),
                            id:'reportvector',
                            disabled: true,
                            menu : {
                                id:'vectoryear',
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
                                            if (e.getKey() == e.ENTER) {
                                                var record = window['PersonApp'].gridPanel.getSelectionModel().getSelected();
                                                if (record){
                                                    App.printView('/person/reportvector?personid='+record.get('id')+'&year='+field.getValue(), ' ');
                                                    field.reset();
                                                    Ext.getCmp('vectoryear').hide(true);
                                                }
                                            }
                                        }
                                    }
                                })]
                            }
                        },{
                            text: 'Resumen de tributos',
                            id:'reportpaymentsresume',
                            disabled: true,
                            menu : {
                                id:'paymentsresumeyear',
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
                                            if (e.getKey() == e.ENTER) {
                                                var record = window['PersonApp'].gridPanel.getSelectionModel().getSelected();
                                                if (record){
                                                    App.printView('/transaction/reportpaymentsresume?personid='+record.get('id')+'&year='+field.getValue(), ' ');
                                                    field.reset();
                                                    Ext.getCmp('paymentsresumeyear').hide(true);
                                                }
                                            }
                                        }
                                    }
                                })]
                            }
                        }, {
                            text: 'Declaracion jurada',
                            id:'reportsworndeclaration',
                            disabled: true,
                            menu : {
                                id:'sworndeclarationyear',
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
                                            if (e.getKey() == e.ENTER) {
                                                var record = window['PersonApp'].gridPanel.getSelectionModel().getSelected();
                                                if (record){
                                                    App.printView('/person/reportsworndeclaration?personid='+record.get('id')+'&year='+field.getValue(), ' ');
                                                    field.reset();
                                                    Ext.getCmp('sworndeclarationyear').hide(true);
                                                }
                                            }
                                        }
                                    }
                                })]
                            }
                        }, '-', {
                            text: bundle.getMsg('person.btn.clientlist'),
                            listeners: {
                                click: function(button, eventObject) {
                                    App.printView('/person/reportonatclients', ' ');
                                }
                            }
                        },'-', '<b class="menu-title">'+bundle.getMsg('person.tab.bank')+'</b>', {
                            text: bundle.getMsg('person.btn.depositreport'),
                            listeners: {
                                click: function(button, eventObject) {
                                    App.printView('/person/reportbankdeposit', ' ');
                                }
                            }
                        },{
                            text: bundle.getMsg('person.btn.bankdepositletter'),
                            listeners: {
                                click: function(button, eventObject) {
                                    App.printView('/person/reportbankdepositletter', ' ');
                                }
                            }
                        },'-', '<b class="menu-title">'+bundle.getMsg('person.tab.usufructuary')+'</b>',{
                            text: bundle.getMsg('person.btn.usufructuary'),
                            listeners: {
                                click: function(button, eventObject) {
                                    App.printView('/person/reportusufructuary', ' ');
                                }
                            }
                        },'-', '<b class="menu-title">'+bundle.getMsg('service.tab.label')+'</b>',{
                            text: bundle.getMsg('person.btn.daycollect'),
                            listeners: {
                                click: function(button, eventObject) {
                                    App.printView('/person/reportdaycollect', ' ');
                                }
                            }
                        }]
                    }
                },'->','-',{
                    ref: '../signoutGrpBtn',
                    text: 'Bajas',
                    iconCls: Ext.ux.Icon('user_delete'),
                    menu: {
                        items: [{
                            id: 'switchSignOutChk',
                            text: 'Ver solo personas dadas de baja',
                            checked: false,
                            checkHandler: function (item, checked){
                                if(checked){
                                    Ext.getCmp('switchSignOutBtn').setText('Volver a dar alta a personas seleccionadas');
                                    window['PersonApp'].gridPanel.getStore().setBaseParam('where', 't.deletiondate is not null');
                                }
                                else{
                                    Ext.getCmp('switchSignOutBtn').setText('Dar baja a personas seleccionadas');
                                    window['PersonApp'].gridPanel.getStore().setBaseParam('where', 't.deletiondate is null');
                                }
                                window['PersonApp'].gridPanel.getStore().load({
                                    params:{
                                        start:0
                                    }
                                });
                            }
                        },{
                            id: 'switchSignOutBtn',
                            text: 'Dar baja a personas seleccionadas',
                            listeners: {
                                click: function(button, eventObject) {
                                    Ext.Msg.show({
                                        title: bundle.getMsg('app.msg.warning.title'),
                                        msg: '¿Está seguro que desea realizar esta operacion?',
                                        buttons: Ext.Msg.YESNO,
                                        fn: function(btn, text){
                                            if (btn == 'yes'){
                                                var records = window['PersonApp'].gridPanel.getSelectionModel().getSelections();
													
                                                var array=new Array();  
                                                for (var i=0; i<records.length; i++)
                                                    array.push(records[i].get('id'));
														
                                                new Ext.data.Connection().request({
                                                    url: 'person/request/method/signout',
                                                    params: {
                                                        ids: Ext.encode(array),
                                                        isout: Ext.getCmp('switchSignOutChk').checked
                                                    },
                                                    failure: requestFailed,
                                                    success: requestSuccessful,
                                                    callback : function(options, success, response) {
                                                        window['PersonApp'].gridPanel.getStore().load({
                                                            params:{
                                                                start:0
                                                            }
                                                        });
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
                            window['PersonApp'].gridPanel.filters.clearFilters();
                            Ext.fly(window['PersonApp'].infoTextItem.getEl()).update('');
                            window['PersonApp'].gridPanel.getSelectionModel().clearSelections();
                        } 
                    },'-', this.infoTextItem],
                    displayInfo: true,
                    displayMsg: bundle.getMsg('app.form.bbar.displaymsg'),
                    emptyMsg: String.format(bundle.getMsg('app.form.bbar.emptymsg'), bundle.getMsg('app.form.elements').toLowerCase())
                }),
				
                sm: new Ext.grid.RowSelectionModel({
                    singleSelect:false, 
                    listeners: {
                        selectionchange: function(selectionModel) {
                            var obj = App.selectionChange(selectionModel);
                            Ext.getCmp('switchSignOutBtn').setDisabled(selectionModel.getCount() < 1);
                            selectionModel.grid.paymentBtn.setDisabled(selectionModel.getCount() != 1);
                            selectionModel.grid.balanceBtn.setDisabled(selectionModel.getCount() != 1);
                            
                            Ext.getCmp('reportvector').setDisabled(selectionModel.getCount() != 1);
                            Ext.getCmp('reportpaymentsresume').setDisabled(selectionModel.getCount() != 1);
                            Ext.getCmp('reportsworndeclaration').setDisabled(selectionModel.getCount() != 1);
							
                            Ext.getCmp('exportPerson').setDisabled(selectionModel.getCount() < 1); 
                            
                            if(selectionModel.getCount() == 1){
                                var record = selectionModel.getSelections();
                                record = record[0];
                                window['PersonApp'].personActivitiescomboStore.removeAll();
                                var activities = record.get('PersonActivityRelation');
                                if (activities)	
                                    for (var i = 0; i < activities.length; i++){
                                        var currentrecord = new Ext.data.Record({
                                            id: activities[i].Activity.id,
                                            name: activities[i].Activity.name
                                        });
                                        window['PersonApp'].personActivitiescomboStore.insert(window['PersonApp'].personActivitiescomboStore.getCount(), currentrecord);
                                    }
                            }
                        }
                    }
                })
            });
			
            this.gridPanel.getView().getRowClass = function(record, index, rowParams, store) {
                var css = '';
                if (!record.get('deleteable')) 
                    css = 'row-italic';
                return css;
            };



            this.expander = new Ext.ux.grid.RowExpander({
                tpl : new Ext.Template('{obj}')
            });
		

            this.pictureBox = {
                border: true,
                items: [{
                    xtype: 'box',
                    autoEl: {
                        tag: 'div',
                        html: 'Foto de la persona:<br/><img id="personpicture" src="images/avatar.png" width="100px" class="img-contact" style="cursor:pointer;border:1px solid 000" onclick="window[&#39;UserApp&#39;].prepareshowPictureForm(&#39;personpicture&#39;, &#39;web/uploads/avatars&#39;)" /><br/><img id="bar" src="' + config.app_host + '/graph.php?graph=barcode&data=1234567890&type=code39&trick=barcode.png" width="100px" height="40px" />'
                    }
                },{
                    xtype: 'box',
                    autoEl: {
                        tag: 'div',
                        style: 'padding-bottom:3px',
                        html: ''
                    }
                },{
                    xtype: 'checkboxgroup',
                    itemCls: 'x-check-group-alt',
                    columns: 1,
                    items: [{
                        boxLabel: 'Patentado', 
                        id: 'personpatented',
                        name: 'patented',
                        listeners:{
                            check: window['PersonApp'].disposeForm 
                        }
                    },{
                        boxLabel: 'Usufructuario', 
                        id: 'personusufructuary',
                        name: 'usufructuary',
                        listeners:{
                            check: window['PersonApp'].disposeForm
                        }
                    },{
                        boxLabel: 'Cliente', 
                        id: 'personclient',
                        name: 'client',
                        listeners:{
                            check: window['PersonApp'].disposeForm
                        }
                    }]
                },{
                    xtype: 'box',
                    autoEl: {
                        tag: 'div',
                        html: '<br/>'+bundle.getMsg('person.field.creationdate')+':<br/>'
                    }
                },{
                    xtype:'datefield',
                    name: 'creationdate',	
                    anchor: '-20',	
                    fieldLabel: bundle.getMsg('person.field.creationdate')
                }]
            }; 	
			
            this.daterangeFormPanel = new Ext.FormPanel({
                labelWidth: 75,
                labelAlign: 'top',
                height: 310,
                url: config.app_host + '/plan/request/method/save',
                frame:true,
                bodyStyle:'padding:5px 5px 0',						
                keys: [formKeyMaping],
                items: [{
                    layout:'column',
                    items:[{
                        columnWidth:.5,
                        layout: 'form',
                        items:[{
                            xtype:'datefield',
                            ref:'../../fromDate',
                            fieldLabel: 'Desde',
                            allowBlank:false
                        }]
                        },{
                        columnWidth:.5,
                        layout: 'form',
                        items:[{
                            xtype:'datefield',
                            ref:'../../toDate',
                            fieldLabel: 'Hasta',
                            allowBlank:false
                        }]
                        }
                    ]
                    }
                ]
            });
			
            this.formPanel = new Ext.FormPanel({
                labelWidth: 75,
                labelAlign: 'top',
                url: config.app_host + '/person/request/method/save',
                layout:'fit',
                border:false,
                keys: [formKeyMaping],
                items:[new Ext.TabPanel({
                    ref: 'tabPanel',
                    height: 100,
                    anchor:'-10',
                    defaults:{
                        autoHeight:false, 
                        border:false
                    }, 			
                    activeTab: 0,
                    border:false,
                    items:[{
                        ref: 'generalPanel',
                        title: bundle.getMsg('person.tab.generals'),
                        iconCls: Ext.ux.Icon('vcard'),
                        frame:true,	
                        border:false,	
                        layout:'form',
                        bodyStyle:'padding:5px',
                        items: [{
                            layout:'column',
                            items:[{
                                columnWidth:.85,
                                layout: 'form',
                                items:[{
                                    xtype:'fieldset',
                                    title: bundle.getMsg('app.form.generaldata'),
                                    autoHeight:true,
                                    anchor:'-10',
                                    items: [{
                                        layout:'column',
                                        items:[{
                                            layout:'form',
                                            columnWidth:.25,
                                            items:[{
                                                ref:'../../../../../identificationField',
                                                xtype:'numberfield',
                                                allowDecimals: false,
                                                name: 'code',
                                                anchor:'-20',
                                                allowBlank:false,
                                                minLength: 11,
                                                maxLength: 11,
                                                fieldLabel: bundle.getMsg('person.field.identification'),
                                                listeners: {
                                                    blur: function(field) {
                                                        if(field.isValid()){
                                                            var records = window['PersonApp'].gridPanel.getSelectionModel().getSelections();

                                                            Ext.Ajax.request({
                                                                url: config.app_host + '/person/request/method/validate',
                                                                params : {
                                                                    id: records[0]?records[0].get('id'):'',
                                                                    username : field.getValue(),
                                                                    validate:'ci'
                                                                },
                                                                callback : function(options, success, response) {
                                                                    var responseData = Ext.decode(response.responseText);
                                                                    if(!responseData.success)
                                                                        field.markInvalid(bundle.getMsg(responseData.message));  
                                                                    else{
                                                                        var identification = field.getValue() +' ';
                                                                        window['PersonApp'].calculateBirthday(identification);
                                                                    }
                                                                }
                                                            });

                                                        }
                                                    }
                                                }
                                            }]
					
                                        },{
                                            layout:'form',
                                            columnWidth:.25,
                                            items:[new Ext.form.ComboBox({
                                                ref: '../../../../../sexCombo',
                                                name: 'sexid',
                                                fieldLabel: bundle.getMsg('sex.field.label'),
                                                anchor:'-20',
                                                store: window['SexApp'].comboStore,
                                                listeners: {
                                                    focus: function(combo) {
                                                        combo.getStore().load();
                                                    }
                                                },
                                                valueField: 'id', 
                                                displayField: 'name',
                                                tpl: '<tpl for="."><div ext:qtip="{comment}" class="x-combo-list-item">{name}</div></tpl>',
                                                typeAhead: true,
                                                mode: 'local',
                                                triggerAction: 'all',
                                                selectOnFocus:true,
                                                emptyText: bundle.getMsg('app.form.select'),
                                                allowBlank: false
                                            })]
                                        },{
                                            layout:'form',
                                            columnWidth:.25,
                                            items:[{
                                                ref: '../../../../../dateofbirthField',
                                                xtype: 'datefield',
                                                name: 'dateofbirth',	
                                                anchor:'-20',	
                                                fieldLabel: bundle.getMsg('person.field.birth'),
                                                maxValue: new Date(),
                                                allowBlank: false,
                                                listeners: {
                                                    blur: function(datefield) {
                                                        if(datefield.isValid())
                                                            window['PersonApp'].formPanel.tabPanel.generalPanel.personageField.setValue(window['PersonApp'].calculateAge(datefield.getValue()));
                                                    }
                                                }
                                            }]
                                        },{
                                            layout:'form',
                                            columnWidth:.25,
                                            items:[{
                                                ref: '../../../../../personageField',
                                                xtype: 'numberfield',
                                                allowDecimals: false,
                                                readOnly: true, 
                                                name: 'personage',
                                                anchor: '-20',
                                                fieldLabel: bundle.getMsg('person.field.age')
                                            }]
                                        }]	
                                    },{
                                        layout:'column',
                                        items:[{
                                            columnWidth:.4,
                                            layout:'form',
                                            items:[{						
                                                xtype:'textfield',
                                                name: 'first_name',
                                                maskRe: Date.patterns.LettersOnly,
                                                regex: Date.patterns.LettersOnly,
                                                anchor:'-20',					
                                                allowBlank:false,
                                                fieldLabel: bundle.getMsg('user.first.name')							
						
                                            }]
						
                                        },{
                                            columnWidth:.6,
                                            layout:'form',
                                            items:[{							
                                                xtype:'textfield',
                                                name: 'last_name',
                                                maskRe: Date.patterns.LettersOnly,
                                                regex: Date.patterns.LettersOnly,
                                                anchor:'-20',
                                                width:360,
                                                allowBlank:false,
                                                fieldLabel: bundle.getMsg('user.last.name')							
						
                                            }]
						
                                        }]
                                    },{
                                        layout:'column',
                                        items:[{
                                            columnWidth:.6,
                                            layout:'form',
                                            items:[{						
                                                xtype:'textfield',
                                                name: 'address',
                                                anchor:'-20',
                                                allowBlank:false,
                                                fieldLabel: bundle.getMsg('app.form.address')	
                                            }]
						
                                        },{
                                            columnWidth:.4,
                                            layout:'form',
                                            items:[ new Ext.form.ComboBox({
                                                fieldLabel : bundle.getMsg('location.field.label'),
                                                store: window['LocationApp'].comboStore,
                                                name: 'location',
                                                anchor:'-20',
                                                emptyText: bundle.getMsg('app.form.typehere'),
                                                minChars: 1, //para q busque a partir de 1 caracter...
                                                displayField: 'name',
                                                typeAhead: false,
                                                loadingText: bundle.getMsg('app.msg.wait.searching'),
                                                pageSize: config.app_elementsongrid/2,
                                                hideTrigger:true,
                                                tpl: new Ext.XTemplate(
                                                    '<tpl for="."><div class="search-item">',
                                                    '<h3><span>{parent}</span>{name}</h3>',
                                                    '{comment}',
                                                    '</div></tpl>'
                                                    ),
                                                itemSelector: 'div.search-item',
                                                listeners: {
                                                    beforequery: function(queryEvent) {
                                                        this.setValue(queryEvent.query);
                                                    },
                                                    select: function(combo, record, index ){
                                                        window['PersonApp'].locationRecord = record;
                                                        this.collapse();
                                                    },
                                                    blur: function(field) {		
                                                        if(field.getRawValue() == '')
                                                            window['PersonApp'].locationRecord = false;
                                                        else {
                                                            var record = field.getStore().getAt(field.getStore().find('name',field.getRawValue(), 0, true, true));								 
                                                            if(record && record.get('name') == field.getRawValue())
                                                                window['PersonApp'].locationRecord = record;
                                                            else 
                                                                window['PersonApp'].locationRecord = false;
                                                        }
                                                    }
                                                }
                                            })]
						
                                        }]
                                    }]
                                }, new Ext.TabPanel({
                                    ref: '../../tabPanel',
                                    height: 100,
                                    anchor:'-10',
                                    defaults:{
                                        autoHeight:false, 
                                        border:false
                                    }, 			
                                    activeTab: 0,
                                    border:false,
                                    items:[{
                                        title: bundle.getMsg('person.tab.phones'),
                                        frame:true,	
                                        border:false,	
                                        layout:'form',
                                        bodyStyle:'padding:5px',
                                        items: [{
                                            layout:'column',
                                            items:[{
                                                layout:'form',
                                                columnWidth:.33,
                                                items:[{
                                                    xtype: 'numberfield', 
                                                    name: 'phone',
                                                    minLength: 4,
                                                    maxLength: 11, 
                                                    anchor:'-20',
                                                    fieldLabel: bundle.getMsg('app.form.phone')							
						
                                                }]
                                            },{
                                                layout:'form',
                                                columnWidth:.33,
                                                items:[{
                                                    xtype: 'numberfield', 
                                                    name: 'cellphone',
                                                    minLength: 4,
                                                    maxLength: 11, 
                                                    anchor:'-20',
                                                    fieldLabel: bundle.getMsg('app.form.cellphone')
                                                }]
                                            }]
                                        }]
                                    },{
                                        ref: 'onatPanel',
                                        title: bundle.getMsg('person.tab.onat'),
                                        disabled:true,	
                                        frame:true,	
                                        border:false,	
                                        layout:'form',
                                        bodyStyle:'padding:5px',
                                        items: [{
                                            layout:'column',
                                            items:[{
                                                layout:'form',
                                                columnWidth:.15,
                                                items:[{
                                                    ref: '../../patentField',
                                                    xtype:'textfield',
                                                    allowDecimals: false,
                                                    name: 'patent',
                                                    anchor:'-20',
                                                    fieldLabel: bundle.getMsg('person.field.patent')
                                                }]
                                            },{
                                                layout:'form',
                                                columnWidth:.15,
                                                items:[{
                                                    ref: '../../inscriptionField',
                                                    xtype:'textfield',
                                                    allowDecimals: false,
                                                    name: 'inscription',
                                                    anchor:'-20',
                                                    fieldLabel: bundle.getMsg('person.field.inscription')
                                                }]
                                            },{
                                                layout:'form',
                                                columnWidth:.25,
                                                items:[{
                                                    ref: '../../nitField',
                                                    xtype:'textfield',
                                                    allowDecimals: false,
                                                    name: 'nit',
                                                    anchor:'-20',
                                                    fieldLabel: bundle.getMsg('person.field.nit'),
                                                    listeners: {
                                                        blur: function(field) {
                                                            if (field.isValid())
                                                                Ext.getDom('bar').src = config.app_host + '/graph.php?graph=barcode&data='+field.getValue()+'&type=code39&trick=barcode.png';
                                                            else
                                                                Ext.getDom('bar').src = '';
                                                        }
                                                    }
                                                }]
                                            },{
                                                layout:'form',
                                                columnWidth:.45,
                                                items:[new Ext.form.ComboBox({
                                                    ref: '../../placeCombo',
                                                    fieldLabel: bundle.getMsg('place.field.label'),
                                                    name: 'placeid',
                                                    valueField: 'id',  
                                                    anchor:'-20',
                                                    store: window['PlaceApp'].comboStore,
                                                    listeners: {
                                                        focus: function(combo) {
                                                            combo.getStore().load();
                                                        }
                                                    },
                                                    displayField: 'name',
                                                    tpl: '<tpl for="."><div ext:qtip="{comment}" class="x-combo-list-item">{name}</div></tpl>',
                                                    typeAhead: true,
                                                    mode: 'local',
                                                    triggerAction: 'all',
                                                    selectOnFocus:true,
                                                    forceSelection:true,
                                                    emptyText: bundle.getMsg('app.form.select')
                                                })]
                                            }]
                                        }]
                                    }]
                                })]
				
                            },{
                                layout:'column',
                                columnWidth:.15,
                                items: [this.pictureBox]
				
                            }]	
                        }]
                    }, new Ext.grid.GridPanel({
                        ref: 'taxesGridPanel',
                        disabled: true,
                        stripeRows: true,
                        autoExpandColumn: 'persontaxmaincolumn',
                        title: bundle.getMsg('tax.tab.label'),	
                        iconCls: Ext.ux.Icon('coins'),
                        store: this.selectedTaxesComboStore,
                        sm: new Ext.grid.RowSelectionModel({
                            singleSelect:true, 
                            listeners: {
                                selectionchange: function(selectionModel) {
                                    window['PersonApp'].formPanel.tabPanel.taxesGridPanel.removeBtn.setDisabled(selectionModel.getCount() < 1);
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
                            id:'persontaxmaincolumn', 
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
                            ref: '../taxCombo',
                            store: window['TaxApp'].comboStore,
                            width: 250, 
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

                                    window['PersonApp'].selectedTaxesComboStore.each(function(record){
                                        var r = new Object;
                                        r.id = record.get('id');
                                        taxes.push(r);
                                    });
                                    window['TaxApp'].comboStore.baseParams.distinct = Ext.encode(taxes);
                                    this.setValue(queryEvent.query);
                                },
                                select: function(combo, record, index ){
                                    window['PersonApp'].taxRecord = record;
                                    this.collapse();
                                },
                                blur: function(field) {		
                                    if(field.getRawValue() == '')
                                        window['PersonApp'].taxRecord = false;
                                    else {
                                        var record = field.getStore().getAt(field.getStore().find('name',field.getRawValue(), 0, true, true));								 
                                        if(record && record.get('name') == field.getRawValue())
                                            window['PersonApp'].taxRecord = record;
                                        else 
                                            window['PersonApp'].taxRecord = false;
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
                                id: 'persontaxfixed', 
                                name: 'persontaxfixed', 
                                inputValue: true, 
                                checked: true
                            },{
                                boxLabel: bundle.getMsg('app.form.percent'), 
                                id: 'persontaxpercentage',
                                name: 'persontaxfixed', 
                                inputValue: false
                            }],
                            listeners: {
                                change: function(radioGroup, radio) {
                                    if (radio.getId() != 'persontaxfixed')
                                        window['PersonApp'].formPanel.tabPanel.taxesGridPanel.typeField.setValue('%');
                                    else
                                        window['PersonApp'].formPanel.tabPanel.taxesGridPanel.typeField.setValue(' ');
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
                            decimalPrecision: 2,
                            incrementValue: 0.5,
                            accelerate: true
                        }),{
                            xtype: 'displayfield', 
                            value: '&nbsp;&nbsp;'
                        },{
                            ref: '../typeField',
                            xtype: 'displayfield',
                            value: ' '
                        }, '->',{
                            tooltip: bundle.getMsg('app.form.addrow'),
                            iconCls: Ext.ux.Icon('table_row_insert'),
                            listeners: {
                                click: function(button, eventObject) { 
                                    if(window['PersonApp'].taxRecord && window['PersonApp'].formPanel.tabPanel.taxesGridPanel.amountField.isValid()){
                                        var fixed = window['PersonApp'].formPanel.tabPanel.taxesGridPanel.fixedRadioGroup.getValue().getId()=='persontaxfixed';
 
                                        window['PersonApp'].taxRecord.set('amount', window['PersonApp'].formPanel.tabPanel.taxesGridPanel.amountField.getValue());
                                        window['PersonApp'].taxRecord.set('fixed', fixed);
 
                                        var str = window['PersonApp'].formPanel.tabPanel.taxesGridPanel.amountField.getValue();
                                        if(fixed)
                                            str = '$'+str;
                                        else
                                            str = str+'%';
                                        window['PersonApp'].taxRecord.set('amountstr', str);
 
 
                                        window['PersonApp'].selectedTaxesComboStore.insert(window['PersonApp'].selectedTaxesComboStore.getCount(), window['PersonApp'].taxRecord);
 
                                        window['PersonApp'].formPanel.tabPanel.taxesGridPanel.reconfigure(window['PersonApp'].formPanel.tabPanel.taxesGridPanel.getStore(), window['PersonApp'].formPanel.tabPanel.taxesGridPanel.getColumnModel());
 
                                        window['PersonApp'].formPanel.tabPanel.taxesGridPanel.amountField.reset();
                                        window['PersonApp'].formPanel.tabPanel.taxesGridPanel.fixedRadioGroup.reset();
                                        window['PersonApp'].formPanel.tabPanel.taxesGridPanel.taxCombo.reset();
 
                                        window['PersonApp'].taxRecord = false;
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
                                    var records = window['PersonApp'].formPanel.tabPanel.taxesGridPanel.getSelectionModel().getSelections();
                                    window['PersonApp'].selectedTaxesComboStore.remove(records);
                                }
                            }
                        }]
                    }), new Ext.grid.GridPanel({
                        ref: 'activitiesGridPanel',
                        title: bundle.getMsg('activity.tab.label'),	
                        iconCls: Ext.ux.Icon('book_open'),
                        stripeRows: true,
                        autoExpandColumn: 'personactivitymaincolumn',
                        store: this.selectedActivitiesComboStore,
                        sm: new Ext.grid.RowSelectionModel({
                            singleSelect:true, 
                            listeners: {
                                selectionchange: function(selectionModel) {
                                    window['PersonApp'].formPanel.tabPanel.activitiesGridPanel.removeBtn.setDisabled(selectionModel.getCount() < 1);
                                }
                            }
                        }),	
                        view: new Ext.grid.GridView({
                            markDirty: false,
                            forceFit:true
                        }),
                        columns: [this.expander, {
                            id: 'personactivitymaincolumn', 
                            header: bundle.getMsg('activity.field.name'),
                            width: 240, 
                            sortable: true, 
                            dataIndex: 'name'
                        },{
                            header: bundle.getMsg('activity.field.amount'), 
                            width: 60, 
                            sortable: true, 
                            dataIndex: 'amountstr'
                        },{
                            xtype:'datecolumn',
                            format:Date.patterns.NonISO8601Short,
                            header:bundle.getMsg('transaction.filter.from'),
                            width: 60,
                            dataIndex:'fromdate'
                        }],				
                        plugins: [this.expander],
                        tbar: [new Ext.Toolbar.TextItem(bundle.getMsg('app.form.name')+': '),new Ext.form.ComboBox({
                            ref: '../activityCombo',
                            store: window['ActivityApp'].comboStore,
                            width: 500, 
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
                                    var activities = new Array();
                                    window['PersonApp'].selectedActivitiesComboStore.each(function(record){
                                        var r = new Object;
                                        r.id = record.get('id');
                                        activities.push(r);
                                    });
                                    window['ActivityApp'].comboStore.baseParams.distinct = Ext.encode(activities);
                                    this.setValue(queryEvent.query);
                                },
                                select: function(combo, record, index ){
                                    window['PersonApp'].activityRecord = record;
                                    this.collapse();
                                },
                                blur: function(field) {		
                                    if(field.getRawValue() == '')
                                        window['PersonApp'].activityRecord = false;
                                    else {
                                        var record = field.getStore().getAt(field.getStore().find('name',field.getRawValue(), 0, true, true));								 
                                        if(record && record.get('name') == field.getRawValue())
                                            window['PersonApp'].activityRecord = record;
                                        else 
                                            window['PersonApp'].activityRecord = false;
                                    }
                                    window['ActivityApp'].comboStore.baseParams.distinct = '';
                                }
                            }
                        }), new Ext.Toolbar.TextItem('&nbsp;&nbsp;'+bundle.getMsg('transaction.filter.from')+': '), {
                            ref: '../dateField',
                            xtype:'datefield',
                            width: 90,
                            fieldLabel: bundle.getMsg('person.field.creationdate')
                        }, '->',{
                            tooltip: bundle.getMsg('app.form.addrow'),
                            iconCls: Ext.ux.Icon('table_row_insert'),
                            listeners: {
                                click: function(button, eventObject) { 
                                    if(window['PersonApp'].activityRecord){
                                        var obj = window['PersonApp'].formatActivityTaxes(window['PersonApp'].activityRecord);
                                        window['PersonApp'].activityRecord.set('obj', obj);
                                        window['PersonApp'].activityRecord.set('fromdate', window['PersonApp'].formPanel.tabPanel.activitiesGridPanel.dateField.getValue());
                                        if(window['PersonApp'].activityRecord.get('fixed'))
                                            window['PersonApp'].activityRecord.set('amountstr', '$'+window['PersonApp'].activityRecord.get('amount'));
                                        else
                                            window['PersonApp'].activityRecord.set('amountstr', window['PersonApp'].activityRecord.get('amount')+'%');
                                        window['PersonApp'].selectedActivitiesComboStore.insert(window['PersonApp'].selectedActivitiesComboStore.getCount(), window['PersonApp'].activityRecord);
 
                                        window['PersonApp'].formPanel.tabPanel.activitiesGridPanel.reconfigure(window['PersonApp'].formPanel.tabPanel.activitiesGridPanel.getStore(), window['PersonApp'].formPanel.tabPanel.activitiesGridPanel.getColumnModel());
 
                                        window['PersonApp'].formPanel.tabPanel.activitiesGridPanel.activityCombo.reset();
                                        window['PersonApp'].formPanel.tabPanel.activitiesGridPanel.dateField.reset();
                                        window['PersonApp'].activityRecord = false;
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
                                    var records = window['PersonApp'].formPanel.tabPanel.activitiesGridPanel.getSelectionModel().getSelections();
                                    window['PersonApp'].selectedActivitiesComboStore.remove(records);
                                }
                            }
                        }]
                    }), new Ext.grid.GridPanel({
                        ref: 'employeesGridPanel',
                        stripeRows: true,
                        autoExpandColumn: 'personemployeescolcode',
                        title: bundle.getMsg('person.tab.employees'),
                        iconCls: Ext.ux.Icon('group'),
                        store: this.selectedEmployeesComboStore,
                        sm: new Ext.grid.RowSelectionModel({
                            singleSelect:true, 
                            listeners: {
                                selectionchange: function(selectionModel) {
                                    window['PersonApp'].formPanel.tabPanel.employeesGridPanel.removeBtn.setDisabled(selectionModel.getCount() < 1);
                                }
                            }
                        }),	
                        view: new Ext.grid.GridView({
                            markDirty: false,
                            forceFit:true
                        }),
                        columns: [new Ext.grid.RowNumberer(),{
                            header: bundle.getMsg('person.field.identification'),
                            width: 60, 
                            sortable: true, 
                            dataIndex: 'code'
                        },{
                            id: 'personemployeescolcode',
                            header: bundle.getMsg('app.form.longname'),
                            width: 120, 
                            sortable: true, 
                            dataIndex: 'full_name'
                        },{
                            header: bundle.getMsg('app.form.address'),
                            width: 200, 
                            sortable: true, 
                            dataIndex: 'address'
                        },{
                            header: bundle.getMsg('person.field.salary'),
                            width: 90, 
                            sortable: true, 
                            renderer: 'usMoney',
                            dataIndex: 'salary'
                        }],
                        tbar: [new Ext.Toolbar.TextItem(bundle.getMsg('app.form.name')+': '),new Ext.form.ComboBox({
                            ref: '../employeeCombo',
                            store: window['PersonApp'].comboStore,
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
                                    var persons = new Array();
                                    window['PersonApp'].selectedEmployeesComboStore.each(function(record){
                                        var r = new Object;
                                        r.id = record.get('id');
                                        persons.push(r);
                                    });

                                    var record = window['PersonApp'].gridPanel.getSelectionModel().getSelected();
                                    if (record){
                                        var r = new Object;
                                        r.id = record.get('id');
                                        persons.push(r);
                                    }

                                    window['PersonApp'].comboStore.baseParams.distinct = Ext.encode(persons);
                                    this.setValue(queryEvent.query);
                                },
                                select: function(combo, record, index ){
                                    window['PersonApp'].employeeRecord = record;
                                    this.collapse();
                                },
                                blur: function(field) {		
                                    if(field.getRawValue() == '')
                                        window['PersonApp'].employeeRecord = false;
                                    else {
                                        var record = field.getStore().getAt(field.getStore().find('full_name',field.getRawValue(), 0, true, true));								 
                                        if(record && record.get('full_name') == field.getRawValue())
                                            window['PersonApp'].employeeRecord = record;
                                        else 
                                            window['PersonApp'].employeeRecord = false;
                                    }
                                    window['PersonApp'].comboStore.baseParams.distinct = '';
                                }
                            }
                        }),{
                            xtype: 'displayfield', 
                            value: '&nbsp;&nbsp;'
                        },new Ext.Toolbar.TextItem(bundle.getMsg('person.field.salary')+': $'), new Ext.ux.form.SpinnerField({
                            ref: '../salaryField',
                            width: 90, 
                            minValue: 0,
                            allowDecimals: true,
                            decimalPrecision: 2,
                            incrementValue: 0.25,
                            msgTarget: 'qtip',
                            accelerate: true
                        }),'->',{
                            tooltip: bundle.getMsg('app.form.addrow'),
                            iconCls: Ext.ux.Icon('table_row_insert'),
                            listeners: {
                                click: function(button, eventObject) {
                                    if(window['PersonApp'].formPanel.tabPanel.employeesGridPanel.employeeCombo.isValid() && window['PersonApp'].formPanel.tabPanel.employeesGridPanel.salaryField.isValid()){
                                        window['PersonApp'].employeeRecord.set('salary', window['PersonApp'].formPanel.tabPanel.employeesGridPanel.salaryField.getValue());
                                        window['PersonApp'].selectedEmployeesComboStore.insert(window['PersonApp'].selectedEmployeesComboStore.getCount(), window['PersonApp'].employeeRecord);
 
                                        window['PersonApp'].formPanel.tabPanel.employeesGridPanel.reconfigure(window['PersonApp'].formPanel.tabPanel.employeesGridPanel.getStore(), window['PersonApp'].formPanel.tabPanel.employeesGridPanel.getColumnModel());
 
                                        window['PersonApp'].formPanel.tabPanel.employeesGridPanel.employeeCombo.reset();
                                        window['PersonApp'].formPanel.tabPanel.employeesGridPanel.salaryField.reset();
 
                                        window['PersonApp'].employeeRecord = false;
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
                                    var records = window['PersonApp'].formPanel.tabPanel.employeesGridPanel.getSelectionModel().getSelections();
                                    window['PersonApp'].selectedEmployeesComboStore.remove(records);
                                }
                            }
                        }]
                    }), new Ext.grid.GridPanel({
                        ref: 'servicesGridPanel',
                        disabled: true,
                        stripeRows: true,
                        autoExpandColumn: 'personservicemaincolumn',
                        title: bundle.getMsg('service.tab.label'),	
                        iconCls: Ext.ux.Icon('cup'),
                        store: this.selectedServicesComboStore,
                        sm: new Ext.grid.RowSelectionModel({
                            singleSelect:true, 
                            listeners: {
                                selectionchange: function(selectionModel) {
                                    window['PersonApp'].formPanel.tabPanel.servicesGridPanel.removeBtn.setDisabled(selectionModel.getCount() < 1);
                                }
                            }
                        }),	
                        view: new Ext.grid.GridView({
                            markDirty: false,
                            forceFit:true
                        }),
                        columns: [new Ext.grid.RowNumberer(),{
                            id: 'personservicemaincolumn', 
                            header: bundle.getMsg('service.field.name'),
                            width: 200, 
                            sortable: true, 
                            dataIndex: 'name'
                        },{
                            header: bundle.getMsg('service.field.amount'),
                            width: 50, 
                            sortable: true, 
                            renderer: 'usMoney',
                            dataIndex: 'amount'
                        },{
                            header: bundle.getMsg('service.field.collectday'),
                            width: 50, 
                            sortable: true, 
                            dataIndex: 'collectday'
                        }],
                        tbar: [new Ext.Toolbar.TextItem(bundle.getMsg('app.form.name')+': '),new Ext.form.ComboBox({
                            ref: '../serviceCombo',
                            store: window['ServiceApp'].comboStore,
                            width: 330, 
                            emptyText: bundle.getMsg('app.form.typehere'),
                            minChars: 1, //para q busque a partir de 1 caracter...
                            displayField: 'name',
                            typeAhead: false,
                            loadingText: bundle.getMsg('app.msg.wait.searching'),
                            pageSize: config.app_elementsongrid/2,
                            hideTrigger:true,
                            allowBlank: false,
                            tpl: new Ext.XTemplate(
                                '<tpl for="."><div class="search-item">',
                                '<h3>{name}</h3>',
                                '{comment}',
                                '</div></tpl>'
                                ),
                            itemSelector: 'div.search-item',
                            listeners: {
                                beforequery: function(queryEvent) {
                                    var services = new Array();

                                    var r = new Object;
                                    r.id = config.app_mainservice;
                                    services.push(r);

                                    window['PersonApp'].selectedServicesComboStore.each(function(record){
                                        var r = new Object;
                                        r.id = record.get('id');
                                        services.push(r);
                                    });
                                    window['ServiceApp'].comboStore.baseParams.distinct = Ext.encode(services);
                                    this.setValue(queryEvent.query);
                                },
                                select: function(combo, record, index ){
                                    window['PersonApp'].serviceRecord = record;
                                    window['PersonApp'].formPanel.tabPanel.servicesGridPanel.amountField.setValue(record.get('amount'));
                                    this.collapse();
                                },
                                blur: function(field) {		
                                    if(field.getRawValue() == '')
                                        window['PersonApp'].serviceRecord = false;
                                    else {
                                        var record = field.getStore().getAt(field.getStore().find('name',field.getRawValue(), 0, true, true));								 
                                        if(record && record.get('name') == field.getRawValue())
                                            window['PersonApp'].serviceRecord = record;
                                        else 
                                            window['PersonApp'].serviceRecord = false;
                                    }
                                    window['ServiceApp'].comboStore.baseParams.distinct = '';
                                }
                            }
                        }),{
                            xtype: 'displayfield', 
                            value: '&nbsp;&nbsp;$&nbsp;'
                        },new Ext.ux.form.SpinnerField({
                            ref: '../amountField',
                            width: 70,
                            minValue: 0,
                            allowDecimals: true,
                            decimalPrecision: 2,
                            incrementValue: 0.5,
                            allowBlank: false,
                            accelerate: true
                        }),{
                            xtype: 'displayfield', 
                            value: '&nbsp;&nbsp;'+bundle.getMsg('service.field.collectday')+':&nbsp;'
                        }, new Ext.ux.form.SpinnerField({
                            ref: '../collectdayField',
                            width: 50,	
                            minValue: 1,
                            maxValue: 31,
                            allowBlank: false,
                            allowDecimals: false,
                            accelerate: true
                        }), '->',{
                            tooltip: bundle.getMsg('app.form.addrow'),
                            iconCls: Ext.ux.Icon('table_row_insert'),
                            listeners: {
                                click: function(button, eventObject) { 
                                    if(window['PersonApp'].serviceRecord && window['PersonApp'].formPanel.tabPanel.servicesGridPanel.amountField.isValid() && window['PersonApp'].formPanel.tabPanel.servicesGridPanel.collectdayField.isValid()){
                                        window['PersonApp'].serviceRecord.set('amount', window['PersonApp'].formPanel.tabPanel.servicesGridPanel.amountField.getValue());
                                        window['PersonApp'].serviceRecord.set('collectday', window['PersonApp'].formPanel.tabPanel.servicesGridPanel.collectdayField.getValue());
                                        window['PersonApp'].selectedServicesComboStore.insert(window['PersonApp'].selectedServicesComboStore.getCount(), window['PersonApp'].serviceRecord);
 
                                        window['PersonApp'].formPanel.tabPanel.servicesGridPanel.reconfigure(window['PersonApp'].formPanel.tabPanel.servicesGridPanel.getStore(), window['PersonApp'].formPanel.tabPanel.servicesGridPanel.getColumnModel());
 
                                        window['PersonApp'].formPanel.tabPanel.servicesGridPanel.amountField.reset();
                                        window['PersonApp'].formPanel.tabPanel.servicesGridPanel.serviceCombo.reset();
                                        window['PersonApp'].formPanel.tabPanel.servicesGridPanel.collectdayField.reset();
 
                                        window['PersonApp'].serviceRecord = false;
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
                                    var records = window['PersonApp'].formPanel.tabPanel.servicesGridPanel.getSelectionModel().getSelections();
                                    window['PersonApp'].selectedServicesComboStore.remove(records);
                                }
                            }
                        }]
                    })]
                })]	 
            });
            
			
            this.obligationPaymentsStore = new Ext.data.GroupingStore({
                url: config.app_host + '/bar/request/method/load',
                baseParams:{
                    component: 'combounpayed'
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(){},
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : function(){}
                },
                groupField:'period'
            });
            
            this.editor = new Ext.ux.grid.RowEditor({
                saveText: bundle.getMsg('app.form.update'),
                cancelText: bundle.getMsg('app.form.cancel'),
                commitChangesText: bundle.getMsg('app.error.commitneeded'),
                errorText: bundle.getMsg('app.msg.error.title'),
                listeners: {
                    afteredit: function(roweditor, changes, record, rowIndex){
                        if(window['PersonApp'].colectorRecord){
                            record.set('colectorid', window['PersonApp'].colectorRecord.get('id'));
                            window['PersonApp'].colectorRecord = false;
                        }
                    },
                    canceledit: function(){
                        window['PersonApp'].colectorRecord = false;
                    }
                }
            });
			
            this.obligationPaymentsGridPanel = new Ext.grid.GridPanel({
                region:'center',
                layout: 'fit', 
                iconCls: Ext.ux.Icon('money'),
                autoExpandColumn: 'obligationpaymentscolname',
                store: this.obligationPaymentsStore,
                loadMask: true,
                
                plugins: [this.editor],
				
                columns: [{
                    header: bundle.getMsg('person.field.taxcode'), 
                    width: 60, 
                    dataIndex: 'taxcode'
                },{
                    header: bundle.getMsg('person.field.taxname'), 
                    width: 140, 
                    hidden:true,
                    dataIndex: 'taxname'
                },{
                    header: bundle.getMsg('event.field.period'), 
                    width:130,
                    hidden:true,
                    dataIndex:'period'
                },{
                    header: bundle.getMsg('person.field.barcode'), 
                    width: 60, 
                    dataIndex: 'bar'
                },{
                    header: bundle.getMsg('person.field.topay'), 
                    width: 60, 
                    dataIndex: 'amountstr'
                },{
                    header: bundle.getMsg('person.field.payed'), 
                    width: 60, 
                    dataIndex: 'payed',
                    renderer: function(val){
                        if(val)
                            val ='$'+val;
                        return val;
                    },
                    editor: new Ext.ux.form.SpinnerField({
                        minValue: 0,
                        allowDecimals: true,
                        decimalPrecision: 2,
                        incrementValue: 0.5,
                        accelerate: true
                    })
                },{
                    header: bundle.getMsg('app.form.date'), 
                    xtype:'datecolumn',
                    format:Date.patterns.NonISO8601Short,
                    width:70,
                    dataIndex:'paymentdate',
                    editor: {
                        xtype: 'datefield',
                        maxValue: new Date()
                    }
                },{
                    id:'obligationpaymentscolname', 
                    header: bundle.getMsg('person.field.colector'), 
                    width:130,
                    dataIndex:'colector',
                    editor: new Ext.form.ComboBox({
                        store: window['PersonApp'].comboStore,
                        emptyText: bundle.getMsg('app.form.typehere'),
                        minChars: 1, //para q busque a partir de 1 caracter...
                        displayField: 'full_name',
                        typeAhead: false,
                        loadingText: bundle.getMsg('app.msg.wait.searching'),
                        pageSize: config.app_elementsongrid/2,
                        hideTrigger:true,
                        tpl: new Ext.XTemplate(
                            '<tpl for="."><div class="search-item">',
                            '<h3>{code}</h3>',
                            '{full_name}',
                            '</div></tpl>'
                            ),
                        itemSelector: 'div.search-item',
                        listeners: {
                            beforequery: function(queryEvent) {  
                                var pr = window['PersonApp'].gridPanel.getSelectionModel().getSelected();
                                
                                var persons = new Array();
                                var r = new Object;
                                r.id = pr.id;
                                persons.push(r);
                                
                                window['PersonApp'].comboStore.baseParams.distinct = Ext.encode(persons);
                                window['PersonApp'].comboStore.baseParams.permission = true;
                                this.setValue(queryEvent.query);
                            },
                            select: function(combo, record, index ){
                                window['PersonApp'].colectorRecord = record;
                                this.collapse();
                            },
                            blur: function(field) {		
                                if(field.getRawValue() == '')
                                    window['PersonApp'].colectorRecord = false;
                                else {
                                    var record = field.getStore().getAt(field.getStore().find('full_name',field.getRawValue(), 0, true, true));								 
                                    if(record && record.get('full_name') == field.getRawValue())
                                        window['PersonApp'].colectorRecord = record;
                                    else 
                                        window['PersonApp'].colectorRecord = false;
                                }
                                window['PersonApp'].comboStore.baseParams.distinct = '';
                                window['PersonApp'].comboStore.baseParams.permission = false;
                            }
                        }
                    })
                },{
                    xtype: 'booleancolumn',
                    header: bundle.getMsg('person.field.deposited'),
                    dataIndex: 'deposited',
                    width: 50,
                    trueText: bundle.getMsg('app.form.yes'),
                    falseText: bundle.getMsg('app.form.no'),
                    editor: {
                        xtype: 'checkbox'
                    }
                }],
				
                view: new Ext.grid.GroupingView({
                    markDirty: false,
                    forceFit:true,
                    groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? bundle.getMsg("app.form.elements") : bundle.getMsg("app.form.element")]})'
                }),
				
                stripeRows: true,
				
                sm: new Ext.grid.RowSelectionModel({
                    singleSelect:true
                })
            });
            
            
            

            this.selectedTransactionsComboStore = new Ext.data.Store({
                url: config.app_host + '/person/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader()
            });
            
            this.transactionGridPanel = new Ext.grid.GridPanel({
                disabled: true,
                stripeRows: true,
                autoExpandColumn: 'persontransactionmaincolumn',	
                store: this.selectedTransactionsComboStore,
                sm: new Ext.grid.RowSelectionModel({
                    singleSelect:true, 
                    listeners: {
                        selectionchange: function(selectionModel) {
                            window['PersonApp'].transactionGridPanel.removeBtn.setDisabled(selectionModel.getCount() < 1);
                        }
                    }
                }),	
                view: new Ext.grid.GridView({
                    markDirty: false,
                    forceFit:true
                }),
                columns: [new Ext.grid.RowNumberer(),{
                    header: bundle.getMsg('app.form.date'), 
                    xtype:'datecolumn',
                    format:Date.patterns.NonISO8601Short,
                    width: 40,
                    dataIndex:'transactiondate'
                },{
                    id:'persontransactionmaincolumn', 
                    header: bundle.getMsg('app.form.comment'),
                    width: 170, 
                    sortable: true, 
                    dataIndex: 'name'
                },{
                    header: bundle.getMsg('transaction.field.debit'),
                    width: 40, 
                    sortable: true, 
                    renderer: 'usMoney',
                    dataIndex: 'debit'
                },{
                    header: bundle.getMsg('transaction.field.credit'),
                    width: 40, 
                    sortable: true, 
                    renderer: 'usMoney',
                    dataIndex: 'credit'
                }],
                tbar: [new Ext.Toolbar.TextItem(bundle.getMsg('app.form.date')+': '), {
                    ref: '../dateField',
                    xtype:'datefield',
                    maxValue: new Date(),
                    allowBlank: false
                }, {
                    xtype: 'displayfield', 
                    value: '&nbsp;&nbsp;'+bundle.getMsg('app.form.comment')+': '
                },{	
                    ref: '../descField',						
                    xtype:'textfield',
                    width: 290,			
                    allowBlank:false						
                },{
                    xtype: 'displayfield', 
                    value: '&nbsp;&nbsp;&nbsp;&nbsp;'
                },{
                    ref: '../debtRadioGroup',
                    xtype: 'radiogroup',
                    width: 140, 
                    labelSeparator: '',
                    items: [{
                        boxLabel: bundle.getMsg('transaction.field.debit'), 
                        id: 'persontransactiondebt', 
                        name: 'persontransactiondebt', 
                        inputValue: true, 
                        checked: true
                    },{
                        boxLabel: bundle.getMsg('transaction.field.credit'), 
                        id: 'persontransactionpercentage',
                        name: 'persontransactiondebt', 
                        inputValue: false
                    }]
                },{
                    xtype: 'displayfield', 
                    value: '&nbsp;&nbsp;$&nbsp;'
                },new Ext.ux.form.SpinnerField({
                    ref: '../amountField',
                    width: 70,
                    minValue: 0,
                    allowDecimals: true,
                    allowBlank: false,
                    decimalPrecision: 2,
                    incrementValue: 0.5,
                    accelerate: true
                }),'->',{
                    tooltip: bundle.getMsg('app.form.addrow'),
                    iconCls: Ext.ux.Icon('table_row_insert'),
                    listeners: {
                        click: function(button, eventObject) { 
                            if(window['PersonApp'].transactionGridPanel.dateField.isValid() && window['PersonApp'].transactionGridPanel.descField.isValid() && window['PersonApp'].transactionGridPanel.amountField.isValid()){
                                window['PersonApp'].transactionpassRecord = new Ext.data.Record({
                                    transactiondate: window['PersonApp'].transactionGridPanel.dateField.getValue(),
                                    name: window['PersonApp'].transactionGridPanel.descField.getValue(),
                                    debit: window['PersonApp'].transactionGridPanel.debtRadioGroup.getValue().inputValue == true ? window['PersonApp'].transactionGridPanel.amountField.getValue():'',
                                    credit: window['PersonApp'].transactionGridPanel.debtRadioGroup.getValue().inputValue == false? window['PersonApp'].transactionGridPanel.amountField.getValue():''
                                });
                            
                                if(window['PersonApp'].transactionGridPanel.debtRadioGroup.getValue().inputValue == true){
                                    window['PersonApp'].regannexRecord = window['PersonApp'].transactionGridPanel.amountField.getValue();
                                    Ext.fly(window['PersonApp'].subtotalAnnex.getEl()).update('$'+parseFloat(window['PersonApp'].regannexRecord).toFixed(2));
                                    window['PersonApp'].regannexGridPanel.amountField.setMaxValue(window['PersonApp'].regannexRecord);
                                    
                                    window['PersonApp'].window.setTitle(bundle.getMsg('transaction.field.regannex'));
                                    Ext.getCmp('transactionContentPanel').getLayout().setActiveItem(1); 
                                }
                                else{
                                    window['PersonApp'].selectedTransactionsComboStore.insert(window['PersonApp'].selectedTransactionsComboStore.getCount(), window['PersonApp'].transactionpassRecord);
                                }
                                
                                window['PersonApp'].transactionGridPanel.dateField.reset();
                                window['PersonApp'].transactionGridPanel.descField.reset();
                                window['PersonApp'].transactionGridPanel.amountField.reset();
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
                            var records = window['PersonApp'].transactionGridPanel.getSelectionModel().getSelections();
                            window['PersonApp'].selectedTransactionsComboStore.remove(records);
                        }
                    }
                }]
            });
            
            this.subtotalAnnex = new Ext.Toolbar.TextItem('');

            this.selectedRegannexsComboStore = new Ext.data.Store({
                url: config.app_host + '/person/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader()
            });
            
            this.regannexGridPanel = new Ext.grid.GridPanel({
                disabled: true,
                stripeRows: true,
                autoExpandColumn: 'personregannexmaincolumn',	
                store: this.selectedRegannexsComboStore,
                sm: new Ext.grid.RowSelectionModel({
                    singleSelect:true, 
                    listeners: {
                        selectionchange: function(selectionModel) {
                            window['PersonApp'].regannexGridPanel.removeBtn.setDisabled(selectionModel.getCount() < 1);
                        }
                    }
                }),	
                view: new Ext.grid.GridView({
                    markDirty: false,
                    forceFit:true
                }),
                columns: [new Ext.grid.RowNumberer(),{
                    id: 'personregannexmaincolumn', 
                    header: bundle.getMsg('person.field.transactionelement'),
                    width: 140, 
                    sortable: true, 
                    dataIndex: 'name'
                },{
                    header: bundle.getMsg('app.form.amount'),
                    width: 50, 
                    sortable: true, 
                    renderer: 'usMoney',
                    dataIndex: 'debit'
                }],
                tbar: [new Ext.Toolbar.TextItem(bundle.getMsg('person.field.transactionelement')+': '), new Ext.form.ComboBox({
                    ref: '../elementCombo',
                    store: window['ElementApp'].comboStore,
                    width: 240, 
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
                            window['PersonApp'].selectedRegannexsComboStore.each(function(record){
                                var r = new Object;
                                r.id = record.get('id');
                                elements.push(r);
                            });
                            window['ElementApp'].comboStore.baseParams.distinct = Ext.encode(elements);
                            this.setValue(queryEvent.query);
                        },
                        select: function(combo, record, index ){
                            window['PersonApp'].elementRecord = record;
                            this.collapse();
                        },
                        blur: function(field) {		
                            if(field.getRawValue() == '')
                                window['PersonApp'].elementRecord = false;
                            else {
                                var record = field.getStore().getAt(field.getStore().find('name',field.getRawValue(), 0, true, true));								 
                                if(record && record.get('name') == field.getRawValue())
                                    window['PersonApp'].elementRecord = record;
                                else 
                                    window['PersonApp'].elementRecord = false;
                            }
                            window['ElementApp'].comboStore.baseParams.distinct = '';
                        }
                    }
                }),{
                    xtype: 'displayfield', 
                    value: '&nbsp;&nbsp;$&nbsp;'
                },new Ext.ux.form.SpinnerField({
                    ref: '../amountField',
                    width: 70,
                    minValue: 0,
                    allowDecimals: true,
                    allowBlank: false,
                    decimalPrecision: 2,
                    incrementValue: 0.5,
                    accelerate: true
                }),{
                    xtype: 'displayfield', 
                    value: '&nbsp;/&nbsp;'
                }, this.subtotalAnnex, '->',{
                    tooltip: bundle.getMsg('app.form.addrow'),
                    iconCls: Ext.ux.Icon('table_row_insert'),
                    listeners: {
                        click: function(button, eventObject) { 
                            if(window['PersonApp'].elementRecord && window['PersonApp'].regannexGridPanel.amountField.isValid()){
                                window['PersonApp'].elementRecord.set('debit', window['PersonApp'].regannexGridPanel.amountField.getValue());
                                window['PersonApp'].selectedRegannexsComboStore.insert(window['PersonApp'].selectedRegannexsComboStore.getCount(), window['PersonApp'].elementRecord);
                                
                                window['PersonApp'].regannexRecord -= window['PersonApp'].regannexGridPanel.amountField.getValue();
                                
                                Ext.fly(window['PersonApp'].subtotalAnnex.getEl()).update('$'+parseFloat(window['PersonApp'].regannexRecord).toFixed(2));
                                window['PersonApp'].regannexGridPanel.amountField.setMaxValue(window['PersonApp'].regannexRecord);
                                    
                                    
                                var record = window['PersonApp'].gridPanel.getSelectionModel().getSelected();
                                if (window['PersonApp'].regannexRecord == 0 && record){
                                    var array = new Array();       
                                    window['PersonApp'].selectedRegannexsComboStore.each(function(record){
                                        var r = new Object;
                                        r.id = record.get('id');
                                        r.name = record.get('name');
                                        r.debit = record.get('debit');
                                        array.push(r);
                                    });
                                    window['PersonApp'].transactionpassRecord.set('regannex', Ext.encode(array));
                                    
                                    window['PersonApp'].selectedTransactionsComboStore.insert(window['PersonApp'].selectedTransactionsComboStore.getCount(), window['PersonApp'].transactionpassRecord);
                                    
                                    window['PersonApp'].transactionpassRecord = false;
                                    
                                    window['PersonApp'].selectedRegannexsComboStore.removeAll();
                            
                                    window['PersonApp'].window.setTitle(String.format(bundle.getMsg('person.window.transactions.title'), record.get('full_name')));
                                    Ext.getCmp('transactionContentPanel').getLayout().setActiveItem(0); 
                                }
                                
                                window['PersonApp'].elementRecord = false;
                                window['PersonApp'].regannexGridPanel.elementCombo.reset();
                                window['PersonApp'].regannexGridPanel.amountField.reset();
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
                        //                            var records = window['PersonApp'].regannexGridPanel.getSelectionModel().getSelections();
                        //                            window['PersonApp'].selectedRegannexsComboStore.remove(records);
                        }
                    }
                }]
            });

        },		
  
        formatActivityTaxes : function(record){
            var html = '<div style="width:100%">\
                            <div style="width:5%; float:left">&nbsp;&nbsp;</div>\
                            <div style="width:10%; float:left"><b>'+bundle.getMsg('tax.field.code')+'</b></div>\
                            <div style="width:70%; float:left"><b>'+bundle.getMsg('tax.field.name')+'</b></div>\
                            <div style="width:15%; float:left"><b>'+bundle.getMsg('tax.field.amount')+'</b></div>\
                        </div>';
            
            var taxes = record.get('Taxes');
            for (var i = 0; taxes && i < taxes.length; i++){
                var relpos = taxes[i].TaxActivityRelation.length-1;
                var cant = taxes[i].TaxActivityRelation[relpos].amount;
                if(taxes[i].TaxActivityRelation[relpos].fixed)
                    cant = '$' + cant;
                else
                    cant = cant + '%';
                
                html += '<div style="width:100%">\
                            <div style="width:5%; float:left">&nbsp;&nbsp;</div>\
                            <div style="width:10%; float:left">'+taxes[i].code+'</div>\
                            <div style="width:70%; float:left">'+taxes[i].name+'</div>\
                            <div style="width:15%; float:left">'+cant+'</div>\
                        </div>';
            }

            return html;
        },		
  
        calculateAge : function(birthDate){
            if (birthDate){
                var today = new Date();
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age;
            }
            return 0;
        },
  
        calculateBirthday : function(identification){
            var year = '19'+identification.substring(0, 2);
            var month = identification.substring(2, 4);
            var day = identification.substring(4, 6);
            if(Date.isValid(year, month, day)){
                var dt = new Date(month+'/'+day+'/'+year+' 03:05:01 PM GMT-0600');
 
                window['PersonApp'].formPanel.tabPanel.generalPanel.dateofbirthField.setValue(dt);
                window['PersonApp'].formPanel.tabPanel.generalPanel.dateofbirthField.setReadOnly(true);
 
                var age = window['PersonApp'].calculateAge(dt);
                window['PersonApp'].formPanel.tabPanel.generalPanel.personageField.setValue(age);
                window['PersonApp'].formPanel.tabPanel.generalPanel.personageField.setReadOnly(true);
            }
            else{
                window['PersonApp'].formPanel.tabPanel.generalPanel.identificationField.markInvalid(bundle.getMsg('app.error.fieldinvalid'));
                window['PersonApp'].formPanel.tabPanel.generalPanel.dateofbirthField.setReadOnly(false);
            }
        },
  
        loadPersonDetails : function(callback) {
            App.mask.show();
            var record = window['PersonApp'].gridPanel.getSelectionModel().getSelected();
            
            new Ext.data.Connection().request({
                url: config.app_host + '/person/request/method/load/component/details',
                params: {
                    id: record.get('id')
                },
                callback : function(options, success, response) {
                    var record = window['PersonApp'].gridPanel.getSelectionModel().getSelected();
                    var object = Ext.decode(response.responseText);
                    
                    record.set('first_name', object.sfGuardUser.first_name);
                    record.set('last_name', object.sfGuardUser.last_name);
                    
                    if(!window['PersonApp'].locationRecord)
                        window['PersonApp'].locationRecord = new Object;
                    
                    if(object.Location){
                        window['PersonApp'].locationRecord.id = object.Location.id;                   
                        record.set('location', object.Location.name);
                    }
                    record.set('PersonPersonRelation', object.PersonPersonRelation);
                    record.set('PersonActivityRelation', object.PersonActivityRelation);
                    record.set('Taxes', object.Taxes);
                    record.set('Services', object.Services);
                    
                    App.mask.hide();
                    
                    if(callback)
                        callback();
                }
            });
            
        },
  
        disposeForm : function(field, checked) {
            var ispatented = Ext.getCmp('personpatented').getValue()
            var isusufructuary = Ext.getCmp('personusufructuary').getValue()
            var isclient = Ext.getCmp('personclient').getValue();


            window['PersonApp'].formPanel.tabPanel.activitiesGridPanel.setDisabled(!ispatented);
            if(window['PersonApp'].formPanel.tabPanel.activitiesGridPanel.disabled)
                window['PersonApp'].formPanel.tabPanel.activitiesGridPanel.getStore().removeAll();

            window['PersonApp'].formPanel.tabPanel.employeesGridPanel.setDisabled(!ispatented && !isusufructuary);
            if(window['PersonApp'].formPanel.tabPanel.employeesGridPanel.disabled)
                window['PersonApp'].formPanel.tabPanel.employeesGridPanel.getStore().removeAll();

            window['PersonApp'].formPanel.tabPanel.servicesGridPanel.setDisabled(!isclient);
            if(window['PersonApp'].formPanel.tabPanel.servicesGridPanel.disabled)
                window['PersonApp'].formPanel.tabPanel.servicesGridPanel.getStore().removeAll();

            window['PersonApp'].formPanel.tabPanel.taxesGridPanel.setDisabled(!ispatented && !isusufructuary);
            if(window['PersonApp'].formPanel.tabPanel.taxesGridPanel.disabled)
                window['PersonApp'].formPanel.tabPanel.taxesGridPanel.getStore().removeAll();

            window['PersonApp'].formPanel.tabPanel.generalPanel.tabPanel.onatPanel.setDisabled(!ispatented && !isusufructuary);
            if(window['PersonApp'].formPanel.tabPanel.generalPanel.tabPanel.onatPanel.disabled){
                window['PersonApp'].formPanel.tabPanel.generalPanel.tabPanel.onatPanel.patentField.setValue('');
                window['PersonApp'].formPanel.tabPanel.generalPanel.tabPanel.onatPanel.inscriptionField.setValue('');
                window['PersonApp'].formPanel.tabPanel.generalPanel.tabPanel.onatPanel.nitField.setValue('');
                window['PersonApp'].formPanel.tabPanel.generalPanel.tabPanel.onatPanel.placeCombo.setValue('');
            }
            window['PersonApp'].formPanel.tabPanel.generalPanel.tabPanel.onatPanel.patentField.setDisabled(!ispatented);
        },

        showWindow : function(animateTarget, hideApply, callback){
            var resetFn = function(){
                document.getElementById('personpicture').src = 'images/avatar.png';
                document.getElementById('bar').src = config.app_host + '/graph.php?graph=barcode&data=1234567890&type=code39&trick=barcode.png';
 
                window['PersonApp'].locationRecord = false;
                window['PersonApp'].selectedEmployeesComboStore.removeAll();
                window['PersonApp'].selectedTaxesComboStore.removeAll();
                window['PersonApp'].selectedActivitiesComboStore.removeAll();
                window['PersonApp'].selectedServicesComboStore.removeAll();
  
                Ext.getCmp('personpatented').setValue(false);
                Ext.getCmp('personusufructuary').setValue(false);
                Ext.getCmp('personclient').setValue(false);
                window['PersonApp'].disposeForm();
            };
            
            window['PersonApp'].window = App.showWindow(bundle.getMsg('person.window.title'), 800, 430, window['PersonApp'].formPanel, 
                function(button){
                    if(!button){
                        button = new Object;
                        button.id = window['PersonApp'].window.submitBtn.id;
                    }

                    var records = window['PersonApp'].gridPanel.getSelectionModel().getSelections();

                    var activities = new Array();
                    window['PersonApp'].selectedActivitiesComboStore.each(function(record){
                        var r = new Object;
                        r.id = record.get('id');
                        r.fromdate = record.get('fromdate');
                        activities.push(r);
                    });
  
                    var employees = new Array();
                    window['PersonApp'].selectedEmployeesComboStore.each(function(record){
                        var r = new Object;
                        r.id = record.get('id');
                        r.amount = record.get('salary');
                        employees.push(r);
                    });
  
                    var taxes = new Array();
                    window['PersonApp'].selectedTaxesComboStore.each(function(record){
                        var r = new Object;
                        r.id = record.get('id');
                        r.amount = record.get('amount');
                        r.fixed = record.get('fixed');
                        taxes.push(r);
                    });
  
                    var services = new Array();
                    window['PersonApp'].selectedServicesComboStore.each(function(record){
                        var r = new Object;
                        r.id = record.get('id');
                        r.amount = record.get('amount');
                        r.collectday = record.get('collectday');
                        services.push(r);
                    });
                    
                    
                    
                    Ext.Ajax.request({
                        url: config.app_host + '/person/request/method/validate',
                        params : {
                            id: records[0]?records[0].get('id'):'',
                            username : window['PersonApp'].formPanel.tabPanel.generalPanel.identificationField.getValue(),
                            validate:'ci'
                        },
                        callback : function(options, success, response) {
                            var responseData = Ext.decode(response.responseText);
                            if(!responseData.success)
                                window['PersonApp'].formPanel.tabPanel.generalPanel.identificationField.markInvalid(bundle.getMsg(responseData.message));  
                            else{
                                
                                window['PersonApp'].formPanel.getForm().submit({
                                    waitTitle : bundle.getMsg('app.msg.wait.title'), 
                                    waitMsg: bundle.getMsg('app.msg.wait.text'), 
                                    clientValidation: true,
                                    params: {
                                        js: 'person',
                                        entityid: config.multientityapp ? config.app_entityid : '',
                                        id: records[0] ? records[0].get('id') : '',
                                        location_id: window['PersonApp'].locationRecord?window['PersonApp'].locationRecord.id:'',
                                        place_id: window['PersonApp'].formPanel.tabPanel.generalPanel.tabPanel.onatPanel.placeCombo.getValue(),
                                        sex_id: window['PersonApp'].formPanel.tabPanel.generalPanel.sexCombo.getValue(),
                                        picture : document.getElementById('personpicture').src,
                                        activities: Ext.encode(activities),
                                        employees: Ext.encode(employees),
                                        taxes: Ext.encode(taxes),
                                        services: Ext.encode(services)
                                    }, 
                                    success: function(form, action) {
                                        checkSesionExpired(form, action);
                                        window['PersonApp'].store.load({
                                            params:{
                                                start: window['PersonApp'].gridPanel.getBottomToolbar().cursor
                                            }
                                        });
                            
                                        submitFormSuccessful('PersonApp', form, action, button, !records[0], resetFn, callback);
                                    },
                                    failure: loadFormFailed
                                });
                    
                                
                            }
                        }
                    });

                }, 
                function(){
                    resetFn();
                    window['PersonApp'].formPanel.getForm().reset();
                    window['PersonApp'].window.hide();
                }, 
                animateTarget,
                false,
                false,
                false,
                hideApply ? hideApply : false);
        },
		
        showDateRangeWindow : function(animateTarget, hideApply, callback){
            window['PersonApp'].window = App.showWindow('Periodo de tiempo', 300, 140, window['PersonApp'].daterangeFormPanel, 
                function(button){
                    var msg=App.mask.msg;
                    App.mask.msg=bundle.getMsg('person.action.export.findingelements')+'...';
                    App.mask.show();
					
                    new Ext.data.Connection().request({
                        url: config.app_host+'/person/request/method/getidsbydaterange',
                        params: {
                            fromdate: window['PersonApp'].daterangeFormPanel.fromDate.value,
                            todate: window['PersonApp'].daterangeFormPanel.toDate.value
                        },
                        method: 'POST',
                        callback : function(options, success, response) {
                            var json = Ext.decode(response.responseText); 
							
                            window['PersonApp'].window.hide();
                            window['PersonApp'].daterangeFormPanel.getForm().reset();
							
                            var array=new Array();  
                            for (var i=0; i<json.message.data.length; i++)
                                array.push(json.message.data[i].id);
                    
                            App.mask.hide();
                            App.mask.msg = msg;
							
                            window['PersonApp'].exploreANDexportPersons(array);
                        }
                    });
            }, 
            function(){
                window['PersonApp'].window.hide();
                window['PersonApp'].daterangeFormPanel.getForm().reset();
            }, 
            animateTarget,
            false,
            false,
            false,
            hideApply ? hideApply : false);
    },
		
    exportPlanFn: function(button, eventObject) {            
        var records = window['PersonApp'].gridPanel.getSelectionModel().getSelections();
											
        var array=new Array();  
        for (var i=0; i<records.length; i++)
            array.push(records[i].get('id'));
            
        window['PersonApp'].exploreANDexportPersons(array);
    },
    exploreANDexportPersons: function(array) {
        var msg=App.mask.msg;
        App.mask.msg=bundle.getMsg('person.action.export.findingelements')+'...';
        App.mask.show();
			
        new Ext.data.Connection().request({
            url: config.app_host+'/person/request/method/explore',
            params: {
                ids: Ext.encode(array)
            },
            method: 'POST',
            callback : function(options, success, response) {
                var json = Ext.decode(response.responseText); 
                var persons = json.message;
                var total = persons.length;
                    
                App.mask.hide();
                App.mask.msg = msg;
                    
                var processPerson = function(persons, nextFn) {
                    var start = (persons.length-total)*-1;
                    if(persons && persons.length>0){
                        var currentperson = Ext.util.Format.ellipsis(persons[0].name, 30);
                            
                        Ext.MessageBox.progress(bundle.getMsg('app.msg.wait.title'), String.format(bundle.getMsg('person.action.export.description'), start+1, total) + '...');
                        Ext.MessageBox.updateProgress(start/total, currentperson);
                            
                        new Ext.data.Connection().request({
                            url: 'person/request/method/export',
                            method: 'POST',
                            params: {   
                                id: persons[0].id,
                                item: start == 0 ? true : '',
                                location: json.location
                            },
                            callback : function(options, success, response) {
                                persons.splice(0,1);
                                nextFn(persons, processPerson);
                            }
                        });
                    }
                    else{
                        Ext.MessageBox.hide();        
                        window.open(config.app_host + '/person/request/method/viewexport/location/'+json.location);
                    }
                };
                    
                processPerson(persons, processPerson);
            }
        });
    },
    importPlanFn: function(button, eventObject) {
			
        var processFn = function(url){
            var msg = App.mask.msg;
            App.mask.msg=bundle.getMsg('person.action.export.findingelements')+'...';
            App.mask.show();
               
            new Ext.data.Connection().request({
                url: config.app_host+'/person/request/method/readimport',
                params: {
                    url: url ? 'web/'+url : ''
                },
                method: 'POST',
                callback : function(options, success, response) {
                    App.mask.hide();
                    var json = Ext.decode(response.responseText); 
                       
                    var metadata = json.message;
                        
                    Ext.Base.msg('', String.format(bundle.getMsg('person.action.import.message'), metadata.metadata.author, metadata.metadata.date));
                        
                    App.mask.msg = msg;
                        
                    var processTask = function(start, nextFn) {
                        if(start < metadata.amount){
                            Ext.MessageBox.progress(bundle.getMsg('app.msg.wait.title'), bundle.getMsg('person.action.export.explore')+ '...');
                            Ext.MessageBox.updateProgress(start/metadata.amount, String.format(bundle.getMsg('person.action.import.description'), start+1, metadata.amount));
                                
                            new Ext.data.Connection().request({
                                url: 'person/request/method/import',
                                method: 'POST',
                                params: {
                                    item: start,
                                    url: url ? 'web/'+url : ''
                                },
                                callback : function(options, success, response) {
                                    start++;
                                    nextFn(start, processTask);
                                }
                            });
                        }
                        else{
                            Ext.MessageBox.hide(); 
                            window['PersonApp'].store.load({
                                params:{
                                    start: window['PersonApp'].gridPanel.getBottomToolbar().cursor
                                }
                            });
                        }
                    };
                        
                    processTask(0, processTask);
                }
            });
        };
            
        Ext.getCmp('picture').regex = Date.patterns.OnlyZI1Allowed;
        showPictureForm(false, 'web/uploads/db', processFn);
    },
  
  
    disableBalancePanel : function(disabled){
        window['PersonApp'].transactionGridPanel.setDisabled(disabled);
        window['PersonApp'].regannexGridPanel.setDisabled(disabled);
            
        window['PersonApp'].window.submitBtn.setDisabled(disabled);
        window['PersonApp'].window.applyBtn.setDisabled(disabled); 
        console.info(disabled);
                       
    },
  
  
    applySecurity : function(groups, permissions){
        window['PersonApp'].gridPanel.addBtn.setVisible(permissions.indexOf('manageperson') != -1 || permissions.indexOf('managepersonadd') != -1);
        window['PersonApp'].gridPanel.updateBtn.setVisible(permissions.indexOf('manageperson') != -1 || permissions.indexOf('managepersonedit') != -1);
        window['PersonApp'].gridPanel.removeBtn.setVisible(permissions.indexOf('manageperson') != -1 || permissions.indexOf('managepersondelete') != -1);
        window['PersonApp'].gridPanel.paymentBtn.setVisible(permissions.indexOf('manageperson') != -1 || permissions.indexOf('managepersonpayment') != -1);
        window['PersonApp'].gridPanel.balanceBtn.setVisible(permissions.indexOf('manageperson') != -1 || permissions.indexOf('managepersontransaction') != -1);
        window['PersonApp'].gridPanel.reportBtn.setVisible(permissions.indexOf('manageperson') != -1 || permissions.indexOf('managepersonreport') != -1);
        Ext.getCmp('switchSignOutBtn').setVisible(permissions.indexOf('manageperson') != -1 || permissions.indexOf('managepersonsignout') != -1);
    }
}
}();

