import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Map, ImageOverlay, Marker, Popup } from "react-leaflet";
import { CRS } from "leaflet";
import Control from "react-leaflet-control";
import camera from "../image/icon/camera.png";
import f1 from "../image/floormap/F1.jpeg";
import f2 from "../image/floormap/F2.jpeg";
import f3 from "../image/floormap/F3.jpeg";
import f4 from "../image/floormap/F4.jpeg";
import GF from "../image/floormap/GF.jpeg";
import AutoComplete from "../controls/AutoComplete.js";
import TimePicker from "../controls/TimePicker";
import Button from '@material-ui/core/Button';

function MyMap() {
  const [Floor, setFloor] = useState(null);
  const [Floorlist, setFloorlist] = useState(null);
  const [center, setCenter] = useState({});
  const [Centerlist, setCenterlist] = useState(null);
  const [WanderingPath, setWanderingPath] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [sttime, setSttime] = useState(new Date());
  const [endtime, setEndtime] = useState(new Date());
  const mapRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [client, SetClient] = useState(null);
  const [clientlist, SetClientlist] = useState(null);

  useEffect(() => {
    const map = mapRef.current.leafletElement;
    const mybounds = [
      [-5, -10],
      [780, 900],
    ];
    const image = L.imageOverlay(GF, mybounds).addTo(map);
    map.fitBounds(image.getBounds());

    SetClientlist([
      "MC1002-16",
      "MC1005-16",
      "MC1013-17",
      "MC1036-17",
      "MC1073-18",
      "MC1079-18",
      "MC1084-18",
      "MC1101-19",
      "MC1110-19",
      "MC1120-19",
      "MC1123-19",
      "MC1126-19",
      "MC1131-19",
      "MC1133-19",
      "MC1156-20",
      "MC1162-20",
      "MC1163-20",
      "MC1167-20",
      "MC1177-21",
      "MC1188-21",
      "MC1189-21",
      "MC1190-21",
      "MC1196-21",
      "MC1202-21",
      "MC812-11",
      "MC974-16",
      "MC991-16",
      "MC992-16",
      "MC997-16",
    ]);
  }, []);

  useEffect(() => {
    const myhomecenter = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      };
      const response = await fetch(
        "http://www.klconnectit.com/sms/api/system/HomeCenterList",
        requestOptions
      );
      const data = await response.json();
      let lks = data.data.find((x) => x.ctrCode === "0450");
      setCenterlist(data.data);
      setCenter(lks);
    };

    myhomecenter();
  }, []);

  useEffect(() => {
    const myFloors = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ctr: center && center.ctrCode }),
      };
      const response = await fetch(
        "http://www.klconnectit.com/sms/api/system/HomeCenterFloorList?ctr=" +
          center.ctrCode,
        requestOptions
      );
      const data = await response.json();
      console.log(data.data);
      setFloorlist(data.data);
    };
    myFloors();
  }, [center]);

  useEffect(() => {
    const map = mapRef.current.leafletElement;
    const mybounds = [
      [-5, -10],
      [780, 900],
    ];
    console.log(Floor);
    const GetFloorImage = () => {
      return Floor !== null
        ? Floor.floorNo === 0
          ? GF
          : Floor.floorNo === 1
          ? f1
          : Floor.floorNo === 2
          ? f2
          : Floor.floorNo === 3
          ? f3
          : Floor.floorNo === 4
          ? f4
          : ""
        : "";
    };
    console.log(GetFloorImage());
    const image = L.imageOverlay(GetFloorImage(), mybounds).addTo(map);
    map.fitBounds(image.getBounds());
  }, [Floor && Floor]);

  useEffect(() => {
    const map = mapRef.current.leafletElement;
    const mybounds = [
      [-5, -10],
      [780, 900],
    ];
    console.log(Floor);
    const GetFloorImage = () => {
      return Floor !== null
        ? Floor.floorNo === 0
          ? GF
          : Floor.floorNo === 1
          ? f1
          : Floor.floorNo === 2
          ? f2
          : Floor.floorNo === 3
          ? f3
          : Floor.floorNo === 4
          ? f4
          : ""
        : "";
    };
    console.log(GetFloorImage());
    const image = L.imageOverlay(GetFloorImage(), mybounds).addTo(map);
    map.fitBounds(image.getBounds());
  }, [Floor && Floor]);

  useEffect(() => {
    const GetWanderingPath = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      };
      if (
        center != null &&
        Floor != null &&
        sttime != null &&
        endtime != null
      ) {
        const response = await fetch(
          "http://www.klconnectit.com/sms/api/system/WanderingPath?ctr=" +
            center.ctrCode +
            "&flr=" +
            Floor.floorNo +
            "&cln=" +
            "MC1133-19" +
            "&st=2021-12-24 08:00:00.000&et=2021-12-24 23:00:00.000",
          requestOptions
        );
        const data = await response.json();
        setWanderingPath(data.data);
      }
    };
    GetWanderingPath();
  }, [center, Floor && Floor]);




  const GetWanderingPath = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };
    if (
      center != null &&
      Floor != null &&
      client != null&&
      sttime != null &&
      endtime != null
    ) {
      const response = await fetch(
        "http://www.klconnectit.com/sms/api/system/WanderingPath?ctr=" +
          center.ctrCode.toString() +
          "&flr=" +
          Floor.floorNo.toString() +
          "&cln=" +
          client.toString() +
          "&st="+sttime.toString()+
          "&et="+endtime.toString(),
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      setWanderingPath(data.data);
    }
  };


  const searchclicked =(event)=>{
    GetWanderingPath();
  }



  const Centeronchange = (event) => {
    const { name, value } = event.target;
    if (value !== null && value !== "" && value !== undefined) {
      setCenter(value);
      setFloor(null);
    }
  };

  const Centeroptionlabel = (option) => {
    return option.homeCenterDescription || "";
  };

  const Flooronchange = (event) => {
    const { name, value } = event.target;
    if (value !== null && value !== "" && value !== undefined) {
      setFloor(value);
      console.log(value);
    }
  };

  const clientoptionlabel = (option) => {
    return option || "";
  };

  const clientonchange = (event) => {
    const { name, value } = event.target;
    if (value !== null && value !== "" && value !== undefined) {
      SetClient(value);
      console.log(value);
    }
  };

  const Flooroptionlabel = (option) => {
    return option.floorName || "";
  };

  const sttimeonchange = (event) => {
    const { name, value } = event.target;
    if (value !== null && value !== "" && value !== undefined) {
      setSttime(value);
      console.log(value);
    }
  };

  const endtimeonchange = (event) => {
    const { name, value } = event.target;
    if (value !== null && value !== "" && value !== undefined) {
      setEndtime(value);
      console.log(value);
    }
  };

  return (
    <div>
      <Map
        ref={mapRef}
        crs={CRS.Simple}
        boundsOptions={{ padding: [20, 20] }}
        style={{ height: "97vh" }}
        Zoom={zoom}
        minZoom={0}
        maxZoom={3}
        center={[0, 0]}
      >
        <Control position="topright">
          <div
            style={{
              backgroundColor: "transparent",
              padding: "5px",
              maxWidth: "220px",
            }}
          >
            <AutoComplete
              value={center}
              label="Center"
              name="Center"
              id="Center"
              options={Centerlist && Centerlist}
              onChange={Centeronchange}
              getOptionLabel={Centeroptionlabel}
              getOptionSelected={(option, value) =>
                value.homeCenterDescription === option.homeCenterDescription
              }
              fullWidth={true}
              freesolo={true}
            />

            <AutoComplete
              value={Floor}
              label="Floor"
              name="Floor"
              id="Floor"
              options={Floorlist && Floorlist}
              onChange={Flooronchange}
              getOptionLabel={Flooroptionlabel}
              getOptionSelected={(option, value) =>
                value.floorName === option.floorName
              }
              fullWidth={true}
              freesolo={true}
            />

            <AutoComplete
              value={client}
              label="Client"
              name="CLient"
              id="Client"
              options={clientlist && clientlist}
              onChange={clientonchange}
              getOptionLabel={clientoptionlabel}
              getOptionSelected={(option, value) => value === option}
              fullWidth={true}
              freesolo={true}
            />

            <TimePicker
              value={sttime}
              lable="Start Time"
              name="starttime"
              id="starttime"
              onChange={sttimeonchange}
            />

            <TimePicker
              value={endtime}
              lable="End Time"
              name="endtime"
              id="endtime"
              onChange={endtimeonchange}
            />
            
            <Button variant="contained" color="primary" onClick={searchclicked}>Search</Button>
          </div>
        </Control>
      </Map>
    </div>
  );
}

export default MyMap;
