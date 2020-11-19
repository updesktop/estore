function fm_category(){   
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
  
  
  var dtl='<div id="div_cat" style="width:100%;height:100%;border:1px solid black;overflow:auto;background:white;"></div>';
  openView(dtl,'Category Maintenance','close_cat');
  dispAllCategory();
  //showMenu('mnu_cat');
  mnu_cat(); 
}

function close_cat(){    
  showMainPage();
  showCategories();
}

function mnu_cat(){
  var jmenu=
    '<div style="width:100%;height:100%;background:none;">'+
      '<div onclick="add_edit_cat(1,&quot;&quot;)" style="float:left;width:auto;height:100%;color:'+JBE_TXCLOR1+';background: none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jadd.png"  style="height:100%;" alt="add cat image" />'+
        '</div>'+
        '<span class="footer_fonts">Add Category</span>'+        
      '</div>'+
    '</div>';
  dispMenu(false,jmenu);  
}
function mnu_cat_add(){
  var jmenu=
    '<div style="width:100%;height:100%;background:none;">'+
      '<div onclick="saveCatRec()" style="float:left;width:25%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jsave.png"  style="height:100%;" alt="save image" />'+
        '</div>'+
        '<span class="footer_fonts">Save</span>'+
      '</div>'+
      
      '<div id="btn_cat2_dele" onclick="delCat()" style="float:left;width:25%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jdele.png"  style="height:100%;" alt="del image" />'+
        '</div>'+
        '<span class="footer_fonts">Delete</span>'+
      '</div>'+      
    '</div>';
  dispMenu(false,jmenu);  
}


function dispAllCategory(){
  //alert('dispAllCategory');
  var m=0;
  if(!JBE_ONLINE){ m=1; }  
  var n = new Date().toLocaleTimeString('it-IT');
  var cat=DB_CAT; 
  cat.sort(sortByMultipleKey(['descrp']));      
  var dtl=''  
  for(i=0;i<cat.length;i++){       
    var v_mcode=cat[i]['catno'];    
    var v_mname=cat[i]['descrp']; 
    //var v_mphoto=cat[i]['photo'];  
    //var dir_gfx=JBE_API+'app/'+CURR_SITE+'/gfx/';
    if(m==0){
      var v_mphoto=JBE_API+'app/'+CURR_SITE+'/upload/'+cat[i]['photo']+'?'+n;   
    }else{
      var v_mphoto='data:image/png;base64,' + btoa(cat[i]['photo']);
    }
    //alert((i+1)+' photo: '+v_mphoto);

    dtl=dtl+      
      '<div id="dac_cat_'+v_mcode+'" class="class_items" onclick="selectRow(&quot;dac_cat_'+v_mcode+'&quot;,&quot;class_items&quot;);add_edit_cat(2,&quot;'+v_mcode+'&quot;)">'+
        '<div style="position:relative;height:75%;width:100%;border-radius:10px;border:1px solid lightgray;background:none;">'+
          '<div class="class_center_div">'+
            '<img id="photo_cat_'+v_mcode+'" src="'+v_mphoto+'" onerror="imgOnError(this)" alt="category image" style="height:auto;max-height:100%;width:auto;max-width:100%;background:none;"/>'+            
          '</div>'+
        '</div>'+
        '<div id="descrp_cat_'+v_mcode+'" style="width:100%;height:25%;font-size:11px;color:black;overflow:auto;background:none;">'+v_mname+'</div>'+        
      '</div>';  
  }  
  
  document.getElementById("div_cat").innerHTML=dtl;
}

