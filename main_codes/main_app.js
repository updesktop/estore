function start_app(){
	//return;
  allow_start(false);
  JBE_ONLINE_NAVI=navigator.onLine;    
  JBE_ONLINE=false;   
  //****************
  JBE_ONLINE_NAVI=true;
  //**************** 
  alert('start_app api dir: '+JBE_API);
  //alert('atay: '+JBE_HEADER);

  var v_banner=JBE_API+'app/'+CURR_SITE+'/gfx/banner.jpg?'+n;  
  var dir_gfx=JBE_API+'app/'+CURR_SITE+'/gfx/';
  //alert('start -> v_banner: '+v_banner);
  document.getElementById('div_header').style.background='url("'+v_banner+'") center no-repeat';
  document.getElementById('ds1').style.background='url("'+dir_gfx+'slide1.jpg?'+n+'") center no-repeat';
  document.getElementById('ds2').style.background='url("'+dir_gfx+'slide2.jpg?'+n+'") center no-repeat';
  //alert('zOnline '+JBE_API);
  //axios.post(JBE_API+'z_cat.php',{ clientno:CURR_CLIENT, request: 0 },JBE_HEADER)  
  showOnline();
  /*
  axios.post(JBE_API+'z_online.php',JBE_HEADER)  
  .then(function (response) {
    var res=parseInt(response.data);
    alert('z_online:  '+res);    
    if(res > 0 && JBE_ONLINE_NAVI){         
      //showOnline();
      get_app_default();
      alert('yes');
    }else{
      showOffline();
    }           
  })
  .catch(function (error) { 
    alert('naunsa na! '+error);
    snackBar('ERROR: '+error);
    if (!error.response) {
      // network error (server is down or no internet)
      console.log('JBE Found: network error (server is down or no internet)');
    } else {
      // http status code
      const code = error.response.status;
      // data from server while error
      const response = error.response.data;
      //console.log(code+' vs '+response);
      MSG_SHOW(vbOk,"INTERNAL ERROR:","CODE:"+code+". Server Response: "+response+". <br>Please Refresh.",function(){},function(){}); 
    }
    showOffline();          
  });
  */
}

function showOnline(){
  //alert('showOnline activated');
  JBE_ONLINE=true;    
  
  document.getElementById('div_bar').style.display='block';
  get_app_default();
  get_app_var(CURR_USER,true);    

  document.getElementById('jtime').innerHTML='';   
  showMainPage(); 
  
  // Page is loaded
  const objects = document.getElementsByClassName('asyncImage');
  Array.from(objects).map((item) => {
    // Start loading image
    const img = new Image();
    img.src = item.dataset.src;
    // Once image is loaded replace the src of the HTML element
    img.onload = () => {
      item.classList.remove('asyncImage');
      return item.nodeName === 'IMG' ? 
        item.src = item.dataset.src :        
        item.style.backgroundImage = `url(${item.dataset.src})`;
    };
  });       
}

function showOffline(){    
  JBE_ONLINE=false;
  dispMenu(true,'mnu_main');    
  /*
     for(var i=0;i<JBE_STORE_IDX.length;i++){
      //if(!vmode && JBE_STORE_IDX[i]['init'] == 0) { continue; }
      //if(parseInt(JBE_STORE_IDX[i]['init']) != vmode) { continue; }
      alert(JBE_STORE_IDX[i]['flename']+' = '+JBE_STORE_IDX[i]['numrec']);    
    }
    */
  getAllDataFromIDX(0);
  //showSystem();
  
  document.getElementById('jtime').innerHTML='OFFLINE';
  document.getElementById('div_bar').style.display='block';  

  allow_start(true);
  showMainPage(); 
}

function allow_start(v){
  var vv='none';
  showProgress(true);
  if(v){ vv='auto'; showProgress(false); }
  document.getElementById('wrapper').style.pointerEvents=vv;
}

