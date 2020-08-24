function fm_cart(){
  if(!CURR_USER){
    snackBar("Please Log In");
    return;
  }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  mnu_cart_checkout();
  var dtl=
    '<div id="div_main_cart" style="width:100%;height:100%;background:white;">'+
    
      '<div id="div_dtl_cart" style="width:100%;height:'+(H_VIEW-55)+'px;overflow-x:hidden;overflow-y:auto;padding:2px;background:white;">'+
      '</div>'+    
    
      '<div style="width:100%;height:55px;border:1px solid black;background:darkgray;">'+  
        '<div onclick="cartSelAll()" style="float:left;width:50%;height:100%;padding:15px 0 0 0;background:none;">'+        
          '<input id="cart_sel_all" type="checkbox" style="float:left;margin-left:11px;width:20px;height:20px;" />'+
          '<div style="padding:5px 0 0 0">Select All</div>'+
        '</div>'+ 
  
        '<div style="float:right;width:50%;height:100%;background:none;padding:2px;">'+
          '<div style="width:100%;height:50%;padding:5px;text-align:center;background:lightgray;">Total Amount</div>'+
          '<div id="div_total_cart" style="width:100%;height:50%;padding:2px;color:red;text-align:center;font-size:20px;background:#E0E0E0;"></div>'+
        '</div>'+  
      '</div>'+

    '</div>';    
    
  openView(dtl,'Cart','close_div_cart');
  disp_cartDtl();  
  goTOTAL();  
}

function disp_cartDtl(){
  var dtl='';
  for(i=0;i<DB_CART.length;i++){  
    if(DB_CART[i]['usercode'] != CURR_USER){ continue; }
    var v_mcode=DB_CART[i]['stockno'];    
    var v_mname=JBE_GETFLD('stockname',DB_STOCK,'stockno',v_mcode);  
    var v_mprice=formatNumber2(JBE_GETFLD('price',DB_STOCK,'stockno',v_mcode));   
    
    if(JBE_ONLINE){
      var v_mphoto='upload/'+JBE_GETFLD('photo',DB_STOCK,'stockno',v_mcode)+'?'+n+'456';   
    }else{
      var v_mphoto='data:image/png;base64,' + btoa(JBE_GETFLD('descrp',DB_STOCK,'stockno',v_mcode));
    };

    dtl+=
      '<div style="height:100px;width:100%;border:1px solid lightgray;padding:5px;background:none;">'+          
        '<div style="float:left;height:100%;width:10%;text-align:center;padding:30px 0 0 0;background:none;">'+
          '<input id="cart_sel_'+v_mcode+'" data-idx="'+i+'" class="cls_cart" type="checkbox" onclick="goTOTAL()" style="height:20px;width:20px;" value=""/>'+
        '</div>'+
        '<div style="float:left;position:relative;height:100%;width:30%;border-radius:10px;border:1px solid lightgray;background:none;">'+
          '<div class="class_center_div">'+
            '<img id="cart_img_'+v_mcode+'" src="'+v_mphoto+'" alt="category image" style="height:auto;max-height:100%;width:auto;max-width:100%;background:none;"/>'+        
          '</div>'+
        '</div>'+
        '<div style="float:left;width:58%;height:100%;margin-left:2%;font-size:16px;color:black;background:none;">'+
          '<div id="cart_descrp_'+v_mcode+'" style="width:100%;height:50%;font-size:14px;color:black;overflow:auto;background:none;">'+
            v_mname+        
          '</div>'+    

          '<div style="width:100%;height:25%;font-size:11px;text-align:center;padding:0px;color:black;background:#E0E0E0;">'+
            '<div style="width:130px;height:100%;margin:0 auto;background:none;">'+
              '<input id="btn1_'+v_mcode+'" type="button" onclick="goQTY(-1,&quot;'+v_mcode+'&quot;)" disabled style="float:left;height:100%;width:25%;font-size:18px;border:1px solid gray;background:lightgray;" value="-" />'+
              '<input id="qty_'+v_mcode+'" type="number"  onchange="goQTY(0,&quot;'+v_mcode+'&quot;)"" value="1" disabled style="float:left;height:100%;width:50%;padding:4px 0 0 0;text-align:center;font-size:16px;border:1px solid gray;background:white;" />'+
              '<input id="btn2_'+v_mcode+'" type="button" onclick="goQTY(1,&quot;'+v_mcode+'&quot;)"  disabled style="float:left;height:100%;width:25%;font-size:18px;border:1px solid gray;background:lightgray;" value="+" />'+
            '</div>'+
          '</div>'+

          '<div style="width:100%;height:20%;margin-top:2%;font-size:14px;color:red;background:none;">'+
            '<div style="float:left;width:50%;height:100%;font-size:14px;padding:1px 0 0 0;color:red;background:none;">'+
              '&#8369; <span id="price_'+v_mcode+'" style="height:100%;background:none;">'+v_mprice+'</span>'+
            '</div>'+
            '<div style="float:right;width:50%;height:100%;text-align:right;color:red;background:none;">'+
              '<input id="btn_'+v_mcode+'" type="button" disabled onclick="del_cartItem(&quot;'+CURR_USER+'&quot;,&quot;'+v_mcode+'&quot;)" style="height:99%;font-size:10px;" value="REMOVE" />'+
            '</div>'+
          '</div>'+

        '</div>'+
      '</div>';
  }  
  document.getElementById('div_dtl_cart').innerHTML=dtl;
}

