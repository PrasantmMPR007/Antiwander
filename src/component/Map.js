import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L, { latLng, latLngBounds, popup } from "leaflet";
import { Map, ImageOverlay, Marker, Popup, Polyline } from "react-leaflet";
import { CRS } from "leaflet";
import Control from "react-leaflet-control";
import camera from "../image/icon/camera.png";
import f1 from "../image/floormap/1F.jpg";
import f2 from "../image/floormap/2F.JPG";
import f3 from "../image/floormap/3F.JPG";
import f4 from "../image/floormap/4F.JPG";
import GF from "../image/floormap/GF.jpg";
import AutoComplete from "../controls/AutoComplete.js";
import MyTimePicker from "../controls/TimePicker";
import DatePicker from "../controls/DatePicker";
import Button from "@material-ui/core/Button";
import { format } from "date-fns";
//import { DatePicker } from "@material-ui/pickers";

function MyMap() {
  const [FloorNo, setFloorNo] = useState(null);
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
  const customPin = (count) =>
    L.divIcon({
      className: "location-pin",
      html: `<div class="pin"><div class="mytext">${count}</div></div><div class="pulse"></div>`,
      iconSize: [40, 40],
      iconAnchor: [24, 40],
    });
  //<img src=${camera}>

  const viewRatio = 0.5;
  const mybounds = [
    [0, 0],
    [1240 * viewRatio, 1754 * viewRatio],
  ];
  useEffect(() => {
    const map = mapRef.current.leafletElement;

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
    if (center && center) myFloors();
  }, [center]);

  const GetFloorImage = (Floor) => {
    return Floor !== null && Floor !== undefined
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

  useEffect(() => {
    if (Floor !== null && Floor !== undefined) {
      const map = mapRef.current.leafletElement;
      const image = L.imageOverlay(GetFloorImage(Floor), mybounds).addTo(map);
      map.fitBounds(image.getBounds());
      const co = [];
      console.log(WanderingPath);
      setWandererline(
        WanderingPath.filter((x) => x.floorNo === Floor.floorNo).map((x) => {
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
      );
    }
  }, [Floor]);

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
      console.log(format(new Date(sttime + ":00"), "yyyy-MM-dd HH:mm:ss"));
      if (
        center != null &&
        //Floor != null &&
        client != null &&
        sttime != null &&
        endtime != null
      ) {
        const response = await fetch(
          "http://www.klconnectit.com/sms/api/system/WanderingPath?ctr=" +
            center.ctrCode.toString() +
            "&flr=" +
            "-1" +
            "&cln=" +
            client.toString() +
            "&st=" +
            format(new Date(sttime + ":00"), "yyyy-MM-dd HH:mm:ss") +
            "&et=" +
            format(new Date(endtime + ":00"), "yyyy-MM-dd HH:mm:ss"),
          requestOptions
        );
        const data = await response.json();
        console.log(data);

        //Remove Duplicate Floor value from Wanderig path
        const unique = data.success && [
          ...new Set(data.data.map((x) => x.floorNo)),
        ];
        console.log(unique);
        data.success && setWanderingPath(data.data);
        console.log(data.success && data.data.length > 0 ? true : false);
        let co = [];
        if (data.success && data.data.length > 0) {
          console.log(Floorlist);
          console.log(
            Floorlist.filter(function (obj) {
              return unique.indexOf(obj.floorNo) !== -1;
            })
          );
          setCrsFloorlist(
            Floorlist.filter((x) => unique.some((y) => y === x.floorNo))
          );
          const DefaultSelectedFloor = Floorlist.filter((x) =>
            unique.some((y) => y === x.floorNo)
          );
          console.log(DefaultSelectedFloor.find((x) => x.floorNo));
          setFloor(DefaultSelectedFloor.find((x) => x.floorNo));

          // after search Default Map load
          const map = mapRef.current.leafletElement;
          const image = L.imageOverlay(
            GetFloorImage(DefaultSelectedFloor.find((x) => x.floorNo)),
            mybounds
          ).addTo(map);

          map.fitBounds(image.getBounds());
          console.log(DefaultSelectedFloor.find((x) => x.floorNo));

          const Newwanderline = (Data, SelectedFloor) => {
            let co1 = [];
            Data.filter(
              (x) => x.floorNo === SelectedFloor.find((x) => x.floorNo).floorNo
            ).map((x) => {
              let Colocal = [];
              //Xy Coordinates Conversion
              var yx = L.latLng;

              var xy = (x, y) => {
                if (L.Util.isArray(x)) {
                  // When doing xy([x, y]);
                  return yx(x[1], x[0]);
                }
                return yx(y, x); // When doing xy(x, y);
              };
              //Colocal.push(xy(x.x, x.y));
              co1.push(Colocal);
              return co1;
            });
            return co1;
          };
          console.log(Newwanderline(data.data, DefaultSelectedFloor));

          DefaultSelectedFloor !== null &&
            DefaultSelectedFloor !== undefined &&
            setWandererline(
              data.data
                .filter(
                  (x) =>
                    x.floorNo ===
                    DefaultSelectedFloor.find((x) => x.floorNo).floorNo
                )
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
            );
        } else {
          alert("No records found");
          setWandererline(null);
          setCrsFloorlist(null);
        }
        //setSearch(false);
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
    setSearch(!search);
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
      setSearch(search);
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
      setSttime(value);
      console.log(value);
    }
  };

  const todateonchange = (event) => {
    const { name, value } = event.target;
    if (value !== null && value !== "" && value !== undefined) {
      setEndtime(value);
      console.log(value);
    }
  };

  let a = 1;

  return (
    <div>
      <Map
        ref={mapRef}
        crs={CRS.Simple}
        boundsOptions={{ padding: [0, 0] }}
        //style={{ height: "97vh" }}
        Zoom={zoom}
        minZoom={-1}
        maxZoom={3}
        // center={[0, 1600]}
      >
        {Wandererline &&
          Wandererline[0].map((e) => (
            <Marker
              id={a}
              key={a}
              position={[(1240 - e.lat) * viewRatio, e.lng * viewRatio]}
              icon={customPin(a)}
            >
              <Popup>
                <span>
                  {" "}
                  X:{e.lng}, Y:{e.lat}
                </span>
              </Popup>
              {a++}
            </Marker>
          ))}
        {/* {Wandererline && <Polyline positions={Wandererline[0]}></Polyline>} */}
        {crsfloorlist && (
          <Control position="topright">
            <div
              style={{
                backgroundColor: "transparent",
                padding: "5px 25px",
                width: "220px",
                maxWidth: "220px",
              }}
            >
              <AutoComplete
                value={Floor}
                label="Floor"
                name="Floor"
                id="Floor"
                options={crsfloorlist && crsfloorlist}
                onChange={Flooronchange}
                getOptionLabel={Flooroptionlabel}
                getOptionSelected={(option, value) =>
                  value.floorName === option.floorName
                }
                fullWidth={true}
                //freesolo={true}
              />
              <table
                style={{
                  backgroundColor: "transparent",
                  padding: "5px 25px",
                  width: "220px",
                  maxWidth: "220px",
                }}
              >
                <tr>
                  <th>Wandering Path</th>
                </tr>
                {/* please add filter to selected floorNo */}
                {Floor &&
                  WanderingPath.filter((u) => u.floorNo === Floor.floorNo).map(
                    (p) => (
                      <tr>
                        <td>{p.startTime.toString() + " @ " + p.locDesc}</td>
                      </tr>
                    )
                  )}
              </table>
            </div>
          </Control>
        )}
        <Control position="topright">
          <div
            style={{
              backgroundColor: "transparent",
              padding: "5px 25px",
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
                //freesolo={true}
              />
            )}

            {clientlist && (
              <AutoComplete
                value={client}
                label="Client"
                name="Client"
                id="Client"
                options={clientlist && clientlist}
                onChange={clientonchange}
                getOptionLabel={clientoptionlabel}
                getOptionSelected={(option, value) => value === option}
                fullWidth={true}
                //freesolo={true}
              />
            )}
            <DatePicker
              value={sttime}
              label="Start Date"
              name="date"
              id="stdate"
              onChange={stdateonchange}
            />
            <DatePicker
              value={endtime}
              label="To Date"
              name="todate"
              id="todate"
              onChange={todateonchange}
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
