//Validates City Name

function isValidCityName(str) {
 if (str == null)
  return false;
  str = trim(str);
  
 if (str.length <3)    return false;
 //Can not have numeric characters
 for (i=0; i < 9; i++) {
    if (str.indexOf(""+i) != -1)    return false;
 }
 if (str.indexOf('@') != -1)    return false;
 if (str.indexOf('.') == 0)    return false;
 if (str.indexOf('.') == (str.length-1))    return false;
 if (str.indexOf('..') != -1)    return false;
 if (str.indexOf('<') != -1)    return false;
 if (str.indexOf('>') != -1)    return false;
 if (str.indexOf('=') != -1)    return false;
 if (str.indexOf('~') != -1)    return false;
 if (str.indexOf('^') != -1)    return false;
 if (str.indexOf('%') != -1)    return false;
 if (str.indexOf('+') != -1)    return false;
 if (str.indexOf('$') != -1)    return false;
 if (str.indexOf('#') != -1)    return false;
 if (str.indexOf('!') != -1)    return false;
 if (str.indexOf('\\') != -1)    return false;
 if (str.indexOf('/') != -1)    return false;
 if (str.indexOf('\"') != -1)    return false;
 if (str.indexOf('\'') != -1)    return false;
 if (str.indexOf('?') != -1)    return false;
 if (str.indexOf(';') != -1)    return false;
 if (str.indexOf(',') != -1)    return false;
 if (str.indexOf('*') != -1)    return false;
 if (str.indexOf('|') != -1)    return false;

 return true;
 
}//end of isValidCityName()
/***************************/


   //City selection message
   citySelectionMessage = "\n\nYou can select desired city by typing at least first three characters \n and then select city link against from and to city names.";

  /*
  * This function displays cities page
  *    baseFieldName = "From"; // From, To, StartFrom, StartTo, ReturnFrom, ReturnTo
  */
  function searchCities(FormName, BaseFieldName) {  
  var field = eval('document.' + FormName+ '.' +BaseFieldName + 'City');

      var cityName = trim(field.value);

      if (!isValidCityName(cityName)) {
		alert("Please enter valid city name."+ citySelectionMessage);
		field.select();
		field.focus();
		return false;
      }
      //If there is an '(', take left of string
      if (cityName.indexOf("(") != -1) {
         cityName = cityName.substring(0, cityName.indexOf("("));
      }
      var url = "http://www.makemytrip.com/flights/SelectCities.asp?FormName="+FormName+"&BaseFieldName="+BaseFieldName+"&City="+ escape(cityName);
	//  alert(url);
      window.open(url,'cities', 'toolbar=no,titlebar=no,location=no,menubar=no,status=no,scrollbars=yes,resizable=no,screenX=200,screenY=200,top=140,left=250,width=530,height=300');
      //return false;
  } // end of searchCities

