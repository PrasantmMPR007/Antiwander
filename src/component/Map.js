import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Map, ImageOverlay, Marker, Popup, Polyline } from "react-leaflet";
import { CRS } from "leaflet";
import Control from "react-leaflet-control";
import camera from "../image/icon/camera.png";
import f1 from "../image/floormap/F1.jpeg";
import f2 from "../image/floormap/F2.jpeg";
import f3 from "../image/floormap/F3.jpeg";
import f4 from "../image/floormap/F4.jpeg";
import GF from "../image/floormap/GF.jpeg";
import AutoComplete from "../controls/AutoComplete.js";
import MyTimePicker from "../controls/TimePicker";
import DatePicker from "../controls/DatePicker";
import Button from "@material-ui/core/Button";
import { format } from "date-fns";
//import { DatePicker } from "@material-ui/pickers";

function MyMap() {
  const [Floor, setFloor] = useState(null);
  const [Floorlist, setFloorlist] = useState(null);
  const [center, setCenter] = useState({});
  const [Centerlist, setCenterlist] = useState(null);
  const [WanderingPath, setWanderingPath] = useState(null);
  const [Wandererline, setWandererline] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [stdate, setStdate] = useState(new Date());
  const [sttime, setSttime] = useState(new Date());
  const [endtime, setEndtime] = useState(new Date());
  const mapRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [client, SetClient] = useState(null);
  const [clientlist, SetClientlist] = useState(null);
  const [search, setSearch] = useState(false);
  const [crsfloor, serCrsfloor] = useState(true);
  const [crsfloorlist, setCrsFloorlist] = useState(null);
  const [popcontrol, setPopControl] = useState(true);

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
      console.log(
        center + "" + Floor + "" + client + "" + sttime + "" + endtime + ""
      );
      if (
        center != null &&
        Floor != null &&
        client != null &&
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
            "&st=" +
            format(sttime, "yyyy-MM-dd HH:mm:ss") +
            "&et=" +
            format(endtime, "yyyy-MM-dd HH:mm:ss"),
          requestOptions
        );
        const data = await response.json();
        console.log(data);
        data.success && setWanderingPath(data.data);
        let co = [];
        data.success && data.data.length > 0
          ? setWandererline(
              data.data
                .filter((x) => x.floorNo == Floor.floorNo)
                .map((x) => {
                  //Xy Coordinates Conversion
                  var yx = L.latLng;

                  var xy = (x, y) => {
                    if (L.Util.isArray(x)) {
                      // When doing xy([x, y]);
                      return yx(x[1], x[0]);
                    }
                    return yx(y, x); // When doing xy(x, y);
                  };
                  co.push(xy(x.x, x.y));
                  //co.push({ lat: x.y / 2, lng: x.x / 2 });

                  return co;
                })
            )
          : alert("No records found");

        setSearch(false);
      }

      // else {
      //   setWandererline(null);
      //   setSearch(false);
      // }
    };

    GetWanderingPath();
  }, [search]);

  const searchclicked = (event) => {
    // GetWanderingPath();
    setSearch(true);
    console.log(Wandererline);
  };

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

  const crsfloorchange = (value) => {
    setFloor(value);
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

  const stdateonchange = (event) => {
    const { name, value } = event.target;
    if (value !== null && value !== "" && value !== undefined) {
      setStdate(value);
      console.log(value);
    }
  };

  const sttimeonchange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    if (value !== null && value !== "" && value !== undefined) {
      setSttime(new Date(stdate + " " + value + ":00"));
      console.log(new Date(stdate + " " + value + ":00"));
    }
  };

  const endtimeonchange = (event) => {
    const { name, value } = event.target;
    if (value !== null && value !== "" && value !== undefined) {
      setEndtime(new Date(stdate + " " + value + ":00"));
      console.log(new Date(stdate + " " + value + ":00"));
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
        center={[0, 1600]}
      >
        {Wandererline && <Polyline positions={Wandererline}></Polyline>}

        {crsfloorlist && (
          <Control position="topright">
            <div style={{ backgroundColor: "transparent", padding: "5px" }}>
              <button onClick={Flooronchange()}>F1</button>
            </div>
          </Control>
        )}

        <Control position="topright">
          <div
            style={{
              backgroundColor: "transparent",
              padding: "5px",
              maxWidth: "220px",
            }}
          >
            {Centerlist && (
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
            )}
            {Floorlist && (
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
            )}
            {clientlist && (
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
            )}
            <DatePicker
              value={stdate}
              lable="Date"
              name="date"
              id="stdate"
              disablePast={false}
              onChange={stdateonchange}
            />
            <MyTimePicker
              value={sttime}
              label="Start Time"
              name="starttime"
              id="starttime"
              onChange={sttimeonchange}
            />

            <MyTimePicker
              value={endtime}
              label="End Time"
              name="endtime"
              id="endtime"
              onChange={endtimeonchange}
            />

            <Button variant="contained" color="primary" onClick={searchclicked}>
              Search
            </Button>
          </div>
        </Control>
      </Map>
    </div>
  );
}

export default MyMap;
