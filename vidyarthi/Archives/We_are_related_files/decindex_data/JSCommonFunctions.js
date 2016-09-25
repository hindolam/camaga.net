var weekend = [0,6];
var gNow = new Date();
var ggWinCal;
isNav = (navigator.appName.indexOf("Netscape") != -1) ? true : false;
isIE = (navigator.appName.indexOf("Microsoft") != -1) ? true : false;

Months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

// Non-Leap year Month days..
DOMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Leap year Month days..
lDOMonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function get_month(monthNo) {
	return Months[monthNo];
}

function getDaysOfMonth(monthNo, p_year) {
	if ((p_year % 4) == 0) {
		if ((p_year % 100) == 0 && (p_year % 400) != 0)
			return DOMonth[monthNo];

		return lDOMonth[monthNo];
	} else
		return DOMonth[monthNo];
}

function trim(str) {
 if (str == null)
  return "";
 if (str.length <1)
    return "";
 var i =0;
 while (str.charAt(i) == ' ')
        i++;
 str = str.substr(i);
 i = str.length;
 while (str.charAt(--i) == ' ')
        ;
 str = str.substr(0, (str.length + 1 + (i - str.length)));
 return str;
}//end of trim()
/*************************/
/**
* This function trims all text fields of the given form
*/
function trimFormFields(frm) {
  if (typeof(frm) != 'object'){
    alert("The argument supplied if not an object.\nThis function requires a document.form object.");
    return;
  }
  var i=0, len = frm.elements.length;
  for (i=0; i < len; i++){
    if (frm.elements[i].type == 'text' || frm.elements[i].type == 'textarea') {
       frm.elements[i].value = trim(frm.elements[i].value);
    }
  }
}//end of trimFormFields
/*************************/
/*
* This function returns true if 
* string contains " or '.
* Returns false otherwise
*/
function isContainsQuotes(str){
 str = trim(str);
 if (str.length < 1)
    return false;
 if (str.indexOf('\'')  >= 0)
    return true;
 if (str.indexOf('\"')  >= 0)
    return true;
   
  return false;

}

/*************************/
/*
* This function returns true if 
* string contains A-Z, a-Z, space, and a dot (.).
* Returns false otherwise
*/
function isValidName(str){
 str = trim(str);
 if (str.length < 1)
    return false;
    
  for (i=0; i < str.length; i++){
    if ((str.charAt(i) >= 'a') && (str.charAt(i) <= 'z'))
      continue;
    if ((str.charAt(i) >= 'A') && (str.charAt(i) <= 'Z'))
      continue;
    if (str.charAt(i) == ' ')
      continue;
    if (str.charAt(i) == '.')
      continue;
    return false;
  }
 
  if (str.indexOf('.') != str.lastIndexOf('.'))
    return false;
  if ((str.charAt(0) == '.') || (str.charAt(str.length-1) == '.'))
    return false;
   
  return true;

}


/*************************/
/*
* This function returns true if 
* string contains A-Z, a-Z, 0-9, _.
* Returns false otherwise
*/
function isValidUID(str){
 str = trim(str);
 if (str.length < 1)
    return false;
    
  for (i=0; i < str.length; i++){
    if ((str.charAt(i) >= 'a') && (str.charAt(i) <= 'z'))
      continue;
    if ((str.charAt(i) >= 'A') && (str.charAt(i) <= 'Z'))
      continue;
    if ((str.charAt(i) >= '0') && (str.charAt(i) <= '9'))
      continue;
    if (str.charAt(i) == '_')
      continue;
     
    return false;
    
  }
 
  return true;

}

/*************************/
function isANumber(str){
  str = trim(str);
  for (i=0; i < str.length; i++){
    if ((str.charAt(i) >= '0') && (str.charAt(i) <= '9'))
      continue;
    if (str.charAt(i) == '.')
      continue;
    return false;
  }
 
  //Can not have two dots (.)
  if (str.indexOf('.') != str.lastIndexOf('.'))
    return false;
   
  return true;

}