/*============================================================================*/
/*
* This Function submits form if form entries are valid 
*/  
 function validateFareSearchForm(){
    //Validate From and To City names
    if (document.FareSearchForm.StartFromCity.value.length < 3) {
      alert("Please enter the 'from' city.");
      document.FareSearchForm.StartFromCity.select();
      document.FareSearchForm.StartFromCity.focus();
      return false;
    }
    if (document.FareSearchForm.StartToCity.value.length < 3) {
      alert("Please enter 'to' city.");
      document.FareSearchForm.StartToCity.select();
      document.FareSearchForm.StartToCity.focus();
      return false;
    }
    
          if (!isValidCityName(document.FareSearchForm.StartFromCity.value)) {
    		alert("Invalid city name. Please re-enter.");
    		document.FareSearchForm.StartFromCity.select();
    		document.FareSearchForm.StartFromCity.focus();
    		return false;
          }
          if (!isValidCityName(document.FareSearchForm.StartToCity.value)) {
    		alert("Invalid city name. Please re-enter.");
    		document.FareSearchForm.StartToCity.select();
    		document.FareSearchForm.StartToCity.focus();
    		return false;
          }

	 if  (document.FareSearchForm.StartFromCity.value.toLowerCase() == document.FareSearchForm.StartToCity.value.toLowerCase()) {
		alert("Origin and destination cities/airports are the same. \nPlease select different cities/airports.");
		document.FareSearchForm.StartToCity.select();
		document.FareSearchForm.StartToCity.focus();
		return false;
	 }
    //Validate Departure Date
	var d1 = document.FareSearchForm.DepDay.options[document.FareSearchForm.DepDay.selectedIndex].value;
	var m1 = document.FareSearchForm.DepMonth.options[document.FareSearchForm.DepMonth.selectedIndex].value;
	var y1 = document.FareSearchForm.DepYear.options[document.FareSearchForm.DepYear.selectedIndex].value;

	if (!isValidDate(d1,m1,y1))	{
		alert('Please specify a valid departure date');
	    document.FareSearchForm.DepDay.focus();
	    return false;
	}
	
    var today = new Date();
    var time = today.getTime();
    // Add three days to today
       time += 3*24*60*60*1000;
    //date after 3 days
     todayPlus3 = new Date();
     todayPlus3.setTime(time);

     startDate = new Date(y1, m1-1,d1);

	if (startDate.getTime() < time){
		alert('Your departure date should be atleast 3 days after the current date.');
	    document.FareSearchForm.DepDay.focus();
	    return false;
	}

	//Validate return date in case of Return fare.
	if (document.FareSearchForm.JourneyType[0].checked) { //Round trip
		var d2 = document.FareSearchForm.RetDay.options[document.FareSearchForm.RetDay.selectedIndex].value;
		var m2 = document.FareSearchForm.RetMonth.options[document.FareSearchForm.RetMonth.selectedIndex].value;
		var y2 = document.FareSearchForm.RetYear.options[document.FareSearchForm.RetYear.selectedIndex].value;

		if (!isValidDate(d2,m2,y2))	{
			alert('Please specify a valid return date.');
		    document.FareSearchForm.RetDay.focus();
		    return false;
		}
		 returnDate = new Date(y2, m2-1,d2);
		 startDatePlus3 = startDate.getTime();
		 startDatePlus3 += 3*24*60*60*1000;
		if (returnDate.getTime() < startDatePlus3){
		    alert('There needs to be an interval of at least 3 days between your departure and return dates. \nPlease change accordingly. ');
		    document.FareSearchForm.RetDay.focus();
		    return false;
		}	
		   
	} //end of 
	
	//Validate combination of travellers
	//Total number of adults+Sr Citizen + Children can not
	// be greater than 7
	// The number of infants can not be greater than 
	// number of adults (+Sr. Citizen)
	
	//The index and numbers are same from 0 to 7, so take selected index
	adults = document.FareSearchForm.adult.selectedIndex;
	//add Senior citizen to adults
	//Note that if this is Mini form, the value of the 
	//Sr. Citizen can be found from Hidden Field
	if (document.FareSearchForm.senior.options) { 
	   //Not Mini Form, Read from select element
	   adults += document.FareSearchForm.senior.selectedIndex;
	} else {
	   //Mini Form. Read from Hidden field 
	   adults += parseInt(document.FareSearchForm.senior.value);
	}
	
	infants = document.FareSearchForm.infant.selectedIndex;
	//Infants must be less than total adults
	if (adults < infants) {
	   //alert("The number of infants cannot exceed the number of adults.");
	   alert("The no of infants is exceeding the no of adults.\nAdditional infants will be charged a child fare.");
  	   //document.FareSearchForm.infant.focus();
	   //return false;
	}
	
	//There must be at least one passanger
	totalPassengers = adults + document.FareSearchForm.child.selectedIndex;
	if (totalPassengers < 1) {
	   alert("Please select the number of passengers");
	   document.FareSearchForm.adult.focus();
	   return false;
	}
       //There must not be more than 6 passangers
	if (totalPassengers > 6) {
	   alert("A maximum of 6 passengers allowed per booking.");
	   document.FareSearchForm.adult.focus();
	   return false;
	}

    //If user has selected cities using select cities link,
    // then hidden fields will contain Country codes.
    // If So test whether at least one city is from india
    //Aslo after searching, user can change city name
    // So check only if hidden and actual cities containing same values
/*    h_fromCountryCode = document.FareSearchForm.h_FromCountryCode.value;
    h_toCountryCode = document.FareSearchForm.h_ToCountryCode.value;
    
    h_fromCityName = document.FareSearchForm.h_FromCityName.value;
    h_toCityName = document.FareSearchForm.h_ToCityName.value;
    fromCityName = document.FareSearchForm.FromCity.value;
    toCityName = document.FareSearchForm.ToCity.value;
    if (fromCityName.indexOf("(") != -1) {
       fromCityName = fromCityName.substring(0,fromCityName.indexOf("(")); 
    }
    if (toCityName.indexOf("(") != -1) {
       toCityName = toCityName.substring(0,toCityName.indexOf("(")); 
    }
    if (h_fromCountryCode != "" && h_toCountryCode != ""
        && fromCityName == h_fromCityName
        && toCityName == h_toCityName
        ) {
       if (h_fromCountryCode != "IN" && h_toCountryCode != "IN"){
          alert("At least one city/airport must be from India");
          document.FareSearchForm.FromCity.select();
          document.FareSearchForm.FromCity.focus();
          return false;
       }
    }
    // Origin and destination cities can not be same
    h_fromCityCode = document.FareSearchForm.h_FromCityCode.value;
    h_toCityCode = document.FareSearchForm.h_ToCityCode.value;

    if (h_fromCityCode != "" && h_toCityCode != ""
        && fromCityName == h_fromCityName
        && toCityName == h_toCityName    
    ) {
       if (h_fromCityCode ==  h_toCityCode){
          alert("The 'from'  and 'to'  cities cannot be the same");
          document.FareSearchForm.FromCity.select();
          document.FareSearchForm.FromCity.focus();
          return false;
       }
    }*/
    
	//alert("Valid entries 1-")
   //Comented code of alert page
  /*if(document.FareSearchForm.emailVal.value!='')
  {
   document.FareSearchForm.action="http://flights.makemytrip.com/Flights/cheap-air-tickets-to-India.aspx?Camp=minisearch";
   MM_showHideLayers('WaitMessageLayer','','show');
   }
  else
  {
   document.FareSearchForm.action="/intersitial/search.asp";
   }
   //End - Comented code of alert page*/
	MM_showHideLayers('WaitMessageLayer','','show');
	//alert("Valid entries 2-")
	document.FareSearchForm.submit();
	return false;
 } // end of validateFareSearchForm()

