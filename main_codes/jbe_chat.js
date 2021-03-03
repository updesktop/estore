function fm_chat(usercode){
  THISFILE[0]=null;
  if(!JBE_ONLINE){ 
    snackBar('OFFLINE');
    return;
  }
  if(!CURR_USER){
    snackBar("Please Log In");
    return;
  }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  
  if(usercode==''){ usercode=CURR_USER; }

  
  mnu_chat();

  var dtl=
    '<div id="div_main_chat" data-usercode="'+usercode+'" style="width:100%;height:100%;overflow-x:hidden;overflow-y:auto;background:white;">'+
      '<div id="div_chat" style="width:100%;height:100%;overflow-x:hidden;overflow-y:auto;background:white;"></div>'+
    '</div>';        
  
  openView(dtl,'Chat Box','close_div_chat');

  document.getElementById('txtMsg').value='';
  getChats();  

  //showMenu('mnu_chat');
    
  if(!JBE_ONLINE){
    //showMenu('mnu_offline');
    return;
  }  
}

function close_div_chat(){ 
  markAsRead();    
  if(CURR_AXTYPE > 0){
    disp_chat_owner();    
  }else{
    showMainPage();
  }
}

function markAsRead(){
  var usercode=document.getElementById('div_main_chat').getAttribute('data-usercode');  
  //alert(CURR_USER+' vs '+usercode);
  var sender=1;
  if(CURR_AXTYPE > 0){ sender=0; }
  //showProgress(true);        
  axios.post(JBE_API+'z_chat.php', { clientno:CURR_CLIENT, request: 5, usercode: usercode, sender:sender },JBE_HEADER)
  .then(function (response) {       
    //showProgress(false);      
    console.log(response.data);
    DB_CHAT=response.data;    
    refreshNOTIF('');
  })
  .catch(function (error) {
    console.log(error);
    //showProgress(false);
  });
}

function sendMsg(){
  var usercode=document.getElementById('div_main_chat').getAttribute('data-usercode');  
  var v_sender=0; var v_admin='';  
  if(CURR_AXTYPE>0){ v_sender=1; v_admin=CURR_USER; }
  
  var msg=document.getElementById('txtMsg').value;
  
  var newName='';
  var vDate=new Date();  
  var vTime = vDate.toLocaleTimeString('it-IT');  

  var trano='JBE_'+new Date().getTime();
  vDate = new Date(vDate.getTime() - (vDate.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];

  var targetDIR=JBE_API+'app/'+CURR_SITE+'/upload/chat/';
  
  if(THISFILE[0]){      
    newName = trano + '.jpg';
    document.getElementById('pre_img').src='gfx/jimage.png';   
  }  
  
  if(msg != '' || newName != ''){    
    showProgress(true);
    axios.post(JBE_API+'z_chat.php', { clientno:CURR_CLIENT, request: 2,
      usercode: usercode,
      admin: v_admin,
      trano: trano,
      trantype: 0,
      photo: newName,
      sender: v_sender,
      trandate: vDate,
      trantime: vTime,
      msg: msg
    },JBE_HEADER)
    .then(function (response) {   
      showProgress(false);      
      console.log(response.data);
      //alert('send Msg: '+response.data);
      DB_CHAT=response.data;
      dispChatDtl();
      document.getElementById('txtMsg').value='';
      document.getElementById('pre_img').src='../../main_gfx/jimage.png';

      if(THISFILE[0]){ 
        let ob = [
          { "div":trano }
        ];
        uploadNOW(THISFILE[0],newName,targetDIR,ob); 
      }  
      
      newName='';
      THISFILE[0]='';
    })
    .catch(function (error) {
      console.log(error);
      showProgress(false);
    });
  }else{
    snackBar('Fill all fields.');
  } 
}

function getChats(){  
  var usercode=document.getElementById('div_main_chat').getAttribute('data-usercode');
  DB_CHAT=[];  
  showProgress(true);    
  axios.post(JBE_API+'z_chat.php', { clientno:CURR_CLIENT, request: 1, usercode: usercode }) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);
    //alert('getchats '+response.data);
    DB_CHAT = response.data;    
    dispChatDtl();
  },JBE_HEADER)    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function dispChatDtl(){ 
  if(CURR_AXTYPE > 0) { f_owner=true; }

  var aryChat=DB_CHAT;
  aryChat.sort(sortByMultipleKey(['id']));  
  //aryChat.sort(sortByMultipleKey(['id']));  
     
  var dtl='<div style="width:100%;height:auto;padding:5px;background-color:none;">';
  document.getElementById('div_chat').innerHTML=dtl;
  for(var i=0;i<aryChat.length;i++){    
    if(aryChat[i]['clientno'] != CURR_CLIENT) { continue; }
    var n = new Date().toLocaleTimeString('it-IT'); 
    var v_usercode=aryChat[i]['usercode'];
    var v_msg=aryChat[i]['msg'];
    var v_img='';
    var v_dispImg='none';
    if(aryChat[i]['photo'] != ''){    
      v_img=JBE_API+'app/'+CURR_SITE+'/upload/chat/'+aryChat[i]['photo']+'?'+n;
      //v_img='upload/chat/'+aryChat[i]['photo']+'?'+n;
      v_img_h=50;      
      v_dispImg='block';
    }
    var v_trano=aryChat[i]['trano'];
    var v_sender=parseInt(aryChat[i]['sender']);
    var v_admin=aryChat[i]['admin'];
    var v_unread=parseInt(aryChat[i]['unread']);    
    var v_date=aryChat[i]['trandate'];
    var v_time=aryChat[i]['trantime'];
    //var v_userImg=JBE_GETFLD('photo',DB_CLIENTS,'usercode',v_usercode);  
    if(v_admin!=''){ v_admin=v_admin+'.jpg'; }
    var v_userImg=JBE_API+'app/'+CURR_SITE+'/upload/users/'+JBE_GETFLD('photo',DB_CLIENTS,'usercode',v_usercode)+'?'+n;
    if(CURR_AXTYPE>0){ 
      if(v_sender==1){      
        v_userImg=JBE_API+'app/'+CURR_SITE+'/upload/users/'+v_admin+'?'+n;
      }
    }else{
      var vdispDel='none'; 
      if(v_sender==1){      
        v_userImg=JBE_API+'app/'+CURR_SITE+'/upload/users/'+v_admin+'?'+n;
      }
    }
    
    var v_username=JBE_GETFLD('username',DB_CLIENTS,'usercode',v_usercode);
    dtl+=ret_chatDtl(v_sender,v_trano,v_username,v_userImg,v_msg,v_img,v_date,v_time,v_admin);
  }
  dtl+='</div>';

  var eldiv = document.getElementById("div_chat");
  eldiv.innerHTML=dtl;  
  eldiv.scrollTop = eldiv.scrollHeight;
}

