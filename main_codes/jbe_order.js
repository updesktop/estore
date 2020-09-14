function showOrder(vmode){
    //alert(vmode);
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
        '<div id="div_main_order" data-vmode='+vmode+' style="width:100%;height:100%;padding:2px;overflow-x:hidden;overflow-y:auto;background:none;">'+
            '<div id="div_dtl_order" style="width:100%;height:100%;overflow-x:hidden;overflow-y:auto;background:white;"></div>'+
        '</div>';        

  openView(dtl,'Orders','close_showOrder');
  mnu_showorder(vmode);
  
  var vsel='All';
  if(vmode==1){ vsel=CURR_USER; }
  dispOrders(vmode,vsel,-1);
  
  if(!JBE_ONLINE){
    mnu_offline();
  }
}

function mnu_showorder(vmode){
	var vdisabled='';
	var vdisp='block';
	var vselstyle='float:right;width:49.5%';
	if(vmode==1){ 
        vdisabled='disabled'; 
        vdisp='none';
        vselstyle='width:100%';
    }
  var jmenu=
  '<div style="width:100%;height:100%;">'+
    '<div id="ds_client" style="display:'+vdisp+';float:left;width:49.5%;height:100%;">'+
      '<span style="width:100%;height:50%;">Client:</span>'+
      '<select id="div_sel_client" '+vdisabled+' name="div_sel_client" onchange="dispOrders(vmode,this.value,div_sel_orders.value)" style="width:100%;height:50%;">'+
      '</select>'+
    '</div>'+
    '<div style="'+vselstyle+';height:100%;">'+
      '<span style="width:100%;height:50%;">Select:</span>'+
      '<select id="div_sel_orders" name="div_sel_orders" onchange="dispOrders(vmode,div_sel_client.value,this.value)" style="width:100%;height:50%;">'+
      '</select>'+
    '</div>'+
  '</div>';
  dispMenu(false,jmenu);

  var newOptionsHtml0 = "<option value='All'> All </option>";
  var aryClient = DB_CLIENTS;  
  
  for(i=0;i<aryClient.length;i++){   
    if(aryClient[i]['usertype']>0) { continue; }
    var v_mcode=aryClient[i]['usercode'];
    var v_mname=aryClient[i]['username'];    
    newOptionsHtml0=newOptionsHtml0+"<option value='"+v_mcode+"'>"+v_mname+"</option>";   
  }  
  document.getElementById('div_sel_client').innerHTML=newOptionsHtml0;  

  var newOptionsHtml1 = '<option value=-1>All</option>'+
                        '<option value=0>Placed Orders</option>'+
                        '<option value=1>Prepared</option>'+
                        '<option value=2>Delivered / In transit</option>'+
                        '<option value=3>Received</option>'+
                        '<option value=4>Cancelled</option>';
  document.getElementById('div_sel_orders').innerHTML=newOptionsHtml1;  
}

function close_showOrder(){ 
  showMainPage();
}

