var aryPix=[];

function mnu_promo(){
  var jmenu=
    '<div style="width:100%;height:100%;background:none;">'+
      '<div onclick="select_promo()" style="float:left;width:30%;height:100%;color:'+JBE_TXCLOR1+';overflow:auto;background: none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jadd.png"  style="height:100%;" alt="Add Promo image" />'+
        '</div>'+
        '<span class="footer_fonts">Add Promo</span>'+
      '</div>'+      
    '</div>';
  dispMenu(false,jmenu);  
}

function fm_promo(){  
  if(!JBE_ONLINE) { 
    snackBar('OFFLINE');
    return;
  }
  if(CURR_AXTYPE < 3) { 
    snackBar('ACCESS DENIED');
    return;
  }
  
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  var n = new Date().toLocaleTimeString('it-IT');
  mnu_promo();
  
  var promo=DB_STOCK;
  promo.sort(sortByMultipleKey(['promo']));
  var dtl='<div id="div_fm_promo" style="width:100%;height:100%;border:1px solid black;overflow:auto;background:white;">';
  //var dtl=''  
  for(i=0;i<promo.length;i++){  
    if(parseInt(promo[i]['promo']) == 0){ continue; }     
    var v_mcode=promo[i]['stockno'];    
    var v_mname=promo[i]['descrp']; 
    var v_mprice=promo[i]['price']; 
    //var v_mphoto='upload/'+promo[i]['photo']+'?'+n;  
    var v_mphoto=JBE_API+'app/'+CURR_SITE+'/upload/'+promo[i]['photo']+'?'+n;   

    dtl=dtl+      
      '<div id="fm_promo_'+v_mcode+'" class="class_items" style="float:left;text-align:center;border:0px solid red;padding:5px;background:lightgray;">'+
        '<div style="position:relative;width:100%;height:70%;padding:2px;background:white;">'+          
          '<img id="photo_promo_'+v_mcode+'" src="'+v_mphoto+'" class="asyncImage" style="height:auto;max-height:100%;width:auto;max-width:100%;background:none;" />'+          
          '<div id="del_promo_'+v_mcode+'" onclick="func_promo(0,&quot;'+v_mcode+'&quot;)" '+
              'style="position:absolute;top:2px;right:2px;text-align:center;cursor:pointer;border-radius:50%;border:0px solid black;font-size:14px;width:20px;height:20px;padding:2px;color:white;background:red;">X</div>'+
        '</div>'+      
        '<div id="descrp_promo_'+v_mcode+'" style="width:100%;height:20%;font-size:11px;color:black;overflow:auto;background:none;">'+v_mname+'</div>'+
        '<div id="price_promo_'+v_mcode+'" style="width:100%;height:10%;font-size:11px;color:red;background:none;">&#8369; '+formatNumber2(v_mprice)+'</div>'+
        
      '</div>';  
  }  
  dtl=dtl+'</div>';  
  openView(dtl,'Promo Maintenance','close_promo');
}
function close_promo(){
  showMainPage();
}