/*======================================================================*/
/*****************************************************************************************************
* Validate MultiCityFareSearchform
* This Function submits form if form entries are valid 
*****************************************************************************************************/  
 function validateMultiCityFareSearchForm(){
    //Validate From and To City names
    if (document.MultiCityFareSearchForm.StartFromCity.value.length < 3) {
      alert("Please enter the 'from' city.");
      document.MultiCityFareSearchForm.StartFromCity.select();
      document.MultiCityFareSearchForm.StartFromCity.focus();
      return false;
    }
    if (document.MultiCityFareSearchForm.StartToCity.value.length < 3) {
      alert("Please enter the 'to' city.");
      document.MultiCityFareSearchForm.StartToCity.select();
      document.MultiCityFareSearchForm.StartToCity.focus();
      return false;
    }
    if (document.MultiCityFareSearchForm.ReturnFromCity.value.length < 3) {
      alert("Please enter the 'from' city.");
      document.MultiCityFareSearchForm.ReturnFromCity.select();
      document.MultiCityFareSearchForm.ReturnFromCity.focus();
      return false;
    }
    if (document.MultiCityFareSearchForm.ReturnToCity.value.length < 3) {
      alert("Please enter the 'to' city.");
      document.MultiCityFareSearchForm.ReturnToCity.select();
      document.MultiCityFareSearchForm.ReturnToCity.focus();
      return false;
    }
          if (!isValidCityName(document.MultiCityFareSearchForm.StartFromCity.value)) {
    		alert("Invalid city name. Please re-enter.");
    		document.MultiCityFareSearchForm.StartFromCity.select();
    		document.MultiCityFareSearchForm.StartFromCity.focus();
    		return false;
          }
          if (!isValidCityName(document.MultiCityFareSearchForm.StartToCity.value)) {
    		alert("Invalid city name. Please re-enter.");
    		document.MultiCityFareSearchForm.StartToCity.select();
    		document.MultiCityFareSearchForm.StartToCity.focus();
    		return false;
          }

          if (!isValidCityName(document.MultiCityFareSearchForm.ReturnFromCity.value)) {
    		alert("Invalid city name. Please re-enter.");
    		document.MultiCityFareSearchForm.ReturnFromCity.select();
    		document.MultiCityFareSearchForm.ReturnFromCity.focus();
    		return false;
          }
          if (!isValidCityName(document.MultiCityFareSearchForm.ReturnToCity.value)) {
    		alert("Invalid city name. Please re-enter.");
    		document.MultiCityFareSearchForm.ReturnToCity.select();
    		document.MultiCityFareSearchForm.ReturnToCity.focus();
    		return false;
          }
          

    //Validate Departure Date
	var d1 = document.MultiCityFareSearchForm.RetDay.options[document.MultiCityFareSearchForm.DepDay.selectedIndex].value;
	var m1 = document.MultiCityFareSearchForm.DepMonth.options[document.MultiCityFareSearchForm.DepMonth.selectedIndex].value;
	var y1 = document.MultiCityFareSearchForm.DepYear.options[document.MultiCityFareSearchForm.DepYear.selectedIndex].value;

	if (!isValidDate(d1,m1,y1))	{
		alert('Please specify a valid departure date');
	    document.MultiCityFareSearchForm.DepDay.focus();
	    return false;
	}
	
    var today = new Date();
    var time = today.getTime();
    // Add 3 days to today
       time += 3*24*60*60*1000;

     startDate = new Date(y1, m1-1,d1);


	if (startDate.getTime() < time){
		alert('Your departure date should be atleast 3 days after the current date.');
	    document.MultiCityFareSearchForm.DepDay.focus();
	    return false;
	}

	//Validate return date
	var d2 = document.MultiCityFareSearchForm.RetDay.options[document.MultiCityFareSearchForm.RetDay.selectedIndex].value;
	var m2 = document.MultiCityFareSearchForm.RetMonth.options[document.MultiCityFareSearchForm.RetMonth.selectedIndex].value;
	var y2 = document.MultiCityFareSearchForm.RetYear.options[document.MultiCityFareSearchForm.RetYear.selectedIndex].value;

	if (!isValidDate(d2,m2,y2))	{
		alert('Please specify a valid return date');
	    document.MultiCityFareSearchForm.RetDay.focus();
	    return false;
	}
	 returnDate = new Date(y2, m2-1,d2);
	 startDatePlus3 = startDate.getTime();
	 startDatePlus3 += 3*24*60*60*1000;
	if (returnDate.getTime() < startDatePlus3){
	    alert('There needs to be an interval of at least 3 days between your departure and return date. \nPlease change accordingly. ');
	    document.MultiCityFareSearchForm.RetDay.focus();
	    return false;
	}	

	
	//Validate combination of travellers
	//Total number of adults+Sr Citizen + Children can not
	// be greater than 7
	// The number of infants can not be greater than 
	// number of adults (+Sr. Citizen)
	
	//The index and numbers are same from 0 to 7, so take selected index
	adults = document.MultiCityFareSearchForm.adult.selectedIndex;
	//add Senior citizen to adults
	//Note that if this is Mini form, the value of the 
	//Sr. Citizen can be found from Hidden Field
	if (document.MultiCityFareSearchForm.senior.options) { 
	   //Not Mini Form, Read from select element
	   adults += document.MultiCityFareSearchForm.senior.selectedIndex;
	} else {
	   //Mini Form. Read from Hidden field 
	   adults += parseInt(document.MultiCityFareSearchForm.senior.value);
	}
	
	infants = document.MultiCityFareSearchForm.infant.selectedIndex;
	//Infants must be less than total adults
	if (adults < infants) {
	   alert("The number of infants cannot exceed the number of adults.");
	   document.MultiCityFareSearchForm.infant.focus();
	   return false;
	}
	
	//There must be at least one passanger
	totalPassengers = adults + document.MultiCityFareSearchForm.child.selectedIndex;
	if (totalPassengers < 1) {
	   alert("Please select the number of passengers");
	   document.MultiCityFareSearchForm.adult.focus();
	   return false;
	}
       //There must not be more than 6 passangers
	if (totalPassengers > 6) {
	   alert("A maximum of 6 passengers allowed per booking.");
	   document.MultiCityFareSearchForm.adult.focus();
	   return false;
	}

    //If user has selected cities using select cities link,
    // then hidden fields will contain Country codes.
    // If So test whether at least one city is from india
    //Aslo after searching, user can change city name
    // So check only if hidden and actual cities containing same values
    //---------
    h_startFromCountryCode = document.MultiCityFareSearchForm.h_StartFromCountryCode.value;
    h_startToCountryCode = document.MultiCityFareSearchForm.h_StartToCountryCode.value;
    
    h_startFromCityName = document.MultiCityFareSearchForm.h_StartFromCityName.value;
    h_startToCityName = document.MultiCityFareSearchForm.h_StartToCityName.value;
    
    startFromCityName = document.MultiCityFareSearchForm.StartFromCity.value;
    startToCityName = document.MultiCityFareSearchForm.StartToCity.value;
    
    if (startFromCityName.indexOf("(") != -1) {
       startFromCityName = startFromCityName.substring(0,startFromCityName.indexOf("(")); 
    }
    if (startToCityName.indexOf("(") != -1) {
       startToCityName = startToCityName.substring(0,startToCityName.indexOf("(")); 
    }
    
    if (h_startFromCountryCode != "" && h_startToCountryCode != ""
        && startFromCityName == h_startFromCityName
        && startToCityName == h_startToCityName
        ) {
       if (h_startFromCountryCode != "IN" && h_startToCountryCode != "IN"){
          alert("At least one city must be from India");
          document.MultiCityFareSearchForm.StartFromCity.select();
          document.MultiCityFareSearchForm.StartFromCity.focus();
          return false;
       }
    }
    // Origin and destination cities can not be same
    h_startFromCityCode = document.MultiCityFareSearchForm.h_StartFromCityCode.value;
    h_startToCityCode = document.MultiCityFareSearchForm.h_StartToCityCode.value;

    if (h_startFromCityCode != "" && h_startToCityCode != ""
        && startFromCityName == h_startFromCityName
        && startToCityName == h_startToCityName    
    ) {
       if (h_startFromCityCode ==  h_startToCityCode){
          alert("The 'from'  and 'to'  cities cannot be the same");
          document.MultiCityFareSearchForm.StartFromCity.select();
          document.MultiCityFareSearchForm.StartFromCity.focus();
          return false;
       }
    }
    
    //Same check for Return cities
    
    
        h_returnFromCountryCode = document.MultiCityFareSearchForm.h_ReturnFromCountryCode.value;
        h_returnToCountryCode = document.MultiCityFareSearchForm.h_ReturnToCountryCode.value;
        
        h_returnFromCityName = document.MultiCityFareSearchForm.h_ReturnFromCityName.value;
        h_returnToCityName = document.MultiCityFareSearchForm.h_ReturnToCityName.value;
        
        returnFromCityName = document.MultiCityFareSearchForm.ReturnFromCity.value;
        returnToCityName = document.MultiCityFareSearchForm.ReturnToCity.value;
        
        if (returnFromCityName.indexOf("(") != -1) {
           returnFromCityName = returnFromCityName.substring(0,returnFromCityName.indexOf("(")); 
        }
        if (returnToCityName.indexOf("(") != -1) {
           returnToCityName = returnToCityName.substring(0,returnToCityName.indexOf("(")); 
        }
        
        if (h_returnFromCountryCode != "" && h_returnToCountryCode != ""
            && returnFromCityName == h_returnFromCityName
            && returnToCityName == h_returnToCityName
            ) {
           if (h_returnFromCountryCode != "IN" && h_returnToCountryCode != "IN"){
              alert("At least one city must be from India");
              document.MultiCityFareSearchForm.ReturnFromCity.select();
              document.MultiCityFareSearchForm.ReturnFromCity.focus();
              return false;
           }
        }
        // Origin and destination cities can not be same
        h_returnFromCityCode = document.MultiCityFareSearchForm.h_ReturnFromCityCode.value;
        h_returnToCityCode = document.MultiCityFareSearchForm.h_ReturnToCityCode.value;
    
        if (h_returnFromCityCode != "" && h_returnToCityCode != ""
            && returnFromCityName == h_returnFromCityName
            && returnToCityName == h_returnToCityName    
        ) {
           if (h_returnFromCityCode ==  h_returnToCityCode){
             alert("The 'from'  and 'to'  cities cannot be the same");
              document.MultiCityFareSearchForm.ReturnFromCity.select();
              document.MultiCityFareSearchForm.ReturnFromCity.focus();
              return false;
           }
        }
    
	//alert("Valid entries ")
	document.MultiCityFareSearchForm.submit();
	return false;
 } // end of validateMultiCityFareSearchForm()