function dispOrders(vmode,c,v){
  //alert('dispOrders Client: '+c+' | selected: '+v);
  var vmode=document.getElementById('div_main_order').getAttribute('data-vmode');
  var aryDB=DB_ORDER;  
  aryDB.sort(sortByMultipleKey(['*trano']));
  var n = new Date().toLocaleTimeString('it-IT'); 
  var sv_trano='';
  var dtl='';
  var aryClor=['lightgray','lightblue','yellowgreen','coral','black'];
  var aryStat=['Placed','Prepared','Delivered','Received','Cancelled'];
  var vdisp='block';
  if(vmode==1){ vdisp='none'; }
  var vdispdrop='none';
  if(CURR_AXTYPE > 1){ vdispdrop='auto'; }
  for(var i=0;i<aryDB.length;i++){  
    if(c != 'All'){
      if(aryDB[i]['usercode'] != c) { continue; }
    }
    if(v != -1){
      if(parseInt(aryDB[i]['stat']) != v) { continue; }
    }
    var v_mtrano=aryDB[i]['trano']; 
    var v_musercode=aryDB[i]['usercode']; 
    var v_musername=JBE_GETFLD('username',DB_CLIENTS,'usercode',v_musercode);
    var v_mphoto=JBE_GETFLD('photo',DB_CLIENTS,'usercode',v_musercode);
    var v_mcode=aryDB[i]['stockno'];    
    var v_lat=parseFloat(JBE_GETFLD('lat',DB_CLIENTS,'usercode',v_musercode));
    var v_lng=parseFloat(JBE_GETFLD('lng',DB_CLIENTS,'usercode',v_musercode));
    var v_charge=formatNumber2(aryDB[i]['charge']);   
    var v_amount=formatNumber2(aryDB[i]['amount']);     
    var v_total=formatNumber2(aryDB[i]['total']);    
    //var v_mname=JBE_GETFLD('descrp',DB_STOCK,'stockno',v_mcode);  
    //var v_mprice=formatNumber2(aryDB[i]['price']);    
    //var v_mqty=aryDB[i]['qty'];  
    var v_mstat=parseInt(aryDB[i]['stat']);

    //alert(v_mphoto);
    var v_img='../../main_gfx/avatar.png';   
    var v_siteImg='../../main_gfx/landmark.png';   
    if(v_mphoto != ''){    
      //v_img='upload/users/'+v_mphoto+'?'+n; 
      v_img=JBE_API+'app/'+CURR_SITE+'/upload/users/'+v_mphoto+'?'+n;   
    }

    var stat_clor='black';
    if(v_mstat==4){ stat_clor='white'; }
    
    dtl+=
      '<div style="margin-top:5px;border:none;border-top: 2px dotted red;"></div>'+   

      '<div style="height:50px;width:98%;margin-top:5px;margin:1%;padding:5px;font-size:14px;font-weight:bold;background:none;padding:1px;">'+

        '<div style="display:'+vdisp+';float:left;width:15%;height:100%;text-align:right;background:none;">'+
            '<img src="'+v_img+'" style="border:1px solid black;width:40px;height:40px;border-radius:50%;background:pink;" onclick="JBE_ZOOM(&quot;'+v_img+'&quot;,&quot;&quot;)" />'+
        '</div>'+

        '<div style="float:left;width:58%;height:100%;padding:0 0 0 5px;background:none;">'+
            '<div style="display:'+vdisp+';height:70%;width:100%;overflow:auto;background:none;">'+v_musername+'</div>'+
            '<div style="height:30%;width:100%;font-size:12px;font-weight:bold;color:blue;background:none;">Ref #: '+v_mtrano+'</div>'+
        '</div>'+

        '<div style="float:right;width:27%;height:100%;padding:0 0 0 0px;background:none;">'+          
          '<div style="display:'+vdisp+';float:right;margin-left:5%;width:35%;height:100%;background:none;">'+
            '<img src="'+v_siteImg+'" onclick="showMap(0,&quot;'+v_musercode+'&quot;)" style="height:75%;width:30px;" />'+          
          '</div>'+
          '<div  style="pointer-events:'+vdispdrop+';float:right;width:60%;height:100%;text-align:right;background:none;">'+              
            '<div class="dropdown" style="height:70%;width:auto;">'+
              '<input type="button" onclick="myDropMenu('+i+')" class="dropbtn" style="color:'+stat_clor+';background:'+aryClor[v_mstat]+';" value="&#9776;"/>'+                
              '<div id="myDropdown_'+i+'" class="dropdown-content">'+
                  '<a href="javascript:chgItemStat(&quot;'+v_musercode+'&quot;,&quot;'+v_mtrano+'&quot;,0)">Placed</a>'+
                  '<a href="javascript:chgItemStat(&quot;'+v_musercode+'&quot;,&quot;'+v_mtrano+'&quot;,1)">Prepared</a>'+
                  '<a href="javascript:chgItemStat(&quot;'+v_musercode+'&quot;,&quot;'+v_mtrano+'&quot;,2)">Delivered</a>'+
                  '<a href="javascript:chgItemStat(&quot;'+v_musercode+'&quot;,&quot;'+v_mtrano+'&quot;,3)">Received</a>'+
                  '<a href="javascript:chgItemStat(&quot;'+v_musercode+'&quot;,&quot;'+v_mtrano+'&quot;,4)">Cancelled</a>'+
              '</div>'+
            '</div>'+          
            '<div style="height:30%;width:auto;font-size:10px;background:none;">'+aryStat[v_mstat]+'</div>'+
          '</div>'+

        '</div>'+     
      '</div>';

    dtl+=ret_items_order(v_mtrano);
    
    dtl+='<div style="margin-top:0px;margin-bottom:10px;width:100%;height:40px;font-size:16px;padding:1px;background:none;">'+   
                  '<div style="height:50%;width:100%;color:red;font-size:14px;color:black;background:none;">'+                    
                     '<div id="txAmount'+i+'" style="float:right;margin-right:8px;height:100%;width:100px;color:red;font-size:14px;text-align:right;padding:1px 0 0 0;background:none;">'+v_amount+'</div>'+           
                     '<div style="float:right;margin-right:10px;height:100%;width;auto;color:red;font-size:14px;text-align:right;padding:1px 0 0 0;color:black;background:none;">Amount &#8658; </div>'+       
                  '</div>'+
                  '<div style="height:50%;width:100%;color:red;font-size:14px;color:black;background:none;">'+                
                     '<div id="tot'+i+'" style="float:right;height:100%;width:100px;text-align:right;padding:1px 0 0 0;margin-right:8px;font-weight:bold;color:red;background:none;">&#8369; <u>'+v_total+'</u></div>'+       
                     '<div style="float:right;margin-right:10px;height:100%;width:auto;padding:1px 0 0 0;background:none;">&#8658;</div>'+        
                     '<div id="txCharge'+i+'" style="float:right;margin-right:5px;height:100%;width:60px;color:red;font-size:14px;text-align:center;padding:1px 0 0 0;border-radius:5px;border:1px solid black;background:white;">'+v_charge+'</div>'+   
                     '<button onclick="getCharges(&quot;'+v_mtrano+'&quot;,'+i+')" style="display:'+vdisp+';float:right;margin-right:10px;height:100%;width:auto;font-size:13px;color:white;background:red;">Add: </button>'+                            
                  '</div>'+
              '</div>';
  }   

  dtl+='<div style="margin-top:5px;margin-bottom:5px;border:none;border-top: 2px dotted red;"></div>';
  document.getElementById('div_dtl_order').innerHTML=dtl;     
}
function getCharges(trano,i){
	//alert(i);
  var v_charge=document.getElementById('txCharge'+i).innerHTML;
  //alert(v_charge+1);
  var dtl=      
    '<div id="main_charge" style="width:100%;height:100px;text-align:center;background-color:none;">'+      
      '<input id="inpCharge" type="number" style="width:200px;height:40px;margin-top:20px;font-size:20px;text-align:center;" value='+v_charge+' />'+
    '</div>';
  var dtl2=      
    '<div style="width:100%;height:100%;padding:4px;text-align:center;color:'+JBE_TXCLOR1+';background:none;">'+
      '<button onclick="saveCharges(&quot;'+trano+'&quot;,'+i+')" style="width:100px;height:100%;">Save</button>'+      
    '</div>';   
  JBE_OPENBOX('main_charge','Enter Charges',dtl,dtl2); 
}

