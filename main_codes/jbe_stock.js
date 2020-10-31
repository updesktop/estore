function fm_stock(c){  
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
  
  //JBE_ONLINE=true;
  
  //openPage('page_meter');

  //showMenu('mnu_stock'); 
  mnu_stock();
  var dtl='';
  
  dtl=
    '<div id="div_main_stock" data-new=0 data-stockno="" style="position:relative;height:100%;padding:0px;border:0px solid lightgray;background:white;">'+
      '<div id="dtl_stock" style="width:100%;height:'+(H_VIEW-42)+'px;margin-top:0px;padding:0px;overflow:auto;background:none;">'+
      '</div>'+ 
      
      '<div id="divsel_cat" data-old-catno="" style="width:100%;height:30px;padding:1px;color:'+JBE_TXCLOR1+';background:'+JBE_CLOR+';">'+        
        '<div style="float:left;width:30%;color:white;padding:5px 0 0 5px;">Category:</div>'+
        '<select id="div_sel_cat" name="sel_cat" onchange="dispAllStocks(this.value)" style="float:left;width:70%;height:100%;">'+           
        '</select>'+
      '</div>'+      
    '</div>';
    
  openView(dtl,'Stock Maintenance','close_stock');

  var h_divsel_cat=parseInt(document.getElementById('divsel_cat').style.height);  
  //document.getElementById('dtl_stock').style.height=(H_BODY-(h_divsel_cat+42))+'px';
  
  var newOptionsHtml0 = "<option value='ALL'> ALL </option>";
  var cat = DB_CAT;  
  
  for(i=0;i<cat.length;i++){   
    var v_mcode=cat[i]['catno'];
    var v_mdescrp=cat[i]['descrp'];    
    newOptionsHtml0=newOptionsHtml0+"<option value='"+v_mcode+"'>"+v_mdescrp+"</option>";   
  }  
  document.getElementById('div_sel_cat').innerHTML=newOptionsHtml0;   
  document.getElementById('div_sel_cat').value=c;
  document.getElementById('div_sel_cat').setAttribute('data-old-catno',c);
  dispAllStocks(c);    
}

function close_stock(){
  showMainPage();
  showItems();
  showPromos();
}

function mnu_stock(){
  var jmenu=
    '<div style="width:100%;height:100%;background:none;">'+
      '<div onclick="add_edit_stock(1,&quot&quot)" style="float:left;width:25%;height:100%;color:'+JBE_TXCLOR1+';background: none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jadd.png"  style="height:100%;" alt="back image" />'+
        '</div>'+
        '<span class="footer_fonts">Add</span>'+
      '</div>'+      
    '</div>';
  dispMenu(false,jmenu);  
}
function mnu_stock2(){
  var jmenu=
    '<div style="width:100%;height:100%;background:none;">'+
      '<div onclick="saveStock()" style="float:left;width:50%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jsave.png"  style="height:100%;" alt="save image" />'+
        '</div>'+
        '<span class="footer_fonts">Save</span>'+
      '</div>'+
      
      '<div id="btn_stock2_dele" onclick="delStock()" style="float:left;width:50%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jdele.png"  style="height:100%;" alt="del image" />'+
        '</div>'+
        '<span class="footer_fonts">xxDelete</span>'+
      '</div>'+      
    '</div>';
  dispMenu(false,jmenu);  
}