function myScroll(){
  var position = document.getElementById('user_main').scrollTop;
  //console.log('POSITION: '+position);
  document.getElementById('div_search').style.display='none';
  if(position > 150) { 
    document.getElementById('div_header').style.opacity=1;
    document.getElementById('div_search').style.display='block';
  }else if(position > 125) { 
    document.getElementById('div_header').style.opacity=.8;    
  }else if(position > 100) { 
    document.getElementById('div_header').style.opacity=.6;        
  }else if(position > 50) { 
    document.getElementById('div_header').style.opacity=.4;        
  }else{
    document.getElementById('div_header').style.opacity=0;
  }
}

  //=====================
function initSearch(){
  var dtl='';
  for(var i=0;i<DB_STOCK.length;i++){
    var stockno=DB_STOCK[i]["stockno"];
    var descrp=DB_STOCK[i]["stockname"];
    dtl+=
      '<li><a href="javascript:seek_item(&quot;'+stockno+'&quot;)">'+descrp+'</a></li>';
  }
  document.getElementById('myUL').innerHTML=dtl;
}

function seek_item(stockno){
  showUL(false);
  //showMainPage();
  view_dtl_stock(stockno,1);
}

function showUL(vmode){    
  if(vmode){
      document.getElementById('divUL').style.display='block';
      document.getElementById('user_main').style.display='none';
      document.getElementById('img_search').src= "../../main_gfx/jcancel.png";
      initSearch();
  }else{
      document.getElementById('divUL').style.display='none';
      document.getElementById('user_main').style.display='block';
      document.getElementById('img_search').src= "../../main_gfx/jsearch.png";
  }  
}

function mySearch() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('inp_search');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');
  
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
  

//=======APP DB AND DISPLAY==========================================================
function get_app_default(){    
  //alert('tan awa : '+CURR_CLIENT);
  get_db_sys();
  get_db_cat();
  get_db_stock();
  get_db_comments();    
  get_db_clients();
}
function get_app_var(u,f_showprofile){
  DB_USER=[]; DB_ORDER=[];
  get_db_order(u);
  get_db_cart(u);
  get_db_bell(u);
  get_db_chat(u);
  get_db_user(u,f_showprofile);
}

function get_db_user(u,f_showprofile){
  //alert('u: '+u+' p: '+p);
  //alert(f_showprofile);
  DB_USER=[];
  axios.post(JBE_API+'z_user.php', { clientno:CURR_CLIENT,request: 1, usercode: u },JBE_HEADER)
  .then(function (response) {    
    DB_USER = response.data;
    //alert('unsa ni: '+DB_USER.length);
    if(f_showprofile) { showProfile(1); }
    allow_start(true);
  })    
  .catch(function (error) { console.log('DB_USER: '+error); allow_start(true); });
}
function get_db_clients(){
  //alert(f_showprofile);
  DB_CLIENTS=[];    
  axios.post(JBE_API+'z_user.php', { clientno:CURR_CLIENT,request: 0 },JBE_HEADER)     
  .then(function (response) { 
    DB_CLIENTS = response.data;  console.log(DB_CLIENTS);    
    clearStore(JBE_STORE_IDX[3]['flename']); saveDataToIDX(DB_CLIENTS,3);       
  })    
  .catch(function (error) { console.log('DB_CLIENTS: '+error); });
}

