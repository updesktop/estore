function show_notif_bell(v){
  if(!CURR_USER){
    snackBar("Please Log In");
    return;
  }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  
  var dtl='<div id="div_ain_order" style="width:100%;height:100%;padding:2px;overflow-x:hidden;overflow-y:auto;background:none;">'+
            '<div id="div_dtl_bell" style="width:100%;height:100%;overflow-x:hidden;overflow-y:auto;background:white;"></div>'+
          '</div>';        

  openView(dtl,'Notifications','close_notifBell');
  disp_bell(v);
  
  if(!JBE_ONLINE){
    //showMenu('mnu_offline');
    mnu_offline();
  }
}

function close_notifBell(){ 
  showMainPage();
}

function disp_bell(v){   
  //alert(v);
  //snackBar('Client: '+c+' | selected: '+v);
  var aryDB=DB_BELL;  
  aryDB.sort(sortByMultipleKey(['*trano']));
  
  var dtl='';
  for(var i=0;i<aryDB.length;i++){          
    //if(v != 0){        
      //if(parseInt(aryDB[i]['unread']) == v) { continue; }
    //}
    var v_trano=aryDB[i]['trano']; 
    var v_usercode=aryDB[i]['usercode']; 
    var v_username=JBE_GETFLD('username',DB_CLIENTS,'usercode',v_usercode);
        
    var v_msg=aryDB[i]['msg'];
    var v_clickButton='<input type="button" onclick="markBellAsRead(&quot;'+v_trano+'&quot;,&quot;'+v_usercode+'&quot;)" style="float:right;width:auto;height:100%;font-size:11px;color:black;background:lightgray;" value="Mark As Read" />';
    if(aryDB[i]['unread']=='1') { 
      v_clickButton='<input type="button" onclick="delNotif(&quot;'+v_trano+'&quot;,&quot;'+v_usercode+'&quot;)" style="float:right;width:auto;height:100%;font-size:11px;color:black;background:lightgray;" value="Remove" />';
    }
    
    dtl=dtl+              
      '<div style="margin-top:5px;border:none;border-top: 2px dotted red;"></div>'+   

      '<div style="height:50px;width:98%;margin-top:5px;margin:1%;padding:5px;font-size:14px;font-weight:bold;background:none;padding:1px;">'+
        
        '<div style="width:100%;height:100%;background:none;">'+

          '<div style="height:40%;width:100%;background:none;">'+
            '<div style="float:left;width:70%;height:100%;overflow-y:hidden;overflow-x:auto;background:none;">Hello! '+v_username+'</div>'+
            '<div style="float:right;width:30%;height:100%;background:none;">'+
              v_clickButton+
            '</div>'+
          '</div>'+

          '<div style="height:60%;width:100%;font-size:10px;font-weight:bold;background:none;">'+v_msg+'</div>'+
        '</div>'+
      
      '</div>';
    dtl=dtl+ret_items_order(v_trano);
    
  }   
  dtl=dtl+'<div style="margin-top:5px;border:none;border-top: 2px dotted red;"></div>';
  document.getElementById('div_dtl_bell').innerHTML=dtl;     
}

function markBellAsRead(trano,usercode){
  showProgress(true);      
  axios.post(JBE_API+'z_notif.php', { clientno: CURR_CLIENT, request: 301, 
    trano: trano,
    usercode: usercode
  },JBE_HEADER)
  .then(function (response) {       
    showProgress(false);      
    console.log(response.data);
    DB_BELL=response.data;
    disp_bell(1);
  })
  .catch(function (error) {
    console.log(error);
    showProgress(false);
  });
}

function delNotif(trano,usercode){
  showProgress(true);      
  axios.post(JBE_API+'z_notif.php', { clientno: CURR_CLIENT, request: 4, 
    trano: trano,
    usercode: usercode
  },JBE_HEADER)
  .then(function (response) {       
    showProgress(false);      
    console.log(response.data);
    DB_BELL=response.data;
    disp_bell(1);
  })
  .catch(function (error) {
    console.log(error);
    showProgress(false);
  });
}