/*==============================================================*/
/**
* This function populates FromCity field from the list
*/
function populateFromCity() {
  selectedInd = document.FareSearchForm.FromCityList.selectedIndex;
  if (selectedInd > 0) {
     //Populate FromCity and h_FromCity fields
     value = document.FareSearchForm.FromCityList.options[selectedInd].value;
     //The value are in form  
     //AirportCode:AirportName:CityCode:CityName:CountryCode:UseAirportOnlyFlag
      //Set value of h_FromCity
      colonIndex = value.indexOf(":");
      FromAirportCode = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      FromAirportName = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      FromCityCode = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      FromCityName = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      FromCountryCode = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
     colonIndex = value.indexOf(":");
      SearchFromAirportOnly = value.substring(0, colonIndex);
      FromMinorCityName = value.substring(colonIndex+1);
     /*
      alert("FromAirportCode: " + FromAirportCode
           + "\nFromAirportName" + FromAirportName
           + "\nFromCityCode: " + FromCityCode
           + "\nFromCityName: " + FromCityName
           + "\nFromCountryCode: " + FromCountryCode
           + "\nSearchFromAirportOnly: " + SearchFromAirportOnly
      );
      */
	document.FareSearchForm.h_FromAirportCode.value = FromAirportCode;
	document.FareSearchForm.h_FromAirportName.value = FromAirportName;
	document.FareSearchForm.h_FromCityCode.value = FromCityCode;
	document.FareSearchForm.h_FromCityName.value = FromCityName;
	document.FareSearchForm.h_FromCountryCode.value = FromCountryCode;
	document.FareSearchForm.h_SearchFromAirportOnly.value = SearchFromAirportOnly;
	
	document.FareSearchForm.h_FromMinorCityName.value = FromMinorCityName;
	
	if (SearchFromAirportOnly == 1)
       document.FareSearchForm.FromCity.value=FromCityName + "("+FromAirportCode+"-"+FromAirportName+")";
    else 
       document.FareSearchForm.FromCity.value=FromCityName + "(All Airports)";
  }
}//end of populateFromCity()
/*======================================================================*/