function get_db_cat(){
  DB_CAT=[];
  //axios.post('http://localhost/api_rphs/z_rphs.php', { request: 0 }, xhead)
  axios.post(JBE_API+'z_cat.php', { clientno:CURR_CLIENT, request: 0 },JBE_HEADER) 
  .then(function (response) { 
    //alert('alert xxxx '+response.data); 
    //alert('alert yyyy '+response.data.length); 
    console.log(response.data); 
    DB_CAT = response.data;     
    //alert('get_db_cat '+JBE_STORE_IDX[0]['numrec']+' db cat: '+DB_CAT.length);
    /*
    if(JBE_STORE_IDX[0]['numrec'] != DB_CAT.length){ 
      clearStore(JBE_STORE_IDX[0]['flename']); 
      //  JBE_STORE_IDX[0]['numrec']=DB_CAT.length;
      //saveDataToIDX(DB_CAT,0); 
    } 
    */
    showCategories();     
  })
  .catch(function (error) { console.log(error); }); 
}
function get_db_stock(){
  DB_STOCK=[];
  axios.post(JBE_API+'z_stock.php', { clientno:CURR_CLIENT,request: 0 },JBE_HEADER) 
  .then(function (response) { 
      console.log(response.data); 
      DB_STOCK = response.data; 
      //alert('get_db_stock '+JBE_STORE_IDX[1]['numrec']+' db stock: '+DB_STOCK.length);
      /*
      if(JBE_STORE_IDX[1]['numrec'] != DB_STOCK.length){ 
         clearStore(JBE_STORE_IDX[1]['flename']); 
         saveDataToIDX(DB_STOCK,1); 
      }  
      */
      showPromos(); 
      showItems(); 
      initSearch();
  })    
  .catch(function (error) { console.log(error); }); 
}
function get_db_cart(u){        
  DB_CART=[];
  var req=1;
  if(CURR_AXTYPE > 0){
    req=0;
  }

  axios.post(JBE_API+'z_cart.php', { clientno:CURR_CLIENT,request:req, usercode:u },JBE_HEADER) 
  .then(function (response) { console.log(response.data); DB_CART = response.data; refreshNOTIF('cart'); })    
  .catch(function (error) { console.log(error); }); 
}
function get_db_comments(){
  DB_COMMENT=[];
  //alert('get_db_comments() '+JBE_API);
  axios.post(JBE_API+'z_comment.php', { clientno:CURR_CLIENT,request: 0 },JBE_HEADER) 
  .then(function (response) { DB_COMMENT = response.data; console.log(DB_COMMENT); })    
  .catch(function (error) { console.log(error); }); 
}
function get_db_sys(){  
  //alert('get_db_sys:  clientno: '+CURR_CLIENT);
  DB_SYS=[]; DB_SLIDER=[];
  axios.post(JBE_API+'z_sysfile.php', { clientno:CURR_CLIENT,site:CURR_SITE,request: 1 },JBE_HEADER) 
  .then(function (response) { 
      console.log(DB_SYS);     
        
    //alert('get_db_sys:  Slider : '+response.data);

    DB_SYS = response.data[0]; 
    DB_SLIDER = response.data[1];

    if(DB_SYS.length > 0){ 
      //alert('xxxcopy sysfile to idx '+DB_SYS.length);      
      clearStore(JBE_STORE_IDX[2]['flename']); saveDataToIDX(DB_SYS,2);       
    }     
    showSystem(); 
  })    
  .catch(function (error) { showOffline(); console.log(error); }); 
}
function get_db_order(u){
  DB_ORDER=[];DB_ORDER2=[];
  var req=1;
  if(CURR_AXTYPE > 0){
    req=0;
  }
  axios.post(JBE_API+'z_order.php', { clientno:CURR_CLIENT,request: req, usercode: u },JBE_HEADER)     
  .then(function (response) { 
    console.log(response.data); 
    DB_ORDER = response.data[0]; 
    DB_ORDER2 = response.data[1]; 
    refreshNOTIF('order');     
    //alert(DB_ORDER.length+' vs '+DB_ORDER2.length);
  })    
  .catch(function (error) { console.log(error); });
}

function get_db_bell(u){
  DB_BELL=[];
  var req=1;
  if(CURR_AXTYPE > 0){
    req=0;
  }
  axios.post(JBE_API+'z_bell.php', { clientno:CURR_CLIENT,request: req, usercode: u },JBE_HEADER)     
  .then(function (response) { console.log(response.data); DB_BELL = response.data; refreshNOTIF('bell'); })    
  .catch(function (error) { console.log(error); });
}
function get_db_chat(u){
  DB_CHAT=[];
  var req=1;
  if(CURR_AXTYPE > 0){
    req=0;
  }
  axios.post(JBE_API+'z_chat.php', { clientno:CURR_CLIENT,request: req, usercode: u },JBE_HEADER)     
  .then(function (response) { console.log(response.data); DB_CHAT = response.data; refreshNOTIF('chat'); })    
  .catch(function (error) { console.log(error); });
}

