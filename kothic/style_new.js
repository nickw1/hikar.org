
(function (MapCSS) {
    'use strict';

    function restyle(style, tags, zoom, type, selector) {
        var s_default = {}, s_rights = {};

        if ((selector == 'canvas')) {
            s_default['fill-color'] = 'lightblue';
        }

        if (((selector == 'area' && tags['natural'] == 'nosea'))) {
            s_default['fill-color'] = '#f2efe9';
            s_default['z-index'] = 0;
        }

        if (((type == 'node' && (tags.hasOwnProperty('place'))))) {
            s_default['text-color'] = 'black';
        }

        if (((type == 'node' && (tags.hasOwnProperty('place')))) || ((type == 'node' && tags['railway'] == 'station') && zoom >= 13 && zoom <= 20)) {
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'DejaVu Sans Book';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['text-allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'station') && zoom >= 13 && zoom <= 20)) {
            s_default['text-color'] = 'red';
            s_default['color'] = 'red';
            s_default['icon-image'] = 'map/icons/rsmall.png';
            s_default['allow-overlap'] = 'true';
            s_default['z-index'] = 10;
            s_default['text-offset'] = 6;
            s_default['opacity'] = 1;
        }

        if (((type == 'node' && tags['man_made'] == 'mast') && zoom >= 13 && zoom <= 20)) {
            s_default['icon-image'] = 'map/icons/mast.png';
            s_default['allow-overlap'] = 'true';
            s_default['z-index'] = 10;
            s_default['opacity'] = 1;
        }

        if (((type == 'node' && tags['power'] == 'tower') && zoom >= 13 && zoom <= 20)) {
            s_default['icon-image'] = 'map/icons/powertower.png';
            s_default['allow-overlap'] = 'true';
            s_default['z-index'] = 10;
            s_default['opacity'] = 1;
        }

        if (((type == 'node' && tags['barrier'] == 'stile') && zoom >= 15 && zoom <= 20)) {
            s_default['icon-image'] = 'map/icons/stile.png';
            s_default['allow-overlap'] = 'true';
            s_default['z-index'] = 10;
            s_default['opacity'] = 1;
        }

        if (((type == 'node' && tags['barrier'] == 'gate') && zoom >= 15 && zoom <= 20)) {
            s_default['icon-image'] = 'map/icons/gate.png';
            s_default['allow-overlap'] = 'true';
            s_default['z-index'] = 10;
            s_default['opacity'] = 1;
        }

        if (((type == 'node' && tags['tourism'] == 'viewpoint') && zoom >= 14 && zoom <= 20)) {
            s_default['icon-image'] = 'map/icons/viewpoint.png';
            s_default['allow-overlap'] = 'true';
            s_default['z-index'] = 10;
            s_default['opacity'] = 1;
        }

        if (((type == 'node' && tags['amenity'] == 'parking') && zoom >= 15 && zoom <= 20)) {
            s_default['icon-image'] = 'map/icons/carpark.png';
            s_default['allow-overlap'] = 'true';
            s_default['z-index'] = 10;
            s_default['opacity'] = 1;
        }

        if (((type == 'node' && tags['place'] == 'suburb') && zoom >= 14 && zoom <= 20) || ((type == 'node' && tags['place'] == 'hamlet'))) {
            s_default['font-size'] = '10';
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'DejaVu Sans Book';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['icon-image'] = 'map/icons/waypoint.png';
            s_default['allow-overlap'] = 'true';
            s_default['text-offset'] = 10;
            s_default['z-index'] = 10;
        }

        if (((type == 'node' && tags['place'] == 'village') && zoom >= 14 && zoom <= 20)) {
            s_default['font-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'DejaVu Sans Book';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['icon-image'] = 'map/icons/waypoint.png';
            s_default['allow-overlap'] = 'true';
            s_default['text-offset'] = 12;
            s_default['z-index'] = 10;
        }

        if (((type == 'node' && tags['place'] == 'town') && zoom >= 14 && zoom <= 20)) {
            s_default['font-size'] = '14';
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'DejaVu Sans Book';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['icon-image'] = 'map/icons/waypoint.png';
            s_default['allow-overlap'] = 'true';
            s_default['text-offset'] = 12;
            s_default['z-index'] = 10;
        }

        if (((type == 'node' && tags['place'] == 'city') && zoom >= 14 && zoom <= 20)) {
            s_default['font-size'] = '16';
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'DejaVu Sans Book';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['icon-image'] = 'map/icons/waypoint.png';
            s_default['allow-overlap'] = 'true';
            s_default['text-offset'] = 14;
            s_default['z-index'] = 10;
        }

        if (((type == 'node' && tags['place'] == 'village') && zoom >= 12 && zoom <= 13)) {
            s_default['font-size'] = '10';
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'DejaVu Sans Book';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['icon-image'] = 'map/icons/waypoint.png';
            s_default['allow-overlap'] = 'true';
            s_default['text-offset'] = 10;
            s_default['z-index'] = 10;
        }

        if (((type == 'node' && tags['place'] == 'town') && zoom >= 12 && zoom <= 13)) {
            s_default['font-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'DejaVu Sans Book';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['icon-image'] = 'map/icons/waypoint.png';
            s_default['allow-overlap'] = 'true';
            s_default['text-offset'] = 12;
            s_default['z-index'] = 10;
        }

        if (((type == 'node' && tags['place'] == 'city') && zoom >= 12 && zoom <= 13)) {
            s_default['font-size'] = '14';
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'DejaVu Sans Book';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['icon-image'] = 'map/icons/waypoint.png';
            s_default['allow-overlap'] = 'true';
            s_default['text-offset'] = 12;
            s_default['z-index'] = 10;
        }

        if (((type == 'node' && tags['place'] == 'town') && zoom >= 10 && zoom <= 11)) {
            s_default['font-size'] = '10';
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'DejaVu Sans Book';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['icon-image'] = 'map/icons/waypoint.png';
            s_default['allow-overlap'] = 'true';
            s_default['text-offset'] = 10;
            s_default['z-index'] = 10;
        }

        if (((type == 'node' && tags['place'] == 'city') && zoom >= 10 && zoom <= 11)) {
            s_default['font-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'DejaVu Sans Book';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['icon-image'] = 'map/icons/waypoint.png';
            s_default['allow-overlap'] = 'true';
            s_default['text-offset'] = 12;
            s_default['z-index'] = 10;
        }

        if (((type == 'node' && tags['natural'] == 'peak'))) {
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['font-size'] = '10';
            s_default['font-family'] = 'DejaVu Sans Book';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['text-allow-overlap'] = 'true';
            s_default['icon-image'] = 'map/icons/peak_small.png';
            s_default['text-offset'] = 12;
        }

        if (((type == 'node' && tags['amenity'] == 'pub') && zoom >= 14 && zoom <= 20)) {
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['font-size'] = '8';
            s_default['font-family'] = 'DejaVu Sans Book';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['icon-image'] = 'map/icons/pub.png';
            s_default['allow-overlap'] = 'true';
            s_default['text-offset'] = 8;
            s_default['z-index'] = 10;
        }

        if (((type == 'node' && tags['amenity'] == 'cafe') && zoom >= 14 && zoom <= 20)) {
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['font-size'] = '8';
            s_default['font-family'] = 'DejaVu Sans Book';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['icon-image'] = 'map/icons/cafe.png';
            s_default['allow-overlap'] = 'true';
            s_default['text-offset'] = 8;
            s_default['z-index'] = 10;
        }

        if (((type == 'node' && tags['amenity'] == 'restaurant') && zoom >= 14 && zoom <= 20)) {
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['font-size'] = '8';
            s_default['font-family'] = 'DejaVu Sans Book';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['icon-image'] = 'map/icons/restaurant.png';
            s_default['allow-overlap'] = 'true';
            s_default['text-offset'] = 8;
            s_default['z-index'] = 10;
        }

        if (((type == 'way' && tags['highway'] == 'motorway') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['highway'] == 'motorway_link') && zoom >= 14 && zoom <= 20)) {
            s_default['casing-color'] = '#506077';
            s_default['casing-width'] = 1;
            s_default['color'] = '#809bc0';
            s_default['width'] = 3;
            s_default['z-index'] = 8;
        }

        if (((type == 'way' && tags['highway'] == 'trunk') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['highway'] == 'trunk_link') && zoom >= 14 && zoom <= 20)) {
            s_default['casing-color'] = '#477147';
            s_default['casing-width'] = 1;
            s_default['color'] = '#cdeacd';
            s_default['width'] = 3;
            s_default['z-index'] = 7;
        }

        if (((type == 'way' && tags['highway'] == 'primary') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['highway'] == 'primary_link') && zoom >= 14 && zoom <= 20)) {
            s_default['casing-color'] = '#8d4346';
            s_default['casing-width'] = 1;
            s_default['color'] = '#f4c3c4';
            s_default['width'] = 3;
            s_default['z-index'] = 6;
        }

        if (((type == 'way' && tags['highway'] == 'secondary') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['highway'] == 'secondary_link') && zoom >= 14 && zoom <= 20)) {
            s_default['casing-color'] = '#a37b48';
            s_default['casing-width'] = 1;
            s_default['color'] = '#fee0b8';
            s_default['width'] = 3;
            s_default['z-index'] = 5;
        }

        if (((type == 'way' && tags['highway'] == 'tertiary') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['highway'] == 'tertiary_link') && zoom >= 14 && zoom <= 20)) {
            s_default['casing-color'] = '#bbb';
            s_default['casing-width'] = 1;
            s_default['color'] = '#ffc';
            s_default['width'] = 3;
            s_default['z-index'] = 4;
        }

        if (((type == 'way' && tags['highway'] == 'unclassified') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['highway'] == 'unclassified_link') && zoom >= 14 && zoom <= 20)) {
            s_default['casing-color'] = '#999';
            s_default['casing-width'] = 1;
            s_default['color'] = 'white';
            s_default['width'] = 3;
            s_default['z-index'] = 3;
        }

        if (((type == 'way' && tags['highway'] == 'residential') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['highway'] == 'service') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['highway'] == 'residential_link') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['highway'] == 'service_link') && zoom >= 14 && zoom <= 20)) {
            s_default['casing-color'] = '#999';
            s_default['casing-width'] = 1;
            s_default['color'] = 'white';
            s_default['width'] = 2;
            s_default['z-index'] = 3;
        }

        if (((type == 'way' && tags['highway'] == 'track') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['highway'] == 'byway') && zoom >= 14 && zoom <= 20)) {
            s_default['color'] = 'white';
            s_default['width'] = 2;
            s_default['casing-color'] = '#999';
            s_default['casing-width'] = 1;
            s_default['casing-dashes'] = [4, 2];
            s_default['z-index'] = 2;
        }

        if (((type == 'way' && tags['highway'] == 'path') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['highway'] == 'footway') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['highway'] == 'bridleway') && zoom >= 14 && zoom <= 20)) {
            s_default['color'] = 'black';
            s_default['width'] = 1;
            s_default['dashes'] = [2, 2];
            s_default['z-index'] = 2;
        }

        if (((type == 'way' && tags['highway'] == 'cycleway') && zoom >= 14 && zoom <= 20)) {
            s_default['color'] = 'blue';
            s_default['width'] = 1;
            s_default['dashes'] = [2, 2];
            s_default['z-index'] = 2;
        }

        if (((type == 'way' && tags['highway'] == 'path' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes')) && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['highway'] == 'footway' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes')) && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['highway'] == 'bridleway' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes')) && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['highway'] == 'cycleway' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes')) && zoom >= 14 && zoom <= 20)) {
            s_default['casing-color'] = '#999';
            s_default['casing-width'] = 2;
            s_default['casing-dashes'] = [1, 0];
        }

        if (((type == 'way' && (tags.hasOwnProperty('highway')) && tags['designation'] == 'public_footpath') && zoom >= 14 && zoom <= 20)) {
            s_rights['color'] = '#00ff00';
            s_rights['width'] = 3;
            s_rights['opacity'] = 0.5;
            s_rights['z-index'] = 9;
        }

        if (((type == 'way' && (tags.hasOwnProperty('highway')) && tags['designation'] == 'public_bridleway') && zoom >= 14 && zoom <= 20)) {
            s_rights['color'] = '#c06000';
            s_rights['width'] = 3;
            s_rights['opacity'] = 0.5;
            s_rights['z-index'] = 9;
        }

        if (((type == 'way' && (tags.hasOwnProperty('highway')) && tags['designation'] == 'public_byway') && zoom >= 14 && zoom <= 20) || ((type == 'way' && (tags.hasOwnProperty('highway')) && tags['designation'] == 'byway') && zoom >= 14 && zoom <= 20) || ((type == 'way' && (tags.hasOwnProperty('highway')) && tags['designation'] == 'restricted_byway') && zoom >= 14 && zoom <= 20) || ((type == 'way' && (tags.hasOwnProperty('highway')) && tags['designation'] == 'byway_open_to_all_traffic') && zoom >= 14 && zoom <= 20) || ((type == 'way' && (tags.hasOwnProperty('highway')) && tags['designation'] == 'unknown_byway') && zoom >= 14 && zoom <= 20)) {
            s_rights['color'] = 'red';
            s_rights['width'] = 3;
            s_rights['opacity'] = 0.5;
            s_rights['z-index'] = 9;
        }

        if (((type == 'way' && (tags.hasOwnProperty('highway')) && tags['foot'] == 'permissive') && zoom >= 14 && zoom <= 20)) {
            s_rights['color'] = 'cyan';
            s_rights['width'] = 3;
            s_rights['opacity'] = 0.5;
            s_rights['z-index'] = 9;
        }

        if (((type == 'way' && (tags.hasOwnProperty('contour'))))) {
            s_default['color'] = '#fb9b67';
            s_default['width'] = 0.5;
            s_default['z-index'] = 1;
            s_default['text'] = MapCSS.e_localize(tags, 'contour');
            s_default['text-color'] = '#fb9b67';
            s_default['font-family'] = 'helvetica';
            s_default['font-size'] = '8';
        }

        if (((type == 'way' && tags['barrier'] == 'hedge') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['barrier'] == 'fence') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['barrier'] == 'wall') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['barrier'] == 'ditch') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['barrier'] == 'retaining_wall') && zoom >= 14 && zoom <= 20)) {
            s_default['color'] = '#404040';
            s_default['width'] = 0.5;
            s_default['z-index'] = 1;
        }

        if (((type == 'way' && tags['power'] == 'line') && zoom >= 14 && zoom <= 20)) {
            s_default['color'] = '#808080';
            s_default['width'] = 1;
            s_default['z-index'] = 10;
        }

        if (((selector == 'area' && tags['natural'] == 'wood')) || ((selector == 'area' && tags['landuse'] == 'forest'))) {
            s_default['fill-color'] = '#c0ffc0';
            s_default['z-index'] = 1;
        }

        if (((selector == 'area' && tags['natural'] == 'water')) || ((selector == 'area' && tags['landuse'] == 'reservoir'))) {
            s_default['fill-color'] = 'lightblue';
            s_default['z-index'] = 2;
        }

        if (((selector == 'area' && tags['natural'] == 'heath'))) {
            s_default['fill-color'] = '#ffffc0';
            s_default['z-index'] = 1;
        }

        if (((selector == 'area' && tags['natural'] == 'moor'))) {
            s_default['fill-color'] = '#ffc0ff';
            s_default['z-index'] = 1;
        }

        if (((type == 'way' && tags['waterway'] == 'river'))) {
            s_default['color'] = 'lightblue';
            s_default['width'] = 2;
            s_default['z-index'] = 2;
        }

        if (((type == 'way' && tags['waterway'] == 'stream'))) {
            s_default['color'] = 'lightblue';
            s_default['width'] = 1;
            s_default['z-index'] = 2;
        }

        if (((type == 'way' && tags['railway'] == 'rail') && zoom >= 14 && zoom <= 20) || ((type == 'way' && tags['railway'] == 'preserved_rail')) || ((type == 'way' && tags['railway'] == 'preserved'))) {
            s_default['color'] = 'white';
            s_default['casing-color'] = 'black';
            s_default['casing-width'] = 1;
            s_default['dashes'] = [4, 4];
            s_default['casing-dashes'] = [1, 0];
            s_default['width'] = 2;
        }

        if (((type == 'way' && tags['railway'] == 'rail') && zoom >= 10 && zoom <= 13) || ((type == 'way' && tags['railway'] == 'preserved_rail')) || ((type == 'way' && tags['railway'] == 'preserved'))) {
            s_default['color'] = 'white';
            s_default['casing-color'] = 'black';
            s_default['casing-width'] = 0.5;
            s_default['dashes'] = [4, 4];
            s_default['casing-dashes'] = [1, 0];
            s_default['width'] = 1;
        }

        if (((type == 'way' && tags['highway'] == 'motorway') && zoom === 13) || ((type == 'way' && tags['highway'] == 'motorway_link') && zoom === 13)) {
            s_default['casing-color'] = '#506077';
            s_default['casing-width'] = 1;
            s_default['color'] = '#809bc0';
            s_default['width'] = 3;
            s_default['z-index'] = 8;
        }

        if (((type == 'way' && tags['highway'] == 'trunk') && zoom === 13) || ((type == 'way' && tags['highway'] == 'trunk_link') && zoom === 13)) {
            s_default['casing-color'] = '#477147';
            s_default['casing-width'] = 1;
            s_default['color'] = '#cdeacd';
            s_default['width'] = 3;
            s_default['z-index'] = 7;
        }

        if (((type == 'way' && tags['highway'] == 'primary') && zoom === 13) || ((type == 'way' && tags['highway'] == 'primary_link') && zoom === 13)) {
            s_default['casing-color'] = '#8d4346';
            s_default['casing-width'] = 1;
            s_default['color'] = '#f4c3c4';
            s_default['width'] = 3;
            s_default['z-index'] = 6;
        }

        if (((type == 'way' && tags['highway'] == 'secondary') && zoom === 13) || ((type == 'way' && tags['highway'] == 'secondary_link') && zoom === 13)) {
            s_default['casing-color'] = '#a37b48';
            s_default['casing-width'] = 1;
            s_default['color'] = '#fee0b8';
            s_default['width'] = 3;
            s_default['z-index'] = 5;
        }

        if (((type == 'way' && tags['highway'] == 'tertiary') && zoom >= 12 && zoom <= 13) || ((type == 'way' && tags['highway'] == 'tertiary_link') && zoom >= 12 && zoom <= 13)) {
            s_default['casing-color'] = '#bbb';
            s_default['casing-width'] = 1;
            s_default['color'] = '#ffc';
            s_default['width'] = 2;
            s_default['z-index'] = 4;
        }

        if (((type == 'way' && tags['highway'] == 'unclassified') && zoom === 13) || ((type == 'way' && tags['highway'] == 'unclassified_link') && zoom === 13)) {
            s_default['casing-color'] = '#999';
            s_default['casing-width'] = 1;
            s_default['color'] = 'white';
            s_default['width'] = 2;
            s_default['z-index'] = 3;
        }

        if (((type == 'way' && tags['highway'] == 'unclassified') && zoom === 12) || ((type == 'way' && tags['highway'] == 'unclassified_link') && zoom === 12)) {
            s_default['casing-color'] = '#999';
            s_default['casing-width'] = 0.5;
            s_default['color'] = 'white';
            s_default['width'] = 1;
            s_default['z-index'] = 3;
        }

        if (((type == 'way' && tags['highway'] == 'motorway') && zoom >= 10 && zoom <= 12) || ((type == 'way' && tags['highway'] == 'motorway_link') && zoom >= 10 && zoom <= 12)) {
            s_default['casing-color'] = '#506077';
            s_default['casing-width'] = 2;
            s_default['color'] = '#809bc0';
            s_default['width'] = 2;
            s_default['z-index'] = 8;
        }

        if (((type == 'way' && tags['highway'] == 'trunk') && zoom >= 10 && zoom <= 12) || ((type == 'way' && tags['highway'] == 'trunk_link') && zoom >= 10 && zoom <= 12)) {
            s_default['casing-color'] = '#477147';
            s_default['casing-width'] = 1;
            s_default['color'] = '#cdeacd';
            s_default['width'] = 2;
            s_default['z-index'] = 7;
        }

        if (((type == 'way' && tags['highway'] == 'primary') && zoom >= 10 && zoom <= 12) || ((type == 'way' && tags['highway'] == 'primary_link') && zoom >= 10 && zoom <= 12)) {
            s_default['casing-color'] = '#8d4346';
            s_default['casing-width'] = 1;
            s_default['color'] = '#f4c3c4';
            s_default['width'] = 2;
            s_default['z-index'] = 6;
        }

        if (((type == 'way' && tags['highway'] == 'secondary') && zoom >= 10 && zoom <= 12) || ((type == 'way' && tags['highway'] == 'secondary_link') && zoom >= 10 && zoom <= 12)) {
            s_default['casing-color'] = '#a37b48';
            s_default['casing-width'] = 1;
            s_default['color'] = '#fee0b8';
            s_default['width'] = 2;
            s_default['z-index'] = 5;
        }

        if (((type == 'way' && tags['highway'] == 'motorway') && zoom >= 1 && zoom <= 9) || ((type == 'way' && tags['highway'] == 'motorway_link') && zoom >= 1 && zoom <= 9)) {
            s_default['casing-color'] = '#506077';
            s_default['casing-width'] = 2;
            s_default['color'] = '#809bc0';
            s_default['width'] = 1;
            s_default['z-index'] = 8;
        }

        if (((type == 'way' && tags['highway'] == 'trunk') && zoom >= 1 && zoom <= 9) || ((type == 'way' && tags['highway'] == 'trunk_link') && zoom >= 1 && zoom <= 9)) {
            s_default['casing-color'] = '#477147';
            s_default['casing-width'] = 1;
            s_default['color'] = '#cdeacd';
            s_default['width'] = 1;
            s_default['z-index'] = 7;
        }

        if (((type == 'way' && tags['highway'] == 'primary') && zoom >= 1 && zoom <= 9) || ((type == 'way' && tags['highway'] == 'primary_link') && zoom >= 1 && zoom <= 9)) {
            s_default['casing-color'] = '#8d4346';
            s_default['casing-width'] = 1;
            s_default['color'] = '#f4c3c4';
            s_default['width'] = 1;
            s_default['z-index'] = 6;
        }

        if (Object.keys(s_default).length) {
            style['default'] = s_default;
        }
        if (Object.keys(s_rights).length) {
            style['rights'] = s_rights;
        }
        return style;
    }
    
    var sprite_images = {
    }, external_images = ['map/icons/cafe.png', 'map/icons/carpark.png', 'map/icons/gate.png', 'map/icons/mast.png', 'map/icons/peak_small.png', 'map/icons/powertower.png', 'map/icons/pub.png', 'map/icons/restaurant.png', 'map/icons/rsmall.png', 'map/icons/stile.png', 'map/icons/viewpoint.png', 'map/icons/waypoint.png'], presence_tags = [], value_tags = ['highway', 'railway', 'amenity', 'contour', 'tourism', 'man_made', 'waterway', 'designation', 'power', 'name', 'natural', 'landuse', 'place', 'foot', 'barrier', 'bridge'];

    MapCSS.loadStyle('style_new', restyle, sprite_images, external_images, presence_tags, value_tags);
    MapCSS.preloadExternalImages('style_new');
})(MapCSS);
    