/**
* This function populates ToCity field from the list
*/
function populateToCity() {
  selectedInd = document.FareSearchForm.ToCityList.selectedIndex;
  if (selectedInd > 0) {
     //Populate ToCity and h_ToCity fields
     value = document.FareSearchForm.ToCityList.options[selectedInd].value;
     //The value are in form  
     //ToAirportCode:ToAirportName:ToCityCode:ToCityName:ToCityAltName:ToCountryCode:ToCountryName:ToMinorCityName
      //Set value of h_ToCity
      colonIndex = value.indexOf(":");
      ToAirportCode = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      ToAirportName = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      ToCityCode = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      ToCityName = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      ToCountryCode = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      SearchToAirportOnly = value.substring(0, colonIndex);
      ToMinorCityName = value.substring(colonIndex+1);
     
	document.FareSearchForm.h_ToAirportCode.value = ToAirportCode;
	document.FareSearchForm.h_ToAirportName.value = ToAirportName;
	document.FareSearchForm.h_ToCityCode.value = ToCityCode;
	document.FareSearchForm.h_ToCityName.value = ToCityName;
	document.FareSearchForm.h_ToCountryCode.value = ToCountryCode;
	document.FareSearchForm.h_SearchToAirportOnly.value = SearchToAirportOnly;
	document.FareSearchForm.h_ToMinorCityName.value = ToMinorCityName;
	if (SearchToAirportOnly == 1 ) 
       document.FareSearchForm.ToCity.value=ToCityName + "("+ToAirportCode+"-"+ToAirportName+")";
    else 
       document.FareSearchForm.ToCity.value=ToCityName + "(All Airports)";
  }
}//end of populateToCity()