function del_cartItem(usercode,stockno){
  MSG_SHOW(vbYesNo,"CONFIRM: ","Remove this Item from your Cart?",function(){          
    //alert(usercode+' vs '+stockno);
    showProgress(true);    
    axios.post(JBE_API+'z_cart.php', { clientno:CURR_CLIENT, request: 41,    
      usercode: usercode,
      stockno: stockno    
    },JBE_HEADER)
    .then(function (response) {     
      console.log(response.data); 
      showProgress(false);    
      DB_CART=response.data;         
      disp_cartDtl();
    })    
    .catch(function (error) { console.log(error); showProgress(false); });
  },function(){});  

  
}

function mnu_cart_checkout(){
  var jmenu=
    '<div style="width:100%;height:100%;background:none;">'+
      '<div onclick="do_checkout()" style="float:right;width:50%;height:100%;text-align:center;background:yellow;">'+
        '<input id="inp_checkout" type="button" style="height:100%;width:100%;font-size:22px;" value="Checkout"/>'+
      '</div>'+
    '</div>';
  dispMenu(false,jmenu);  
}
function mnu_cart_order(){
  var jmenu=
    '<div style="width:100%;height:100%;background:none;">'+
      '<div style="float:right;width:50%;height:100%;text-align:center;background:yellow;">'+
        '<input id="inp_order" type="button" onclick="do_order()" style="height:100%;width:100%;font-size:22px;color:white;background:orangered" value="Place Order"/>'+
      '</div>'+
    '</div>';
  dispMenu(false,jmenu);  
}

function goQTY(m,vcode){
  //alert(m+' vs '+vcode);
  var curQty=parseInt(document.getElementById('qty_'+vcode).value);
  if(isNaN(curQty)){ curQty=1; }
  if(m==1){ // add 1
    curQty++;
  }else if(m == -1){ // less 1{
    curQty--;    
  }else{
    

  }
  if(curQty==0){ curQty=1; }
  
  document.getElementById('qty_'+vcode).value=curQty;
  //var idx=parseInt(document.getElementById('cart_sel_'+vcode).getAttribute('data-idx'));
  //alert(idx);
  //DB_CART[idx]['qty']=curQty;
  //alert(DB_CART[idx]['qty']);
  goTOTAL();
}
function goTOTAL(){  
  let g_tot=0;
  document.querySelectorAll('.cls_cart').forEach(function(el) {        
    let c_id=el.id.substring(9);    
    //var c_id=el.id;
    //alert(document.getElementById(el.id).checked);
    //el.style.height=H_BODY+'px';    
    //el.style.backgroundColor='blue';
    //alert(el.checked);
    var idx=parseInt(document.getElementById('cart_sel_'+c_id).getAttribute('data-idx'));
    //alert(idx);

    document.getElementById('btn1_'+c_id).disabled=true;
    document.getElementById('btn2_'+c_id).disabled=true;
    document.getElementById('qty_'+c_id).disabled=true;
    document.getElementById('btn_'+c_id).disabled=true;
    if(el.checked){      
      let c_qty=parseInt(document.getElementById('qty_'+c_id).value);
      let c_price=jnumber(document.getElementById('price_'+c_id).innerHTML);
      document.getElementById('btn1_'+c_id).disabled=false;
      document.getElementById('btn2_'+c_id).disabled=false;
      document.getElementById('qty_'+c_id).disabled=false;
      document.getElementById('btn_'+c_id).disabled=false;
      //alert('presyo: '+c_price);
      g_tot=g_tot+(c_qty*c_price);    
      
      DB_CART[idx]['qty']=c_qty;
    }else{
      DB_CART[idx]['qty']=0;
    }
  });
  
  document.getElementById('div_total_cart').innerHTML='&#8369; '+formatNumber2(g_tot);
  document.getElementById('inp_checkout').disabled=true;
  
  if(g_tot>0){ document.getElementById('inp_checkout').disabled=false; }
}

