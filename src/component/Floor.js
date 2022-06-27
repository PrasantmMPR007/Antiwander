import React, { Component } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Map, ImageOverlay, Marker, Popup } from "react-leaflet";
import Control from "react-leaflet-control";
import util from "../util/date.js";
import camera from "../image/icon/camera.png";
import f1 from "../image/floormap/F1.jpeg";
import f2 from "../image/floormap/F2.jpeg";
import f3 from "../image/floormap/F3.jpeg";
import f4 from "../image/floormap/F4.jpeg";
import GF from "../image/floormap/GF.jpeg";
import { Polyline } from "react-leaflet";
import TextField from "@material-ui/core/TextField";
import AutoComplete from "../controls/AutoComplete.js";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";

/* robinpowered */
class Floor extends Component {
  customPin = L.divIcon({
    className: "location-pin",
    html: `<img src=${camera}><div class="pin"></div><div class="pulse"></div>`,
    iconSize: [40, 40],
    iconAnchor: [24, 40],
  });

  constructor(props) {
    super(props);

    const iniBounds = L.latLngBounds(null, null);
    const filter = createFilterOptions();

    this.state = {
      currentZoomLevel: 0,
      bounds: iniBounds,
      targetFloor: "delta_b1",
      selectedFloor :{
        "CtrCode": 450,
        "FloorNo": 0,
        "FloorName": "G/F",
        "Image": GF
      },
      targetBuilding: "Building1",
      selectedBuilding: null,
      // {
      //   "Id": 3,
      //   "CtrCode": 450,
      //   "SortOrder": 450,
      //   "HomeCenterAbbr": "LKSCA",
      //   "HomeCenterName": "李嘉誠護理安老院",
      //   "HomeCenterDescription": "李嘉誠護理安老院"
      // },
      myfloors: [
        { id: 1, buildingid: 1, floor: "delta_f1" },
        { id: 2, buildingid: 2, floor: "delta_b1" },
      ],
      floors: {
        delta_Gf: {
          name: "GF",
          image: GF,
          markers: [
            {
              id: 1,
              lat: -385,
              lng: 204,
            },
            {
              id: 2,
              lat: 316,
              lng: 719,
            },
            {
              id: 3,
              lat: -541,
              lng: 592,
            },
            {
              id: 4,
              lat: -1052,
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

          ],
          polylines: [
            { id: 1, lat: -165, lng: 90.5 },
            { id: 2, lat: -170, lng: 150.5 },
            { id: 3, lat: -160.5, lng: 350.5 },
          ],
        },

        delta_f1: {
          name: "F1",
          image: f1,
          markers: [
            {
              id: 1,
              lat: -162.40000000596046,
              lng: 100.69999694824219,
            },
            {
              id: 2,
              lat: -142.90000000596046,
              lng: 164.6999969482422,
            },
            {
              id: 3,
              lat: -155.90000000596046,
              lng: 309.6999969482422,
            },
            {
              id: 4,
              lat: -144.40000000596046,
              lng: 368.6999969482422,
            },
          ],
          polylines: [
            { id: 1, lat: -165, lng: 90.5 },
            { id: 2, lat: -170, lng: 150.5 },
            { id: 3, lat: -160.5, lng: 350.5 },
          ],
        },
        delta_b1: {
          name: "B1",
          image: f2,
          markers: [
            { id: 1, lat: -128.93, lng: 93.199 },
            { id: 2, lat: -130, lng: 146.199 },
            { id: 3, lat: -127, lng: 208.199 },
            { id: 4, lat: -128.5, lng: 284.199 },
            { id: 5, lat: -142.2, lng: 319.199 },
            { id: 6, lat: -143.5, lng: 394.199 },

            // here add rfid sensor when map load
          ],
          polylines: [
            { id: 1, lat: -151, lng: 84 },
            { id: 2, lat: -154.14, lng: 142.199 },
            { id: 3, lat: -143.5, lng: 216.6995 },
            { id: 4, lat: -163.5, lng: 289.5 },
            { id: 5, lat: -160.5, lng: 360.5 },
          ],
        },
      },
      floors:[
          {
            "CtrCode": 450,
            "FloorNo": 0,
            "FloorName": "G/F",
            "Image": GF
          },
          {
            "CtrCode": 450,
            "FloorNo": 1,
            "FloorName": "1/F",
            "Image": f1
          },
          {
            "CtrCode": 450,
            "FloorNo": 2,
            "FloorName": "2/F",
            "Image": f2
          },
          {
            "CtrCode": 450,
            "FloorNo": 3,
            "FloorName": "3/F",
            "Image": f3
          },
          {
            "CtrCode": 450,
            "FloorNo": 4,
            "FloorName": "4/F",
            "Image": f4
          }
         ],

      // buildings: [
      //   { id: 1, label: "Building1" },
      //   { id: 2, label: "Building2" },
      // ],

      buildings:null,
      //[
      //   {
      //     "Id": 1,
      //     "CtrCode": 20,
      //     "SortOrder": 20,
      //     "HomeCenterAbbr": "GSHE",
      //     "HomeCenterName": "牧愛長者之家\t",
      //     "HomeCenterDescription": "牧愛長者之家"
      //   },
      //   {
      //     "Id": 2,
      //     "CtrCode": 255,
      //     "SortOrder": 255,
      //     "HomeCenterAbbr": "HLCE",
      //     "HomeCenterName": "恩慈長者之家",
      //     "HomeCenterDescription": "恩慈長者之家"
      //   },
      //   {
      //     "Id": 3,
      //     "CtrCode": 450,
      //     "SortOrder": 450,
      //     "HomeCenterAbbr": "LKSCA",
      //     "HomeCenterName": "李嘉誠護理安老院",
      //     "HomeCenterDescription": "李嘉誠護理安老院"
      //   },
      //   {
      //     "Id": 4,
      //     "CtrCode": 600,
      //     "SortOrder": 600,
      //     "HomeCenterAbbr": "SPHE",
      //     "HomeCenterName": "保羅長者之家",
      //     "HomeCenterDescription": "保羅長者之家"
      //   },
      //   {
      //     "Id": 5,
      //     "CtrCode": 730,
      //     "SortOrder": 730,
      //     "HomeCenterAbbr": "CAC",
      //     "HomeCenterName": "張國亮伉儷安老服務大樓",
      //     "HomeCenterDescription": "香港聖公會張國亮伉儷安老服務大樓"
      //   },
      //   {
      //     "Id": 6,
      //     "CtrCode": 1250,
      //     "SortOrder": 1250,
      //     "HomeCenterAbbr": "WKRSACH",
      //     "HomeCenterName": "湖景宿舍",
      //     "HomeCenterDescription": "湖景宿舍"
      //   },
      //   {
      //     "Id": 7,
      //     "CtrCode": 1350,
      //     "SortOrder": 1350,
      //     "HomeCenterAbbr": "LWHE",
      //     "HomeCenterName": "林護長者之家",
      //     "HomeCenterDescription": "林護長者之家"
      //   },
      //   {
      //     "Id": 8,
      //     "CtrCode": 3630,
      //     "SortOrder": 3630,
      //     "HomeCenterAbbr": "TKOACC",
      //     "HomeCenterName": "將軍澳安老服務大樓",
      //     "HomeCenterDescription": "將軍澳安老服務大樓"
      //   },
      //   {
      //     "Id": 9,
      //     "CtrCode": 3700,
      //     "SortOrder": 3700,
      //     "HomeCenterAbbr": "NH",
      //     "HomeCenterName": "護養院",
      //     "HomeCenterDescription": "護養院"
      //   },
      //   {
      //     "Id": 10,
      //     "CtrCode": 3750,
      //     "SortOrder": 3750,
      //     "HomeCenterAbbr": "PGR",
      //     "HomeCenterName": "康恩園",
      //     "HomeCenterDescription": "康恩園"
      //   }
      //  ],

       Polylines:[
        {
          "CtrCode": 450,
          "LocationId": 50137,
          "ClientId": "RC-45-0300",
          "StartTime": "4/1/2022 12:29:12",
          "X": 1103,
          "Y": 474,
          "LocDesc": "四樓升降機",
          "FloorNo": 4,
          "FloorDesc": "4/F"
        },
        {
          "CtrCode": 450,
          "LocationId": 50123,
          "ClientId": "RC-45-0300",
          "StartTime": "4/1/2022 12:29:30",
          "X": 1027,
          "Y": 475,
          "LocDesc": "四樓門口",
          "FloorNo": 4,
          "FloorDesc": "4/F"
        },
        {
          "CtrCode": 450,
          "LocationId": 50136,
          "ClientId": "RC-45-0300",
          "StartTime": "4/1/2022 12:33:45",
          "X": 1103,
          "Y": 474,
          "LocDesc": "四樓升降機",
          "FloorNo": 4,
          "FloorDesc": "4/F"
        },
        {
          "CtrCode": 450,
          "LocationId": 50123,
          "ClientId": "RC-45-0300",
          "StartTime": "4/1/2022 12:33:51",
          "X": 1027,
          "Y": 475,
          "LocDesc": "四樓門口",
          "FloorNo": 4,
          "FloorDesc": "4/F"
        },
        {
          "CtrCode": 450,
          "LocationId": 50137,
          "ClientId": "RC-45-0300",
          "StartTime": "4/1/2022 12:33:53",
          "X": 1103,
          "Y": 474,
          "LocDesc": "四樓升降機",
          "FloorNo": 4,
          "FloorDesc": "4/F"
        },
        {
          "CtrCode": 450,
          "LocationId": 50124,
          "ClientId": "RC-45-0300",
          "StartTime": "4/1/2022 12:33:56",
          "X": 1027,
          "Y": 475,
          "LocDesc": "四樓門口",
          "FloorNo": 4,
          "FloorDesc": "4/F"
        },
        {
          "CtrCode": 450,
          "LocationId": 50107,
          "ClientId": "RC-45-0300",
          "StartTime": "4/1/2022 15:26:37",
          "X": 553,
          "Y": 455,
          "LocDesc": "四樓B翼後樓梯",
          "FloorNo": 4,
          "FloorDesc": "4/F"
        }
       ],
       newline: [
        { id: 1, lat: -165, lng: 90.5 },
        { id: 2, lat: -170, lng: 150.5 },
        { id: 3, lat: -160.5, lng: 350.5 },
      ],
       

    };
  }

 async componentDidMount() {
   
    const map = this.map.leafletElement;

    map.on("zoomend", () => {
      const updatedZoomLevel = map.getZoom();
      this.handleZoomLevelChange(updatedZoomLevel);
    });

    map.on("click", (e) => {
      //this.handleAddMarker(e, map);
      //this.handleChangeFloor();
    });

    //  const w = 1280 * 2,
    //h = 806 * 2;
    const w = 2000 * 2,
      h = 1600 * 2;

    const southWest = map.unproject([0, h], map.getMaxZoom() - 1);
    const northEast = map.unproject([w, 0], map.getMaxZoom() - 1);

    const bounds = new L.LatLngBounds(southWest, northEast);
    this.setState({ bounds: bounds });
    map.setMaxBounds(bounds);


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' })
  };
  const response = await fetch('http://www.klconnectit.com/sms/api/system/HomeCenterList', requestOptions);
  const data = await response.json();
  this.setState({buildings: data.data });

  this.setState({selectedBuilding: this.state.buildings.find(x=>x.ctrCode === 450) })

  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleZoomLevelChange(newZoomLevel) {
    this.setState({ currentZoomLevel: newZoomLevel });
  }

  handleChangeFloor(e) {
    this.setState({ targetFloor: e.target.dataset.floor });
  }

  handleChangeBuilding(e) {
    this.setState({ targetFloor: e.target.dataset.Building });
  }

  handleAddMarker(e, map) {
    const cid = util.datetick();

    var _marker = {
      id: cid,
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    };

    // add Marker to state
    let _floors = Object.assign({}, this.state.floors);
    _floors[this.state.targetFloor].markers = [
      ..._floors[this.state.targetFloor].markers,
      _marker,
    ];

    this.setState({
      floors: _floors,
    });
  }
  buildingonchange = (event, newvalue) => {
    const { name, value } = event.target;
    console.log(value);
    if(value !==null && value !=='' && value !==undefined){
    this.setState({
      selectedBuilding: value,
      myfloors:this.state.myfloors.filter(x=>x.ctrCode===value.ctrCode)
    });
  }
  };

  flooronchange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    console.log(this.state.myfloors);
    value !=null?
    this.setState({
        selectedFloor: value,  
  }):"";
  };