function dispAllStocks(c){    
  var n = new Date().toLocaleTimeString('it-IT');  
  CURR_BACKER=0;
  var stock = DB_STOCK;    
  stock.sort(sortByMultipleKey(['descrp']));   
  var dtl='';
  for(i=0;i<stock.length;i++){   
    if(c != 'ALL' && c != stock[i]['catno']){ continue; }
    var v_mcode=stock[i]['stockno'];    
    var v_mstockname=stock[i]['stockname']; 
    var v_mdescrp=stock[i]['descrp']; 
    var v_mprice=stock[i]['price']; 
    //var v_mphoto='upload/'+stock[i]['photo']+'?'+n;       
    if(JBE_ONLINE){
      var v_mphoto=JBE_API+'app/'+CURR_SITE+'/upload/'+stock[i]['photo']+'?'+n;   
    }else{
      var v_mphoto='data:image/png;base64,' + btoa(cat[i]['photo']);
    }
    
    dtl=dtl+      
      '<div id="das_stock_'+v_mcode+'" onclick="selectRow(&quot;das_stock_'+v_mcode+'&quot;,&quot;class_items&quot;);add_edit_stock(2,&quot;'+v_mcode+'&quot;)" class="class_items">'+      
        '<div style="position:relative;height:70%;width:100%;border-radius:10px;border:1px solid lightgray;background:none;">'+
          '<div class="class_center_div">'+
            '<img id="photo_stock_'+v_mcode+'" src="'+v_mphoto+'" onerror="imgOnError(this)" alt="item image" style="height:auto;max-height:100%;width:auto;max-width:100%;background:none;"/>'+            
          '</div>'+
        '</div>'+
        '<div style="height:30%;width:100%;">'+
          '<div id="stockname_stock_'+v_mcode+'" style="width:100%;height:auto;max-height:70%;font-size:11px;overflow-x:hidden;overflow-y:auto;color:black;background:none;">'+v_mstockname+'</div>'+
       //   '<div id="descrp_stock_'+v_mcode+'" style="width:100%;height:auto;max-height:70%;font-size:11px;overflow-x:hidden;overflow-y:auto;color:black;background:none;">'+v_mdescrp+'</div>'+
          '<div id="price_stock_'+v_mcode+'" style="width:100%;height:30%;font-size:11px;color:red;background:none;">&#8369; '+formatNumber2(v_mprice)+'</div>'+
        '</div>'+
      '</div>';
  }  
  //document.getElementById('div_main_stock').innerHTML=dtl;     
  document.getElementById('dtl_stock').innerHTML=dtl;     
}

