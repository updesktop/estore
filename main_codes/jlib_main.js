function callText(){
  if(!JBE_ONLINE){
    //snackBar('OFFLINE');
    //return;
  }
  var tilt='Call/Text Contact';
  var vimgCall='../../main_gfx/jcall.png';
  var vimgSms='../../main_gfx/jsms.png';
  
  var dtl=      
    //'<div id="div_calltext" data-zoom=0 style="width:100%;height:'+(H_BODY-350)+'px;overflow:auto;text-align:center;padding:0px;background-color:white;">'+
    '<div id="div_calltext" data-zoom=0 style="width:100%;height:'+105+'px;overflow:auto;text-align:center;padding:0px;background-color:white;">'+
      /*
      for(var i=0;i<DB_CLIENTS.length;i++){
        
        if(DB_CLIENTS[i]['usertype']=='0') { continue; }
        //alert(DB_CLIENTS[i]['username']);
        dtl+=
          '<div style="width:100%;height:40px;margin-top:5px;padding:5px;text-align:left;font-size:12px;background-color:lightgray;">'+
            '<div style="float:left;width:35%;height:100%;padding:8px 0 0 5px;background-color:none;">'+DB_CLIENTS[i]['username']+'</div>'+
            '<div style="float:left;width:35%;height:100%;padding:8px 0 0 5px;background-color:none;">'+DB_CLIENTS[i]['celno']+'</div>'+
            '<input onclick="callTextGO(&quot;call&quot;,&quot;'+DB_SYS[0]['telno']+'&quot;)" type="image" src="'+vimgCall+'" style="float:right;text-align:right;padding:0px 5px 0 0;height:100%;margin-left:10px;background:none;" />'+
            '<input onclick="callTextGO(&quot;txt&quot;,&quot;'+DB_SYS[0]['celno']+'&quot;)" type="image" src="'+vimgSms+'" style="float:right;text-align:right;padding:0px 5px 0 0;height:100%;background:none;" />'+
          '</div>'; 
      }
      */
      
      '<div style="width:100%;height:40px;margin-top:5px;padding:5px;text-align:left;font-size:12px;background-color:lightgray;">'+
            '<div style="float:left;width:35%;height:100%;padding:8px 0 0 5px;background-color:none;">Telephone</div>'+            
            '<div style="float:left;width:35%;height:100%;padding:8px 0 0 5px;background-color:none;">'+DB_SYS[0]['telno']+'</div>'+
            '<input onclick="callTextGO(&quot;call&quot;,&quot;'+DB_SYS[0]['telno']+'&quot;)" type="image" src="'+vimgCall+'" style="float:right;text-align:right;padding:0px 5px 0 0;height:100%;margin-left:10px;background:none;" />'+
            '<input onclick="callTextGO(&quot;txt&quot;,&quot;'+DB_SYS[0]['telno']+'&quot;)" type="image" src="'+vimgSms+'" style="float:right;text-align:right;padding:0px 5px 0 0;height:100%;background:none;" />'+
      '</div>'+ 
      '<div style="width:100%;height:40px;margin-top:5px;padding:5px;text-align:left;font-size:12px;background-color:lightgray;">'+
            '<div style="float:left;width:35%;height:100%;padding:8px 0 0 5px;background-color:none;">Mobile</div>'+
            '<div style="float:left;width:35%;height:100%;padding:8px 0 0 5px;background-color:none;">'+DB_SYS[0]['celno']+'</div>'+
            '<input onclick="callTextGO(&quot;call&quot;,&quot;'+DB_SYS[0]['celno']+'&quot;)" type="image" src="'+vimgCall+'" style="float:right;text-align:right;padding:0px 5px 0 0;height:100%;margin-left:10px;background:none;" />'+
            '<input onclick="callTextGO(&quot;txt&quot;,&quot;'+DB_SYS[0]['celno']+'&quot;)" type="image" src="'+vimgSms+'" style="float:right;text-align:right;padding:0px 5px 0 0;height:100%;background:none;" />'+
      '</div>';
          
    dtl+='</div>';
  
  var dtl2=      
    '<div style="width:100%;height:100%;padding:11px 0 0 0;text-align:center;color:'+JBE_TXCLOR1+';background:none;">'+
      tilt+      
    '</div>';   

  JBE_OPENBOX('div_calltext',tilt,dtl,dtl2); 
  //showMenu('mnu_callText');
}
function callTextGO(m,celno){  
  //alert(m+' vs '+celno);  
  if(celno.substring(0,1)=='0'){
    celno='+63'+celno.substring(1);
  }
  
  var vhref='';
  if(m=='call') {      
    //window.location.href="tel:+63-948-952-3337";
    vhref='tel:'+celno;
  }else if(m=='txt') {
    //window.location.href="sms://+639489523337?body=I%27m%20interested%20in%20your%20product.%20Please%20contact%20me."
    vhref='sms://'+celno+'?body=I%27m%20interested%20in%20your%20product.%20Please%20contact%20me.';
  }  
  window.location.href=vhref;
  //window.location.href="sms://+639489523337?body=I%27m%20interested%20in%20your%20product.%20Please%20contact%20me."
}
function close_calltext(){
  //showMenu('mnu_main');    
}