/**
* This function opens new window to display
* Surface detail of the specified city code
*/
function displaySurfaceDetail(cityCode){
  open(cityCode + "_SurfaceDetail.htm", "SurfaceWin", "scrollbars=yes,location=no,status=no,menu=no,width=450,height=300,left=320,top=150");
}
 
/**
* This function opens new window to display
* rules of the fare
*/
function displayFareRules(ruleId, fareId){
  open("DisplayFareRules.asp?RuleId="+ruleId + "&FareId="+fareId, "RuleWin", "scrollbars=yes,location=no,status=no,menu=no,width=550,height=300,left=200,top=150");
}
 
 /*****************************************************************************************/
 /*==============================================================*/
 /**
 * This function populates StartFromCity field from the list
 */
 function populateStartFromCity() {
   var selectedInd = document.MultiCityFareSearchForm.StartFromCityList.selectedIndex;
   if (selectedInd > 0) {
      //Populate FromCity and h_FromCity fields
      var value = document.MultiCityFareSearchForm.StartFromCityList.options[selectedInd].value;
      //The value are in form  
      //AirportCode:AirportName:CityCode:CityName:CountryCode:UseAirportOnlyFlag
       //Set value of h_FromCity
       var colonIndex = value.indexOf(":");
       var FromAirportCode = value.substring(0, colonIndex);
       value = value.substring(colonIndex+1);
       colonIndex = value.indexOf(":");
       var FromAirportName = value.substring(0, colonIndex);
       value = value.substring(colonIndex+1);
       colonIndex = value.indexOf(":");
       var FromCityCode = value.substring(0, colonIndex);
       value = value.substring(colonIndex+1);
       colonIndex = value.indexOf(":");
       var FromCityName = value.substring(0, colonIndex);
       value = value.substring(colonIndex+1);
       colonIndex = value.indexOf(":");
       var FromCountryCode = value.substring(0, colonIndex);
       var SearchFromAirportOnly = value.substring(colonIndex+1);
 	document.MultiCityFareSearchForm.h_StartFromAirportCode.value = FromAirportCode;
 	document.MultiCityFareSearchForm.h_StartFromAirportName.value = FromAirportName;
 	document.MultiCityFareSearchForm.h_StartFromCityCode.value = FromCityCode;
 	document.MultiCityFareSearchForm.h_StartFromCityName.value = FromCityName;
 	document.MultiCityFareSearchForm.h_StartFromCountryCode.value = FromCountryCode;
 	document.MultiCityFareSearchForm.h_SearchStartFromAirportOnly.value = SearchFromAirportOnly;
 	if (SearchFromAirportOnly == 1)
        document.MultiCityFareSearchForm.StartFromCity.value=FromCityName + "("+FromAirportCode+"-"+FromAirportName+")";
     else 
        document.MultiCityFareSearchForm.StartFromCity.value=FromCityName + "(All Airports)";
   }
 }//end of populateStartFromCity()
 
  /**
  * This function populates ReturnFromCity field from the list
  */
  function populateReturnFromCity() {
    var selectedInd = document.MultiCityFareSearchForm.ReturnFromCityList.selectedIndex;
    if (selectedInd > 0) {
       //Populate FromCity and h_FromCity fields
       var value = document.MultiCityFareSearchForm.ReturnFromCityList.options[selectedInd].value;
       //The value are in form  
       //AirportCode:AirportName:CityCode:CityName:CountryCode:UseAirportOnlyFlag
        //Set value of h_FromCity
        var colonIndex = value.indexOf(":");
        var FromAirportCode = value.substring(0, colonIndex);
        value = value.substring(colonIndex+1);
        colonIndex = value.indexOf(":");
        var FromAirportName = value.substring(0, colonIndex);
        value = value.substring(colonIndex+1);
        colonIndex = value.indexOf(":");
        var FromCityCode = value.substring(0, colonIndex);
        value = value.substring(colonIndex+1);
        colonIndex = value.indexOf(":");
        var FromCityName = value.substring(0, colonIndex);
        value = value.substring(colonIndex+1);
        colonIndex = value.indexOf(":");
        var FromCountryCode = value.substring(0, colonIndex);
        var SearchFromAirportOnly = value.substring(colonIndex+1);
  	document.MultiCityFareSearchForm.h_ReturnFromAirportCode.value = FromAirportCode;
  	document.MultiCityFareSearchForm.h_ReturnFromAirportName.value = FromAirportName;
  	document.MultiCityFareSearchForm.h_ReturnFromCityCode.value = FromCityCode;
  	document.MultiCityFareSearchForm.h_ReturnFromCityName.value = FromCityName;
  	document.MultiCityFareSearchForm.h_ReturnFromCountryCode.value = FromCountryCode;
  	document.MultiCityFareSearchForm.h_SearchReturnFromAirportOnly.value = SearchFromAirportOnly;
  	if (SearchFromAirportOnly == 1)
         document.MultiCityFareSearchForm.ReturnFromCity.value=FromCityName + "("+FromAirportCode+"-"+FromAirportName+")";
      else 
         document.MultiCityFareSearchForm.ReturnFromCity.value=FromCityName + "(All Airports)";
    }
  }//end of populateReturnFromCity()

 /*======================================================================*/
 
 
 /**
 * This function populates StartToCity field from the list
 */
 function populateStartToCity() {
   selectedInd = document.MultiCityFareSearchForm.StartToCityList.selectedIndex;
   if (selectedInd > 0) {
      //Populate ToCity and h_ToCity fields
      var value = document.MultiCityFareSearchForm.StartToCityList.options[selectedInd].value;
      //The value are in form  
      //ToAirportCode:ToAirportName:ToCityCode:ToCityName:ToCityAltName:ToCountryCode:ToCountryName:ToMinorCityName
       //Set value of h_ToCity
       var colonIndex = value.indexOf(":");
       var ToAirportCode = value.substring(0, colonIndex);
       value = value.substring(colonIndex+1);
       colonIndex = value.indexOf(":");
       var ToAirportName = value.substring(0, colonIndex);
       value = value.substring(colonIndex+1);
       colonIndex = value.indexOf(":");
       var ToCityCode = value.substring(0, colonIndex);
       value = value.substring(colonIndex+1);
       colonIndex = value.indexOf(":");
       var ToCityName = value.substring(0, colonIndex);
       value = value.substring(colonIndex+1);
       colonIndex = value.indexOf(":");
       var ToCountryCode = value.substring(0, colonIndex);
       var SearchToAirportOnly = value.substring(colonIndex+1);
       
 	document.MultiCityFareSearchForm.h_StartToAirportCode.value = ToAirportCode;
 	document.MultiCityFareSearchForm.h_StartToAirportName.value = ToAirportName;
 	document.MultiCityFareSearchForm.h_StartToCityCode.value = ToCityCode;
 	document.MultiCityFareSearchForm.h_StartToCityName.value = ToCityName;
 	document.MultiCityFareSearchForm.h_StartToCountryCode.value = ToCountryCode;
 	document.MultiCityFareSearchForm.h_SearchStartToAirportOnly.value = SearchToAirportOnly;
 	if (SearchToAirportOnly == 1 ) 
        document.MultiCityFareSearchForm.StartToCity.value=ToCityName + "("+ToAirportCode+"-"+ToAirportName+")";
     else 
        document.MultiCityFareSearchForm.StartToCity.value=ToCityName + "(All Airports)";
   }
 }//end of populateStartToCity()
 
  
  /**
  * This function populatesReturnToCity field from the list
  */
  function populateReturnToCity() {
    selectedInd = document.MultiCityFareSearchForm.ReturnToCityList.selectedIndex;
    if (selectedInd > 0) {
       //Populate ToCity and h_ToCity fields
       var value = document.MultiCityFareSearchForm.ReturnToCityList.options[selectedInd].value;
       //The value are in form  
       //ToAirportCode:ToAirportName:ToCityCode:ToCityName:ToCityAltName:ToCountryCode:ToCountryName:ToMinorCityName
        //Set value of h_ToCity
        var colonIndex = value.indexOf(":");
        var ToAirportCode = value.substring(0, colonIndex);
        value = value.substring(colonIndex+1);
        colonIndex = value.indexOf(":");
        var ToAirportName = value.substring(0, colonIndex);
        value = value.substring(colonIndex+1);
        colonIndex = value.indexOf(":");
        var ToCityCode = value.substring(0, colonIndex);
        value = value.substring(colonIndex+1);
        colonIndex = value.indexOf(":");
        var ToCityName = value.substring(0, colonIndex);
        value = value.substring(colonIndex+1);
        colonIndex = value.indexOf(":");
        var ToCountryCode = value.substring(0, colonIndex);
        var SearchToAirportOnly = value.substring(colonIndex+1);
        
  	document.MultiCityFareSearchForm.h_ReturnToAirportCode.value = ToAirportCode;
  	document.MultiCityFareSearchForm.h_ReturnToAirportName.value = ToAirportName;
  	document.MultiCityFareSearchForm.h_ReturnToCityCode.value = ToCityCode;
  	document.MultiCityFareSearchForm.h_ReturnToCityName.value = ToCityName;
  	document.MultiCityFareSearchForm.h_ReturnToCountryCode.value = ToCountryCode;
  	document.MultiCityFareSearchForm.h_SearchReturnToAirportOnly.value = SearchToAirportOnly;
  	if (SearchToAirportOnly == 1 ) 
         document.MultiCityFareSearchForm.ReturnToCity.value=ToCityName + "("+ToAirportCode+"-"+ToAirportName+")";
      else 
         document.MultiCityFareSearchForm.ReturnToCity.value=ToCityName + "(All Airports)";
    }
 }//end of populateReturnToCity()
