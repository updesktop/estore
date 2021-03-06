var dbVersion = 1;
var dbReady = false;
var db;

if (navigator.storage && navigator.storage.persist)
  navigator.storage.persist().then(granted => {
    if (granted){
      //alert("Storage will not be cleared except by explicit user action");
      PERSIST_GRANTED=true;
    }else{
      //alert("Storage may be cleared by the UA under storage pressure.");
      PERSIST_GRANTED=false;
    }
  }
);

function initDb() {
  console.log('initDb activated...'+JBE_ONLINE);
  var request = indexedDB.open(CURR_IDX_DB, dbVersion);
  
  request.onerror = function(e) {    
    console.error('Unable to open database.');
  }

  request.onsuccess = function(e) {
    db = e.target.result;
    console.log('db opened');  
  }

  request.onupgradeneeded = function(e) {
    db = e.target.result;
    db.createObjectStore('Category', { keyPath:'id' });
    db.createObjectStore('Stock', { keyPath:'id' });    
    db.createObjectStore('SysFile', { keyPath:'id' });
    db.createObjectStore('User', { keyPath:'id' });    
    dbReady = true;
  }
}

function clearStore(jstore){   
  //alert(jstore);
  var request = indexedDB.open(CURR_IDX_DB, dbVersion);
  request.onerror = function(e) {    
    console.error('Unable to open database.');
  }
  request.onsuccess = function(e) {
    var db1 = e.target.result;  
    var trans = db1.transaction([jstore], 'readwrite');
    var req = trans.objectStore(jstore).clear();
  
    //alert(111);
    req.onerror = function(e) {
      console.log('error clearing storeobject');
      console.error(e);
      //alert('error');
    }

    req.onsuccess = function(e) {
      console.log('objectStore Cleared');
      //alert('success');
    }
  }
}


/****************************************/
function countRecordIDX(n){  
  var request = indexedDB.open(CURR_IDX_DB, dbVersion);
  request.onerror = function(e) {    
    console.error('Unable to open database.');
  }
  request.onsuccess = function(e) {
    var db1 = e.target.result;
    var flename=JBE_STORE_IDX[n]['flename'];   
    //alert('countRecordIDX: '+flename);
    var jstore = db1.transaction([flename]).objectStore(flename); 
    var count = jstore.count();
    count.onsuccess = function() {      
      JBE_STORE_IDX[n]['numrec']=count.result;
      console.log('countRecordIDX: '+JBE_STORE_IDX[n]['flename']+' '+count.result);
    }
  }
}

/****************************************/
function getAllDataFromIDX(vmode) {   
  //alert('getAllDataFromIDX: '+JBE_STORE_IDX.length);
  var request = indexedDB.open(CURR_IDX_DB, dbVersion);  
  request.onerror = function(e) {    
    console.error('Unable to open database.');
  }

  var ctr=0;
  request.onsuccess = function(e) {
    var db2 = e.target.result;
    for(var i=0;i < JBE_STORE_IDX.length;i++){
      //if(!vmode && JBE_STORE_IDX[i]['init'] == 0) { continue; }
      //if(parseInt(JBE_STORE_IDX[i]['init']) != vmode) { continue; }
      //alert(JBE_STORE_IDX[i]['flename']+' = '+JBE_STORE_IDX[i]['numrec']);
      //alert('i = '+i);
      getDataFromIDX(i,db2);  
      ctr++;
    }
  }
  //alert('total: '+ctr);
}  

function getDataFromIDX(i,db2) {  
  var idx=0;
  var aryIDB=[]; 
  var flename=JBE_STORE_IDX[i]['flename'];
      
  var trans = db2.transaction([flename]);
  var object_store = trans.objectStore(flename);
  var request1 = object_store.openCursor();

  request1.onerror = function(event) {
    console.err("error fetching data");
    //alert("error fetching data");
  };
  
  request1.onsuccess = function(event) {        
    var cursor = event.target.result;    
    if (cursor) {
      var key = cursor.primaryKey;
      var ob;
      if(i==0){ //Category
        ob = {
          id:idx,
          catno:cursor.value.catno,
          descrp:cursor.value.descrp,
          photo:cursor.value.photo, 
          orient:cursor.value.orient,              
          bal:cursor.value.bal
        };  
      }else if(i==1){ //Stock
        ob = {
          id:idx,
          stockno:cursor.value.stockno,
          stockname:cursor.value.stockname,
          descrp:cursor.value.descrp,
          photo:cursor.value.photo, 
          photo2:cursor.value.photo2, 
          photo3:cursor.value.photo3,
          photo4:cursor.value.photo4,
          photo5:cursor.value.photo5,
          orient:cursor.value.orient,
          catno:cursor.value.catno,
          cost:cursor.value.cost,
          price:cursor.value.price,
          bal:cursor.value.bal,
          promo:cursor.value.promo
        };        
      }else if(i==2){ //Sysfile
        ob = {
          id:i,
          banner:cursor.value.banner,
          hd1:cursor.value.hd1,
          hd2:cursor.value.hd2,
          hd3:cursor.value.hd3,
          pg_title:cursor.value.pg_title,
          pg_body:cursor.value.pg_body,
          clor1:cursor.value.clor1,
          clor2:cursor.value.clor2, 
          clor3:cursor.value.clor3,
          clor4:cursor.value.clor4,
          txclor1:cursor.value.txclor1,
          txclor2:cursor.value.txclor2, 
          txclor3:cursor.value.txclor3,
          txclor4:cursor.value.txclor4,
          telno:cursor.value.telno,
          celno:cursor.value.celno,
          slide1:cursor.value.slide1, 
          slide2:cursor.value.slide2, 
          slide3:cursor.value.slide3
        };  
      }else if(i==3){ //User
        ob = {
          id:i,
          usercode:cursor.value.usercode,
          username:cursor.value.username,            
          photo:cursor.value.photo
        };        
      }

      aryIDB[idx]=ob;    
      //if(i==2) { alert(ob.slide1); }
      idx++;
      cursor.continue();
    }else{
      if(i==0){
        DB_CAT=[]; DB_CAT=aryIDB;              
        showCategories();           
      }else if(i==1){
        DB_STOCK=[]; DB_STOCK=aryIDB;        
        showItems();        
        showPromos();           
      }else if(i==2){          
        DB_SYS=[]; DB_SYS=aryIDB;
        showSystem();
      }else if(i==3){          
        DB_USER=[]; DB_USER=aryIDB;
        showProfile(2);      
      }
      //alert(JBE_STORE_IDX[i]['flename']+aryIDB.length);
      JBE_STORE_IDX[i]['numrec']=aryIDB.length;
    }    
  }
}  

