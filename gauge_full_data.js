$(document).ready(function(){

    // hook up an event handler for the load button click
    // wait to initialize until the button is clicked

    // $("#initializeButton").click(function(){
      $(document).ready(function () {

        //disable the buttion after it has been clicked
        // $("initializeButton").prop('disabled', true);

        tableau.extensions.initializeAsync().then(function(){


//  //  After initialization, ask Tableau what sheets are available
    const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
 
    // Find a specific worksheet
    var worksheet = worksheets.find(function (sheet) {
      return sheet.name === "Name of Worksheet I want";
    });

    // Or iterate through the array of worksheets
    worksheets.forEach(function (worksheet) {
      //  process each worksheet...
      // get the summary data for the sheet
      // Call to get the underlying logical tables used by the worksheet
worksheet.getUnderlyingTablesAsync().then(logicalTables => {
  // Get the first logical table's id
  // In Tableau <= 2020.1, the first table is the only table returned.
  const logicalTableId = logicalTables[0].id;
  console.log("logical Table: " + JSON.stringify(logicalTables));
  var worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "Test");
  console.log('worksheet: ' + worksheet);
  console.dir(worksheet);

  worksheet.getUnderlyingTablesAsync().then(logicalTables => {
    worksheet.getUnderlyingTableDataAsync(logicalTables[0].id).then(dataTable => {
      // process the dataTable...
      console.log('dataTable')
      console.dir(dataTable);
    });
});

  // Use the logicalTableId to then get worksheet's underlying data
  // by calling worksheet.getUnderlyingTableDataAsync(logicalTableId)

});

//  worksheet.getSummaryDataAsync().then(function (sumdata) {

//   const worksheetData = sumdata;
//   // The getSummaryDataAsync() method returns a DataTable
//   // Map the DataTable (worksheetData) into a format for display, etc.
// console.log(worksheetData._data[0][0]._value, Math.round(worksheetData._data[0][1]._value/1000000));
    

//         createGauges(worksheetData);
  

  

  

        
			
//  });
    });
       
        }, function(err){
            //something went wrong in initialization
            $("#resultBox").html("Error while Initializing: " + err.toString());
        });   
    });
});