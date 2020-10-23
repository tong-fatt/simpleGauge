// const { consoleTestResultHandler } = require("tslint/lib/test");

$(document).ready(function(){

    // hook up an event handler for the load button click
    // wait to initialize until the button is clicked

    // $("#initializeButton").click(function(){
      $(document).ready(function () {

        //disable the buttion after it has been clicked
        // $("initializeButton").prop('disabled', true);

        tableau.extensions.initializeAsync().then(function(){

            let dataSourceFetchPromises = [];

            // Maps dataSource id to dataSource so we can keep track of unique dataSources.
            let dashboardDataSources = {};
      
            // To get dataSource info, first get the dashboard.
            const dashboard = tableau.extensions.dashboardContent.dashboard;
      
            // Then loop through each worksheet and get its dataSources, save promise for later.
            dashboard.worksheets.forEach(function (worksheet) {
              dataSourceFetchPromises.push(worksheet.getDataSourcesAsync());
            });

            Promise.all(dataSourceFetchPromises).then(function (fetchResults) {
                fetchResults.forEach(function (dataSourcesForWorksheet) {
                  dataSourcesForWorksheet.forEach(function (dataSource) {
                    if (!dashboardDataSources[dataSource.id]) { // We've already seen it, skip it.
                    //   dashboardDataSources[dataSource.id] = dataSource;
                      var logicaltable = dataSource.getLogicalTablesAsync().then(logicalTables => {
                        // Get the first logical table's id
                        // In Tableau <= 2020.1, the first table is the only table returned.
                            const logicalTableId = logicalTables[0].id;
                            console.log('logicalTable: ' , JSON.stringify(logicalTables));
                            console.dir(logicalTables)
                            
                        // Use the logicalTableId to then get worksheet's underlying data
                        // by calling worksheet.getUnderlyingTableDataAsync(logicalTableId)
                        // console.log('datatable: ' , JSON.stringify(datatable));
                        // console.dir(datatable)
                        dataSource.getLogicalTableDataAsync(logicalTables[0].id).then(dataTable => {
                          // get the names of the columns in the dataTable
                          console.log('dataTable: ')
                          console.dir(dataTable);
                        let list = [];  
                        for (let col of dataTable.columns) {
                          list.push(col.fieldName);
                        }
                       console.log('list: ' + list);
                        }, (err)=>{ console.log ("no permission");

                        });
                      });
         
                      dataSource.getUnderlyingDataAsync(logicaltable).then(dataTable => {
                        // process the dataTable...
                        console.log('dataTable')
                        console.dir(dataTable);
                      });
                    }
                  });
                });
        
               
              });
      
//  //  After initialization, ask Tableau what sheets are available
    // Call to get the logical tables used by the worksheet
   
  
       
        }, function(err){
            //something went wrong in initialization
            $("#resultBox").html("Error while Initializing: " + err.toString());
        });   
    });
});