function select_promo(){ 
  var aryPromos = DB_STOCK;    
  //get total # of promos
  var ctr=0;
  for(i=0;i<aryPromos.length;i++){       
    if(parseInt(aryPromos[i]['promo']) == 0) { continue; }
    ctr++;
  }
  //************************** */
  var dtl='<div id="scroll_promo" style="width:100%;height:300px;overflow-x:hidden;overflow-y:auto;background:white;">';  
    for(i=0;i<aryPromos.length;i++){       
      if(parseInt(aryPromos[i]['promo']) != 0) { continue; }
      var v_mcode=aryPromos[i]['stockno'];    
      var v_mname=aryPromos[i]['descrp']; 
      var v_mprice=aryPromos[i]['price']; 
      //var v_mphoto=aryPromos[i]['photo']+'?'+n;      
      var v_mphoto=JBE_API+'app/'+CURR_SITE+'/upload/'+aryPromos[i]['photo']+'?'+n;        
      dtl=dtl+
        '<div id="sel_promo_'+v_mcode+'" onclick="func_promo('+(ctr+1)+',&quot;'+v_mcode+'&quot;)" style="float:left;text-align:center;width:107px;height:125px;margin-top:4px;margin-left:4px;padding:2px;background:none;">'+        
          '<div class="class_items" style="width:100%;height:70%;padding:5px;border:1px solid lightgray;border-radius:10px;background:none;">'+        
            '<img src="'+v_mphoto+'" alt="promo image" class="asyncImage" style="height:auto;max-height:100%;width:auto;max-width:100%;background:none;" />'+
          '</div>'+
          '<div style="width:100%;height:auto;max-height:20%;font-size:11px;overflow-x:hidden;overflow-y:auto;color:black;background:none;">'+v_mname+'</div>'+
          '<div style="width:100%;height:10%;font-size:11px;color:red;background:none;">&#8369; '+formatNumber2(v_mprice)+'</div>'+
        '</div>';
    }  
    dtl=dtl+'</div>';

  var dtl2=      
    '<div style="width:100%;height:100%;padding:11px 0 0 0;text-align:center;color:white;background:none;">'+
      'Tap to Add'+
    '</div>'; 

  JBE_OPENBOX('scroll_promo','Promo Facility',dtl,dtl2);  
}
function close_select_promo(){
  mnu_promo();
}
function func_promo(promo,stockno){
  //alert(stockno);    
  axios.post(JBE_API+'z_stock.php', { clientno:CURR_CLIENT, request: 30,
    promo: promo,
    stockno: stockno
  },JBE_HEADER)
  .then(function (response) {     
    console.log(response.data); 
    DB_STOCK=response.data;    
    showProgress(false);
    JBE_CLOSEBOX();
    showPromos();
    fm_promo();  
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}

function mnu_view_dtl(){
  var jmenu=
    '<div style="width:100%;height:100%;color:'+JBE_TXCLOR1+';">'+
      '<div onclick="add_cart()" style="float:left;width:25%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jcart.png"  style="height:100%;" alt="back image" />'+
        '</div>'+
        '<span class="footer_fonts">Add Cart</span>'+
      '</div>'+
      
      '<div onclick="fm_chat(&quot;&quot;)" style="float:right;width:25%;height:100%;color:'+JBE_TXCLOR1+';background: none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jchat.png"  style="height:100%;" alt="back image" />'+
        '</div>'+
        '<span class="footer_fonts">Chat</span>'+
      '</div>'+      
    '</div>';
  dispMenu(false,jmenu);  
}
function mnu_view_dtl_owner(){
  var jmenu=
    '<div style="width:100%;height:100%;color:'+JBE_TXCLOR1+';">'+
      '<div style="width:100%;height:100%;padding:12px 0 0 0;text-align:center;background:none;">'+
        'VIEW ITEMS'+
      '</div>'+
    '</div>';
  dispMenu(false,jmenu);  
}

function view_dtl_stock(f_showComm,stockno,pg){
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  
  //showMenu('mnu_view_dtl');
  if(!JBE_ONLINE){
    mnu_offline();
  }else{
    mnu_view_dtl();
  }
  var vdisp="block";
  if(!f_showComm){ vdisp="none"; dispMenu(false,'');   }

  if(CURR_AXTYPE > 0){ mnu_view_dtl_owner(); }; 
  var n = new Date().toLocaleTimeString('it-IT');
  var aryDB=JBE_GETARRY(DB_STOCK,'stockno',stockno);
  
  var stockname=aryDB['stockname'];
  var descrp=aryDB['descrp'];
  var price=formatNumber2(aryDB['price']);      
  /*  
  if(JBE_ONLINE){
    var photo=JBE_API+'app/'+CURR_SITE+'/upload/'+aryDB['photo']+'?'+n;
  }else{
    var photo='data:image/png;base64,' + btoa(aryDB['photo']);  
  }
  */   
  aryPix=[];
  //aryPix[0]=photo;
  if(JBE_ONLINE){
    aryPix[0]=JBE_API+'app/'+CURR_SITE+'/upload/'+aryDB['photo']+'?'+n;
  }else{
    aryPix[0]='data:image/png;base64,' + btoa(aryDB['photo']);  
  }



  var jjstyle='height:auto;max-height:100%;width:auto;max-width:100%;';  
  
  var dtl=    
    '<div id="div_view_stock" class="xclass_items" data-stockno="'+stockno+'" style="height:100%;font-size:14px;padding:10px;color:gray;overflow:auto;background:whitesmoke;">'+

      '<div id="view_stock_box1" data-pos=1 data-max=0 style="position:relative;width:100%;text-align:center;border:0px solid lightgray;background:white;">'+
  
        '<div style="float:left;width:10%;height:100%;padding:12% 0 0 0;background:none;">'+
          '<img id="jPrev" onclick="slyder(-1)" style="width:100%;border-radius:50%;padding:2px;background:lightgray;" src="../../main_gfx/jPrev.png" alt="" />'+        
        '</div>'+

        '<div style="float:left;position:relative;height:100%;width:80%;text-align:center;border:0px solid lightgray;background:white;">'+
          '<div class="class_center_div">'+
            '<img id="view_photo_stock" class="asyncImage" data-page='+pg+' style="'+jjstyle+'" src="'+aryPix[0]+'" onclick="JBE_ZOOM(this.src,&quot;&quot;)" alt="" />'+        
          '</div>'+
        '</div>'+ 

        '<div style="float:left;width:10%;height:100%;padding:12% 0 0 0;background:none;">'+
          '<img id="jNext" onclick="slyder(1)" style="width:100%;border-radius:50%;padding:2px;background:lightgray;" src="../../main_gfx/jNext.png" alt="" />'+      
        '</div>'+
        
        '<div id="jTextSlyder" style="position:absolute;bottom:0px;right:0px;width:auto;height:20px;text-align:right;background:none;"></div>'+  

      '</div>'+

      '<div id="view_stock_box2" style="margin-top:0px;width:100%;text-align:left;padding:0px;font-size:14px;font-weight:normal;color:black;background:whitesmoke;">'+
          stockname+
      '</div>'+ 
      
      '<div id="view_stock_box3" style="margin-top:5px;width:100%;padding:0px;background:none;border:0px solid red;">'+
        '<div style="width:100%;height:17px;padding:0px;background:none;">'+
          '<div style="float:left;width:50%;height:100%;font-weight:bold;color:black;">Product Details</div>'+
          '<div style="float:right;width:50%;height:100%;text-align:right;color:red;">&#8369; '+price+'</div>'+        
        '</div>'+ 
        
        '<div id="dtl_descrp" style="width:100%;height:120px;overflow:none;border:0px solid lightgray;border-radius:5px;padding:4px;background:none;">'+           
          '<textarea id="puta" rows="0" disabled=true style="resize:none;height:100%;width:100%;font-size:14px;padding:0;border:0px solid lightgray;'+
                        'text-align:left;background-color:white;" >'+
              descrp+
          '</textarea>'+
        '</div>'+
      '</div>'+
      
      '<div id="view_stock_box4" style="display:'+vdisp+';margin-top:5px;width:100%;padding:0px;background:white;border:0px solid red;">'+

        '<div style="width:100%;height:18%;padding:0px;font-weight:bold;color:black;background:none;">Comments</div>'+  
        '<div id="dtl_comment" style="width:100%;height:82%;font-size:12px;overflow:auto;padding:0px;overflow:auto;background:none;">'+
        '</div>'+ 

      '</div>'+ 
  
    '</div>';  
    
  //alert('WATCH: '+dtl);
  openView(dtl,'Item View','close_view_dtl_stock|'+pg);
  
  var bx1=H_BODY/4;
  if(!JBE_MOBILE){ bx1=300; }
  var bx2=20;
  var bx3=140;
  var bx4=H_BODY-(bx1+bx2+bx3+60);
  
  document.getElementById('view_stock_box1').style.height=bx1+'px';
  document.getElementById('view_stock_box2').style.height=bx2+'px';
  document.getElementById('view_stock_box3').style.height=bx3+'px';
  document.getElementById('view_stock_box4').style.height=bx4+'px';

  var dtl2='<div style="display:none;height:100%;background:orange;">XXX</div>';
  document.getElementById('cap_viewMid'+pg).innerHTML=dtl2;  
  
  disp_comm(stockno);
  
  var maxctr=1;
  for(var i=2;i<=5;i++){
    //alert('kami '+i+' = '+aryDB['photo'+i]);
    if(aryDB['photo'+i]==''){ continue; }
    //alert('sss '+maxctr);
    if(JBE_ONLINE){
      aryPix[maxctr]=JBE_API+'app/'+CURR_SITE+'/upload/'+aryDB['photo'+i]+'?'+n;
    }else{
      aryPix[maxctr]='data:image/png;base64,' + btoa(aryDB['photo'+i]);  
    }    
    maxctr++;    
  }
  //alert('maxctr: '+maxctr);
  
  document.getElementById('view_stock_box1').setAttribute('data-max',maxctr);
  document.getElementById('jTextSlyder').innerHTML='1/'+maxctr;
  /*
  for(var i=0;i<aryPix.length;i++){
    alert('ako '+i+' = '+aryPix[i]);
  }
  */
}

function slyder(v){  
  var curMax=parseInt(document.getElementById('view_stock_box1').getAttribute('data-max'));
  var curPos=parseInt(document.getElementById('view_stock_box1').getAttribute('data-pos'));
  //alert('old pos '+curPos);
  if(v > 0){
    curPos++;
    if(curPos>curMax){ curPos=1; }
  }
  if(v < 0){
    curPos--;
    if(curPos <= 0){ curPos=curMax; }
  }
  //alert('xcurPos '+curPos+' = '+aryPix[curPos-1]);
  document.getElementById('jTextSlyder').innerHTML=curPos+'/'+curMax;  
  document.getElementById('view_stock_box1').setAttribute('data-pos',curPos);  
  document.getElementById('view_photo_stock').src=aryPix[(curPos-1)];
}

function close_view_dtl_stock(m){
  document.getElementById('cap_viewMid'+m).style.display='none';
  //alert('close_view_dtl_stock: '+m);
  if(m=='1'){
    showMainPage();  
  }else{
    //showMenu('mnu_view_cat');    
    mnu_view_cat();
  }
}

function disp_comm(stockno){
  var aryDB = DB_COMMENT;
  var dtlComm='' //'<div style="width:100%;height:80%;padding:5px;border:1px solid blue;">';
  for(i=0;i<aryDB.length;i++){       

    if(aryDB[i]['stockno'] != stockno) { continue; }
    
    var v_dele='none';
    if(CURR_AXTYPE > 0){
      v_dele='block';
    }
    var v_mphoto=JBE_API+'app/'+CURR_SITE+'/upload/users/'+aryDB[i]['usercode']+'.jpg?'+n;  
    dtlComm+=
      
      '<div style="width:100%;height:auto;min-height:70px;text-align:left;font-size:14px;margin-bottom:5px;background-color:none;border:0px solid green;">'+ 
      
        '<div style="float:left;width:100%;height:30px;margin-top:0px;background:none;">'+
          '<img src="'+v_mphoto+'" style="float:left;height:100%;width:30px;border-radius:50%;border:1px solid gray;background:none;"/>'+
          '<div style="float:left;margin-left:5px;height:100%;width:auto;padding:3px 0 0 0;color:black;background:none;"/>'+aryDB[i]['username']+'</div>'+
        '</div>'+     

        '<div style="float:left;margin-top:0px;width:100%;height:40px;max-height:100%;padding:1px;background-color:none;">'+          
          '<div style="float:left;width:80%;height:100%;overflow:auto;margin-left:10px;border-radius:5px;padding:1px;background-color:lightgray;">'+              
             aryDB[i]['comment']+
          '</div>'+ 
          '<button onclick="del_comm('+aryDB[i]['id']+',&quot;'+stockno+'&quot;)" style="display:'+v_dele+';float:right;width:25px;height:25px;text-align:center;border-radius:5px;border:1px solid white;color:white;background-color:red;">X</button>'+                        
        '</div>'+
        
      '</div>';    
  }
  dtlComm+=
     // '</div>'+
      '<div id="dv_stock" style="width:100%;height:30px;margin-top:10px;padding:3px;background:'+JBE_CLOR+';">'+
        '<input id="vkoment" type="text" style="float:left;width:78%;height:100%;" value="" />'+
        '<input type="button" onclick="post_comm(vkoment.value,&quot;'+stockno+'&quot;)" style="float:right;width:20%;height:100%;" value="Post" />'+
      '</div>';
      
  document.getElementById('dtl_comment').innerHTML=dtlComm;

  var eldiv = document.getElementById("dtl_comment");  
  eldiv.innerHTML=dtlComm;  
  eldiv.scrollTop = eldiv.scrollHeight;
  
  if(JBE_ONLINE && (CURR_USER != '' && CURR_USER != null)){
    //document.getElementById('dv_stock').style.pointerEvents='auto';
    document.getElementById('dv_stock').style.display='block';
  }else{
    document.getElementById('dv_stock').style.display='none';
  }
}

function post_comm(v,stockno){
  if(v.trim().length==0) { return; }
  //alert(stockno);
  axios.post(JBE_API+'z_comment.php', { clientno:CURR_CLIENT, request: 2,
    comment: v,
    usercode: CURR_USER,
    username: CURR_NAME,
    stockno: stockno
  },JBE_HEADER)
  .then(function (response) {     
    console.log(response.data); 
    //alert('ok postcomm');
    DB_COMMENT=response.data; 
    disp_comm(stockno);       
    document.getElementById('vkoment').value='';
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}

function del_comm(id,stockno){
  MSG_SHOW(vbYesNo,"CONFIRM: ","Delete this comment?",function(){
    axios.post(JBE_API+'z_comment.php', { clientno:CURR_CLIENT, request: 4,
      id: id
    })
    .then(function (response) {     
      console.log(response.data); 
      DB_COMMENT=response.data; 
      disp_comm(stockno);       
      document.getElementById('vkoment').value='';
    },JBE_HEADER)    
    .catch(function (error) { console.log(error); showProgress(false); });
  },function(){});      
}

function mnu_view_cat(){
  var jmenu=
    '<div style="width:100%;height:100%;padding:12px 0 0 0;color:'+JBE_TXCLOR1+';text-align:center;background:none;">'+
      'Select a Category'+
    '</div>';
  dispMenu(false,jmenu);
}

function view_dtl_cat(catno){
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  //showMenu('mnu_view_cat');
  mnu_view_cat();
  
  var n = new Date().toLocaleTimeString('it-IT');
  var ctr=0;
  CURR_BACKER=0;
  var aryDB = DB_STOCK;    
  var catname=JBE_GETFLD('descrp',DB_CAT,'catno',catno); 
  var dtl='<div style="width:100%;height:20px;font-size:15px;text-align:center;padding:2px;color:black;background:white;">'+catname+'</div>'+
          '<div id="scroll_cat_items" style="width:100%;height:'+(H_VIEW-25)+'px;margin-top:5px;overflow-x:hidden;overflow-y:auto;background:white;">';  
  
  for(i=0;i<aryDB.length;i++){      
    if(aryDB[i]['catno'] != catno) { continue; }
    var v_mcode=aryDB[i]['stockno'];    
    var v_mname=aryDB[i]['stockname']; 
    var v_mprice=aryDB[i]['price']; 
    //var v_mphoto='upload/'+aryDB[i]['photo']+'?'+n; 
    if(JBE_ONLINE){
      //var v_mphoto='upload/'+aryDB[i]['photo']+'?'+n; 
      var v_mphoto=JBE_API+'app/'+CURR_SITE+'/upload/'+aryDB[i]['photo']+'?'+n;   
    }else{
      var v_mphoto='data:image/png;base64,' + btoa(aryDB[i]['photo']);
    }      

    ctr++;
    dtl=dtl+
      '<div onclick="view_dtl_stock(true,&quot;'+v_mcode+'&quot;,2)" class="class_items">'+      
        '<div style="position:relative;height:70%;width:100%;border-radius:10px;border:1px solid lightgray;background:none;">'+
          '<div class="class_center_div">'+
            '<img id="photo_stock_'+v_mcode+'" class="asyncImage" src="'+v_mphoto+'" onerror="imgOnError(this)" alt="item image" style="height:auto;max-height:100%;width:auto;max-width:100%;background:none;"/>'+
          '</div>'+
        '</div>'+
        '<div style="height:30%;width:100%;">'+
          '<div style="width:100%;height:auto;max-height:70%;font-size:11px;overflow-x:hidden;overflow-y:auto;color:black;background:none;">'+v_mname+'</div>'+
          '<div style="width:100%;height:30%;font-size:11px;color:red;background:none;">&#8369; '+formatNumber2(v_mprice)+'</div>'+
        '</div>'+
      '</div>';
  }  
  if(ctr==0){
    dtl=dtl+'<div style="margin-top:20px;width:100%;height:25px;font-size:25px;font-style:italic;text-align:center;color:black;background:none;">( Empty )</div>';
  }
  dtl=dtl+'</div>';

  //document.getElementById('div_items').innerHTML=dtl;      
  //var vheight=(117+4)*3;
  //document.getElementById('scroll_items').style.height=vheight+'px';  

  //document.getElementById('dtl_myView1').innerHTML=dtl;    
  openView(dtl,'Category View','close_cat_view');  
}
function close_cat_view(){
  //alert('close_cat_view');
  showMainPage();
}