function saveCharges(trano,i){
	//alert(trano);
	var v_charge=parseFloat(document.getElementById('inpCharge').value);     
	var v_amount=parseFloat(document.getElementById('txAmount'+i).innerHTML);     
	if(!v_charge){ v_charge=0; }
    //alert(v_charge);
	var tot=v_charge+v_amount;
	showProgress(true);  
    axios.post(JBE_API+'z_order.php', { clientno:CURR_CLIENT, request: 32,    
      charge:v_charge,    
      total:tot,    
      trano:trano
    },JBE_HEADER)
    .then(function (response) {     
      //alert(response.data); 
      DB_ORDER=response.data;  
      document.getElementById('txCharge'+i).innerHTML=formatNumber2(v_charge);     
	  document.getElementById('tot'+i).innerHTML=formatNumber2(tot);           
      showProgress(false);         
      JBE_CLOSEBOX();        
    })    
    .catch(function (error) { 
        console.log(error); showProgress(false); 
        JBE_CLOSEBOX();
    });
}

function ret_items_order(trano){
  //  alert('ret_items '+trano);
  var dtl='';
  var aryORDER=DB_ORDER2;
  for(var i=0;i<aryORDER.length;i++){          
    if(aryORDER[i]['trano'] != trano) { continue; }    

    var v_code=aryORDER[i]['stockno'];    
    var v_name=JBE_GETFLD('stockname',DB_STOCK,'stockno',v_code);  
    
    var v_price=formatNumber2(aryORDER[i]['price']);    
    var v_qty=aryORDER[i]['qty'];  
    //var v_photo='upload/'+JBE_GETFLD('photo',DB_STOCK,'stockno',v_code)+'?'+n;   
    var v_photo=JBE_API+'app/'+CURR_SITE+'/upload/'+JBE_GETFLD('photo',DB_STOCK,'stockno',v_code)+'?'+n;   
    dtl+=
      
      '<div style="height:60px;width:98%;border:1px solid lightgray;margin:1%;margin-bottom:0px;padding:5px;background:whitesmoke;">'+                  
      
        '<div style="float:left;position:relative;height:100%;width:25%;border-radius:10px;border:1px solid lightgray;background:none;">'+
          '<div class="class_center_div">'+
            '<img id="cart_img_'+v_code+'" src="'+v_photo+'" onclick="JBE_ZOOM(&quot;'+v_photo+'&quot;,&quot;&quot;)" class="asyncImage" alt="category image" style="height:auto;max-height:100%;width:auto;max-width:100%;background:none;"/>'+        
          '</div>'+
        '</div>'+

        '<div style="float:left;width:73%;height:100%;margin-left:2%;font-size:16px;color:black;background:none;">'+
          '<div id="cart_descrp_'+v_code+'" style="float:left;width:100%;height:80%;padding:5px 0 0 0;font-size:12px;color:black;overflow:auto;background:none;">'+
            v_name+        
          '</div>'+      
          '<div style="float:left;width:100%;height:20%;font-size:14px;color:red;background:none;">'+
            '<div style="float:left;width:50%;height:100%;background:none;">&#8369; '+v_price+'</div>'+
            '<div style="float:right;width:50%;height:100%;text-align:right;background:none;">x'+v_qty+'</div>'+
          '</div>'+
        '</div>'+

      '</div>';
  }
  return dtl;
}