  flooroptionlabel = (option) => {
    return option.FloorName || "";
  };

  getfloor=()=>{
      let buildbasefloor=this.state.myfloors.filter(x=>x.buildingid=this.state.selectedBuilding.id);
      console.log(buildbasefloor);
     return  buildbasefloor;
  }

  buildingoptionlabel = (option) => {
    // Value selected with enter, right from the input
    // if (typeof option === "string") {
    //   return option;
    // }
    // Add "xxx" option created dynamically
    // if (option.inputValue) {
    //   return option.inputValue;
    // }
    // Regular option
    return option.homeCenterDescription || ""; // option ? : "";
  };

  updateMarkerPosition(e) {
    const { lat, lng } = e.target.getLatLng();

    let updatedMarkers = this.state.floors[this.state.targetFloor].markers.map(
      (m) => {
        if (m.id === e.target.options.id) {
          m.lat = lat;
          m.lng = lng;
        }
        return m;
      }
    );

    // update Marker to state
    this.setState({ markers: updatedMarkers });
  }

  showpolylines(){
    const mymarkers=[];

    let updatedpolylines = this.state.Polylines.map(
      (m) => {
        mymarkers.push({lat:m.X,lng:m.Y})
      },
      
    );
    
      this.setState({newline:updatedpolylines})
      console.log(mymarkers);
      console.log(updatedpolylines);
      alert('hi');
  }