//=================================================================================
//=======================show page=================================================
function showMainPage(){ 
  //alert('ako main page');
  f_MainPage=true;
  document.getElementById("myView1").setAttribute('data-JBEpage',0); //reset openview page to 0
  if(f_reload){
    snackBar('Press Back key to Exit');    
    //alert('Press Back key to Exit');    
    f_reload=false;
  }
  //allow_start(true);
  //document.getElementById('div_nobar').style.display='none';
  console.log('mainpage '+f_MainPage);
  openPage('page_main');  
  //showMenu('mnu_main'); 
  var vmenu='mnu_main';  
  var v_curr_user=CURR_USER;    
  if(CURR_AXTYPE > 0){ 
    v_curr_user=''; //user current client
    vmenu='mnu_main_owner';
  }
  dispMenu(true,vmenu);
  if(!JBE_ONLINE) { return; }

  axios.post(JBE_API+'z_notif.php',{ clientno:CURR_CLIENT, request: 0, usercode: v_curr_user },JBE_HEADER)     
  .then(function (response) { console.log(response.data);
    DB_CART = response.data[0];  
    DB_CHAT = response.data[1];              
    DB_BELL = response.data[2];    
    refreshNOTIF('ALL');
  },JBE_HEADER)    
  .catch(function (error) { 
    console.log(error); 
  });

}

function dispHeaderMode(){
  if(!CURR_USER){
    document.getElementById('logger').innerHTML="Log In";
    document.getElementById("page_login").style.display="none";      
  }else{
    document.getElementById('logger').innerHTML=CURR_NAME;      
    document.getElementById("page_login").style.display="none";        
  }
  if(CURR_AXTYPE > 0){
    //document.getElementById("div_logo").style.width='80%';
    //document.getElementById("div_logo").style.textAlign='left';
    document.getElementById("menu_open").style.display='block';
    document.querySelectorAll('.dots').forEach(function(el) {
      el.style.display = 'block';
    });
  }else{
    //document.getElementById("div_logo").style.width='100%';
    //document.getElementById("div_logo").style.textAlign='center';
    document.getElementById("menu_open").style.display='none';
    document.querySelectorAll('.dots').forEach(function(el) {
      el.style.display = 'none';
    });
  }
}

// ** ======================= SHOW ROUTINES ===================================
function showProfile(v){  
  //alert('showprofile: '+v);
  dispHeaderMode();
  document.getElementById('div_bar').style.display='block';
  var n = new Date().toLocaleTimeString('it-IT');
  var v_mphoto='../../main_gfx/avatar.png';
  
  if(DB_USER.length==0 || CURR_USER==null || CURR_USER==''){
    
    document.getElementById('bar_avatar').src=v_mphoto;
    document.getElementById('log_avatar').src=v_mphoto;
    document.getElementById('logger').innerHTML='';
    return;
  }

  //v_mphoto='upload/users/'+CURR_USER+'.jpg?'+n;
  v_mphoto=JBE_API+'app/'+CURR_SITE+'/upload/users/'+CURR_USER+'.jpg?'+n;
  if(!JBE_ONLINE){
    v_mphoto='data:image/png;base64,' + btoa(DB_USER[0]['photo']);
  }
  
  document.getElementById('bar_avatar').src=v_mphoto;
  document.getElementById('log_avatar').src=v_mphoto;
  document.getElementById('logger').innerHTML=CURR_NAME;
  
}

