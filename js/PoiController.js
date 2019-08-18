class PoiController
{

    constructor(map) {
        this.map = map;
        this.userid = 0;
        this.checkLogin();
    }


    checkLogin() {
        fetch('login').
            then(res => res.json()).
            then(json => {
                this.userid = json.userid;
                this.setup();
            });
    }

    setup() {

        this.intIcons = [  L.icon (
                                {iconUrl: '/kothic/icons/board_warning.png',
                                shadowUrl: null,
                                iconSize: new L.Point(32,32),
                                shadowSize: null,
                                iconAnchor: new L.Point(15,31),
                                popupAnchor: new L.Point(8,-32) } ),

                                null,

                                L.icon({iconUrl: '/kothic/icons/board_poi.png',
                                shadowUrl: null,
                                iconSize: new L.Point(32,32),
                                shadowSize: null,
                                iconAnchor: new L.Point(15,31),
                                popupAnchor: new L.Point(8,-32) } ),
         ];


        this.markersLayer = new L.GeoJSON( null, { 
            onEachFeature: (feature, layer) => {
                layer.bindPopup(feature.properties.text);
                layer.id = feature.properties.id;    
                this.addAnnotationEditDeleteHandlers(layer);

                // !!! IMPORTANT !!!
                // To be able to edit/remove a feature with Leaflet.Draw
                // you have to add it to the layer group
                this.drawnItems.addLayer(layer);
            },
            pointToLayer: (geojson,latlng)=> {
                return new L.Marker(latlng, { icon: this.intIcons[geojson.properties.annotationtype? geojson.properties.annotationtype-1: 1] } );
            }
        } );

        this.drawnItems = new L.FeatureGroup();
        this.map.addLayer(this.drawnItems);

        L.drawLocal.draw.toolbar.buttons.marker='Add noticeboard to map.';
        L.drawLocal.edit.toolbar.buttons.edit='Move noticeboard.';
        L.drawLocal.edit.toolbar.buttons.remove='Delete noticeboard.';
		L.drawLocal.edit.handlers.edit.tooltip.text = 'Drag noticeboard to move.';
		L.drawLocal.edit.handlers.remove.tooltip.text = 'Click on noticeboard to delete.';

        this.drawControl = new L.Control.Draw ( { 
            draw: {
            marker: true, 
            polyline: false,
            polygon: false,
            rectangle: false,
            circle: false },
            edit: { featureGroup: this.drawnItems } 
             } );

        this.map.addControl(this.drawControl);
        if(this.userid > 0) {
            this.enableMarkerTool();
        }

        this.map.on('draw:drawstart', e=> {
            this.drawing=true;
        });

        this.map.on('draw:created', e=> {
            this.drawing=false;
            switch(e.layerType)
            {
                case "marker":
                    this.onAddMarker(e.layer);
                    this.addAnnotationEditDeleteHandlers(e.layer);
                    break;
            }
        });

        this.map.on('draw:edited', e=> {
            e.layers.eachLayer ( layer=> {
                    if(layer.edit)
                        layer.edit();
                } );
        } );

        this.map.on('draw:deleted', e=> {
            e.layers.eachLayer (layer=> {
                        layer.addToDelList(this.deletionList);
                    });
            this.deletionList.doDelete();
        });

        this.deleting=false;

        this.map.on('draw:deletestart', () => { 
            this.deleting=true; 
        });

        this.map.on('draw:deletestop',  ()=> {
            this.deleting=false; 
        });    

        this.annotationLoader = new FeatureLoader
            ("/fm/ws/bsvr.php", this.markersLayer, "format=json&ann=1");

        this.map.on("dragend",  e=> {
                this.reloadMarkers();
                this.saveLocation();
        });




       this.map.on("viewreset", e=> {
            if(this.map.getZoom()<=14)
                this.map.removeLayer(this.markersLayer);
            else
                this.map.addLayer(this.markersLayer);

            this.saveLocation();

        } );
         this.reloadMarkers();
 
        this.deletionList = {
            annotations: [],
            doDelete: function() {
                var annJson = JSON.stringify(this.annotations);
    
                if(this.annotations.length>0) {    
                    this.sendPointDeletionRequest 
                    (annJson, "/fm/ws/annotation.php", "deleteMulti",
                         (function(e)
                            { 
                                alert("Note(s) deleted!");
                                this.annotations = [];
                            } ).bind(this));
                }
            },

            sendPointDeletionRequest: function(json,url,action,callback) {
                var xhr2 = new XMLHttpRequest();
                xhr2.addEventListener ("load", e=> { 
                    if(e.target.status==200)
                        callback(e);
                    else
                        alert('Server error: ' + e.target.status);
                });
                xhr2.open("POST",url);
                var data = new FormData();
                data.append("ids", json);
                data.append("action", action);
                xhr2.send(data);
            }
        };
      }

      saveAnnotationToServer (marker, wrWaypoint) {
        var xhr2 = new XMLHttpRequest();
        xhr2.addEventListener ("load",  e=> {
            if(e.target.status==200) {
                alert('Moved successfully.');
            }  else {
                if(e.target.status==401)
                    alert('Need to login to move.');
                else
                    alert('Server error: ' + e.target.status);
            } });
        xhr2.open('POST', '/fm/ws/' + 
                    (wrWaypoint ? 'wr.php' : 'annotation.php'));
        var data = new FormData();
        data.append("action", wrWaypoint ? "moveWaypoint": "move");
        data.append("lat", marker.getLatLng().lat);
        data.append("lon", marker.getLatLng().lng);
        data.append("id", marker.id);
        xhr2.send(data);
      }

      saveLocation() {
            if(window.localStorage) {
                window.localStorage.setItem("lat", this.map.getCenter().lat);
                window.localStorage.setItem("lon", this.map.getCenter().lng);
                window.localStorage.setItem("zoom", this.map.getZoom());
            }
      }

      setLocation (x,y) {
        this.map.panTo(new L.LatLng(y,x));
        this.saveLocation();
      }

      onAddMarker (marker) {
        var p = this.map.layerPointToContainerPoint
        (this.map.latLngToLayerPoint(marker.getLatLng()));


        if(this.userid > 0) {
            this.dlg = new Dialog('main',
                { ok:  ()=> {
                    var aType = (document.getElementById("annotationType"))? document.getElementById('annotationType').value : 1;
                    var xhr2 = new XMLHttpRequest();
                    xhr2.addEventListener ('load', e=> {
                        alert('Annotation added');
                        var marker2 = new L.Marker(marker.getLatLng(), {icon:this.intIcons[aType-1]});
                        console.log("annotation type=" + aType);
//                            var marker2=marker;    
                        marker2.addToDelList = deletionList=> { deletionList.annotations.push(marker.id); };
                        marker2.id = e.target.responseText;
                        this.annotationLoader.indexedFeatures
                                [e.target.responseText] = marker2;
                        this.dlg.hide();
                        this.drawnItems.addLayer(marker2);
                    });
                    xhr2.open('POST','/fm/ws/annotation.php');
                    var data = new FormData();
                    data.append ("text", document.getElementById('annotation').value);
                    data.append("lat", marker.getLatLng().lat);
                    data.append("lon", marker.getLatLng().lng);
                    data.append("annotationType", aType);
                    data.append("action", "create");
                    xhr2.send(data);
                },

                cancel: (e) => { 
                    this.dlg.hide();
                    e.stopPropagation();
                }
            },
            { backgroundColor: '#000080',
                    width: '400px',
                    height: '400px',
                    color: 'white',
                    borderRadius: '15px' } );

          var content= 
        "<p>Enter your noticeboard's text...</p>"+
            "<p><textarea id='annotation' " +
            "style='margin: 10px 10px 10px 10px;width:360px;height:150px'>"+
            "</textarea></p>" ;
            content += "<p>"+
                "<label for='annotationType'>What best describes it?</label>"+
                "<select id='annotationType'>"+
                "<option value='1'>Caution (steep, muddy, animals, blocked etc)</option>"+
                "<option value='3'>Place of interest (viewpoint, historical site etc)</option></select>"+
                "</p>";
            this.dlg.setContent(content);
            this.dlg.setPosition("l00px", "100px");
            if(!this.dlg.isVisible()) {
                this.dlg.show();
            }
            document.getElementById('annotation').focus();
        } else {
            alert("Must be logged in to add noticeboard.");
        }
      }


      addAnnotationEditDeleteHandlers(marker) {
        marker.edit = this.saveAnnotationToServer.bind (this,marker,false);
        marker.addToDelList = function(deletionList)
                    {
                        deletionList.annotations.push(marker.id);
                    };
       }

      enableMarkerTool() {
      //  this.drawControl.setDrawingOptions({marker:true, edit:false});

        // https://github.com/Leaflet/Leaflet.draw/issues/369
        // need to remove control and add it again for changes to 
        // take effect
       // this.map.removeControl(this.drawControl);
        //this.map.addControl(this.drawControl);
      }

      reloadMarkers() {
        var bounds = this.map.getBounds();
        this.annotationLoader.loadFeatures(bounds);
      }
}