/*************************/
function isValidTelNum(str){
  if (str == null)
     return false;
  str = trim(str);
    
  if (str.length < 3 )
     return false;
     
  for (i=0; i < str.length; i++){
    if ((str.charAt(i) >= '0') && (str.charAt(i) <= '9'))
      continue;
    if (str.charAt(i) == '-')
      continue;
    if (str.charAt(i) == ' ')
      continue;
    return false;
  }
    
  return true;

}
/*************************/
function isValidMobile(str){
  if (str == null)
     return false;
  str = trim(str);
    
  if (str.length < 10 || str.length > 10)
     return false;
    
  for (i=0; i < str.length; i++){
    if ((str.charAt(i) >= '0') && (str.charAt(i) <= '9'))
      continue;
    return false;
  }
    
  return true;

}
/*************************/
function isInteger(str){
  if (!isANumber(str))
   return false;
  if (str.indexOf('.') != -1)
    return false;
   
  return true;

}
/*************************/
function isValidZip(str){
  str = trim(str);

  if (str.length < 5)
   return false;
  for (i=0; i < str.length; i++){
    if ((str.charAt(i) >= '0') && (str.charAt(i) <= '9'))
      continue;
    return false;
  }
   
  return true;

}
/*************************/
function isValidEMail(str) {
 if (str == null)
  return false;
  str = trim(str);
 if (str.length <6)    return false;   
 if (str.indexOf('@') == -1)    return false;
 if (str.indexOf('@') == 0)    return false;
 if (str.indexOf('@') == (str.length-1))    return false;
 if (str.indexOf("@@") != -1)    return false;
 if (str.indexOf('@') != str.lastIndexOf('@'))    return false;
 if (str.indexOf('.@') != -1)    return false;
 if (str.indexOf('@.') != -1)    return false;
 if (str.indexOf(' ') != -1)    return false;
 if (str.indexOf('.') == -1)    return false;
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
 if (str.indexOf('(') != -1)    return false;
 if (str.indexOf(')') != -1)    return false;
 if (str.indexOf('\\') != -1)    return false;
 if (str.indexOf('/') != -1)    return false;
 if (str.indexOf('\"') != -1)    return false;
 if (str.indexOf('\'') != -1)    return false;
 if (str.indexOf('?') != -1)    return false;
 if (str.indexOf(';') != -1)    return false;
 if (str.indexOf(',') != -1)    return false;
 if (str.indexOf('\t') != -1)    return false;
 if (str.indexOf('*') != -1)    return false;
 if (str.indexOf('|') != -1)    return false;

 return true;
 
}//end of isValidEMail()
/*************************/


/*
* This function returns true is the given date parameters
* form a valid date. else returns false.
*/
function isValidDate(dd,mm,yyyy){
  if (mm < 0 || mm > 12)
     return false;
  if (dd < 0 || dd > 31)
     return false;
  if (getDaysOfMonth(mm,yyyy) < dd) 
     return false;
  return true; 
}

/*
* This function returns true if first date is before second date
* other wise  returns false.
*/
function isDate1BeforeDate2(d1,m1,y1, d2,m2,y2){
  date1 = new Date(y1, m1,d1);
  date2 = new Date(y2, m2,d2);
  if (date1.getTime() < date2.getTime())
     return true; 
  return false;
}

function isDate1BeforeOrEqualToDate2(d1,m1,y1, d2,m2,y2){
  date1 = new Date(y1, m1,d1);
  date2 = new Date(y2, m2,d2);
  if (date1.getTime() <= date2.getTime())
     return true; 
  return false;
}

function isDate1AfterDate2(d1,m1,y1, d2,m2,y2){
  date1 = new Date(y1, m1,d1);
  date2 = new Date(y2, m2,d2);
  if (date1.getTime() > date2.getTime())
     return true; 
  return false;
}


function isDate1AfterOrEqualToDate2(d1,m1,y1, d2,m2,y2){
  date1 = new Date(y1, m1,d1);
  date2 = new Date(y2, m2,d2);
  if (date1.getTime() >= date2.getTime())
     return true; 
  return false;
}