function showSystem(){  
  if(DB_SYS.length==0){ return; }
  var aryDB=DB_SYS;
  var n = new Date().toLocaleTimeString('it-IT'); 
  //alert('banner: '+aryDB[0]['banner']);

  //slide paint area==================
  //var v_banner='gfx/banner.jpg?'+n;  
  var v_banner=JBE_API+'app/'+CURR_SITE+'/gfx/banner.jpg?'+n;  
  if(!JBE_ONLINE){
    //alert('shawa');
    v_banner='data:image/png;base64,' + btoa(aryDB[0]['banner']);
  }   

  //slide paint area==================
  var dtl='';
  var idx=0;
  var v_slide;
  for(var i=0;i<3;i++){  
      idx=(i+1);     
      v_slide='gfx/slide'+idx+'.jpg?'+n;
      v_slide=JBE_API+'app/'+CURR_SITE+'/gfx/slide'+idx+'.jpg?'+n;
      if(!JBE_ONLINE){        
          v_slide='data:image/png;base64,' + btoa(DB_SYS[0]['slide'+idx]);
      }
      dtl+=
          '<div id="ds'+idx+'" class="slideX" style="animation:fade'+idx+' 20s infinite;-webkit-animation:fade'+idx+' 20s infinite;'+
                'width:100%;height:100%;background:url('+v_slide+') center no-repeat;">'+                       
          '</div>';
                  
    document.getElementById('div_slider').innerHTML=dtl;    
  }
  document.getElementById('div_header').style.background='url("'+v_banner+'") center no-repeat';

  //header paint area==================
  for(var i=0;i<3;i++){
    document.getElementById('header'+(i+1)).innerHTML=aryDB[0]['hd'+(i+1)];
  }

  document.getElementById('div_pg_title').innerHTML=aryDB[0]['pg_title'];
  document.getElementById('div_pg_body').value=aryDB[0]['pg_body'];
  
  setSysColors();    
}

function imgOnError(dv){	  
  dv.onerror=null;
  dv.src="../../main_gfx/jcancel.png";
}

function showCategories(){  
  var m=0;
  if(!JBE_ONLINE){ m=1; } 
  var n = new Date().toLocaleTimeString('it-IT');
  var ctr=0;
  CURR_BACKER=0;
  var cat = DB_CAT;  
  //var dir_gfx=JBE_API+'app/'+CURR_SITE+'/gfx/';
  cat.sort(sortByMultipleKey(['descrp']));     
  var dtl='<div id="scroll_cat" style="width:100%;height:210px;background:none;">';  
  for(i=0;i<cat.length;i++){       
    var v_mcode=cat[i]['catno'];    
    var v_mname=cat[i]['descrp']; 
    if(m==0){      
      var v_mphoto=JBE_API+'app/'+CURR_SITE+'/upload/'+cat[i]['photo']+'?'+n;   
    }else{
      var v_mphoto='data:image/png;base64,' + btoa(cat[i]['photo']);
    }

    dtl=dtl+      
      '<div onclick="view_dtl_cat(&quot;'+v_mcode+'&quot;)" class="class_items" style="float:left;text-align:center;width:94px;height:46%;margin-top:1%;margin-left:1%;padding:5px;background:none;">'+      
        '<div style="position:relative;height:75%;width:100%;border-radius:10px;border:1px solid lightgray;background:none;">'+
          '<div class="class_center_div">'+          
            '<img src="'+v_mphoto+'" class="asyncImage" onerror="imgOnError(this)" alt="category image" style="height:auto;max-height:100%;width:auto;max-width:100%;border-radius:8px;background:none;"/>'+
          '</div>'+
        '</div>'+
        '<div style="height:25%;width:100%;">'+
          '<div style="width:100%;height:auto;max-height:70%;font-size:11px;overflow-x:hidden;overflow-y:auto;color:black;background:none;">'+v_mname+'</div>'+
        '</div>'+
      '</div>';
      
    ctr++;
  }  
  dtl=dtl+'</div>';
  document.getElementById('div_category').innerHTML=dtl;     
  ctr++;
  var vwidth=(130*ctr)/2;
  document.getElementById('scroll_cat').style.width=vwidth+'px';
}