function ret_chatDtl(v_sender,v_trano,v_username,v_userImg,v_msg,v_img,v_date,v_time,v_admin){  
  //alert(JBE_API+' 333 '+v_userImg);
  var n = new Date().toLocaleTimeString('it-IT'); 
  var v_kulay='black';
  var v_dispImg='block';
  var h_img=50;
  if(v_img==''){ 
    v_dispImg='none'; 
    h_img=0;
  }
//alert(v_userImg);
  //v_userImg='upload/users/'+v_userImg;
  //v_userImg=JBE_API+'app/'+CURR_SITE+'/upload/chat/users/'+v_userImg+'?'+n;
  //alert(v_userImg);
  if(CURR_AXTYPE>0){ 
    var vdispDel='block'; 
    if(v_sender==0){      
      var direksyon='left';
      var v_dispUserImg='block';      
      var v_bg='lightgray';
    }else{      
      //v_userImg='upload/users/'+v_admin+'.jpg';
      //v_userImg=JBE_API+'app/'+CURR_SITE+'/upload/chat/'+aryChat[i]['photo']+'?'+n;
      v_username=JBE_GETFLD('username',DB_CLIENTS,'usercode',v_admin);
      var direksyon='right';
      var v_dispUserImg='block'; 
      var v_bg='darkgray';      
    }
  }else{
    var vdispDel='none'; 
    if(v_sender==1){      
      //v_userImg='upload/users/'+v_admin+'.jpg';
      v_username=JBE_GETFLD('username',DB_CLIENTS,'usercode',v_admin);
      var direksyon='left';
      var v_dispUserImg='block';      
      var v_bg='lightgray';
    }else{
      var direksyon='right';
      var v_dispUserImg='none'; 
      var v_bg='darkgray';      
    }
  }

  var div_direksyon='float:'+direksyon+';margin-left:5px;';

  var dtl = 
    '<div style="width:100%;height:auto;text-align:'+direksyon+';background-color:none;">'+
      
      '<div style="float:'+direksyon+';width:100%;height:auto;margin-top:10px;background:none;">'+
        '<div style="display:'+v_dispUserImg+';width:100%;height:30px;">'+
          '<img src="'+v_userImg+'" style="float:'+direksyon+';height:30px;width:30px;border-radius:50%;border:1px solid gray;background:none;"/>'+
          '<div style="float:'+direksyon+';margin-left:5px;margin-right:5px;height:30px;width:auto;padding:10px 0 0 0;color:black;background:none;"/>'+v_username+'</div>'+
        '</div>'+
      '</div>'+
      
      '<div style='+div_direksyon+';width:70%;height:auto;margin-top:2px;border-radius:6px;padding:0.5%;background-color:'+v_bg+';">'+  
        '<div id="chatdel_'+v_trano+'"  title="Delete this chat" style="display:'+vdispDel+';width:100%;height:20px;text-align:center;font-size:14px;cursor:pointer;background-color:none;color:white;">'+
          '<span onclick="delChat(&quot;'+v_trano+'&quot;)" style="float:right;width:15px;border-radius:5px;background:red;">X</span>'+
        '</div>'+
        '<div style="float:'+direksyon+';width:100%;height:auto;font-size:16px;border-radius:5px;padding:1%;background-color:none;">'+
          '<div style="height:'+h_img+'px;">'+
            '<img id="'+v_trano+'" src="'+v_img+'" style="float:'+direksyon+';display:'+v_dispImg+';width:auto;height:auto;max-width:100%;max-height:100%;border-radius:5px;" onclick="JBE_ZOOM(&quot;'+v_img+'&quot;,&quot;&quot;)" />'+
          '</div>'+
          '<div style="height:auto;width:100%;font-size:12px;color:black;background:none;">'+
            v_msg+
          '</div>'+
        '</div>'+ 
      '</div>'+

      '<div style='+div_direksyon+';width:70%;height:auto;font-size:11px;background-color:none;">Date:'+v_date+'&nbsp;&nbsp;&nbsp;&nbsp;Time:'+v_time+'</div>'+
    '</div>';
  return dtl;
}