function delCancel(t,u){
  MSG_SHOW(vbYesNo,"CANCELLED ORDER: ","Are you sure to Delete this record?",function(){
    showProgress(true);  
    axios.post(JBE_API+'z_order.php', { clientno:CURR_CLIENT, request: 41,    
      trano:t,    
      usercode:u
    },JBE_HEADER)
    .then(function (response) {     
      //alert(response.data); 
      DB_ORDER=response.data;  
      dispOrders(vmode,'All',-1);
      showProgress(false);                 
    })    
    .catch(function (error) { console.log(error); showProgress(false); });
  },function(){return;});  
}  
  
function chgItemStat(u,t,s){
  //alert('u='+u+' t='+t+' s='+s);
  if(s==4){
    delCancel(t,u);
    return;
  }
  showProgress(true);      
  axios.post(JBE_API+'z_order.php', { clientno:CURR_CLIENT, request: 331, 
    usercode: u,
    trano: t,
    stat: s
  },JBE_HEADER)
  .then(function (response) {       
      showProgress(false);      
      console.log(response.data);
      //alert('chgitem '+response.data);
      DB_ORDER=response.data;
      document.getElementById('div_sel_orders').value=s;
      dispOrders(vmode,document.getElementById('div_sel_client').value,document.getElementById('div_sel_orders').value);
  })
  .catch(function (error) {
      console.log(error);
      showProgress(false);
  });
}
