ExampleApp = function() {
    return {
        init : function(ExampleApp) {			

            this.store = new Ext.SgArqBase.AdjacencyListStore({
                baseParams:{
                    component: 'tree',
                    start:0
                },
                parent_id_field_name: 'parentid',
                leaf_field_name: 'leaf',
                url: config.app_host+'/example/request/method/load',
                reader: new Ext.data.JsonReader({
                    id: 'url',
                    root: 'data',
                    totalProperty: 'results',
                    successProperty: 'success'
                }),
                listeners: {
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(store, records, options) { 
                        alertNoRecords(records);
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });

            this.nameRender = function(val) {
                return '<table border="0"><tr>\
                            <td><img src="images/icons/famfamfam/folder.png" height="13px"></td><td>&nbsp;'+val+'</td>\
                        </tr></table>';
            };


			
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
                    type: 'int',
                    dataIndex: 'value',
                    menuItemCfgs : {
                        emptyText: bundle.getMsg('app.form.value'),
                        selectOnFocus: true,
                        width: 125
                    }
                }]
            });

            this.treeGridView = new Ext.SgArqBase.GridPanel({
                iconCls: Ext.ux.Icon('expand-all', 'myicons'),
                title: 'TreeGrid basado en GridView',
                store: this.store,
                maskConfig:{
                    msg:bundle.getMsg("app.layout.loading")+'...'
                },
                master_column_id : 'treeGridViewMainColumn',
                columns: [{
                    id:'treeGridViewMainColumn',
                    renderer: this.nameRender,
                    header:bundle.getMsg('app.form.name'),
                    width:360,
                    sortable:true,
                    dataIndex:'name'
                },{
                    header: bundle.getMsg('example.field.nick'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'nick'
                },{
                    header: bundle.getMsg('example.field.comment'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'comment'
                },{
                    header: 'Hijos', 
                    width: 60, 
                    sortable: true, 
                    dataIndex: 'childs'
                }],
                stripeRows: true,
                plugins: [this.filters],
                autoExpandColumn: 'treeGridViewMainColumn',
                bbar: new Ext.SgArqBase.PagingToolbar({
                    store: this.store,
                    displayInfo: true,
                    pageSize: parseInt(config.app_elementsongrid),
                    doRefresh : function(){
                        var record = window['ExampleApp'].treeGridView.getSelectionModel().getSelected();
                        if (record)
                            window['ExampleApp'].store.load({
                                start: 0,
                                node: record.get('id')
                            });
                        else
                            window['ExampleApp'].store.load();
                    },
                    items:[{
                        iconCls: Ext.ux.Icon('link_break'),
                        tooltip: 'Deseleccionar todo',
                        handler: function(button, eventObject) {
                            window['ExampleApp'].treeGridView.getSelectionModel().clearSelections();
                        }
                    }]
                }),
                tools:[{
                    id:'print',
                    qtip: bundle.getMsg('app.languaje.report.printview'),
                    handler: function(button, eventObject) {
                    //App.printView(window['ExampleApp'].treeGridView);
                    }
                }],

                listeners: {
                    activate: function(gridpanel){
                        window['ExampleApp'].store.load();
                    }
                }
            });


			
            this.treeGridPanel = new Ext.grid.GridPanel({
                id: 'gridPanelReminder',
                layout: 'fit', 
                iconCls: Ext.ux.Icon('expand-all', 'myicons'),
                title: 'TreeGrid basado en GridPanel',
                autoExpandColumn: 'treeGridPanelMainColumn',
                store: this.store,
                loadMask: true,
                tools: [{
                    id:'print',
                    qtip: bundle.getMsg('app.languaje.report.printview'),
                    handler: function(button, eventObject) {
                    //App.printView(window['ExampleApp'].treeGridPanel);
                    }
                }],

                listeners: {
                    activate: function(gridpanel){
                        gridpanel.getStore().load();
                    },
                    rowdblclick : function(grid, rowIndex, eventObject) {
                        if(grid.updateBtn && !grid.updateBtn.disabled && !grid.updateBtn.hidden)
                            grid.updateBtn.fireEvent('click', grid.updateBtn);
                    },
                    keypress : function(e){
                        panelKeyPress(e, window['ExampleApp'].gridPanel);
                    }
                },
				
                columns: [{
                    id:'treeGridPanelMainColumn', 
                    header: bundle.getMsg('app.form.name'), 
                    width: 360, 
                    sortable: true, 
                    dataIndex: 'name'
                },{
                    header: bundle.getMsg('app.form.comment'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'comment'
                },{
                    header: bundle.getMsg('app.form.nick'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'nick'
                },{
                    header: 'Hijos', 
                    width: 60, 
                    sortable: true, 
                    dataIndex: 'childs'
                }],
				
                stripeRows: true,
				
                bbar: new Ext.PagingToolbar({
                    pageSize: parseInt(config.app_elementsongrid),
                    store: this.store,
                    //                    items: [{
                    //                        tooltip: bundle.getMsg('app.form.clearfilters'),
                    //                        iconCls: Ext.ux.Icon('link_break'),
                    //                        handler: function () {
                    //                            window['ExampleApp'].treeGridPanel.filters.clearFilters();
                    //                        } 
                    //                    }],
                    displayInfo: true,
                    displayMsg: bundle.getMsg('app.form.bbar.displaymsg'),
                    emptyMsg: bundle.getMsg('app.form.bbar.emptymsg')
                }),
				
                sm: new Ext.grid.RowSelectionModel({
                    singleSelect:false
                })
            });
            this.treeGridPanel.getView().getRowClass = function(record, index, rowParams, store) {
                if (!record.get('leaf')) 
                    return 'row-italic';
            };

            this.testStore =new Ext.data.Store({
                baseParams:{
                    component: 'auto',
                    start:0
                },
                proxy: new Ext.data.ScriptTagProxy({
                    url: config.app_host+'/example/request/method/load'
                }),

                reader: new Ext.data.JsonReader({
                    root: 'topics',
                    totalProperty: 'totalCount',
                    idProperty: 'threadid',
                    fields: ['title', 'forumtitle', 'forumid', 'author',{
                        name: 'replycount', 
                        type: 'int'
                    },{
                        name: 'lastpost', 
                        mapping: 'lastpost', 
                        type: 'date', 
                        dateFormat: 'timestamp'
                    }, 'lastposter', 'excerpt']
                })
            });
            this.testPanel =new Ext.grid.GridPanel({
                frame:true,
                title:'ExtJS.com - Browse Forums',
                trackMouseOver:false,
                autoExpandColumn: 'topic',
                store: this.testStore,

                columns: [new Ext.grid.RowNumberer({
                    width: 30
                }),{
                    id: 'topic',
                    header: "Topic",
                    dataIndex: 'title',
                    width: 420,
                    sortable:true
                }],

                bbar: new Ext.PagingToolbar({
                    store: this.testStore,
                    pageSize:500,
                    displayInfo:true
                }),

                view: new Ext.ux.grid.BufferView({
                    // custom row height
                    rowHeight: 34,
                    // render rows as they come into viewable area.
                    scrollDelay: false
                }),

                listeners: {
                    activate: function(gridpanel){
                        window['ExampleApp'].testStore.load();
                    }
                }
            });

            this.cardPanel = new Ext.Panel({
                id: 'gridPanelExample',
                title: config.app_showgridtitle ? bundle.getMsg("example.grid.title") : '',
                layout:'card',
                activeItem: 0, // index or id
                items: [window['ExampleApp'].testPanel, window['ExampleApp'].treeGridView, window['ExampleApp'].treeGridPanel],
                tools:[{
                    id:'left',
                    handler: function(button, eventObject) {
                        window['ExampleApp'].cardPanel.getLayout().setActiveItem(0); 
                    }
                },{
                    id:'right',
                    handler: function(button, eventObject) {
                        window['ExampleApp'].cardPanel.getLayout().setActiveItem(1); 
                    }
                }],
                activate:function(){
                    window['ExampleApp'].cardPanel.getLayout().setActiveItem(0); 
                }
            });
        },

        showWindow : function(animateTarget){

        },

        applySecurity : function(groups, permissions){

        }
    }
}();

