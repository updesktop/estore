function writeAllToIDX(aryDB,n) {    
  //alert(n);
  console.log('Saving File '+MAIN_STORE_IDX[n]['flename']+' == '+aryDB.length);
  MAIN_STORE_IDX[n]['numrec']=aryDB.length;
  for(var i=0;i<aryDB.length;i++){    
    writeToIDX(i,aryDB,n);
  }
}
function writeToIDX(i,aryDB,n){
  var dir='site/'+aryDB[i]['site']+'/gfx/';
  var jimg=dir+aryDB[i]['logo'];
  var canvas = document.createElement("canvas");
  const context = canvas.getContext('2d');
  var img = new Image();
  img.src=jimg;
  
  img.onload = function() {
    canvas.width=img.width;
    canvas.height=img.height;
    context.drawImage(img, 0, 0);
    
    canvas.toBlob(function (blob) {        // get content as JPEG blob      
      var reader = new FileReader();
      reader.readAsBinaryString(blob);
      reader.onload = function(e) {    
        var bits = e.target.result;
        var ob;     

        //sysfile
        ob = {
          id:i,
          logo:bits,
          clientno:aryDB[i]['clientno'],
          appname:aryDB[i]['appname'],
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
          txclor4:aryDB[i]['txclor4']
        };            

        var trans = db.transaction([MAIN_STORE_IDX[n]['flename']], 'readwrite');
        var addReq = trans.objectStore(MAIN_STORE_IDX[n]['flename']).put(ob);
        addReq.onerror = function(e) {
          //console.log('error storing data');
          console.log('ERROR: putToIDX '+MAIN_STORE_IDX[n]['flename']);
          console.error(e);
        }

        trans.oncomplete = function(e) {
          console.log('putToIDX '+MAIN_STORE_IDX[n]['flename']);  
        }
      }
      
    }); 
  }  
}


function readAllFromIDX() {   
  var request = indexedDB.open(CURR_IDX_DB, dbVersion);  
  request.onerror = function(e) {    
    console.error('Unable to open database.');
  }

  var ctr=0;
  request.onsuccess = function(e) {
    var db2 = e.target.result;
    readFromIDX(0,db2);  
  }
}  

function readFromIDX(i,db2) {  
  var idx=0;
  var aryIDB=[]; 
  var flename=MAIN_STORE_IDX[i]['flename'];
      
  var trans = db2.transaction([flename]);
  var object_store = trans.objectStore(flename);
  var request1 = object_store.openCursor();

  request1.onerror = function(event) {
    console.err("error fetching data");
  };
  
  request1.onsuccess = function(event) {        
    var cursor = event.target.result;    
    if (cursor) {
      var key = cursor.primaryKey;
      var ob;
       //Sysfile
      ob = {
        id:i,
        logo:cursor.value.logo,
        clientno:cursor.value.clientno,
        appname:cursor.value.appname,
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
        txclor4:cursor.value.txclor4
      };        
      aryIDB[idx]=ob;                
      idx++;
      cursor.continue();
    }else{             
      DB_SYS=[]; DB_SYS=aryIDB;
      dispClients();
      MAIN_STORE_IDX[i]['numrec']=aryIDB.length;
    }    
  }
}  
  