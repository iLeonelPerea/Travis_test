//declaring variables
var base_url = '<?php base_url(); ?>';
var offset = 8;//customize this as your need
var actual = 8;
var request_ajax = true;
var ajax_is_on = false;
var objHeight=$(window).height()-50;//customize this as your need
var last_scroll_top = 0;

$(window).scroll(function(event) {

    var st = $(this).scrollTop();
    //alert(base_url + 'noticias/more/');
    if(st > last_scroll_top){

        if ($(window).scrollTop() + 500 > $(document).height() - $(window).height()) {

            var user_posts = '';

            if (request_ajax === true && ajax_is_on === false) {

                ajax_is_on = true;
                //$("#loading-gif").removeClass('hideGif').addClass('displayGif');

                $.ajax({

                    url: '/index2.php/noticias/more/'+offset+'/'+actual,
                    data: {},
                    type: 'post',
                    async: false,
                    dataType: 'json',
                    success: function(data) {
                        //alert(data);
                        //$("#loading-gif").removeClass('displayGif').addClass('hideGif');
                        //alert(data);
                        //$('body').append(data);
                        //console.log(data);
                        data.forEach(function(entry) {
                                actual = actual + 8;
                                var seccionLink = '';
                                switch(entry["id_seccion"]){
                                    case '0': seccionLink = " "; break;
                                    case '1': seccionLink = '<a href="noticias/seccion/sociales">Sociales</a>'; break;
                                    case '2': seccionLink = '<a href="noticias/seccion/sustentable">Sustentable</a>'; break;
                                    case '3': seccionLink = '<a href="noticias/seccion/informativo">Informativo</a>'; break;
                                    case '4': seccionLink = '<a href="noticias/seccion/financieras">Financieras</a>'; break;
                                    case '5': seccionLink = '<a href="noticias/seccion/nuevos-proyectos">Nuevos Proyectos</a>'; break;
                                    case '6': seccionLink = '<a href="noticias/seccion/matales-al-dia">Metales al d&iacute;a</a>'; break;
                                    case '7': seccionLink = '<a href="noticias/seccion/eventos">Eventos</a>'; break;
                                    case '8': seccionLink = '<a href="noticias/seccion/comerciales">Comerciales</a>'; break;
                                }
                            $('#infiniteContent').append('<article><div class="col-xs-12 col-sm-6 col-md-6 col-ls-6"><div class="post-short"><img class="img-responsive" src="/Scripts/timthumb.php?src='+entry["imagen"]+'&a=c&w=650&h=410"><div class="info"><span class="section">'+seccionLink+'</span><h3><a href="noticias/'+entry["id"]+'">'+utf8_decode(entry["titulo"])+'</a></h3></div></div></div></article>');
                        });
                        ajax_is_on = false;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                       // Some code to debbug e.g.:               
                       console.log(jqXHR);
                       console.log(textStatus);
                       console.log(errorThrown);
                    }  
                });
                return false;
            }   
        }  
    }  
    last_scroll_top = st;
});

function utf8_decode (str_data) {
  // From: http://phpjs.org/functions
  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // +      input by: Aman Gupta
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Norman "zEh" Fuchs
  // +   bugfixed by: hitwork
  // +   bugfixed by: Onno Marsman
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: kirilloid
  // *     example 1: utf8_decode('Kevin van Zonneveld');
  // *     returns 1: 'Kevin van Zonneveld'

  var tmp_arr = [],
    i = 0,
    ac = 0,
    c1 = 0,
    c2 = 0,
    c3 = 0,
    c4 = 0;

  str_data += '';

  while (i < str_data.length) {
    c1 = str_data.charCodeAt(i);
    if (c1 <= 191) {
      tmp_arr[ac++] = String.fromCharCode(c1);
      i++;
    } else if (c1 <= 223) {
      c2 = str_data.charCodeAt(i + 1);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      i += 2;
    } else if (c1 <= 239) {
      // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    } else {
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      c4 = str_data.charCodeAt(i + 3);
      c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
      c1 -= 0x10000;
      tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1>>10) & 0x3FF));
      tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
      i += 4;
    }
  }

  return tmp_arr.join('');
}