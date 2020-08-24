function fm_system(){
  if(CURR_AXTYPE < 4){
    snackBar('Access Denied');
    return; 
  }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  //showMenu('mnu_system');
  mnu_system();

  var n = new Date().toLocaleTimeString('it-IT');   
  var aryDB=JBE_GETARRY(DB_SYS,'clientno',CURR_CLIENT);
  var vbanner=JBE_API+'app/'+CURR_SITE+'/gfx/banner.jpg?'+n;
  //var dir_gfx=JBE_API+'app/'+CURR_SITE+'/gfx/';

  //var store_name=aryDB['clientname'];
  //var store_site=aryDB['tag'];
  
  var dtl=
    '<div id="scroll_sys_items" style="width:100%;height:100%;overflow-x:hidden;overflow-y:auto;padding:5px;background:white;">'+  

        '<div style="width:100%;height:auto;font-size:12px;font-weight:bold;color:black;  overflow-x:hidden;overflow-y:auto;margin-top:2%;border-radius:8px;border:1px solid gray;padding:5px;background:none;">'+
	          '<div style="width:100%;height:15px;text-align:center;">SYSTEM BANNER</div>'+
            '<div style="display:block;overflow:hidden;position:relative;height:60px;width:100%;text-align:center;margin-top:2px;border:1px solid black;padding:2px;background:none;">'+
		          '<img id="sys_banner" src="'+vbanner+'" name="sys_banner" data-img="" data-thisFile="" style="height:auto;max-height:100%;width:auto;max-width:100%;" />'+
                            
              '<div style="position:absolute;top:5%;left:75%;border-radius:50%;border:1px solid black;height:40px;width:40px;padding:3px;background:darkgray;">'+          
                  '<input type="file" id="id_file_banner" data-sel=0 name="id_file_banner" hidden="hidden" />'+                    
                  '<img src="../../main_gfx/jcam.png" onclick="JBE_PICK_IMAGE(id_file_banner.id,sys_banner.id,&quot;&quot;)" style="width:95%;"/>'+
              '</div>'+
	          '</div>'+        
	       '<div style="width:100%;height:auto;font-size:12px;font-weight:bold;text-align:center;color:navy;">Dimension: (800 x 72) pixel, Res: 72 pixel/inch </div>'+
      '</div>'+
   
      '<div style="width:100%;height:auto;font-size:12px;font-weight:bold;color:black;  overflow-x:hidden;overflow-y:auto;margin-top:2%;border-radius:8px;border:1px solid gray;padding:5px;background:none;">'+
        '<div style="width:100%;height:15px;text-align:center;">SYSTEM DETAILS</div>'+
        '<div style="height:20px;width:100%;padding:2px;background:none;">'+
          '<div style="float:left;width:100px;height:100%;background:none;">Name of Store</div><input class="class_input" id="iname" type="text" style="float:left;height:100%;width:60%;padding:2px;" value="'+aryDB['clientname']+'" />'+
        '</div>'+
        '<div style="height:20px;width:100%;padding:2px;background:none;">'+
          '<div style="float:left;width:100px;height:100%;background:none;">Site / Domain</div><input class="class_input" id="isite" disabled type="text" style="float:left;height:100%;width:60%;padding:2px;" value="'+aryDB['site']+'" />'+
        '</div>'+
      '</div>'+
            
      '<div style="width:100%;height:auto;overflow-x:hidden;overflow-y:auto;margin-top:2%;border-radius:8px;border:1px solid gray;padding:5px;background:none;">'+
        
        '<div style="width:100%;height:20px;text-align:center;">'+
          '<button onclick="btn_slider(-1,div_sel_slider.value)" class="cls_button_round" style="float:left;width:10%;height:20px;">&#8612;</button>'+
          '<div style="float:left;width:80%;height:20px;text-align:center;font-size:12px;font-weight:bold;color:black;background:none;">Slide Images '+
            '<span>'+
              '<select id="div_sel_slider" name="div_sel_slider" class="cls_button_round" onchange="kitsBanner(this.value)" style="height:100%;">'+           
              '</select>'+
            '</span>'+
          '</div>'+   
          '<button onclick="btn_slider(1,div_sel_slider.value)" class="cls_button_round" style="float:right;width:10%;height:20px;">&#8614;</button>'+
        '</div>'+
        
        '<div style="display:block;position:relative;height:50px;width:100%;text-align:center;margin-top:2px;border:1px solid black;padding:2px;background:none;">'+
          '<img id="sys_slider" src="" name="sys_slider" data-img="" data-thisFile="" style="height:100%;width:auto;max-width:100%;" />'+
             
          '<div style="position:absolute;top:5%;left:75%;border-radius:50%;border:1px solid black;height:40px;width:40px;padding:3px;background:darkgray;">'+          
            '<input type="file" id="id_file_slider" data-sel=0 name="id_file_slider" hidden="hidden" />'+                    
            '<img src="../../main_gfx/jcam.png" onclick="JBE_PICK_IMAGE(id_file_slider.id,sys_slider.id,&quot;cb_save&quot;)" style="width:95%;"/>'+
          '</div>'+
        '</div>'+
        
        '<div style="width:100%;height:auto;font-size:12px;font-weight:bold;text-align:center;color:navy;">Dimension: (800 x 120) pixel, Res: 72 pixel/inch </div>'+
      '</div>'+

      '<div style="width:100%;height:auto;overflow-x:hidden;overflow-y:auto;margin-top:2%;border-radius:8px;border:1px solid gray;padding:5px;background:none;">'+
        '<div style="width:100%;height:15px;text-align:center;font-size:12px;font-weight:bold;color:black;">EDIT PAGE CONTENTS</div>';
        let aryCont=["Promo","Category","Item"]
        for(i=0;i<3;i++){           
          var v_code=i+1;
          var v_descrp=aryDB['hd'+(i+1)];     
          dtl=dtl+      
            '<div style="width:100%;height:50px;padding:5px;border:1px solid gray;margin-top:3px;border-radius:8px;background:white;">'+
              '<div style="height:40%;width:100%;font-size:12px;font-weight:bold;color:black;">'+aryCont[i]+' Content </div>'+
              '<input class="class_input" id="inp_'+v_code+'" type="text" style="height:50%;width:100%;padding:2px;" value="'+v_descrp+'" />'+
            '</div>';      
        }  
    dtl+='</div>';   
    dtl+=
      '<div style="width:100%;height:auto;overflow-x:hidden;overflow-y:auto;margin-top:2%;border-radius:8px;border:1px solid gray;padding:5px;background:none;">'+
        '<div style="width:100%;height:15px;font-size:12px;font-weight:bold;color:black;">EDIT Company Title</div>'+
        '<input class="class_input" id="inp_title" type="text" style="height:20px;width:100%;text-align:center;padding:2px;" placeholder="Page Title..." value="'+aryDB['pg_title']+'" />'+

        '<div style="width:100%;height:15px;font-size:12px;font-weight:bold;margin-top:2%;color:black;">EDIT Company Description</div>'+
          '<textarea id="inp_body" name="inp_body" rows="4" cols="50" placeholder="Page Body..."'+
            'class="class_input" style="float:left;resize:none;height:100%;width:100%;padding:1%;border:1px solid lightgray;'+
              'height:100%;">'+aryDB['pg_body']+'</textarea>'+
      '</div>'+

      '<div style="width:100%;height:auto;margin-top:2%;border-radius:8px;border:1px solid gray;padding:5px;background:none;">'+
        '<div style="width:100%;height:15px;text-align:center;font-size:12px;font-weight:bold;color:black;">EDIT SYSTEM COLORS</div>'+

        '<div style="width:90%;height:70px;font-size:12px;margin-top:5px;padding:5px;border:1px solid lightgray;margin-left:5%;margin-right:5%;background:none;">'+

          '<div style="float:left;width:50%;margin-top:5px;padding:0 0 0 0px;">'+            
            '<input style="width:25px;" type="color" id="sys_txclor1" name="sys_txclor1" value="'+JBE_TXCLOR1+'">'+
            '<input style="width:25px;" type="color" id="sys_clor1" name="sys_clor1" value="'+JBE_CLOR+'">'+            
            '<label for="sys_clor1"> Main Color </label>'+
          '</div>'+      
          '<div style="float:left;width:50%;margin-top:5px;padding:0 0 0 0px;">'+
            '<input style="width:25px;" type="color" id="sys_txclor2" name="sys_txclor2" value="'+JBE_TXCLOR2+'">'+
            '<input style="width:25px;" type="color" id="sys_clor2" name="sys_clor2" value="'+JBE_CLOR2+'">'+
            '<label for="sys_clor2"> Content Bar </label>'+
          '</div>'+    
          '<div style="float:left;width:50%;margin-top:5px;padding:0 0 0 0px;">'+
            '<input style="width:25px;" type="color" id="sys_txclor3" name="sys_txclor3" value="'+JBE_TXCLOR3+'">'+
            '<input style="width:25px;" type="color" id="sys_clor3" name="sys_clor3" value="'+JBE_CLOR3+'">'+
            '<label for="sys_clor3"> Header </label>'+
          '</div>'+
          '<div style="float:left;width:50%;margin-top:5px;padding:0 0 0 0px;">'+
            '<input style="width:25px;" type="color" id="sys_txclor4" name="sys_txclor4" value="'+JBE_TXCLOR4+'">'+
            '<input style="width:25px;" type="color" id="sys_clor4" name="sys_clor4" value="'+JBE_CLOR4+'">'+
            '<label for="sys_clor4"> Notifications </label>'+
          '</div>'+
        '</div>'+
        
      '</div>';
    
  dtl=dtl+'</div>';
  openView(dtl,'Edit System View','close_system');
  
  var newOptionsHtml0 = "";
  var bnr = DB_SLIDER;  
  
  for(var i=0;i<bnr.length;i++){  
    var v_mcode=i;
    var v_mname=bnr[i];    
    newOptionsHtml0=newOptionsHtml0+"<option value='"+v_mcode+"'>"+v_mname+"</option>";   
  }  
  document.getElementById('div_sel_slider').innerHTML=newOptionsHtml0;   
  document.getElementById('div_sel_slider').value=0;
  kitsBanner(0);    
}
function close_system(){
  //alert('header closing');
  showMainPage();
}

