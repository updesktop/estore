var JLAT=0; var JLNG=0; 
var CURR_TAG='';
var F_LIVE=false;
var map;

var current_accuracy;
var timeSpeed;

var searchMarker;  
var seekerMarker;  
var layerGroup;
var f_route=false;
var marker_client;
var marker_me;
var marker_polyline;
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
    mqi = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']});            
  
//memberClusters = L.markerClusterGroup();  
var memberClusters = L.featureGroup();


function showMap(vmode,usercode){   
//alert(vmode); 
	var p1=1;
    var p2=1;
	if(vmode==0){
        p1=document.getElementById('div_sel_client').value;
        p2=document.getElementById('div_sel_orders').value;
    }
  
  if(!JBE_ONLINE){
    snackBar('OFFLINE');
    return;
  }    
  //getCurrPos();
  var dtl='';
  var dtl2='';
  dtl=
    '<div id="div_showmap" data-vmode='+vmode+' data-p1="'+p1+'" data-p2='+p2+' data-usercode="'+usercode+'" data-zoom=0 style="width:100%;height:100%;text-align:left;padding:0px;background-color:lightgray;">'+
      '<div id="theMap" style="position:relative;width:100%;height:100%;border:0px solid red;background-color:none;">'+
        '<div id="dsboard" style="display:none;position:absolute;z-index:1450;width:150px;height:45px;right:60px;bottom:2px;border-radius:5px;opacity:0.7;background:white;"></div>'+        
        '<div id="dsboard2" style="display:none;position:absolute;z-index:1455;width:150px;height:45px;right:60px;bottom:2px;border-radius:5px;border:2px solid black;font-size:14px;text-align:center;color:red;background:none;">'+
                '<div style="height:50%;padding:0px;background:none;">Distance: <span id="divDistance" style="font-weight:bold;"></span> Km.</div>'+
                '<div style="height:50%;padding:0px;background:none;">Speed: <span id="divSpeed" style="font-weight:bold;"></span> </div>'+
        '</div>'+        
        '<div  style="display:block;position:absolute;z-index:1500;width:110px;height:45px;right:6px;bottom:2px;background:none;">'+        
            '<button id="btnLive" class="cls_coorpanel"  onclick="goLive()" style="float:right;display:block;color:gray;width:50px;height:45px;border-radius:5px;border:2px solid black;text-align:center;color:red;background:white;">LIVE</button>'+        
            '<button id="btnAuto" class="cls_coorpanel" style="float:right;display:none;z-index:1500;color:gray;width:50px;height:45px;border-radius:5px;border:2px solid black;text-align:center;color:blue;background:white;">AUTO</button>'+        
        '</div>'+
      '</div>'+
    '</div>';
   if(vmode==0){   
   dtl2=      
    '<div style="width:100%;height:100%;background:none;">'+

      '<div onclick="refMap()" style="float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jrefresh.png"  style="height:100%;" alt="save image" />'+
        '</div>'+
        '<span class="footer_fonts">View</span>'+
      '</div>'+

      '<div onclick="gotoMarker(marker_client)" style="float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jsite.png"  style="height:100%;" alt="save image" />'+
        '</div>'+
        '<span class="footer_fonts">Client</span>'+
      '</div>'+
      
      '<div onclick="gotoMarker(marker_me)" style="float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/avatar.png"  style="height:100%;" alt="del image" />'+
        '</div>'+
        '<span class="footer_fonts">Me</span>'+
      '</div>'+  

      '<div onclick="showRoute()" style="float:right;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../main_gfx/jsend.png"  style="height:100%;" alt="del image" />'+
        '</div>'+
        '<span class="footer_fonts">Route</span>'+
      '</div>'+  

    '</div>';
    }else{ 
          dtl2=      
    '<div style="width:100%;height:100%;background:none;">'+

      '<div style="float:left;width:120px;height:100%;margin-left:2%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<input id="inpLat" type="number" disabled style="text-align:center;width:100%;height:70%;">'+
        '<span class="footer_fonts">Latitude</span>'+
      '</div>'+
      
      '<div style="float:left;width:120px;height:100%;margin-left:2%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<input id="inpLng" type="number" disabled style="text-align:center;width:100%;height:70%;">'+
        '<span class="footer_fonts">Longitude</span>'+
      '</div>'+
      
      '<div id="divCANCEL" onclick="procSave(0)" style="display:block;float:right;width:40px;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img id="imgCancel" src="../../main_gfx/jsite.png"  style="height:100%;" alt="site image" />'+
        '</div>'+
        '<span id="txtCancel" class="footer_fonts">Auto</span>'+
      '</div>'+

      '<div onclick="procSave(1)" style="float:right;width:50px;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img id="imgLatLng" src="../../main_gfx/jedit.png"  style="height:100%;" alt="site image" />'+
        '</div>'+
        '<span id="txtLatLng" class="footer_fonts">Edit</span>'+
      '</div>'+
         
    '</div>';
    }
    openView(dtl,'Client Map','close_showmap');
    dispMenu(false,dtl2);  
    map = L.map( 'theMap', {
      center: [12.8797, 121.7740],
      minZoom: 2,
      zoom: 6,
      layers: [mqi],  
      labels: true,
      zoomControl: false  
    });
    
    map.on('click', function(e){       
    var txt=document.getElementById('txtLatLng').innerHTML;       
    if(txt!='Save'){ return; }
    
    var coord = e.latlng;
    var lat = coord.lat;
    var lng = coord.lng;
    document.getElementById("inpLat").value=lat;
    document.getElementById("inpLng").value=lng;  
    
    marker_client.setLatLng([lat,lng]).update();  
    });
    
    var baseMaps = {
      "Map View": osm,
      "Satellite View": mqi
    };

    var overlays =  {//add any overlays here    
      };
    
    L.control.zoom({
      position: 'topright'
    }).addTo(map);

    L.control.layers(baseMaps,overlays, {position: 'bottomleft'}).addTo(map);

    layerGroup = L.layerGroup().addTo(map); 

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    //map.on('zoom',function(){ alert(5555); });
    
    var btnZoomPlus= document.querySelector('a.leaflet-control-zoom-in');
    L.DomEvent.addListener(btnZoomPlus, 'click', function (e) {
        //alert('Got plus clicked:'+e)
        btnZoom(1);
    });
    var btnZoomMinus = document.querySelector('a.leaflet-control-zoom-out');
    L.DomEvent.addListener(btnZoomMinus, 'click', function (e) {
        //;alert('Got minus clicked:'+e)
        btnZoom(-1);
    });
    
    F_LIVE=false;
    getLocation();     
}
  
