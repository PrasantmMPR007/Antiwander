import React, { useEffect, useRef, useState } from 'react'
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Map, ImageOverlay, Marker, Popup } from "react-leaflet";
import Control from "react-leaflet-control";
import camera from "../image/icon/camera.png";
import f1 from "../image/floormap/F1.jpeg";
import f2 from "../image/floormap/F2.jpeg";
import f3 from "../image/floormap/F3.jpeg";
import f4 from "../image/floormap/F4.jpeg";
import GF from "../image/floormap/GF.jpeg";

//centre 
const centers=()=>{
  [
    {
      "Id": 1,
      "CtrCode": 20,
      "SortOrder": 20,
      "HomeCenterAbbr": "GSHE",
      "HomeCenterName": "牧愛長者之家\t",
      "HomeCenterDescription": "牧愛長者之家"
    },
    {
      "Id": 2,
      "CtrCode": 255,
      "SortOrder": 255,
      "HomeCenterAbbr": "HLCE",
      "HomeCenterName": "恩慈長者之家",
      "HomeCenterDescription": "恩慈長者之家"
    },
    {
      "Id": 3,
      "CtrCode": 450,
      "SortOrder": 450,
      "HomeCenterAbbr": "LKSCA",
      "HomeCenterName": "李嘉誠護理安老院",
      "HomeCenterDescription": "李嘉誠護理安老院"
    },
    {
      "Id": 4,
      "CtrCode": 600,
      "SortOrder": 600,
      "HomeCenterAbbr": "SPHE",
      "HomeCenterName": "保羅長者之家",
      "HomeCenterDescription": "保羅長者之家"
    },
    {
      "Id": 5,
      "CtrCode": 730,
      "SortOrder": 730,
      "HomeCenterAbbr": "CAC",
      "HomeCenterName": "張國亮伉儷安老服務大樓",
      "HomeCenterDescription": "香港聖公會張國亮伉儷安老服務大樓"
    },
    {
      "Id": 6,
      "CtrCode": 1250,
      "SortOrder": 1250,
      "HomeCenterAbbr": "WKRSACH",
      "HomeCenterName": "湖景宿舍",
      "HomeCenterDescription": "湖景宿舍"
    },
    {
      "Id": 7,
      "CtrCode": 1350,
      "SortOrder": 1350,
      "HomeCenterAbbr": "LWHE",
      "HomeCenterName": "林護長者之家",
      "HomeCenterDescription": "林護長者之家"
    },
    {
      "Id": 8,
      "CtrCode": 3630,
      "SortOrder": 3630,
      "HomeCenterAbbr": "TKOACC",
      "HomeCenterName": "將軍澳安老服務大樓",
      "HomeCenterDescription": "將軍澳安老服務大樓"
    },
    {
      "Id": 9,
      "CtrCode": 3700,
      "SortOrder": 3700,
      "HomeCenterAbbr": "NH",
      "HomeCenterName": "護養院",
      "HomeCenterDescription": "護養院"
    },
    {
      "Id": 10,
      "CtrCode": 3750,
      "SortOrder": 3750,
      "HomeCenterAbbr": "PGR",
      "HomeCenterName": "康恩園",
      "HomeCenterDescription": "康恩園"
    }
   ]
}

//Floor by centercode
const Floor=()=>{
  [
    {
      "CtrCode": 450,
      "FloorNo": 0,
      "FloorName": "G/F"
    },
    {
      "CtrCode": 450,
      "FloorNo": 1,
      "FloorName": "1/F"
    },
    {
      "CtrCode": 450,
      "FloorNo": 2,
      "FloorName": "2/F"
    },
    {
      "CtrCode": 450,
      "FloorNo": 3,
      "FloorName": "3/F"
    },
    {
      "CtrCode": 450,
      "FloorNo": 4,
      "FloorName": "4/F"
    }
   ]
}