function showItems(){
  //alert('showItems active');
  var m=0;
  if(!JBE_ONLINE){ m=1; }  
  var n = new Date().toLocaleTimeString('it-IT');  
  CURR_BACKER=0;
  var aryDB = DB_STOCK;   
  aryDB.sort(sortByMultipleKey(['catno'],['stockname']));    
  var dtl='<div id="scroll_items" style="width:100%;height:auto;overflow-x:hidden;overflow-y:auto;background:none;">';  
  for(i=0;i<aryDB.length;i++){       
    //if(parseInt(aryDB[i]['promo']) != 1) { continue; }
    var v_mcode=aryDB[i]['stockno'];    
    var v_mname=aryDB[i]['stockname']; 
    var v_mprice=aryDB[i]['price']; 
    if(m==0){
      var v_mphoto=JBE_API+'app/'+CURR_SITE+'/upload/'+aryDB[i]['photo']+'?'+n;   
      //var v_mphoto='../../app/'+CURR_SITE+'/upload/'+aryDB[i]['photo']+'?'+n;         
    }else{
      var v_mphoto='data:image/png;base64,' + btoa(aryDB[i]['photo']);
    }
     
    //alert('stock: '+v_mphoto);
    dtl=dtl+
      '<div onclick="view_dtl_stock(&quot;'+v_mcode+'&quot;,1)" class="class_items" style="background:none;">'+        
        '<div style="position:relative;height:70%;width:100%;border-radius:10px;border:1px solid lightgray;background:none;">'+          
          '<div class="class_center_div">'+
            '<img id="si_img'+v_mcode+'" src="'+v_mphoto+'" onerror="imgOnError(this)"  class="asyncImage" alt="item image" style="height:auto;max-height:100%;width:auto;max-width:100%;border-radius:8px;background:none;"/>'+
          '</div>'+
        '</div>'+
        '<div style="height:30%;width:100%;">'+
          '<div style="width:100%;height:auto;max-height:70%;font-size:11px;overflow-x:hidden;overflow-y:auto;color:black;background:none;">'+v_mname+'</div>'+
          '<div style="width:100%;height:30%;font-size:11px;color:red;background:none;">&#8369; '+formatNumber2(v_mprice)+'</div>'+
        '</div>'+
      '</div>';
  }  
  dtl=dtl+'</div>';
  document.getElementById('div_items').innerHTML=dtl;    
  
  var vheight=(117+4)*3;
  document.getElementById('scroll_items').style.height=vheight+'px';
}

function myResizeFunction(){    
  var H_BAR=parseInt(document.getElementById('div_bar').style.height);  
  
  H_HEADER=parseInt(document.getElementById('div_header').style.height);  
  H_FOOTER=parseInt(document.getElementById('div_footer').style.height);
  
  H_WRAPPER=window.innerHeight;
  H_BODY=window.innerHeight - (H_FOOTER);
  H_PAGE=window.innerHeight - (H_FOOTER);
  H_VIEW=window.innerHeight - (H_FOOTER+H_BAR+0);
 
  document.getElementById('wrapper').style.height=(window.innerHeight)+'px';
  
  //document.getElementById('user_main').style.display='none';
 
  document.querySelectorAll('.page_class').forEach(function(el) {    
    el.style.height=H_BODY+'px';    
    //el.style.backgroundColor='blue';
  });
  
  document.getElementById('user_main').style.height=window.innerHeight - (H_FOOTER)+'px';
  document.getElementById('mySidenav').style.height=(window.innerHeight-H_HEADER)+'px';
  document.getElementById('mySidenav').style.top=H_HEADER+'px';

  JBE_MOBILE=true;
  if(window.outerWidth > 500){
    JBE_MOBILE=false;
  }
}

/***************************************************** */
function openNav() {  
  if(!JBE_ONLINE){
    snackBar('OFFLINE');
    return;
  }
  
  if(document.getElementById('menu_open').getAttribute('data-open')=='1'){
    closeNav();
    return;
  }
  //document.getElementById('menu_open').innerHTML='&#8592;';
  document.getElementById('hd_img').src='../../main_gfx/jback.png';    
  //document.getElementById("mySidenav").style.display='none';
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById("menu_open").setAttribute('data-open','1');
  event.stopPropagation();    
}

