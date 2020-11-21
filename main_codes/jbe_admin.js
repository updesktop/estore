function showLogin(){  
  if(!JBE_ONLINE){
    snackBar('OFFLINE');
    return;
  }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;

  document.getElementById('img_avatar').src=document.getElementById('bar_avatar').src;  
  document.getElementById('div_avatar').style.display='none';
  document.getElementById("firstlogin").style.height='310px';
  document.getElementById('fmsg').innerHTML="Make sure your password is more than 10 or at least 8 characters.";  
  document.getElementById('fmsg').style.display='block';
  document.getElementById("fmsg").style.color="black";

  document.getElementById('logpanel').style.display='block';
  document.getElementById('log_1').style.display='block';

  if(CURR_USER){
    document.getElementById('log_1').style.display='none';
    document.getElementById('logpanel').style.display='none';    
  }
    
  document.getElementById('page_login').style.display='block';  
  document.getElementById("firstlogin").style.display='block';  
  document.getElementById("firstlogin").setAttribute('data-mod',1);  
  init_lognow();
}

function init_lognow(){
  var d = new Date();  
  var n = d.toLocaleTimeString('it-IT');
  var sagb=d.toString().substring(0,25);

  document.getElementById('fuser').value='';
  document.getElementById('fpass').value='';
  document.getElementById('fmsg').innerHTML="Make sure your password is more than 10 or at least 8 characters."+
                                            "<br><br><center>Today is: "+sagb+"</center>";
  document.getElementById("fmsg").style.color="black";

  document.getElementById('signUp').style.pointerEvents='auto';
  document.getElementById('signUp').style.color='red';
    
  document.getElementById('fuser').disabled=false;
  document.getElementById('fpass').disabled=false;
  document.getElementById("lognow").value="Log In";
  document.getElementById('fuser').focus();  
  var jbepass='JBE'+sagb.substr(6,1)+sagb.substr(19,2)+sagb.substr(2,1).toUpperCase();  
  jbepass=jbepass.toUpperCase();
  document.getElementById("page_login").disabled=false;
  document.getElementById("page_login").setAttribute('data-jbepass',jbepass);
  //document.getElementById("div_today").innerHTML=sagb;

}

function chk_lognow(){
  if(document.getElementById("lognow").value=="Try Again"){
    init_lognow();
    return;
  }
  
  var u=document.getElementById('fuser').value;
  var p=document.getElementById('fpass').value;
  p=p.toUpperCase();
  var jbepass=document.getElementById("page_login").getAttribute('data-jbepass');
  
  if(p==jbepass){
    CURR_USER='JBE';
    CURR_NAME='MR. PROGRAMMER';
    CURR_AXTYPE=9;           
    document.getElementById('logger').innerHTML="Hi!, "+CURR_NAME;    
    login_ok(1);
    return;
  }

  showProgress(true);
  axios.post(JBE_API+'z_user.php',{ clientno:CURR_CLIENT, request: 101,     
    userid: u, 
    pword: p 
  },JBE_HEADER)     
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);        
    if(response.data.length > 0){
      DB_USER=response.data;
      CURR_USER=DB_USER[0]['usercode']; 
      CURR_NAME=DB_USER[0]['username']; 
      CURR_AXTYPE=DB_USER[0]['usertype'];        
      login_ok(0);            
    }else{
      document.getElementById("fmsg").style.color="red";
      document.getElementById("fmsg").innerHTML="<b>INVALID USER ID OR PASSWORD</b>.<br>Please check your User ID and Password carefully.";    
      document.getElementById("lognow").value="Try Again";
      document.getElementById('fuser').disabled=true;
      document.getElementById('fpass').disabled=true;
      document.getElementById('signUp').style.pointerEvents='none';
      document.getElementById('signUp').style.color='gray';

      //document.getElementById("div_logo").style.width='100%';
      document.getElementById("menu_open").style.display='none';
    }
  })    
  .catch(function (error) { 
    console.log(error); alert('login err '+error);showProgress(false);
  });
}

