
tyroo_org_error_handler = window.onerror;

function quoted(str) {
  return (str != null) ? '"' + str + '"' : '""';
}

function tyroo_append_url(param, value) {
  if (value) {
    window.tyroo_ad_url += '&' + param + '=' + value;
  }
}


function tyroo_show_ad() {
  var w = window;
  var Url_Prefix = 'http://serve.Tyroo.com/tyroo/BannerRequestController?';
  w.onerror = w.tyroo_org_error_handler;
  w.tyroo_ad_url = Url_Prefix + 'PUBID=' + escape(w.tyroo_pub.toLowerCase()) +
					'&'+
                    'CHNLID=' + w.tyroo_chnl+
					'&'+
					'TID='+w.tyroo_adtype+
					'&'+
					'PUBURL='+location.href;
  tyroo_append_url('lmt', w.tyroo_last_modified_time);
  w.tyroo_ad_url = w.tyroo_ad_url.replace(/%\w?$/, '');

 if (tyroo_ad_output == 'html') 
 			{
	  	   
	  document.write('<ifr' + 'ame' +
                     ' width=' + quoted(w.tyroo_ad_width) + '"%"'+  
                     ' height=' + quoted(w.tyroo_ad_height) + '"%"'+ 
                     ' frameborder=' + quoted(w.tyroo_ad_frameborder) +
                     ' src=' + quoted(w.tyroo_ad_url) +
                     ' marginwidth="0"' +
                     ' marginheight="0"' +
                     ' vspace="0"' +
                     ' hspace="0"' +
                     ' allowtransparency="true"' +
					 ' noresize="noresize" ' +
                     ' scrolling="no">');
   
      document.write('</ifr' + 'ame>');
	   
  }

  w.tyroo_ad_frameborder = null;
  w.tyroo_ad_format = null;
  w.tyroo_page_url = null;
  w.tyroo_ad_output = null;
}

function tyroo_error_handler(message, url, line) {
  tyroo_show_ad();
  return true;
}

window.onerror = tyroo_error_handler;

if (window.tyroo_ad_frameborder == null) {
  tyroo_ad_frameborder = 0;
}

if (window.tyroo_ad_output == null) {
  tyroo_ad_output = 'html';
}

if (window.tyroo_ad_format == null && window.tyroo_ad_output == 'html') {
  tyroo_ad_format = tyroo_ad_width + 'x' + tyroo_ad_height;
}

if (window.tyroo_page_url == null) {
  tyroo_page_url = document.referrer;
  if (window.top.location == document.location) {
    tyroo_page_url = document.location;
    tyroo_last_modified_time = Date.parse(document.lastModified) / 1000;
  }
}
tyroo_show_ad();

