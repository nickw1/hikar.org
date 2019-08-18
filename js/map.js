
class HikarMap {

    constructor(mapDivId, lat, lon, zoom) {
        this.map = L.map(mapDivId, {minZoom: 14, maxZoom:20});
        var url = "https://www.hikar.org/fm/ws/tsvr.php?x={x}&y={y}&z={z}&way=highway,natural,waterway,railway,power,barrier,landuse&poi=place&coastline=1&kothic=2";
        var layerOtm = new L.TileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {attribution: 'Map data (c)OpenStreetMap contributors, ODBL; contours SRTM | Map display: &copy; OpenTopoMap (CC-by-SA)'}).addTo(this.map);
        var layerKothic = new L.TileLayer.Kothic(url, {attribution: 'Map data (c)OpenStreetMap contributors, ODBL | Map display: kothic-js'});
        this.map.setView([lat, lon], zoom);


        this.map.on('zoomstart', e=> { this.oldZoom = e.target.getZoom(); });
        this.map.on('zoomend', e=> {
            if(e.target.getZoom() >= 18 && this.oldZoom < 18) {
                layerOtm.removeFrom(this.map);
                layerKothic.addTo(this.map);
            } else if (e.target.getZoom() < 18 && this.oldZoom >= 18) {
                layerKothic.removeFrom(this.map);
                layerOtm.addTo(this.map);
            }
        });
        this.poiController = new PoiController(this.map);
        this.setupSearch();
    }

    setupSearch() {
        document.getElementById('search').addEventListener('click', e=> {
            e.stopPropagation();
        });
        document.getElementById('searchResults').addEventListener('click', e=> {
            e.stopPropagation();
        });

        document.getElementById('searchBtn').addEventListener('click', e=> {
            var q = document.getElementById('q').value;
            fetch(`nomproxy.php?q=${q}`)
                .then(response=>response.json())
                .then(json=> {
                    var nodes = json.filter(o => o.osm_type=='node');
                    if(nodes.length==0) {
                        document.getElementById('searchResults').innerHTML = `No results for ${q}!`;
                    } else {
                        document.getElementById('searchResults').innerHTML = '';       
                        var p = document.createElement('p');
                        var strong = document.createElement("strong"); 
                        strong.appendChild(document.createTextNode("Search results from OSM Nominatim"));
                        p.appendChild(strong);
                        document.getElementById('searchResults').appendChild(p);
                        document.getElementById('searchResults').style.display = 'block';    
                        nodes.forEach(o=> {
                            var p = document.createElement('p');
                            p.style.margin = '0px';
                            var a = document.createElement('a');
                            a.href='#';
                            a.innerHTML = o.display_name;
                            a.addEventListener('click', e=> {
                                this.map.setView([o.lat, o.lon]);
                                this.poiController.reloadMarkers();
                                console.log(document.getElementById('searchResults').style.display);
                                document.getElementById('searchResults').style.display='none';    
                                console.log(document.getElementById('searchResults').style.display);
                            });
                            p.appendChild(a);
                            document.getElementById('searchResults').appendChild(p);

                        });
                }
              });                  
        });
    }
}