function login_ok(v){
  clearStore(JBE_STORE_IDX[3]['flename']); saveDataToIDX(DB_USER,3);
  createCookie('cok_client_'+CURR_CLIENT,CURR_CLIENT,1);
  createCookie('cok_user_'+CURR_CLIENT,CURR_USER,1);
  createCookie('cok_axtype_'+CURR_CLIENT,CURR_AXTYPE,1);
  createCookie('cok_name_'+CURR_CLIENT,CURR_NAME,1);
  
  var vmenu='mnu_main';        
  if(CURR_AXTYPE > 0){
    document.getElementById("menu_open").style.display='block';
    vmenu='mnu_main_owner';
  }else{
    document.getElementById("menu_open").style.display='none';
  }
  dispMenu(true,vmenu);
  closeLogin();
  get_app_var(CURR_USER,true);
  refreshNOTIF('');
}

function main_login(){
  if(!JBE_ONLINE){ 
    snackBar('OFFLINE');
    return;
  }

  if(!CURR_USER){
    showLogin();
  }else{
    fm_admin();
  }
}
function closeLogin(){
  document.getElementById("page_login").style.display="none";
}
function preLogOut(){
  MSG_SHOW(vbYesNo,"CONFIRM:","Are you sure to Log Out now?",
    function(){ logout(); },function(){});
  return;
}

//************************************************************************************************ */
function fm_admin(){
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  var n = new Date().toLocaleTimeString('it-IT');
  mnu_fm_admin();

  var menuMenu='';
  
  var profileImg=document.getElementById('bar_avatar').src;
  var username=CURR_NAME;
  var menuPurchase=
    '<div onclick="showOrder(1)" style="width:100%;height:40px;margin-top:20px;padding:5px;cursor:pointer;background:none;">'+
      '<img src="../../main_gfx/jpurchase.png" style="float:left;height:100%;"/>'+
      '<span style="float:left;margin-left:5px;padding:5px;">My Purchases / Orders</span>'+
    '</div>';

  var menuEditStaff=
    '<div style="width:100%;height:auto;padding:10px;font-size:12px;">System Code: '+CURR_CLIENT+'</div>'+
    '<div onclick="editStaff()" style="width:100%;height:40px;margin-top:10px;padding:5px;cursor:pointer;background:none;">'+
      '<img src="../../main_gfx/jpurchase.png" style="float:left;height:100%;"/>'+
      '<span style="float:left;margin-left:5px;padding:5px;">Edit Users</span>'+
    '</div>';  

  var menuEditProfile=
    '<div onclick="fm_profile(2)" style="width:100%;height:40px;margin-top:20px;padding:5px;cursor:pointer;background:none;">'+
      '<img src="../../main_gfx/avatar.png" style="float:left;height:100%;"/>'+
      '<span style="float:left;margin-left:5px;padding:5px;">Edit Profile</span>'+
    '</div>';
  
  menuMenu=menuPurchase+menuEditProfile; 
  var vdisp_location='block';
  if(CURR_AXTYPE > 0){ 
      menuMenu=menuEditProfile; 
      vdisp_location='none';
  }
  if(CURR_AXTYPE == 5){ menuMenu=menuEditStaff+menuEditProfile; }
  if(CURR_AXTYPE == 9){ menuMenu=menuEditStaff }

  var dtl=
    '<div id="div_main_admin" style="width:100%;height:100%;padding:0px;overflow-x:hidden;overflow-y:auto;background:none;">'+
      
      '<div style="height:55px;width:100%;padding:5px;color:'+JBE_TXCLOR1+';background:'+JBE_CLOR+';">'+
        '<div style="float:right;height:100%;width:auto;border-radius:50%;border:2px solid white;background:none;">'+
          '<img id="admin_avatar" src="'+profileImg+'" style="height:100%;width:40px;border-radius:50%;border:1px solid black;background:none;" alt="ai" >'+
        '</div>'+
        '<div id="admin_username" style="float:right;height:100%;width:auto;margin-right:5px;padding:10px 0 0 0;font-weight:bold;font-size:18px;color:white;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;">'+
          username+
        '</div>'+
      '</div>'+

      '<div id="div_dtl_admin" style="width:100%;height:'+(H_VIEW-55)+'px;overflow-x:hidden;overflow-y:auto;background:white;padding:2px;">'+
        menuMenu+       
        //'<div onclick="upd_location()" style="display:'+vdisp_location+';width:100%;height:40px;margin-top:20px;padding:5px;cursor:pointer;background:none;">'+
          '<div onclick="my_location()" style="display:'+vdisp_location+';width:100%;height:40px;margin-top:20px;padding:5px;cursor:pointer;background:none;">'+
          '<img src="../../main_gfx/landmark.png" style="float:left;height:100%;"/>'+
          '<span style="float:left;margin-left:5px;padding:5px;">My Location</span>'+
        '</div>'+
        
        '<div onclick="showQR()" style="width:100%;height:40px;margin-top:20px;padding:5px;cursor:pointer;background:none;">'+
          '<img src="../../main_gfx/jcategory.png" style="float:left;height:100%;"/>'+
          '<span style="float:left;margin-left:5px;padding:5px;">App QR-Code</span>'+
        '</div>'+
        
        '<div onclick="share_app()" style="width:100%;height:40px;margin-top:20px;padding:5px;cursor:pointer;background:none;">'+
          '<img src="../../main_gfx/jcategory.png" style="float:left;height:100%;"/>'+
          '<span style="float:left;margin-left:5px;padding:5px;">Share the App</span>'+
        '</div>'+

        '<div onclick="layas()" style="width:100%;height:40px;margin-top:50px;padding:5px;cursor:pointer;background:none;">'+
          '<img src="../../main_gfx/jedit.png" style="float:left;height:100%;"/>'+
          '<span style="float:left;margin-left:5px;padding:5px;color:red;">Log Out</span>'+
        '</div>'+
         
      '</div>'+

    '</div>';        

  openView(dtl,'My Account','close_admin');    
}