//=============================================================

function jeff(){  
  if(CURR_AXTYPE < 9){ return; }
  alert(
    'DB_USER: '+DB_USER.length+
    '\nDB_CAT: '+DB_CAT.length+
    '\nDB_STOCK: '+DB_STOCK.length+
    '\nDB_COMMENT: '+DB_COMMENT.length+
    '\nDB_SYS: '+DB_SYS.length      
  );
}

function refreshMain(){
  /*
  get_app_default();
  get_app_var(CURR_USER,true);    
  document.getElementById('jtime').innerHTML=''; 
  showMainPage();
  //scroll-behavior: smooth;
  document.getElementById('user_main').style.scrollBehavior='smooth';
  document.getElementById('user_main').scrollTop=0;
  */
  location.reload(true);
}


 
function setSysColors(){  
  var aryDB=DB_SYS;
  if(DB_SYS.length > 0){   
    JBE_CLOR=aryDB[0]['clor1'];
    JBE_CLOR2=aryDB[0]['clor2'];
    JBE_CLOR3=aryDB[0]['clor3'];
    JBE_CLOR4=aryDB[0]['clor4'];
    JBE_TXCLOR1=aryDB[0]['txclor1'];
    JBE_TXCLOR2=aryDB[0]['txclor2'];
    JBE_TXCLOR3=aryDB[0]['txclor3'];
    JBE_TXCLOR4=aryDB[0]['txclor4'];
  }

  je_msg_color('white',JBE_CLOR);
  document.getElementById('modal-header').style.color=JBE_TXCLOR1;
  document.getElementById('modal-footer').style.color=JBE_TXCLOR1;
  document.getElementById('lognow').style.color=JBE_TXCLOR1;
  document.getElementById('lognow').style.backgroundColor=JBE_CLOR;
  //document.getElementById('logger').style.color=JBE_TXCLOR3;
  EP_SetColorByClass('jheader',JBE_TXCLOR3,JBE_CLOR3);
  EP_SetColorByClass('jfooter',JBE_TXCLOR1,JBE_CLOR);
  EP_SetColorByClass('rowclass_dots',JBE_TXCLOR2,JBE_CLOR2);    
  EP_SetColorByClass('hd_box',JBE_TXCLOR1,JBE_CLOR);
  EP_SetColorByClass('back_main',JBE_TXCLOR1,JBE_CLOR);    
  EP_SetColorByClass('class_notif2',JBE_TXCLOR4,JBE_CLOR4);
  EP_SetColorByClass('footer_fonts',JBE_TXCLOR1,'none');
}


function setRecord(xtrano){
  //return;
  //alert('currec: '+CURR_REC+' vs xtrano: '+xtrano);
  var bg='red';
  bg='lightgreen';

  if(CURR_REC != ''){
      var w = document.getElementById('c_line'+CURR_REC);
      var obg = w.getAttribute('data-clor');      
      w.style.backgroundColor=obg;
      w.setAttribute('data-sel',0);    
  }

  var x = document.getElementById('c_line'+xtrano);
  x.style.backgroundColor=bg;
  x.setAttribute('data-sel',1);  
  CURR_REC=xtrano;
}

function EP_SetColorByClass(cls,clr1,clr2){
  document.querySelectorAll('.'+cls).forEach(function(el) {
    el.style.color=clr1;
    el.style.backgroundColor=clr2;
  });
}

function selectRow(selRow,nameclass){
  //alert('xxx selectRow: '+selRow);  
  document.querySelectorAll('.'+nameclass).forEach(function(el) {  
    //el.style.backgroundColor='lightgray';
    el.style.border='0px solid lightgray';
    el.style.color='black';
  });
  document.getElementById(selRow).style.border='2px solid red';
  document.getElementById(selRow).style.color='red';
}