function cb_save(img){
  //alert('ep '+img);
  var v=parseInt(document.getElementById('div_sel_slider').value);
  DB_SLIDER[v]=img;
}
function btn_slider(m,v){
  //alert(v);
  if(m<0){
    v--;
    if(v<0){ v=DB_SLIDER.length-1; }
  }else{
    v++;  
    if(v>=DB_SLIDER.length){ v=0; }
  }
  //
  //alert(v);
  document.getElementById('div_sel_slider').value=v;
  kitsBanner(v);
}
function kitsBanner(v){    
  //alert('kitsbanner: '+v);
  var n = new Date().toLocaleTimeString('it-IT'); 
  var v_img=DB_SLIDER[v];
  //alert('kitsbanner: '+v_img);
  
  if(DB_SLIDER[v].substr(0,5)=='slide'){ v_img=JBE_API+'app/'+CURR_SITE+'/gfx/'+v_img+'?'+n; }
  
  //alert(v_img);
  var dv_banner=document.getElementById('sys_slider');
  dv_banner.src=v_img;
  
  var img = document.createElement('img');

  img.src=v_img;

  img.onload = function(e){
    //alert('Success!');
  };

  img.onerror = function(e) {
    //alert('ERROR!');
    v_img='../../main_gfx/jimage.png';
    dv_banner.src=v_img;
    DB_SLIDER[v]='';
  };
}

