import React, { useRef, useEffect } from 'react';
import 'ol/ol.css';
import { Map as OlMap, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import './Map.css';

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new OlMap({
      target: mapRef.current, 
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });

    return () => map.setTarget(null); 
  }, [center, zoom]);

  // return <div ref={mapRef} className={`map ${props.className}`} style={props.style}>
  //   <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60239.474406167385!2d76.47939279775544!3d9.594707998020604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062ba16c6b435f%3A0xbe2b02f68f8dd06e!2sKottayam%2C%20Kerala!5e1!3m2!1sen!2sin!4v1741957173731!5m2!1sen!2sin" width="100" height="50" style="border:0;" allowfullscreen="false" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  // </div>;
  // return <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>;
  return <div></div>;
};

export default Map;