function subHover(div,n,i,c){    
  var datasel=document.getElementById(div).getAttribute('data-sel');

  if(datasel==1) {   
      return; 
  }   
      
  var obg=document.getElementById(div).getAttribute('data-clor');

  if(n==1){
      document.getElementById(div).style.backgroundColor='yellowgreen';
  } else {    
      document.getElementById(div).style.backgroundColor=obg; 
  }
}

function getExt(filename){
  var ext = filename.split('.').pop();
  if(ext == filename) return "";
  return ext;
}

function dispMenu(f_main,m){
  document.querySelectorAll('.menu_class').forEach(function(el) {
    el.style.display = 'none';  
  });
  document.getElementById('mnu_main').style.display='none';
  document.getElementById('mnu_main_owner').style.display='none';
  if(f_main){
    document.getElementById('mnu_mainmenu').style.display='block';    
    document.getElementById(m).style.display='block';
  }else{
    document.getElementById('mnu_submenu').style.display='block';    
    document.getElementById('mnu_submenu').innerHTML=m;
  }
}

function openPage(m){  
  document.querySelectorAll('.page_class').forEach(function(el) {
    //alert(el.id);
    el.style.display = 'none';
  });
  document.getElementById(m).style.display='block';    
}

function openView(dtl,cap,xclose) {
  //alert(xclose);
  document.getElementById('page_main').style.display='none';
  //document.getElementById('div_nobar').style.display='block';
  var m=parseInt(document.getElementById("myView1").getAttribute('data-JBEpage'));  
  m++;
  //alert(m);
  document.getElementById("myView"+m).setAttribute('data-page',m);
  document.getElementById("myView"+m).setAttribute('data-close',xclose); 
  document.getElementById('dtl_myView'+m).style.height=H_VIEW+'px';
  
  document.getElementById("dtl_myView"+m).innerHTML=dtl;  
  document.getElementById("cap_myView"+m).innerHTML=cap;  

  if(m==1){
    openPage('myView'+m);
  }else{
    document.getElementById("myView"+(m-1)).style.display='none';
    //alert('second page view');
    document.getElementById("myView"+m).style.display='block';
  }
  document.getElementById("myView1").setAttribute('data-JBEpage',m);    
}

function closeView(){
  var m=parseInt(document.getElementById("myView1").getAttribute('data-JBEpage'));
  //alert('closeView # '+m);
  var xclose=document.getElementById("myView"+m).getAttribute('data-close');
  //var param=xclose.substr(xclose.lastIndexOf('|')+1);
  //xclose=xclose.substr(0,xclose.lastIndexOf('|')+0);
  var ndx=xclose.indexOf('|');
  var param='';
  if(ndx >= 0){
    param=xclose.substr(ndx+1);
    xclose=xclose.substr(0,ndx);
  }
  
  document.getElementById("myView"+m).setAttribute('data-open','0');
  document.getElementById("myView"+m).style.display='none';
  
  if(m > 1){
    document.getElementById("myView"+(m-1)).style.display='block';    
    document.getElementById("myView1").setAttribute('data-JBEpage',m-1);
  }else{
    //document.getElementById('div_nobar').style.display='none';
    document.getElementById("myView1").setAttribute('data-JBEpage',0);
  }
  
  var fn = window[xclose];
  if (typeof fn === "function") fn(param);
}

function loadDoc(div,fle) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(div).innerHTML = this.responseText;      
      }
    };
  xhttp.open("GET", fle, true);
  xhttp.send();
}

function snackBar(s) {
  if(s==''){ return; }
  var x = document.getElementById("snackbar");    
  x.innerHTML=s;
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
function formatNumber2(xnum) {
  num=Number(xnum);
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
function jeffNumber(mode,div) {  
  var vv = document.getElementById(div).value;
  var v = vv.replace(/,/g, '');
  //var res = str.replace(/,/g, ".");
  
  if(mode==1) {
    v=parseInt(v);
    var rval = formatNumber(v);
  } else if(mode==2) {
    v=parseFloat(v);
    rval=formatNumber2(v);
  }
  
  document.getElementById(div).value=rval;
  return;
}
function isNumberKey(evt,div){    
  var charCode = (evt.which) ? evt.which : event.keyCode
  //var inputValue = $("#"+div).val();
  var inputValue = document.getElementById(div).value;
  if (charCode == 46){        
      var count = (inputValue.match(/'.'/g) || []).length;
      if(count<1){
        if (inputValue.indexOf('.') < 1){
          if (inputValue.charAt(0) == '.') return false;
            return true;
        }
        return false;
      }else{
        return false;
      }
  }
  
  if (charCode == 45) {      
    var xcount = (inputValue.match(/'-'/g) || []).length;      
    if(xcount<1){        
      if (inputValue.indexOf('-') < 1){                      
        if (inputValue.charAt(0) == '-') return false;
        //if (getCursorPosition(inputValue) != 0) return false;
        return true;
      }
    }else{
      //alert(888);
      return false;
    }
    
    //if (currentValue.charAt(0) == '-') return false;
    //if (getCursorPosition(this) != 0) return false;
  } 

  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)){
      return false;
  }
  return true;
}  