function add_edit_cat(m,c){ 
  var n = new Date().toLocaleTimeString('it-IT'); 
  thisFile=null;
  
  var catno=(new Date()).toISOString().slice(0, 19);      
    catno = 'C_'+catno.replace(/-/g, "").replace(/:/g, "").replace("T", "-");    
    //alert(catno);
/*
  var vDate=new Date();  
  var vTime = vDate.toLocaleTimeString('it-IT'); 
  vDate = new Date(vDate.getTime() - (vDate.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];  
  catno='C_'+vDate+'_'+vTime;  
  catno = catno.replace(/-/g, "").replace(/:/g, "").replace("T", "-");    
  alert(catno);
*/

  var descrp='';  
  var photo=JBE_DEF_IMG;
  var cap_img='ADD CATEGORY RECORD';

  if(m==2){    
    catno=c;  
    descrp=document.getElementById('descrp_cat_'+catno).innerHTML;
    photo=document.getElementById('photo_cat_'+catno).src;
    cap_img='EDIT CATEGORY RECORD';
  }  
  
  var dtl=    
    '<div id="div_main_cat" data-new=0 data-catno="" data-img="" style="width:100%;height:200px;padding:0px;background:none;">'+
      
      '<div style="width:100%;height:100%;margin-top:0px;background:none;">'+
      
        '<div style="float:left;width:49%;height:100%;border:1px solid gray;text-align:center;background:none;">'+

          '<div style="width:100%;height:15%;text-align:center;padding:4px;color:white;background:'+JBE_CLOR2+';">'+
            'Image'+
          '</div>'+
          '<div style="position:relative;width:100%;height:69%;text-align:center;background:white;">'+
            '<div class="class_center_div">'+
              '<img id="prev_photo_cat" name="prev_photo_cat" data-img="'+photo+'" alt="cat image" src="'+photo+'" style="height:auto;max-height:100%;width:auto;max-width:100%;" />'+
            '</div>'+   
          '</div>'+
          '<div style="width:100%;height:15%;text-align:center;padding:2px;background:none;">'+
            '<input type="file" id="id_file_cat" data-sel=0 name="id_file_cat" hidden="hidden" />'+                    
            '<button type="button" onclick="JBE_PICK_IMAGE(0,id_file_cat.id,prev_photo_cat.id)" id="custom_button_c2" style="width:100px;height:100%;text-align:center;border-radius:10px;border:1px solid black;color:'+JBE_TXCLOR2+';background:'+JBE_CLOR2+';">'+
              'Browse'+
            '</button>'+          
          '</div>'+

        '</div>'+

        '<div style="float:right;width:49%;height:100%;border:1px solid gray;background:none;">'+
          '<div style="width:100%;height:15%;text-align:center;padding:4px;color:white;background:'+JBE_CLOR2+';">'+
            'Description'+
          '</div>'+
          '<div style="width:100%;height:85%;text-align:center;padding:5px;background:none;">'+
            '<textarea id="inp_cat_descrp" name="inp_cat_descrp" rows="4" cols="50" class="fld_imsg_input" placeholder="Type the description here..."'+
              'style="float:left;resize:none;height:100%;width:100%;font-size:14px;padding:1%;border:1px solid lightgray;'+
                'height:100%;text-align:left;color:black;background-color:white;">'+descrp+'</textarea>'+
          '</div>'+
        '</div>'+

      '</div>'+
  
    '</div>'; 
  var dtl2=
    '<div style="width:100%;height:100%;padding:0px;background:none;">'+
      '<div onclick="saveCatRec()" style="float:left;width:25%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jsave.png"  style="height:100%;" alt="save image" />'+
        '</div>'+
        '<span class="footer_fonts">Save</span>'+
      '</div>'+
      
      '<div id="btn_cat2_dele" onclick="delCat()" style="float:left;width:25%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jdele.png"  style="height:100%;" alt="del image" />'+
        '</div>'+
        '<span class="footer_fonts">Delete</span>'+
      '</div>'+      
    '</div>';
    
  JBE_OPENBOX('div_main_cat',cap_img,dtl,dtl2);
  document.getElementById('div_main_cat').setAttribute('data-new',m);
  document.getElementById('div_main_cat').setAttribute('data-catno',catno);
  document.getElementById('div_main_cat').setAttribute('data-img',photo);  
}
function close_add_edit_cat(){ 
  //showMenu('mnu_cat'); 
  mnu_cat();
}