  render() {
    window.console.log(
      "this.state.currentZoomLevel ->",
      this.state.currentZoomLevel
    );

    return (
      <div className="App">
        <Map
          ref={(m) => {
            this.map = m;
          }}
          center={[0, 0]}
          zoom={1}
          minZoom={1}
          maxZoom={4}
          crs={L.CRS.Simple}
          attributionControl={false}
        >
          {(this.state.selectedFloor !==null && this.state.selectedFloor !=='' 
          &&this.state.selectedFloor !== undefined) ?
                  <ImageOverlay
            url={this.state.floors.find(x=>x.FloorNo == this.state.selectedFloor.FloorNo).Image }
            bounds={this.state.bounds}
          >
            {/* {this.state.floors[this.state.targetFloor].markers.map((m) => (
              <Marker
                key={m.id}
                id={m.id}
                draggable={true}
                onDragend={this.updateMarkerPosition.bind(this)}
                position={[m.lat, m.lng]}
                icon={this.customPin}
              >
                <Popup minWidth={90}>
                  <span>
                    {" "}
                    Lat:{m.lat}, Lng:{m.lng}{" "}
                  </span>
                </Popup>
              </Marker>
            ))} */}
            {/* this.state.Polylines && this.state.Polylines.map((m) => (
                this.setState({newline:[ this.state.newline,{id:1,lat:m.X,lng:m.Y}] })
               
            
              )) */}

            <Polyline
              
              positions={this.state.newline}
            ></Polyline>
          </ImageOverlay>: null
  }
          <Control position="topright">
            <div style={{ backgroundColor: "transparent", padding: "5px" }}>
              <button
                onClick={this.handleChangeFloor.bind(this)}
                data-floor="delta_f1"
              >
                F1
              </button>
              <button
                onClick={this.handleChangeFloor.bind(this)}
                data-floor="delta_b1"
              >
                F2
              </button>
              <button
                onClick={this.showpolylines.bind(this)}
                
              >
                GF
              </button>
            </div>
          </Control>
          <Control position="topright">
            <div style={{ backgroundColor: "transparent", padding: "5px" }}>
              {console.log(this.state.buildings)}
              {this.state.buildings &&
              <AutoComplete
                value={this.state.selectedBuilding}
                label="Centre"
                name="building"
                id="building"
                options={this.state.buildings.filter(x=>x.ctrCode === 450)}
                defaultValue={this.state.buildings.find(x=>x.ctrCode === 450)}
                onChange={this.buildingonchange}
                getOptionLabel={this.buildingoptionlabel}
                getOptionSelected={(option, value) =>
                  value.homeCenterDescription === option.homeCenterDescription
                }
                fullWidth={true}
                freesolo={true}
              />}
              {this.state.floors &&
              <AutoComplete
                value={this.state.selectedFloor}
                label="Floor"
                name="Floor"
                id="Floor"
                options={this.state.floors}
                onChange={this.flooronchange}
                getOptionLabel={this.flooroptionlabel}
                getOptionSelected={(option, value) =>
                  value.FloorName === option.FloorName
                }
                fullWidth={true}
                freesolo={true}
              />
  }
            </div>
          </Control>
        </Map>
        {/* <ol>
          {this.state.floors[this.state.targetFloor].markers.map((m) => (
            <li key={m.id}>{`[${m.id}] (${m.lat},${m.lng})`}</li>
          ))}
        </ol> */}
      </div>
    );
  }
}

export default Floor;


//http://www.klconnectit.com/sms/api/system/WanderingPath?ctr=0450&flr=0&cln=MC1133-19&st=2021-12-24 08:00:00.000&et=2021-12-24 23:00:00.000
//http://www.klconnectit.com/sms/api/system/HomeCenterFloorList?ctr=0450