function MyMap() {
const [Floor, setFloor]=useState(GF);
const [centre,setCentre]=useState([
  {
    CtrCode: 450,
    LocationId: 50137,
    ClientId: "RC-45-0300",
    StartTime: "4/1/2022 12:29:12",
    X: 1103,
    Y: 474,
    LocDesc: "四樓升降機",
    FloorNo: "4",
    FloorDesc: "4/F",
    FIELD10: ""
  },
  {
    CtrCode: 450,
    LocationId: 50123,
    ClientId: "RC-45-0300",
    StartTime: "4/1/2022 12:29:30",
    X: 1027,
    Y: 475,
    LocDesc: "四樓門口4",
    FloorNo: "4/F",
    FloorDesc: "",
    FIELD10: ""
  },
  {
    CtrCode: 450,
    LocationId: 50136,
    ClientId: "RC-45-0300",
    StartTime: "4/1/2022 12:33:45",
    X: 1103,
    Y: 474,
    LocDesc: "四樓升降機",
    FloorNo: "4",
    FloorDesc: "4/F",
    FIELD10: ""
  },
  {
    CtrCode: 450,
    LocationId: 50123,
    ClientId: "RC-45-0300",
    StartTime: "4/1/2022 12:33:51",
    X: 1027,
    Y: 475,
    LocDesc: "四樓門口4",
    FloorNo: "4/F",
    FloorDesc: "",
    FIELD10: ""
  },
  {
    CtrCode: 450,
    LocationId: 50137,
    ClientId: "RC-45-0300",
    StartTime: "4/1/2022 12:33:53",
    X: 1103,
    Y: 474,
    LocDesc: "四樓升降機",
    FloorNo: "4",
    FloorDesc: "4/F",
    FIELD10: ""
  },
  {
    CtrCode: 450,
    LocationId: 50124,
    ClientId: "RC-45-0300",
    StartTime: "4/1/2022 12:33:56",
    X: 1027,
    Y: 475,
    LocDesc: "四樓門口4",
    FloorNo: "4/F",
    FloorDesc: "",
    FIELD10: ""
  },
  {
    CtrCode: 450,
    LocationId: 50107,
    ClientId: "RC-45-0300",
    StartTime: "4/1/2022 15:26:37",
    X: 553,
    Y: 455,
    LocDesc: "四樓B翼後樓梯",
    FloorNo: "4",
    FloorDesc: "4/F",
    FIELD10: ""
  }
 ]);
const [bounds,setBounds]=useState(L.latLngBounds(null, null));
const [markers, setMarkers] = useState([{
    id: 1,
    lat: -385,
    lng: 204,
  },
  {
    id: 2,
    lat: -316,
    lng: 719,
  },
  {
    id: 3,
    lat: 241,
    lng: 592,
  },
  {
    id: 4,
    lat: -522,
    lng: 302,
  },
  {
    id: 5,
    lat: -848,
    lng: 736,
  },
  {
    id: 6,
    lat: -875,
    lng: 1244,
  },
  {
    id: 7,
    lat: -596,
    lng: 1252,
  },
]);
const mapRef = useRef(null);
const [zoom,setZoom]=useState({ currentZoomLevel: 1 });




   const handleZoomLevelChange=(newZoomLevel)=> {
        setZoom({ currentZoomLevel: newZoomLevel });
      }
    




useEffect(() => {
    const map = mapRef.current.leafletElement;
    map.on("zoomend", () => {
        const updatedZoomLevel = map.getZoom();
        handleZoomLevelChange(updatedZoomLevel);
      });
  

    const w = 2000 * 2,
      h = 1200 * 2;

    const southWest = map.unproject([0, h], map.getMaxZoom() - 1);
    const northEast = map.unproject([w, 0], map.getMaxZoom() - 1);

    const lbounds = new L.LatLngBounds(southWest, northEast);
    setBounds(lbounds);
    // const image = L.imageOverlay(
    //   Floor,
    //   lbounds
    // ).addTo(map);

    map.fitBounds(lbounds);
  
    map.setMaxBounds(bounds);
  }, []);
 

const customPin =()=> L.divIcon({
    className: "location-pin",
    html: `<img src=${camera}><div class="pin"></div><div class="pulse"></div>`,
    iconSize: [40, 40],
    iconAnchor: [24, 40],
  });


  return (
    <div>
        {/* <Map
          center={[0, 0]}
          zoom={1}
          minZoom={1}
          maxZoom={4}
          crs={L.CRS.Simple}
          attributionControl={false}
          bo
        > <ImageOverlay
        url={Floor}
        bounds={bounds}
      >
        </ImageOverlay>

        </Map> */}
        <Map
        ref={mapRef}
        minZoom={1}
        maxZoom={4}
        crs={L.CRS.Simple}
        maxBoundsViscosity={1.0}
        boundsOptions={{ padding: [50, 50] }}
        style={{ height: "96vh",width:"96vw" }}
      >
        <ImageOverlay
        url={Floor}
        bounds={bounds}
      >
        {markers.map((m) => (
         <Marker
                key={m.id}
                id={m.id}
                draggable={true}
                
                position={[m.lat, m.lng]}
                icon={L.divIcon({
                    className: "location-pin",
                    html: `<img src=${camera}><div class="pin"></div><div class="pulse"></div>`,
                    iconSize: [40, 40],
                    iconAnchor: [24, 40],
                  })}
              >
                <Popup minWidth={90}>
                  <span>
                    {" "}
                    Lat:{m.lat}, Lng:{m.lng}{" "}
                  </span>
                </Popup>
              </Marker>
              ))}
        </ImageOverlay>

      </Map>

    </div>
  )
}

export default MyMap