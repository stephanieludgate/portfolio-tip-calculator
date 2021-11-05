console.log("calculator.js has loaded");

let bill;
let service;
let peopleInParty;
let validBill=false;
let isRoundedUp = false;
let tipIsAdjusted = false;

// Once document has loaded....
$(document).ready(function(){   
    // SETUP - hide dependent features
    $('#validate-bill').hide();
    $('#custom-slide').hide();
    $('#results').hide();
    $('#adjustedTip').hide();
    $('#adjusted-tip-row').hide();
    $('#tip-error').hide();
    $('#total-each-row').hide();
    
    // SETUP - populate dropdown
    populateDropdown();
    
    // SETUP - establish default values
    getTipPercentage();
    getNumberOfPeople();
     
    // EVENT LISTENER - get bill amount
    $('#input-bill').blur(function(){
        getBillAmount();
    })
    
    // EVENT LISTENER - get bill amount if user presses enter 
    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            event.preventDefault();
            getBillAmount();
        }
    });
    
    // EVENT LISTENER - get service amount
    $('#radio-group').change(function(){
        getTipPercentage();
        tipCalculator();
    })
    
    // EVENT LISTENER - get party size
    $('#people-count').change(function(){
        getNumberOfPeople();
        tipCalculator();
    })
    
    // EVENT LISTENER - get round up value (T/F)
    $('#checkboxRoundUp').change(
    function(){
        checkRoundUp();
    });
    
    // EVENT LISTENER - setup reset button
    $('#reset').click(function(){
        reset();
    });
        
})

/**
* Function to get bill amount from form input.  If invalid (NaN or <=0), input will be cleared 
* and refocused, and validation message will appear.  If valid, tipCalulator() is called.
*/
function getBillAmount() {
    bill = parseFloat($('#input-bill').val());
    if (typeof bill == 'number' && bill>0){ // number greater than zero is valid
        validBill=true;
        $('#validate-bill').hide();
        tipCalculator();
    } else {
        validBill=false;
        $('#validate-bill').show();
        reset();
    }
}


/**
* Function to get tip percentage, as chosen from radio buttons.
*/
function getTipPercentage() {
    var radios = document.getElementsByName('btnradio');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            service = radios[i].value;
        // only one radio can be logically checked, don't check the rest
        break;
        }
    }
}


/**
* Function to populate drowdown with number of people in party. 
*/
function populateDropdown(){
    let maxParty = 8;
    for (var i = 1; i <= maxParty; i++) {
        $('#people-count').append('<option value="' + i + '">' + i + '</option>');
    }
}


/**
* Function to get number of people in party, from dropdown. 
*/
function getNumberOfPeople(){
    peopleInParty = $('#people-count').find(":selected").val();
}


/**
* Function to check if bill is to be rounded up, from toggle switch. 
*/
function checkRoundUp() {
    isRoundedUp = ($('#checkboxRoundUp').is(':checked'));
    tipCalculator();
}


/**
* Function to calculte the tip and total amount of bill.  This function is called whenever a change is made. 
* If bill amount is not valid, focus will be set to this input.
*/
function tipCalculator() {
    if (validBill){
        // SETUP some variables
        let totalTip = bill*service;
        let adjustedTip;
        let totalBill = (bill+totalTip);
        
        $('#tip-error').hide();
        
        // CHECK for tip adjustment
        tipIsAdjusted = isRoundedUp;
        
        if(isRoundedUp && (totalBill%peopleInParty) > 0){
            totalBill = parseInt(peopleInParty * Math.floor(totalBill/peopleInParty)) + parseInt(peopleInParty);
            adjustedTip = totalBill - bill;
            $('#tip-row').addClass('strikeout');
        }
        else {
            // Tip either does not require an adjustment or is not rounded up
            $('#tip-row').removeClass('strikeout');
            $('#adjusted-tip-row').hide();
            tipIsAdjusted = false;
            
            if(isRoundedUp && (totalBill%peopleInParty) == 0) {
                // Tip is rounded up but requires no adjustment
                $('#tip-error').show();
            }
        }
        
        let billPerPerson = totalBill/peopleInParty;
        
        // CHECK how many people are involved?
        if(peopleInParty > 1) {
            $('#total-row').addClass('muted');
            $('#total-each-row').show();
        }
        else {
            $('#total-row').removeClass('muted');
            $('#total-each-row').hide();
        }
        
        // POPULATE fields
        $('#subtotal').text("$"+bill.toFixed(2));
        $('#selected-service').text("Tip @ " + parseInt(service*100) + "%");
        $('#total-tip').text("$"+totalTip.toFixed(2));
        if(tipIsAdjusted){
            $('#adjusted-tip-row').show();
            $('#adjusted-tip-description').text('Rounded Tip @ ' + parseInt(service*100) + "%");
            $('#adjusted-tip').text("$"+adjustedTip.toFixed(2));
        }
        $('#total-bill-with-tip').text("$"+totalBill.toFixed(2));
        $('#total-each-description').text('Split '+ peopleInParty +' ways')
        $('#total-each').text("$"+billPerPerson.toFixed(2));
        
        $('#results').show();
        
    } else {
        $('#validate-bill').show();
        $('#input-bill').focus();
    }
}


/**
* Function to reset all form values to their original state.
*/
function reset() {
    // Reset bill amount to no value
    $("#input-bill").val('');
    // Reset tip percentage back to 20%
    $("#btnradio2").prop("checked", true);
    getTipPercentage();
    // Reset party size to 1
    $("#people-count").val('1');
    getNumberOfPeople();
    // Uncheck 'Round Up' toggle
    $('#checkboxRoundUp').prop('checked', false);
    checkRoundUp();
    // Hide results panel
    $('#results').hide();     
}