function delChat(v_trano){  
  var usercode=document.getElementById('div_main_chat').getAttribute('data-usercode');
  var f_owner=false;
  var ddir='app/'+CURR_SITE+'/upload/chat/';
  //alert(v_trano);
  //alert(ddir);
  if(CURR_AXTYPE > 0){ f_owner=true; }
  
  MSG_SHOW(vbYesNo,"CONFIRM:","Are you sure to Delete this Item?",
    function(){   
      showProgress(true);    
      axios.post(JBE_API+'z_chat.php', { clientno:CURR_CLIENT, request: 4,
        trano: v_trano,
        usercode: usercode,
        f_owner:f_owner,
        ddir:ddir        
      },JBE_HEADER)
      .then(function (response) {
        showProgress(false);
        console.log(response.data);
        DB_CHAT=response.data;
        //alert(DB_CHAT);
        getChats();
      })
      .catch(function (error) {
        console.log(error); showProgress(false);
      });
    },
    function(){
      return;
    }
  ); 
}

function mnu_chat(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+

      '<div onclick="getChats()" style="float:left;width:22%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jrefresh.png"  style="height:100%;" alt="Refresh image" />'+
        '</div>'+
        '<span class="footer_fonts">Refresh</span>'+      
      '</div>'+
  
      '<div onclick="sendMsg()" style="float:right;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jsend.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">Send</span>'+        
      '</div>'+

      '<div style="float:right;width:58%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+    
        '<input id="txtMsg" type="text" value="" style="display:block;float:right;height:100%;width:75%;margin-left:1%;" />'+
        '<input type="file" id="up_img" name="up_img" hidden="hidden" />'+
        '<div id="custom-img" style="display:block;float:right;cursor:pointer;height:100%;width:auto;background:white;">'+
          '<img id="pre_img" name="pre_img" data-img="" onclick="JBE_PICK_IMAGE(0,up_img.id,pre_img.id)" src="../../main_gfx/jimage.png" style="height:100%;width:40px;" />'+
        '</div>'+
      '</div>'+
  
    '</div>';
  dispMenu(false,jmenu);
}


/******************************************SHOW CHAT OWNER ROUTINE******************************************** */