function saveCatRec(){    
  //alert('goint to save category');
  //alert(document.getElementById('prev_photo_cat').src);
  if(!JBE_ONLINE) { 
    snackBar('OFFLINE');
    return;
  }
  var n=new Date().toLocaleTimeString('it-IT');
  var vmode=parseInt(document.getElementById('div_main_cat').getAttribute('data-new'));
  var catno=document.getElementById('div_main_cat').getAttribute('data-catno');  
  var descrp=document.getElementById('inp_cat_descrp').value;    
  var newName=document.getElementById('prev_photo_cat').getAttribute('data-img'); 
  var photo=document.getElementById('prev_photo_cat').src;
  //alert(photo);
  //var newName=photo;

  if(photo==JBE_DEF_IMG){ MSG_SHOW(vbOk,"ERROR:","Please select an Item Image...",function(){},function(){}); 
    return;
  }
  if(descrp==''){ MSG_SHOW(vbOk,"ERROR:","Please enter Item Description...",function(){},function(){}); 
    return;
  }

  if(vmode==1){  
    var req=2;
  }else{
    var req=3;   
  }    
    
  showProgress(true);  
  
  if(thisFile){      
    newName = catno+'.jpg';      
  }  

  if(THISFILE[0]){      
    newName = catno+'.jpg';      
  }
    
  var orient=getImgOrient('prev_photo_cat');  
  var targetDIR=JBE_API+'app/'+CURR_SITE+'/upload/';
  //alert(targetDIR);
  
  axios.post(JBE_API+'z_cat.php', { clientno:CURR_CLIENT, request: req,    
    descrp: descrp,    
    photo: nopath(newName),
    orient: orient,
    catno: catno
  },JBE_HEADER)
  .then(function (response) {     
    //alert('save cat: '+response.data.length); 
    DB_CAT=response.data;
    showProgress(false);    

    //alert(photo);
    
    if(req==3){ //edit   
      //document.getElementById('photo_cat_'+catno).src=photo;
      //document.getElementById('descrp_cat_'+catno).innerHTML=descrp;      
    }     
    if(THISFILE[0]){
      let ob = [
        { "div":"photo_cat_"+catno }
      ];
      //var v_mphoto='../../app/'+CURR_SITE+'/upload/'+cat[i]['photo']+'?'+n;   
      uploadNOW(THISFILE[0],newName,targetDIR,ob); 
      showCategories();
    }      
    if(req==2){ //add      
      dispAllCategory();        
    }else{
      document.getElementById('descrp_cat_'+catno).innerHTML=descrp;      
    }

    JBE_CLOSEBOX();
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}

function delCat(){  
  var catno=document.getElementById('div_main_cat').getAttribute('data-catno');    
  var photo=JBE_GETFLD('photo',DB_CAT,'catno',catno);
  var vdel='';
  var ctr=0;  
  for(var i=0;i<DB_STOCK.length;i++){            
    if(catno != DB_STOCK[i]['catno']){ continue; }
    ctr++;
  }
  
  if(ctr>0){
    var v_is='is';
    var v_rec='Record';
    if(ctr>1){ 
      v_is='are'; 
      v_rec='Records';
    }
    vdel='There '+v_is+' '+ctr+' '+v_rec+' associated with this Category.<br><br>';  
  }
  if(vdel != ''){
    MSG_SHOW(vbOk,"ACCESS DENIED: ",vdel,function(){},function(){}); 
    return;
  }
  
  //var v_banner=JBE_API+'app/'+CURR_SITE+'/gfx/banner.jpg?'+n;  
  //var ddir='app/'+CURR_SITE+'/upload/';
  var ddir=JBE_API+'app/'+CURR_SITE+'/upload/';
  var delfle=JBE_API+'app/'+CURR_SITE+'/upload/'+photo;
  alert(delfle);
  MSG_SHOW(vbYesNo,"CONFIRM: ",vdel+"Are you sure to Delete this Record?",function(){
    showProgress(true);      
    axios.post(JBE_API+'z_cat.php', { clientno:CURR_CLIENT, request: 4,    
      photo:photo,    
      catno:catno,
      ddir:ddir,
      delfle:delfle
    },JBE_HEADER)
    .then(function (response) {     
      console.log(response.data); 
      alert(response.data); 
      DB_CAT=response.data;    
      JBE_CLOSEBOX();
      //fm_stock('ALL');
      showProgress(false);              
      
      dispAllCategory();
      get_db_cat();
    })    
    .catch(function (error) { console.log(error); showProgress(false); });
  },function(){return;});  
}