function btnZoom(m){
	if(!F_LIVE){ return; }
	var mz=map.getZoom();
	
    if(m>0){
        mz=mz+1;
        if(mz > 20){ mz=20; }
	}else{
		mz=mz-1;
        if(mz < 2){ mz=2; }
	}
	//alert(mz);
	map.stopLocate();
	jlocate(true,mz);
}
	
function close_showmap(){  
  var vmode=document.getElementById('div_showmap').getAttribute('data-vmode');
  map.remove();
  if(vmode==0){
      mnu_showorder();
      var p1=document.getElementById('div_showmap').getAttribute('data-p1');
      var p2=document.getElementById('div_showmap').getAttribute('data-p2');
      document.getElementById('div_sel_client').value=p1;
      document.getElementById('div_sel_orders').value=p2;
      dispOrders(document.getElementById('div_sel_client').value,document.getElementById('div_sel_orders').value);
  }else if(vmode==1){
      mnu_editStaff();
  }else if(vmode==2){
      mnu_editStaff();
  }
}

function procSave(vm){
	var usercode=document.getElementById('div_showmap').getAttribute('data-usercode');
	var txt=document.getElementById('txtLatLng').innerHTML;
	
	var vsrc='../../main_gfx/jedit.png';
	var vsrc2='../../main_gfx/jsite.png';
	var vcap='Edit';
	var vcap2='Auto';
	var vdis1=true;
	var vdis2=true;
	var vdispcan='none';
	
	if(vm==1){
		//alert('edit  '+txt);
		if(txt=='Save'){
			//alert('do saving...');
			saveUserPosition(document.getElementById('inpLat').value,document.getElementById('inpLng').value);
		}else{
	        vsrc='../../main_gfx/jsave.png';
	        vsrc2='../../main_gfx/jcancel.png';
	        vcap='Save';
	        vcap2='Cancel';
	        vdis1=false;
	        vdis2=false;
	        vdispcan='block';
	    }
	    //enableAuto(true);
	}else if(vm==0){
		//alert('cancel');
		if(txt=='Save'){
		    var markers=JBE_GETARRY(DB_CLIENTS,'usercode',usercode);    
		    var vlat= parseFloat(markers['lat']);
            var vlng=parseFloat(markers['lng']);    
		    marker_client.setLatLng([vlat,vlng]).update();  
		    gotoMarker(marker_client);
		    //enableAuto(false);
		}else{
			goAuto();
			return;
		}
	}
	
	document.getElementById('imgLatLng').src=vsrc;
	document.getElementById('imgCancel').src=vsrc2;
	document.getElementById('txtLatLng').innerHTML=vcap;
	document.getElementById('txtCancel').innerHTML=vcap2;
	document.getElementById('inpLat').disabled=vdis1;
	document.getElementById('inpLng').disabled=vdis2;
	//document.getElementById('divCANCEL').style.display=vdispcan;
}