function cartSelAll(){
  var v=document.getElementById('cart_sel_all').checked;
  var aryDB=DB_CART;  
  for(i=0;i<aryDB.length;i++){  
    if(aryDB[i]['usercode'] != CURR_USER){ continue; }
    document.getElementById('cart_sel_'+aryDB[i]['stockno']).checked=v;
  }  
  goTOTAL();
}

function close_div_cart(){ 
  showMainPage();
}

function add_cart(){
  if(!JBE_ONLINE){
    snackBar("OFFLINE");
    return;
  }
  if(!CURR_USER){
    snackBar("Please Log In");
    return;
  }
  var stockno=document.getElementById('div_view_stock').getAttribute('data-stockno');
  showProgress(true);    
  axios.post(JBE_API+'z_cart.php', { clientno:CURR_CLIENT, request: 2,    
    stockno: stockno,
    usercode: CURR_USER
  },JBE_HEADER)
  .then(function (response) {     
    console.log(response.data); 
    showProgress(false);    
    if(response.data=='EXIST'){      
      MSG_SHOW(vbOk,"ERROR: ","This Item is already in your cart.",function(){},function(){});    
    }else{
      DB_CART=response.data;         
      refreshNOTIF('');
      snackBar('Item Added to cart.');
    }        
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}

//************************************************************************************** */
function do_checkout(){
  if(!CURR_USER){
    snackBar("Please Log In");
    return;
  }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  
  var dtl=
  '<div id="div_main_cart" style="width:100%;height:100%;background:none;padding:1px;">'+
    '<div style="width:100%;height:'+(H_VIEW-38)+'px;overflow-x:hidden;overflow-y:auto;padding:5px;background:white;">'+

      '<div style="height:80px;width:100%;font-size:14px;margin-bottom:5px;border:1px solid lightgray;padding:2px;">'+
        '<div style="height:25%;width:100%;padding:0px;background:none;">'+
          '<div style="float:left;width:60px;">Name: </div>'+
          '<div>'+DB_USER[0]['username']+' | '+DB_USER[0]['celno']+'</div>'+
        '</div>'+
        '<div style="height:75%;width:100%;padding:2px;background:none;">'+
          '<div style="float:left;width:60px;height:100%;background:none;">Address:</div>'+
          '<div style="float:left;width:235px;height:100%;">'+
            '<textarea disabled style="width:100%;height:100%;resize:none;color:black;background:white;">'+DB_USER[0]['addrss']+
            '</textarea>'+
          '</div>'+
        '</div>'+
      '</div>';

  var aryDB=DB_CART;  
  var tot_qty=0;
  var tot_amt=0;
  for(i=0;i<aryDB.length;i++){  
    if(aryDB[i]['usercode'] != CURR_USER){ continue; }
    if(parseInt(aryDB[i]['qty']) == 0){ continue; }
    
    var v_mcode=aryDB[i]['stockno'];    
    var v_mname=JBE_GETFLD('stockname',DB_STOCK,'stockno',v_mcode);  
    var v_mprice=parseFloat(JBE_GETFLD('price',DB_STOCK,'stockno',v_mcode));   
    var v_mqty=parseInt(DB_CART[i]['qty']);
    
    
    if(JBE_ONLINE){
      var v_mphoto='upload/'+JBE_GETFLD('photo',DB_STOCK,'stockno',v_mcode)+'?'+n+'456';   
    }else{
      var v_mphoto='data:image/png;base64,' + btoa(JBE_GETFLD('descrp',DB_STOCK,'stockno',v_mcode));
    };

    dtl=dtl+    
      '<div style="height:100px;width:100%;border:1px solid lightgray;padding:5px;background:none;">'+          
        
        '<div style="float:left;position:relative;height:100%;width:30%;border-radius:10px;border:1px solid lightgray;background:none;">'+
          '<div class="class_center_div">'+
            '<img id="cart_img_'+v_mcode+'" src="'+v_mphoto+'" alt="category image" style="height:auto;max-height:100%;width:auto;max-width:100%;background:red;"/>'+        
          '</div>'+
        '</div>'+
        '<div style="float:left;width:68%;height:100%;margin-left:2%;font-size:16px;color:black;background:none;">'+
          '<div id="cart_descrp_'+v_mcode+'" style="float:left;width:100%;height:80%;font-size:14px;color:black;overflow:auto;background:none;">'+
            v_mname+        
          '</div>'+    
        
          '<div style="float:left;width:50%;height:20%;font-size:14px;color:black;background:none;">'+
            '&#8369; <span id="price_'+v_mcode+'" style="background:none;">'+formatNumber2(v_mprice)+'</span>'+
          '</div>'+
          '<div style="float:right;text-align:right;width:50%;height:20%;font-size:20px;color:black;background:none;">'+
            'x'+v_mqty+
          '</div>'+
        '</div>'+
      '</div>';

    tot_qty += v_mqty;
    tot_amt += v_mprice*v_mqty;
  }  

  dtl=dtl+
    '</div>'+    
    '<div style="width:100%;height:35px;border:1px solid black;background:#E0E0E0;">'+
      
      '<div style="float:right;width:150px;height:100%;padding:6px;text-align:center;font-size:18px;color:orangered;background:none;">&#8369; '+
        formatNumber2(tot_amt)+
      '</div>'+
      
      '<div style="float:right;width:auto;height:100%;padding:8px;color:black;text-align:right;font-size:12px;background:none;">'+
        'Order Total: ('+formatNumber(tot_qty)+' Item/s)'+
      '</div>'+

    '</div></div>';
  
  openView(dtl,'Place Order','close_place_order');
  //showMenu('mnu_cart_order');
  mnu_cart_order();
  if(!JBE_ONLINE){
    //showMenu('mnu_offline');
    mnu_offline();
  }
}

function close_place_order(){ 
  //showMenu('mnu_cart_checkout');
  mnu_cart_checkout();
}

function do_order(){
  MSG_SHOW(vbOkAbort,"CONFIRM: ","Press OK button to place the order.",function(){
    save_order();
  },function(){ snackBar('Transaction Aborted!'); });
}

function save_order(){ 
  var vDate=new Date();  
  var vTime = vDate.toLocaleTimeString('it-IT'); 
  vDate = new Date(vDate.getTime() - (vDate.getTimezoneOffset() * 60000 ))
                   .toISOString()
                   .split("T")[0];  
  var trano='T'+vDate+'_'+vTime;
  //catno = 'C_'+catno.replace(/-/g, "").replace(/:/g, "").replace("T", "-");    
  
  showProgress(true);
  //alert('DB_CART.length  '+DB_CART.length);
  
  var aryTEMP=[];
  var ctrTEMP=0;
  for(i=0;i<DB_CART.length;i++){  
    if(DB_CART[i]['usercode'] != CURR_USER){ continue; }
    if(parseInt(DB_CART[i]['qty']) == 0){ continue; }

    var stockno=DB_CART[i]['stockno'];
    //alert(stockno);
    var price=parseFloat(JBE_GETFLD('price',DB_STOCK,'stockno',stockno));   
    var qty=parseInt(DB_CART[i]['qty']);
    var ob = {
      stockno:stockno,              
      price:price,
      qty:qty,
      amount:(price*qty)
    };
    aryTEMP[ctrTEMP]=ob; ctrTEMP++;
  }

  axios.post(JBE_API+'z_order.php', { clientno:CURR_CLIENT, request: 2,
    trano:trano,
    usercode:CURR_USER,
    trandate:vDate,
    trantime:vTime,
    ob:aryTEMP
  },JBE_HEADER)
  .then(function (response) {     
    showProgress(false);
    //alert('bantay: '+response.data);
    console.log(response.data);
    DB_ORDER=response.data;
    snackBar('Order is placed');
    showMainPage();
  })    
  .catch(function (error) { console.log(error); showProgress(false); });  


  return;

  for(i=0;i<DB_CART.length;i++){  
    if(DB_CART[i]['usercode'] != CURR_USER){ continue; }
    if(parseInt(DB_CART[i]['qty']) == 0){ continue; }
   
    var v_mcode=DB_CART[i]['stockno'];    
    var usercode=DB_CART[i]['usercode']; 
    var v_mprice=parseFloat(JBE_GETFLD('price',DB_STOCK,'stockno',v_mcode));   
    var v_mqty=parseInt(DB_CART[i]['qty']);
    
    axios.post(JBE_API+'z_order.php', { clientno:CURR_CLIENT, request: 2,
      trano:trano,
      trandate:vDate,
      trantime:vTime,
      usercode: usercode,
      stockno: v_mcode,
      qty:v_mqty,
      price:v_mprice,
      amount:v_mqty*v_mprice
    },JBE_HEADER)
    .then(function (response) {     
      showProgress(false);
      console.log(response.data);
      DB_ORDER=response.data;
      snackBar('Order is placed');
      showMainPage();
    })    
    .catch(function (error) { console.log(error); showProgress(false); });
  }
}