function chat_owner(){
  if(!JBE_ONLINE){ 
    snackBar('OFFLINE');
    return;
  }
  if(!CURR_USER){
    snackBar("Please Log In");
    return;
  }

  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;

  var dtl=    
    '<div id="div_chat_owner" data-new=0 data-catno="" data-img="" style="width:100%;height:100%;padding:5px;background:white;">'+      
      '<div style="width:100%;height:20px;margin-top:0px;background:white;">'+
        '<span style="float:left;width:70%;height:100%;background:white;">Username</span>'+
        '<span style="float:right;width:30%;height:100%;text-align:right;background:white;"># Messages</span>'+
      '</div>'+
      '<div id="dtl_chat_owner" style="width:100%;height:'+(H_VIEW-25)+'px;margin-top:0px;background:white;"></div>'+
    '</div>';
 
  openView(dtl,'Select Client','close_chat_owner');
  disp_chat_owner();
}
function close_chat_owner(){ 
  showMainPage();
}
function disp_chat_owner(){  
  mnu_chat_owner();
  showProgress(true);
  axios.post(JBE_API+'z_chat.php', { clientno:CURR_CLIENT, request: 0 }) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);
    DB_CHAT = response.data;    
    dispChatOwner();
  },JBE_HEADER)    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function ret_chats(usercode){    
  var ctr1=0;
  var ctr2=0;
  let aryRET=DB_CHAT;
  //alert('aryRET: '+aryRET.length);
  aryRET.sort(sortByMultipleKey(['usercode']));   
  for(var i=0;i<aryRET.length;i++){
    if(aryRET[i]['usercode'] != usercode) { continue; }
    if(aryRET[i]['sender'] == '1') { continue; }
    if(aryRET[i]['unread'] == '0') { 
      ctr1++;
    }else{
      ctr2++;
    }
    //alert(
    //  'ret_chats : '+usercode+'\n'+
    //  'ctr1 : '+ctr1+'\n'+
    //  'ctr2 : '+ctr2
    //);
  }  
  let ob = {"ctr1":ctr1,"ctr2":ctr2};
  return ob;
}
function dispChatOwner(){
  var aryCtr=0;
  var aryTemp=[]; 
  var aryDB=DB_CLIENTS;
  
  aryDB.sort(sortByMultipleKey(['usercode'])); 
  
  for(var i=0;i<aryDB.length;i++){
    if(aryDB[i]['usertype'] > 0) { continue; }
    var sv_usercode=aryDB[i]['usercode'];
    var sv_username=aryDB[i]['username'];
    
    var ctr0=ret_chats(sv_usercode);

    let ob={"usercode":sv_usercode,"username":sv_username,"ctr1":ctr0.ctr1,"ctr2":ctr0.ctr2};    
    //alert(ob.username+' = '+ob.ctr2);
    aryTemp[aryCtr]=ob;
    aryCtr++;
  }  
  aryDB=aryTemp;
  aryDB.sort(sortByMultipleKey(['*ctr1'],['*ctr2'],['username'])); 

  var dtl='';
  for(var i=0;i<aryDB.length;i++){
    var sv_usercode=aryDB[i]['usercode'];
    var ctr=ret_chats(sv_usercode);

    var v_disp='none';    
    if(ctr.ctr1 > 0){ v_disp='block;' }

    var v_disp2='none';
    if(ctr.ctr2 > 0){ v_disp2='block;' }

    var v_usercode=aryDB[i]['usercode'];
    var v_username=JBE_GETFLD('username',DB_CLIENTS,'usercode',v_usercode);
    dtl+=
      '<div onclick="fm_chat(&quot;'+sv_usercode+'&quot;)" style="width:100%;height:24px;margin-bottom:5px;padding:3px;background:lightgray;">'+
        '<div style="float:left;width:auto;height:100%;">'+v_username+'</div>'+
        '<div style="display:'+v_disp+';float:left;margin-left:10px;width:18px;height:100%;text-align:center;font-size:11px;padding:2px;border-radius:50%;color:'+JBE_TXCLOR4+';background:'+JBE_CLOR4+';">'+ctr.ctr1+'</div>'+
        '<div style="display:'+v_disp2+';float:right;margin-right:5px;width:18px;height:100%;text-align:right">'+ctr.ctr2+'</div>'+
      '</div>';
  }
  document.getElementById('dtl_chat_owner').innerHTML=dtl;
}


function mnu_chat_owner(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+
  
      '<div style="width:100%;height:100%;padding:12px 0 0 0;text-align:center;background:none;">'+
        'Chat Box'+
      '</div>'+
  
    '</div>';
  dispMenu(false,jmenu);
}