/*******************************************************************************************/

/*==============================================================*/
/**
* This function populates FromCity field from the list
*/
function populateAltFromCity() {
 if (document.FareSearchForm.FromCityList.length) {
	  for(i=0;i<document.FareSearchForm.FromCityList.length;i++)   {
	      if(document.FareSearchForm.FromCityList[i].checked==true)  {
		  value =document.FareSearchForm.FromCityList[i].value;
		  break;
	     }
	   }
  } else {
     value=document.FareSearchForm.FromCityList.value
  }

  if (value) {
     //Populate FromCity and h_FromCity fields
     //The value are in form  
     //AirportCode:AirportName:CityCode:CityName:CountryCode:UseAirportOnlyFlag
      //Set value of h_FromCity
      colonIndex = value.indexOf(":");
      FromAirportCode = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      FromAirportName = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      FromCityCode = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      FromCityName = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      FromCountryCode = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
     colonIndex = value.indexOf(":");
      SearchFromAirportOnly = value.substring(0, colonIndex);
      FromMinorCityName = value.substring(colonIndex+1);

	document.FareSearchForm.h_FromAirportCode.value = FromAirportCode;
	document.FareSearchForm.h_FromAirportName.value = FromAirportName;
	document.FareSearchForm.h_FromCityCode.value = FromCityCode;
	document.FareSearchForm.h_FromCityName.value = FromCityName;
	document.FareSearchForm.h_FromCountryCode.value = FromCountryCode;
	document.FareSearchForm.h_SearchFromAirportOnly.value = SearchFromAirportOnly;
	document.FareSearchForm.h_FromMinorCityName.value = FromMinorCityName;
	if (SearchFromAirportOnly == 1)
       document.FareSearchForm.FromCity.value=FromCityName + "("+FromAirportCode+"-"+FromAirportName+")";
    else 
       document.FareSearchForm.FromCity.value=FromCityName + "(All Airports)";
  }
}//end of populateAltFromCity()
/*======================================================================*/