function refreshIDX(){    
  return;
  //alert('refreshIDX '+DB_SYS.length+' = '+DB_SYS[0]['clientname']);
  if(JBE_STORE_IDX[0]['numrec'] != DB_CAT.length){ clearStore(JBE_STORE_IDX[0]['flename']); saveDataToIDX(DB_CAT,0); }
  if(JBE_STORE_IDX[1]['numrec'] != DB_STOCK.length){ clearStore(JBE_STORE_IDX[1]['flename']); saveDataToIDX(DB_STOCK,1); }  
  if(JBE_STORE_IDX[2]['numrec'] != DB_SYS.length){ clearStore(JBE_STORE_IDX[2]['flename']); saveDataToIDX(DB_SYS,2); }
  if(JBE_STORE_IDX[3]['numrec'] != DB_USER.length){ clearStore(JBE_STORE_IDX[3]['flename']); saveDataToIDX(DB_USER,3); }         
  //jdata();  
}

function jdata(){
  //if(CURR_AXTYPE < 9){ return; }
  var jd=
    'From IDX '+JBE_STORE_IDX[0]['flename']+' : '+JBE_STORE_IDX[0]['numrec']+' vs '+DB_CAT.length+' Array<br>'+
    'From IDX '+JBE_STORE_IDX[1]['flename']+' : '+JBE_STORE_IDX[1]['numrec']+' vs '+DB_STOCK.length+' Array<br>'+
    'From IDX '+JBE_STORE_IDX[2]['flename']+' : '+JBE_STORE_IDX[2]['numrec']+' vs '+DB_SYS.length+' Array<br>'+
    'From Array CLIENTS '+DB_CLIENTS.length+' Array<br>'+
    'From Array BELLS '+DB_BELL.length+' Array<br>'+
    'From IDX '+JBE_STORE_IDX[3]['flename']+' : '+JBE_STORE_IDX[3]['numrec']+' vs '+DB_USER.length+' Array';

  MSG_SHOW(vbOk,"DATA:",jd,function(){},function(){}); 
}