function close_add_edit_stock(){ 
  //showMenu('mnu_stock'); 
  mnu_stock();
}
function add_edit_stock(vmode,vstockno){
  thisFile=null;
  var stockno=(new Date()).toISOString().slice(0, 19);      
  stockno = 'S_'+stockno.replace(/-/g, "").replace(/:/g, "").replace("T", "-");    
  var stockname='';  
  var descrp='';  
  var price='';
  var photo=JBE_DEF_IMG;
  var cap_img='ADD ITEM RECORD';
  var catno=document.getElementById('div_sel_cat').value;  

  //alert(catno+' = '+JBE_GETFLD('descrp',DB_CAT,'catno',catno)); 
  
  var n = new Date().toLocaleTimeString('it-IT');

  //document.getElementById('btn_stock2_dele').style.display='none';  

  if(vmode==2){    
    stockno=vstockno;  
    var aryDB=JBE_GETARRY(DB_STOCK,'stockno',stockno);
    catno=aryDB['catno'];
    stockname=aryDB['stockname'];
    descrp=aryDB['descrp'];
    price=aryDB['price'];
    photo=document.getElementById('photo_stock_'+stockno).src;    
    cap_img='EDIT ITEM RECORD';
    //document.getElementById('btn_stock2_dele').style.display='block';  
  }
  
  var dtl=    
    '<div id="div_solo_stock" data-new='+vmode+' data-stockno="'+stockno+'" data-img="'+photo+'" data-oldimg="'+photo+'" style="width:100%;height:'+(H_BODY-90)+'px;overflow:auto;background:none;">'+      
      '<div style="position:relative;width:100%;height:155px;text-align:center;background:white;">'+
        '<div class="class_center_div">'+
          '<img id="prev_photo_stock" name="prev_photo_stock" data-img="'+photo+'" alt="pic image" src="'+photo+'" style="height:auto;max-height:100%;width:auto;max-width:100%;" alt="" />'+
        '</div>'+            
      '</div>'+   
      '<div style="width:100%;height:30px;padding:2px;text-align:center;background:none;">'+
        '<input type="file" id="inp_file_stock" data-sel=0 name="inp_file_stock" hidden="hidden" />'+                  
        '<button type="button" onclick="JBE_PICK_IMAGE(inp_file_stock.id,prev_photo_stock.id)" id="custom_button_c2" style="width:100px;height:100%;text-align:center;border-radius:10px;border:1px solid black;color:'+JBE_TXCLOR1+';background:'+JBE_CLOR+';">'+
          'Browse'+
        '</button>'+       
      '</div>'+
       '<div id="box_stockname" style="margin-top:5px;width:100%;height:25px;border:1px solid gray;padding:3px;background:lightgray;">'+
        '<div style="width:100%;height:100%;margin-top:0px;padding:0px;font-size:15px;background-color:none;">'+
          '<span style="float:left;height:100%;width:20%;text-align:left;padding:0px 0 0 0;margin-right:5px;">Name</span>'+
          '<span style="float:right;width:75%;height:100%;">'+
            '<input id="inp_stock_name" type="text" style="width:100%;height:100%;" value="'+stockname+'" />'+
          '</span>'+
        '</div>'+
      '</div>'+
      '<div id="box_descrp" style="margin-top:5px;width:100%;height:auto;">'+
        '<div id="div_descrp" style="width:100%;height:20px;margin-top:0px;padding:0 0 0 2px;border:1px solid gray;font-size:15px;background-color:lightgray;">'+
          'Description'+
        '</div>'+
        '<div id="div_order_comment" class="div_order_comment" style="height:60px;border:1px solid gray;background-color:lightgray;padding:5px;">'+
            '<textarea id="inp_stock_descrp" name="inp_stock_descrp" rows="4" cols="50" class="fld_imsg_input" placeholder="Type the description here..."'+
                      'style="float:left;resize:none;height:100%;width:100%;font-size:14px;padding:1%;border:1px solid lightgray;'+
                        'height:100%;text-align:left;color:black;background-color:none;">'+descrp+'</textarea>'+
        '</div>'+      
      '</div>'+
      '<div id="box_price" style="margin-top:5px;width:100%;height:25px;border:1px solid gray;padding:3px;background:lightgray;">'+
        '<div style="width:100%;height:100%;margin-top:0px;padding:0px;font-size:15px;background-color:none;">'+
          '<span style="float:left;height:100%;width:48%;text-align:right;padding:0px 0 0 0;margin-right:5px;">Price</span>'+
          '<span style="float:right;width:50%;height:100%;">'+
            '<input id="inp_stock_price" type="text" onchange="update_price(this.value)" style="width:100%;height:100%;text-align:center;" value="'+formatNumber2(price)+'" onkeypress="return isNumberKey(event,this.id)"/>'+
          '</span>'+
        '</div>'+
      '</div>'+
      '<div id="box_cat" style="margin-top:5px;width:100%;height:25px;border:1px solid gray;padding:3px;background:lightgray;">'+
        '<div style="width:100%;height:100%;margin-top:0px;padding:0px;font-size:15px;background-color:none;">'+
          '<span style="float:left;height:100%;width:48%;text-align:right;padding:0px 0 0 0;margin-right:5px;">Category</span>'+
          '<span style="float:right;width:50%;height:100%;">'+
            '<div id="divsel_stock" style="width:100%;height:100%;background:pink;">'+
              '<select id="sel_stock" name="sel_stock" style="width:100%;height:100%;">'+
              '</select>'+
            '</div>'+
          '</span>'+
        '</div>'+   
      '</div>'+    
    '</div>';  
  var dtl2=
    '<div style="width:100%;height:100%;background:none;">'+
      '<div onclick="saveStock()" style="float:left;width:25%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jsave.png"  style="height:100%;" alt="save image" />'+
        '</div>'+
        '<span class="footer_fonts">Save</span>'+
      '</div>'+
      
      '<div id="btn_stock2_dele" onclick="delStock()" style="float:left;margin-left:15%;width:25%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jdele.png"  style="height:100%;" alt="del image" />'+
        '</div>'+
        '<span class="footer_fonts">Delete</span>'+
      '</div>'+      
    '</div>';
  
  JBE_OPENBOX('div_solo_stock',cap_img,dtl,dtl2);  
  document.getElementById('div_main_stock').setAttribute('data-stockno',stockno);
  
  /********************************************* */
  var newOptionsHtml0 = "";
  var cat = DB_CAT;    
  for(i=0;i<cat.length;i++){   
    var v_mcode=cat[i]['catno'];
    var v_mdescrp=cat[i]['descrp'];    
    newOptionsHtml0=newOptionsHtml0+"<option value='"+v_mcode+"'>"+v_mdescrp+"</option>";   
  }    
  document.getElementById('sel_stock').innerHTML=newOptionsHtml0;   
  document.getElementById('sel_stock').value=catno;  
  //showMenu('mnu_stock2');   
  //mnu_stock2();
}