/**
* This function populates ToCity field from the list
*/
function populateAltToCity() {
 if (document.FareSearchForm.ToCityList.length) {
	  for(i=0;i<document.FareSearchForm.ToCityList.length;i++)   {
	      if(document.FareSearchForm.ToCityList[i].checked==true)  {
		  value =document.FareSearchForm.ToCityList[i].value;
		  break;
	     }
	   }
  } else {
     value=document.FareSearchForm.ToCityList.value
  }
  if (value) {
     //Populate ToCity and h_ToCity fields
     //The value are in form  
     //ToAirportCode:ToAirportName:ToCityCode:ToCityName:ToCityAltName:ToCountryCode:ToCountryName:ToMinorCityName
      //Set value of h_ToCity
      colonIndex = value.indexOf(":");
      ToAirportCode = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      ToAirportName = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      ToCityCode = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      ToCityName = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      ToCountryCode = value.substring(0, colonIndex);
      value = value.substring(colonIndex+1);
      colonIndex = value.indexOf(":");
      SearchToAirportOnly = value.substring(0, colonIndex);
      ToMinorCityName = value.substring(colonIndex+1);

	document.FareSearchForm.h_ToAirportCode.value = ToAirportCode;
	document.FareSearchForm.h_ToAirportName.value = ToAirportName;
	document.FareSearchForm.h_ToCityCode.value = ToCityCode;
	document.FareSearchForm.h_ToCityName.value = ToCityName;
	document.FareSearchForm.h_ToCountryCode.value = ToCountryCode;
	document.FareSearchForm.h_SearchToAirportOnly.value = SearchToAirportOnly;
	document.FareSearchForm.h_ToMinorCityName.value = ToMinorCityName;
	if (SearchToAirportOnly == 1 ) 
       document.FareSearchForm.ToCity.value=ToCityName + "("+ToAirportCode+"-"+ToAirportName+")";
    else 
       document.FareSearchForm.ToCity.value=ToCityName + "(All Airports)";
  }
}//end of populateAltToCity()