function showClientBox(meLat,meLng){ 
  var usercode=document.getElementById('div_showmap').getAttribute('data-usercode');
  var markers=JBE_GETARRY(DB_CLIENTS,'usercode',usercode);    
  memberClusters.clearLayers();  
  var vname=markers['username'];
  var vtag=vname.substr(0,4);
  
  var vcelno=markers['celno'];
  var vlat= parseFloat(markers['lat']);
  var vlng=parseFloat(markers['lng']);    
      
  var poptxt ='<div style="width:250px;height:auto;margin-top:20px;z-index:500;">' +
                '<div style="width:100%;height:35px;padding:2px;text-align:center;color:white;background-color:#2e75b6;">'+vname+'</div>' +                
                '<hr><b>Telephone:</b> ' + vcelno + 
                '<br/><b>Latitude:</b> ' + vlat + 
                '<br/><b>Longitude:</b> ' + vlng +                   
                '<hr>'+
                '<div style="width:100%;height:35px;padding:5px;text-align:center;border:0px solid gray;background-color:#2e75b6;">'+
                '   <img src="../../main_gfx/jcall.png" onclick="callTextGO(&quot;call&quot;,&quot;'+vcelno+'&quot;)" style="float:left;margin-left:4%;height:100%;"/>' +
                '   <img src="../../main_gfx/jsms.png"  onclick="callTextGO(&quot;txt&quot; ,&quot;'+vcelno+'&quot;)" style="float:right;margin-right:4%;height:100%;"/>' +     
                '</div>'+
              '</div>';    

  marker_client = L.marker( [vlat, vlng], {icon: L.divIcon({ className: 'member_custom_icon',iconAnchor: [21,41],html: vtag})    
                  }).bindPopup( poptxt ).on('click', L.bind(xseleRecord,null,markers['usercode']));
  memberClusters.addLayer(marker_client);   
  //alert(meLat+' vs '+meLng);
  marker_me = L.marker([meLat, meLng], {icon: L.divIcon({ className: 'user_custom_icon',iconAnchor: [21,41],html: CURR_TAG}) }); 
  memberClusters.addLayer(marker_me);    
 
  current_accuracy = L.circle([meLat, meLng], 0).addTo(map);
  
  map.addLayer(memberClusters);
  map.fitBounds(memberClusters.getBounds());
}

function onLocationFound(e) {
	//alert(marker_me);
  // if position defined, then remove the existing position marker and accuracy circle from the map    
  if (current_accuracy) {
    map.removeLayer(current_accuracy);
  }  
  console.log(marker_me);
  
  
  //alert('heading:'+e.heading);
  
  //var radius = e.accuracy / 2;
  //alert(map.getZoom()+'  vs  '+e.accuracy);

 var n1=21-map.getZoom();
  var radius = n1*10;
  //radius=40;
  if(!F_LIVE){
    radius=0;
  }
  
  showDistance(e.speed);

  marker_me.setLatLng(e.latlng).update();  
  current_accuracy = L.circle(e.latlng, radius).addTo(map);

  if(f_route){
    map.removeLayer(marker_polyline);
    var latlngs = [marker_client.getLatLng(),marker_me.getLatLng()];
    marker_polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
  }
}
function onLocationError(e) {
  snackBar("ERROR:<br>"+e.message);
}

function jlocate(f,z) {
	if(!f){
		map.stopLocate();
		if (current_accuracy) {
            map.removeLayer(current_accuracy);
        }  
		return;
	}
    map.locate({
        setView: true,         
        maxZoom:z,
        watch:f
    });    
}