function update_price(v){
  document.getElementById('inp_stock_price').value=formatNumber2(v);
}


function saveStock(){
  var vmode=parseInt(document.getElementById('div_solo_stock').getAttribute('data-new'));  
  var stockno=document.getElementById('div_solo_stock').getAttribute('data-stockno');
  var catno=document.getElementById('sel_stock').value;    
  var stockname=document.getElementById('inp_stock_name').value; 
  var descrp=document.getElementById('inp_stock_descrp').value; 
  var price=document.getElementById('inp_stock_price').value;  
  var newName=document.getElementById('prev_photo_stock').getAttribute('data-img');
  var photo=document.getElementById('prev_photo_stock').src;

  if(newName==JBE_DEF_IMG){ MSG_SHOW(vbOk,"ERROR:","Please select an Item Image...",function(){},function(){}); 
    return;
  }
  
  if(stockname==''){ MSG_SHOW(vbOk,"ERROR:","Please enter Item Name...",function(){},function(){}); 
    return;
  }
  if(descrp==''){ MSG_SHOW(vbOk,"ERROR:","Please enter Item Description...",function(){},function(){}); 
    return;
  }  

  if(catno==''){ MSG_SHOW(vbOk,"ERROR:","Please select a Category...",function(){},function(){}); 
    return;
  }

  if(vmode==1){  
    var req=2;     
  }else if(vmode==2){
    var req=3;   
  }
   
  if(thisFile != undefined){
    newName = stockno+'.jpg';
  } 

  var orient=getImgOrient('prev_photo_stock');
  var targetDIR=JBE_API+'app/'+CURR_SITE+'/upload/';
  showProgress(true);
  axios.post(JBE_API+'z_stock.php', { clientno:CURR_CLIENT, request:req,    
    stockname: stockname,
    descrp: descrp,
    price: jnumber(price),
    photo: nopath(newName),
    orient: orient,
    catno: catno,
    stockno: stockno
  },JBE_HEADER)
  .then(function (response) {     
    console.log(response.data); 
    //alert(response.data);
    DB_STOCK=response.data;    
    showProgress(false);    

    //alert(photo);

 
    if(document.getElementById('div_sel_cat').value=='ALL'){
        dispAllStocks('ALL');
    }else{
        dispAllStocks(catno);       
        document.getElementById('div_sel_cat').value=catno;
    }        
     
    if(thisFile){
      let ob = [
        { "div":"photo_stock_"+stockno }
      ];
      
      uploadNOW(thisFile,newName,targetDIR,ob);  
      showItems();
    }
    
    document.getElementById('stockname_stock_'+stockno).innerHTML=stockname;
    document.getElementById('price_stock_'+stockno).innerHTML=formatNumber2(jnumber(price));
    
    JBE_CLOSEBOX();
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}

function delStock(){  
  var stockno=document.getElementById('div_main_stock').getAttribute('data-stockno');
  var catno_first=document.getElementById('div_sel_cat').value;  
  var photo=JBE_GETFLD('photo',DB_STOCK,'stockno',stockno);  
  //var dir=JBE_API+'app/'+CURR_SITE+'/upload/';
  var ddir='app/'+CURR_SITE+'/upload/';
  
  MSG_SHOW(vbYesNo,"CONFIRM: ","Are you sure to Delete this Stock?",function(){
    showProgress(true);  
    axios.post(JBE_API+'z_stock.php', { clientno:CURR_CLIENT, request: 4,    
      photo:photo,    
      stockno: stockno,
      ddir:ddir
    },JBE_HEADER)
    .then(function (response) {     
      console.log(response.data); 
      DB_STOCK=response.data;  
      JBE_CLOSEBOX();
      showProgress(false);      
      dispAllStocks(catno_first);    
    })    
    .catch(function (error) { console.log(error); showProgress(false); });
  },function(){return;});  
}