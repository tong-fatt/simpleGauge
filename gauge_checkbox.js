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
 worksheet.getSummaryDataAsync().then(function (sumdata) {

  const worksheetData = sumdata;
  // The getSummaryDataAsync() method returns a DataTable
  // Map the DataTable (worksheetData) into a format for display, etc.
console.log('start: ' + worksheetData._data[0][0]._value, Math.round(worksheetData._data[0][1]._value/1000000));
console.log('sumdata_lengths: ' + sumdata._data.length);
var filter=[];
for(var i=0; i< 3; i++){
        var name = sumdata._data[i][0]._value;
        // $("<input type='checkbox' id='checkbox" + i + "' checked value = 'sum._data[i][0]'checked = 'isActive'")
        $('<input />',
        {type: 'checkbox',
        id: 'checkbox'+i,
        value: name,
        checked: false,
        }).appendTo('.checkbox') 

        $('<label/>',{
            'for': 'checkbox'+ i,
            text: sumdata._data[i][0]._value
        }).appendTo('.checkbox')

}

    $("input").on("click", function(event){
        val = $(this).val();
        console.log('val'+ val);
        console.log('id: ' + event.target.id.match(/\d+/));
        console.log('checked: ' + $(this).prop('checked'));
        var selectedID = event.target.id.match(/\d+/);
        if ($(this).prop('checked')) {
            filter.push(sumdata._data[selectedID]);
           $("input").not(this).prop('checked', false);
           console.log('which checked: ' , $(this).prop('checked'));
        } else {
            filter.splice(sumdata._data[selectedID], 1);
           
        }
      
    
        
        console.dir(filter);
        console.dir(sumdata);
        createGauges(filter);
    })    
 
 
 

  

        
			
 });
    });
       
        }, function(err){
            //something went wrong in initialization
            $("#resultBox").html("Error while Initializing: " + err.toString());
        });   
    });
});