 function validateFareSearchForm(frm){
 if (frm.FromCity.value.length < 3) { alert("Please enter the 'from' city."); frm.FromCity.select(); frm.FromCity.focus(); return false; }
 if (frm.ToCity.value.length < 3) { alert("Please enter 'to' city."); frm.ToCity.select(); frm.ToCity.focus(); return false; }
 if (!isValidCityName(frm.FromCity.value)) {alert("Invalid city name. Please re-enter.");frm.FromCity.select();frm.FromCity.focus();return false; }
if (!isValidCityName(frm.ToCity.value)) { alert("Invalid city name. Please re-enter."); frm.ToCity.select(); frm.ToCity.focus(); return false; }
if (frm.FromCity.value.toLowerCase() == frm.ToCity.value.toLowerCase()) { alert("Origin and destination cities/airports are the same. \nPlease select different cities/airports."); frm.ToCity.select(); frm.ToCity.focus(); return false; }
 //Validate Departure Date
var d1 = frm.StartDate.options[frm.StartDate.selectedIndex].value;
var m1 = frm.StartMonth.options[frm.StartMonth.selectedIndex].value;
var y1 = frm.StartYear.options[frm.StartYear.selectedIndex].value;
if (!isValidDate(d1,m1,y1))	{ alert('Please specify a valid departure date'); frm.StartDate.focus(); return false; }
 var today = new Date();
 var time = today.getTime(); time += 3*24*60*60*1000;
 todayPlus3 = new Date(); todayPlus3.setTime(time);
 startDate = new Date(y1, m1-1,d1);
if (startDate.getTime() < time){ alert('Your departure date should be atleast 3 days after the current date.'); frm.StartDate.focus(); return false; }
if (frm.JourneyType[0].checked) { //Round trip
var d2 = frm.ReturnDate.options[frm.ReturnDate.selectedIndex].value;
var m2 = frm.ReturnMonth.options[frm.ReturnMonth.selectedIndex].value;
var y2 = frm.ReturnYear.options[frm.ReturnYear.selectedIndex].value;
if (!isValidDate(d2,m2,y2))	{ alert('Please specify a valid return date.'); frm.ReturnDate.focus(); return false; }
 returnDate = new Date(y2, m2-1,d2); startDatePlus3 = startDate.getTime(); startDatePlus3 += 3*24*60*60*1000;
if (returnDate.getTime() < startDatePlus3){ alert('There needs to be an interval of at least 3 days between your departure and return dates. \nPlease change accordingly. '); frm.ReturnDate.focus(); return false; }	
} //end of 	
//adults = frm.Adults.selectedIndex;
//if (frm.SeniorCitizen.options) { adults += frm.SeniorCitizen.selectedIndex; } else { adults += parseInt(frm.SeniorCitizen.value); }
//infants = frm.Infants.selectedIndex;
//if (adults < infants) { alert("The number of infants cannot exceed the number of adults."); frm.Infants.focus(); return false; }
//totalPassengers = adults + frm.Children.selectedIndex;
//if (totalPassengers < 1) { alert("Please select the number of passengers"); frm.Adults.focus(); return false; }
//if (totalPassengers > 6) { alert("A maximum of 6 passengers allowed per booking."); frm.Adults.focus(); return false; }
 h_fromCountryCode = frm.h_FromCountryCode.value; h_toCountryCode = frm.h_ToCountryCode.value; h_fromCityName = frm.h_FromCityName.value; h_toCityName = frm.h_ToCityName.value; fromCityName = frm.FromCity.value; toCityName = frm.ToCity.value;
 if (fromCityName.indexOf("(") != -1) { fromCityName = fromCityName.substring(0,fromCityName.indexOf("("));  }
 if (toCityName.indexOf("(") != -1) { toCityName = toCityName.substring(0,toCityName.indexOf("("));  }
 if (h_fromCountryCode != "" && h_toCountryCode != "" && fromCityName == h_fromCityName && toCityName == h_toCityName ) { if (h_fromCountryCode != "IN" && h_toCountryCode != "IN"){ alert("At least one city/airport must be from India"); frm.FromCity.select(); frm.FromCity.focus(); return false; } }
 h_fromCityCode = frm.h_FromCityCode.value;
 h_toCityCode = frm.h_ToCityCode.value;
 if (h_fromCityCode != "" && h_toCityCode != "" && fromCityName == h_fromCityName && toCityName == h_toCityName  ) { if (h_fromCityCode == h_toCityCode){ alert("The 'from' and 'to' cities cannot be the same"); frm.FromCity.select(); frm.FromCity.focus(); return false; } }
	frm.submit();
	return false;
 } 