function close_img_system(){    
  //showMenu('mnu_system');
  mnu_system();
}

function mnu_system(){
  var jmenu=
    '<div style="width:100%;height:100%;color:'+JBE_TXCLOR1+';">'+
      '<div onclick="save_system()" style="float:left;width:25%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jsave.png"  style="height:100%;" alt="save image" />'+
        '</div>'+
        '<span class="footer_fonts">Save</span>'+
      '</div>'+      
      '<div id="btn_hd_cancel" onclick="closeView()" style="float:left;width:25%;height:100%;margin-left:50%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jcancel.png"  style="height:100%;" alt="del image" />'+
        '</div>'+
        '<span class="footer_fonts">Cancel</span>'+
      '</div>'+      
    '</div>';
  dispMenu(false,jmenu);  
}

function save_system(){  
  var vDate=new Date();  
  var vTime = vDate.toLocaleTimeString('it-IT'); 
  vDate = new Date(vDate.getTime() - (vDate.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];  
  var sw_version=vDate+'_'+vTime;
  sw_version = sw_version.replace(/-/g, "").replace(/:/g, "").replace("T", "-");          
  //alert(sw_version);
  var bannerImg=document.getElementById('sys_banner').src;
  var banner=DB_SLIDER;
  var arySlides=[];
  var ctr=0;
  for(var i=0;i<banner.length;i++){
    if(banner[i].substr(0,10)=='data:image'){
      var ob = {
        id:i,
        img:banner[i]
      };
      arySlides[ctr]=ob;
      ctr++;
    }
  }
  
  var iname=document.getElementById('iname').value;
    
  var v1=document.getElementById('inp_1');
  var v2=document.getElementById('inp_2');
  var v3=document.getElementById('inp_3');

  var pg_title=document.getElementById('inp_title').value;
  var pg_body=document.getElementById('inp_body').value;
  
  if(v1.value.trim().length==0) { v1.focus(); return; }
  if(v2.value.trim().length==0) { v2.focus(); return; }
  if(v3.value.trim().length==0) { v3.focus(); return; }

  JBE_CLOR=document.getElementById('sys_clor1').value;
  JBE_CLOR2=document.getElementById('sys_clor2').value;
  JBE_CLOR3=document.getElementById('sys_clor3').value;
  JBE_CLOR4=document.getElementById('sys_clor4').value;

  JBE_TXCLOR1=document.getElementById('sys_txclor1').value;
  JBE_TXCLOR2=document.getElementById('sys_txclor2').value;
  JBE_TXCLOR3=document.getElementById('sys_txclor3').value;
  JBE_TXCLOR4=document.getElementById('sys_txclor4').value;
  showProgress(true);
  axios.post(JBE_API+'z_sysfile.php', { clientno:CURR_CLIENT, request: 3,  
    keepRatio:true,  
    bannerImg:bannerImg,
    arySlides:arySlides, 
    site:CURR_SITE,
    clientname:iname,    
    hd1: v1.value,
    hd2: v2.value,
    hd3: v3.value,
    pg_title:pg_title,
    pg_body:pg_body,
    clor1:JBE_CLOR,
    clor2:JBE_CLOR2,
    clor3:JBE_CLOR3,
    clor4:JBE_CLOR4,
    txclor1:JBE_TXCLOR1,
    txclor2:JBE_TXCLOR2,
    txclor3:JBE_TXCLOR3,
    txclor4:JBE_TXCLOR4,
    sw_version:sw_version
  },JBE_HEADER)
  .then(function (response) {       
    showProgress(false);  
    console.log(response.data);     
    //alert(response.data);     
    closeView();    
    get_db_sys();
    //refreshMain();
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}