function closeNav() {
  //document.getElementById('menu_open').innerHTML='&#9776;';
  document.getElementById('hd_img').src='../../main_gfx/jham.png';    
  document.getElementById("mySidenav").style.width = "0";   
  document.getElementById("menu_open").setAttribute('data-open','0'); 
  event.stopPropagation();    
}

window.onclick = function(event) {  
  //alert(event.target.id);  
  //if(event.target.id !== 'mySidenav' && event.target.id !== 'menu_open') {       
  
  if(event.target.id !== 'mySidenav') {
    closeNav();
  }
  if (!event.target.matches('.dropbtn')) {
    closeDropdown();
  }
}

function addAnimation(body) {
	let dynamicStyles = null;
  if (!dynamicStyles) {
    dynamicStyles = document.createElement('style');
    dynamicStyles.type = 'text/css';
    document.head.appendChild(dynamicStyles);
  }
  
  dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
}
 
function showPromos(){
  var m=0;
  if(!JBE_ONLINE){ m=1; } 
  var n = new Date().toLocaleTimeString('it-IT');
  var aryDB = DB_STOCK; 
  aryDB.sort(sortByMultipleKey(['catno'],['stockname']));   

	
  var dtl='';
  for(var i=0;i<aryDB.length;i++){
    if(parseInt(aryDB[i]['promo']) == 0) { continue; }
    //if(i>2) {break;}
    var v_mcode=aryDB[i]['stockno'];    
    var v_mname=aryDB[i]['stockname']; 
    var v_mprice=aryDB[i]['price']; 
    //var v_mphoto='upload/'+aryDB[i]['photo']+'?'+n;   
    if(m==0){
      //var v_mphoto='upload/'+aryDB[i]['photo']+'?'+n;
      var v_mphoto=JBE_API+'app/'+CURR_SITE+'/upload/'+aryDB[i]['photo']+'?'+n;   
    }else{
      var v_mphoto='data:image/png;base64,' + btoa(aryDB[i]['photo']);
    }

    dtl+=              
      '<div onclick="view_dtl_stock(&quot;'+v_mcode+'&quot;,1)" class="clsDiv" style="background:white;">'+       
          '<div class="clsImg" style="height:72%">'+      
              '<img src="'+v_mphoto+'" class="asyncImage" style="height:auto;max-height:100%;width:auto;max-width:100%;border-radius:8px;background:none;" alt/>'+
          '</div>'+
          '<div style="height:28%;width:100%;">'+
          '<div style="width:100%;height:auto;max-height:65%;font-size:11px;overflow-x:hidden;overflow-y:auto;color:black;background:none;">'+v_mname+'</div>'+
          '<div style="width:100%;height:35%;font-size:11px;color:red;background:none;">&#8369; '+formatNumber2(v_mprice)+'</div>'+
          '</div>'+
      '</div>';
  }
    
  document.getElementById('div_promo').innerHTML=dtl;
  //if(dbSlide.length<5){ return; }
  if(aryDB.length<5){ return; }
  
  var ctrDiv=document.querySelectorAll('#div_promo .clsDiv').length;
  //alert(ctrDiv);
  width_slider=(ctrDiv*4)*10;
  var divWidth=(25/width_slider)*100;
  document.getElementById('div_promo').style.width=width_slider+'%';
  
  //document.querySelectorAll('#slider .clsDiv').style.width=(ctrDiv/1.6)+'%';


  document.querySelectorAll('.clsDiv').forEach(function(el) {
      el.style.width = divWidth+'%';        
  });
  
  var kf='@keyframes slidy {'+      
      '0% { left: 0%; } ';
      
  var p1=100/(ctrDiv-4);
  for(var i=1;i<=(ctrDiv-4);i++){ 
        kf+=parseInt(p1*i)+'% { left:'+(i* -25)+'%; } ';
  }
  kf+='}';    
  
  addAnimation(kf);
  document.getElementById("div_promo").style.animationDuration = (ctrDiv)+"s";
}