function saveUserPosition(lat,lng){
  // record your current position  
  var usercode=document.getElementById('div_showmap').getAttribute('data-usercode');
  //alert(usercode);
  axios.post(JBE_API+'z_user.php', {  clientno:CURR_CLIENT, request: 302, 
    usercode: usercode, 
    lat:lat,
    lng:lng
  }) 
  .then(function (response) {
    console.log(response.data);
    //alert(response.data);
    DB_CLIENTS=response.data;
    marker_client.setLatLng([lat,lng]).update();  
    gotoMarker(marker_client);
    snackBar('LOCATION CHANGED');
  })
  .catch(function (error) { console.log(error); });
}

function goLive(){  
  if(!CURR_USER){
    plsLogin();
    return;
  }
  if(!F_LIVE){
    F_LIVE=true;
    
    jlocate(F_LIVE,map.getZoom());
    //document.getElementById('btnLive').style.borderColor='white';
    document.getElementById('btnLive').style.color='white';
    document.getElementById('btnLive').style.backgroundColor='red';
    
    document.getElementById('dsboard').style.display='block';
    document.getElementById('dsboard2').style.display='block';
  }else{
    F_LIVE=false;
    //map.stopLocate();
    
    jlocate(false,map.getZoom());
    //document.getElementById('btnLive').style.borderColor='black';    
    document.getElementById('btnLive').style.color='red';
    document.getElementById('btnLive').style.backgroundColor='white';
    
    document.getElementById('dsboard').style.display='none';
    document.getElementById('dsboard2').style.display='none';
  }   
}

function goAuto(){
	//var txt=document.getElementById('txtLatLng').innerHTML;
	//alert(txt);
	//if(txt!='Save'){ return; }
	var lat=current_accuracy.getLatLng().lat;
	var lng=current_accuracy.getLatLng().lng;
	//marker_client.setLatLng(current_accuracy.getLatLng()).update();  
	document.getElementById("inpLat").value=lat;
    document.getElementById("inpLng").value=lng;  
    
    marker_client.setLatLng([lat,lng]).update();  
	gotoMarker(marker_client);
	procSave(1);
}

/******************* FUNCTIONS ****************************************************************** */

function seleRecord(projid) {    
  location.hash='#proj_line'+projid;
  setRecord(projid);
  history.pushState("", document.title, window.location.pathname);
}

function xseleRecord() {    
  //alert('xsele');
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    snackBar("Geolocation is not supported by this app.");
  }
}

function showPosition(position) {
    var vmode=document.getElementById('div_showmap').getAttribute('data-vmode');
    showClientBox(position.coords.latitude,position.coords.longitude);
	if(vmode==1 || vmode==2){
	    if (current_accuracy) {
            map.removeLayer(current_accuracy);
        }  
		map.removeLayer(marker_me);
		document.getElementById('btnLive').style.display='none';
		document.getElementById('btnAuto').style.display='none';
		document.getElementById('inpLat').value=marker_client.getLatLng().lat;
		document.getElementById('inpLng').value=marker_client.getLatLng().lng;
		gotoMarker(marker_client);
	}else{
		document.getElementById('btnLive').style.display='block';
		document.getElementById('btnAuto').style.display='none';
	}
}

function showError(error) {
  var msg='XXX';
  switch(error.code) {
    case error.PERMISSION_DENIED:
      msg = "User denied the request for Geolocation. Please Turn on Location."
      break;
    case error.POSITION_UNAVAILABLE:
      msg = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      msg = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      msg = "An unknown error occurred."
      break;
  }
  showProgress(false);
  MSG_SHOW(vbOk,"ERROR:",msg,function(){},function(){});
}

//=============================================

function gotoMarker(mrk){
  map.flyTo(mrk.getLatLng(), 20, {
    animate: true,
    duration: 0.5
  });
}

function showRoute(){
  if(f_route){
    if(marker_polyline){
      map.removeLayer(marker_polyline);
    }
    f_route=false;
  }else{
    var latlngs = [marker_client.getLatLng(),marker_me.getLatLng()];
    marker_polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
    f_route=true;
  }
}

function refMap(){
  map.fitBounds(memberClusters.getBounds());
}

function showDistance(s){
  var d=(marker_me.getLatLng().distanceTo(marker_client.getLatLng())).toFixed(0)/1000;  

  if(!s){ s=0; }
  s=s*3.6;
  document.getElementById('divDistance').innerHTML=d;
  document.getElementById('divSpeed').innerHTML=s.toFixed(2);
  /*
  alert(
    'Speed : '+speed+'\n'+
    'timeSpeed : '+timeSpeed+'\n'+
    't2 : '+t2+'\n'+
    'Distance : '+d+'\n'+
    'Speed : '+s
    );
    */
}
