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
      targetBuilding: "Building1",
      selectedBuilding: {},
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
      buildings: [
        { id: 1, label: "Building1" },
        { id: 2, label: "Building2" },
      ],
    };
  }

  componentDidMount() {
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
      myfloors:this.state.myfloors.filter(x=>x.buildingid===value.id)
    });
  }
  };

  flooronchange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    console.log(this.state.myfloors);
    value !=null?
    this.setState({
        targetFloor: value.floor,
      
    }):"";
  };

  flooroptionlabel = (option) => {
    return option.floor || "";
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
    return option.label || ""; // option ? : "";
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
          {(this.state.targetFloor !==null && this.state.targetFloor !=='' 
          &&this.state.targetFloor !== undefined) ?
                  <ImageOverlay
            url={this.state.floors[this.state.targetFloor].image}
            bounds={this.state.bounds}
          >
            {this.state.floors[this.state.targetFloor].markers.map((m) => (
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
            ))}

            <Polyline
              positions={this.state.floors[this.state.targetFloor].polylines}
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
                onClick={this.handleChangeFloor.bind(this)}
                data-floor="delta_Gf"
              >
                GF
              </button>
            </div>
          </Control>
          <Control position="topright">
            <div style={{ backgroundColor: "transparent", padding: "5px" }}>
              <AutoComplete
                value={this.state.selectedBuilding}
                label="Centre"
                name="building"
                id="building"
                options={this.state.buildings}
                onChange={this.buildingonchange}
                getOptionLabel={this.buildingoptionlabel}
                getOptionSelected={(option, value) =>
                  value.label === option.label
                }
                fullWidth={true}
                freesolo={true}
              />

              <AutoComplete
                value={this.state.selectedFloor}
                
                label="Floor"
                name="Floor"
                id="Floor"
                options={this.state.myfloors}
                onChange={this.flooronchange}
                getOptionLabel={this.flooroptionlabel}
                getOptionSelected={(option, value) =>
                  value.floor === option.floor
                }
                fullWidth={true}
                freesolo={true}
              />
            </div>
          </Control>
        </Map>
        <ol>
          {this.state.floors[this.state.targetFloor].markers.map((m) => (
            <li key={m.id}>{`[${m.id}] (${m.lat},${m.lng})`}</li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Floor;