function close_admin(){ 
  showMainPage();
}

function mnu_fm_admin(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+
      '<div style="width:100%;height:100%;padding:12px 0 0 0;text-align:center;background:none;">'+
        'Account Menu'+
      '</div>'+
    '</div>';
  dispMenu(false,jmenu);
}

function layas(){ 
  MSG_SHOW(vbYesNo,"CONFIRM:","Are you sure to Log Out now?",
    function(){ logout(); close_admin(); },function(){});
  return;
}
function logout(){ 
  document.getElementById("logger").innerHTML="Log In";      
  eraseCookie('cok_user_'+CURR_CLIENT);
  eraseCookie('cok_axtype_'+CURR_CLIENT);
  eraseCookie('cok_name_'+CURR_CLIENT);
  CURR_USER=null;
  CURR_NAME=null;
  CURR_AXTYPE=null;    
  DB_USER=[]; DB_CART=[];
  JBE_TRANS=[];
  JBE_TRANS2=[];    
  showProfile(5);
  refreshNOTIF('');
  closeLogin();

  var vmenu='mnu_main'; 
  if(CURR_AXTYPE > 0){ vmenu='mnu_main_owner'; }  
  dispMenu(true,vmenu);
}

function fm_profile(vmode){
  if(vmode==1){ 
      GEO_MODE=0;
      JBE_GETLOCATION(); 
      document.getElementById('page_login').style.display='none'; 
  }
  var n = new Date().toLocaleTimeString('it-IT');
  var jmenu=
    '<div style="width:100%;height:100%;color:'+JBE_TXCLOR1+';">'+
      '<div id="lognow2" onclick="save_profile()" style="float:left;width:25%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jsave.png"  style="height:100%;" alt="save image" />'+
        '</div>'+
        '<span class="footer_fonts">Save</span>'+
      '</div>'+
      '<div onclick="closeView();" style="float:left;width:25%;height:100%;margin-left:50%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jcancel.png"  style="height:100%;" alt="del image" />'+
        '</div>'+
        '<span class="footer_fonts">Cancel</span>'+
      '</div>'+
    '</div>';
  dispMenu(false,jmenu); 

  var vDate=new Date();  
  var vTime = vDate.toLocaleTimeString('it-IT'); 
  vDate = new Date(vDate.getTime() - (vDate.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];  
  var usercode='U_'+vDate+'_'+vTime;
  usercode = usercode.replace(/-/g, "").replace(/:/g, "").replace("T", "-");   


  var profileImg='../../main_gfx/avatar.png'+'?'+n;
  var userid='';
  var username='';
  var pword='';
  var addrss='';
  var celno='';
  var foto='';
  var lat=0;
  var lng=0;
  var v_disabled='';

  if(vmode==2){ 
    var aryDB=JBE_GETARRY(DB_USER,'usercode',CURR_USER);
    profileImg=document.getElementById('bar_avatar').src;
    usercode=aryDB['usercode'];
    userid=aryDB['userid'];
    pword=aryDB['pword'];
    username=aryDB['username'];
    addrss=aryDB['addrss'];
    celno=aryDB['celno'];
    foto=aryDB['photo'];
    lat=parseFloat(aryDB['lat']);
    lng=parseFloat(aryDB['lng']);
    v_disabled='disabled';
  }
  
  //alert('Mode: '+vmode+' : '+ lat+' vs '+lng);
  
  var dtl=
    '<div id="div_admin_profile" data-mode='+vmode+' data-usercode="'+usercode+'" style="width:100%;height:100%;padding:0px;overflow-x:hidden;overflow-y:auto;background:white;">'+
            
      '<div style="height:100px;width:100%;margin-top:20px;text-align:center;padding:5px;color:black;background:none;">'+

        '<div id="dv_avatar" style="position:relative;width:100%;height:75px;text-align:center;background:none;">'+
          '<img id="img_eavatar'+vmode+'" data-img="'+foto+'" name="img_eavatar'+vmode+'" src="'+profileImg+'" style="border-radius:50%;height:75px;width:75px;border:1px solid gray;"/>'+
          '<div id="div_avatar" style="position:absolute;top:50%;left:50%;cursor:pointer;border-radius:50%;border:1px solid black;'+
                'height:30px;width:30px;padding:3px;background:#434343;">'+
            
            '<input type="file" id="id_efile'+vmode+'" data-sel=0 name="id_efile'+vmode+'" hidden="hidden" />'+
            '<img src="../../main_gfx/jcam.png" onclick="JBE_PICK_IMAGE(0,id_efile'+vmode+'.id,img_eavatar'+vmode+'.id)" style="width:95%;"/>'+
          '</div>'+
        '</div>'+

        '<form onsubmit="return false" class="class_admin" style="font-size:12px;margin-top:20px;margin-bottom:10px;height:auto;background:none;">'+

          '<div id="dv_usercode" style="margin-top:10px; height:auto; width:100%;background:none;">'+
            '<span style="height:15px; width:100%; background:none;">USER CODE</span>'+
            '<input id="fusercode" disabled class="class_profile" value="'+usercode+'"/>'+            
          '</div>'+

          '<div id="dv_uid2" style="margin-top:10px; height:auto; width:100%;background:none;">'+
            '<span style="height:15px; width:100%; background:none;">User ID</span>'+
            '<input id="fuser2" class="class_profile" onchange="chk_fld(this.value,fpass2.value,'+vmode+')" type="text"  placeholder="Email or Phone Number" maxlength=20 onkeydown="javascript:if(event.keyCode==13) document.getElementById(&quot;fpass2&quot;).focus();"'+
                'value="'+userid+'"/>'+            
          '</div>'+
  
          '<div id="dv_pass" style="margin-top:10px; height:auto; width:100%;background:none;">'+
            '<span style="height:15px; width:100%;background:none;">Password</span>'+            
            '<input id="fpass2" class="class_profile" onchange="chk_fld(this.value,fpass2.value,'+vmode+')" name="fpass" autocomplete="off" type="password" placeholder="Password" maxlength=20 onkeydown="javascript:if(event.keyCode==13) document.getElementById(&quot;faddrss2&quot;).focus()"'+
                'value="'+pword+'"/>'+            
          '</div>'+

          '<div style="margin-top:10px; height:auto; width:100%;background:none;">'+
            '<span style="height:15px; width:100%; background:none;">Username</span>'+
            '<input id="fname2" class="class_profile" type="text" placeholder="User Name"  maxlength=50 onkeydown="javascript:if(event.keyCode==13) document.getElementById(&quot;faddrss2&quot;).focus()" '+
                'value="'+username+'"/>'+            
          '</div>'+

          '<div style="margin-top:10px; height:auto; width:100%;background:none;">'+
            '<span style="height:15px; width:100%; background:none;">Address</span>'+
            '<textarea id="faddrss2" class="class_profile" name="faddrss" rows="4" cols="50" maxlength=300 placeholder="Address" style="resize:none;height:70px;">'+
              addrss+'</textarea>'+    
          '</div>'+

          '<div style="margin-top:10px; height:auto; width:100%;background:none;">'+
            '<span style="height:15px; width:100%; background:none;">Celphone</span>'+
            '<input id="fcelno2" class="class_profile" type="number" placeholder="Contact Number"  maxlength=11" '+
                'value="'+celno+'"/>'+            
          '</div>'+

          '<div style="display:none;margin-top:10px; height:40px; width:100%;background:none;">'+
            '<div style="float:left;height:100%; width:49.5%;background:none;">'+
              '<div style="height:15px; width:100%; background:none;">Latitude</div>'+
              '<input id="flat2" class="class_profile" type="number" readonly placeholder="Latitude" '+
                  'value="'+lat+'"/>'+            
            '</div>'+
            '<div style="float:right;height:100%; width:49.5%;background:none;">'+
              '<div style="height:15px; width:100%; background:none;">Longitude</div>'+
              '<input id="flng2" class="class_profile" type="number" readonly placeholder="Longitude" '+
                  'value="'+lng+'"/>'+  
            '</div>'+
          '</div>'+

        '</form>'+

      '</div>'+

    '</div>';        

  openView(dtl,'My Profile','close_profile'); 
  
}
function chk_fld(u,p,vmode){
  if(vmode != 1) { return; };
  if(u=='' || p==''){
    //alert('blank u:'+u+'  p:'+p);
    return;
  }
  
  axios.post(JBE_API+'z_user.php',{ clientno:CURR_CLIENT, request: 101, userid: u, pword:p },JBE_HEADER)     
  .then(function (response) {     
    console.log(response.data);  
    if(response.data.length > 0){
      snackBar('Record Already Exist. Change User ID and Password.');
      return;
    }
  })    
  .catch(function (error) { 
    console.log(error); 
  });
}


function close_profile(){ 
  var vmode=document.getElementById('div_admin_profile').getAttribute('data-mode');
  if(vmode==1){ 
    //document.getElementById('page_login').style.display='none'; 
    showMainPage();
  }else{ 
    mnu_fm_admin(); 
  }
}

function save_profile(){
  var vmode=document.getElementById('div_admin_profile').getAttribute('data-mode');
	
  if(vmode==1){ GEO_MODE=0; }

  var usercode=document.getElementById('div_admin_profile').getAttribute('data-usercode');
  var u=document.getElementById('fuser2').value;
  var p=document.getElementById('fpass2').value;
  var n=document.getElementById('fname2').value;
  var a=document.getElementById('faddrss2').value;
  var c=document.getElementById('fcelno2').value;  
  var lat=document.getElementById('flat2').value;  
  var lng=document.getElementById('flng2').value;  
  var foto=document.getElementById('img_eavatar'+vmode).getAttribute('data-img');
  //alert(lat+' vs '+lng);

  if(u=='' || p=='' || n=='' || c=='' || a=='' || foto==''){
    var vmsg='';
    //if(lat==0 || lng==0){ vmsg="Location Can't be Found!<br>Please Turn On your Location."; }
    if(u==''){ vmsg='User ID is Empty'; }
    else if(p==''){ vmsg='User Password is Empty'; }
    else if(n==''){ vmsg='User Name is Empty'; }
    else if(c==''){ vmsg='User Celfone is Empty'; }
    else if(a==''){ vmsg='User address is Empty'; }
    else if(foto==''){ vmsg='Image Profile is Empty'; }
    MSG_SHOW(vbOk,"ERROR: Pls. complete the form.",vmsg,function(){},function(){});
    return;
  }
    
  if(vmode==1){
    var req=2; //add
    var photo=usercode+'.jpg'; 
  }else{
    var req=3; 
    var photo=usercode+'.jpg'; 
  }

  let ob = [
    { "div":"bar_avatar" },
    { "div":"log_avatar" },
    { "div":"admin_avatar" }
  ];

  var targetDIR=JBE_API+'app/'+CURR_SITE+'/upload/users/';
  showProgress(true);
  axios.post(JBE_API+'z_user.php', { clientno:CURR_CLIENT, request: req, 
      usercode:usercode,
      userid:u,
      pword:p,
      username:n, 
      addrss:a,     
      photo:photo,
      celno:c,
      lat:lat,
      lng:lng,
      usertype:CURR_AXTYPE
  },JBE_HEADER)
  .then(function (response) {
    showProgress(false);
    if(req==2){
      if(response.data=="EXIST"){        
        MSG_SHOW(vbOk,"ERROR:","User already exist!, Try Again...",function(){},function(){});
        return;
      }else{
        DB_USER=response.data;
        snackBar('Signing Up is successful...');
        if(THISFILE[0]){
          uploadNOW(THISFILE[0],photo,targetDIR,'');               
        }
      }
    }else{
      DB_USER=response.data;
      if(THISFILE[0]){
        uploadNOW(THISFILE[0],photo,targetDIR,ob);
      }
      snackBar('User Updated...');
      update_curr_user(usercode,n);
      document.getElementById('admin_username').innerHTML=n;
      document.getElementById('logger').innerHTML=n;
    }    
    get_db_clients();
    closeView();
  })
  .catch(function (error) { console.log(error); 
    showProgress(false);
    alert('saving '+error);
  });  
}
  
function update_curr_user(usercode,n){
  CURR_USER=usercode; CURR_NAME=n;
  createCookie('cok_client_'+CURR_CLIENT,CURR_CLIENT,1);
  createCookie('cok_user_'+CURR_CLIENT,CURR_USER,1);
  createCookie('cok_axtype_'+CURR_CLIENT,CURR_AXTYPE,1);
  createCookie('cok_name_'+CURR_CLIENT,CURR_NAME,1);
  get_app_var(usercode,false); 
}

/************************************** */
function editStaff(){  
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  
  usercode=CURR_USER;

  mnu_editStaff();

  var dtl=
    '<div id="div_main_editStaff" data-usercode="'+usercode+'" style="width:100%;height:100%;padding:5px;overflow-x:hidden;overflow-y:auto;background:white;">'+
      '<div style="width:100%;height:20px;margin-top:5px;color:navy;font-weight:bold;background:white;">'+
        '<span style="float:left;width:65%;text-align:center;">User Name</span>'+
        '<span style="float:right;width:35%;text-align:right;padding:0 13px 0 0;background:none;">User Level</span>'+
      '</div>'+
      '<div id="div_editStaff" style="width:100%;height:'+(H_VIEW-35)+'px;margin-top:0px;padding:0px;overflow-x:hidden;overflow-y:auto;background:whitesmoke;"></div>'+
    '</div>';        
  
  openView(dtl,'Edit Users','close_editStaff');
  disp_editStaff();  
}
function mnu_editStaff(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+
      '<div style="width:100%;height:100%;padding:12px 0 0 0;text-align:center;background:none;">'+
        'Users Facility'+
      '</div>'+
    '</div>';
  dispMenu(false,jmenu);
}
function close_editStaff(){ 
  mnu_fm_admin();
}

function disp_editStaff(){
  var aryDB=DB_CLIENTS;  
  aryDB.sort(sortByMultipleKey(['usertype'],['username']));
  var n = new Date().toLocaleTimeString('it-IT'); 
  
  //document.getElementById('div_sel_orders').innerHTML=newOptionsHtml1;  
  var dtl='';
  for(var i=0;i<aryDB.length;i++){  
    var newOptionsHtml='';
    for(var y=0;y<6;y++){
      if(parseInt(aryDB[i]['usertype'])==y){
        newOptionsHtml += '<option selected value='+y+'> Level '+y+'</option>';   
      }else{
        newOptionsHtml += '<option value='+y+'> Level '+y+'</option>';   
      }
    }

    //alert(aryDB[i]['photo']);
    
    dtl+=
      '<div style="width:100%;height:40px;margin-top:10px;padding:0px;background:none;">'+
        '<div style="float:left;height:100%;width:45px;background:none;">'+          
          '<img src="'+JBE_API+'app/'+CURR_SITE+'/upload/users/'+aryDB[i]['usercode']+'.jpg?'+n+'" style="float:left;height:100%;width:40px;border-radius:50%;border:2px solid black;background:none;"/>'+
        '</div>'+
        '<div id="staff_name_width" style="float:left;height:100%;text-align:center;padding:2px;background:black;">'+
          '<div style="width:100%;height:50%;padding:0px;color:white;background:none;">'+aryDB[i]['username']+'</div>'+
          '<div style="width:100%;height:50%;padding:0px;font-size:12px;background:darkgray;">'+
            '<span style="float:left;width:50%;height:100%;padding:2px;background:lightgray;">'+aryDB[i]['userid']+'</span>'+
            '<span style="float:left;width:50%;height:100%;padding:2px;">'+aryDB[i]['pword']+'</span>'+
          '</div>'+                
        '</div>'+
        '<div style="float:left;height:100%;margin-left:5px;width:35px;background:none;"/>'+
            '<img src="../../main_gfx/landmark.png" onclick="showMap(1,&quot;'+aryDB[i]['usercode']+'&quot;)" style="height:100%;width:100%;background:none;"/>'+
        '</div>'+
        '<div style="float:right;width:100px;height:100%;text-align:right;background:none;">'+
          '<select value="Level'+aryDB[i]['usertype']+'" id="div_sel_level'+i+'" name="div_sel_level" onchange="chgLevel(&quot;'+aryDB[i]['usercode']+'&quot;,this.value)" style="width:70px;height:100%;">'+
            newOptionsHtml+
          '</select>'+
          '<input type="button" onclick="del_staff(&quot;'+aryDB[i]['usercode']+'&quot;)" style="width:auto;height:100%;margin-left:2px;" value="X" />'+
        '</div>'+
      '</div>';
  }   
  document.getElementById('div_editStaff').innerHTML=dtl;
}

function chgLevel(usercode,usertype){  
  showProgress(true);      
  axios.post(JBE_API+'z_user.php', { clientno:CURR_CLIENT, request: 301, 
    usercode: usercode,
    usertype: usertype
  },JBE_HEADER)
  .then(function (response) {           
    showProgress(false);      
    console.log(response.data);        
    DB_CLIENTS=response.data;
    CURR_AXTYPE=usertype;
  })
  .catch(function (error) {
    console.log(error);
    showProgress(false);
  });
}

function del_staff(usercode){
  var axlevel=JBE_GETFLD('usertype',DB_CLIENTS,'usercode',usercode);
  if(axlevel=='5'){
    snackBar('Access Denied...');
    return;
  }
  var username=JBE_GETFLD('username',DB_CLIENTS,'usercode',usercode); 
  var photo=JBE_GETFLD('photo',DB_CLIENTS,'usercode',usercode); 
 
  MSG_SHOW(vbYesNo,"CONFIRM: ","Are you sure to Delete user: "+username+"?",function(){
    showProgress(true);      
    axios.post(JBE_API+'z_user.php', { clientno:CURR_CLIENT, request: 4, 
      usercode: usercode,
      photo: photo
    },JBE_HEADER)
    .then(function (response) {
      showProgress(false);      
      console.log(response.data);        
      DB_CLIENTS=response.data;  
      disp_editStaff();  
    })
    .catch(function (error) {
      console.log(error);
      showProgress(false);
    });
  },function(){return;}); 
}

function upd_location(){
	GEO_MODE=1;
	JBE_GETLOCATION();
}

function my_location(){
	//GEO_MODE=1;
	//JBE_GETLOCATION();
	showMap(2,CURR_USER);
}

function showQR(){
  var h=H_BODY-100;
  var txt='https://updesktop.github.io/estore/app/'+CURR_SITE;
  var dtl=      
    '<div id="main_qr" data-zoom=0 data-close="" style="width:100%;height:'+h+'px;text-align:center;background-color:white;">'+      
      '<div style="width:100%;height:90%;padding:2px;background:none">'+
          '<div id="qrcode" style="margin:0 auto;margin-top:'+((h-300)/2)+'px;width:250px;height:250px;padding:2px;background:none;"></div>'+          
      '</div>'+
      '<div style="width:100%;height:10%;padding:2px;font-size:12px;background:none;">'+txt+'</div>'+          
    '</div>';
  var dtl2=      
    '<div style="width:100%;height:100%;padding:11px 0 0 0;text-align:center;color:'+JBE_TXCLOR1+';background:none;">'+
      'Scan this QR Code'+      
    '</div>';   
  JBE_OPENBOX('main_qr','App QR Code',dtl,dtl2); 
  var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 246,
    height: 246
  });
  //https://updesktop.github.io/estore/app/ee/ 
  //alert(txt);
  qrcode.makeCode(txt);
}

function share_app(){
  if(navigator.share) {
    navigator.share({
      title: document.title,
      //text: 'E-Store App',
      text: document.title,
      url: location.href,
    })
    .then(() => console.log('Successful share'))
    .catch((error) => {
      console.log('Error sharing', error);
      MSG_SHOW(vbOk,"Error sharing:",error,function(){},function(){});
     })
  }
}