function saveDataToIDX(aryDB,n) {    
  //alert('saveDataToIDX '+n);
  JBE_STORE_IDX[n]['numrec']=aryDB.length;
  for(var i=0;i<aryDB.length;i++){     
    if(aryDB[i]['clientno']!=CURR_CLIENT){ continue; }
    putDataToIDX(i,aryDB,n);
  }
}
async function putDataToIDX(i,aryDB,n){   
  //alert('i: '+i+' file#:'+n);
  if(n==0){    
    var jimg=JBE_API+'app/'+CURR_SITE+'/upload/'+aryDB[i]['photo'];   
    await JBE_BLOB(n,jimg).then(result => jimg=result);
    ob = { //categorgy
      id:i,
      catno:aryDB[i]['catno'],
      descrp:aryDB[i]['descrp'],
      photo:jimg,
      orient:aryDB[i]['orient'],
      bal:aryDB[i]['bal'],            
    };
  }else if(n==1){ //stock
    var jimg=JBE_API+'app/'+CURR_SITE+'/upload/'+aryDB[i]['photo'];   
    await JBE_BLOB(n,jimg).then(result => jimg=result);
    //alert('stock: '+jimg);
    
    var photo2=JBE_API+'app/'+CURR_SITE+'/upload/'+aryDB[i]['photo2'];  
    if(aryDB[i]['photo2']!=''){      
      await JBE_BLOB(n,photo2).then(result => photo2=result);
    }else{
      photo2='';
    }

    var photo3=JBE_API+'app/'+CURR_SITE+'/upload/'+aryDB[i]['photo3'];   
    if(aryDB[i]['photo3']!=''){    
      await JBE_BLOB(n,photo3).then(result => photo3=result);
    }else{
      photo3='';
    }

    var photo4=JBE_API+'app/'+CURR_SITE+'/upload/'+aryDB[i]['photo4'];   
    if(aryDB[i]['photo4']!=''){    
      await JBE_BLOB(n,photo4).then(result => photo4=result);
    }else{
      photo4='';
    }

    var photo5=JBE_API+'app/'+CURR_SITE+'/upload/'+aryDB[i]['photo5'];   
    if(aryDB[i]['photo5']!=''){  
      await JBE_BLOB(n,photo5).then(result => photo5=result);
    }else{
      photo5='';
    }
    
    ob = {
      id:i,
      stockno:aryDB[i]['stockno'],
      stockname:aryDB[i]['stockname'],
      descrp:aryDB[i]['descrp'],
      photo:jimg,
      photo2:photo2,
      photo3:photo3,
      photo4:photo4,
      photo5:photo5,
      orient:aryDB[i]['orient'],
      catno:aryDB[i]['catno'],
      cost:aryDB[i]['cost'],
      price:aryDB[i]['price'],
      bal:aryDB[i]['bal'],
      promo:aryDB[i]['promo']
    };        
    /*
    var v_mcode=aryDB[i]['stockno'];    
    var v_mname=aryDB[i]['stockname']; 
    var v_mprice=aryDB[i]['price']; 
    var v_mphoto=jimg;

    v_mphoto='data:image/png;base64,' + btoa(v_mphoto);
    */

    /*
    var debug_dtl=
        '<div id="dd_code'+v_mcode+'" style="margin:1%;width:98%;height:110px;border:1px solid black;background:white;">'+
          '<div id="dd_code'+v_mcode+'" style="width:100%;height:20px;">'+v_mcode+'</div>'+
          '<div id="dd_name'+v_mcode+'" style="width:100%;height:20px;">'+v_mname+'</div>'+
          '<img id="dd_img'+v_mcode+'" src="'+v_mphoto+'" style="width:auto;height:60px;"/>'+
        '</div>';
    document.getElementById('jdebug_dtl').innerHTML+=debug_dtl;
    */

  }else if(n==2){ //sysfile
    var jimg=JBE_API+'app/'+CURR_SITE+'/gfx/banner.jpg';
    //var jimg='gfx/banner.jpg';
    await JBE_BLOB(n,jimg).then(result => jimg=result);
    var slide1,slide2,slide3; 
    //var jimg2='gfx/'; 
    var jimg2=JBE_API+'app/'+CURR_SITE+'/gfx/';
    //var jimg2=JBE_API+'app/'+CURR_SITE+'/gfx/';
    await JBE_BLOB(n,jimg2+'slide1.jpg').then(result => slide1=result);
    await JBE_BLOB(n,jimg2+'slide2.jpg').then(result => slide2=result);
    await JBE_BLOB(n,jimg2+'slide3.jpg').then(result => slide3=result);
    ob = {
      id:i,
      banner:jimg,
      hd1:aryDB[i]['hd1'],
      hd2:aryDB[i]['hd2'],
      hd3:aryDB[i]['hd3'],              
      pg_title:aryDB[i]['pg_title'],
      pg_body:aryDB[i]['pg_body'],
      clor1:aryDB[i]['clor1'],
      clor2:aryDB[i]['clor2'],
      clor3:aryDB[i]['clor3'],
      clor4:aryDB[i]['clor4'],
      txclor1:aryDB[i]['txclor1'],
      txclor2:aryDB[i]['txclor2'],
      txclor3:aryDB[i]['txclor3'],
      txclor4:aryDB[i]['txclor4'],
      telno:aryDB[i]['telno'],
      celno:aryDB[i]['celno'],
      slide1:slide1,
      slide2:slide2,
      slide3:slide3
    };  
  }else if(n==3){ //user
    //var jimg='upload/users/'+aryDB[i]['photo'];
    var jimg=JBE_API+'app/'+CURR_SITE+'/upload/users/'+aryDB[i]['photo'];   
    await JBE_BLOB(n,jimg).then(result => jimg=result);
    ob = {
      id:i,
      usercode:aryDB[i]['usercode'],
      username:aryDB[i]['username'],            
      photo:jimg
    };
  }

  var trans = db.transaction([JBE_STORE_IDX[n]['flename']], 'readwrite');
  var addReq = trans.objectStore(JBE_STORE_IDX[n]['flename']).put(ob);
  addReq.onerror = function(e) {
    //console.log('error storing data');
    console.log('ERROR: putToIDX '+JBE_STORE_IDX[n]['flename']);
    console.error(e);
  }

  trans.oncomplete = function(e) {
    //alert(n+': putToIDX '+JBE_STORE_IDX[n]['flename']+' with value '+JBE_STORE_IDX[n]['numrec']);  
    //alert(xox);
  }
}