function jnumber(n){  
  return n.replace(/,/g, '');  
}

function nopath(p){
  var retval=p.substr(p.lastIndexOf('/')+1);
  //alert('retval: '+retval);
  var q=retval.indexOf('?');
  if(q != -1){
    retval=retval.substr(0,retval.indexOf('?')+0);
  }
  //alert('last retval: '+retval);
  return retval;
}

function enadfy(arr){
  for(i=0;i<arr.length;i++){          
    for(x in arr[0]){      
      coldata=arr[i][x];  
     
      var pos = coldata.search('\"');      
      if(pos !== -1){        
        coldata=coldata.replace(/\"/g, "'");
        //alert(coldata);
      }

      var pos2 = coldata.search('\~');      
      if(pos2 !== -1){    
        //alert(coldata);    
        coldata=coldata.replace(/\~/g, '"');        
      }

      arr[i][x]=coldata;      
    }    
  }    
  return arr;
}

function myDropMenu(v) {
  closeDropdown();
  document.getElementById('myDropdown_'+v).classList.toggle("show");
}

function closeDropdown(){
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}

function je_msg_color(fg,bg){
  document.getElementById('modal-header').style.backgroundColor=bg;
  document.getElementById('modal-footer').style.backgroundColor=bg;
  document.getElementById('modal-body').style.backgroundColor=fg;

  //document.getElementById('lognow').style.backgroundColor=bg;
  //document.getElementById('signUp').style.backgroundColor=bg;
}


function mnu_offline(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+  
      '<div style="width:100%;height:100%;padding:12px 0 0 0;text-align:center;background:none;">'+
        'OFFLINE'+
      '</div>'+
    '</div>';
  dispMenu(false,jmenu);
}

function save_get_image(divImg){    
  if(thisFile != null){
    var newImg=document.getElementById('prev_get_image').src;    
    document.getElementById(divImg).src=newImg;  
    document.getElementById(divImg).setAttribute('data-img',thisFile.name);
  }
  JBE_CLOSEBOX();
}

function uploadNOW(file,newName,dir,ndiv){    
  var ddir=dir.substr(dir.indexOf('/app/')); 
  //var phpDir='../api/app/'+CURR_SITE+'/upload/';
  var phpDir='../api'+ddir;
  /*
  alert(
    'file     : '+file+'\n'+
    'newName  : '+newName+'\n'+
    'dir      : '+dir+'\n'+
    'ndiv     : '+ndiv+'\n'+
    'phpDir: '+phpDir
    );
  */
  var data = new FormData();  
  data.append('file', file, newName); 
  data.append('dir', phpDir); 
  var config = {}; 
  showProgress(true);
  axios.post(JBE_API+'z_load.php', data, config)
  .then(function (response) {    
    console.log(response.data[1]);
    //alert('uploadnow : '+response.data);
    showProgress(false);
    if(response.data[0] == -1){
      MSG_SHOW(vbOk,"ERROR: Upload Failed",response.data[1],function(){},function(){return;});
      return;
    }  
    
    //var closeDiv=document.getElementById('main_JBE_zoom').getAttribute('data-close');
    //var fn = window[clbak];
    //if (typeof fn === "function") fn();
    
    snackBar(response.data[1]);
    if(ndiv.length != 0){ 
      for(var j=0;j<ndiv.length;j++){
        RefreshImage(dir,newName,ndiv[j]['div']); 
      }
    }    
  })  
  .catch(function (err) {    
    console.log(err.message);
    showProgress(false);
    MSG_SHOW(vbOk,"ERROR: Upload Failed",err.message,function(){},function(){return;});
  });  
}

function RefreshImage(dir,newName,ndiv){    
  var n = new Date().toLocaleTimeString('it-IT');
  var targ=dir+newName+'?'+n;
  /*
  alert(
    'dir :'+dir+'\n'+
    'newName :'+newName+'\n'+
    'ndiv :'+ndiv+'\n'+
    'targ :'+targ
  );
  */
  document.getElementById(ndiv).src=targ;
}

function getImgOrient(div){
  var imgOrient=0; //portrait
  var hh=parseInt(document.getElementById(div).clientHeight);
  var ww=parseInt(document.getElementById(div).clientWidth);  
  //alert('w='+ww+' vs '+'h='+hh);
  if(ww > hh) { 
    imgOrient=1;
    //landscape
    //alert('Landscape: '+imgOrient);
  } 
  return imgOrient;
}

function refreshNOTIF(v){  
  var ctrCHAT=0;
  var ctrCART=0;
  var ctrORDER=0;
  var ctrBELL=0;
  
  document.getElementById('div_notifs').style.display='block';

  if(CURR_AXTYPE > 0){  // OWNERS ONLY
    document.getElementById('div_notifs').style.display='none';
    //count chat    
    if(v=='chat' || v=='ALL'){
      for(var i=0;i<DB_CHAT.length;i++){      
        if(DB_CHAT[i]['sender']=='1') { continue; }
        if(DB_CHAT[i]['unread']=='1') { continue; }
        ctrCHAT++;
      }  
      document.getElementById('ntf_chat_owner').innerHTML=ctrCHAT;      
      document.getElementById('ntf_chat_owner').style.display='block'; 
      if(ctrCHAT==0){ 
        document.getElementById('ntf_chat_owner').style.display='none';
      }else{
          JBE_AUDIO('inbox',300);
      }
    }
   
    if(v=='order' || v=='ALL'){
      var aryORD=DB_ORDER;
      aryORD.sort(sortByMultipleKey(['trano']));       
      for(var i=0;i<aryORD.length;i++){
        if(aryORD[i]['stat'] != 0) { continue; } 
        //if(aryORD[i]['unread']=='1') { continue; }
        ctrORDER++;
      }
      document.getElementById('ntf_order_owner').innerHTML=ctrORDER;      
      document.getElementById('ntf_order_owner').style.display='block'; 
      if(ctrORDER==0){ 
        document.getElementById('ntf_order_owner').style.display='none';
      }else{
          JBE_AUDIO('chimes',300);
      }
    }
    return;
  }

  if(v=='cart' || v=='ALL'){
    for(var i=0;i<DB_CART.length;i++){
      if(DB_CART[i]['usercode']!=CURR_USER) { continue; }
      ctrCART++;
    }  
    document.getElementById('ntf_cart').style.display='block';
    document.getElementById('ntf_cart').innerHTML=ctrCART;
    document.getElementById('notif_cart').style.display='block'; 
    if(ctrCART==0){ 
      document.getElementById('ntf_cart').style.display='none';
    }else{
          JBE_AUDIO('cart',0);
    }
  }

  //count chat    
  if(v=='chat' || v=='ALL'){
    for(var i=0;i<DB_CHAT.length;i++){   
      if(DB_CHAT[i]['usercode']!=CURR_USER) { continue; }
      if(DB_CHAT[i]['sender']=='0') { continue; }
      if(DB_CHAT[i]['unread']=='1') { continue; }
      ctrCHAT++;  
    }      
    document.getElementById('ntf_chat').style.display='block';
    document.getElementById('ntf_chat').innerHTML=ctrCHAT;  
    document.getElementById('notif_chat').style.display='block'; 
    if(ctrCHAT==0){
      document.getElementById('notif_chat').style.display='none';
    }else{
          JBE_AUDIO('inbox',300);
    }
  }

  //count bell    
  if(v=='bell' || v=='ALL'){
    for(var i=0;i<DB_BELL.length;i++){   
      if(DB_BELL[i]['usercode'] != CURR_USER) { continue; }  
      if(DB_BELL[i]['unread']=='1') { continue; }
      ctrBELL++;  
    }      
    document.getElementById('ntf_bell').style.display='block';
    document.getElementById('ntf_bell').innerHTML=ctrBELL;  
    document.getElementById('notif_bell').style.display='block'; 
    if(ctrBELL==0){
      document.getElementById('ntf_bell').style.display='none';
    }else{
          JBE_AUDIO('insight',300);
    }
  }  
}
