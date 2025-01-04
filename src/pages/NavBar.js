import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import { BusRoutes } from '../api_caller';
import { getAllBusServices } from '../helper_functions';
import './stylesheets/navbar.css';
import { dijkstra, shortest_path } from '../travel_algorithms';
import ToggleThemeButton from './Components/ToggleThemeButton';

const NavBar = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const location = useLocation(); 
  const elementId = "light";
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserLoggedIn(true);
    }
  }, []);

  function logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  async function test_function() {
  const mrtlink = [
      {
          "mrt": "Choa Chu Kang_BP",
          "code": "BP1",
          "closest_stops": [
              {
                  "BusStopCode": "44531",
                  "Name": "Opp Choa Chu Kang Stn",
                  "Distance": 0.038678023576956974
              },
              {
                  "BusStopCode": "44539",
                  "Name": "Lot 1/Choa Chu Kang Stn",
                  "Distance": 0.058336238719064064
              }
          ]
      },
      {
          "mrt": "Fajar",
          "code": "BP10",
          "closest_stops": [
              {
                  "BusStopCode": "44771",
                  "Name": "Fajar Stn",
                  "Distance": 0.0039836244784785
              },
              {
                  "BusStopCode": "44779",
                  "Name": "Opp Fajar Stn",
                  "Distance": 0.07536539983628116
              }
          ]
      },
      {
          "mrt": "Segar",
          "code": "BP11",
          "closest_stops": [
              {
                  "BusStopCode": "44709",
                  "Name": "Blk 547C",
                  "Distance": 0.15387021933407347
              },
              {
                  "BusStopCode": "44701",
                  "Name": "Blk 548B",
                  "Distance": 0.1868013706798812
              },
              {
                  "BusStopCode": "44691",
                  "Name": "BLK 485",
                  "Distance": 0.214535940848827
              },
              {
                  "BusStopCode": "44699",
                  "Name": "BLK 457",
                  "Distance": 0.2187501710881901
              },
              {
                  "BusStopCode": "44611",
                  "Name": "Blk 516",
                  "Distance": 0.23594284704481389
              },
              {
                  "BusStopCode": "44619",
                  "Name": "Blk 506",
                  "Distance": 0.23683033812577284
              }
          ]
      },
      {
          "mrt": "Jelapang",
          "code": "BP12",
          "closest_stops": [
              {
                  "BusStopCode": "44721",
                  "Name": "Opp Jelapang Stn",
                  "Distance": 0.04656246357201278
              },
              {
                  "BusStopCode": "44821",
                  "Name": "Blk 651",
                  "Distance": 0.13023526443390013
              },
              {
                  "BusStopCode": "44829",
                  "Name": "Opp Blk 650",
                  "Distance": 0.16205620475684196
              },
              {
                  "BusStopCode": "44931",
                  "Name": "Blk 643 CP",
                  "Distance": 0.17123063886421336
              },
              {
                  "BusStopCode": "44831",
                  "Name": "BLK 519",
                  "Distance": 0.19555094321463695
              }
          ]
      },
      {
          "mrt": "Senja",
          "code": "BP13",
          "closest_stops": [
              {
                  "BusStopCode": "44649",
                  "Name": "Blk 541A CP",
                  "Distance": 0.0934622561471206
              },
              {
                  "BusStopCode": "44641",
                  "Name": "Blk 602",
                  "Distance": 0.11299556195163295
              },
              {
                  "BusStopCode": "44799",
                  "Name": "Blk 610",
                  "Distance": 0.17701242636950845
              }
          ]
      },
      {
          "mrt": "South View",
          "code": "BP2",
          "closest_stops": [
              {
                  "BusStopCode": "44459",
                  "Name": "Opp South View Stn",
                  "Distance": 0.08224706388380107
              },
              {
                  "BusStopCode": "44451",
                  "Name": "Bef South View Stn",
                  "Distance": 0.1290994621568101
              },
              {
                  "BusStopCode": "44489",
                  "Name": "Blk 220",
                  "Distance": 0.17407167089246048
              },
              {
                  "BusStopCode": "44481",
                  "Name": "Blk 223",
                  "Distance": 0.1797187997385016
              }
          ]
      },
      {
          "mrt": "Keat Hong",
          "code": "BP3",
          "closest_stops": [
              {
                  "BusStopCode": "44449",
                  "Name": "Palm Gdns",
                  "Distance": 0.1593303937395216
              },
              {
                  "BusStopCode": "44441",
                  "Name": "Blk 239",
                  "Distance": 0.18011420943538944
              },
              {
                  "BusStopCode": "44119",
                  "Name": "Blk 204",
                  "Distance": 0.21188064901398834
              },
              {
                  "BusStopCode": "44109",
                  "Name": "Opp Hong San Terr",
                  "Distance": 0.2224530973754253
              },
              {
                  "BusStopCode": "44479",
                  "Name": "Blk 206",
                  "Distance": 0.22502002476722935
              },
              {
                  "BusStopCode": "44121",
                  "Name": "Blk 113",
                  "Distance": 0.23429948534936546
              },
              {
                  "BusStopCode": "44471",
                  "Name": "Blk 234",
                  "Distance": 0.23627750717219664
              },
              {
                  "BusStopCode": "44129",
                  "Name": "Opp Blk 113",
                  "Distance": 0.24847091164568366
              },
              {
                  "BusStopCode": "44111",
                  "Name": "Opp Blk 203",
                  "Distance": 0.2725364162229271
              }
          ]
      },
      {
          "mrt": "Teck Whye",
          "code": "BP4",
          "closest_stops": [
              {
                  "BusStopCode": "44139",
                  "Name": "Opp Blk 26",
                  "Distance": 0.1916801468920175
              },
              {
                  "BusStopCode": "44131",
                  "Name": "Blk 26",
                  "Distance": 0.19225051494909107
              },
              {
                  "BusStopCode": "44411",
                  "Name": "Blk 108",
                  "Distance": 0.2114714881055659
              },
              {
                  "BusStopCode": "44421",
                  "Name": "Blk 25",
                  "Distance": 0.23405587735320027
              }
          ]
      },
      {
          "mrt": "Phoenix",
          "code": "BP5",
          "closest_stops": [
              {
                  "BusStopCode": "44141",
                  "Name": "Phoenix Stn",
                  "Distance": 0.04176900752121444
              },
              {
                  "BusStopCode": "44149",
                  "Name": "Opp Phoenix Stn",
                  "Distance": 0.07509635464598159
              }
          ]
      },
      {
          "mrt": "Bukit Panjang_BP",
          "code": "BP6",
          "closest_stops": [
              {
                  "BusStopCode": "44029",
                  "Name": "Bt Panjang Stn Exit A/Lrt",
                  "Distance": 0.038134418976646295
              },
              {
                  "BusStopCode": "44021",
                  "Name": "Bt Panjang Stn Exit B",
                  "Distance": 0.047309302683859925
              },
              {
                  "BusStopCode": "44031",
                  "Name": "Aft Bt Panjang Stn",
                  "Distance": 0.05301637815993987
              },
              {
                  "BusStopCode": "45009",
                  "Name": "BT PANJANG INT",
                  "Distance": 0.12907256391310096
              },
              {
                  "BusStopCode": "44859",
                  "Name": "Maysprings Condo",
                  "Distance": 0.14062615740734022
              }
          ]
      },
      {
          "mrt": "Petir",
          "code": "BP7",
          "closest_stops": [
              {
                  "BusStopCode": "44209",
                  "Name": "Opp Petir Stn",
                  "Distance": 0.07341339668866814
              },
              {
                  "BusStopCode": "44201",
                  "Name": "Aft Petir Stn",
                  "Distance": 0.08526715062164232
              },
              {
                  "BusStopCode": "44191",
                  "Name": "Opp Blk 171",
                  "Distance": 0.12326401717675316
              },
              {
                  "BusStopCode": "44199",
                  "Name": "Blk 171",
                  "Distance": 0.12563778220018484
              }
          ]
      },
      {
          "mrt": "Pending",
          "code": "BP8",
          "closest_stops": [
              {
                  "BusStopCode": "44221",
                  "Name": "Opp Pending Stn",
                  "Distance": 0.032110410096703686
              },
              {
                  "BusStopCode": "44229",
                  "Name": "Bef Pending Stn",
                  "Distance": 0.047449217377786394
              }
          ]
      },
      {
          "mrt": "Bangkit",
          "code": "BP9",
          "closest_stops": [
              {
                  "BusStopCode": "44329",
                  "Name": "Bangkit Stn",
                  "Distance": 0.019316919713880262
              },
              {
                  "BusStopCode": "44321",
                  "Name": "Opp Bangkit Stn",
                  "Distance": 0.04145280096526112
              }
          ]
      },
      {
          "mrt": "Dhoby Ghaut_CC",
          "code": "CC1",
          "closest_stops": [
              {
                  "BusStopCode": "08031",
                  "Name": "Dhoby Ghaut Stn Exit B",
                  "Distance": 0.058968477910417205
              },
              {
                  "BusStopCode": "08057",
                  "Name": "Dhoby Ghaut Stn",
                  "Distance": 0.06555086935458956
              }
          ]
      },
      {
          "mrt": "MacPherson_CC",
          "code": "CC10",
          "closest_stops": [
              {
                  "BusStopCode": "70371",
                  "Name": "Macpherson Stn Exit A",
                  "Distance": 0.10258792801971489
              },
              {
                  "BusStopCode": "70379",
                  "Name": "Opp Macpherson Stn Exit A",
                  "Distance": 0.1139411917820084
              },
              {
                  "BusStopCode": "70269",
                  "Name": "Citipoint Ind Cplx",
                  "Distance": 0.16887046981221387
              },
              {
                  "BusStopCode": "70251",
                  "Name": "Macpherson Stn Exit C",
                  "Distance": 0.19757620636878556
              },
              {
                  "BusStopCode": "70259",
                  "Name": "Macpherson Stn Exit B",
                  "Distance": 0.2087083991491609
              }
          ]
      },
      {
          "mrt": "Tai Seng",
          "code": "CC11",
          "closest_stops": [
              {
                  "BusStopCode": "70281",
                  "Name": "Aft Tai Seng Stn",
                  "Distance": 0.051718491119581954
              },
              {
                  "BusStopCode": "70289",
                  "Name": "Aft Tai Seng Stn Exit C",
                  "Distance": 0.06425228786647393
              }
          ]
      },
      {
          "mrt": "Bartley",
          "code": "CC12",
          "closest_stops": [
              {
                  "BusStopCode": "62071",
                  "Name": "BARTLEY STN EXIT A",
                  "Distance": 0.047800007001620785
              },
              {
                  "BusStopCode": "62079",
                  "Name": "AFT BARTLEY STN EXIT B",
                  "Distance": 0.0959605506988304
              },
              {
                  "BusStopCode": "62069",
                  "Name": "Bef Upp Paya Lebar Rd",
                  "Distance": 0.13479290422553514
              },
              {
                  "BusStopCode": "62061",
                  "Name": "Aft Upp Paya Lebar Rd",
                  "Distance": 0.167476447328933
              }
          ]
      },
      {
          "mrt": "Serangoon_CC",
          "code": "CC13",
          "closest_stops": [
              {
                  "BusStopCode": "62139",
                  "Name": "S'Goon Stn Exit A/Blk 413",
                  "Distance": 0.09356154716565253
              },
              {
                  "BusStopCode": "66351",
                  "Name": "S'goon Stn Exit E",
                  "Distance": 0.0965912038082102
              },
              {
                  "BusStopCode": "66359",
                  "Name": "S'Goon Stn Exit C/Blk 201",
                  "Distance": 0.1235724074125086
              },
              {
                  "BusStopCode": "62189",
                  "Name": "S'Goon Stn Exit D/Blk 416",
                  "Distance": 0.13404815158629493
              },
              {
                  "BusStopCode": "62131",
                  "Name": "S'Goon Stn Exit H",
                  "Distance": 0.14405548904621704
              },
              {
                  "BusStopCode": "62179",
                  "Name": "Blk 421",
                  "Distance": 0.1816910112755643
              }
          ]
      },
      {
          "mrt": "Lorong Chuan",
          "code": "CC14",
          "closest_stops": [
              {
                  "BusStopCode": "66399",
                  "Name": "Opp Lor Chuan Stn Exit B",
                  "Distance": 0.01653659925688559
              },
              {
                  "BusStopCode": "66391",
                  "Name": "Lor Chuan Stn Exit A",
                  "Distance": 0.17091193564193077
              },
              {
                  "BusStopCode": "66021",
                  "Name": "New Tech Pk",
                  "Distance": 0.18343898105163464
              },
              {
                  "BusStopCode": "66029",
                  "Name": "St. Gabriel's Pr Sch",
                  "Distance": 0.2624625367442641
              }
          ]
      },
      {
          "mrt": "Bishan_CC",
          "code": "CC15",
          "closest_stops": [
              {
                  "BusStopCode": "53231",
                  "Name": "BISHAN STN",
                  "Distance": 0.06927737415226383
              },
              {
                  "BusStopCode": "53239",
                  "Name": "OPP BISHAN STN",
                  "Distance": 0.08567739493458879
              }
          ]
      },
      {
          "mrt": "Marymount",
          "code": "CC16",
          "closest_stops": [
              {
                  "BusStopCode": "53129",
                  "Name": "Opp Marymount Stn",
                  "Distance": 0.13304178112387227
              },
              {
                  "BusStopCode": "53119",
                  "Name": "Aft Bishan St 21",
                  "Distance": 0.17408114977119482
              },
              {
                  "BusStopCode": "53121",
                  "Name": "Marymount Stn",
                  "Distance": 0.17466391343353904
              },
              {
                  "BusStopCode": "53029",
                  "Name": "Shunfu Est",
                  "Distance": 0.2329755072880501
              },
              {
                  "BusStopCode": "53319",
                  "Name": "Bosch",
                  "Distance": 0.2716554522366378
              }
          ]
      },
      {
          "mrt": "Caldecott_CC",
          "code": "CC17",
          "closest_stops": [
              {
                  "BusStopCode": "52219",
                  "Name": "Bef Caldecott Stn Exit 3",
                  "Distance": 0.04818730206912846
              },
              {
                  "BusStopCode": "52241",
                  "Name": "Bef Caldecott Stn/Savh",
                  "Distance": 0.1179668974076805
              },
              {
                  "BusStopCode": "52559",
                  "Name": "Caldecott Stn Exit 1",
                  "Distance": 0.1383377908007678
              },
              {
                  "BusStopCode": "52551",
                  "Name": "Caldecott Stn Exit 4",
                  "Distance": 0.149788837586982
              },
              {
                  "BusStopCode": "52249",
                  "Name": "Aft Caldecott Stn",
                  "Distance": 0.18617318598535001
              },
              {
                  "BusStopCode": "52211",
                  "Name": "Lighthouse Sch",
                  "Distance": 0.20847690941791633
              }
          ]
      },
      {
          "mrt": "Botanic Gardens_CC",
          "code": "CC19",
          "closest_stops": [
              {
                  "BusStopCode": "41021",
                  "Name": "Botanic Gdns Stn",
                  "Distance": 0.02513771666534494
              },
              {
                  "BusStopCode": "41029",
                  "Name": "Opp Botanic Gdns Stn",
                  "Distance": 0.10616146673214452
              }
          ]
      },
      {
          "mrt": "Bras Basah",
          "code": "CC2",
          "closest_stops": [
              {
                  "BusStopCode": "04179",
                  "Name": "Aft Bras Basah Stn Exit A",
                  "Distance": 0.11245250790276438
              },
              {
                  "BusStopCode": "04121",
                  "Name": "SMU",
                  "Distance": 0.13365294186554752
              },
              {
                  "BusStopCode": "04019",
                  "Name": "OPP BENCOOLEN STN EXIT B",
                  "Distance": 0.15777813862311266
              },
              {
                  "BusStopCode": "04151",
                  "Name": "Cath Of The Good Shepherd",
                  "Distance": 0.18525388154640163
              },
              {
                  "BusStopCode": "08069",
                  "Name": "Bencoolen Stn Exit B",
                  "Distance": 0.19731939616765273
              },
              {
                  "BusStopCode": "01012",
                  "Name": "Hotel Grand Pacific",
                  "Distance": 0.22083110558932842
              },
              {
                  "BusStopCode": "04159",
                  "Name": "Aft Chijmes",
                  "Distance": 0.23022534195514446
              }
          ]
      },
      {
          "mrt": "Farrer Road",
          "code": "CC20",
          "closest_stops": [
              {
                  "BusStopCode": "11119",
                  "Name": "Farrer Rd Stn Exit A",
                  "Distance": 0.018421992168188656
              },
              {
                  "BusStopCode": "11111",
                  "Name": "Farrer Rd Stn Exit B",
                  "Distance": 0.02066097762859178
              }
          ]
      },
      {
          "mrt": "Holland Village",
          "code": "CC21",
          "closest_stops": [
              {
                  "BusStopCode": "11419",
                  "Name": "Holland V Stn Exit A",
                  "Distance": 0.12540510099375288
              },
              {
                  "BusStopCode": "11269",
                  "Name": "Opp Holland Village",
                  "Distance": 0.14287576872347135
              },
              {
                  "BusStopCode": "11261",
                  "Name": "Holland Village",
                  "Distance": 0.14483139843459733
              }
          ]
      },
      {
          "mrt": "Buona Vista_CC",
          "code": "CC22",
          "closest_stops": [
              {
                  "BusStopCode": "11361",
                  "Name": "Buona Vista Stn Exit C",
                  "Distance": 0.08628085460653764
              },
              {
                  "BusStopCode": "11369",
                  "Name": "Buona Vista Stn Exit D",
                  "Distance": 0.10540402043159833
              },
              {
                  "BusStopCode": "11181",
                  "Name": "Opp Blk 43",
                  "Distance": 0.17474068136938822
              },
              {
                  "BusStopCode": "11189",
                  "Name": "Blk 43",
                  "Distance": 0.20481547890136448
              }
          ]
      },
      {
          "mrt": "one-north",
          "code": "CC23",
          "closest_stops": [
              {
                  "BusStopCode": "18051",
                  "Name": "One-North Stn",
                  "Distance": 0.10838305280514293
              },
              {
                  "BusStopCode": "18059",
                  "Name": "Opp One-North Stn",
                  "Distance": 0.12410898566950782
              },
              {
                  "BusStopCode": "18159",
                  "Name": "One-North Stn/Galaxis",
                  "Distance": 0.17043464249061024
              },
              {
                  "BusStopCode": "18151",
                  "Name": "Opp One-North Stn/Galaxis",
                  "Distance": 0.18543616864689755
              }
          ]
      },
      {
          "mrt": "Kent Ridge",
          "code": "CC24",
          "closest_stops": [
              {
                  "BusStopCode": "18331",
                  "Name": "Kent Ridge Stn Exit A/NUH",
                  "Distance": 0.06977555873727637
              },
              {
                  "BusStopCode": "15131",
                  "Name": "Kent Ridge Stn",
                  "Distance": 0.08466013452490939
              },
              {
                  "BusStopCode": "18339",
                  "Name": "Opp Kent Ridge Stn Exit A",
                  "Distance": 0.09206749909157015
              },
              {
                  "BusStopCode": "15139",
                  "Name": "Kent Ridge Stn Exit B",
                  "Distance": 0.10090287903962361
              }
          ]
      },
      {
          "mrt": "Haw Par Villa",
          "code": "CC25",
          "closest_stops": [
              {
                  "BusStopCode": "16011",
                  "Name": "Opp Haw Par Villa Stn",
                  "Distance": 0.017495462297283527
              },
              {
                  "BusStopCode": "16229",
                  "Name": "Haw Par Villa Stn",
                  "Distance": 0.043888339875665434
              },
              {
                  "BusStopCode": "16019",
                  "Name": "Haw Par Villa Stn",
                  "Distance": 0.04708798290890419
              },
              {
                  "BusStopCode": "16221",
                  "Name": "Opp Haw Par Villa Stn",
                  "Distance": 0.07449801249898184
              }
          ]
      },
      {
          "mrt": "Pasir Panjang",
          "code": "CC26",
          "closest_stops": [
              {
                  "BusStopCode": "15191",
                  "Name": "Pasir Panjang Stn/Fc",
                  "Distance": 0.12060455684519027
              },
              {
                  "BusStopCode": "15199",
                  "Name": "Opp Currency Hse",
                  "Distance": 0.17517281258450418
              },
              {
                  "BusStopCode": "15209",
                  "Name": "Bef Pasir Panjang Stn",
                  "Distance": 0.18244767044236326
              },
              {
                  "BusStopCode": "15201",
                  "Name": "Aft Pasir Panjang Stn",
                  "Distance": 0.2231417891036445
              }
          ]
      },
      {
          "mrt": "Labrador Park",
          "code": "CC27",
          "closest_stops": [
              {
                  "BusStopCode": "14189",
                  "Name": "Aft Alexandra Rd",
                  "Distance": 0.13961306122595993
              },
              {
                  "BusStopCode": "15141",
                  "Name": "Labrador Pk Stn",
                  "Distance": 0.20818611598003356
              },
              {
                  "BusStopCode": "15049",
                  "Name": "Opp Alexandra Retail Ctr",
                  "Distance": 0.2608110196152831
              },
              {
                  "BusStopCode": "15041",
                  "Name": "Alexandra Retail Ctr",
                  "Distance": 0.2746340182187427
              },
              {
                  "BusStopCode": "15149",
                  "Name": "Opp Labrador Pk Stn",
                  "Distance": 0.2756348689628881
              }
          ]
      },
      {
          "mrt": "Telok Blangah",
          "code": "CC28",
          "closest_stops": [
              {
                  "BusStopCode": "14161",
                  "Name": "Telok Blangah Stn",
                  "Distance": 0.03252205465189815
              },
              {
                  "BusStopCode": "14169",
                  "Name": "Opp Telok Blangah Stn",
                  "Distance": 0.08300532984926344
              }
          ]
      },
      {
          "mrt": "HarbourFront_CC",
          "code": "CC29",
          "closest_stops": [
              {
                  "BusStopCode": "14141",
                  "Name": "HarbourFront Stn/Vivocity",
                  "Distance": 0.035451755349194425
              },
              {
                  "BusStopCode": "14119",
                  "Name": "Opp VivoCity",
                  "Distance": 0.06071263634812781
              }
          ]
      },
      {
          "mrt": "Esplanade",
          "code": "CC3",
          "closest_stops": [
              {
                  "BusStopCode": "01619",
                  "Name": "Esplanade Stn Exit F",
                  "Distance": 0.15464469105911505
              },
              {
                  "BusStopCode": "02119",
                  "Name": "Opp War Memorial Pk",
                  "Distance": 0.17214446301874362
              },
              {
                  "BusStopCode": "02151",
                  "Name": "Suntec Convention Ctr",
                  "Distance": 0.20832059650524795
              },
              {
                  "BusStopCode": "01611",
                  "Name": "Aft Raffles Hotel",
                  "Distance": 0.23494300598902315
              },
              {
                  "BusStopCode": "02049",
                  "Name": "Raffles Hotel",
                  "Distance": 0.25851433608386365
              }
          ]
      },
      {
          "mrt": "Promenade_CC",
          "code": "CC4",
          "closest_stops": [
              {
                  "BusStopCode": "02169",
                  "Name": "Promenade Stn Exit B",
                  "Distance": 0.0844286499315989
              },
              {
                  "BusStopCode": "02161",
                  "Name": "Aft Promenade Stn Exit C",
                  "Distance": 0.15623883315779208
              },
              {
                  "BusStopCode": "02159",
                  "Name": "Opp Suntec Convention Ctr",
                  "Distance": 0.19582287323306685
              },
              {
                  "BusStopCode": "02149",
                  "Name": "Suntec Twr Three",
                  "Distance": 0.20561247562337856
              },
              {
                  "BusStopCode": "02141",
                  "Name": "Suntec Twr Two",
                  "Distance": 0.23098191846819607
              }
          ]
      },
      {
          "mrt": "Nicoll Highway",
          "code": "CC5",
          "closest_stops": [
              {
                  "BusStopCode": "80169",
                  "Name": "Nicoll Highway Stn",
                  "Distance": 0.11607462137174075
              },
              {
                  "BusStopCode": "80161",
                  "Name": "Opp Nicoll Highway Stn",
                  "Distance": 0.13726456240272086
              }
          ]
      },
      {
          "mrt": "Stadium",
          "code": "CC6",
          "closest_stops": [
              {
                  "BusStopCode": "80191",
                  "Name": "Opp S'pore Indoor Stadium",
                  "Distance": 0.13000179655925587
              },
              {
                  "BusStopCode": "80199",
                  "Name": "Stadium Stn",
                  "Distance": 0.1388173725581361
              }
          ]
      },
      {
          "mrt": "Mountbatten",
          "code": "CC7",
          "closest_stops": [
              {
                  "BusStopCode": "80271",
                  "Name": "Opp Mountbatten Stn",
                  "Distance": 0.1440310228323535
              },
              {
                  "BusStopCode": "80279",
                  "Name": "Mountbatten Stn Exit B",
                  "Distance": 0.15972138083084791
              },
              {
                  "BusStopCode": "80189",
                  "Name": "Opp Kallang Squash Ctr",
                  "Distance": 0.20744661702613967
              }
          ]
      },
      {
          "mrt": "Dakota",
          "code": "CC8",
          "closest_stops": [
              {
                  "BusStopCode": "81181",
                  "Name": "Dakota Stn Exit A/Blk 99",
                  "Distance": 0.017024150347631453
              },
              {
                  "BusStopCode": "81189",
                  "Name": "Dakota Stn Exit B/Blk 60",
                  "Distance": 0.03264729299809486
              }
          ]
      },
      {
          "mrt": "Paya Lebar_CC",
          "code": "CC9",
          "closest_stops": [
              {
                  "BusStopCode": "81111",
                  "Name": "Paya Lebar Stn Exit B",
                  "Distance": 0.06536431616048784
              },
              {
                  "BusStopCode": "81119",
                  "Name": "Paya Lebar Stn Exit C",
                  "Distance": 0.09002827834115962
              }
          ]
      },
      {
          "mrt": "Bayfront_CE",
          "code": "CE1",
          "closest_stops": [
              {
                  "BusStopCode": "03509",
                  "Name": "Bayfront Stn Exit B/MBS",
                  "Distance": 0.07677297766266694
              },
              {
                  "BusStopCode": "03511",
                  "Name": "Aft Bayfront Stn Exit E",
                  "Distance": 0.10672023535059552
              },
              {
                  "BusStopCode": "03519",
                  "Name": "Bayfront Stn Exit A",
                  "Distance": 0.1737502018449671
              }
          ]
      },
      {
          "mrt": "Marina Bay_CE",
          "code": "CE2",
          "closest_stops": [
              {
                  "BusStopCode": "03539",
                  "Name": "Marina Bay Stn",
                  "Distance": 0.2797017621793172
              },
              {
                  "BusStopCode": "03579",
                  "Name": "Opp Downtown Stn",
                  "Distance": 0.45523617505068176
              },
              {
                  "BusStopCode": "03529",
                  "Name": "Downtown Stn Exit E",
                  "Distance": 0.5183815695625895
              },
              {
                  "BusStopCode": "03339",
                  "Name": "Aft Marina Gdns Dr",
                  "Distance": 0.5283562532498655
              }
          ]
      },
      {
          "mrt": "Tanah Merah_CG",
          "code": "CG",
          "closest_stops": [
              {
                  "BusStopCode": "85091",
                  "Name": "Tanah Merah Stn Exit B",
                  "Distance": 0.03611238664300339
              },
              {
                  "BusStopCode": "85099",
                  "Name": "Tanah Merah Stn Exit A",
                  "Distance": 0.04681152068384922
              }
          ]
      },
      {
          "mrt": "Expo_CG",
          "code": "CG1",
          "closest_stops": [
              {
                  "BusStopCode": "96301",
                  "Name": "EXPO STN EXIT B",
                  "Distance": 0.1381308483763679
              },
              {
                  "BusStopCode": "96309",
                  "Name": "EXPO STN EXIT E",
                  "Distance": 0.1607201622049133
              }
          ]
      },
      {
          "mrt": "Changi Airport",
          "code": "CG2",
          "closest_stops": [
              {
                  "BusStopCode": "95129",
                  "Name": "Changi Airport Ter 2",
                  "Distance": 0.26002167196929976
              },
              {
                  "BusStopCode": "95109",
                  "Name": "Changi Airport Ter 3",
                  "Distance": 0.2630069740771402
              }
          ]
      },
      {
          "mrt": "Bukit Panjang_DT",
          "code": "DT1",
          "closest_stops": [
              {
                  "BusStopCode": "44029",
                  "Name": "Bt Panjang Stn Exit A/Lrt",
                  "Distance": 0.038134418976646295
              },
              {
                  "BusStopCode": "44021",
                  "Name": "Bt Panjang Stn Exit B",
                  "Distance": 0.047309302683859925
              },
              {
                  "BusStopCode": "44031",
                  "Name": "Aft Bt Panjang Stn",
                  "Distance": 0.05301637815993987
              },
              {
                  "BusStopCode": "45009",
                  "Name": "BT PANJANG INT",
                  "Distance": 0.12907256391310096
              },
              {
                  "BusStopCode": "44859",
                  "Name": "Maysprings Condo",
                  "Distance": 0.14062615740734022
              }
          ]
      },
      {
          "mrt": "Stevens_DT",
          "code": "DT10",
          "closest_stops": [
              {
                  "BusStopCode": "40081",
                  "Name": "STEVENS STN EXIT 1",
                  "Distance": 0.06613101915595317
              },
              {
                  "BusStopCode": "40229",
                  "Name": "BEF STEVENS STN EXIT 2",
                  "Distance": 0.10933734699300975
              },
              {
                  "BusStopCode": "40221",
                  "Name": "STEVENS STN EXIT 3",
                  "Distance": 0.12973107147939225
              }
          ]
      },
      {
          "mrt": "Newton_DT",
          "code": "DT11",
          "closest_stops": [
              {
                  "BusStopCode": "40181",
                  "Name": "Newton Stn Exit A",
                  "Distance": 0.07222954415953087
              },
              {
                  "BusStopCode": "40189",
                  "Name": "Newton Stn Exit B",
                  "Distance": 0.11415694364348773
              },
              {
                  "BusStopCode": "40049",
                  "Name": "Opp Newton Stn Exit C",
                  "Distance": 0.11822264596720015
              },
              {
                  "BusStopCode": "40041",
                  "Name": "Newton Stn Exit C",
                  "Distance": 0.1201895362128295
              }
          ]
      },
      {
          "mrt": "Little India_DT",
          "code": "DT12",
          "closest_stops": [
              {
                  "BusStopCode": "40019",
                  "Name": "Little India Stn",
                  "Distance": 0.013308187719662296
              },
              {
                  "BusStopCode": "40011",
                  "Name": "LITTLE INDIA STN EXIT A",
                  "Distance": 0.06106970387906646
              }
          ]
      },
      {
          "mrt": "Rochor",
          "code": "DT13",
          "closest_stops": [
              {
                  "BusStopCode": "07531",
                  "Name": "Rochor Stn",
                  "Distance": 0.03344254234129262
              },
              {
                  "BusStopCode": "07539",
                  "Name": "Bef Rochor Stn Exit B",
                  "Distance": 0.10183722400813189
              }
          ]
      },
      {
          "mrt": "Bugis_DT",
          "code": "DT14",
          "closest_stops": [
              {
                  "BusStopCode": "01059",
                  "Name": "Bugis Stn Exit B",
                  "Distance": 0.025276559019613558
              },
              {
                  "BusStopCode": "01113",
                  "Name": "Bugis Stn Exit A",
                  "Distance": 0.07152683152181291
              },
              {
                  "BusStopCode": "01112",
                  "Name": "Opp Bugis Stn Exit C",
                  "Distance": 0.11074137272273207
              },
              {
                  "BusStopCode": "01139",
                  "Name": "Bugis Stn/Parkview Sq",
                  "Distance": 0.12053897644835876
              },
              {
                  "BusStopCode": "01119",
                  "Name": "Aft Bugis Stn Exit C",
                  "Distance": 0.14873921179959654
              }
          ]
      },
      {
          "mrt": "Promenade_DT",
          "code": "DT15",
          "closest_stops": [
              {
                  "BusStopCode": "02169",
                  "Name": "Promenade Stn Exit B",
                  "Distance": 0.0844286499315989
              },
              {
                  "BusStopCode": "02161",
                  "Name": "Aft Promenade Stn Exit C",
                  "Distance": 0.15623883315779208
              },
              {
                  "BusStopCode": "02159",
                  "Name": "Opp Suntec Convention Ctr",
                  "Distance": 0.19582287323306685
              },
              {
                  "BusStopCode": "02149",
                  "Name": "Suntec Twr Three",
                  "Distance": 0.20561247562337856
              },
              {
                  "BusStopCode": "02141",
                  "Name": "Suntec Twr Two",
                  "Distance": 0.23098191846819607
              }
          ]
      },
      {
          "mrt": "Bayfront_DT",
          "code": "DT16",
          "closest_stops": [
              {
                  "BusStopCode": "03509",
                  "Name": "Bayfront Stn Exit B/MBS",
                  "Distance": 0.07677297766266694
              },
              {
                  "BusStopCode": "03511",
                  "Name": "Aft Bayfront Stn Exit E",
                  "Distance": 0.10672023535059552
              },
              {
                  "BusStopCode": "03519",
                  "Name": "Bayfront Stn Exit A",
                  "Distance": 0.1737502018449671
              }
          ]
      },
      {
          "mrt": "Downtown",
          "code": "DT17",
          "closest_stops": [
              {
                  "BusStopCode": "03579",
                  "Name": "Opp Downtown Stn",
                  "Distance": 0.06202236892907693
              },
              {
                  "BusStopCode": "03529",
                  "Name": "Downtown Stn Exit E",
                  "Distance": 0.06615234160772279
              }
          ]
      },
      {
          "mrt": "Telok Ayer",
          "code": "DT18",
          "closest_stops": [
              {
                  "BusStopCode": "03041",
                  "Name": "Telok Ayer Stn Exit A",
                  "Distance": 0.04203057516862224
              },
              {
                  "BusStopCode": "03021",
                  "Name": "Prudential Twr",
                  "Distance": 0.14651507187043733
              },
              {
                  "BusStopCode": "03031",
                  "Name": "Raffles Pl Stn Exit F",
                  "Distance": 0.23537357174158188
              }
          ]
      },
      {
          "mrt": "Chinatown_DT",
          "code": "DT19",
          "closest_stops": [
              {
                  "BusStopCode": "05049",
                  "Name": "Chinatown Stn Exit E",
                  "Distance": 0.06895869319117537
              },
              {
                  "BusStopCode": "05022",
                  "Name": "Aft Chinatown Stn Exit D",
                  "Distance": 0.08709186429294043
              },
              {
                  "BusStopCode": "05013",
                  "Name": "Chinatown Stn Exit C",
                  "Distance": 0.15371089999232004
              },
              {
                  "BusStopCode": "05131",
                  "Name": "Opp Hong Lim Cplx",
                  "Distance": 0.18197616762167015
              }
          ]
      },
      {
          "mrt": "Cashew",
          "code": "DT2",
          "closest_stops": [
              {
                  "BusStopCode": "43109",
                  "Name": "Cashew Stn",
                  "Distance": 0.10709194964469852
              },
              {
                  "BusStopCode": "43091",
                  "Name": "Bef Cashew Stn",
                  "Distance": 0.11795862388096212
              },
              {
                  "BusStopCode": "43099",
                  "Name": "Assumption Pathway Sch",
                  "Distance": 0.11856092128455592
              }
          ]
      },
      {
          "mrt": "Fort Canning",
          "code": "DT20",
          "closest_stops": [
              {
                  "BusStopCode": "04339",
                  "Name": "FORT CANNING STN EXIT B",
                  "Distance": 0.09641711372027437
              },
              {
                  "BusStopCode": "04329",
                  "Name": "Opp UE Sq",
                  "Distance": 0.10783327554674833
              },
              {
                  "BusStopCode": "04331",
                  "Name": "BEF FORT CANNING STN",
                  "Distance": 0.11594972111553166
              },
              {
                  "BusStopCode": "04321",
                  "Name": "UE Sq",
                  "Distance": 0.12770349131247927
              },
              {
                  "BusStopCode": "13109",
                  "Name": "UE Sq/Bef Mohd Sultan Rd",
                  "Distance": 0.20194701463437598
              }
          ]
      },
      {
          "mrt": "Bencoolen",
          "code": "DT21",
          "closest_stops": [
              {
                  "BusStopCode": "04029",
                  "Name": "BEF BENCOOLEN STN EXIT A",
                  "Distance": 0.09277016877278596
              },
              {
                  "BusStopCode": "04019",
                  "Name": "OPP BENCOOLEN STN EXIT B",
                  "Distance": 0.11106924552004517
              },
              {
                  "BusStopCode": "08069",
                  "Name": "Bencoolen Stn Exit B",
                  "Distance": 0.13314677628920843
              },
              {
                  "BusStopCode": "08079",
                  "Name": "Sch of the Arts",
                  "Distance": 0.1460898187066336
              }
          ]
      },
      {
          "mrt": "Jalan Besar",
          "code": "DT22",
          "closest_stops": [
              {
                  "BusStopCode": "07529",
                  "Name": "JLN BESAR STN EXIT A",
                  "Distance": 0.0927301874667434
              },
              {
                  "BusStopCode": "07419",
                  "Name": "Opp Veerasamy Rd",
                  "Distance": 0.18754685878034894
              },
              {
                  "BusStopCode": "07589",
                  "Name": "Ch of Our Lady of Lourdes",
                  "Distance": 0.21547292208324884
              },
              {
                  "BusStopCode": "01109",
                  "Name": "Queen St Ter",
                  "Distance": 0.22213281624450967
              }
          ]
      },
      {
          "mrt": "Bendemeer",
          "code": "DT23",
          "closest_stops": [
              {
                  "BusStopCode": "60011",
                  "Name": "BENDEMEER STN EXIT A",
                  "Distance": 0.1483188441155657
              },
              {
                  "BusStopCode": "60019",
                  "Name": "BENDEMEER STN EXIT B",
                  "Distance": 0.17997172120314958
              },
              {
                  "BusStopCode": "07361",
                  "Name": "Bef Kallang Bahru",
                  "Distance": 0.24885111334235752
              },
              {
                  "BusStopCode": "07369",
                  "Name": "Aft Kallang Bahru",
                  "Distance": 0.25365192520415675
              },
              {
                  "BusStopCode": "07359",
                  "Name": "OPP ARC 380",
                  "Distance": 0.26174938564434497
              },
              {
                  "BusStopCode": "60099",
                  "Name": "Bef Lavender St",
                  "Distance": 0.2660779753911847
              }
          ]
      },
      {
          "mrt": "Geylang Bahru",
          "code": "DT24",
          "closest_stops": [
              {
                  "BusStopCode": "60221",
                  "Name": "BLK 73/GEYLANG BAHRU STN",
                  "Distance": 0.14188017726703656
              },
              {
                  "BusStopCode": "60069",
                  "Name": "Kallang Basin Swim Cplx",
                  "Distance": 0.20497582948633292
              },
              {
                  "BusStopCode": "60229",
                  "Name": "Blk 68",
                  "Distance": 0.221750318479016
              },
              {
                  "BusStopCode": "80299",
                  "Name": "Opp Blk 82",
                  "Distance": 0.2293591651735345
              },
              {
                  "BusStopCode": "80291",
                  "Name": "Blk 82",
                  "Distance": 0.23068976263505617
              },
              {
                  "BusStopCode": "60031",
                  "Name": "BEF GEYLANG BAHRU STN",
                  "Distance": 0.2503482097733774
              },
              {
                  "BusStopCode": "60061",
                  "Name": "Aft Infineon",
                  "Distance": 0.26041551489522724
              },
              {
                  "BusStopCode": "60039",
                  "Name": "Opp Blk 66",
                  "Distance": 0.3012806281092017
              }
          ]
      },
      {
          "mrt": "Mattar",
          "code": "DT25",
          "closest_stops": [
              {
                  "BusStopCode": "70161",
                  "Name": "OPP MATTAR STN EXIT A",
                  "Distance": 0.0758426971624696
              },
              {
                  "BusStopCode": "70231",
                  "Name": "OPP MATTAR STN EXIT B",
                  "Distance": 0.17080210262944936
              },
              {
                  "BusStopCode": "70241",
                  "Name": "Aft Grace Baptist Ch",
                  "Distance": 0.21842084817609245
              },
              {
                  "BusStopCode": "70151",
                  "Name": "Aft Jln Anggerek",
                  "Distance": 0.23554891605599837
              },
              {
                  "BusStopCode": "70221",
                  "Name": "Blk 79 FC",
                  "Distance": 0.2549029306796562
              }
          ]
      },
      {
          "mrt": "MacPherson_DT",
          "code": "DT26",
          "closest_stops": [
              {
                  "BusStopCode": "70371",
                  "Name": "Macpherson Stn Exit A",
                  "Distance": 0.10258792801971489
              },
              {
                  "BusStopCode": "70379",
                  "Name": "Opp Macpherson Stn Exit A",
                  "Distance": 0.1139411917820084
              },
              {
                  "BusStopCode": "70269",
                  "Name": "Citipoint Ind Cplx",
                  "Distance": 0.16887046981221387
              },
              {
                  "BusStopCode": "70251",
                  "Name": "Macpherson Stn Exit C",
                  "Distance": 0.19757620636878556
              },
              {
                  "BusStopCode": "70259",
                  "Name": "Macpherson Stn Exit B",
                  "Distance": 0.2087083991491609
              }
          ]
      },
      {
          "mrt": "Ubi ",
          "code": "DT27",
          "closest_stops": [
              {
                  "BusStopCode": "71129",
                  "Name": "UBI STN EXIT A",
                  "Distance": 0.025579331567742315
              },
              {
                  "BusStopCode": "71121",
                  "Name": "UBI STN EXIT B",
                  "Distance": 0.03562235723194673
              }
          ]
      },
      {
          "mrt": "Kaki Bukit ",
          "code": "DT28",
          "closest_stops": [
              {
                  "BusStopCode": "72049",
                  "Name": "Opp Blk 660A CP",
                  "Distance": 0.12703736076625405
              },
              {
                  "BusStopCode": "72041",
                  "Name": "Blk 660A CP",
                  "Distance": 0.1356074728105239
              },
              {
                  "BusStopCode": "72039",
                  "Name": "KAKI BT STN EXIT A",
                  "Distance": 0.1463774788467525
              },
              {
                  "BusStopCode": "72031",
                  "Name": "BEF KAKI BT STN EXIT B",
                  "Distance": 0.1471488056787117
              }
          ]
      },
      {
          "mrt": "Bedok North",
          "code": "DT29",
          "closest_stops": [
              {
                  "BusStopCode": "84539",
                  "Name": "BEDOK NTH STN EXIT B",
                  "Distance": 0.06216098437767283
              },
              {
                  "BusStopCode": "84451",
                  "Name": "BEDOK NTH STN EXIT A",
                  "Distance": 0.09943070012856717
              },
              {
                  "BusStopCode": "84459",
                  "Name": "Bet Blks 705/706",
                  "Distance": 0.17724853238724766
              }
          ]
      },
      {
          "mrt": "Hillview",
          "code": "DT3",
          "closest_stops": [
              {
                  "BusStopCode": "43061",
                  "Name": "Hillview Stn",
                  "Distance": 0.07199476077685318
              },
              {
                  "BusStopCode": "43069",
                  "Name": "HILLVIEW STN EXIT A",
                  "Distance": 0.08963490411487693
              },
              {
                  "BusStopCode": "42991",
                  "Name": "BEF HILLVIEW STN EXIT B",
                  "Distance": 0.09108069551912776
              },
              {
                  "BusStopCode": "43271",
                  "Name": "Glendale Pk Condo",
                  "Distance": 0.13417332614687513
              },
              {
                  "BusStopCode": "43279",
                  "Name": "Aft Hillview Stn",
                  "Distance": 0.1365269338819905
              }
          ]
      },
      {
          "mrt": "Bedok Reservoir",
          "code": "DT30",
          "closest_stops": [
              {
                  "BusStopCode": "84201",
                  "Name": "BEDOK RESVR STN EXIT A",
                  "Distance": 0.13871694465286757
              },
              {
                  "BusStopCode": "84209",
                  "Name": "Bedok Resvr Stn Exit B",
                  "Distance": 0.18092452483271623
              },
              {
                  "BusStopCode": "84609",
                  "Name": "Waterfront Key",
                  "Distance": 0.19206130910042174
              },
              {
                  "BusStopCode": "84601",
                  "Name": "Opp Waterfront Key",
                  "Distance": 0.22762699348029355
              }
          ]
      },
      {
          "mrt": "Tampines West",
          "code": "DT31",
          "closest_stops": [
              {
                  "BusStopCode": "75051",
                  "Name": "TAMPINES WEST STN EXIT B",
                  "Distance": 0.17753148463930782
              },
              {
                  "BusStopCode": "75059",
                  "Name": "BEF TAMPINES WEST STN",
                  "Distance": 0.2048987256266111
              },
              {
                  "BusStopCode": "75229",
                  "Name": "Temasek Poly East G",
                  "Distance": 0.20766865917552785
              },
              {
                  "BusStopCode": "76289",
                  "Name": "Blk 801",
                  "Distance": 0.21278780941498668
              },
              {
                  "BusStopCode": "76281",
                  "Name": "Junyuan Pr Sch",
                  "Distance": 0.22973442026176388
              },
              {
                  "BusStopCode": "75221",
                  "Name": "Opp Temasek Poly East G",
                  "Distance": 0.29059747334584407
              }
          ]
      },
      {
          "mrt": "Tampines_DT",
          "code": "DT32",
          "closest_stops": [
              {
                  "BusStopCode": "76141",
                  "Name": "Tampines Stn/Int",
                  "Distance": 0.1165412212099362
              },
              {
                  "BusStopCode": "76149",
                  "Name": "Opp Tampines Stn/Int",
                  "Distance": 0.14737084577748052
              },
              {
                  "BusStopCode": "75009",
                  "Name": "Tampines Int",
                  "Distance": 0.2037276890647938
              },
              {
                  "BusStopCode": "76139",
                  "Name": "Opp Century Sq",
                  "Distance": 0.23781090155377121
              }
          ]
      },
      {
          "mrt": "Tampines East",
          "code": "DT33",
          "closest_stops": [
              {
                  "BusStopCode": "76031",
                  "Name": "TAMPINES EAST STN EXIT B",
                  "Distance": 0.11727692292815599
              },
              {
                  "BusStopCode": "76221",
                  "Name": "TAMPINES EAST STN EXIT A",
                  "Distance": 0.12410381508617686
              },
              {
                  "BusStopCode": "76039",
                  "Name": "TAMPINES EAST STN EXIT C",
                  "Distance": 0.13010694355945812
              },
              {
                  "BusStopCode": "76229",
                  "Name": "OPP TAMPINES EAST STN",
                  "Distance": 0.15991744280219766
              },
              {
                  "BusStopCode": "76319",
                  "Name": "Tampines East Stn Exit D",
                  "Distance": 0.18487733022437564
              },
              {
                  "BusStopCode": "76311",
                  "Name": "Blk 460",
                  "Distance": 0.2079481739214145
              }
          ]
      },
      {
          "mrt": "Upper Changi",
          "code": "DT34",
          "closest_stops": [
              {
                  "BusStopCode": "96041",
                  "Name": "Upp Changi Stn/Opp SUTD",
                  "Distance": 0.015642154073095025
              },
              {
                  "BusStopCode": "96049",
                  "Name": "Upp Changi Stn/SUTD",
                  "Distance": 0.09263041249481534
              }
          ]
      },
      {
          "mrt": "Expo_DT",
          "code": "DT35",
          "closest_stops": [
              {
                  "BusStopCode": "96301",
                  "Name": "EXPO STN EXIT B",
                  "Distance": 0.1381308483763679
              },
              {
                  "BusStopCode": "96309",
                  "Name": "EXPO STN EXIT E",
                  "Distance": 0.1607201622049133
              }
          ]
      },
      {
          "mrt": "Beauty World",
          "code": "DT5",
          "closest_stops": [
              {
                  "BusStopCode": "42099",
                  "Name": "Beauty World Stn Exit A",
                  "Distance": 0.017189161953055122
              },
              {
                  "BusStopCode": "42091",
                  "Name": "Beauty World Stn Exit B",
                  "Distance": 0.13876193565974593
              },
              {
                  "BusStopCode": "42259",
                  "Name": "Aft Upp Bt Timah Rd",
                  "Distance": 0.14361608832448308
              },
              {
                  "BusStopCode": "42159",
                  "Name": "Opp Beauty World Stn",
                  "Distance": 0.16007451525747915
              },
              {
                  "BusStopCode": "42151",
                  "Name": "Beauty World Stn Exit C",
                  "Distance": 0.18768468340655603
              },
              {
                  "BusStopCode": "42109",
                  "Name": "Opp Beauty World Ctr",
                  "Distance": 0.20694603093143982
              }
          ]
      },
      {
          "mrt": "King Albert Park",
          "code": "DT6",
          "closest_stops": [
              {
                  "BusStopCode": "42049",
                  "Name": "Hua Guan Gdns",
                  "Distance": 0.05487084236127737
              },
              {
                  "BusStopCode": "42051",
                  "Name": "King Albert Pk Stn",
                  "Distance": 0.17316946147849074
              }
          ]
      },
      {
          "mrt": "Sixth Avenue",
          "code": "DT7",
          "closest_stops": [
              {
                  "BusStopCode": "41081",
                  "Name": "Sixth Ave Stn",
                  "Distance": 0.026357543697353738
              },
              {
                  "BusStopCode": "42019",
                  "Name": "Opp Sixth Ave Stn",
                  "Distance": 0.14354112690651524
              },
              {
                  "BusStopCode": "42129",
                  "Name": "Sixth Ave Ville",
                  "Distance": 0.23499050384728265
              }
          ]
      },
      {
          "mrt": "Tan Kah Kee",
          "code": "DT8",
          "closest_stops": [
              {
                  "BusStopCode": "41051",
                  "Name": "Tan Kah Kee Stn",
                  "Distance": 0.08164948746575952
              },
              {
                  "BusStopCode": "41069",
                  "Name": "Opp Tan Kah Kee Stn",
                  "Distance": 0.09379288294140146
              }
          ]
      },
      {
          "mrt": "Botanic Gardens_DT",
          "code": "DT9",
          "closest_stops": [
              {
                  "BusStopCode": "41021",
                  "Name": "Botanic Gdns Stn",
                  "Distance": 0.02513771666534494
              },
              {
                  "BusStopCode": "41029",
                  "Name": "Opp Botanic Gdns Stn",
                  "Distance": 0.10616146673214452
              }
          ]
      },
      {
          "mrt": "Pasir Ris",
          "code": "EW1",
          "closest_stops": [
              {
                  "BusStopCode": "77039",
                  "Name": "Pasir Ris Stn Exit B",
                  "Distance": 0.0958497540176969
              },
              {
                  "BusStopCode": "77031",
                  "Name": "Opp Pasir Ris Stn Exit B",
                  "Distance": 0.12233335043269339
              },
              {
                  "BusStopCode": "77321",
                  "Name": "Aft Pasir Ris St 53",
                  "Distance": 0.1370542892797693
              },
              {
                  "BusStopCode": "77009",
                  "Name": "Pasir Ris Int",
                  "Distance": 0.14830914373938997
              },
              {
                  "BusStopCode": "77171",
                  "Name": "Aft Pasir Ris Stn Exit A",
                  "Distance": 0.15767798988056134
              },
              {
                  "BusStopCode": "77329",
                  "Name": "Bef Pasir Ris St 53",
                  "Distance": 0.17883772525716876
              },
              {
                  "BusStopCode": "77179",
                  "Name": "Opp Pasir Ris Stn Exit A",
                  "Distance": 0.18143517241437285
              }
          ]
      },
      {
          "mrt": "Kallang",
          "code": "EW10",
          "closest_stops": [
              {
                  "BusStopCode": "80031",
                  "Name": "Kallang Stn",
                  "Distance": 0.04133390247656108
              },
              {
                  "BusStopCode": "80009",
                  "Name": "Lor 1 Geylang Ter",
                  "Distance": 0.09692683599114829
              },
              {
                  "BusStopCode": "80101",
                  "Name": "Kallang Stn/Opp Blk 2C",
                  "Distance": 0.12116990285208949
              },
              {
                  "BusStopCode": "80039",
                  "Name": "Opp Lor 1 Geylang Ter",
                  "Distance": 0.169929172318205
              }
          ]
      },
      {
          "mrt": "Lavender",
          "code": "EW11",
          "closest_stops": [
              {
                  "BusStopCode": "01319",
                  "Name": "Lavender Stn Exit A/ICA",
                  "Distance": 0.028941023761105626
              },
              {
                  "BusStopCode": "01311",
                  "Name": "Lavender Stn Exit B",
                  "Distance": 0.10059705497467458
              },
              {
                  "BusStopCode": "01339",
                  "Name": "Bef Crawford Bridge",
                  "Distance": 0.14106793864874093
              },
              {
                  "BusStopCode": "01341",
                  "Name": "Southbank",
                  "Distance": 0.1981178682272316
              }
          ]
      },
      {
          "mrt": "Bugis_EW",
          "code": "EW12",
          "closest_stops": [
              {
                  "BusStopCode": "01059",
                  "Name": "Bugis Stn Exit B",
                  "Distance": 0.025276559019613558
              },
              {
                  "BusStopCode": "01113",
                  "Name": "Bugis Stn Exit A",
                  "Distance": 0.07152683152181291
              },
              {
                  "BusStopCode": "01112",
                  "Name": "Opp Bugis Stn Exit C",
                  "Distance": 0.11074137272273207
              },
              {
                  "BusStopCode": "01139",
                  "Name": "Bugis Stn/Parkview Sq",
                  "Distance": 0.12053897644835876
              },
              {
                  "BusStopCode": "01119",
                  "Name": "Aft Bugis Stn Exit C",
                  "Distance": 0.14873921179959654
              }
          ]
      },
      {
          "mrt": "City Hall_EW",
          "code": "EW13",
          "closest_stops": [
              {
                  "BusStopCode": "04167",
                  "Name": "City Hall Stn Exit B",
                  "Distance": 0.09002219854584277
              },
              {
                  "BusStopCode": "04111",
                  "Name": "Capitol Bldg",
                  "Distance": 0.09599666706784739
              },
              {
                  "BusStopCode": "04168",
                  "Name": "Aft City Hall Stn Exit B",
                  "Distance": 0.1411543086569371
              }
          ]
      },
      {
          "mrt": "Raffles Place_EW",
          "code": "EW14",
          "closest_stops": [
              {
                  "BusStopCode": "03019",
                  "Name": "OUE Bayfront",
                  "Distance": 0.18300858965190428
              },
              {
                  "BusStopCode": "03011",
                  "Name": "Fullerton Sq",
                  "Distance": 0.25531202897143934
              },
              {
                  "BusStopCode": "05319",
                  "Name": "OCBC Ctr",
                  "Distance": 0.26192792839456597
              },
              {
                  "BusStopCode": "03021",
                  "Name": "Prudential Twr",
                  "Distance": 0.2638051804458568
              },
              {
                  "BusStopCode": "03031",
                  "Name": "Raffles Pl Stn Exit F",
                  "Distance": 0.2682292701223921
              }
          ]
      },
      {
          "mrt": "Tanjong Pagar",
          "code": "EW15",
          "closest_stops": [
              {
                  "BusStopCode": "03223",
                  "Name": "Tanjong Pagar Stn Exit C",
                  "Distance": 0.10849668866000343
              },
              {
                  "BusStopCode": "03241",
                  "Name": "Mapletree Anson",
                  "Distance": 0.23112129852379015
              },
              {
                  "BusStopCode": "03217",
                  "Name": "Opp AXA Twr",
                  "Distance": 0.2571781534924101
              },
              {
                  "BusStopCode": "05429",
                  "Name": "Bef Craig Rd",
                  "Distance": 0.2722267286146094
              },
              {
                  "BusStopCode": "03111",
                  "Name": "Aft Capital Twr",
                  "Distance": 0.28307348052897363
              },
              {
                  "BusStopCode": "03239",
                  "Name": "Shenton Way Ter",
                  "Distance": 0.28487147613934005
              },
              {
                  "BusStopCode": "03218",
                  "Name": "Opp MAS Bldg",
                  "Distance": 0.29847034818750035
              },
              {
                  "BusStopCode": "05421",
                  "Name": "Aft Craig Rd",
                  "Distance": 0.30038553373730315
              },
              {
                  "BusStopCode": "03222",
                  "Name": "Hub Synergy Pt",
                  "Distance": 0.3088276069040904
              }
          ]
      },
      {
          "mrt": "Outram Park_EW",
          "code": "EW16",
          "closest_stops": [
              {
                  "BusStopCode": "05069",
                  "Name": "OUTRAM PK STN EXIT 4",
                  "Distance": 0.0458837285339248
              },
              {
                  "BusStopCode": "05019",
                  "Name": "Aft Duxton Plain Pk",
                  "Distance": 0.10566701429457898
              },
              {
                  "BusStopCode": "05012",
                  "Name": "Bef Pearl'S Hill Terr",
                  "Distance": 0.11901543449790003
              }
          ]
      },
      {
          "mrt": "Tiong Bahru",
          "code": "EW17",
          "closest_stops": [
              {
                  "BusStopCode": "10169",
                  "Name": "Tiong Bahru Stn/Plaza",
                  "Distance": 0.02078169170326532
              },
              {
                  "BusStopCode": "10151",
                  "Name": "Ctrl Green Condo",
                  "Distance": 0.10706176686951231
              },
              {
                  "BusStopCode": "10161",
                  "Name": "Opp Tiong Bahru Stn/Plaza",
                  "Distance": 0.10741757902576213
              }
          ]
      },
      {
          "mrt": "Redhill",
          "code": "EW18",
          "closest_stops": [
              {
                  "BusStopCode": "10209",
                  "Name": "Redhill Stn",
                  "Distance": 0.012268244472990958
              },
              {
                  "BusStopCode": "10201",
                  "Name": "Opp Redhill Stn",
                  "Distance": 0.04371314496806072
              }
          ]
      },
      {
          "mrt": "Queenstown",
          "code": "EW19",
          "closest_stops": [
              {
                  "BusStopCode": "11141",
                  "Name": "Queenstown Stn Exit A/D",
                  "Distance": 0.026937656321109733
              },
              {
                  "BusStopCode": "11149",
                  "Name": "Queenstown Stn Exit B/C",
                  "Distance": 0.05779668415233474
              }
          ]
      },
      {
          "mrt": "Tampines_EW",
          "code": "EW2",
          "closest_stops": [
              {
                  "BusStopCode": "76141",
                  "Name": "Tampines Stn/Int",
                  "Distance": 0.1165412212099362
              },
              {
                  "BusStopCode": "76149",
                  "Name": "Opp Tampines Stn/Int",
                  "Distance": 0.14737084577748052
              },
              {
                  "BusStopCode": "75009",
                  "Name": "Tampines Int",
                  "Distance": 0.2037276890647938
              },
              {
                  "BusStopCode": "76139",
                  "Name": "Opp Century Sq",
                  "Distance": 0.23781090155377121
              }
          ]
      },
      {
          "mrt": "Commonwealth",
          "code": "EW20",
          "closest_stops": [
              {
                  "BusStopCode": "11169",
                  "Name": "C'Wealth Stn Exit B/C",
                  "Distance": 0.03026219073464399
              },
              {
                  "BusStopCode": "11161",
                  "Name": "C'Wealth Stn Exit A/D",
                  "Distance": 0.03567313817473404
              }
          ]
      },
      {
          "mrt": "Buona Vista_EW",
          "code": "EW21",
          "closest_stops": [
              {
                  "BusStopCode": "11361",
                  "Name": "Buona Vista Stn Exit C",
                  "Distance": 0.08628085460653764
              },
              {
                  "BusStopCode": "11369",
                  "Name": "Buona Vista Stn Exit D",
                  "Distance": 0.10540402043159833
              },
              {
                  "BusStopCode": "11181",
                  "Name": "Opp Blk 43",
                  "Distance": 0.17474068136938822
              },
              {
                  "BusStopCode": "11189",
                  "Name": "Blk 43",
                  "Distance": 0.20481547890136448
              }
          ]
      },
      {
          "mrt": "Dover",
          "code": "EW22",
          "closest_stops": [
              {
                  "BusStopCode": "19039",
                  "Name": "Dover Stn Exit B",
                  "Distance": 0.029409298872181654
              },
              {
                  "BusStopCode": "19031",
                  "Name": "Dover Stn Exit A",
                  "Distance": 0.034200590104219955
              }
          ]
      },
      {
          "mrt": "Clementi",
          "code": "EW23",
          "closest_stops": [
              {
                  "BusStopCode": "17179",
                  "Name": "Clementi Stn Exit B",
                  "Distance": 0.024795933830628794
              },
              {
                  "BusStopCode": "17171",
                  "Name": "Clementi Stn Exit A",
                  "Distance": 0.026658737752487078
              },
              {
                  "BusStopCode": "17009",
                  "Name": "Clementi Int",
                  "Distance": 0.12494595993914759
              }
          ]
      },
      {
          "mrt": "Jurong East_EW",
          "code": "EW24",
          "closest_stops": [
              {
                  "BusStopCode": "28201",
                  "Name": "Opp The JTC Summit",
                  "Distance": 0.12768055702935038
              },
              {
                  "BusStopCode": "28199",
                  "Name": "Opposite JEM",
                  "Distance": 0.1781401519578272
              },
              {
                  "BusStopCode": "28009",
                  "Name": "Jurong East Int",
                  "Distance": 0.20047404334982877
              },
              {
                  "BusStopCode": "28211",
                  "Name": "Bef Jurong East Stn",
                  "Distance": 0.2131940764925156
              }
          ]
      },
      {
          "mrt": "Chinese Garden",
          "code": "EW25",
          "closest_stops": [
              {
                  "BusStopCode": "28341",
                  "Name": "Chinese Gdn Stn",
                  "Distance": 0.013203924231215294
              },
              {
                  "BusStopCode": "28349",
                  "Name": "Opp Chinese Gdn Stn",
                  "Distance": 0.06633023139644899
              }
          ]
      },
      {
          "mrt": "Lakeside",
          "code": "EW26",
          "closest_stops": [
              {
                  "BusStopCode": "28091",
                  "Name": "Lakeside Stn",
                  "Distance": 0.07532742647355528
              },
              {
                  "BusStopCode": "28099",
                  "Name": "Opp Lakeside Stn",
                  "Distance": 0.17065321048424753
              },
              {
                  "BusStopCode": "28381",
                  "Name": "Blk 515",
                  "Distance": 0.22550173221320763
              },
              {
                  "BusStopCode": "28421",
                  "Name": "Blk 517",
                  "Distance": 0.2415265486351286
              },
              {
                  "BusStopCode": "28389",
                  "Name": "Opp Blk 515",
                  "Distance": 0.2514119055114115
              }
          ]
      },
      {
          "mrt": "Boon Lay",
          "code": "EW27",
          "closest_stops": [
              {
                  "BusStopCode": "22009",
                  "Name": "Boon Lay Int",
                  "Distance": 0.101127746430596
              },
              {
                  "BusStopCode": "22499",
                  "Name": "Opp Blk 662C",
                  "Distance": 0.17914099704524708
              },
              {
                  "BusStopCode": "22491",
                  "Name": "Blk 662D",
                  "Distance": 0.2089412748148576
              }
          ]
      },
      {
          "mrt": "Pioneer",
          "code": "EW28",
          "closest_stops": [
              {
                  "BusStopCode": "22529",
                  "Name": "Pioneer Stn Exit B",
                  "Distance": 0.023232811307282428
              },
              {
                  "BusStopCode": "22521",
                  "Name": "Pioneer Stn Exit A",
                  "Distance": 0.049272073496713316
              }
          ]
      },
      {
          "mrt": "Joo Koon",
          "code": "EW29",
          "closest_stops": [
              {
                  "BusStopCode": "23499",
                  "Name": "Joo Koon Stn Exit A",
                  "Distance": 0.03209221369048623
              },
              {
                  "BusStopCode": "23491",
                  "Name": "Joo Koon Stn Exit B",
                  "Distance": 0.05761147298529071
              },
              {
                  "BusStopCode": "24009",
                  "Name": "Joo Koon Int",
                  "Distance": 0.08405543802614325
              }
          ]
      },
      {
          "mrt": "Simei",
          "code": "EW3",
          "closest_stops": [
              {
                  "BusStopCode": "96169",
                  "Name": "Simei Stn",
                  "Distance": 0.10243203906319186
              },
              {
                  "BusStopCode": "96161",
                  "Name": "Opp Simei Stn",
                  "Distance": 0.1192775358661103
              },
              {
                  "BusStopCode": "96149",
                  "Name": "Simei Stn/Blk 247",
                  "Distance": 0.14701103642637928
              },
              {
                  "BusStopCode": "96141",
                  "Name": "Blk 120/Opp Simei Stn",
                  "Distance": 0.17084458758756985
              }
          ]
      },
      {
          "mrt": "Gul Circle",
          "code": "EW30",
          "closest_stops": [
              {
                  "BusStopCode": "24511",
                  "Name": "GUL CIRCLE STN EXIT A",
                  "Distance": 0.0529927932697869
              },
              {
                  "BusStopCode": "24519",
                  "Name": "GUL CIRCLE STN EXIT B",
                  "Distance": 0.07794539798925887
              }
          ]
      },
      {
          "mrt": "Tuas Crescent",
          "code": "EW31",
          "closest_stops": [
              {
                  "BusStopCode": "24709",
                  "Name": "TUAS CRES STN EXIT A",
                  "Distance": 0.06165874979153182
              },
              {
                  "BusStopCode": "24701",
                  "Name": "TUAS CRES STN EXIT B",
                  "Distance": 0.08180153699135986
              }
          ]
      },
      {
          "mrt": "Tuas West Road",
          "code": "EW32",
          "closest_stops": [
              {
                  "BusStopCode": "24711",
                  "Name": "TUAS WEST RD STN EXIT B",
                  "Distance": 0.045220676279889016
              },
              {
                  "BusStopCode": "25511",
                  "Name": "MICHELMAN",
                  "Distance": 0.08111437932760121
              },
              {
                  "BusStopCode": "25519",
                  "Name": "OPP MICHELMAN",
                  "Distance": 0.1006932604824045
              },
              {
                  "BusStopCode": "24719",
                  "Name": "TUAS WEST RD STN EXIT A",
                  "Distance": 0.1098674255206212
              },
              {
                  "BusStopCode": "25691",
                  "Name": "AFT TUAS WEST RD STN",
                  "Distance": 0.12093449288718541
              }
          ]
      },
      {
          "mrt": "Tuas Link",
          "code": "EW33",
          "closest_stops": [
              {
                  "BusStopCode": "25429",
                  "Name": "TUAS LINK STN",
                  "Distance": 0.01436045262105985
              },
              {
                  "BusStopCode": "25421",
                  "Name": "OPP TUAS LINK STN",
                  "Distance": 0.12755190229253582
              },
              {
                  "BusStopCode": "25439",
                  "Name": "Opp Super Continental",
                  "Distance": 0.15667494766483514
              },
              {
                  "BusStopCode": "25431",
                  "Name": "Super Continental",
                  "Distance": 0.16677031482229027
              },
              {
                  "BusStopCode": "25491",
                  "Name": "Opp Super Continental",
                  "Distance": 0.20698362721413693
              }
          ]
      },
      {
          "mrt": "Tanah Merah_EW",
          "code": "EW4",
          "closest_stops": [
              {
                  "BusStopCode": "85091",
                  "Name": "Tanah Merah Stn Exit B",
                  "Distance": 0.03611238664300339
              },
              {
                  "BusStopCode": "85099",
                  "Name": "Tanah Merah Stn Exit A",
                  "Distance": 0.04681152068384922
              }
          ]
      },
      {
          "mrt": "Bedok",
          "code": "EW5",
          "closest_stops": [
              {
                  "BusStopCode": "84031",
                  "Name": "Bedok Stn Exit B",
                  "Distance": 0.03895839065010583
              },
              {
                  "BusStopCode": "84009",
                  "Name": "Bedok Int",
                  "Distance": 0.1257786911755875
              },
              {
                  "BusStopCode": "84039",
                  "Name": "Bedok Stn Exit A",
                  "Distance": 0.1334142141921109
              }
          ]
      },
      {
          "mrt": "Kembangan",
          "code": "EW6",
          "closest_stops": [
              {
                  "BusStopCode": "83062",
                  "Name": "Kembangan Stn",
                  "Distance": 0.06362583323940556
              },
              {
                  "BusStopCode": "83321",
                  "Name": "Kembangan Stn",
                  "Distance": 0.12161798407992339
              },
              {
                  "BusStopCode": "83329",
                  "Name": "Opp Kembangan Stn",
                  "Distance": 0.15491528993099152
              }
          ]
      },
      {
          "mrt": "Eunos",
          "code": "EW7",
          "closest_stops": [
              {
                  "BusStopCode": "82061",
                  "Name": "Eunos Stn/ Int",
                  "Distance": 0.14624301414171081
              },
              {
                  "BusStopCode": "82009",
                  "Name": "Eunos Int",
                  "Distance": 0.14869317993171574
              },
              {
                  "BusStopCode": "83101",
                  "Name": "Eunos Stn",
                  "Distance": 0.2255069189326642
              }
          ]
      },
      {
          "mrt": "Paya Lebar_EW",
          "code": "EW8",
          "closest_stops": [
              {
                  "BusStopCode": "81111",
                  "Name": "Paya Lebar Stn Exit B",
                  "Distance": 0.06536431616048784
              },
              {
                  "BusStopCode": "81119",
                  "Name": "Paya Lebar Stn Exit C",
                  "Distance": 0.09002827834115962
              }
          ]
      },
      {
          "mrt": "Aljunied",
          "code": "EW9",
          "closest_stops": [
              {
                  "BusStopCode": "81089",
                  "Name": "Aljunied Stn",
                  "Distance": 0.07147659927068797
              },
              {
                  "BusStopCode": "81081",
                  "Name": "Opp Aljunied Stn",
                  "Distance": 0.1094250388375727
              },
              {
                  "BusStopCode": "81011",
                  "Name": "Aft Aljunied Stn",
                  "Distance": 0.12905797772078245
              }
          ]
      },
      {
          "mrt": "HarbourFront_NE",
          "code": "NE1",
          "closest_stops": [
              {
                  "BusStopCode": "14141",
                  "Name": "HarbourFront Stn/Vivocity",
                  "Distance": 0.035451755349194425
              },
              {
                  "BusStopCode": "14119",
                  "Name": "Opp VivoCity",
                  "Distance": 0.06071263634812781
              }
          ]
      },
      {
          "mrt": "Potong Pasir",
          "code": "NE10",
          "closest_stops": [
              {
                  "BusStopCode": "60261",
                  "Name": "Potong Pasir Stn Exit C",
                  "Distance": 0.020988156468600593
              },
              {
                  "BusStopCode": "60269",
                  "Name": "Potong Pasir Stn Exit B",
                  "Distance": 0.03298545471479897
              }
          ]
      },
      {
          "mrt": "Woodleigh",
          "code": "NE11",
          "closest_stops": [
              {
                  "BusStopCode": "61039",
                  "Name": "Woodleigh Stn Exit A",
                  "Distance": 0.08336156398747276
              },
              {
                  "BusStopCode": "61031",
                  "Name": "Woodleigh Stn Exit B",
                  "Distance": 0.09853467075634224
              }
          ]
      },
      {
          "mrt": "Serangoon_NE",
          "code": "NE12",
          "closest_stops": [
              {
                  "BusStopCode": "62139",
                  "Name": "S'Goon Stn Exit A/Blk 413",
                  "Distance": 0.09356154716565253
              },
              {
                  "BusStopCode": "66351",
                  "Name": "S'goon Stn Exit E",
                  "Distance": 0.0965912038082102
              },
              {
                  "BusStopCode": "66359",
                  "Name": "S'Goon Stn Exit C/Blk 201",
                  "Distance": 0.1235724074125086
              },
              {
                  "BusStopCode": "62189",
                  "Name": "S'Goon Stn Exit D/Blk 416",
                  "Distance": 0.13404815158629493
              },
              {
                  "BusStopCode": "62131",
                  "Name": "S'Goon Stn Exit H",
                  "Distance": 0.14405548904621704
              },
              {
                  "BusStopCode": "62179",
                  "Name": "Blk 421",
                  "Distance": 0.1816910112755643
              }
          ]
      },
      {
          "mrt": "Kovan",
          "code": "NE13",
          "closest_stops": [
              {
                  "BusStopCode": "63039",
                  "Name": "Kovan Stn Exit C",
                  "Distance": 0.06485747381215873
              },
              {
                  "BusStopCode": "63031",
                  "Name": "Kovan Stn Exit B",
                  "Distance": 0.07913609371119042
              }
          ]
      },
      {
          "mrt": "Hougang",
          "code": "NE14",
          "closest_stops": [
              {
                  "BusStopCode": "64541",
                  "Name": "Hougang Ctrl Int",
                  "Distance": 0.0769982969950789
              },
              {
                  "BusStopCode": "64549",
                  "Name": "Opp Hougang Ctrl Int",
                  "Distance": 0.1289050192750288
              },
              {
                  "BusStopCode": "64009",
                  "Name": "Hougang Ctrl Int",
                  "Distance": 0.14454078699116252
              },
              {
                  "BusStopCode": "64381",
                  "Name": "Hougang Stn Exit C",
                  "Distance": 0.159577317817647
              },
              {
                  "BusStopCode": "64389",
                  "Name": "Blk 522",
                  "Distance": 0.19028112275636497
              }
          ]
      },
      {
          "mrt": "Buangkok",
          "code": "NE15",
          "closest_stops": [
              {
                  "BusStopCode": "67601",
                  "Name": "Buangkok Stn Exit B",
                  "Distance": 0.040244402654921914
              },
              {
                  "BusStopCode": "67609",
                  "Name": "Buangkok Stn Exit A",
                  "Distance": 0.09753046135560495
              },
              {
                  "BusStopCode": "63009",
                  "Name": "Buangkok Int",
                  "Distance": 0.11406472252370335
              }
          ]
      },
      {
          "mrt": "Sengkang_NE",
          "code": "NE16",
          "closest_stops": [
              {
                  "BusStopCode": "67009",
                  "Name": "Sengkang Int",
                  "Distance": 0.08262255560432721
              },
              {
                  "BusStopCode": "67409",
                  "Name": "Sengkang Stn",
                  "Distance": 0.14141341309379746
              },
              {
                  "BusStopCode": "67401",
                  "Name": "Opp Sengkang Stn/Blk 260A",
                  "Distance": 0.17553186680849558
              },
              {
                  "BusStopCode": "67441",
                  "Name": "Sengkang Community Hub",
                  "Distance": 0.23048967618050162
              }
          ]
      },
      {
          "mrt": "Punggol_NE",
          "code": "NE17",
          "closest_stops": [
              {
                  "BusStopCode": "65259",
                  "Name": "Punggol Stn/Int",
                  "Distance": 0.054664352992169145
              },
              {
                  "BusStopCode": "65251",
                  "Name": "Punggol Stn/Waterway Pt",
                  "Distance": 0.0757851771027378
              },
              {
                  "BusStopCode": "65009",
                  "Name": "Punggol Temp Int",
                  "Distance": 0.17264624358200745
              }
          ]
      },
      {
          "mrt": "Punggol Coast",
          "code": "NE18",
          "closest_stops": [
              {
                  "BusStopCode": "65729",
                  "Name": "Punggol Coast Station",
                  "Distance": 0.12230668095189322
              },
              {
                  "BusStopCode": "65721",
                  "Name": "Opposite Punggol Coast Station",
                  "Distance": 0.16525771950266457
              }
          ]
      },
      {
          "mrt": "Outram Park_NE",
          "code": "NE3",
          "closest_stops": [
              {
                  "BusStopCode": "05069",
                  "Name": "OUTRAM PK STN EXIT 4",
                  "Distance": 0.0458837285339248
              },
              {
                  "BusStopCode": "05019",
                  "Name": "Aft Duxton Plain Pk",
                  "Distance": 0.10566701429457898
              },
              {
                  "BusStopCode": "05012",
                  "Name": "Bef Pearl'S Hill Terr",
                  "Distance": 0.11901543449790003
              }
          ]
      },
      {
          "mrt": "Chinatown_NE",
          "code": "NE4",
          "closest_stops": [
              {
                  "BusStopCode": "05049",
                  "Name": "Chinatown Stn Exit E",
                  "Distance": 0.06895869319117537
              },
              {
                  "BusStopCode": "05022",
                  "Name": "Aft Chinatown Stn Exit D",
                  "Distance": 0.08709186429294043
              },
              {
                  "BusStopCode": "05013",
                  "Name": "Chinatown Stn Exit C",
                  "Distance": 0.15371089999232004
              },
              {
                  "BusStopCode": "05131",
                  "Name": "Opp Hong Lim Cplx",
                  "Distance": 0.18197616762167015
              }
          ]
      },
      {
          "mrt": "Clarke Quay",
          "code": "NE5",
          "closest_stops": [
              {
                  "BusStopCode": "04222",
                  "Name": "Clarke Quay Stn Exit E",
                  "Distance": 0.024560305123092253
              },
              {
                  "BusStopCode": "04239",
                  "Name": "Opp Clarke Quay Stn",
                  "Distance": 0.07153327452004714
              },
              {
                  "BusStopCode": "04211",
                  "Name": "Clarke Quay",
                  "Distance": 0.16427395854701177
              }
          ]
      },
      {
          "mrt": "Dhoby Ghaut_NE",
          "code": "NE6",
          "closest_stops": [
              {
                  "BusStopCode": "08031",
                  "Name": "Dhoby Ghaut Stn Exit B",
                  "Distance": 0.058968477910417205
              },
              {
                  "BusStopCode": "08057",
                  "Name": "Dhoby Ghaut Stn",
                  "Distance": 0.06555086935458956
              }
          ]
      },
      {
          "mrt": "Little India_NE",
          "code": "NE7",
          "closest_stops": [
              {
                  "BusStopCode": "40019",
                  "Name": "Little India Stn",
                  "Distance": 0.013308187719662296
              },
              {
                  "BusStopCode": "40011",
                  "Name": "LITTLE INDIA STN EXIT A",
                  "Distance": 0.06106970387906646
              }
          ]
      },
      {
          "mrt": "Farrer Park",
          "code": "NE8",
          "closest_stops": [
              {
                  "BusStopCode": "50251",
                  "Name": "Farrer Pk Stn Exit A",
                  "Distance": 0.06385997668134169
              },
              {
                  "BusStopCode": "50259",
                  "Name": "Opp Farrer Pk Stn",
                  "Distance": 0.08690308524626146
              }
          ]
      },
      {
          "mrt": "Boon Keng",
          "code": "NE9",
          "closest_stops": [
              {
                  "BusStopCode": "60121",
                  "Name": "Boon Keng Stn/Blk 102",
                  "Distance": 0.04254022110195843
              },
              {
                  "BusStopCode": "60199",
                  "Name": "Boon Keng Stn/Blk 22",
                  "Distance": 0.20977323205690188
              },
              {
                  "BusStopCode": "50349",
                  "Name": "Blk 107",
                  "Distance": 0.22368970096526766
              },
              {
                  "BusStopCode": "60101",
                  "Name": "Kwong Wai Shiu Hosp",
                  "Distance": 0.2757587609919294
              },
              {
                  "BusStopCode": "60191",
                  "Name": "Blk 7",
                  "Distance": 0.2976365267876214
              },
              {
                  "BusStopCode": "60119",
                  "Name": "Opp Boon Keng Stn",
                  "Distance": 0.3080003346139673
              }
          ]
      },
      {
          "mrt": "Jurong East_NS",
          "code": "NS1",
          "closest_stops": [
              {
                  "BusStopCode": "28201",
                  "Name": "Opp The JTC Summit",
                  "Distance": 0.12768055702935038
              },
              {
                  "BusStopCode": "28199",
                  "Name": "Opposite JEM",
                  "Distance": 0.1781401519578272
              },
              {
                  "BusStopCode": "28009",
                  "Name": "Jurong East Int",
                  "Distance": 0.20047404334982877
              },
              {
                  "BusStopCode": "28211",
                  "Name": "Bef Jurong East Stn",
                  "Distance": 0.2131940764925156
              }
          ]
      },
      {
          "mrt": "Admiralty",
          "code": "NS10",
          "closest_stops": [
              {
                  "BusStopCode": "46779",
                  "Name": "Admiralty Stn",
                  "Distance": 0.029219843545596137
              },
              {
                  "BusStopCode": "46771",
                  "Name": "Opp Admiralty Stn",
                  "Distance": 0.09027378055311115
              },
              {
                  "BusStopCode": "46759",
                  "Name": "BLK 676A",
                  "Distance": 0.154349719103983
              }
          ]
      },
      {
          "mrt": "Sembawang",
          "code": "NS11",
          "closest_stops": [
              {
                  "BusStopCode": "58211",
                  "Name": "Sembawang Stn",
                  "Distance": 0.0346599929675465
              },
              {
                  "BusStopCode": "58219",
                  "Name": "Opp Sembawang Stn",
                  "Distance": 0.051074536556840994
              }
          ]
      },
      {
          "mrt": "Canberra",
          "code": "NS12",
          "closest_stops": [
              {
                  "BusStopCode": "58541",
                  "Name": "Opp Canberra Stn",
                  "Distance": 0.11120520247457945
              },
              {
                  "BusStopCode": "58549",
                  "Name": "Canberra Stn",
                  "Distance": 0.11312526455620285
              }
          ]
      },
      {
          "mrt": "Yishun",
          "code": "NS13",
          "closest_stops": [
              {
                  "BusStopCode": "59079",
                  "Name": "Yishun Stn",
                  "Distance": 0.031634210598815785
              },
              {
                  "BusStopCode": "59072",
                  "Name": "Yishun Stn Exit E",
                  "Distance": 0.05633449279699647
              },
              {
                  "BusStopCode": "59073",
                  "Name": "Opp Yishun Stn",
                  "Distance": 0.1049144705821071
              },
              {
                  "BusStopCode": "59159",
                  "Name": "Opp Yishun Stn Exit B",
                  "Distance": 0.12285358261155002
              }
          ]
      },
      {
          "mrt": "Khatib",
          "code": "NS14",
          "closest_stops": [
              {
                  "BusStopCode": "59049",
                  "Name": "Opp Khatib Stn",
                  "Distance": 0.05615338141678224
              },
              {
                  "BusStopCode": "59041",
                  "Name": "Bef Khatib Stn",
                  "Distance": 0.1264138425720849
              },
              {
                  "BusStopCode": "59569",
                  "Name": "Khatib Stn Exit D",
                  "Distance": 0.1310765808927519
              },
              {
                  "BusStopCode": "59561",
                  "Name": "Opp Khatib Stn Exit D",
                  "Distance": 0.15421662038773512
              }
          ]
      },
      {
          "mrt": "Yio Chu Kang",
          "code": "NS15",
          "closest_stops": [
              {
                  "BusStopCode": "55509",
                  "Name": "Yio Chu Kang Int",
                  "Distance": 0.09746565193276854
              },
              {
                  "BusStopCode": "55181",
                  "Name": "Opp Yio Chu Kang Stn",
                  "Distance": 0.12534764289818823
              },
              {
                  "BusStopCode": "55189",
                  "Name": "Yio Chu Kang Stn",
                  "Distance": 0.15444543853520623
              }
          ]
      },
      {
          "mrt": "Ang Mo Kio",
          "code": "NS16",
          "closest_stops": [
              {
                  "BusStopCode": "54009",
                  "Name": "Ang Mo Kio Int",
                  "Distance": 0.11552065142458205
              },
              {
                  "BusStopCode": "54261",
                  "Name": "Aft Ang Mo Kio Stn Exit A",
                  "Distance": 0.14979748324354406
              },
              {
                  "BusStopCode": "54399",
                  "Name": "Bef Ang Mo Kio Stn Exit B",
                  "Distance": 0.17632216320451555
              },
              {
                  "BusStopCode": "54269",
                  "Name": "Opp Ang Mo Kio Stn",
                  "Distance": 0.19897841558349222
              },
              {
                  "BusStopCode": "54391",
                  "Name": "Aft Ang Mo Kio Int",
                  "Distance": 0.22293670571267135
              }
          ]
      },
      {
          "mrt": "Bishan_NS",
          "code": "NS17",
          "closest_stops": [
              {
                  "BusStopCode": "53231",
                  "Name": "BISHAN STN",
                  "Distance": 0.06927737415226383
              },
              {
                  "BusStopCode": "53239",
                  "Name": "OPP BISHAN STN",
                  "Distance": 0.08567739493458879
              }
          ]
      },
      {
          "mrt": "Braddell",
          "code": "NS18",
          "closest_stops": [
              {
                  "BusStopCode": "52171",
                  "Name": "Braddell Stn/Blk 107",
                  "Distance": 0.11695420218974308
              },
              {
                  "BusStopCode": "52179",
                  "Name": "Braddell Stn/Blk 106",
                  "Distance": 0.1389758114772995
              },
              {
                  "BusStopCode": "52209",
                  "Name": "Blk 101C CP",
                  "Distance": 0.14903147895355087
              },
              {
                  "BusStopCode": "52161",
                  "Name": "Braddell Stn/Blk 111",
                  "Distance": 0.15814529217846113
              },
              {
                  "BusStopCode": "52201",
                  "Name": "Blk 121",
                  "Distance": 0.16080156804500628
              }
          ]
      },
      {
          "mrt": "Toa Payoh",
          "code": "NS19",
          "closest_stops": [
              {
                  "BusStopCode": "52009",
                  "Name": "Toa Payoh Int",
                  "Distance": 0.05398095560525409
              },
              {
                  "BusStopCode": "52189",
                  "Name": "Toa Payoh Stn",
                  "Distance": 0.11578481081941851
              },
              {
                  "BusStopCode": "52181",
                  "Name": "Opp Toa Payoh Stn",
                  "Distance": 0.12072493660721328
              }
          ]
      },
      {
          "mrt": "Bukit Batok",
          "code": "NS2",
          "closest_stops": [
              {
                  "BusStopCode": "43009",
                  "Name": "Bt Batok Int",
                  "Distance": 0.19385864239473827
              },
              {
                  "BusStopCode": "43389",
                  "Name": "Opp Blk 102",
                  "Distance": 0.21287351780944397
              },
              {
                  "BusStopCode": "43391",
                  "Name": "Bt Batok CC",
                  "Distance": 0.22002031177715262
              },
              {
                  "BusStopCode": "43399",
                  "Name": "Opp Blk 120",
                  "Distance": 0.24483211233389718
              },
              {
                  "BusStopCode": "43701",
                  "Name": "Blk 225",
                  "Distance": 0.27741833236052965
              },
              {
                  "BusStopCode": "43709",
                  "Name": "Blk 644",
                  "Distance": 0.27873152984815125
              },
              {
                  "BusStopCode": "43419",
                  "Name": "Aft Bt Batok Stn/Blk 628",
                  "Distance": 0.28127227458468024
              },
              {
                  "BusStopCode": "43411",
                  "Name": "Opp Blk 628",
                  "Distance": 0.3086275945717981
              }
          ]
      },
      {
          "mrt": "Novena",
          "code": "NS20",
          "closest_stops": [
              {
                  "BusStopCode": "50038",
                  "Name": "Novena Stn",
                  "Distance": 0.07849610572225048
              },
              {
                  "BusStopCode": "50037",
                  "Name": "Bef Novena Stn Exit B",
                  "Distance": 0.17897424471643875
              },
              {
                  "BusStopCode": "50031",
                  "Name": "Opp Novena Ch",
                  "Distance": 0.24142752689243926
              }
          ]
      },
      {
          "mrt": "Newton_NS",
          "code": "NS21",
          "closest_stops": [
              {
                  "BusStopCode": "40181",
                  "Name": "Newton Stn Exit A",
                  "Distance": 0.07222954415953087
              },
              {
                  "BusStopCode": "40189",
                  "Name": "Newton Stn Exit B",
                  "Distance": 0.11415694364348773
              },
              {
                  "BusStopCode": "40049",
                  "Name": "Opp Newton Stn Exit C",
                  "Distance": 0.11822264596720015
              },
              {
                  "BusStopCode": "40041",
                  "Name": "Newton Stn Exit C",
                  "Distance": 0.1201895362128295
              }
          ]
      },
      {
          "mrt": "Orchard_NS",
          "code": "NS22",
          "closest_stops": [
              {
                  "BusStopCode": "09023",
                  "Name": "Opp Orchard Stn/ION",
                  "Distance": 0.062251079939653994
              },
              {
                  "BusStopCode": "09022",
                  "Name": "ORCHARD STN EXIT 13",
                  "Distance": 0.09001828993231027
              },
              {
                  "BusStopCode": "09047",
                  "Name": "Orchard Stn/Tang Plaza",
                  "Distance": 0.17433294975660027
              }
          ]
      },
      {
          "mrt": "Somerset",
          "code": "NS23",
          "closest_stops": [
              {
                  "BusStopCode": "08121",
                  "Name": "Somerset Stn",
                  "Distance": 0.030811690614874807
              },
              {
                  "BusStopCode": "09038",
                  "Name": "Opp Somerset Stn",
                  "Distance": 0.13507990961296254
              }
          ]
      },
      {
          "mrt": "Dhoby Ghaut_NS",
          "code": "NS24",
          "closest_stops": [
              {
                  "BusStopCode": "08031",
                  "Name": "Dhoby Ghaut Stn Exit B",
                  "Distance": 0.058968477910417205
              },
              {
                  "BusStopCode": "08057",
                  "Name": "Dhoby Ghaut Stn",
                  "Distance": 0.06555086935458956
              }
          ]
      },
      {
          "mrt": "City Hall_NS",
          "code": "NS25",
          "closest_stops": [
              {
                  "BusStopCode": "04167",
                  "Name": "City Hall Stn Exit B",
                  "Distance": 0.09002219854584277
              },
              {
                  "BusStopCode": "04111",
                  "Name": "Capitol Bldg",
                  "Distance": 0.09599666706784739
              },
              {
                  "BusStopCode": "04168",
                  "Name": "Aft City Hall Stn Exit B",
                  "Distance": 0.1411543086569371
              }
          ]
      },
      {
          "mrt": "Raffles Place_NS",
          "code": "NS26",
          "closest_stops": [
              {
                  "BusStopCode": "03019",
                  "Name": "OUE Bayfront",
                  "Distance": 0.18300858965190428
              },
              {
                  "BusStopCode": "03011",
                  "Name": "Fullerton Sq",
                  "Distance": 0.25531202897143934
              },
              {
                  "BusStopCode": "05319",
                  "Name": "OCBC Ctr",
                  "Distance": 0.26192792839456597
              },
              {
                  "BusStopCode": "03021",
                  "Name": "Prudential Twr",
                  "Distance": 0.2638051804458568
              },
              {
                  "BusStopCode": "03031",
                  "Name": "Raffles Pl Stn Exit F",
                  "Distance": 0.2682292701223921
              }
          ]
      },
      {
          "mrt": "Marina Bay_NS",
          "code": "NS27",
          "closest_stops": [
              {
                  "BusStopCode": "03539",
                  "Name": "Marina Bay Stn",
                  "Distance": 0.2797017621793172
              },
              {
                  "BusStopCode": "03579",
                  "Name": "Opp Downtown Stn",
                  "Distance": 0.45523617505068176
              },
              {
                  "BusStopCode": "03529",
                  "Name": "Downtown Stn Exit E",
                  "Distance": 0.5183815695625895
              },
              {
                  "BusStopCode": "03339",
                  "Name": "Aft Marina Gdns Dr",
                  "Distance": 0.5283562532498655
              }
          ]
      },
      {
          "mrt": "Marina South Pier",
          "code": "NS28",
          "closest_stops": [
              {
                  "BusStopCode": "03411",
                  "Name": "Opp Marina Sth Pier Stn",
                  "Distance": 0.036272028505244164
              },
              {
                  "BusStopCode": "03419",
                  "Name": "Marina Sth Pier Stn",
                  "Distance": 0.05969344680817665
              }
          ]
      },
      {
          "mrt": "Bukit Gombak",
          "code": "NS3",
          "closest_stops": [
              {
                  "BusStopCode": "43579",
                  "Name": "Bt Gombak Stn",
                  "Distance": 0.030445844285297893
              },
              {
                  "BusStopCode": "43571",
                  "Name": "Opp Bt Gombak Stn",
                  "Distance": 0.05011029565014479
              }
          ]
      },
      {
          "mrt": "Choa Chu Kang_NS",
          "code": "NS4",
          "closest_stops": [
              {
                  "BusStopCode": "44531",
                  "Name": "Opp Choa Chu Kang Stn",
                  "Distance": 0.055036165096409406
              },
              {
                  "BusStopCode": "44539",
                  "Name": "Lot 1/Choa Chu Kang Stn",
                  "Distance": 0.05602027740265132
              }
          ]
      },
      {
          "mrt": "Yew Tee",
          "code": "NS5",
          "closest_stops": [
              {
                  "BusStopCode": "45321",
                  "Name": "Yew Tee Stn",
                  "Distance": 0.01829402384021848
              },
              {
                  "BusStopCode": "45329",
                  "Name": "Opp Yew Tee Stn",
                  "Distance": 0.05165041652863139
              }
          ]
      },
      {
          "mrt": "Kranji",
          "code": "NS7",
          "closest_stops": [
              {
                  "BusStopCode": "45139",
                  "Name": "Kranji Stn",
                  "Distance": 0.023556226848933926
              },
              {
                  "BusStopCode": "45131",
                  "Name": "Opp Kranji Stn",
                  "Distance": 0.10615004490598141
              }
          ]
      },
      {
          "mrt": "Marsiling",
          "code": "NS8",
          "closest_stops": [
              {
                  "BusStopCode": "46521",
                  "Name": "Marsiling Stn",
                  "Distance": 0.02012704875851555
              },
              {
                  "BusStopCode": "46529",
                  "Name": "Opp Marsiling Stn",
                  "Distance": 0.06644037254424844
              }
          ]
      },
      {
          "mrt": "Woodlands_NS",
          "code": "NS9",
          "closest_stops": [
              {
                  "BusStopCode": "46009",
                  "Name": "Woodlands Int",
                  "Distance": 0.0629025260553391
              },
              {
                  "BusStopCode": "47009",
                  "Name": "Woodlands Temp Int",
                  "Distance": 0.07654727746330775
              },
              {
                  "BusStopCode": "46008",
                  "Name": "Woodlands Int",
                  "Distance": 0.08500442634939359
              }
          ]
      },
      {
          "mrt": "Cove",
          "code": "PE1",
          "closest_stops": [
              {
                  "BusStopCode": "65151",
                  "Name": "Cove Stn Exit B",
                  "Distance": 0.10895635351079144
              },
              {
                  "BusStopCode": "65159",
                  "Name": "Cove Stn Exit A",
                  "Distance": 0.13355542302264542
              },
              {
                  "BusStopCode": "65079",
                  "Name": "Blk 102C",
                  "Distance": 0.1348281399968538
              },
              {
                  "BusStopCode": "65081",
                  "Name": "Opp Blk 199C",
                  "Distance": 0.17289774562771376
              },
              {
                  "BusStopCode": "65241",
                  "Name": "Blk 196C",
                  "Distance": 0.20486458345225425
              },
              {
                  "BusStopCode": "65089",
                  "Name": "Opp Blk 296",
                  "Distance": 0.2086093966055552
              },
              {
                  "BusStopCode": "65071",
                  "Name": "Blk 203A",
                  "Distance": 0.21888429232253342
              }
          ]
      },
      {
          "mrt": "Meridian",
          "code": "PE2",
          "closest_stops": [
              {
                  "BusStopCode": "65161",
                  "Name": "Meridian Stn Exit B",
                  "Distance": 0.052698101972679524
              },
              {
                  "BusStopCode": "65169",
                  "Name": "Meridian Stn Exit A",
                  "Distance": 0.07615428843640908
              }
          ]
      },
      {
          "mrt": "Coral Edge",
          "code": "PE3",
          "closest_stops": [
              {
                  "BusStopCode": "65179",
                  "Name": "Coral Edge Stn Exit A",
                  "Distance": 0.0946397527176854
              },
              {
                  "BusStopCode": "65171",
                  "Name": "Coral Edge Stn Exit B",
                  "Distance": 0.09713583062700125
              }
          ]
      },
      {
          "mrt": "Riviera",
          "code": "PE4",
          "closest_stops": [
              {
                  "BusStopCode": "65231",
                  "Name": "Riviera Stn Exit B",
                  "Distance": 0.052826436984664514
              },
              {
                  "BusStopCode": "65239",
                  "Name": "Riviera Stn Exit A",
                  "Distance": 0.054128961893168175
              }
          ]
      },
      {
          "mrt": "Kadaloor",
          "code": "PE5",
          "closest_stops": [
              {
                  "BusStopCode": "65321",
                  "Name": "Kadaloor Stn Exit B",
                  "Distance": 0.025397013313966214
              },
              {
                  "BusStopCode": "65329",
                  "Name": "Kadaloor Stn Exit A",
                  "Distance": 0.04787177522472411
              }
          ]
      },
      {
          "mrt": "Oasis",
          "code": "PE6",
          "closest_stops": [
              {
                  "BusStopCode": "65311",
                  "Name": "Oasis Stn Exit B/Blk 617D",
                  "Distance": 0.03869453275494148
              },
              {
                  "BusStopCode": "65319",
                  "Name": "Oasis Stn Exit A",
                  "Distance": 0.03935055825196653
              }
          ]
      },
      {
          "mrt": "Damai",
          "code": "PE7",
          "closest_stops": [
              {
                  "BusStopCode": "65309",
                  "Name": "Damai Stn Exit A",
                  "Distance": 0.07453864225385036
              },
              {
                  "BusStopCode": "65301",
                  "Name": "Damai Stn Exit B",
                  "Distance": 0.15626968723435236
              },
              {
                  "BusStopCode": "65099",
                  "Name": "BLK 604A",
                  "Distance": 0.18406832366689405
              }
          ]
      },
      {
          "mrt": "Punggol_PTC",
          "code": "PTC",
          "closest_stops": [
              {
                  "BusStopCode": "65259",
                  "Name": "Punggol Stn/Int",
                  "Distance": 0.054664352992169145
              },
              {
                  "BusStopCode": "65251",
                  "Name": "Punggol Stn/Waterway Pt",
                  "Distance": 0.0757851771027378
              },
              {
                  "BusStopCode": "65009",
                  "Name": "Punggol Temp Int",
                  "Distance": 0.17264624358200745
              }
          ]
      },
      {
          "mrt": "Sam Kee",
          "code": "PW1",
          "closest_stops": [
              {
                  "BusStopCode": "65481",
                  "Name": "Opp One Punggol",
                  "Distance": 0.1894668072479289
              },
              {
                  "BusStopCode": "65489",
                  "Name": "One Punggol",
                  "Distance": 0.21088155192669444
              }
          ]
      },
      {
          "mrt": "Teck Lee",
          "code": "PW2",
          "closest_stops": [
              {
                  "BusStopCode": "65481",
                  "Name": "Opp One Punggol",
                  "Distance": 0.43237173313564203
              },
              {
                  "BusStopCode": "65709",
                  "Name": "Before SIT Punggol",
                  "Distance": 0.4542554633442284
              },
              {
                  "BusStopCode": "65701",
                  "Name": "Opposite SIT Punggol",
                  "Distance": 0.504245738735964
              },
              {
                  "BusStopCode": "65489",
                  "Name": "One Punggol",
                  "Distance": 0.5132793663546293
              },
              {
                  "BusStopCode": "65631",
                  "Name": "Aft Punggol Pt Stn",
                  "Distance": 0.5297467060481029
              }
          ]
      },
      {
          "mrt": "Punggol Point",
          "code": "PW3",
          "closest_stops": [
              {
                  "BusStopCode": "65631",
                  "Name": "Aft Punggol Pt Stn",
                  "Distance": 0.14773785945049445
              },
              {
                  "BusStopCode": "65639",
                  "Name": "Bef Punggol Pt Stn",
                  "Distance": 0.1699743687409641
              },
              {
                  "BusStopCode": "65681",
                  "Name": "Bef Northshore Cres",
                  "Distance": 0.20965917490285108
              },
              {
                  "BusStopCode": "65689",
                  "Name": "Aft Northshore Cres",
                  "Distance": 0.21529133886773644
              },
              {
                  "BusStopCode": "65661",
                  "Name": "Blk 421C",
                  "Distance": 0.24641837255753377
              }
          ]
      },
      {
          "mrt": "Samudera",
          "code": "PW4",
          "closest_stops": [
              {
                  "BusStopCode": "65629",
                  "Name": "Samudera Stn Exit A",
                  "Distance": 0.06518518520621167
              },
              {
                  "BusStopCode": "65621",
                  "Name": "Samudera Stn Exit B",
                  "Distance": 0.06971007773513167
              },
              {
                  "BusStopCode": "65651",
                  "Name": "Blk 413C",
                  "Distance": 0.16934194772756309
              }
          ]
      },
      {
          "mrt": "Nibong",
          "code": "PW5",
          "closest_stops": [
              {
                  "BusStopCode": "65619",
                  "Name": "Nibong Stn Exit A",
                  "Distance": 0.046829330915203686
              },
              {
                  "BusStopCode": "65611",
                  "Name": "Nibong Stn Exit B",
                  "Distance": 0.05008383113077066
              }
          ]
      },
      {
          "mrt": "Sumang",
          "code": "PW6",
          "closest_stops": [
              {
                  "BusStopCode": "65601",
                  "Name": "Sumang Stn Exit B",
                  "Distance": 0.09285924381771875
              },
              {
                  "BusStopCode": "65609",
                  "Name": "Sumang Stn Exit A",
                  "Distance": 0.0984501226561832
              }
          ]
      },
      {
          "mrt": "Soo Teck",
          "code": "PW7",
          "closest_stops": [
              {
                  "BusStopCode": "65141",
                  "Name": "Aft Soo Teck Stn",
                  "Distance": 0.09441517435501975
              },
              {
                  "BusStopCode": "65149",
                  "Name": "Bef Soo Teck Stn",
                  "Distance": 0.11156338359909798
              },
              {
                  "BusStopCode": "65401",
                  "Name": "Opp Blk 264A",
                  "Distance": 0.2070843506830538
              }
          ]
      },
      {
          "mrt": "Compassvale",
          "code": "SE1",
          "closest_stops": [
              {
                  "BusStopCode": "67259",
                  "Name": "Compassvale Stn Exit B",
                  "Distance": 0.015410785874730932
              },
              {
                  "BusStopCode": "67251",
                  "Name": "Compassvale Stn Exit A",
                  "Distance": 0.01688660504473915
              }
          ]
      },
      {
          "mrt": "Rumbia",
          "code": "SE2",
          "closest_stops": [
              {
                  "BusStopCode": "67229",
                  "Name": "Rumbia Stn Exit A",
                  "Distance": 0.05518049771065175
              },
              {
                  "BusStopCode": "67221",
                  "Name": "Rumbia Stn Exit B/Blk 153",
                  "Distance": 0.06380146598862882
              },
              {
                  "BusStopCode": "67671",
                  "Name": "Blk 156A CP",
                  "Distance": 0.143377267602504
              }
          ]
      },
      {
          "mrt": "Bakau",
          "code": "SE3",
          "closest_stops": [
              {
                  "BusStopCode": "67131",
                  "Name": "Bakau Stn/Blk 122F",
                  "Distance": 0.044064476022804895
              },
              {
                  "BusStopCode": "67539",
                  "Name": "Blk 122C",
                  "Distance": 0.13289894974981997
              },
              {
                  "BusStopCode": "67531",
                  "Name": "Blk 158C",
                  "Distance": 0.14660071701455935
              },
              {
                  "BusStopCode": "67129",
                  "Name": "Blk 137",
                  "Distance": 0.1578031655252409
              },
              {
                  "BusStopCode": "67121",
                  "Name": "Blk 142A",
                  "Distance": 0.16604593438980228
              },
              {
                  "BusStopCode": "67139",
                  "Name": "Nth Spring Pr Sch",
                  "Distance": 0.17237985471382303
              }
          ]
      },
      {
          "mrt": "Kangkar",
          "code": "SE4",
          "closest_stops": [
              {
                  "BusStopCode": "67151",
                  "Name": "Kangkar Stn Exit B",
                  "Distance": 0.04356308326816229
              },
              {
                  "BusStopCode": "67159",
                  "Name": "Kangkar Stn Exit A",
                  "Distance": 0.049948316649183415
              }
          ]
      },
      {
          "mrt": "Ranggung",
          "code": "SE5",
          "closest_stops": [
              {
                  "BusStopCode": "67211",
                  "Name": "Ranggung Stn Exit A",
                  "Distance": 0.03595672398700362
              },
              {
                  "BusStopCode": "67219",
                  "Name": "Ranggung Stn Exit B",
                  "Distance": 0.0421690902625895
              }
          ]
      },
      {
          "mrt": "Sengkang_STC",
          "code": "STC",
          "closest_stops": [
              {
                  "BusStopCode": "67009",
                  "Name": "Sengkang Int",
                  "Distance": 0.08262255560432721
              },
              {
                  "BusStopCode": "67409",
                  "Name": "Sengkang Stn",
                  "Distance": 0.14141341309379746
              },
              {
                  "BusStopCode": "67401",
                  "Name": "Opp Sengkang Stn/Blk 260A",
                  "Distance": 0.17553186680849558
              },
              {
                  "BusStopCode": "67441",
                  "Name": "Sengkang Community Hub",
                  "Distance": 0.23048967618050162
              }
          ]
      },
      {
          "mrt": "Cheng Lim",
          "code": "SW1",
          "closest_stops": [
              {
                  "BusStopCode": "67429",
                  "Name": "Cheng Lim Stn Exit A",
                  "Distance": 0.01358791955267944
              },
              {
                  "BusStopCode": "67421",
                  "Name": "Cheng Lim Stn Exit B",
                  "Distance": 0.017013587751718455
              }
          ]
      },
      {
          "mrt": "Farmway",
          "code": "SW2",
          "closest_stops": [
              {
                  "BusStopCode": "67319",
                  "Name": "Farmway Stn Exit A",
                  "Distance": 0.0367044002231698
              },
              {
                  "BusStopCode": "67311",
                  "Name": "Farmway Stn Exit B",
                  "Distance": 0.07522246917898844
              }
          ]
      },
      {
          "mrt": "Kupang",
          "code": "SW3",
          "closest_stops": [
              {
                  "BusStopCode": "67559",
                  "Name": "Opp Blk 471A",
                  "Distance": 0.3031756727226168
              },
              {
                  "BusStopCode": "67551",
                  "Name": "Blk 471A",
                  "Distance": 0.3282998514895857
              },
              {
                  "BusStopCode": "67701",
                  "Name": "AFT BLK 467B",
                  "Distance": 0.4235288554649423
              }
          ]
      },
      {
          "mrt": "Thanggam",
          "code": "SW4",
          "closest_stops": [
              {
                  "BusStopCode": "67741",
                  "Name": "Thanggam Stn",
                  "Distance": 0.03417701118535643
              },
              {
                  "BusStopCode": "67701",
                  "Name": "AFT BLK 467B",
                  "Distance": 0.232198113065618
              },
              {
                  "BusStopCode": "67561",
                  "Name": "Opp Blk 432A",
                  "Distance": 0.2649271693985142
              },
              {
                  "BusStopCode": "68031",
                  "Name": "Jln Kayu Shophouse",
                  "Distance": 0.2890767865015436
              },
              {
                  "BusStopCode": "68039",
                  "Name": "Aft Abundant Grace Ch",
                  "Distance": 0.29879038658441137
              },
              {
                  "BusStopCode": "67569",
                  "Name": "Blk 432A",
                  "Distance": 0.30489376840784654
              },
              {
                  "BusStopCode": "67571",
                  "Name": "Aft Lor Tanggam",
                  "Distance": 0.31757350531969203
              },
              {
                  "BusStopCode": "68049",
                  "Name": "Opp Jln Tari Lilin",
                  "Distance": 0.32178423905831144
              }
          ]
      },
      {
          "mrt": "Fernvale",
          "code": "SW5",
          "closest_stops": [
              {
                  "BusStopCode": "67631",
                  "Name": "Blk 441D",
                  "Distance": 0.08346777097645641
              },
              {
                  "BusStopCode": "67639",
                  "Name": "Blk 436A",
                  "Distance": 0.13277267335275816
              },
              {
                  "BusStopCode": "67489",
                  "Name": "Opp Fernvale Stn",
                  "Distance": 0.1341330757130514
              },
              {
                  "BusStopCode": "67481",
                  "Name": "Fernvale Stn/Blk 439A",
                  "Distance": 0.15698334597806224
              },
              {
                  "BusStopCode": "67491",
                  "Name": "Opp Fernvale Pr Sch",
                  "Distance": 0.21518727968593965
              },
              {
                  "BusStopCode": "67499",
                  "Name": "Fernvale Pr Sch",
                  "Distance": 0.22636581501469397
              }
          ]
      },
      {
          "mrt": "Layar",
          "code": "SW6",
          "closest_stops": [
              {
                  "BusStopCode": "67471",
                  "Name": "Layar Stn Exit B",
                  "Distance": 0.01435866604631369
              },
              {
                  "BusStopCode": "67479",
                  "Name": "Layar Stn Exit A/Blk 417A",
                  "Distance": 0.02003230880339677
              }
          ]
      },
      {
          "mrt": "Tongkang",
          "code": "SW7",
          "closest_stops": [
              {
                  "BusStopCode": "65801",
                  "Name": "Blk 309D",
                  "Distance": 0.1113004553322228
              },
              {
                  "BusStopCode": "67301",
                  "Name": "Blk 305D",
                  "Distance": 0.1407185122850278
              },
              {
                  "BusStopCode": "67329",
                  "Name": "Opp Blk 310B",
                  "Distance": 0.14844693658940517
              },
              {
                  "BusStopCode": "65809",
                  "Name": "Anchor Green Pr Sch",
                  "Distance": 0.20403494312431816
              },
              {
                  "BusStopCode": "67321",
                  "Name": "Blk 311A",
                  "Distance": 0.21297777969349713
              }
          ]
      },
      {
          "mrt": "Renjong",
          "code": "SW8",
          "closest_stops": [
              {
                  "BusStopCode": "67299",
                  "Name": "Renjong Stn Exit A",
                  "Distance": 0.08488458187313073
              },
              {
                  "BusStopCode": "67291",
                  "Name": "Renjong Stn Exit B",
                  "Distance": 0.10010081039078035
              },
              {
                  "BusStopCode": "67461",
                  "Name": "Aft Sengkang East Ave",
                  "Distance": 0.13369029172246777
              },
              {
                  "BusStopCode": "67469",
                  "Name": "Bef Sengkang East Ave",
                  "Distance": 0.15517191614634612
              }
          ]
      },
      {
          "mrt": "Woodlands North",
          "code": "TE1",
          "closest_stops": [
              {
                  "BusStopCode": "47201",
                  "Name": "W'lands Nth Stn",
                  "Distance": 0.07150822828355136
              },
              {
                  "BusStopCode": "47021",
                  "Name": "Khalsa Crescent Drug Rehab Ctr",
                  "Distance": 0.37255519964561223
              },
              {
                  "BusStopCode": "47029",
                  "Name": "Opp Khalsa Crescent Drug Rehab Ctr",
                  "Distance": 0.42121334345926437
              },
              {
                  "BusStopCode": "47031",
                  "Name": "Bef Keramat Rd",
                  "Distance": 0.4531233797889975
              }
          ]
      },
      {
          "mrt": "Stevens_TE",
          "code": "TE11",
          "closest_stops": [
              {
                  "BusStopCode": "40081",
                  "Name": "STEVENS STN EXIT 1",
                  "Distance": 0.06613101915595317
              },
              {
                  "BusStopCode": "40229",
                  "Name": "BEF STEVENS STN EXIT 2",
                  "Distance": 0.10933734699300975
              },
              {
                  "BusStopCode": "40221",
                  "Name": "STEVENS STN EXIT 3",
                  "Distance": 0.12973107147939225
              }
          ]
      },
      {
          "mrt": "Napier",
          "code": "TE12",
          "closest_stops": [
              {
                  "BusStopCode": "13011",
                  "Name": "NAPIER STN EXIT 2",
                  "Distance": 0.0736269731154652
              },
              {
                  "BusStopCode": "13019",
                  "Name": "NAPIER STN EXIT 1",
                  "Distance": 0.1309223047948649
              }
          ]
      },
      {
          "mrt": "Orchard Boulevard",
          "code": "TE13",
          "closest_stops": [
              {
                  "BusStopCode": "09139",
                  "Name": "ORCHARD BLVD STN EXIT 1",
                  "Distance": 0.13356495749238972
              },
              {
                  "BusStopCode": "09131",
                  "Name": "OPP ORCHARD BLVD STN",
                  "Distance": 0.1843576970537903
              },
              {
                  "BusStopCode": "13189",
                  "Name": "Bef One Tree Hill",
                  "Distance": 0.225584259721529
              },
              {
                  "BusStopCode": "13181",
                  "Name": "Aft One Tree Hill",
                  "Distance": 0.24172244576792698
              },
              {
                  "BusStopCode": "13209",
                  "Name": "Opp British High Comsn",
                  "Distance": 0.28289050171149993
              }
          ]
      },
      {
          "mrt": "Orchard_TE",
          "code": "TE14",
          "closest_stops": [
              {
                  "BusStopCode": "09023",
                  "Name": "Opp Orchard Stn/ION",
                  "Distance": 0.062251079939653994
              },
              {
                  "BusStopCode": "09022",
                  "Name": "ORCHARD STN EXIT 13",
                  "Distance": 0.09001828993231027
              },
              {
                  "BusStopCode": "09047",
                  "Name": "Orchard Stn/Tang Plaza",
                  "Distance": 0.17433294975660027
              }
          ]
      },
      {
          "mrt": "Great World",
          "code": "TE15",
          "closest_stops": [
              {
                  "BusStopCode": "13119",
                  "Name": "Great World Stn Exit 3",
                  "Distance": 0.11685824406780394
              },
              {
                  "BusStopCode": "13071",
                  "Name": "Great World Stn Exit 5",
                  "Distance": 0.1996299232049561
              },
              {
                  "BusStopCode": "13079",
                  "Name": "GREAT WORLD STN EXIT 4",
                  "Distance": 0.21269638092598497
              }
          ]
      },
      {
          "mrt": "Havelock",
          "code": "TE16",
          "closest_stops": [
              {
                  "BusStopCode": "06071",
                  "Name": "HAVELOCK STN EXIT 2",
                  "Distance": 0.07120429904828644
              },
              {
                  "BusStopCode": "06081",
                  "Name": "HAVELOCK STN EXIT 3",
                  "Distance": 0.10064459069818828
              },
              {
                  "BusStopCode": "10149",
                  "Name": "Blk 1",
                  "Distance": 0.18553814344657682
              },
              {
                  "BusStopCode": "06069",
                  "Name": "Aft Furama RiverFront",
                  "Distance": 0.19756796356790068
              }
          ]
      },
      {
          "mrt": "Outram Park_TE",
          "code": "TE17",
          "closest_stops": [
              {
                  "BusStopCode": "05069",
                  "Name": "OUTRAM PK STN EXIT 4",
                  "Distance": 0.0458837285339248
              },
              {
                  "BusStopCode": "05019",
                  "Name": "Aft Duxton Plain Pk",
                  "Distance": 0.10566701429457898
              },
              {
                  "BusStopCode": "05012",
                  "Name": "Bef Pearl'S Hill Terr",
                  "Distance": 0.11901543449790003
              }
          ]
      },
      {
          "mrt": "Maxwell",
          "code": "TE18",
          "closest_stops": [
              {
                  "BusStopCode": "05269",
                  "Name": "MAXWELL STN EXIT 2",
                  "Distance": 0.0663458186935927
              },
              {
                  "BusStopCode": "05271",
                  "Name": "Opp Fairfield Meth Ch",
                  "Distance": 0.10564140166160016
              },
              {
                  "BusStopCode": "05259",
                  "Name": "OPP MAXWELL STN EXIT 3",
                  "Distance": 0.18267901075591342
              },
              {
                  "BusStopCode": "05241",
                  "Name": "Opp Blk 333",
                  "Distance": 0.19270432164086565
              }
          ]
      },
      {
          "mrt": "Shenton Way",
          "code": "TE19",
          "closest_stops": [
              {
                  "BusStopCode": "03549",
                  "Name": "Shenton Way Stn Exit 3",
                  "Distance": 0.013198151509177811
              },
              {
                  "BusStopCode": "03129",
                  "Name": "UIC Bldg",
                  "Distance": 0.11814098030170601
              }
          ]
      },
      {
          "mrt": "Woodlands_TE",
          "code": "TE2",
          "closest_stops": [
              {
                  "BusStopCode": "46009",
                  "Name": "Woodlands Int",
                  "Distance": 0.0629025260553391
              },
              {
                  "BusStopCode": "47009",
                  "Name": "Woodlands Temp Int",
                  "Distance": 0.07654727746330775
              },
              {
                  "BusStopCode": "46008",
                  "Name": "Woodlands Int",
                  "Distance": 0.08500442634939359
              }
          ]
      },
      {
          "mrt": "Marina Bay_TE",
          "code": "TE20",
          "closest_stops": [
              {
                  "BusStopCode": "03539",
                  "Name": "Marina Bay Stn",
                  "Distance": 0.2797017621793172
              },
              {
                  "BusStopCode": "03579",
                  "Name": "Opp Downtown Stn",
                  "Distance": 0.45523617505068176
              },
              {
                  "BusStopCode": "03529",
                  "Name": "Downtown Stn Exit E",
                  "Distance": 0.5183815695625895
              },
              {
                  "BusStopCode": "03339",
                  "Name": "Aft Marina Gdns Dr",
                  "Distance": 0.5283562532498655
              }
          ]
      },
      {
          "mrt": "Gardens by the Bay",
          "code": "TE22",
          "closest_stops": [
              {
                  "BusStopCode": "03361",
                  "Name": "GARDENS BY THE BAY STN EXIT 2",
                  "Distance": 0.10015574127035794
              },
              {
                  "BusStopCode": "03369",
                  "Name": "GARDENS BY THE BAY STN EXIT 1",
                  "Distance": 0.19537440984158028
              },
              {
                  "BusStopCode": "03371",
                  "Name": "Gdns by the Bay",
                  "Distance": 0.24640511517930397
              }
          ]
      },
      {
          "mrt": "Tanjong Rhu",
          "code": "TE23",
          "closest_stops": [
              {
                  "BusStopCode": "90049",
                  "Name": "Tanjong Rhu Stn Exit 1",
                  "Distance": 0.020264175145390056
              },
              {
                  "BusStopCode": "90041",
                  "Name": "Tanjong Rhu Stn Exit 2",
                  "Distance": 0.027720168657853348
              },
              {
                  "BusStopCode": "90029",
                  "Name": "Opp Pebble Bay",
                  "Distance": 0.10598897189280809
              }
          ]
      },
      {
          "mrt": "Katong Park",
          "code": "TE24",
          "closest_stops": [
              {
                  "BusStopCode": "91089",
                  "Name": "Opp Katong Pk Stn",
                  "Distance": 0.147704776265487
              },
              {
                  "BusStopCode": "91081",
                  "Name": "Aft Katong Pk Stn Exit 2",
                  "Distance": 0.16456880397909002
              }
          ]
      },
      {
          "mrt": "Tanjong Katong",
          "code": "TE25",
          "closest_stops": [
              {
                  "BusStopCode": "82051",
                  "Name": "Aft Tg Katong Stn Exit 2",
                  "Distance": 0.18078773937026807
              },
              {
                  "BusStopCode": "82059",
                  "Name": "Bef Tg Katong Stn Exit 3",
                  "Distance": 0.24438529108020104
              },
              {
                  "BusStopCode": "91071",
                  "Name": "Bef Tg Katong Rd",
                  "Distance": 0.33729125773565455
              },
              {
                  "BusStopCode": "92261",
                  "Name": "Opp P/G @ Big Splash",
                  "Distance": 0.3423672301440587
              }
          ]
      },
      {
          "mrt": "Marine Parade",
          "code": "TE26",
          "closest_stops": [
              {
                  "BusStopCode": "92251",
                  "Name": "Opp Parkland Green",
                  "Distance": 0.17011384681037517
              },
              {
                  "BusStopCode": "92049",
                  "Name": "Marine Pde Stn/Parkway Pde",
                  "Distance": 0.18612248230933304
              },
              {
                  "BusStopCode": "92041",
                  "Name": "Marine Pde Stn Exit 2",
                  "Distance": 0.2195699295106456
              }
          ]
      },
      {
          "mrt": "Marine Terrace",
          "code": "TE27",
          "closest_stops": [
              {
                  "BusStopCode": "92191",
                  "Name": "Opp CP C3",
                  "Distance": 0.14115682385838982
              },
              {
                  "BusStopCode": "92221",
                  "Name": "Blk 19",
                  "Distance": 0.14868290748831597
              },
              {
                  "BusStopCode": "92239",
                  "Name": "Blk 45",
                  "Distance": 0.21795896460127642
              },
              {
                  "BusStopCode": "92229",
                  "Name": "Blk 53",
                  "Distance": 0.21910727445872977
              }
          ]
      },
      {
          "mrt": "Siglap",
          "code": "TE28",
          "closest_stops": [
              {
                  "BusStopCode": "93179",
                  "Name": "CP D3",
                  "Distance": 0.11117109634847352
              },
              {
                  "BusStopCode": "93171",
                  "Name": "Opp CP D3",
                  "Distance": 0.1159283395569987
              }
          ]
      },
      {
          "mrt": "Bayshore",
          "code": "TE29",
          "closest_stops": [
              {
                  "BusStopCode": "93151",
                  "Name": "Opp Cable Ski Pk",
                  "Distance": 0.07512631240283726
              },
              {
                  "BusStopCode": "93159",
                  "Name": "Cable Ski Pk",
                  "Distance": 0.1981218497945124
              }
          ]
      },
      {
          "mrt": "Woodlands South",
          "code": "TE3",
          "closest_stops": [
              {
                  "BusStopCode": "46981",
                  "Name": "W'lands Sth Stn Exit 2",
                  "Distance": 0.08133388641801977
              },
              {
                  "BusStopCode": "47749",
                  "Name": "Woodlands Health Campus",
                  "Distance": 0.15328536707377582
              },
              {
                  "BusStopCode": "46991",
                  "Name": "Blk 589",
                  "Distance": 0.183715983077192
              },
              {
                  "BusStopCode": "46999",
                  "Name": "Opp Blk 589",
                  "Distance": 0.19248886691915584
              },
              {
                  "BusStopCode": "46989",
                  "Name": "W'lands Sth Stn Exit 1",
                  "Distance": 0.2512413178723347
              }
          ]
      },
      {
          "mrt": "Bedok South",
          "code": "TE30",
          "closest_stops": [
              {
                  "BusStopCode": "84669",
                  "Name": "Blk 73",
                  "Distance": 0.04594871120619795
              },
              {
                  "BusStopCode": "84661",
                  "Name": "Blk 172",
                  "Distance": 0.06821833368483228
              },
              {
                  "BusStopCode": "84079",
                  "Name": "Opp Blk 71",
                  "Distance": 0.116436735241038
              },
              {
                  "BusStopCode": "84071",
                  "Name": "Blk 71",
                  "Distance": 0.14774845785034066
              }
          ]
      },
      {
          "mrt": "Sungei Bedok",
          "code": "TE31",
          "closest_stops": [
              {
                  "BusStopCode": "85049",
                  "Name": "Opp Man Fatt Lam Tp",
                  "Distance": 0.25843975549765114
              },
              {
                  "BusStopCode": "85041",
                  "Name": "Man Fatt Lam Tp",
                  "Distance": 0.2757703057678695
              },
              {
                  "BusStopCode": "85031",
                  "Name": "Excelsior Gdns",
                  "Distance": 0.2863127402702268
              },
              {
                  "BusStopCode": "85039",
                  "Name": "Opp Excelsior Gdns",
                  "Distance": 0.3247555522238581
              },
              {
                  "BusStopCode": "85109",
                  "Name": "Bef Bedok Rd",
                  "Distance": 0.3385674273502661
              }
          ]
      },
      {
          "mrt": "Springleaf",
          "code": "TE4",
          "closest_stops": [
              {
                  "BusStopCode": "56091",
                  "Name": "Springleaf Stn Exit 3",
                  "Distance": 0.18424851468859424
              },
              {
                  "BusStopCode": "56099",
                  "Name": "Springleaf Stn Exit 2",
                  "Distance": 0.21404340620710505
              },
              {
                  "BusStopCode": "57011",
                  "Name": "Opp Springleaf Nature Pk",
                  "Distance": 0.27845924590352106
              }
          ]
      },
      {
          "mrt": "Lentor",
          "code": "TE5",
          "closest_stops": [
              {
                  "BusStopCode": "55349",
                  "Name": "Lentor Stn Exit 5",
                  "Distance": 0.015924588963397063
              },
              {
                  "BusStopCode": "55341",
                  "Name": "Lentor Stn Exit 3",
                  "Distance": 0.027130430788486974
              }
          ]
      },
      {
          "mrt": "Mayflower",
          "code": "TE6",
          "closest_stops": [
              {
                  "BusStopCode": "54181",
                  "Name": "Mayflower Stn Exit 6",
                  "Distance": 0.1821105872825223
              },
              {
                  "BusStopCode": "54189",
                  "Name": "Mayflower Stn Exit 5",
                  "Distance": 0.1869562534163202
              },
              {
                  "BusStopCode": "54161",
                  "Name": "Opp Blk 255",
                  "Distance": 0.24844887309419705
              },
              {
                  "BusStopCode": "54199",
                  "Name": "Bef Mayflower Stn Exit 3",
                  "Distance": 0.25836532985583
              },
              {
                  "BusStopCode": "54169",
                  "Name": "Blk 255",
                  "Distance": 0.2644369373640784
              },
              {
                  "BusStopCode": "54191",
                  "Name": "Mayflower Stn Exit 2",
                  "Distance": 0.27207755088756735
              }
          ]
      },
      {
          "mrt": "Bright Hill",
          "code": "TE7",
          "closest_stops": [
              {
                  "BusStopCode": "53349",
                  "Name": "Bright Hill Stn Exit 1",
                  "Distance": 0.11120854208609214
              },
              {
                  "BusStopCode": "53341",
                  "Name": "Bright Hill Stn Exit 2",
                  "Distance": 0.12348844479610799
              }
          ]
      },
      {
          "mrt": "Upper Thomson",
          "code": "TE8",
          "closest_stops": [
              {
                  "BusStopCode": "53051",
                  "Name": "Upp Thomson Stn Exit 5",
                  "Distance": 0.14682280583764082
              },
              {
                  "BusStopCode": "53049",
                  "Name": "Bef Jln Todak",
                  "Distance": 0.1828818329048852
              },
              {
                  "BusStopCode": "53059",
                  "Name": "Upp Thomson Stn Exit 2",
                  "Distance": 0.2084926425231421
              },
              {
                  "BusStopCode": "53041",
                  "Name": "Bef Thomson Ridge",
                  "Distance": 0.22860786586663442
              }
          ]
      },
      {
          "mrt": "Caldecott_TE",
          "code": "TE9",
          "closest_stops": [
              {
                  "BusStopCode": "52219",
                  "Name": "Bef Caldecott Stn Exit 3",
                  "Distance": 0.04818730206912846
              },
              {
                  "BusStopCode": "52241",
                  "Name": "Bef Caldecott Stn/Savh",
                  "Distance": 0.1179668974076805
              },
              {
                  "BusStopCode": "52559",
                  "Name": "Caldecott Stn Exit 1",
                  "Distance": 0.1383377908007678
              },
              {
                  "BusStopCode": "52551",
                  "Name": "Caldecott Stn Exit 4",
                  "Distance": 0.149788837586982
              },
              {
                  "BusStopCode": "52249",
                  "Name": "Aft Caldecott Stn",
                  "Distance": 0.18617318598535001
              },
              {
                  "BusStopCode": "52211",
                  "Name": "Lighthouse Sch",
                  "Distance": 0.20847690941791633
              }
          ]
      }
  ]
  const full_list = [
      ["Hotel Grand Pacific", "01012"],
      ["St. Joseph's Ch", "01013"],
      ["Bras Basah Cplx", "01019"],
      ["Opp Natl Lib", "01029"],
      ["Bugis Cube", "01039"],
      ["Bugis Stn Exit B", "01059"],
      ["Queen St Ter", "01109"],
      ["Opp Bugis Stn Exit C", "01112"],
      ["Bugis Stn Exit A", "01113"],
      ["Aft Bugis Stn Exit C", "01119"],
      ["Stamford Pr Sch", "01121"],
      ["Opp Stamford Pr Sch", "01129"],
      ["Bugis Stn/Parkview Sq", "01139"],
      ["Opp Blk 461", "01211"],
      ["Blk 461", "01219"],
      ["Bef Sultan Mque", "01229"],
      ["Opp Textile Ctr", "01231"],
      ["Sultan Plaza", "01239"],
      ["Lavender Stn Exit B", "01311"],
      ["Lavender Stn Exit A/ICA", "01319"],
      ["Blk 8", "01329"],
      ["Bef Crawford Bridge", "01339"],
      ["Southbank", "01341"],
      ["Opp Blk 4", "01349"],
      ["Opp St. John HQ", "01411"],
      ["St. John HQ", "01419"],
      ["Opp Golden Mile Cplx", "01421"],
      ["Golden Mile Cplx", "01429"],
      ["Opp The Gateway", "01511"],
      ["The Gateway", "01519"],
      ["Opp Plaza Parkroyal", "01521"],
      ["Plaza Parkroyal", "01529"],
      ["Bugis Stn Exit D", "01541"],
      ["Opp Duo Residences", "01549"],
      ["Village Hotel Bugis", "01559"],
      ["Aft Raffles Hotel", "01611"],
      ["Esplanade Stn Exit F", "01619"],
      ["Opp Shaw Twrs", "01621"],
      ["Shaw Twrs", "01629"],
      ["Aft Beach Rd", "01631"],
      ["Bef Beach Rd", "01639"],
      ["Aft Esplanade Stn Exit D", "02029"],
      ["Raffles Hotel", "02049"],
      ["The Float @ Marina Bay", "02051"],
      ["The Esplanade", "02061"],
      ["Promenade Stn/Pan Pacific", "02089"],
      ["Aft S'pore Flyer", "02101"],
      ["Esplanade Bridge", "02111"],
      ["Opp War Memorial Pk", "02119"],
      ["Suntec Twr Two", "02141"],
      ["Suntec Twr Three", "02149"],
      ["Suntec Convention Ctr", "02151"],
      ["Opp Suntec Convention Ctr", "02159"],
      ["Aft Promenade Stn Exit C", "02161"],
      ["Promenade Stn Exit B", "02169"],
      ["Opp The Ritz-Carlton", "02171"],
      ["Supreme Ct", "02181"],
      ["Fullerton Sq", "03011"],
      ["OUE Bayfront", "03019"],
      ["Prudential Twr", "03021"],
      ["Raffles Pl Stn Exit F", "03031"],
      ["Telok Ayer Stn Exit A", "03041"],
      ["One Raffles Quay", "03059"],
      ["80 Robinson Rd", "03071"],
      ["Aft Capital Twr", "03111"],
      ["UIC Bldg", "03129"],
      ["Opp GB Bldg", "03151"],
      ["Opp AXA Twr", "03217"],
      ["Opp MAS Bldg", "03218"],
      ["Hub Synergy Pt", "03222"],
      ["Tanjong Pagar Stn Exit C", "03223"],
      ["Shenton Way Ter", "03239"],
      ["Mapletree Anson", "03241"],
      ["Bef Marina Gdns Dr", "03331"],
      ["Aft Marina Gdns Dr", "03339"],
      ["Bef Gdns by the Bay", "03341"],
      ["Aft Gdns by the Bay", "03349"],
      ["GARDENS BY THE BAY STN EXIT 2", "03361"],
      ["GARDENS BY THE BAY STN EXIT 1", "03369"],
      ["Gdns by the Bay", "03371"],
      ["The Sail", "03381"],
      ["Marina Bay Financial Ctr", "03391"],
      ["Opp Marina Sth Pier Stn", "03411"],
      ["Marina Sth Pier Stn", "03419"],
      ["Marina Bay Cruise Ctr", "03421"],
      ["Marina Bay Sands Theatre", "03501"],
      ["Bayfront Stn Exit B/MBS", "03509"],
      ["Aft Bayfront Stn Exit E", "03511"],
      ["Bayfront Stn Exit A", "03519"],
      ["Downtown Stn Exit E", "03529"],
      ["Marina Bay Stn", "03539"],
      ["Shenton Way Stn Exit 3", "03549"],
      ["Opp Downtown Stn", "03579"],
      ["OPP BENCOOLEN STN EXIT B", "04019"],
      ["BEF BENCOOLEN STN EXIT A", "04029"],
      ["Capitol Bldg", "04111"],
      ["SMU", "04121"],
      ["Armenian Ch", "04142"],
      ["Stamford Ct", "04143"],
      ["Grand Pk City Hall", "04149"],
      ["Cath Of The Good Shepherd", "04151"],
      ["Aft Chijmes", "04159"],
      ["City Hall Stn Exit B", "04167"],
      ["Aft City Hall Stn Exit B", "04168"],
      ["Aft Bras Basah Stn Exit A", "04179"],
      ["Clarke Quay", "04211"],
      ["Opp Clarke Quay", "04219"],
      ["Clarke Quay Stn Exit E", "04222"],
      ["Old Hill St Police Stn", "04223"],
      ["High St Ctr", "04229"],
      ["Opp Clarke Quay Stn", "04239"],
      ["Opp The Treasury", "04249"],
      ["Opp High St Ctr", "04251"],
      ["Aft River Valley Rd", "04311"],
      ["UE Sq", "04321"],
      ["Opp UE Sq", "04329"],
      ["BEF FORT CANNING STN", "04331"],
      ["FORT CANNING STN EXIT B", "04339"],
      ["Bef Pearl'S Hill Terr", "05012"],
      ["Chinatown Stn Exit C", "05013"],
      ["Aft Duxton Plain Pk", "05019"],
      ["Aft Chinatown Stn Exit D", "05022"],
      ["Opp Hong Lim Pk", "05023"],
      ["Boat Quay", "05029"],
      ["New Bridge Ctr", "05039"],
      ["Chinatown Stn Exit E", "05049"],
      ["Hong Lim Pk", "05059"],
      ["OUTRAM PK STN EXIT 4", "05069"],
      ["Opp One Upp Pickering", "05129"],
      ["Opp Hong Lim Cplx", "05131"],
      ["Opp Sri Mariamman Tp", "05189"],
      ["Opp Hong Lim Cplx", "05199"],
      ["Bef The Pinnacle@Duxton", "05239"],
      ["Opp Blk 333", "05241"],
      ["OPP MAXWELL STN EXIT 3", "05259"],
      ["MAXWELL STN EXIT 2", "05269"],
      ["Opp Fairfield Meth Ch", "05271"],
      ["OCBC Ctr", "05319"],
      ["Tg Pagar Plaza", "05411"],
      ["The Amara", "05419"],
      ["Aft Craig Rd", "05421"],
      ["Bef Craig Rd", "05429"],
      ["Aft Tanjong Pagar Rd", "05431"],
      ["Blk 1G", "05519"],
      ["Maritime Hse", "05521"],
      ["Opp Southpoint", "05629"],
      ["Blk 16", "05631"],
      ["Bef Cantonment Rd", "05641"],
      ["Opp Customs Port Br HQ", "05649"],
      ["Opp Fuji Xerox Twrs", "05651"],
      ["OUTRAM PK STN EXIT 7", "06011"],
      ["OUTRAM PK STN EXIT 1", "06029"],
      ["The Landmark Condo", "06031"],
      ["Blk 8", "06039"],
      ["BEF OUTRAM FLYOVER", "06049"],
      ["Blk 55", "06051"],
      ["Aft Furama RiverFront", "06069"],
      ["HAVELOCK STN EXIT 2", "06071"],
      ["HAVELOCK STN EXIT 3", "06081"],
      ["Grand Copthorne Hotel", "06129"],
      ["Aft Blk 87", "06131"],
      ["HAVELOCK STN EXIT 5", "06141"],
      ["HAVELOCK STN EXIT 4", "06149"],
      ["Hotel Miramar", "06151"],
      ["Opp Hotel Miramar", "06159"],
      ["Blk 2", "06161"],
      ["River Pl Condo", "06169"],
      ["Opp State Ct", "06171"],
      ["Ctrl Sq", "06189"],
      ["Peace Ctr", "07011"],
      ["Selegie Ctr", "07021"],
      ["Tekka Ctr", "07031"],
      ["Broadway Hotel", "07111"],
      ["Aft Farrer Pk Stn Exit G", "07211"],
      ["Sri Vadapathira K Tp", "07221"],
      ["Bef Tai Hoe Hotel", "07231"],
      ["Bef S'Goon Rd", "07241"],
      ["Aft Kempas Rd", "07249"],
      ["Aft Allenby Rd", "07319"],
      ["Hoa Nam Bldg", "07329"],
      ["Aft King George's Ave", "07331"],
      ["ARC 380", "07351"],
      ["OPP ARC 380", "07359"],
      ["Bef Kallang Bahru", "07361"],
      ["Aft Kallang Bahru", "07369"],
      ["Aft Kallang Rd", "07371"],
      ["Aperia/Bef Kallang Rd", "07379"],
      ["Opp Veerasamy Rd", "07419"],
      ["IBIS S'PORE ON BENCOOLEN", "07517"],
      ["OPP NAFA CAMPUS 3", "07518"],
      ["JLN BESAR STN EXIT A", "07529"],
      ["Rochor Stn", "07531"],
      ["Bef Rochor Stn Exit B", "07539"],
      ["Fu Lu Shou Cplx", "07551"],
      ["Bef Waterloo St", "07561"],
      ["Aft Waterloo St", "07569"],
      ["SUNSHINE PLAZA", "07571"],
      ["Ch of Our Lady of Lourdes", "07589"],
      ["Opp Haw Par Glass Twr", "08011"],
      ["Aft Haw Par Glass Twr", "08019"],
      ["Dhoby Ghaut Stn Exit B", "08031"],
      ["YMCA", "08041"],
      ["Dhoby Ghaut Stn", "08057"],
      ["Aft Dhoby Ghaut Stn", "08058"],
      ["Bencoolen Stn Exit B", "08069"],
      ["Sch of the Arts", "08079"],
      ["Winsland Hse", "08111"],
      ["Somerset Stn", "08121"],
      ["Orchard Plaza", "08137"],
      ["Concorde Hotel S'pore", "08138"],
      ["Opp Ngee Ann City", "09011"],
      ["ORCHARD STN EXIT 13", "09022"],
      ["Opp Orchard Stn/ION", "09023"],
      ["Bef Cairnhill Rd", "09037"],
      ["Opp Somerset Stn", "09038"],
      ["Orchard Stn/Tang Plaza", "09047"],
      ["Orchard Stn/Lucky Plaza", "09048"],
      ["Somerset Youth Pk", "09059"],
      ["Opp Four Seasons Hotel", "09111"],
      ["Bef Tomlinson Rd", "09121"],
      ["OPP ORCHARD BLVD STN", "09131"],
      ["ORCHARD BLVD STN EXIT 1", "09139"],
      ["British Council", "09141"],
      ["Opp British Council", "09149"],
      ["Aft Tomlinson Rd", "09159"],
      ["Delfi Orchard", "09169"],
      ["Royal Thai Embassy", "09179"],
      ["Aft Cuscaden Rd", "09191"],
      ["Royal Plaza On Scotts", "09212"],
      ["15 Scotts", "09213"],
      ["Far East Plaza", "09219"],
      ["Bt Merah Int", "10009"],
      ["BEF NEIL RD", "10011"],
      ["Aft Hosp Dr", "10017"],
      ["OUTRAM PK STN EXIT 6/SGH", "10018"],
      ["Blk 3", "10021"],
      ["BEF KAMPONG BAHRU TER", "10041"],
      ["OPP KAMPONG BAHRU TER", "10049"],
      ["Blk 149", "10051"],
      ["Opp Blk 149", "10059"],
      ["Blk 140", "10061"],
      ["Opp Blk 140", "10069"],
      ["Blk 111", "10071"],
      ["Blk 201", "10079"],
      ["Opp Blk 120", "10081"],
      ["Blk 119", "10089"],
      ["Bt Merah Town Ctr", "10091"],
      ["Opp Bt Merah Town Ctr", "10099"],
      ["OPP BT MERAH SEC SCH", "10101"],
      ["BT MERAH SEC SCH", "10109"],
      ["Opp Blk 28", "10111"],
      ["Opp Pacific Tech Ctr", "10119"],
      ["Blk 126 CP", "10121"],
      ["Blk 121", "10129"],
      ["Opp Blk 2", "10131"],
      ["Blk 1", "10139"],
      ["Blk 18", "10141"],
      ["Blk 1", "10149"],
      ["Ctrl Green Condo", "10151"],
      ["Opp Tiong Bahru Stn/Plaza", "10161"],
      ["Tiong Bahru Stn/Plaza", "10169"],
      ["Opp Tiong Bahru Pk", "10171"],
      ["Tiong Bahru Pk", "10179"],
      ["BEF AR-RABITAH MQUE", "10181"],
      ["Blk 104A CP", "10189"],
      ["Blk 78", "10191"],
      ["Delta Swim Cplx", "10199"],
      ["Opp Redhill Stn", "10201"],
      ["Redhill Stn", "10209"],
      ["BMW Eurokars Auto", "10211"],
      ["Skoda S'pore/Volkswagen Grp", "10219"],
      ["Ganges Ctr", "10221"],
      ["Opp Harvest Mansions", "10229"],
      ["Blk 51 CP", "10231"],
      ["Blk 79", "10239"],
      ["Gan Eng Seng Sec Sch", "10241"],
      ["Opp Gan Eng Seng Sec Sch", "10249"],
      ["Delta Sports Hall", "10261"],
      ["Opp Delta Sports Hall", "10269"],
      ["Opp Tanglin View", "10271"],
      ["Tanglin View", "10279"],
      ["SIS Bldg", "10281"],
      ["Opposite Cycle & Carriage", "10287"],
      ["Opp SIS Bldg", "10289"],
      ["Opp Dawson Pl", "10291"],
      ["Aft Dawson Pl", "10299"],
      ["Opp Grace Ably of God Ch", "10321"],
      ["Crescent Girls' Sch", "10329"],
      ["Bef Bt Merah Ctrl", "10331"],
      ["Aft Bt Merah Ctrl", "10339"],
      ["Opp Blk 116", "10341"],
      ["Blk 116", "10349"],
      ["Blk 95B", "10351"],
      ["Opp Blk 95C", "10359"],
      ["Cendex Ctr", "10361"],
      ["Opp Cendex Ctr", "10369"],
      ["Blk 129", "10371"],
      ["Blk 25B", "10379"],
      ["Opp Blk 48", "10381"],
      ["Blk 48", "10389"],
      ["Opp Melati Blk 2", "10391"],
      ["Melati Blk 2", "10399"],
      ["Shriro Hse", "10401"],
      ["Blk 50", "10409"],
      ["Opp Blk 53", "10411"],
      ["Blk 52", "10419"],
      ["Blk 63B", "10421"],
      ["Blk 54", "10429"],
      ["ENABLING VILLAGE", "10431"],
      ["OPP ENABLING VILLAGE", "10439"],
      ["Opp Blk 44", "10441"],
      ["Blk 44", "10449"],
      ["Opp Blk 71", "10451"],
      ["Blk 72", "10459"],
      ["Opp Blk 95", "10461"],
      ["Bef Margaret Dr", "10469"],
      ["Bef Tanglin Rd", "10471"],
      ["Aft Tanglin Rd", "10479"],
      ["Opp Blk 73", "10481"],
      ["Blk 73", "10489"],
      ["KAMPONG BAHRU TER", "10499"],
      ["Blk 104", "10501"],
      ["Blk 4", "10519"],
      ["Opp Blk 36", "10599"],
      ["Blk 161", "10651"],
      ["Blk 1003", "10659"],
      ["Opposite Ghim Moh Terminal", "11001"],
      ["Ghim Moh Ter", "11009"],
      ["Bef Blk 2", "11019"],
      ["Aft Queenstown NPC HQ", "11021"],
      ["Blk 166/Aft Mei Chin Rd", "11029"],
      ["Opp Queen's Cl", "11031"],
      ["Blk 19", "11039"],
      ["Aft C'wealth Dr", "11041"],
      ["Opp Blessed Sacrament Ch", "11049"],
      ["Opp Queenstown Polyclinic", "11051"],
      ["Queenstown Polyclinic", "11059"],
      ["Opp Queensway Sec Sch", "11061"],
      ["Queensway Sec Sch", "11069"],
      ["Blk 97", "11071"],
      ["Opp Blk 95", "11079"],
      ["Viz Holland", "11081"],
      ["Opp Holland Hill Lodge", "11089"],
      ["Leedon Green", "11091"],
      ["Opp Leedon Green", "11099"],
      ["Empress Rd Mkt/FC", "11101"],
      ["Spanish Village", "11109"],
      ["Farrer Rd Stn Exit B", "11111"],
      ["Farrer Rd Stn Exit A", "11119"],
      ["Queens Condo", "11131"],
      ["Blk 53A CP", "11139"],
      ["Queenstown Stn Exit A/D", "11141"],
      ["Queenstown Stn Exit B/C", "11149"],
      ["Blk 42", "11151"],
      ["Aft Ch Of Our Saviour", "11159"],
      ["C'Wealth Stn Exit A/D", "11161"],
      ["C'Wealth Stn Exit B/C", "11169"],
      ["Opp Blk 7B", "11171"],
      ["Blk 8", "11179"],
      ["Opp Blk 43", "11181"],
      ["Blk 43", "11189"],
      ["The Star Vista", "11191"],
      ["Blk 15", "11199"],
      ["CSC Dempsey Clubhse", "11201"],
      ["Opp Peirce Rd", "11209"],
      ["Aft Peirce Rd", "11211"],
      ["Great Eastern Mansions", "11219"],
      ["Lien Twrs", "11221"],
      ["Sommerville Pk", "11229"],
      ["Aft Hyll on Holland", "11231"],
      ["Fairlodge", "11239"],
      ["Opp Blk 21", "11259"],
      ["Holland Village", "11261"],
      ["Opp Holland Village", "11269"],
      ["Aft East Sussex Lane", "11271"],
      ["Aft Coronation Rd West", "11279"],
      ["Aft Tan Boon Chong Ave", "11281"],
      ["Opp Tan Boon Chong Ave", "11289"],
      ["Cold Storage Jelita", "11291"],
      ["Opp Cold Storage Jelita", "11299"],
      ["Hse No. 578", "11301"],
      ["Hse No. 589", "11309"],
      ["Hse No. 532", "11311"],
      ["Opp Hse No. 516", "11319"],
      ["Opp Regent Villa", "11321"],
      ["Regent Villa", "11329"],
      ["Opp Dynasty Gdn II", "11331"],
      ["Dynasty Lodge", "11339"],
      ["Garlick Ville", "11341"],
      ["Opp Garlick Ville", "11349"],
      ["Blk 13", "11351"],
      ["Opp Blk 13", "11359"],
      ["Buona Vista Stn Exit C", "11361"],
      ["Buona Vista Stn Exit D", "11369"],
      ["Buona Vista Ter", "11379"],
      ["Blk 10A", "11381"],
      ["Buona Vista CC", "11389"],
      ["Holland V Stn/Blk12", "11401"],
      ["Blk 9", "11409"],
      ["Holland V Stn Exit A", "11419"],
      ["Opp Blk 115B", "11429"],
      ["Blk 92", "11439"],
      ["Blk 58", "11441"],
      ["Blk 37B", "11449"],
      ["Blk 72", "11451"],
      ["Blk 50", "11459"],
      ["Queensway Sec Sch", "11469"],
      ["Opp The Fisherman Ch", "11471"],
      ["Queenstown Lib", "11481"],
      ["Blk 30", "11489"],
      ["Opp Queenstown Pr Sch", "11491"],
      ["Queenstown Pr Sch", "11499"],
      ["Alexandra Hosp", "11511"],
      ["Opp Queensway Shop Ctr", "11519"],
      ["Anchorpoint", "11521"],
      ["Bef IKEA Ind Bldg", "11529"],
      ["Opp Lea Hin Hardware Fty", "11531"],
      ["Lea Hin Hardware Fty", "11539"],
      ["Opp Queens", "11541"],
      ["Tiong Ghee Tp", "11551"],
      ["Blk 166", "11561"],
      ["Blk 158", "11579"],
      ["Blk 157", "11589"],
      ["Blk 153", "11599"],
      ["Blk 163", "11609"],
      ["Bef Moonbeam Wk", "12021"],
      ["Opp Moonbeam Wk", "12029"],
      ["Pandan Valley Condo", "12031"],
      ["Opp Pandan Valley Condo", "12039"],
      ["Aft Pandan Valley", "12041"],
      ["Opp Pandan Valley", "12049"],
      ["Pine Gr Condo", "12051"],
      ["Opp Pine Gr Condo", "12059"],
      ["Blk 109", "12061"],
      ["Opp Blk 109A", "12069"],
      ["Blk 116", "12071"],
      ["Opp Blk 116", "12079"],
      ["Clementi N'hood Pk", "12081"],
      ["Opp Maju Camp", "12089"],
      ["SIM Campus", "12091"],
      ["Opp SIM Campus", "12099"],
      ["Ngee Ann Poly", "12101"],
      ["Opp Ngee Ann Poly", "12109"],
      ["Bef Clementi Rd", "12111"],
      ["Police KINS Trg Camp", "12119"],
      ["Blk 7", "12121"],
      ["Blk 3", "12129"],
      ["Aft Grove Ave", "12131"],
      ["Aft Mt Sinai Lane", "12139"],
      ["Opp Henry Pk", "12141"],
      ["Henry Pk", "12149"],
      ["Bef Moonbeam Terr", "12151"],
      ["Pandan Valley", "12169"],
      ["Montview", "12179"],
      ["Bef Mt Sinai Dr", "12189"],
      ["Opp Village Twr", "12199"],
      ["Logishub @ Clementi", "12201"],
      ["Opp Logishub @ Clementi", "12209"],
      ["Bef Mt Sinai Wk", "12211"],
      ["NAPIER STN EXIT 2", "13011"],
      ["NAPIER STN EXIT 1", "13019"],
      ["Aft Min Of Foreign Affairs", "13021"],
      ["Bef Tyersall Ave", "13029"],
      ["Opp Chatsworth Rd", "13031"],
      ["Bef Chatsworth Rd", "13039"],
      ["Aft Camp Rd", "13041"],
      ["Bef Rochalie Dr", "13049"],
      ["Opp Valley Pt", "13051"],
      ["Valley Pt", "13059"],
      ["STELLAR RV", "13062"],
      ["RV SUITES", "13063"],
      ["RV RESIDENCES", "13069"],
      ["Great World Stn Exit 5", "13071"],
      ["GREAT WORLD STN EXIT 4", "13079"],
      ["St. Thomas Wk", "13081"],
      ["Opp St. Thomas Wk", "13089"],
      ["AFT KIM YAM RD", "13091"],
      ["BEF KIM YAM RD", "13099"],
      ["Opp Mohd Sultan Rd", "13101"],
      ["UE Sq/Bef Mohd Sultan Rd", "13109"],
      ["Great World Stn Exit 3", "13119"],
      ["Opp Great World City", "13121"],
      ["Aft Zion Full Gospel Ch", "13141"],
      ["Bef Zion Full Gospel Ch", "13159"],
      ["Grange 80 Condo", "13169"],
      ["Gramercy Pk", "13171"],
      ["Cliveden At Grange", "13179"],
      ["Aft One Tree Hill", "13181"],
      ["Bef One Tree Hill", "13189"],
      ["OPP ORCHARD STN EXIT 12", "13191"],
      ["AFT ORCHARD STN EXIT 12", "13199"],
      ["British High Commission", "13201"],
      ["Opp British High Comsn", "13209"],
      ["HarbourFront Int", "14009"],
      ["Bef Mt Faber Lodge", "14011"],
      ["Opp Mt Faber Lodge", "14019"],
      ["The Pearl @ Mt Faber", "14021"],
      ["Blk 105", "14029"],
      ["St. Theresa's Convent", "14031"],
      ["Opp St. Theresa's Convent", "14039"],
      ["Blk 54", "14041"],
      ["Opp Blk 55", "14049"],
      ["Aft Telok Blangah Hts", "14051"],
      ["Bef Telok Blangah Hts", "14059"],
      ["Opp Former Railway Stn", "14061"],
      ["Former Railway Stn", "14069"],
      ["Keppel Workshop", "14071"],
      ["Tg Pagar DP Blk F5", "14081"],
      ["Opp Tg Pagar DP Blk F5", "14089"],
      ["Opp Keppel DP Blk 517", "14101"],
      ["Keppel DP Blk 517", "14109"],
      ["Opp VivoCity", "14119"],
      ["Opp HarbourFront Int", "14121"],
      ["Harbourfront Stn Exit A", "14129"],
      ["Caribbean at Keppel Bay", "14131"],
      ["Bef Seah Im Rd", "14139"],
      ["HarbourFront Stn/Vivocity", "14141"],
      ["Opp Chr Community Chapel", "14151"],
      ["Bef Chr Community Chapel", "14159"],
      ["Telok Blangah Stn", "14161"],
      ["Opp Telok Blangah Stn", "14169"],
      ["Opp Yeo's Bldg", "14171"],
      ["Yeo's Bldg", "14179"],
      ["Aft Alexandra Rd", "14189"],
      ["Blk 105 CP", "14191"],
      ["Blk 118", "14199"],
      ["Blk 110", "14201"],
      ["Aft Hewlett Packard", "14209"],
      ["ISS Intl Sch", "14211"],
      ["Opp Blk 114", "14219"],
      ["Opp Ch of St. Teresa", "14221"],
      ["Ch of St. Teresa", "14229"],
      ["Keppel DP Blk 519", "14231"],
      ["Opp Keppel DP Blk 519", "14239"],
      ["Opp Blk 1", "14241"],
      ["Blk 1", "14249"],
      ["Blk 11", "14259"],
      ["Blk 10", "14269"],
      ["Al-Amin Mque", "14271"],
      ["Blk 25", "14279"],
      ["Safra Mt Faber", "14281"],
      ["Blk 27", "14291"],
      ["Opp Blk 27", "14299"],
      ["Blk 41", "14309"],
      ["Blk 28", "14319"],
      ["Blk 67", "14329"],
      ["Opp Blk 70B", "14331"],
      ["Blk 70A", "14339"],
      ["Opp Blk 59", "14341"],
      ["Blk 59", "14349"],
      ["Aft Blk 48", "14351"],
      ["Blk 50", "14359"],
      ["The Interlace", "14369"],
      ["Blk 40", "14379"],
      ["Blk 109", "14381"],
      ["Aft Radin Mas Pr Sch", "14389"],
      ["Opp Blk 85", "14391"],
      ["Blk 85", "14399"],
      ["Blk 114", "14471"],
      ["Blk 36 Mkt/FC", "14489"],
      ["Opp Telok Blangah Mkt/FC", "14491"],
      ["Telok Blangah Mkt/FC", "14499"],
      ["OPP BLK 91A", "14501"],
      ["BLK 92B", "14509"],
      ["Resorts World Sentosa", "14519"],
      ["Village Hotel", "14521"],
      ["Opp Village Hotel", "14529"],
      ["Beach Station Bus Terminal", "14539"],
      ["Alexandra Retail Ctr", "15041"],
      ["Opp Alexandra Retail Ctr", "15049"],
      ["Alexandra Pt", "15051"],
      ["Opp Alexandra Pt", "15059"],
      ["Opp Lor Sarhad", "15071"],
      ["Aft Lor Sarhad", "15079"],
      ["Opp Natl Leadership Inst", "15091"],
      ["Natl Leadership Inst", "15099"],
      ["Opp LP 31", "15101"],
      ["LP 30", "15109"],
      ["Sci Pk 2/The Galen", "15111"],
      ["Opp Sci Pk 2/The Galen", "15119"],
      ["Sci Pk 2/The Gemini", "15121"],
      ["Opp Sci Pk 2/The Gemini", "15129"],
      ["Kent Ridge Stn", "15131"],
      ["Kent Ridge Stn Exit B", "15139"],
      ["Labrador Pk Stn", "15141"],
      ["Opp Labrador Pk Stn", "15149"],
      ["Opp Mapletree Biz City", "15151"],
      ["Mapletree Business City", "15159"],
      ["Opp HarbourSide Bldg 2", "15161"],
      ["HarbourSide Bldg 2", "15169"],
      ["Opp Ascent", "15181"],
      ["Ascent", "15189"],
      ["Pasir Panjang Stn/Fc", "15191"],
      ["Opp Currency Hse", "15199"],
      ["Aft Pasir Panjang Stn", "15201"],
      ["Bef Pasir Panjang Stn", "15209"],
      ["Opp Pasir View Pk", "15211"],
      ["Pasir View Pk", "15219"],
      ["Aft Sth Buona Vista Rd", "15221"],
      ["Bef Sth Buona Vista Rd", "15229"],
      ["Kent Ridge Ter", "16009"],
      ["Opp Haw Par Villa Stn", "16011"],
      ["Haw Par Villa Stn", "16019"],
      ["Opp Gloria Mansion", "16021"],
      ["Gloria Mansion", "16029"],
      ["Opp S'pore Science Pk II", "16031"],
      ["S'pore Science Pk II", "16039"],
      ["OPP LUXE VILLE", "16041"],
      ["WHITEHAVEN", "16049"],
      ["The Crystal Tabernacle Ch", "16051"],
      ["Jamiyah Halfway Hse", "16059"],
      ["Opp Heng Mui Keng Terr", "16061"],
      ["Heng Mui Keng Terr", "16069"],
      ["Opp Pasir Panjang PO", "16071"],
      ["Bef Pasir Panjang PO", "16079"],
      ["Aft Palm Green Condo", "16081"],
      ["Aft Clementi Rd", "16089"],
      ["Opp SIT Dover", "16091"],
      ["SIT Dover", "16099"],
      ["Inst Of Micro-Electronics", "16101"],
      ["The Alpha", "16109"],
      ["Aries", "16111"],
      ["Teletech Pk", "16119"],
      ["Galen", "16121"],
      ["Opp Kent Ridge Ter", "16131"],
      ["Bef Kent Ridge Ter", "16139"],
      ["Tentera Diraja Mque", "16141"],
      ["SDE3", "16149"],
      ["The Japanese Pr Sch", "16151"],
      ["Coll of Design & Engrg", "16159"],
      ["Nus Museums", "16161"],
      ["NUS Raffles Hall", "16169"],
      ["Yusof Ishak Hse", "16171"],
      ["Opp Yusof Ishak Hse", "16179"],
      ["Ctrl Lib", "16181"],
      ["Information Technology", "16189"],
      ["Aft Kent Ridge Dr", "16191"],
      ["Aft Architecture Dr", "16199"],
      ["Barossa Gdns", "16201"],
      ["HORIZON RESIDENCES", "16209"],
      ["Wharves Bldg", "16211"],
      ["Opp Wharves Bldg", "16219"],
      ["Opp Haw Par Villa Stn", "16221"],
      ["Haw Par Villa Stn", "16229"],
      ["Wholesale Ctr", "16231"],
      ["Opp Wholesale Ctr", "16239"],
      ["Bef West Coast Pk", "16241"],
      ["Bef Wholesale Ctr", "16249"],
      ["Opp Blk 420A", "16891"],
      ["Opp Nan Hua High Sch", "16991"],
      ["Clementi Int", "17009"],
      ["Opp Varsity Pk", "17011"],
      ["Varsity Pk", "17019"],
      ["Waseda S Snr High Sch", "17021"],
      ["Opp Waseda S Snr High Sch", "17029"],
      ["Kent Ridge Sec Sch", "17031"],
      ["Opp Kent Ridge Sec Sch", "17039"],
      ["Blk 726 Clementi West Mkt", "17041"],
      ["Blk 601", "17049"],
      ["Opp Regent Pk", "17051"],
      ["Regent Pk", "17059"],
      ["Blk 701", "17061"],
      ["Opp Blk 701", "17069"],
      ["Blk 513", "17071"],
      ["Blk 512", "17079"],
      ["Aft West Coast Highway", "17081"],
      ["Before West Coast Crescent", "17089"],
      ["Aft Clementi Ave 1", "17091"],
      ["YALE-NUS COLLEGE", "17099"],
      ["Blk 352", "17101"],
      ["Opp Blk 352", "17109"],
      ["Blk 343", "17111"],
      ["Opp Blk 343", "17119"],
      ["Blk 610", "17121"],
      ["Aft NUS High Sch", "17129"],
      ["Clementi Flyover", "17131"],
      ["Aft Clementi Ave 2", "17139"],
      ["Clementi Stadium", "17141"],
      ["Blk 426", "17149"],
      ["Blk 410", "17151"],
      ["Blk 365", "17159"],
      ["Blk 455", "17161"],
      ["Blk 329", "17169"],
      ["Clementi Stn Exit A", "17171"],
      ["Clementi Stn Exit B", "17179"],
      ["Opp Blk 317", "17181"],
      ["Blk 317", "17189"],
      ["NUS High Sch", "17191"],
      ["Blk 308", "17201"],
      ["Bet Blks 315/318", "17211"],
      ["Blk 376", "17219"],
      ["Blk 377", "17221"],
      ["Blk 335", "17229"],
      ["NTUC Fairprice", "17239"],
      ["Blk 334", "17241"],
      ["Blk 355", "17249"],
      ["Blk 460", "17251"],
      ["Opp Blk 460", "17259"],
      ["Blk 730", "17269"],
      ["Blk 723", "17279"],
      ["West Coast CC", "17289"],
      ["West Coast Pk", "17291"],
      ["Opp West Coast Pk", "17299"],
      ["Opp West Coast View", "17301"],
      ["West Coast View", "17309"],
      ["Opp Blk 801C", "17311"],
      ["Blk 716", "17319"],
      ["Tien Wah Press Bldg", "17321"],
      ["Blk 705", "17329"],
      ["Opp Blk 518", "17331"],
      ["Blk 518", "17339"],
      ["Aft Clementi Rd", "17351"],
      ["Bef Clementi Rd", "17359"],
      ["Opp West Coast Lk", "17361"],
      ["Aft West Coast Lk", "17369"],
      ["Blk 201", "17371"],
      ["Blk 304", "17379"],
      ["West Bay Resort Condo", "17381"],
      ["Opp West Bay Resort Condo", "17389"],
      ["Aft Hortpark", "18011"],
      ["Bef Telok Blangah Hill Pk", "18019"],
      ["Opp Tempco Mfg", "18021"],
      ["Tempco Mfg", "18029"],
      ["Normanton Pk", "18041"],
      ["Opp Science Pk", "18049"],
      ["One-North Stn", "18051"],
      ["Opp One-North Stn", "18059"],
      ["Blk 71", "18061"],
      ["Opp Blk 71", "18069"],
      ["NUH", "18071"],
      ["Opp NUH", "18079"],
      ["Blk 55", "18081"],
      ["S'pore Post", "18089"],
      ["Bef Ayer Rajah Cres", "18099"],
      ["5 Sci Pk Dr", "18101"],
      ["Opp PSB Science Pk Bldg", "18109"],
      ["Fairfield Meth Pr Sch", "18111"],
      ["Opp Fairfield Meth Pr Sch", "18119"],
      ["Opp Ayer Rajah Ind Est", "18121"],
      ["Ayer Rajah Ind Est", "18129"],
      ["Science Pk", "18131"],
      ["Aft Anglo-Chinese JC", "18141"],
      ["Essec Business Sch", "18149"],
      ["Opp One-North Stn/Galaxis", "18151"],
      ["One-North Stn/Galaxis", "18159"],
      ["Bef Weyhill Cl", "18171"],
      ["Opp Weyhill Cl", "18179"],
      ["Opp Tanglin Trust Sch", "18181"],
      ["Tanglin Trust Sch", "18189"],
      ["Bef Whitchurch Rd", "18191"],
      ["Aft Whitchurch Rd", "18199"],
      ["Mediacorp Campus", "18201"],
      ["Infinite Studios", "18211"],
      ["NUH", "18221"],
      ["Opp NUH", "18239"],
      ["Opp Dnv Technology Ctr", "18241"],
      ["DNV Technology Ctr", "18249"],
      ["Opp Reuters", "18251"],
      ["Opp DSO Natl Laboratories", "18261"],
      ["Bef Reuters", "18269"],
      ["Blk 85", "18271"],
      ["Opp Blk 85", "18279"],
      ["Opp Normanton Pk/R'ford", "18281"],
      ["Opp R'ford/Normanton Pk", "18289"],
      ["Lim Seng Tjoe Bldg (LT 27)", "18301"],
      ["Blk S17", "18309"],
      ["Blk S12", "18311"],
      ["Opp University Hall", "18319"],
      ["Opp University Health Ctr", "18321"],
      ["University Health Ctr", "18329"],
      ["Kent Ridge Stn Exit A/NUH", "18331"],
      ["Opp Kent Ridge Stn Exit A", "18339"],
      ["Blk 19A CP", "19011"],
      ["Blk 27", "19019"],
      ["SP SMA", "19021"],
      ["Opp SP SMA", "19029"],
      ["Dover Stn Exit A", "19031"],
      ["Dover Stn Exit B", "19039"],
      ["Opp Sch of Science & Tech", "19041"],
      ["Sch of Science & Tech", "19049"],
      ["New Town Sec Sch", "19051"],
      ["University Town", "19059"],
      ["Ayer Rajah Telecoms", "19061"],
      ["Opp Ayer Rajah Telecoms", "19069"],
      ["Opp Acs Independent", "19071"],
      ["Dover Ct Intl Sch", "19079"],
      ["Opp ACS Boarding Sch", "19081"],
      ["Acs Independent", "19089"],
      ["S'pore Poly", "19091"],
      ["Opp S'pore Poly", "19099"],
      ["Blk 506", "20011"],
      ["Blk 431", "20019"],
      ["NEWEST", "20021"],
      ["OPP NEWEST", "20029"],
      ["The Infiniti", "20031"],
      ["Opp The Infiniti", "20039"],
      ["Cycle & Carriage", "20051"],
      ["Opp Cycle & Carriage", "20059"],
      ["Aft Jurong Town Hall Rd", "20061"],
      ["Bef Jurong Town Hall Rd", "20069"],
      ["Carrier S'pore", "20081"],
      ["Opp Carrier S'pore", "20089"],
      ["Nan Hua Pr Sch", "20101"],
      ["Aft Clementi Fire Stn", "20109"],
      ["Opp Blk 51", "20121"],
      ["Bet Blks 50/51", "20129"],
      ["S'pore Food Industries Bldg", "20131"],
      ["Opp Angliss Bldg", "20139"],
      ["Opp Blk 408", "20141"],
      ["Blk 408", "20149"],
      ["Opp Blk 411", "20151"],
      ["Blk 411", "20159"],
      ["Opp Blks 34/35", "20161"],
      ["Blk 35", "20169"],
      ["Opp Blk 47", "20171"],
      ["Blk 31", "20179"],
      ["Ayer Rajah CC", "20181"],
      ["Opp Ayer Rajah CC", "20189"],
      ["Blk 407", "20191"],
      ["Blk 410", "20199"],
      ["Bef Blk 39", "20201"],
      ["Bef Jurong Town Hall Rd", "20209"],
      ["Blk 41", "20211"],
      ["Opp Blk 41", "20219"],
      ["Bef Hasanah Mque", "20231"],
      ["Aft Hasanah Mque", "20239"],
      ["Opp Blk 54", "20241"],
      ["Blk 54", "20249"],
      ["Bef Teban Gdns Rd", "20251"],
      ["C'wealth Sec Sch", "20259"],
      ["Aft Pandan Gdns", "20261"],
      ["Bef Pandan Gdns", "20269"],
      ["Opp German Ctr", "20271"],
      ["Opp The Japanese Sec Sch", "20281"],
      ["The Japanese Sec Sch", "20289"],
      ["Opp Blk 501", "20291"],
      ["Blk 501", "20299"],
      ["Blk L Pandan Light Ind Pk", "20309"],
      ["Blk T Pandan Light Ind Pk", "20319"],
      ["S'pore Food Ind", "20329"],
      ["Vejoil Pte Ltd", "20331"],
      ["Pan Tech Ind Cplx", "20341"],
      ["Aft Jurong Lake", "21011"],
      ["Aft Yuan Ching Rd", "21019"],
      ["Bef Jurong Port Rd", "21021"],
      ["AFT CORP PL", "21029"],
      ["Aft Jln Terusan", "21041"],
      ["Bef Jln Terusan", "21049"],
      ["Bef Penjuru Rd", "21051"],
      ["Aft Penjuru Rd", "21059"],
      ["Bef Jln Tepong", "21069"],
      ["Jurong Abattoir", "21071"],
      ["Opp Jurong Abattoir", "21079"],
      ["Bef Jln Buroh", "21089"],
      ["Jurong Island Checkpt", "21099"],
      ["Ctrl Fish Proc Fty", "21109"],
      ["Aft Jurong Pier Rd", "21111"],
      ["Bef Jurong Pier Rd", "21119"],
      ["SPC Svc Stn", "21121"],
      ["Opp SPC Svc Stn", "21129"],
      ["Bef Jurong Port Rd", "21131"],
      ["Aft Jurong Port Rd", "21139"],
      ["Aft Jln Buroh", "21141"],
      ["Jurong Port Workshops", "21149"],
      ["CWT Distripark", "21151"],
      ["Sin Soon Huat", "21159"],
      ["Blk 216B", "21161"],
      ["Opp Blk 216B", "21169"],
      ["OPP CORP PL", "21171"],
      ["CORP PL", "21179"],
      ["Opp Blk 161", "21181"],
      ["Blk 161", "21189"],
      ["Opp Blk 178", "21191"],
      ["Blk 178", "21199"],
      ["Opp Taman Jurong Greens", "21201"],
      ["Taman Jurong Greens", "21209"],
      ["Opp Lakepoint Condo", "21211"],
      ["Lakepoint Condo", "21219"],
      ["Opp S'Pore A'Space Mfg", "21229"],
      ["Blk 203", "21231"],
      ["Opp Blk 203", "21239"],
      ["216 CP", "21241"],
      ["Blk 213", "21249"],
      ["Bef Quality Rd", "21251"],
      ["Aft Quality Rd", "21259"],
      ["AFT CHIN BEE AVE", "21261"],
      ["Bef Chin Bee Ave", "21269"],
      ["Opp Assyakirin Mque", "21271"],
      ["Assyakirin Mque", "21279"],
      ["Aft Jln Buroh", "21291"],
      ["Bef Jln Buroh", "21299"],
      ["Opp Jln Pesawat", "21301"],
      ["Aft Jln Pesawat", "21309"],
      ["Bef Tractor Rd", "21311"],
      ["Opp Tractor Rd", "21319"],
      ["UTOC ENGRG", "21321"],
      ["OPP UTOC ENGRG", "21329"],
      ["Opp Premier Milk Pte Ltd", "21331"],
      ["Premier Milk Pte Ltd", "21339"],
      ["Opp GSK", "21341"],
      ["GSK", "21349"],
      ["BEF BOON LAY WAY", "21351"],
      ["AFT ST KINETICS", "21359"],
      ["Blk 695", "21361"],
      ["Opp Blk 695", "21369"],
      ["Blk 680C", "21371"],
      ["Blk 263", "21379"],
      ["ST. JOSEPH'S HME", "21381"],
      ["OPP ST. JOSEPH'S HME", "21389"],
      ["River Valley High Sch", "21391"],
      ["Opp River Valley High Sch", "21399"],
      ["Blk 191", "21409"],
      ["Opp Blk 188", "21411"],
      ["Blk 188", "21419"],
      ["Blk 176", "21421"],
      ["Blk 185", "21429"],
      ["Blk 210", "21431"],
      ["Boon Lay CC", "21439"],
      ["Blk 207", "21441"],
      ["Boon Lay Shop Ctr", "21449"],
      ["Blk 206", "21451"],
      ["Blk 209", "21459"],
      ["BEF TUKANG INNOVATION DR", "21461"],
      ["Bef Chia Ping Rd", "21469"],
      ["Bef Tukang Innovation Lane", "21471"],
      ["Aft Tukang Innovation Lane", "21479"],
      ["Grundfos", "21481"],
      ["Opp Grundfos", "21489"],
      ["Bef Intl Rd", "21491"],
      ["Bef Jln Tukang", "21499"],
      ["Bef Meiji Seika", "21501"],
      ["Opp Meiji Seika", "21509"],
      ["Opp Amoy Canning", "21511"],
      ["Amoy Canning", "21519"],
      ["PB Packaging Systems", "21521"],
      ["Aft Third Chin Bee Rd", "21529"],
      ["Clariant S'pore", "21531"],
      ["Opp Kaily Packaging", "21539"],
      ["Aft Fourth Chin Bee Rd", "21541"],
      ["Automotive Technology", "21549"],
      ["Blk 151", "21551"],
      ["CISCO Recall", "21559"],
      ["Blk 158", "21561"],
      ["Opp Blk 158", "21569"],
      ["Opp Jurong Sec Sch", "21571"],
      ["Jurong Sec Sch", "21579"],
      ["Blk 65", "21581"],
      ["Opp Blk 65", "21589"],
      ["Opp Blk 117", "21591"],
      ["Blk 117", "21599"],
      ["Blk 357", "21601"],
      ["Opp Blk 364", "21609"],
      ["Blk 367", "21611"],
      ["AFT CORP RD", "21619"],
      ["Blk 354", "21621"],
      ["Blk 334", "21629"],
      ["Blk 115", "21631"],
      ["Opp Blk 115", "21639"],
      ["Bef Blk 322", "21641"],
      ["Opp Blk 322", "21649"],
      ["Opp Chinese Gdn", "21651"],
      ["Chinese Gdn", "21659"],
      ["Yuan Ching Sec Sch", "21661"],
      ["Opp Blk 134D", "21669"],
      ["Blk 331", "21671"],
      ["Blk 329", "21679"],
      ["Opp Blk 200", "21681"],
      ["Blk 200", "21689"],
      ["OPP SUMMERDALE", "21691"],
      ["SUMMERDALE", "21699"],
      ["Bet Blks 523/525", "21711"],
      ["Opp Blk 529", "21719"],
      ["Blk 239A", "21721"],
      ["Opposite Blk 239A", "21729"],
      ["Jurong Sec Sch", "21751"],
      ["Opp Jurong Sec Sch", "21759"],
      ["Blk 138B", "21761"],
      ["Opp Blk 138B", "21769"],
      ["AFT CORP DR", "21771"],
      ["Aft Yuan Ching Rd", "21779"],
      ["Boon Lay Int", "22009"],
      ["Bef Jurong Hill", "22011"],
      ["Aft Tractor Rd", "22019"],
      ["Givaudan", "22021"],
      ["Opp Givaudan", "22029"],
      ["Bef Pioneer Circus", "22031"],
      ["Markono Holdings", "22039"],
      ["Aft Tg Kling Rd", "22041"],
      ["Bef Tg Kling Rd", "22049"],
      ["Opp Buroh St", "22051"],
      ["Aft Buroh St", "22059"],
      ["Ceva Logistics", "22061"],
      ["Opp Ceva Logistics", "22069"],
      ["Bef Jurong Pier Rd", "22071"],
      ["Aft Jurong Pier Rd", "22079"],
      ["Opp Natsteel", "22081"],
      ["Natsteel", "22089"],
      ["Aft Jln Samulun", "22091"],
      ["Bef Jln Samulun", "22099"],
      ["Aft Jln Buroh", "22141"],
      ["Bef Jln Buroh", "22149"],
      ["Hitachi", "22151"],
      ["Opp Hitachi", "22159"],
      ["Aft Lok Yang Way", "22161"],
      ["Aft Intl Rd", "22169"],
      ["Opp Secura S'pore", "22171"],
      ["Secura S'Pore", "22179"],
      ["S'pore Post", "22181"],
      ["Pioneer Junction", "22189"],
      ["Soon Lee Depot", "22191"],
      ["Opp Soon Lee Depot", "22199"],
      ["Aft Neythal Rd", "22219"],
      ["Aft Pioneer Rd Nth", "22221"],
      ["Bef Pioneer Rd Nth", "22229"],
      ["Blk 639", "22231"],
      ["Blk 624", "22239"],
      ["Opp Blk 622", "22241"],
      ["Blk 622", "22249"],
      ["Blk 665A", "22251"],
      ["Blk 668D", "22259"],
      ["Bef Kwong Min Rd", "22271"],
      ["Aft Soon Lee Rd", "22281"],
      ["Bef Fan Yoong Rd", "22289"],
      ["Bef Soon Lee Rd", "22299"],
      ["Aft Fan Yoong Rd", "22309"],
      ["Bef Enterprise Rd", "22319"],
      ["Opp Sam Mccoy Engrg", "22329"],
      ["Tg Kling Rd (End)", "22331"],
      ["Blk 673C", "22341"],
      ["Blk 734A CP", "22349"],
      ["Opp Blk 717", "22351"],
      ["Blk 717", "22359"],
      ["Blk 641", "22361"],
      ["Blk 704", "22369"],
      ["Bef Jln Buroh", "22391"],
      ["Aft Jln Buroh", "22399"],
      ["Aft Shipyard Rd", "22401"],
      ["Bef Shipyard Rd", "22409"],
      ["Blk 676B", "22411"],
      ["Jurong West Sub-Stn", "22419"],
      ["Natl Oxygen Pte Ltd", "22421"],
      ["Opp Natl Oxygen Pte Ltd", "22429"],
      ["Opp Fei Siong Group", "22431"],
      ["Aft Fei Siong Group", "22439"],
      ["Blk 669 CP", "22441"],
      ["Blk 685B", "22449"],
      ["Opp Blk 643", "22451"],
      ["Blk 643", "22459"],
      ["Opp Blk 653B", "22461"],
      ["Blk 653B", "22469"],
      ["Blk 991B", "22471"],
      ["Opp Blk 991B", "22479"],
      ["Blk 691A CP", "22481"],
      ["Blk 683A", "22489"],
      ["Blk 662D", "22491"],
      ["Opp Blk 662C", "22499"],
      ["Blk 662A", "22501"],
      ["Blk 664C", "22509"],
      ["Blk 658C", "22511"],
      ["Blk 608", "22519"],
      ["Pioneer Stn Exit A", "22521"],
      ["Pioneer Stn Exit B", "22529"],
      ["Opp Jurong West Pr Sch", "22531"],
      ["Jurong West Pr Sch", "22539"],
      ["Blk 655", "22541"],
      ["Opp Blk 655 CP", "22549"],
      ["Blk 657", "22551"],
      ["Opp Blk 657 CP", "22559"],
      ["Blk 660 Cp", "22561"],
      ["Opp Blk 660 CP", "22569"],
      ["Blk 670A", "22591"],
      ["Blk 678D", "22599"],
      ["Soon Lee Bus Pk", "22609"],
      ["Carrier Transicold P/L", "23011"],
      ["Nippon Paint", "23019"],
      ["Aft Benoi Sector", "23021"],
      ["Stamford Tyre", "23029"],
      ["Bef Benoi Flyover", "23031"],
      ["Aft Benoi Flyover", "23039"],
      ["Opp Jurong Camp", "23041"],
      ["Jurong Camp", "23049"],
      ["Bef Kian Teck Rd", "23051"],
      ["Aft Kian Teck Rd", "23059"],
      ["Aft Kian Teck Rd", "23061"],
      ["Bef Kian Teck Rd", "23069"],
      ["Opp SAFTI Military Inst", "23071"],
      ["SAFTI Military Inst", "23079"],
      ["Opp S'pore Discovery Ctr", "23081"],
      ["S'pore Discovery Ctr", "23089"],
      ["Nippon", "23091"],
      ["Bef First Lok Yang Rd", "23099"],
      ["Auto World Care", "23101"],
      ["Aft Third Lok Yang Rd", "23109"],
      ["Bef Fourth Lok Yang Rd", "23111"],
      ["Aft Fourth Lok Yang Rd", "23119"],
      ["Opp Leroy-Somer", "23121"],
      ["Leroy-Somer", "23129"],
      ["MES Logistic Hub", "23131"],
      ["Bef Lok Yang Way", "23139"],
      ["Opp Varco", "23141"],
      ["Varco", "23149"],
      ["Containers Printers", "23151"],
      ["Aft Fifth Lok Yang Rd", "23159"],
      ["Aft Kian Teck Rd", "23161"],
      ["Bef Kian Teck Rd", "23169"],
      ["SKK (S) Pte Ltd", "23171"],
      ["Aft Second Lok Yang Rd", "23179"],
      ["Aft Kian Teck Rd", "23181"],
      ["Bef First Lok Yang Rd", "23189"],
      ["SK Tes", "23191"],
      ["Opp SK Tes", "23199"],
      ["Pall Corporation", "23201"],
      ["NS BlueScope Lysaght", "23209"],
      ["Mapletree Logistics Hub", "23211"],
      ["Opp Mapletree Log Hub", "23219"],
      ["Aft Gul Way", "23221"],
      ["Opp Gul Way", "23229"],
      ["Keppel Logistics", "23231"],
      ["Opp Keppel Logistics", "23239"],
      ["Aft Benoi Rd", "23241"],
      ["Bef Benoi Rd", "23249"],
      ["Aft Shipyard Rd", "23251"],
      ["Bef Shipyard Rd", "23259"],
      ["Opp Exxon Mobil", "23261"],
      ["Exxon Mobil", "23269"],
      ["Bef Benoi Sector", "23279"],
      ["Aft Pioneer Rd", "23281"],
      ["ST Marine", "23291"],
      ["Bef Benoi Basin", "23301"],
      ["Seatrium Benoi Yard", "23311"],
      ["Bef Benoi Lane", "23321"],
      ["Opp JP Nelson", "23331"],
      ["Aft Pioneer Rd", "23341"],
      ["Bef Pioneer Rd", "23349"],
      ["Aft Gul Ave", "23351"],
      ["Opp Gul Ave", "23359"],
      ["Bef Benoi Sector", "23361"],
      ["Aft Benoi Sector", "23369"],
      ["Bef Joo Koon Int", "23371"],
      ["Opp Joo Koon Int", "23379"],
      ["PEC Ltd", "23389"],
      ["Keppel Offshore & Marine", "23399"],
      ["Mobil Marine Ter", "23409"],
      ["Bef Shipyard Cres", "23419"],
      ["Opp Mooreast", "23429"],
      ["Opp LP 71", "23439"],
      ["Bef Benoi Pl", "23441"],
      ["Aft Benoi Pl", "23449"],
      ["Opp Chemical Industries", "23451"],
      ["Tanoto Shipyard", "23461"],
      ["Opp Tanoto Shipyard", "23469"],
      ["Aft Benoi Rd", "23471"],
      ["Bef Benoi Rd", "23479"],
      ["Molex", "23481"],
      ["Opp Molex", "23489"],
      ["Joo Koon Stn Exit B", "23491"],
      ["Joo Koon Stn Exit A", "23499"],
      ["Aft Pioneer Rd Nth", "23501"],
      ["Hoe Keng Motor", "23509"],
      ["Opp FairPrice Hub", "23519"],
      ["Joo Koon Int", "24009"],
      ["M.C. Packaging Pte Ltd", "24011"],
      ["Liang Huat Ind Cplx", "24019"],
      ["Meritor Heavy Veh Systems", "24021"],
      ["Mazak S'pore", "24029"],
      ["Opp Pasir Laba Camp", "24041"],
      ["Pasir Laba Camp", "24049"],
      ["Aft Gul Ave", "24089"],
      ["Opp Yeow San Pte Ltd", "24129"],
      ["Opp Toyo Ink", "24139"],
      ["Aft Joo Koon Cres", "24149"],
      ["Aft Joo Koon Rd", "24159"],
      ["Bef Gul Circle", "24169"],
      ["Bef Gul Lane", "24179"],
      ["Tai Sin Electric Cables", "24189"],
      ["JB Ind Pte Ltd", "24199"],
      ["Aft Gul Lane", "24209"],
      ["Precision Products", "24219"],
      ["Aft Gul St 3", "24229"],
      ["Bef Gul St 1", "24239"],
      ["Asiatic Agricultural Ind", "24249"],
      ["DNV GL Laboratory", "24259"],
      ["Sing Huat Hardware", "24269"],
      ["Cameron Iron Works", "24279"],
      ["Opp Keppel T&T", "24289"],
      ["Aft Gul Way", "24299"],
      ["SNL Logistics Pte Ltd", "24301"],
      ["Opp Hong Hang Bldg", "24331"],
      ["Hong Hang Bldg", "24339"],
      ["Seatrium Pioneer Yard", "24341"],
      ["ST Engrg Gul Yard", "24349"],
      ["Opp S'pore Takada Ind", "24351"],
      ["S'pore Takada Ind", "24359"],
      ["Dyna-Mac Engrg Svcs", "24369"],
      ["Opp Asia Ind Gases", "24379"],
      ["GE Keppel Energy Svcs", "24381"],
      ["Opp GE Keppel Energy Svcs", "24389"],
      ["Chem-Solv Technologies", "24391"],
      ["Opp Hoe Huat Engrg", "24401"],
      ["Opp Multi Ways Equipment", "24411"],
      ["Bef Pioneer Sector 1", "24421"],
      ["Aft Pioneer Sector 2", "24431"],
      ["GSK", "24441"],
      ["Opp Cambridge Ind Trust", "24451"],
      ["Bef Nam Leong Co Pte Ltd", "24461"],
      ["Aft Joo Koon Way", "24489"],
      ["Panasonic Ind Devices", "24499"],
      ["Bef Tuas Flyover", "24501"],
      ["Aft Tuas Flyover", "24509"],
      ["GUL CIRCLE STN EXIT A", "24511"],
      ["GUL CIRCLE STN EXIT B", "24519"],
      ["Bef Tuas Ave 5", "24521"],
      ["Aft Tuas Ave 5", "24529"],
      ["Utracon Corp", "24531"],
      ["Dundee Marine", "24539"],
      ["Opp Seatrium Tuas Yard", "24541"],
      ["Seatrium Tuas Yard", "24549"],
      ["Opp Crystal Offshore", "24559"],
      ["Seng Heng Engrg", "24571"],
      ["Opp ESAB", "24581"],
      ["Bef Joo Koon Way", "24599"],
      ["Progress Galvanizing", "24601"],
      ["Opp Progress Galvanizing", "24609"],
      ["Bef Marinteknik", "24611"],
      ["Opp Marinteknik", "24619"],
      ["Aft Ocean Tanker", "24621"],
      ["Opp Ocean Tanker", "24629"],
      ["Bef Benoi Rd", "24631"],
      ["Aft Benoi Rd", "24639"],
      ["W Atelier", "24641"],
      ["Metall-Treat Ind", "24651"],
      ["Hiap Teck Metal Co", "24671"],
      ["Opp Hiap Teck Metal Co", "24679"],
      ["Opp Jurong Insp Ctr", "24681"],
      ["Jurong Insp Ctr", "24689"],
      ["Aft Tuas Rd", "24691"],
      ["Bef Tuas Rd", "24699"],
      ["TUAS CRES STN EXIT B", "24701"],
      ["TUAS CRES STN EXIT A", "24709"],
      ["TUAS WEST RD STN EXIT B", "24711"],
      ["TUAS WEST RD STN EXIT A", "24719"],
      ["Tuas Ter", "25009"],
      ["Aft Tuas Sth Blvd", "25059"],
      ["Kyocera Chemical", "25061"],
      ["Opp Kyocera Chemical", "25069"],
      ["Opp Nissin Trspt", "25071"],
      ["Nissin Trspt", "25079"],
      ["Aft Tuas Ave 7", "25091"],
      ["Opto-Pharm", "25099"],
      ["Opp SMC Mfg", "25101"],
      ["SMC Mfg", "25109"],
      ["Aft Tuas Ave 10", "25111"],
      ["Bef Tuas Ave 10", "25119"],
      ["Aft Tuas Ave 8", "25121"],
      ["Aft Tuas Ave 6", "25129"],
      ["Mercedes-Benz Logistics", "25151"],
      ["Toyochem Ink", "25161"],
      ["Opp Galmon S'pore", "25169"],
      ["Becton Dickinson Med", "25171"],
      ["Sew-Eurodrive", "25179"],
      ["Bef Tuas Dr 1", "25181"],
      ["Soon Heng Glass", "25189"],
      ["Asiatic Engrg", "25191"],
      ["Bestofire and Thermal", "25199"],
      ["Aft Tuas Rd", "25201"],
      ["Bef Tuas Rd", "25209"],
      ["Aft Tuas Ave 2", "25219"],
      ["Raffles Country Club", "25221"],
      ["Crown Beverage Cans S'pore", "25229"],
      ["Opp Asia-Pacific Brewery", "25231"],
      ["Asia-Pacific Brewery", "25239"],
      ["Aft Tuas West Rd", "25249"],
      ["S'pore Rail Test Ctr", "25251"],
      ["Bef Tuas West Dr", "25259"],
      ["Tuas Checkpt", "25269"],
      ["YCH Distripk", "25321"],
      ["Mapletree Logistics", "25329"],
      ["Chugoku Marine Paints", "25331"],
      ["Opp Chugoku Marine Paints", "25339"],
      ["Bef Tuas Ave 2", "25341"],
      ["Times Printers", "25349"],
      ["Hart Engrg Pte Ltd", "25351"],
      ["Opp Hart Engrg Pte Ltd", "25359"],
      ["Yan San Metals Pte Ltd", "25361"],
      ["Opp Yan San Metals", "25369"],
      ["Aft Tuas Ave 4", "25371"],
      ["Aft Tuas Ave 6", "25379"],
      ["WYN2000 Logistics Ctr", "25381"],
      ["Aft Tuas Ave 8", "25389"],
      ["Bef Pioneer Rd", "25391"],
      ["Aft Pioneer Rd", "25399"],
      ["BEF TUAS TER", "25411"],
      ["Aft Tuas Ter", "25419"],
      ["OPP TUAS LINK STN", "25421"],
      ["TUAS LINK STN", "25429"],
      ["Super Continental", "25431"],
      ["Opp Super Continental", "25439"],
      ["Bef Pioneer Rd", "25441"],
      ["Aft Pioneer Rd", "25449"],
      ["Aft Tuas West St", "25451"],
      ["Opp Tuas West St", "25459"],
      ["Aft Tuas West Ave", "25461"],
      ["Bef Tuas West Ave", "25469"],
      ["Opp S'pore Epson Ind", "25471"],
      ["S'pore Epson Ind", "25479"],
      ["Opp Super Continental", "25491"],
      ["Super Continental", "25499"],
      ["Kee Wee Hup Kee", "25501"],
      ["Opp Kee Wee Hup Kee", "25509"],
      ["MICHELMAN", "25511"],
      ["OPP MICHELMAN", "25519"],
      ["ST KINETICS", "25531"],
      ["FUJIFILM", "25539"],
      ["PEC", "25541"],
      ["CAST LABORATORIES", "25549"],
      ["GARMCO", "25551"],
      ["LEE WELDED MESH", "25559"],
      ["Aft Tuas Cres", "25561"],
      ["Bef Tuas Cres", "25569"],
      ["OPP WEST STAR", "25571"],
      ["WEST STAR", "25579"],
      ["CROWN EQUIPMENT", "25589"],
      ["OPP WYETH PHARMACEUTICALS", "25591"],
      ["WYETH PHARMACEUTICALS", "25599"],
      ["PFIZER GLOBAL", "25601"],
      ["MERCK SHARP & DOHME", "25609"],
      ["OPP WESTLINK TWO", "25611"],
      ["STARBURST ENGRG", "25621"],
      ["CONTAINER CONNECTIONS", "25631"],
      ["OPP ROCHE S'PORE TECH", "25641"],
      ["NOVARTIS", "25651"],
      ["Bef Tuas Bay Lk", "25661"],
      ["Aft Tuas Bay Lk", "25669"],
      ["BEF OFFSHORE MARINE CTR", "25671"],
      ["BEF TUAS WEST AVE", "25681"],
      ["AFT TUAS WEST AVE", "25689"],
      ["AFT TUAS WEST RD STN", "25691"],
      ["GLAXOSMITHKLINE", "25701"],
      ["EDGEN MURRAY", "25709"],
      ["OPP THE INDEX", "25711"],
      ["THE INDEX", "25719"],
      ["ABBOTT", "25729"],
      ["HALLIBURTON", "25741"],
      ["BEF TUAS STH AVE 14", "25751"],
      ["OPP REC S'PORE", "25761"],
      ["AFT TUAS STH ST 7", "25771"],
      ["OPP SLS", "25781"],
      ["BEF TUAS STH AVE 10", "25791"],
      ["BEF TUAS STH AVE 7", "25801"],
      ["Bef Tuas Ave 7", "25811"],
      ["Aft Tuas Ave 7", "25819"],
      ["TUAS AMENITY CTR", "25821"],
      ["Bef Tuas Ave 11", "26011"],
      ["PROGRESS GALVANIZING", "26019"],
      ["Bef Tuas Ave 13", "26021"],
      ["CHIA HOCK TRADING CO", "26029"],
      ["Hiap Seng Engrg Ltd", "26031"],
      ["ASIA POLYURETHANE", "26039"],
      ["HIAP SENG ENGRG LTD", "26041"],
      ["Damen Shipyard", "26049"],
      ["BLASTING ABRASIVES", "26051"],
      ["PAXOCEAN", "26059"],
      ["B S DEVELOPMENT", "26061"],
      ["Aft Tuas Ave 16", "26069"],
      ["UNIFINE STAR PETROCHEM", "26071"],
      ["Bef Tuas Loop", "26079"],
      ["BEF TUAS AVE 18A", "26081"],
      ["Bef Tuas Ave 20", "26089"],
      ["ROTARY ENGRG", "26091"],
      ["Bef Tuas Ave 13", "26099"],
      ["BASF STH EAST ASIA", "26101"],
      ["Bef Tuas Ave 11", "26109"],
      ["Tru-Marine", "26111"],
      ["Bef Tuas Amenity Ctr", "26121"],
      ["Aft Tuas Cres", "26131"],
      ["Mectron Engrg", "26141"],
      ["Tuas Lot", "26151"],
      ["3NC S'pore", "26161"],
      ["Richee Engrg", "26171"],
      ["Opp MSD", "26201"],
      ["MSD", "26209"],
      ["Framo S'pore Pte Ltd", "26211"],
      ["Opp YLS Steel", "26221"],
      ["Aft Tuas Sth Ave 2", "26241"],
      ["Bef Tuas Sth Ave 2", "26249"],
      ["Bef Tuas Sth Ave 2", "26251"],
      ["Aft Tuas Sth Ave 2", "26259"],
      ["Aft Tuas Sth Ave 4", "26261"],
      ["Bef Tuas Sth Ave 4", "26269"],
      ["Aft Tuas Sth Ave 4", "26279"],
      ["Aft Tuas Sth St 2", "26289"],
      ["Bef Tuas Sth Ave 6", "26299"],
      ["Aft Tuas Sth Ave 6", "26311"],
      ["Bef Tuas Sth St 2", "26321"],
      ["Aft Tuas Sth St 2", "26331"],
      ["Tuas Technology Pk", "26349"],
      ["See Hup Seng", "26369"],
      ["Yong Nam", "26379"],
      ["Bef Tuas Sth Ave 5", "26389"],
      ["Aft Tuas View Cres", "26399"],
      ["Multico", "26409"],
      ["Aft Tuas View Circuit", "26419"],
      ["Bef Tuas Sth Ave 9", "26429"],
      ["Aft Tuas Sth Ave 9", "26431"],
      ["Bef Tuas Sth Ave 7", "26441"],
      ["Bef Tuas Sth Ave 5", "26451"],
      ["Aft Tuas Sth Ave 8", "26461"],
      ["Hall 11 Blk 55", "27011"],
      ["Hall 15", "27021"],
      ["Hall 12", "27031"],
      ["NIE CP 7", "27041"],
      ["NIE Lib", "27051"],
      ["Sch of ADM", "27061"],
      ["Blk 41", "27069"],
      ["Nanyang Cres Halls", "27071"],
      ["Opp Blk 271 CP", "27091"],
      ["Blk 271 CP", "27099"],
      ["Opp Westwood Sec Sch", "27101"],
      ["Westwood Sec Sch", "27109"],
      ["Bef Nanyang Ave", "27121"],
      ["Opp Nanyang Ave", "27129"],
      ["Blk 932", "27131"],
      ["Blk 934", "27139"],
      ["Blk 920", "27141"],
      ["Juying Pr Sch", "27149"],
      ["Blk 924", "27159"],
      ["Bef Jln Bahar", "27169"],
      ["Bef Lor Danau", "27171"],
      ["Aft Lor Danau", "27179"],
      ["PUB Sub-Stn", "27181"],
      ["Opp PUB Sub-Stn", "27189"],
      ["Hall 11", "27199"],
      ["Halls 8 & 9", "27209"],
      ["Lee Wee Nam Lib", "27211"],
      ["NIE Blk 2", "27219"],
      ["Sch Of CEE", "27221"],
      ["Wee Kim Wee Sch of C&I", "27231"],
      ["SPMS", "27241"],
      ["Academic Bldg Sth", "27251"],
      ["Hall 4", "27261"],
      ["Blk 962", "27271"],
      ["Blk 953", "27279"],
      ["Hall 1", "27281"],
      ["Opp Hall 6", "27291"],
      ["Blk 978", "27301"],
      ["Blk 705", "27309"],
      ["Hall 2", "27311"],
      ["Blk 949", "27321"],
      ["Blk 840", "27329"],
      ["West Grove Pr Sch", "27331"],
      ["Blk 729", "27341"],
      ["Blk 745", "27349"],
      ["Blk 715", "27351"],
      ["Blk 817", "27359"],
      ["Blk 710", "27361"],
      ["Blk 834", "27369"],
      ["Opp Blk 755", "27371"],
      ["Blk 755", "27379"],
      ["Blk 749", "27381"],
      ["Gek Poh Shop Ctr", "27389"],
      ["Blk 857", "27391"],
      ["Bet Blks 859/860", "27399"],
      ["Opp Blk 821", "27401"],
      ["Blk 821", "27409"],
      ["Blk 844A CP", "27411"],
      ["Blk 827", "27419"],
      ["Blk 701", "27421"],
      ["Blk 711", "27429"],
      ["Blk 762", "27431"],
      ["Blk 861", "27439"],
      ["Bet Blks 757/758", "27441"],
      ["Aft Westwood Ave", "27449"],
      ["Bet Blks 272D/271A", "27451"],
      ["Blk 273B", "27459"],
      ["Opp Blk 276B", "27461"],
      ["Blk 276B", "27469"],
      ["Corporation Pr Sch", "27471"],
      ["Opp Corporation Pr Sch", "27479"],
      ["NTUC HEALTH NURSING HME", "27501"],
      ["Bef Yunnan Cres", "27509"],
      ["Blk 974", "27511"],
      ["Opp Blk 974", "27519"],
      ["Blk 986 CP", "27521"],
      ["Opp Blk 987A", "27529"],
      ["Blk 918", "27531"],
      ["BEF XINGNAN PR SCH", "27539"],
      ["Jurong East Int", "28009"],
      ["BEF TOH TUCK AVE", "28011"],
      ["Aft Toh Tuck Ave", "28019"],
      ["OPP 8 @TRADEHUB 21", "28021"],
      ["8 @ TRADEHUB 21", "28029"],
      ["Bef The Synergy", "28031"],
      ["Aft Boon Lay Sub Stn", "28039"],
      ["The Synergy", "28041"],
      ["Opp The Synergy", "28049"],
      ["Opp Ng Teng Fong Gen Hosp", "28051"],
      ["Ng Teng Fong General Hosp", "28059"],
      ["J Gateway", "28061"],
      ["Blk 203", "28069"],
      ["Blk 105", "28071"],
      ["Blk 210", "28079"],
      ["Blk 112", "28081"],
      ["Bef Yuhua CC", "28089"],
      ["Lakeside Stn", "28091"],
      ["Opp Lakeside Stn", "28099"],
      ["Opp SMRT Ulu Pandan Depot", "28101"],
      ["SMRT Ulu Pandan Depot", "28109"],
      ["Bef Toh Tuck Lk", "28181"],
      ["Aft Toh Tuck Lk", "28189"],
      ["Opposite JEM", "28199"],
      ["Opp The JTC Summit", "28201"],
      ["Bef Jurong East Stn", "28211"],
      ["Opp Intl Business Pk", "28221"],
      ["German Ctr", "28229"],
      ["Jurong Town Hall", "28231"],
      ["Jurong Town Hall Int", "28239"],
      ["Opp Jurong East Lib", "28241"],
      ["Jurong East Lib", "28249"],
      ["S'pore Science Ctr", "28251"],
      ["Opp S'pore Science Ctr", "28259"],
      ["Aft S'pore Science Ctr", "28261"],
      ["Blk 118", "28269"],
      ["Opp Blk 114", "28271"],
      ["Blk 114", "28279"],
      ["Opp Blk 227", "28281"],
      ["Blk 228", "28289"],
      ["Blk 303", "28291"],
      ["Blk 253", "28299"],
      ["Blk 131", "28301"],
      ["Intl Business Pk", "28309"],
      ["Blk 209", "28311"],
      ["Blk 207", "28319"],
      ["Blk 239", "28321"],
      ["Blk 246", "28329"],
      ["Blk 229", "28331"],
      ["Blk 252", "28339"],
      ["Chinese Gdn Stn", "28341"],
      ["Opp Chinese Gdn Stn", "28349"],
      ["Opp Blk 350", "28351"],
      ["Blk 350", "28359"],
      ["Jurong Lake", "28361"],
      ["Opp Jurong Lake", "28369"],
      ["Bef Jurong West St 51", "28371"],
      ["Aft Jurong West St 51", "28379"],
      ["Blk 515", "28381"],
      ["Opp Blk 515", "28389"],
      ["Blk 501", "28391"],
      ["Blk 458", "28399"],
      ["Blk 502", "28401"],
      ["Blk 454", "28409"],
      ["Blk 526", "28411"],
      ["Blk 517", "28421"],
      ["Blk 134", "28431"],
      ["Blk 124", "28439"],
      ["Seventh-Day Advent Ch", "28441"],
      ["Bef Seventh-Day Advent Ch", "28449"],
      ["Parc Oasis", "28451"],
      ["Opp Parc Oasis", "28459"],
      ["Blk 347", "28461"],
      ["Blk 316", "28469"],
      ["Opp Blk 311", "28471"],
      ["Blk 306", "28481"],
      ["Opp Jurong Polyclinic", "28491"],
      ["Jurong Polyclinic", "28499"],
      ["Blk 490", "28501"],
      ["Blk 422", "28509"],
      ["Blk 463", "28511"],
      ["Blk 425", "28519"],
      ["Blk 457", "28521"],
      ["Blk 441", "28529"],
      ["Blk 536", "28531"],
      ["Blk 538", "28539"],
      ["Blk 551", "28541"],
      ["Blk 560A", "28551"],
      ["Blk 402", "28561"],
      ["Blk 416", "28571"],
      ["Blk 491", "28581"],
      ["Opp Blk 481", "28591"],
      ["Yuhua Sec Sch", "28601"],
      ["Opp Blk 461", "28611"],
      ["Blk 241", "28621"],
      ["Blk 266", "28629"],
      ["Opp Blk 288D", "28631"],
      ["Blk 288E", "28639"],
      ["Blk 284", "28641"],
      ["Blk 286A", "28649"],
      ["Opp IMM Bldg", "28651"],
      ["IMM Bldg", "28659"],
      ["Opp Jurong East Warehse", "28661"],
      ["Jurong East Warehse", "28669"],
      ["Alliance Bldg", "28671"],
      ["Hitachi Elevator Bldg", "28679"],
      ["Toh Guan Ctr", "28681"],
      ["Opp Toh Guan Ctr", "28689"],
      ["Wang-Fu Ind Pte Ltd", "28691"],
      ["Opp Uni-Tech Ctr", "28699"],
      ["Aft Old Toh Tuck Rd", "28701"],
      ["Bef Old Toh Tuck Rd", "28709"],
      ["Jurong Town Hall Int", "29009"],
      ["Opp Sanmina-SCI", "29011"],
      ["Sanmina-SCI", "29019"],
      ["Aft Jln Buroh", "29021"],
      ["Bef Penjuru Cl", "29029"],
      ["Aft Penjuru Pl", "29031"],
      ["Bef Penjuru Wk", "29039"],
      ["Ban Joo", "29041"],
      ["LTH Logistics", "29049"],
      ["Opp Caltex S'pore", "29051"],
      ["Caltex S'pore", "29059"],
      ["Aft Pandan Rd", "29069"],
      ["Gas Svc Intl", "29071"],
      ["Franklin Offshore", "29081"],
      ["Swanson Plastics", "29089"],
      ["Opp Sia Huat", "29091"],
      ["Bef Sia Huat", "29099"],
      ["PPL Shipyard", "29101"],
      ["Opp PPL Shipyard", "29109"],
      ["Transerve", "29111"],
      ["Comfortdelgro Engrg", "29119"],
      ["Opp Clp Intl", "29121"],
      ["Clp Intl", "29129"],
      ["Opp Foh Foh Pte Ltd", "29139"],
      ["Senkee Logistics Hub", "29149"],
      ["Aft Teban Gdns Cres", "29159"],
      ["Tengah Air Base", "30011"],
      ["Opp Tengah Air Base", "30019"],
      ["Opp Keat Hong Camp", "30021"],
      ["Keat Hong Camp", "30029"],
      ["Opp Army Logistics Base", "30031"],
      ["Army Logistics Base", "30039"],
      ["Opp Home Team Acad", "30041"],
      ["Home Team Acad", "30049"],
      ["Aft Track 14", "30051"],
      ["Opp Track 14", "30059"],
      ["Opp Hai Inn See Tp", "30081"],
      ["Aft Hai Inn See Tp", "30089"],
      ["Chengtai Nursery", "30091"],
      ["Opp Chengtai Nursery", "30099"],
      ["Blk 485B", "30101"],
      ["Opp Blk 485A", "30109"],
      ["Blk 804B", "30111"],
      ["AFT CHOA CHU KANG AVE 6", "30119"],
      ["Blk 805D", "30121"],
      ["OPP BLK 805D", "30129"],
      ["Choa Chu Kang Rd End", "31009"],
      ["Aft Nanyang Ave", "31011"],
      ["Bef Nanyang Ave", "31019"],
      ["Jln Bahar Power Stn", "31021"],
      ["Opp Jln Bahar Power Stn", "31029"],
      ["Civil Defence Acad", "31031"],
      ["Opp Civil Defence Acad", "31039"],
      ["Bef Muslim Cemy Path 7", "31041"],
      ["Aft Chr Cemy Path 9", "31049"],
      ["Pusara Aman Mque", "31051"],
      ["Aft Cemy Chapel", "31059"],
      ["Opp Lim Chu Kang Camp II", "31061"],
      ["Bef Old Choa Chu Kang Rd", "31069"],
      ["Aft Chinese Cemy Path 11", "31071"],
      ["Opp Chinese Cemy Path 11", "31079"],
      ["Opp HQ 5th SIB Camp I", "31081"],
      ["HQ 5th SIB Camp I", "31089"],
      ["Nirvana Memorial Gdn", "31121"],
      ["Aft Nirvana Memorial Gdn", "31129"],
      ["Aft Track 33", "31131"],
      ["Bef Track 33", "31139"],
      ["CCK Cemy Office", "31141"],
      ["Opp CCK Cemy Office", "31149"],
      ["Aft Lim Chu Kang Rd", "31151"],
      ["Bef Lim Chu Kang Rd", "31159"],
      ["Opp Teen Challenge", "31161"],
      ["Teen Challenge", "31169"],
      ["Opp Jln Berseri", "31171"],
      ["Aft Jln Berseri", "31179"],
      ["B26 Old Choa Chu Kang Rd", "31191"],
      ["B25 Old Choa Chu Kang Rd", "31199"],
      ["Aft Chinese Cemy Path 13", "31201"],
      ["Aft Muslim Cemy Path 17", "31211"],
      ["Opp Ama Keng Rd", "32031"],
      ["Aft Ama Keng Rd", "32039"],
      ["Opp LP 160", "32041"],
      ["Aft LP 161", "32049"],
      ["Aft Track 11", "32051"],
      ["Opp Track 11", "32059"],
      ["Opp LP 173", "32061"],
      ["B26 Lim Chu Kang Rd", "32069"],
      ["Aft Track 13", "32071"],
      ["Opp Track 13", "32079"],
      ["Sg Gedong Camp", "32081"],
      ["Aft Sg Gedong Camp", "32089"],
      ["Aft Murai Farmway", "32101"],
      ["Bef Lor Serambi", "32109"],
      ["Aft LP 93", "32111"],
      ["Aft LP 96", "32119"],
      ["B19 Lim Chu Kang Rd", "33011"],
      ["B20 Lim Chu Kang Rd", "33019"],
      ["Opp Neo Tiew Rd", "33021"],
      ["Aft Neo Tiew Rd", "33029"],
      ["Aft Jln Bahtera", "33031"],
      ["Opp Jln Bahtera", "33039"],
      ["Opp Lim Chu Kang Lane 3", "33041"],
      ["Aft Lim Chu Kang Lane 3", "33049"],
      ["Bef Lim Chu Kang Lane 3A", "33051"],
      ["Aft Lim Chu Kang Lane 3A", "33059"],
      ["Police Coast Guard", "34009"],
      ["Opp Lim Chu Kang Lane 4", "34011"],
      ["Aft Lim Chu Kang Lane 4", "34019"],
      ["Opp Lim Chu Kang Lane 5", "34021"],
      ["Bef Lim Chu Kang Lane 5", "34029"],
      ["Aft Lim Chu Kang Lane 6", "34031"],
      ["Bef Lim Chu Kang Lane 6", "34039"],
      ["B03 Lim Chu Kang Rd", "34041"],
      ["Aft Lim Chu Kang Lane 8", "34049"],
      ["Aft Lim Chu Kang Lane 8", "34051"],
      ["Yishun Dairy Farm", "34059"],
      ["Aft Old Lim Chu Kang Rd", "34101"],
      ["Aft Lim Chu Kang Rd", "34109"],
      ["LITTLE INDIA STN EXIT A", "40011"],
      ["Little India Stn", "40019"],
      ["BEF WINSTEDT RD", "40021"],
      ["Aft Makepeace Rd", "40029"],
      ["Newton FC", "40031"],
      ["Opp Newton FC", "40039"],
      ["Newton Stn Exit C", "40041"],
      ["Opp Newton Stn Exit C", "40049"],
      ["Balmoral Plaza", "40051"],
      ["Chancery Ct", "40059"],
      ["Anglo-Chinese Sch", "40069"],
      ["Leng Kwang Baptist Ch", "40071"],
      ["Bef Swiss Cottage Est", "40079"],
      ["STEVENS STN EXIT 1", "40081"],
      ["AFT STEVENS STN EXIT 5", "40089"],
      ["Bef Lewis Rd", "40091"],
      ["Aft Dunkirk Ave", "40099"],
      ["Kk Women & Children Hosp", "40101"],
      ["Opp KK Women & Child Hosp", "40109"],
      ["Ferrell Residences", "40111"],
      ["Bef Goldhill Ave", "40119"],
      ["Opp Newton Life Ch", "40121"],
      ["Newton Life Ch", "40129"],
      ["Opp Env Bldg", "40171"],
      ["Env Bldg", "40179"],
      ["Newton Stn Exit A", "40181"],
      ["Newton Stn Exit B", "40189"],
      ["Aft Draycott Pk", "40191"],
      ["Aft Balmoral Rd", "40199"],
      ["Chelsea Gdns Condo", "40201"],
      ["NOVOTEL MERCURE @ STEVENS", "40209"],
      ["Opp Met YMCA", "40211"],
      ["Bef Met YMCA", "40219"],
      ["STEVENS STN EXIT 3", "40221"],
      ["BEF STEVENS STN EXIT 2", "40229"],
      ["Raffles Town Club", "40231"],
      ["BEF STEVENS STN EXIT 4", "40239"],
      ["St. Joseph'S Instn", "40249"],
      ["Aft Wallace Way", "40251"],
      ["Bef Wallace Way", "40259"],
      ["LP 52", "40261"],
      ["LP 57", "40269"],
      ["Opp KK Women & Child Hosp", "40271"],
      ["Kk Women & Children Hosp", "40279"],
      ["Blk 451A", "40301"],
      ["Opp Blk 451A", "40309"],
      ["Blk 439C", "40311"],
      ["Dulwich College", "40321"],
      ["Millennia Institute", "40329"],
      ["Blk 460D", "40331"],
      ["Blk 448B", "40339"],
      ["Bef Blk 440A", "40341"],
      ["Blk 461", "40349"],
      ["Blk 461C", "40351"],
      ["Opp Blk 461C", "40359"],
      ["Blk 438A", "40361"],
      ["Blk 464A", "40369"],
      ["OPP BLK 465A", "40371"],
      ["Blk 467 Cp", "40379"],
      ["Blk 111", "40381"],
      ["Blk 119", "40389"],
      ["Blk 231B", "40391"],
      ["Blk 123B", "40399"],
      ["Blk 224A", "40401"],
      ["Blk 132B", "40409"],
      ["Blk 221B", "40411"],
      ["Blk 215", "40419"],
      ["Blk 220A", "40421"],
      ["Blk 242", "40429"],
      ["Blk 237A", "40431"],
      ["Opposite Blk 236A", "40439"],
      ["Blk 238", "40441"],
      ["Blk 324B", "40449"],
      ["Blk 306B", "40451"],
      ["Blk 321", "40459"],
      ["Tengah Int", "41009"],
      ["NUS Bt Timah Campus", "41011"],
      ["Aft Kheam Hock Rd", "41019"],
      ["Botanic Gdns Stn", "41021"],
      ["Opp Botanic Gdns Stn", "41029"],
      ["Bef Crown Ctr", "41031"],
      ["Coronation Plaza", "41041"],
      ["Opp Coronation Plaza", "41049"],
      ["Tan Kah Kee Stn", "41051"],
      ["Chinese High Sch", "41061"],
      ["Opp Tan Kah Kee Stn", "41069"],
      ["Opp Natl JC", "41071"],
      ["Natl JC", "41079"],
      ["Sixth Ave Stn", "41081"],
      ["Aft Jln Naga Sari", "41089"],
      ["St. Margaret's Sec Sch", "41101"],
      ["Opp St. Margaret's Sec Sch", "41109"],
      ["Lutheran Twrs", "41111"],
      ["Opp Lutheran Twrs", "41119"],
      ["S'Pore Bible Coll", "41121"],
      ["Opp S'Pore Bible Coll", "41129"],
      ["Opp The Japanese Assn", "41131"],
      ["Aft The Japanese Assn", "41139"],
      ["Aft Adam Dr", "41141"],
      ["Aft Sime Rd", "41151"],
      ["Aft Lornie Wk", "41159"],
      ["AFT KHEAM HOCK RD", "41161"],
      ["Bef Kheam Hock Rd", "41169"],
      ["Sixth Ave Ctr", "42011"],
      ["Opp Sixth Ave Stn", "42019"],
      ["Aft Maple Ave", "42021"],
      ["Aft Swiss Club Rd", "42029"],
      ["The Tessarina", "42031"],
      ["Opp The Nexus", "42039"],
      ["The Nexus", "42041"],
      ["Hua Guan Gdns", "42049"],
      ["King Albert Pk Stn", "42051"],
      ["Opp King Albert Pk Stn", "42059"],
      ["King Albert Pk", "42061"],
      ["Pei Hwa Presby Pr Sch", "42071"],
      ["Opp Pei Hwa Presby Pr Sch", "42079"],
      ["Opp Bt Timah Plaza", "42089"],
      ["Beauty World Stn Exit B", "42091"],
      ["Beauty World Stn Exit A", "42099"],
      ["Opp Beauty World Ctr", "42109"],
      ["WOH HUP BLDG", "42111"],
      ["Southaven II", "42119"],
      ["Sixth Ave Ville", "42129"],
      ["Aft Lantana Ave", "42131"],
      ["Ave Villa", "42139"],
      ["Bef Dunearn Rd", "42141"],
      ["Aft Bt Timah Rd", "42149"],
      ["Beauty World Stn Exit C", "42151"],
      ["Opp Beauty World Stn", "42159"],
      ["Blk 18", "42161"],
      ["Opp Blk 19", "42169"],
      ["Signature Pk Condo", "42171"],
      ["Aft Chun Tin Rd", "42179"],
      ["Opp The Hillford", "42181"],
      ["The Hillford", "42189"],
      ["Bef Bt Batok East Ave 6", "42191"],
      ["Aft Bt Batok East Ave 6", "42199"],
      ["Bef Toh Tuck Rise", "42201"],
      ["Aft Toh Tuck Rise", "42209"],
      ["Highgate Pk", "42211"],
      ["Opp Highgate Pk", "42219"],
      ["Forett @ Bt Timah", "42221"],
      ["Aft Toh Tuck Terr", "42229"],
      ["Bef Jln Jurong Kechil", "42231"],
      ["Aft Jln Jurong Kechil", "42239"],
      ["Aft Eng Kong Pl", "42241"],
      ["Bef Eng Kong Pl", "42249"],
      ["Aft Upp Bt Timah Rd", "42259"],
      ["Opp Toh Tuck Cres", "42291"],
      ["Aft Toh Tuck Cres", "42299"],
      ["Opp Hse No. 19", "42301"],
      ["Hse No. 45", "42309"],
      ["Opp Burgundy Hill", "42311"],
      ["Burgundy Hill", "42319"],
      ["BEF HILLVIEW STN EXIT B", "42991"],
      ["Bt Batok Int", "43009"],
      ["Bt Regency", "43011"],
      ["Springdale Condo", "43019"],
      ["Aft Old Jurong Rd", "43021"],
      ["Opp The Hillside", "43029"],
      ["Hume Pk Condo", "43041"],
      ["Opp Hume Pk Condo", "43049"],
      ["Opp The Rail Mall", "43051"],
      ["The Rail Mall", "43059"],
      ["Hillview Stn", "43061"],
      ["HILLVIEW STN EXIT A", "43069"],
      ["Opp Dairy Farm Rd", "43071"],
      ["Opp Assumption Eng Sch", "43081"],
      ["Aft Assumption Eng Sch", "43089"],
      ["Bef Cashew Stn", "43091"],
      ["Assumption Pathway Sch", "43099"],
      ["Cashew Stn", "43109"],
      ["Min Of Defence", "43111"],
      ["Bef Hazel Pk Terr", "43119"],
      ["Aft Cashew Terr", "43121"],
      ["Cashew Pk Condo", "43129"],
      ["Bt Panjang Pr Sch", "43131"],
      ["Opp Bt Panjang Pr Sch", "43139"],
      ["Opp Blk 291A", "43141"],
      ["Blk 291A", "43149"],
      ["Opp Glendale Pk Condo", "43151"],
      ["Blk 272", "43161"],
      ["Blk 254", "43169"],
      ["Blk 229", "43171"],
      ["Blk 231", "43179"],
      ["Keming Pr Sch", "43181"],
      ["Blk 283", "43189"],
      ["Blk 288C", "43191"],
      ["Ch Of St. Mary", "43199"],
      ["Park Natura", "43201"],
      ["Autobacs", "43209"],
      ["Sbst Bt Batok Depot", "43211"],
      ["Opp Sbst Bt Batok Depot", "43219"],
      ["Blk 267", "43221"],
      ["Opp Blk 266", "43229"],
      ["Opp The Petals Condo", "43231"],
      ["The Petals Condo", "43239"],
      ["Opp Hillview Apts", "43241"],
      ["Hillview Apts", "43249"],
      ["Hillbrooks", "43251"],
      ["Opp Hillbrooks", "43259"],
      ["Opp Hillview Hts", "43261"],
      ["Hillview Hts", "43267"],
      ["Hillington Green Condo", "43268"],
      ["Glendale Pk Condo", "43271"],
      ["Aft Hillview Stn", "43279"],
      ["Mont Botanik Residence", "43289"],
      ["Aft Jln Remaja", "43291"],
      ["Opp Hillbrooks", "43301"],
      ["Hillbrooks", "43309"],
      ["Midview Bldg", "43311"],
      ["Opp Midview Bldg", "43319"],
      ["Opp Blk 144", "43321"],
      ["Blk 146", "43329"],
      ["Opp Bt Batok Presby Ch", "43331"],
      ["Blk 148", "43339"],
      ["Princess E Pr Sch", "43341"],
      ["Opp Princess E Pr Sch", "43349"],
      ["Blk 168", "43351"],
      ["Blk 169", "43359"],
      ["Blk 154A", "43361"],
      ["Blk 183", "43369"],
      ["Blk 109", "43371"],
      ["Blk 185", "43379"],
      ["Blk 102", "43381"],
      ["Opp Blk 102", "43389"],
      ["Bt Batok CC", "43391"],
      ["Opp Blk 120", "43399"],
      ["Bt Batok Polyclinic", "43401"],
      ["Opp Blk 127", "43409"],
      ["Opp Blk 628", "43411"],
      ["Aft Bt Batok Stn/Blk 628", "43419"],
      ["Blk 503", "43421"],
      ["Blk 240", "43429"],
      ["Opp Blk 242", "43431"],
      ["Blk 242", "43439"],
      ["Opp Blk 258", "43441"],
      ["Blk 258", "43449"],
      ["AFT BT BATOK WEST AVE 3", "43452"],
      ["BEF PIE", "43453"],
      ["Aft PIE", "43459"],
      ["Aft Bt Batok West Ave 5", "43461"],
      ["Bef Bt Batok West Ave 5", "43469"],
      ["Blk 306", "43471"],
      ["Opp Blk 305", "43479"],
      ["Blk 315", "43481"],
      ["Opp Blk 315", "43489"],
      ["Blk 331", "43491"],
      ["Blk 419", "43499"],
      ["Opp Blk 291E", "43501"],
      ["Blk 291E", "43509"],
      ["Bt Batok Swim Cplx", "43511"],
      ["Opp Bt Batok Swim Cplx", "43519"],
      ["Bt Batok Driving Ctr", "43521"],
      ["Opp Bt Batok Driving Ctr", "43529"],
      ["Blk 140", "43531"],
      ["Opp Blk 140", "43539"],
      ["Blk 510", "43541"],
      ["Regent Hts", "43549"],
      ["Opp Bt Gombak Stadium", "43561"],
      ["Bt Gombak Stadium", "43569"],
      ["Opp Bt Gombak Stn", "43571"],
      ["Bt Gombak Stn", "43579"],
      ["Blk 347", "43581"],
      ["Opp Blk 347", "43589"],
      ["Opp Bt View Sec Sch", "43591"],
      ["Bt View Sec Sch", "43599"],
      ["Opp Blk 532", "43601"],
      ["Blk 531", "43609"],
      ["Blk 290H", "43611"],
      ["Blk 289E", "43619"],
      ["Opp Parkview Apts", "43621"],
      ["St. Andrew's Mission Sch", "43629"],
      ["Ppis Bt Batok", "43631"],
      ["Opp Ppis Bt Batok", "43639"],
      ["Opp HomeTeamNS", "43641"],
      ["HomeTeamNS", "43649"],
      ["St. Anthony's Pr Sch", "43659"],
      ["Blk 406", "43669"],
      ["Opp Dunearn Sec Sch", "43671"],
      ["Blk 402", "43679"],
      ["BT BATOK HME FOR THE AGED", "43681"],
      ["Blk 190", "43691"],
      ["Blk 298", "43699"],
      ["Blk 225", "43701"],
      ["Blk 644", "43709"],
      ["MINDEF CP", "43719"],
      ["Blk 319", "43721"],
      ["Opp Blk 217", "43731"],
      ["Blk 217", "43739"],
      ["Bt View Sec Sch", "43741"],
      ["Opp Bt View Sec Sch", "43749"],
      ["Opp Blk 443D", "43751"],
      ["Blk 443D", "43759"],
      ["Opp Dulwich Coll", "43761"],
      ["Dulwich Coll/Blk 445", "43769"],
      ["Opp Blk 433B", "43771"],
      ["Blk 433C", "43779"],
      ["Opp Blk 437A", "43781"],
      ["BLK 436A", "43789"],
      ["Blk 432A", "43799"],
      ["Ren Ci @ Bt Batok St 52", "43801"],
      ["Blk 514", "43809"],
      ["Bef Summerhill", "43811"],
      ["Hillview Green", "43819"],
      ["Opp Symphony Hts", "43821"],
      ["Symphony Hts", "43829"],
      ["Blk 334", "43831"],
      ["Opp Blk 336", "43839"],
      ["Blk 324", "43841"],
      ["AFT DAIRY FARM CRES", "43891"],
      ["BEF DAIRY FARM CRES", "43899"],
      ["AFT DAIRY FARM HTS", "43961"],
      ["BEF DAIRY FARM HTS", "43969"],
      ["OPP BLK 635A", "43991"],
      ["Choa Chu Kang Int", "44009"],
      ["Opp The Linear", "44011"],
      ["The Linear", "44019"],
      ["Bt Panjang Stn Exit B", "44021"],
      ["Bt Panjang Stn Exit A/Lrt", "44029"],
      ["Aft Bt Panjang Stn", "44031"],
      ["Junction 10", "44041"],
      ["Opp Junction 10", "44049"],
      ["Opp Blk 632 CP", "44051"],
      ["Blk 632 CP", "44059"],
      ["Bef Yew Tee Flyover", "44061"],
      ["Aft KJE Slip Rd", "44069"],
      ["Blk 464", "44071"],
      ["Opp Blk 464", "44079"],
      ["Blk 296A", "44081"],
      ["Opp Blk 296A", "44089"],
      ["Bef Choa Chu Kang Mkt", "44091"],
      ["Opp Choa Chu Kang Mkt", "44099"],
      ["Aft Hong San Terr", "44101"],
      ["Opp Hong San Terr", "44109"],
      ["Opp Blk 203", "44111"],
      ["Blk 204", "44119"],
      ["Blk 113", "44121"],
      ["Opp Blk 113", "44129"],
      ["Blk 26", "44131"],
      ["Opp Blk 26", "44139"],
      ["Phoenix Stn", "44141"],
      ["Opp Phoenix Stn", "44149"],
      ["Opp Bt Batok Fire Stn", "44151"],
      ["Bt Batok Fire Stn", "44159"],
      ["Aft Bt Batok West Ave 5", "44161"],
      ["Bef Bt Batok West Ave 5", "44169"],
      ["Bef Bt Batok West Ave 5", "44171"],
      ["Aft Bt Batok West Ave 5", "44179"],
      ["Blk 802B", "44181"],
      ["Blk 803", "44189"],
      ["Opp Blk 171", "44191"],
      ["Blk 171", "44199"],
      ["Aft Petir Stn", "44201"],
      ["Opp Petir Stn", "44209"],
      ["Blk 127", "44211"],
      ["Bet Blks 139/140", "44219"],
      ["Opp Pending Stn", "44221"],
      ["Bef Pending Stn", "44229"],
      ["Zhenghua Pr Sch", "44231"],
      ["Opp Zhenghua Pr Sch", "44239"],
      ["Opp Lompang Rd", "44241"],
      ["Blk 174", "44249"],
      ["Bt Panjang Stn/Blk 604", "44251"],
      ["Blk 183", "44259"],
      ["Blk 270", "44261"],
      ["Blk 223", "44269"],
      ["Bet Blks 13/14", "44271"],
      ["Blk 157", "44279"],
      ["Blk 8", "44281"],
      ["Blk 6", "44289"],
      ["Opp Cck Polyclinic", "44291"],
      ["Cck Polyclinic", "44299"],
      ["Opp Blk 271", "44301"],
      ["Opp Blk 253", "44311"],
      ["Opp Bangkit Stn", "44321"],
      ["Bangkit Stn", "44329"],
      ["Blk 239", "44331"],
      ["Blk 442D", "44339"],
      ["Blk 401A CP", "44341"],
      ["Bet Blks 443A/443B", "44349"],
      ["Aft Chestnut Ave", "44351"],
      ["Bef Chestnut Ave", "44359"],
      ["Opp Dairy Farm Mall", "44361"],
      ["Dairy Farm Mall", "44369"],
      ["Blk 219", "44371"],
      ["Opp Blk 219", "44379"],
      ["Blk 202", "44381"],
      ["Opp Blk 201", "44389"],
      ["Aft Blk 202", "44391"],
      ["Opp Blk 210", "44399"],
      ["Blk 108", "44411"],
      ["Blk 25", "44421"],
      ["Blk 9", "44439"],
      ["Blk 239", "44441"],
      ["Palm Gdns", "44449"],
      ["Bef South View Stn", "44451"],
      ["Opp South View Stn", "44459"],
      ["Blk 352", "44461"],
      ["Blk 414", "44469"],
      ["Blk 234", "44471"],
      ["Blk 206", "44479"],
      ["Blk 223", "44481"],
      ["Blk 220", "44489"],
      ["Bet Blks 416/417", "44491"],
      ["Blk 429A Cp", "44499"],
      ["Blk 426", "44501"],
      ["Blk 442", "44509"],
      ["Blk 289", "44511"],
      ["Blk 408", "44519"],
      ["Blk 280", "44521"],
      ["Blk 410", "44529"],
      ["Opp Choa Chu Kang Stn", "44531"],
      ["Lot 1/Choa Chu Kang Stn", "44539"],
      ["Northvale Condo", "44541"],
      ["Opp Northvale Condo", "44549"],
      ["Opp Blk 486", "44551"],
      ["Blk 483", "44559"],
      ["Opp Blk 295", "44561"],
      ["Blk 295", "44569"],
      ["Blk 297D", "44571"],
      ["Aft Blk 272", "44579"],
      ["Blk 489A", "44581"],
      ["Opp Blk 489A", "44589"],
      ["Blk 490B", "44591"],
      ["Bet Blks 801B/801C", "44599"],
      ["Blk 413", "44601"],
      ["Blk 408", "44609"],
      ["Blk 516", "44611"],
      ["Blk 506", "44619"],
      ["Opp Concord Pr Sch", "44621"],
      ["Blk 457", "44629"],
      ["Opp Bt Panjang Plaza", "44631"],
      ["Bt Panjang Plaza", "44639"],
      ["Blk 602", "44641"],
      ["Blk 541A CP", "44649"],
      ["Blk 617", "44651"],
      ["Blk 537A CP", "44659"],
      ["Blk 532", "44661"],
      ["Opp Blk 532", "44669"],
      ["Bet Blks 502/503", "44671"],
      ["Opp Blk 502", "44679"],
      ["Sunshine Pl", "44689"],
      ["BLK 485", "44691"],
      ["BLK 457", "44699"],
      ["Blk 548B", "44701"],
      ["Blk 547C", "44709"],
      ["Opp Jelapang Stn", "44721"],
      ["Opp Blk 180", "44731"],
      ["Blk 180", "44739"],
      ["Fajar Stn", "44771"],
      ["Opp Fajar Stn", "44779"],
      ["West View Pr Sch", "44791"],
      ["Blk 610", "44799"],
      ["Opp Blk 628", "44801"],
      ["Blk 628", "44809"],
      ["Senja FC", "44811"],
      ["Opp West Spring Sec Sch", "44819"],
      ["Blk 651", "44821"],
      ["Opp Blk 650", "44829"],
      ["BLK 519", "44831"],
      ["West Spring Pri Sch", "44839"],
      ["Maysprings Condo", "44859"],
      ["BLK 636A", "44861"],
      ["Bef Blk 629A Cp", "44869"],
      ["Blk 810 CP", "44871"],
      ["Opp Blk 810 CP", "44879"],
      ["BLK 816B", "44881"],
      ["Opp Blk 816A", "44889"],
      ["APSN", "44891"],
      ["Opp APSN", "44899"],
      ["Blk 184", "44909"],
      ["BLK 450", "44911"],
      ["Opp Blk 451", "44919"],
      ["Opp Greenridge Sec Sch", "44921"],
      ["Greenridge Sec Sch", "44929"],
      ["Blk 643 CP", "44931"],
      ["OPP BLK 502", "44941"],
      ["AFT BLK 503", "44949"],
      ["Blk 638A", "44951"],
      ["Blk 643A", "44959"],
      ["Aft Teck Whye Walk", "44969"],
      ["Gali Batu Ter", "44989"],
      ["Bef Yew Tee Flyover", "44999"],
      ["BT PANJANG INT", "45009"],
      ["Aft Yew Tee Flyover", "45011"],
      ["Aft Yew Tee Flyover", "45019"],
      ["Heavy Veh Pk", "45021"],
      ["Opp Heavy Veh Pk", "45029"],
      ["Yew Tee Ind Est", "45031"],
      ["Opp Yew Tee Ind Est", "45039"],
      ["Thong Huat Bros Pte Ltd", "45041"],
      ["Opp Yew Tee Ind Est Blk 1", "45049"],
      ["Da Di Glass", "45051"],
      ["Opp Da Di Glass", "45059"],
      ["Opp Mandai Est", "45061"],
      ["Aft Mandai Est", "45069"],
      ["Bef Mandai Rd", "45071"],
      ["Aft Mandai Rd", "45079"],
      ["Opp Jln Bumbong", "45091"],
      ["Aft Jln Bumbong", "45099"],
      ["Aft LP 234", "45101"],
      ["Bef Jln Bumbong", "45109"],
      ["Opp Kranji War Memorial", "45111"],
      ["Kranji War Memorial", "45119"],
      ["Opp S'pore Turf Club", "45121"],
      ["S'pore Turf Club", "45129"],
      ["Opp Kranji Stn", "45131"],
      ["Kranji Stn", "45139"],
      ["Aft W'Lands Rd", "45141"],
      ["Bef W'Lands Rd", "45149"],
      ["Opp Multistates Trading", "45151"],
      ["Multistates Trading", "45159"],
      ["Eurokars Ctr", "45161"],
      ["Opp Eurokars Ctr", "45169"],
      ["Sri Arasakesari Sivan Tp", "45171"],
      ["Sri Arasakesari Sivan Tp", "45179"],
      ["Opp Mandai CD Trg Village", "45181"],
      ["Mandai CD Trg Village", "45189"],
      ["Opp Mandai Police Trg Camp", "45191"],
      ["Mandai Police Trg Camp", "45199"],
      ["Opp Police Tactical Trg Camp", "45201"],
      ["Police Tactical Trg Camp", "45209"],
      ["Bef BKE", "45211"],
      ["Aft W'Lands Rd", "45221"],
      ["Bef W'Lands Rd", "45229"],
      ["Blk 432", "45231"],
      ["Bet Blks 306/307", "45239"],
      ["Opp Blk 511A", "45241"],
      ["Blk 511A", "45249"],
      ["Opp Kranji Sec Sch", "45251"],
      ["Blk 523", "45259"],
      ["Blk 551", "45261"],
      ["Blk 544", "45269"],
      ["Blk 560", "45271"],
      ["Blk 563", "45279"],
      ["Opp Blk 704", "45291"],
      ["Blk 702", "45299"],
      ["Blk 708", "45301"],
      ["Blk 754", "45309"],
      ["Blk 547", "45311"],
      ["Blk 530", "45319"],
      ["Yew Tee Stn", "45321"],
      ["Opp Yew Tee Stn", "45329"],
      ["Blk 625", "45339"],
      ["Opp Blk 604A", "45349"],
      ["Blk 634", "45351"],
      ["Blk 790", "45359"],
      ["Opp Blk 765", "45361"],
      ["Blk 765", "45369"],
      ["Opp Yew Mei Green Condo", "45371"],
      ["Yew Mei Green Condo", "45379"],
      ["Blk 619", "45389"],
      ["Regent Gr Condo", "45399"],
      ["Blk 681", "45401"],
      ["Opp Blk 670", "45411"],
      ["Blk 689A", "45421"],
      ["Opp Blk 661", "45439"],
      ["Opp Eng Hua Furniture Mfg Pte Ltd", "45441"],
      ["Eng Hua Furniture Mfg Pte Ltd", "45449"],
      ["Blk 293", "45451"],
      ["Blk 540", "45461"],
      ["Blk 537", "45469"],
      ["BEF CHOA CHU KANG LK", "45489"],
      ["BEF CHOA CHU KANG NTH 5", "45491"],
      ["BLK 325", "45581"],
      ["Opp Blk 325", "45589"],
      ["Fuchun CC", "45591"],
      ["Opp Fuchun CC", "45599"],
      ["Woodlands Int", "46008"],
      ["Woodlands Int", "46009"],
      ["Blk 188A", "46011"],
      ["Aft W'Lands Ctr Rd", "46019"],
      ["Bef W'Lands Ind Pk D St 2", "46021"],
      ["Aft W'Lands Ind Pk D St 2", "46029"],
      ["Kranji Lodge 1", "46031"],
      ["Opp Kranji Lodge 1", "46039"],
      ["Opp Globalfoundries", "46041"],
      ["Globalfoundries", "46049"],
      ["Bef BKE", "46051"],
      ["Globalfoundries/Aft Bke", "46059"],
      ["W'Lands Train Checkpt", "46069"],
      ["Blk 137", "46071"],
      ["Opp Blk 137", "46079"],
      ["Blk 25", "46088"],
      ["Bef Bke", "46091"],
      ["W'Lands Checkpt", "46101"],
      ["W'Lands Checkpt", "46109"],
      ["Blk 23", "46111"],
      ["Marsiling CC", "46119"],
      ["Opp Marsiling Lane Mkt/Fc", "46121"],
      ["Marsiling Lane Mkt/Fc", "46129"],
      ["Aft Marsiling Lane", "46131"],
      ["Aft Riverside Rd", "46139"],
      ["Blk 32", "46141"],
      ["Blk 203", "46149"],
      ["Blk 212", "46151"],
      ["Blk 206", "46159"],
      ["GES S'pore", "46161"],
      ["Opp GES", "46169"],
      ["Opp Blk 19", "46171"],
      ["Blk 18", "46179"],
      ["Opp Blk 12", "46181"],
      ["Blk 12", "46189"],
      ["Opp Blk 120", "46191"],
      ["Blk 120", "46199"],
      ["Blk 10", "46201"],
      ["Blk 2", "46209"],
      ["Johor Bahru Checkpt", "46211"],
      ["Johor Bahru Checkpt", "46219"],
      ["Opp Casablanca", "46221"],
      ["Casablanca", "46229"],
      ["Larkin Ter", "46239"],
      ["Opp Blk 15", "46241"],
      ["Blk 15", "46249"],
      ["Riverside Sec Sch", "46251"],
      ["Blk 808", "46261"],
      ["Republic Poly", "46269"],
      ["Opp Blk 802", "46271"],
      ["Blk 803", "46279"],
      ["Blk 825", "46281"],
      ["Blk 891C CP", "46289"],
      ["Blk 106", "46291"],
      ["Opp Blk 106", "46299"],
      ["Progen Bldg", "46301"],
      ["Opp Progen Bldg", "46309"],
      ["Blk 18", "46311"],
      ["Opp Blk 18", "46319"],
      ["W'Lands Civic Ctr", "46321"],
      ["Opp W'Lands Civic Ctr", "46329"],
      ["Blk 511", "46331"],
      ["Bef W'Lands Stn Exit 7", "46339"],
      ["Rosewood", "46341"],
      ["Aft Blk 353", "46349"],
      ["WOODHAVEN", "46351"],
      ["Aft Blk 336", "46359"],
      ["Blk 425", "46361"],
      ["Blk 413", "46369"],
      ["Blk 406", "46371"],
      ["Blk 409", "46379"],
      ["Opp W'Lands Ind Pk D St 1", "46381"],
      ["Aft W'Lands Ind Pk D St 1", "46389"],
      ["Blk 853", "46391"],
      ["Aft 888 Plaza", "46399"],
      ["Blk 864", "46401"],
      ["Blk 701A CP", "46409"],
      ["Blk 869", "46411"],
      ["Evergreen Pr Sch", "46419"],
      ["Evergreen Sec Sch", "46421"],
      ["Blk 856", "46429"],
      ["Blk 840", "46431"],
      ["Blk 880", "46439"],
      ["Blk 816", "46441"],
      ["Blk 875", "46449"],
      ["Opp Blk 872", "46451"],
      ["Blk 872", "46459"],
      ["Opp Blk 757A CP", "46461"],
      ["Blk 759", "46469"],
      ["Opp Blk 773", "46471"],
      ["Blk 774", "46479"],
      ["Aft Woodlands Ind Pk E6", "46481"],
      ["Aft Gambas Ave", "46489"],
      ["Blk 402", "46491"],
      ["Opp Blk 402", "46499"],
      ["Opp Marsiling Pk", "46501"],
      ["Marsiling Pk", "46509"],
      ["Marsiling Pr Sch", "46511"],
      ["Opp Blk 144", "46519"],
      ["Marsiling Stn", "46521"],
      ["Opp Marsiling Stn", "46529"],
      ["Blk 173", "46531"],
      ["Blk 320", "46539"],
      ["Marsiling Mall", "46541"],
      ["Blk 347", "46549"],
      ["Blk 101", "46551"],
      ["Opp Blk 101", "46559"],
      ["Blk 183C", "46561"],
      ["Blk 178", "46569"],
      ["Blk 182", "46571"],
      ["Blk 154", "46579"],
      ["Blk 189B", "46581"],
      ["Blk 146", "46589"],
      ["Blk 303", "46591"],
      ["Fuchun Sec Sch", "46611"],
      ["Opp Fuchun Sec Sch", "46619"],
      ["Blk 335", "46621"],
      ["The Woodgrove", "46629"],
      ["W'Lands Stn Exit 5", "46631"],
      ["W'Lands Stn Exit 4", "46639"],
      ["Blk 894C", "46641"],
      ["Blk 515", "46649"],
      ["Blk 550", "46651"],
      ["Opp Blk 550", "46659"],
      ["Opp Blk 896B", "46661"],
      ["W'Lands Pr Sch", "46669"],
      ["Bef 888 Plaza", "46671"],
      ["Opp 888 Plaza", "46679"],
      ["Blk 899A", "46681"],
      ["Blk 609", "46689"],
      ["Opp 888 Plaza", "46691"],
      ["888 Plaza", "46699"],
      ["Aft Blk 1", "46709"],
      ["Bef W'lands Ind Pk E3", "46711"],
      ["Aft W'lands Ind Pk E3", "46719"],
      ["Bef W'Lands Ind Pk E7", "46721"],
      ["Aft W'Lands Ind Pk E7", "46729"],
      ["Yew Huat Scaffolding Work", "46731"],
      ["BLK 782", "46739"],
      ["Seagate", "46741"],
      ["Opp Seagate", "46749"],
      ["BLK 676A", "46759"],
      ["Blk 706", "46761"],
      ["Blk 666", "46769"],
      ["Opp Admiralty Stn", "46771"],
      ["Admiralty Stn", "46779"],
      ["Bef Admiralty Pr Sch", "46781"],
      ["Opp Admiralty Pr Sch", "46789"],
      ["Blk 722", "46791"],
      ["Blk 786A CP", "46799"],
      ["Aft W'Lands Mart", "46801"],
      ["Opp W'Lands Mart", "46809"],
      ["Blk 726", "46811"],
      ["Blk 713", "46821"],
      ["Blk 747A CP", "46831"],
      ["Opp Blk 739A CP", "46841"],
      ["Blk 664", "46851"],
      ["Blk 608A", "46859"],
      ["Opp Blk 624B", "46861"],
      ["Blk 628A", "46869"],
      ["Blk 644", "46871"],
      ["Blk 637", "46879"],
      ["Old Chang Kee Bldg", "46881"],
      ["Jordon Food Ind", "46891"],
      ["Blk 15", "46901"],
      ["Opp Blk 20", "46911"],
      ["Opp Blk 22", "46921"],
      ["Opp W'Lands Spectrum 1", "46931"],
      ["Opp Nylect Engrg", "46941"],
      ["Blk 536A", "46951"],
      ["Blk 547", "46961"],
      ["Blk 532", "46969"],
      ["Woodgrove Pr Sch", "46971"],
      ["Opp Blk 507", "46979"],
      ["W'lands Sth Stn Exit 2", "46981"],
      ["W'lands Sth Stn Exit 1", "46989"],
      ["Blk 589", "46991"],
      ["Opp Blk 589", "46999"],
      ["Woodlands Temp Int", "47009"],
      ["Bef W'Lands Waterfront Pk", "47011"],
      ["Aft W'Lands Waterfront Pk", "47019"],
      ["Khalsa Crescent Drug Rehab Ctr", "47021"],
      ["Opp Khalsa Crescent Drug Rehab Ctr", "47029"],
      ["Bef Keramat Rd", "47031"],
      ["Aft View Rd", "47039"],
      ["Opp W'Lands Auto Hub", "47041"],
      ["W'Lands Auto Hub", "47049"],
      ["Aft W'Lands Ind Pk E4", "47051"],
      ["Bef W'Lands Ind Pk E4", "47059"],
      ["Aft Attap Valley Rd", "47061"],
      ["Nth Tech", "47069"],
      ["Bef British American Tobacco", "47071"],
      ["Opp British American Tobacco", "47079"],
      ["Aft Senoko Cres", "47081"],
      ["Aft Senoko Dr", "47089"],
      ["Bef Senoko Cres", "47091"],
      ["MASTERDON", "47099"],
      ["Aft Senoko Ave", "47101"],
      ["Maxsteel Enterprise", "47109"],
      ["Bef Senoko Way", "47111"],
      ["Aft Senoko Way", "47119"],
      ["Opp Lian Aik Siong Machinery", "47121"],
      ["Lian Aik Siong Machinery", "47129"],
      ["Fuji Oil S'Pore", "47131"],
      ["Bef Sc Auto", "47141"],
      ["Aft Scania S'Pore", "47151"],
      ["CHUAN LIM CONSTRN", "47169"],
      ["Comfortdelgro Engrg", "47179"],
      ["TAK Products & Svcs", "47189"],
      ["Bef Senoko Dr", "47199"],
      ["W'lands Nth Stn", "47201"],
      ["TWIN FOUNTAINS", "47491"],
      ["OPP TWIN FOUNTAINS", "47499"],
      ["Opp Blk 583", "47501"],
      ["BLK 583", "47509"],
      ["Blk 554", "47511"],
      ["Opp Blk 575", "47521"],
      ["BLK 573A", "47529"],
      ["Opp Woodgrove Sec Sch", "47539"],
      ["Blk 639", "47541"],
      ["Opp Blk 639", "47549"],
      ["Blk 630", "47551"],
      ["Opp Blk 630", "47559"],
      ["Blk 620", "47561"],
      ["Opp Blk 620", "47569"],
      ["Blk 618", "47571"],
      ["Blk 556", "47579"],
      ["Opp Blk 521", "47581"],
      ["Blk 519A CP", "47589"],
      ["Bef Admiralty Stn/Blk 680", "47591"],
      ["Blk 683A", "47599"],
      ["Blk 793", "47601"],
      ["Opp Blk 793", "47609"],
      ["Northoaks Condo", "47611"],
      ["Blk 688 CP", "47619"],
      ["Aft Gambas Ave", "47621"],
      ["Seagate", "47629"],
      ["Blk 681A", "47641"],
      ["Opp Blk 681B", "47649"],
      ["Blk 684B", "47651"],
      ["Blk 685A", "47659"],
      ["Blk 788E", "47661"],
      ["Opp Admiralty Sec Sch", "47671"],
      ["Woodsvale Condo", "47681"],
      ["JB Sentral Bus Ter", "47711"],
      ["Opp Christ Ch Sec Sch", "47731"],
      ["Blk 562A", "47739"],
      ["Woodlands Health Campus", "47749"],
      ["Blk 691D", "47751"],
      ["Blk 694C", "47759"],
      ["Opp North Link Bldg", "47801"],
      ["North Link Bldg", "47809"],
      ["W'Lands Sunny Food", "47811"],
      ["Opp W'Lands Sunny Food", "47819"],
      ["Opp Sumitomo Bakelite S'pore", "47821"],
      ["Sumitomo Bakelite S'pore", "47829"],
      ["Opp Mandai Camp 2", "48011"],
      ["Mandai Camp 2", "48019"],
      ["Aft Mandai Lake Rd", "48021"],
      ["Bef Mandai Lake Rd", "48029"],
      ["LP 162", "48031"],
      ["LP 159", "48039"],
      ["Aft Jln Ulu Sembawang", "48041"],
      ["Bef Jln Ulu Sembawang", "48049"],
      ["Mandai Agrotech Pk", "48051"],
      ["Opp Mandai Agrotech Pk", "48059"],
      ["Bef Mandai Ave", "48061"],
      ["Aft Mandai Ave", "48069"],
      ["Mandai Crematorium", "48071"],
      ["Opp Mandai Crematorium", "48079"],
      ["Opp Upp Seletar Resvr", "48081"],
      ["Upp Seletar Resvr", "48089"],
      ["SCDF Nee Soon Camp", "48091"],
      ["Opp SCDF Nee Soon Camp", "48099"],
      ["Aft Meng Suan Rd", "48101"],
      ["Opp Meng Suan Rd", "48109"],
      ["Opp Bird Paradise", "48111"],
      ["Bird Paradise", "48119"],
      ["S'Pore Zoo", "48131"],
      ["Opp Mandai Crematorium & Columbarium", "48141"],
      ["Mandai Crematorium & Columbarium", "48149"],
      ["Opp Kim Hock Corp Pte Ltd", "49011"],
      ["Kim Hock Corp Pte Ltd", "49019"],
      ["Whye Wah Devt & Constrn", "49021"],
      ["Sit Ley Timber", "49029"],
      ["Opp Crown Alliance Industries", "49031"],
      ["Asia Rattan Trading Co", "49039"],
      ["DHdeco Pte Ltd", "49041"],
      ["Sim Hup Co", "49049"],
      ["Aft Sg Kadut Eating Hse", "49051"],
      ["Aft LCS Optiroc Pte Ltd", "49059"],
      ["Poh Cheong Concrete Products", "49061"],
      ["Tropical Furniture Ltd", "49069"],
      ["Opp Wason Wood Ind", "49071"],
      ["Wason Wood Ind", "49079"],
      ["Aft Kranji Cres", "49081"],
      ["Bef Kranji Cres", "49089"],
      ["Opp Kranji Wtr Reclam Plt", "49091"],
      ["Aft Kranji Wtr Reclam Plt", "49099"],
      ["Opp Ordinance Supply Base", "49101"],
      ["Kranji Wtr Reclam Plt", "49109"],
      ["Aft Jln Lam Huat", "49111"],
      ["Blk 2", "49119"],
      ["Aft SMRT Buses Kranji Depot", "49121"],
      ["Lip Guan Ind", "49129"],
      ["Tan Chiang Bros Marble", "49131"],
      ["Bef Sg Kadut Way", "49139"],
      ["Ctrl Granite Ind", "49141"],
      ["Aft Kranji Lk", "49149"],
      ["Daiya Engrg", "49151"],
      ["Aft Sg Kadut Dr", "49159"],
      ["OPP SHINGDA CONSTRN", "49171"],
      ["Aft Kranji Cres", "49179"],
      ["Dapolite Ind", "49181"],
      ["Aft Kranji Rd", "49189"],
      ["Kranji Reservoir Pk B", "49199"],
      ["Sg Buloh Wetland Reserve", "49209"],
      ["PUB Quarter", "49211"],
      ["Opp PUB Quarter", "49219"],
      ["Long Kuan Hung Crocodile Farm", "49229"],
      ["Opp Nyee Phoe Group", "49239"],
      ["Aft Neo Tiew Rd", "49249"],
      ["TimMac @ Kranji", "49251"],
      ["Opp TimMac @ Kranji", "49259"],
      ["Opp Parish Of Christ Ch", "50011"],
      ["Parish Of Christ Ch", "50019"],
      ["United Sq/Bef Novena Stn", "50021"],
      ["Opp United Sq", "50029"],
      ["Opp Novena Ch", "50031"],
      ["Bef Novena Stn Exit B", "50037"],
      ["Novena Stn", "50038"],
      ["Novena Lodge", "50041"],
      ["Opp Novena Lodge", "50049"],
      ["Thomson Med Ctr", "50051"],
      ["Opp Thomson Med Ctr", "50059"],
      ["Opp Hotel Royal", "50061"],
      ["Hotel Royal", "50069"],
      ["Bef Carlisle Rd", "50071"],
      ["Opp Carlisle Rd", "50079"],
      ["Pek Kio Mkt", "50081"],
      ["Blk 51/Opp Pek Kio Mkt", "50089"],
      ["Revival Ctr Ch", "50111"],
      ["St. Joseph Instn Jnr", "50119"],
      ["Natl Skin Ctr", "50121"],
      ["Opp Natl Skin Ctr", "50129"],
      ["Bef Kim Keat Lane", "50159"],
      ["Bef Jln Dusun", "50161"],
      ["Aft Irrawaddy Rd", "50169"],
      ["Zhongshan Mall", "50171"],
      ["Opp Zhongshan Mall", "50179"],
      ["Opp Public Mansion", "50189"],
      ["Bef Balestier Plaza", "50191"],
      ["Opp Shaw Plaza", "50199"],
      ["Shaw Plaza", "50201"],
      ["Aft Pegu Rd", "50209"],
      ["Opp Balestier Pt", "50211"],
      ["Bef Blk 104", "50221"],
      ["Opp Blk 104", "50229"],
      ["Northlight Sch", "50231"],
      ["S'pore Indian Assn", "50239"],
      ["Opp S'pore Khalsa Assn", "50241"],
      ["S'pore Khalsa Assn", "50249"],
      ["Farrer Pk Stn Exit A", "50251"],
      ["Opp Farrer Pk Stn", "50259"],
      ["Kentish Lodge", "50261"],
      ["Farrer Pk Stn Exit D", "50279"],
      ["Kentish Green", "50301"],
      ["Aft Gloucester Rd", "50321"],
      ["Blk 122", "50331"],
      ["Blk 107", "50349"],
      ["Farrer Pk Tennis Ctr", "50351"],
      ["Blk 82", "50991"],
      ["Opp Tan Tong Meng Twr", "51011"],
      ["Thomson Flyover", "51019"],
      ["Old Police Acad", "51021"],
      ["After Mount Pleasant Road", "51023"],
      ["Opp Old Police Acad", "51029"],
      ["S'pore Polo Club", "51031"],
      ["Opp S'pore Polo Club", "51039"],
      ["SLF Cplx", "51049"],
      ["AFT ANDREW RD", "51051"],
      ["AFT TOA PAYOH RISE", "51059"],
      ["Mt Alvernia Hosp", "51069"],
      ["MacRitchie Resvr", "51071"],
      ["Opp MacRitchie Resvr", "51079"],
      ["Opp Marymount Convent Sch", "51081"],
      ["Marymount Convent Sch", "51089"],
      ["Opp Catholic JC", "51091"],
      ["Catholic JC", "51099"],
      ["Bef Thomson Flyover", "51101"],
      ["Opp Old Police Acad", "51109"],
      ["Opp Andrew Rd", "51111"],
      ["Bef Andrew Rd", "51119"],
      ["Opp Braddell View", "51131"],
      ["Braddell View", "51139"],
      ["Blk 131B", "51199"],
      ["Toa Payoh Int", "52009"],
      ["Opp Raffles Girls' Sch", "52011"],
      ["Raffles Girls' Sch", "52019"],
      ["OPP BLK 1004", "52021"],
      ["Blk 1004", "52029"],
      ["OPP BLK 998", "52031"],
      ["Aft Muhajirin Mque", "52039"],
      ["Blk 19", "52049"],
      ["BLK 147", "52051"],
      ["Blk 219", "52059"],
      ["BCA Acad", "52061"],
      ["Comfortdelgro Corp Ltd", "52069"],
      ["Trellis Twrs", "52071"],
      ["Opp Trellis Twrs", "52079"],
      ["Aft Blk 195", "52081"],
      ["Opp Blk 195", "52089"],
      ["Opp NKF", "52099"],
      ["Bet Blks 33/34", "52109"],
      ["Opp Blk 65", "52119"],
      ["Blk 29", "52129"],
      ["Blk 163", "52131"],
      ["Oleander Twrs", "52139"],
      ["Opp Blk 139A", "52141"],
      ["Blk 139A", "52149"],
      ["Blk 131", "52151"],
      ["Blk 128", "52159"],
      ["Braddell Stn/Blk 111", "52161"],
      ["Blk 117", "52169"],
      ["Braddell Stn/Blk 107", "52171"],
      ["Braddell Stn/Blk 106", "52179"],
      ["Opp Toa Payoh Stn", "52181"],
      ["Toa Payoh Stn", "52189"],
      ["Blk 138B", "52191"],
      ["Blk 84B", "52199"],
      ["Blk 121", "52201"],
      ["Blk 101C CP", "52209"],
      ["Lighthouse Sch", "52211"],
      ["Bef Caldecott Stn Exit 3", "52219"],
      ["Opp Jackson Sq", "52221"],
      ["Jackson Sq", "52229"],
      ["Blk 79C", "52231"],
      ["Blk 177", "52239"],
      ["Bef Caldecott Stn/Savh", "52241"],
      ["Aft Caldecott Stn", "52249"],
      ["Chung Hwa Free Clinic", "52251"],
      ["Opp Chung Hwa Free Clinic", "52259"],
      ["Opp Blk 73", "52261"],
      ["Blk 73", "52269"],
      ["Jackson Sq", "52271"],
      ["Blk 56", "52279"],
      ["Blk 68", "52281"],
      ["Blk 34", "52289"],
      ["Blk 59", "52291"],
      ["Blk 50", "52299"],
      ["Blk 35", "52301"],
      ["Opp Blk 35", "52309"],
      ["Blk 23", "52311"],
      ["Blk 25", "52319"],
      ["Aft SAFRA Toa Payoh", "52321"],
      ["Aft Lor 4 Toa Payoh", "52329"],
      ["Blk 27", "52331"],
      ["Opp Blk 26", "52339"],
      ["Pei Chun Public Sch", "52341"],
      ["United Medicare Ctr", "52349"],
      ["Blk 2", "52351"],
      ["Blk 52", "52359"],
      ["Blk 1", "52361"],
      ["Blk 237", "52369"],
      ["First Toa Payoh Pr Sch", "52371"],
      ["Braddell Tech Bldg", "52381"],
      ["Blk 227", "52389"],
      ["Opp Blk 231", "52391"],
      ["Blk 231", "52399"],
      ["Blk 102", "52401"],
      ["Opp Blk 102", "52409"],
      ["Blk 105", "52411"],
      ["Opp Blk 105", "52419"],
      ["Blk 17A", "52429"],
      ["Opp Blk 5", "52439"],
      ["Blk 202", "52441"],
      ["Toa Payoh Police Ctr", "52449"],
      ["Blk 114", "52451"],
      ["Opp EAIM", "52479"],
      ["Toa Payoh Polyclinic", "52481"],
      ["Opp Toa Payoh Polyclinic", "52489"],
      ["St. Michael's Ter", "52499"],
      ["Toa Payoh Swim Cplx", "52501"],
      ["Opp Toa Payoh Swim Cplx", "52509"],
      ["Bef Blk 221", "52529"],
      ["Blk 210 Mkt/FC", "52539"],
      ["Caldecott Stn Exit 4", "52551"],
      ["Caldecott Stn Exit 1", "52559"],
      ["Opp Blk 269A", "52569"],
      ["Blk 259", "52579"],
      ["Bishan Int", "53009"],
      ["ST. THERESA'S HME", "53011"],
      ["OPP ST. THERESA'S HME", "53019"],
      ["Lakeview Estate", "53021"],
      ["Shunfu Est", "53029"],
      ["Thomson CC", "53039"],
      ["Bef Thomson Ridge", "53041"],
      ["Bef Jln Todak", "53049"],
      ["Upp Thomson Stn Exit 5", "53051"],
      ["Upp Thomson Stn Exit 2", "53059"],
      ["Bef Windsor Pk Rd", "53061"],
      ["Aft Windsor Pk Rd", "53069"],
      ["Opp Flame Tree Pk", "53071"],
      ["Flame Tree Pk", "53079"],
      ["Opp Faber Gdn", "53081"],
      ["Faber Gdn", "53089"],
      ["Bef Ang Mo Kio Ave 1", "53091"],
      ["Aft Ang Mo Kio Ave 1", "53099"],
      ["Bef Marymount Lane", "53111"],
      ["Aft Bishan St 21", "53119"],
      ["Marymount Stn", "53121"],
      ["Opp Marymount Stn", "53129"],
      ["Aft Jadescape", "53131"],
      ["Marymount View", "53139"],
      ["Opp Whitley Sec Sch", "53141"],
      ["Whitley Sec Sch", "53149"],
      ["Opp Blk 263A CP", "53151"],
      ["Blk 260", "53159"],
      ["Marymount CC", "53161"],
      ["Blk 254", "53169"],
      ["Blk 23", "53171"],
      ["Sin Ming Plaza", "53179"],
      ["Amtech Bldg", "53181"],
      ["Blk 25", "53189"],
      ["Blk 7 Ind Est", "53191"],
      ["Blk 22A CP", "53199"],
      ["Opp Nea Reg Off", "53201"],
      ["Aft Nea Reg Off", "53209"],
      ["Opp Raffles Instn", "53211"],
      ["Raffles Instn", "53219"],
      ["BLK 115", "53221"],
      ["Blk 501", "53229"],
      ["BISHAN STN", "53231"],
      ["OPP BISHAN STN", "53239"],
      ["OPP BLK 217", "53241"],
      ["BLK 210", "53249"],
      ["BLK 125", "53251"],
      ["Opp Blk 125", "53259"],
      ["Opp Bishan Stadium", "53261"],
      ["Bishan Stadium", "53269"],
      ["Opp Kuo Chuan Presby Sch", "53271"],
      ["Kuo Chuan Presby Sch", "53279"],
      ["Blk 169", "53281"],
      ["Zion Bible Presby Ch", "53289"],
      ["Shunfu Mart", "53291"],
      ["Bef Jadescape", "53299"],
      ["Raffles Instn", "53301"],
      ["Opp Raffles Instn", "53309"],
      ["Opp Bosch", "53311"],
      ["Bosch", "53319"],
      ["Opp Eunoia JC", "53321"],
      ["Eunoia JC", "53329"],
      ["Bef Bright Hill Tp", "53331"],
      ["Opp Bright Hill Tp", "53339"],
      ["Bright Hill Stn Exit 2", "53341"],
      ["Bright Hill Stn Exit 1", "53349"],
      ["Ai Tong Sch", "53351"],
      ["Opp Ai Tong Sch", "53359"],
      ["Blk 454", "53361"],
      ["Opp Blk 454", "53369"],
      ["Blk 257", "53371"],
      ["Blk 245", "53379"],
      ["Bishan Nth Shop Mall", "53381"],
      ["Opp Bishan Nth Shop Mall", "53389"],
      ["Opp Blk 203", "53391"],
      ["Blk 202", "53399"],
      ["Guangyang Sec Sch", "53401"],
      ["Blk 131", "53409"],
      ["Opp Guangyang Pr Sch", "53419"],
      ["BLK 151A MKT", "53421"],
      ["BLK 228", "53439"],
      ["LTA Sin Ming Office", "53509"],
      ["Sin Ming Autocity", "53519"],
      ["Ang Mo Kio Int", "54009"],
      ["Blk 207", "54011"],
      ["Blk 307A", "54019"],
      ["Opp Al-Muttaqin Mque", "54031"],
      ["Bef Al-Muttaqin Mque", "54039"],
      ["Opp Courts Ang Mo Kio", "54041"],
      ["Courts Ang Mo Kio", "54049"],
      ["Bef Ang Mo Kio Ave 5", "54051"],
      ["Bef Ang Mo Kio Lib", "54059"],
      ["Blk 244", "54061"],
      ["Opp Blk 244", "54069"],
      ["Blk 310C", "54071"],
      ["OPP BLK 315", "54079"],
      ["TECK GHEE CT", "54081"],
      ["OPP ANG MO KIO SWIM CPLX", "54089"],
      ["BLK 331", "54091"],
      ["OPP BLK 333", "54099"],
      ["Aft Ang Mo Kio Ave 10", "54101"],
      ["Bef Ang Mo Kio Ave 10", "54109"],
      ["Opp Blk 255", "54161"],
      ["Blk 255", "54169"],
      ["Mayflower Stn Exit 6", "54181"],
      ["Mayflower Stn Exit 5", "54189"],
      ["Mayflower Stn Exit 2", "54191"],
      ["Bef Mayflower Stn Exit 3", "54199"],
      ["OPP BLK 155", "54201"],
      ["BET BLKS 152/155", "54209"],
      ["Mayflower Sec Sch", "54211"],
      ["Opp Mayflower Sec Sch", "54219"],
      ["Opp Ang Mo Kio Pr Sch", "54221"],
      ["Ang Mo Kio Pr Sch", "54229"],
      ["Blk 129", "54231"],
      ["Blk 209", "54239"],
      ["Blk 700B", "54241"],
      ["Blk 322", "54247"],
      ["Blk 324", "54248"],
      ["Aft Grandeur 8", "54251"],
      ["Opp Grandeur 8", "54259"],
      ["Aft Ang Mo Kio Stn Exit A", "54261"],
      ["Opp Ang Mo Kio Stn", "54269"],
      ["Blk 586", "54271"],
      ["Blk 427", "54279"],
      ["Blk 570", "54281"],
      ["Blk 452", "54289"],
      ["Blk 564", "54291"],
      ["Opp Blk 565", "54299"],
      ["Blk 5022", "54301"],
      ["Opp Blk 5022", "54309"],
      ["Blk 332", "54311"],
      ["Opp Christ The King Ch", "54319"],
      ["Blk 354", "54321"],
      ["Blk 420", "54329"],
      ["Blk 346", "54331"],
      ["Blk 422", "54339"],
      ["Opp Blk 504", "54341"],
      ["Blk 504", "54349"],
      ["Nanyang Poly", "54351"],
      ["Blk 502", "54359"],
      ["Opp Blk 4025", "54369"],
      ["Blk 409 Mkt/FC", "54371"],
      ["Blk 475", "54379"],
      ["Blk 443", "54381"],
      ["Blk 465", "54389"],
      ["Aft Ang Mo Kio Int", "54391"],
      ["Bef Ang Mo Kio Stn Exit B", "54399"],
      ["Blk 522", "54401"],
      ["Opp Blk 522", "54409"],
      ["Blk 527", "54411"],
      ["Opp Blk 527", "54419"],
      ["Blk 561", "54429"],
      ["Blk 549", "54439"],
      ["Blk 507", "54441"],
      ["Opp Blk 507", "54449"],
      ["Blk 643", "54451"],
      ["Blk 151", "54459"],
      ["Blk 649", "54461"],
      ["Opp Blk 649", "54469"],
      ["Opp Blk 538", "54471"],
      ["Blk 538", "54479"],
      ["Ite Coll Ctrl", "54481"],
      ["Opp Ite Coll Ctrl", "54489"],
      ["Aft CTE", "54491"],
      ["Bef CTE", "54499"],
      ["Opp AMK Ind Pk 2", "54501"],
      ["Aft Blk 5000", "54509"],
      ["Blk 5032", "54511"],
      ["Extra Space", "54519"],
      ["Blk 5046", "54521"],
      ["Opp Blk 5043", "54529"],
      ["OPP BISHAN PK", "54531"],
      ["BISHAN PK", "54539"],
      ["Blk 532", "54571"],
      ["Blk 540", "54579"],
      ["Blk 574", "54581"],
      ["Blk 555", "54589"],
      ["Opp Blk 5060", "54591"],
      ["Blk 5056", "54599"],
      ["Townsville Pr Sch", "54601"],
      ["Opp Townsville Pr Sch", "54609"],
      ["BLK 220", "54611"],
      ["OPP BLK 220", "54619"],
      ["BLK 223", "54621"],
      ["OPP BLK 223", "54629"],
      ["Bef Ang Mo Kio Ind Pk 2A", "54631"],
      ["Sing Ind Cplx", "54641"],
      ["Opp Techplace 2", "54651"],
      ["Techplace 2", "54659"],
      ["Ang Mo Kio Depot", "55009"],
      ["Bef Lentor Stn Exit 5", "55011"],
      ["Aft Lentor Stn Exit 4", "55019"],
      ["OPP SEASONS PK", "55021"],
      ["SEASONS PK", "55029"],
      ["Opp NCS Hub", "55031"],
      ["NCS Hub", "55039"],
      ["Aft AMK St 64/Apple SG", "55041"],
      ["Bef AMK St 64/Apple SG", "55049"],
      ["Opp ST Electronics", "55051"],
      ["ST Electronics", "55059"],
      ["Bef Econ Medicare Ctr", "55071"],
      ["Aft Econ Medicare Ctr", "55079"],
      ["Opp Sunrise Gdns", "55081"],
      ["Aft Sunrise Gdns", "55089"],
      ["Opp Serenity Pk", "55101"],
      ["Serenity Pk", "55109"],
      ["Blk 180", "55111"],
      ["Blk 617", "55119"],
      ["Opp Blk 604", "55121"],
      ["Blk 604", "55129"],
      ["BLK 612", "55131"],
      ["BLK 641", "55139"],
      ["OPP BLK 622", "55141"],
      ["BLK 622", "55149"],
      ["Ang Mo Kio Comm Hosp", "55151"],
      ["Opp Ang Mo Kio Comm Hosp", "55159"],
      ["Opp Yio Chu Kang Cc", "55169"],
      ["Castle Green", "55171"],
      ["Opp Castle Green", "55179"],
      ["Opp Yio Chu Kang Stn", "55181"],
      ["Yio Chu Kang Stn", "55189"],
      ["Blk 645", "55199"],
      ["Aft Blk 648", "55201"],
      ["Opp Blk 646", "55209"],
      ["Aft Ang Mo Kio Fire Stn", "55211"],
      ["Bef Ang Mo Kio Ave 9", "55219"],
      ["Aft Ang Mo Kio St 62", "55221"],
      ["Bef Ang Mo Kio St 62", "55229"],
      ["Opp Sbst Ang Mo Kio Depot", "55231"],
      ["Sbst Ang Mo Kio Depot", "55239"],
      ["Aft Yio Chu Kang Rd", "55241"],
      ["Bef Yio Chu Kang Rd", "55249"],
      ["Countryside Est", "55251"],
      ["Opp Countryside Est", "55259"],
      ["Bullion Pk Condo", "55261"],
      ["Opp Bullion Pk Condo", "55269"],
      ["Aft SLE", "55281"],
      ["LP 94", "55289"],
      ["AMK Police Div HQ", "55301"],
      ["Opp AMK Police Div HQ", "55309"],
      ["Opp Yio Chu Kang Stadium", "55311"],
      ["Yio Chu Kang Stadium", "55319"],
      ["Opp Nanyang Poly", "55321"],
      ["Nanyang Poly", "55329"],
      ["Aft Lentor Gr", "55331"],
      ["Aft Florissa Pk", "55339"],
      ["Lentor Stn Exit 3", "55341"],
      ["Lentor Stn Exit 5", "55349"],
      ["Opp Fudu Wk P/G", "55351"],
      ["Countryside Gdn P/G", "55361"],
      ["Aft Lentor St", "55371"],
      ["Bef Bullion Pk", "55381"],
      ["Yio Chu Kang Int", "55509"],
      ["Bef adana at thomson", "56011"],
      ["Bef Ang Mo Kio Ave 1", "56019"],
      ["Opp Sembawang Hills FC", "56021"],
      ["Bef Sembawang Hills Fc", "56029"],
      ["Bef Yio Chu Kang Rd", "56031"],
      ["Aft Yio Chu Kang Rd", "56039"],
      ["Opp Meadows @ Peirce", "56041"],
      ["Meadows @ Peirce", "56049"],
      ["Opp Tagore Rd", "56051"],
      ["Bef Tagore Rd", "56059"],
      ["Aft Tagore Dr", "56061"],
      ["Bef Tagore Dr", "56069"],
      ["Bef Old Upp Thomson Rd", "56071"],
      ["Aft Old Upp Thomson Rd", "56079"],
      ["Bef SLE", "56081"],
      ["Aft SLE", "56089"],
      ["Springleaf Stn Exit 3", "56091"],
      ["Springleaf Stn Exit 2", "56099"],
      ["Teachers' Housing Est", "56191"],
      ["Aft Thomson Hills Dr", "56199"],
      ["Aft Munshi Abdullah Ave", "56201"],
      ["Bef Thomson Hills Dr", "56209"],
      ["St. Nicholas Girls'", "56241"],
      ["Opp St. Nicholas Girls'", "56249"],
      ["Opp Horizon Gdns", "56251"],
      ["Horizon Gdns", "56259"],
      ["Aft Ang Mo Kio Ave 2", "56261"],
      ["BEF Ang mo kio avenue 2", "56269"],
      ["Bef Shangri-La Wk", "56289"],
      ["Opp Springleaf Nature Pk", "57011"],
      ["Springleaf Nature Pk", "57019"],
      ["Forest Hills Condo", "57021"],
      ["Aft The Springside", "57029"],
      ["Nee Soon Driclad Ctr", "57031"],
      ["SPIRITUAL GRACE PRESBY CH", "57039"],
      ["Nee Soon HQ 22 SIB", "57041"],
      ["Opp Nee Soon HQ 22 SIB", "57049"],
      ["Aft Sembawang Air Base", "57051"],
      ["Opp Sembawang Air Base", "57059"],
      ["Dieppe Barracks", "57061"],
      ["Opp Dieppe Barracks", "57069"],
      ["Opp Khatib Camp", "57071"],
      ["Khatib Camp", "57079"],
      ["Opp Blk 713", "57081"],
      ["Blk 713", "57089"],
      ["Opp Blk 101", "57111"],
      ["Blk 101", "57119"],
      ["Opp Blk 115B", "57121"],
      ["Blk 114", "57129"],
      ["Opp Jln Kemuning", "57131"],
      ["Aft Jln Kemuning", "57139"],
      ["Bef Upp Thomson Rd", "57141"],
      ["Aft Upp Thomson Rd", "57149"],
      ["Sembawang Int", "58009"],
      ["Opp Sembawang Shop Ctr", "58011"],
      ["Aft Sembawang Shop Ctr", "58019"],
      ["Opp The Nautical", "58021"],
      ["The Nautical", "58029"],
      ["Opp Canberra Dr", "58031"],
      ["Bef Canberra Dr", "58039"],
      ["Blk 590C", "58041"],
      ["Opp Blk 590C", "58049"],
      ["Blk 592C", "58051"],
      ["Opp Blk 592C", "58059"],
      ["Opp Blk 101A", "58061"],
      ["Opp Durban Rd", "58069"],
      ["Bef Jln Basong", "58071"],
      ["Aft Jln Basong", "58079"],
      ["Opp Jln Janggus", "58081"],
      ["Aft Andrews Ave", "58089"],
      ["Sembawang Pk", "58091"],
      ["Opp Sembawang Pk", "58099"],
      ["Blk 311", "58101"],
      ["Opp Blk 311", "58109"],
      ["Blk 351 CP", "58111"],
      ["Blk 502A", "58119"],
      ["Blk 424A CP", "58121"],
      ["Blk 508 CP", "58129"],
      ["Aft Assyafaah Mque", "58131"],
      ["Bef Assyafaah Mque", "58139"],
      ["Sembawang Camp", "58141"],
      ["Opp Sembawang Shipyard G 8", "58149"],
      ["Bef Sembawang Stn", "58151"],
      ["Aft Admiral Hill", "58159"],
      ["Bef Sembawang Shipyard G 3", "58161"],
      ["Aft HomeTeamNS Sembawang Resort", "58169"],
      ["Sembawang Corp Industries", "58171"],
      ["Opp Sembawang Corp Industries", "58179"],
      ["Police Drv Circuit", "58181"],
      ["Opp Police Drv Circuit", "58189"],
      ["Aft Wellington Rd", "58191"],
      ["OPP AUCKLAND ROAD WEST", "58199"],
      ["Aft Queen'S Ave", "58201"],
      ["Aft Pakistan Rd", "58209"],
      ["Sembawang Stn", "58211"],
      ["Opp Sembawang Stn", "58219"],
      ["Blk 339 CP", "58221"],
      ["Blk 358A CP", "58229"],
      ["Sembawang Int/Opp Blk 315", "58241"],
      ["Blk 309", "58249"],
      ["Sun Plaza/Sembawang Stn", "58251"],
      ["Opp Sun Plaza", "58259"],
      ["VISIONAIRE", "58261"],
      ["OPP VISIONAIRE", "58269"],
      ["Blk 335", "58271"],
      ["Opp Blk 336A CP", "58279"],
      ["Sembawang Sec Sch", "58281"],
      ["Opp Sembawang Sec Sch", "58289"],
      ["Blk 317", "58291"],
      ["Blk 328", "58299"],
      ["3M Bldg", "58301"],
      ["Opp 3M Bldg", "58309"],
      ["Blk 354 CP", "58311"],
      ["Blk 357C", "58319"],
      ["Bet Blks 357/359", "58321"],
      ["Blk 474", "58329"],
      ["Blk 589D", "58331"],
      ["Opp Blk 589D", "58339"],
      ["Blk 405", "58341"],
      ["Blk 478", "58349"],
      ["Blk 483", "58351"],
      ["Opp Blk 484A CP", "58359"],
      ["Nth Link Bldg", "58361"],
      ["BEF ACACIA HME", "58369"],
      ["Bet Blks 325/326", "58371"],
      ["Opp Blk 325", "58379"],
      ["Blk 469B", "58381"],
      ["Opp Blk 469B", "58389"],
      ["Blk 303", "58391"],
      ["Opp Blk 303", "58399"],
      ["Opp Blk 491", "58401"],
      ["Blk 491", "58409"],
      ["Blk 404A CP", "58411"],
      ["Blk 482A CP", "58419"],
      ["Blk 353", "58421"],
      ["Bet Blks 415/416", "58429"],
      ["Blk 567B", "58431"],
      ["Opp Blk 567B", "58439"],
      ["Blk 567A", "58441"],
      ["S'pore Sports Sch", "58449"],
      ["Aft Heavy Veh Pk", "58451"],
      ["Bef Heavy Veh Pk", "58459"],
      ["Innova Pr Sch", "58461"],
      ["Opp Wellington Pr Sch", "58481"],
      ["Wellington Pr Sch", "58489"],
      ["Opp Blk 507A", "58491"],
      ["Blk 506A", "58499"],
      ["Blk 592A", "58501"],
      ["Blk 590A", "58509"],
      ["Blk 104C", "58511"],
      ["OPP BLK 104B", "58519"],
      ["BLK 106A", "58521"],
      ["BLK 108 CP", "58529"],
      ["BLK 129A", "58531"],
      ["BLK 120A", "58539"],
      ["Opp Canberra Stn", "58541"],
      ["Canberra Stn", "58549"],
      ["Gambas Ave", "58571"],
      ["Gambas Ave", "58579"],
      ["Bef Gambas Cres", "58581"],
      ["Opp Gambas Cres", "58589"],
      ["Blk 108A", "58601"],
      ["Blk 109A", "58609"],
      ["Blk 115C", "58611"],
      ["Opp Blk 115C", "58619"],
      ["Blk 126 Cp", "58621"],
      ["BLK 767", "58991"],
      ["Yishun Int", "59008"],
      ["Yishun Int", "59009"],
      ["Bef Sg Seletar Bridge", "59011"],
      ["Aft Sg Seletar Bridge", "59019"],
      ["Bef Yishun Ave 1", "59021"],
      ["Aft Yishun Ave 1", "59029"],
      ["Opp Yishun Sports Hall", "59031"],
      ["Yishun Sports Hall", "59039"],
      ["Bef Khatib Stn", "59041"],
      ["Opp Khatib Stn", "59049"],
      ["Blk 790", "59051"],
      ["Blk 608", "59059"],
      ["Blk 763", "59061"],
      ["Opp Blk 757", "59069"],
      ["Yishun Stn Exit E", "59072"],
      ["Opp Yishun Stn", "59073"],
      ["Yishun Stn", "59079"],
      ["Blk 774", "59081"],
      ["Opp Blk 774", "59089"],
      ["Blk 154", "59091"],
      ["Blk 220", "59099"],
      ["Yishun Pr Sch", "59101"],
      ["Opp Yishun Pr Sch", "59109"],
      ["Blk 701", "59111"],
      ["Opp Blk 701A", "59119"],
      ["Blk 121", "59121"],
      ["Opp Blk 121", "59129"],
      ["Blk 137", "59131"],
      ["Aft Chong Pang CC", "59139"],
      ["Blk 741", "59141"],
      ["Blk 145", "59149"],
      ["Opp Yishun Stn Exit B", "59159"],
      ["Opp Blk 201", "59161"],
      ["Bet Blks 201/202", "59169"],
      ["Blk 309", "59171"],
      ["Blk 241", "59179"],
      ["Opp Blk 245", "59181"],
      ["Blk 245", "59189"],
      ["Opp Northland Sec Sch", "59191"],
      ["Blk 250", "59199"],
      ["Opp Chongfu Pr Sch", "59201"],
      ["Blk 272", "59209"],
      ["Blk 289", "59211"],
      ["Opp Blk 288", "59219"],
      ["Opp Yishun Ind Pk A", "59221"],
      ["Yishun Ind Pk A", "59229"],
      ["Blk 227", "59231"],
      ["Blk 291", "59239"],
      ["Blk 236", "59241"],
      ["Blk 257", "59249"],
      ["Opp Darul Makmur Mque", "59251"],
      ["Darul Makmur Mque", "59259"],
      ["Blk 174", "59261"],
      ["Opp Blk 174", "59269"],
      ["Blk 118", "59271"],
      ["Opp Ahmad Ibrahim Sec Sch", "59279"],
      ["Blk 654", "59281"],
      ["Blk 676 CP", "59289"],
      ["Blk 666", "59291"],
      ["Blk 671 CP", "59299"],
      ["Blk 731", "59301"],
      ["Jiemin Pr Sch", "59309"],
      ["Blk 760", "59311"],
      ["Blk 729", "59319"],
      ["Blk 794", "59321"],
      ["Naval Base Sec Sch", "59329"],
      ["Blk 773", "59331"],
      ["Blk 776", "59339"],
      ["Khoo Teck Puat Hosp", "59341"],
      ["Opp Khoo Teck Puat Hosp", "59349"],
      ["Opp Blk 322", "59351"],
      ["Blk 322", "59359"],
      ["Blk 647", "59369"],
      ["Opp Chung Cheng High Sch", "59379"],
      ["Blk 314", "59381"],
      ["Opp Blk 314", "59389"],
      ["Blk 342B", "59391"],
      ["Opp Blk 367", "59399"],
      ["Blk 358", "59401"],
      ["Evangel Family Ch", "59409"],
      ["Blk 356", "59411"],
      ["Blk 413", "59419"],
      ["Blk 624", "59421"],
      ["Blk 846", "59429"],
      ["Blk 630", "59431"],
      ["Blk 858", "59439"],
      ["Naval Base Pr Sch", "59441"],
      ["Opp Naval Base Pr Sch", "59449"],
      ["Bet Blks 349/350", "59451"],
      ["Opp Huamin Pr Sch", "59459"],
      ["Opp Blk 419", "59461"],
      ["Blk 419", "59469"],
      ["Blk 430B", "59471"],
      ["Opp Blk 430B", "59479"],
      ["Blk 873", "59481"],
      ["Orchid Pk Condo", "59499"],
      ["Blk 871", "59501"],
      ["Opp Blk 871", "59509"],
      ["Yishun Sec Sch", "59511"],
      ["Yishun Emerald", "59521"],
      ["Opp Yishun Emerald", "59529"],
      ["Sree Maha Mariamman Tp", "59541"],
      ["Opp Sree Maha Mariamman Tp", "59549"],
      ["Blk 722", "59551"],
      ["Opp Blk 722", "59559"],
      ["Opp Khatib Stn Exit D", "59561"],
      ["Khatib Stn Exit D", "59569"],
      ["Opp Northbrooks Sec Sch", "59571"],
      ["Blk 456", "59579"],
      ["Blk 432C", "59581"],
      ["Blk 505C", "59589"],
      ["Bet Blks 405/406", "59591"],
      ["Opp Blk 406", "59599"],
      ["BLK 391", "59601"],
      ["Opp Blk 391", "59609"],
      ["Opp Yishun Community Hosp", "59611"],
      ["Yishun Community Hosp", "59619"],
      ["Bet Blks 318A/318B", "59621"],
      ["Symphony Suites Condo", "59629"],
      ["Opp Blk 445", "59631"],
      ["Bet Blks 445/449", "59639"],
      ["Bet Blks 333C/333D", "59641"],
      ["Opp Blk 333C", "59649"],
      ["Blk 348B", "59651"],
      ["Blk 932", "59661"],
      ["Opp Blk 932", "59669"],
      ["Before Yishun Station", "59671"],
      ["Opp SAFRA Yishun", "59701"],
      ["Bef SAFRA Yishun", "59709"],
      ["Blk 672C", "59711"],
      ["Opp Blk 672C", "59719"],
      ["Blk 816", "59721"],
      ["Opp Blk 816", "59729"],
      ["Blk 512A", "59731"],
      ["Opp Blk 512A", "59739"],
      ["Opp Orchid Country Club", "59741"],
      ["Orchid Country Club", "59749"],
      ["Opp The Shaughnessy", "59751"],
      ["The Shaughnessy", "59759"],
      ["Blk 504C", "59761"],
      ["Blk 469B", "59771"],
      ["Opp Blks 469A/469B", "59779"],
      ["Aft Yishun Ave 6", "59781"],
      ["Bef Yishun Ave 6", "59789"],
      ["Blk 471A", "59791"],
      ["Opp Blk 470A", "59799"],
      ["Blk 382C", "59801"],
      ["Opp Blk 382C", "59809"],
      ["Blk 477B", "59811"],
      ["Blk 467C", "59819"],
      ["Blk 334B", "59821"],
      ["Opposite Blk 334B", "59829"],
      ["BENDEMEER STN EXIT A", "60011"],
      ["BENDEMEER STN EXIT B", "60019"],
      ["Chubb S'pore", "60021"],
      ["Blk 16", "60029"],
      ["BEF GEYLANG BAHRU STN", "60031"],
      ["Opp Blk 66", "60039"],
      ["Opp Kallang Pl", "60051"],
      ["Bef Kallang Pl", "60059"],
      ["Aft Infineon", "60061"],
      ["Kallang Basin Swim Cplx", "60069"],
      ["Kolam Ayer Ind Est", "60071"],
      ["Bef Bendemeer Rd", "60079"],
      ["St. Andrew'S Village", "60081"],
      ["Opp St. Andrew'S Village", "60089"],
      ["Bef Lavender St", "60099"],
      ["Kwong Wai Shiu Hosp", "60101"],
      ["Opp Boon Keng Stn", "60119"],
      ["Boon Keng Stn/Blk 102", "60121"],
      ["Blk 44", "60139"],
      ["Opp Bendemeer Pr Sch", "60141"],
      ["Blk 54", "60159"],
      ["St. Michael's Pl", "60161"],
      ["MOM Svcs Ctr", "60179"],
      ["Aft Moonstone Lane", "60181"],
      ["Blk 7", "60191"],
      ["Boon Keng Stn/Blk 22", "60199"],
      ["18 Woodsville", "60201"],
      ["Sant Ritz", "60209"],
      ["Aft Tai Thong Cres", "60211"],
      ["Bef Siemens Ctr", "60219"],
      ["BLK 73/GEYLANG BAHRU STN", "60221"],
      ["Blk 68", "60229"],
      ["Blk 1", "60241"],
      ["Blk 14", "60249"],
      ["Blk 15", "60251"],
      ["Potong Pasir Stn Exit C", "60261"],
      ["Potong Pasir Stn Exit B", "60269"],
      ["Blk 122", "61009"],
      ["Blk 103", "61011"],
      ["Opp Blk 101", "61019"],
      ["Aft Woodleigh Pk", "61021"],
      ["Opp Woodleigh Pk", "61029"],
      ["Woodleigh Stn Exit B", "61031"],
      ["Woodleigh Stn Exit A", "61039"],
      ["Bef Braddell Rd", "61041"],
      ["Aft Bartley Rd", "61049"],
      ["Blk 148", "61061"],
      ["Potong Pasir Stn Exit A", "61069"],
      ["Blk 121", "61079"],
      ["Bet Blks 138/144", "61089"],
      ["Potong Pasir CC", "61099"],
      ["Blk 120", "61101"],
      ["Blk 114B", "61111"],
      ["Blk 103B", "61119"],
      ["Aft Bartley Rd", "62011"],
      ["Aft Rochdale Rd", "62019"],
      ["Wisma AUPE", "62021"],
      ["Paya Lebar Gdns", "62029"],
      ["Bef How Sun Rd", "62031"],
      ["Raya Gdn", "62039"],
      ["Opp Bethany Presby Ch", "62041"],
      ["Aft Paya Lebar Cres", "62049"],
      ["Aft Jln Chermat", "62051"],
      ["Blk 161", "62059"],
      ["Aft Upp Paya Lebar Rd", "62061"],
      ["Bef Upp Paya Lebar Rd", "62069"],
      ["BARTLEY STN EXIT A", "62071"],
      ["AFT BARTLEY STN EXIT B", "62079"],
      ["Opp Bartley Chr Ch", "62081"],
      ["Bartley Chr Ch", "62089"],
      ["Opp Gambir Ridge", "62091"],
      ["Gambir Ridge", "62099"],
      ["Bef Upp Serangoon Rd", "62101"],
      ["Aft Upp Serangoon Rd", "62109"],
      ["Aft Sommerville Rd", "62111"],
      ["Aft Sunshine Lodge", "62119"],
      ["Aft Wolskel Rd", "62121"],
      ["Blk 403", "62129"],
      ["S'Goon Stn Exit H", "62131"],
      ["S'Goon Stn Exit A/Blk 413", "62139"],
      ["Opp Blk 1", "62141"],
      ["Forest Woods", "62149"],
      ["Rindu Terr", "62151"],
      ["Opp Rindu Terr", "62159"],
      ["St.Gabriel's Sec Sch", "62161"],
      ["Blk 426", "62169"],
      ["Blk 409", "62171"],
      ["Blk 421", "62179"],
      ["S'Goon Stn Exit D/Blk 416", "62189"],
      ["Blk 158", "62219"],
      ["Opp The Minton", "62221"],
      ["The Minton", "62229"],
      ["BEF S'PORE GIRLS' HME", "62231"],
      ["OPP S'PORE GIRLS' HME", "62239"],
      ["SBST Hougang Depot", "62241"],
      ["Opp SBST Hougang Depot", "62249"],
      ["Bef Blk 471B", "62251"],
      ["Opp S'goon Sec Sch", "62261"],
      ["Opp Blk 475B", "62271"],
      ["Buangkok Int", "63009"],
      ["Opp Upp S'Goon Shop Ctr", "63011"],
      ["Aft Upp S'Goon Shop Ctr", "63019"],
      ["The Helping Hand", "63021"],
      ["Opp The Helping Hand", "63029"],
      ["Kovan Stn Exit B", "63031"],
      ["Kovan Stn Exit C", "63039"],
      ["Opp Glad Tidings Ch", "63041"],
      ["Glad Tidings Ch", "63049"],
      ["Opp Blk 370", "63051"],
      ["Blk 22", "63059"],
      ["Opp Blk 25", "63061"],
      ["Blk 25", "63069"],
      ["Opp Blk 248", "63071"],
      ["Blk 248", "63079"],
      ["Opp Blk 241", "63081"],
      ["Blk 241", "63089"],
      ["Opp Blk 106", "63091"],
      ["Blk 106", "63099"],
      ["Opp Blk 169", "63101"],
      ["Blk 172", "63109"],
      ["THE TEMBUSU", "63131"],
      ["Aft En-Naeem Mque", "63139"],
      ["Blk 209", "63141"],
      ["Serangoon Stadium", "63149"],
      ["Aft Upp S'Goon Rd", "63151"],
      ["Highland Ctr", "63159"],
      ["Serangoon Swim Cplx", "63161"],
      ["Opp Serangoon Swim Cplx", "63169"],
      ["Bef Tai Seng Chr Ch", "63179"],
      ["Bef St. Helier's Ave", "63181"],
      ["Aft Serangoon Gdn Way", "63189"],
      ["Aft Serangoon Nth Ave 1", "63191"],
      ["Aft Phillips Ave", "63199"],
      ["Affinity At Serangoon", "63201"],
      ["Parkwood Residences", "63209"],
      ["Blk 138", "63211"],
      ["Bef Yio Chu Kang Chapel", "63219"],
      ["KOVAN HUB", "63221"],
      ["Opp Kovan Hub", "63229"],
      ["Bet Blks 210/211", "63231"],
      ["OPP BLK 211", "63239"],
      ["Blk 21", "63241"],
      ["Blk 1", "63249"],
      ["Opp Blk 232", "63261"],
      ["Blk 232", "63269"],
      ["Blk 239", "63271"],
      ["Opp Yuying Sec Sch", "63279"],
      ["Blk 105 Mkt/FC", "63281"],
      ["Aljunied CC", "63289"],
      ["Opp Blk 115", "63291"],
      ["Blk 115", "63299"],
      ["Paya Lebar Meth Girls' Sc", "63301"],
      ["Blk 126", "63309"],
      ["Blk 634", "63311"],
      ["Opp Blk 634", "63319"],
      ["Blk 627", "63321"],
      ["Opp Blk 627", "63329"],
      ["Blk 615", "63331"],
      ["Opp Blk 615", "63339"],
      ["Opp Blk 709", "63341"],
      ["Blk 708", "63349"],
      ["Opp Hougang Swim Cplx", "63351"],
      ["Hougang Swim Cplx", "63359"],
      ["Opp S'Goon Sports Cplx", "63361"],
      ["Serangoon Sports Cplx", "63369"],
      ["Blk 679", "63371"],
      ["Blk 608", "63379"],
      ["Xinmin Pr Sch", "63381"],
      ["Opp Xinmin Pr Sch", "63389"],
      ["Blk 639", "63391"],
      ["Blk 632", "63399"],
      ["Hougang Ctrl Int", "64009"],
      ["Naung Residence", "64011"],
      ["Blk 302", "64019"],
      ["Blk 458", "64021"],
      ["Opp Blk 458", "64029"],
      ["Blk 436", "64031"],
      ["Blk 434", "64039"],
      ["The Midtown", "64041"],
      ["Opp The Midtown", "64049"],
      ["Blk 465A", "64051"],
      ["Blk 355", "64059"],
      ["Opp Serangoon Sec Sch", "64061"],
      ["Serangoon Sec Sch", "64069"],
      ["Opp Punggol Pk", "64071"],
      ["Punggol Pk", "64079"],
      ["Hougang 1/Opp Blk 931A", "64081"],
      ["OPP HOUGANG 1", "64089"],
      ["Hougang Pr Sch", "64091"],
      ["HOUGANG SEC SCH", "64099"],
      ["Opp Gracehaven S Army", "64101"],
      ["Gracehaven S Army", "64109"],
      ["Opp Blk 953", "64111"],
      ["Blk 953", "64119"],
      ["Aft Ang Mo Kio Ave 5", "64121"],
      ["Blk 988B", "64129"],
      ["Bef KPE", "64131"],
      ["Bef KPE", "64139"],
      ["Aft Jln Telawi", "64141"],
      ["LP 137", "64149"],
      ["Aft Greenwich Dr", "64151"],
      ["Bef Greenwich Dr", "64159"],
      ["Schenker", "64161"],
      ["Opp Schenker", "64169"],
      ["Aft Buangkok East Dr", "64171"],
      ["Bef Buangkok East Dr", "64179"],
      ["Bef TPE", "64181"],
      ["Aft Old Tampines Rd", "64189"],
      ["Aft Goldhill Memorial Ctr", "64191"],
      ["Bef Goldhill Memorial Ctr", "64199"],
      ["Aft Hougang Ave 3", "64201"],
      ["Aft Defu Ave 1", "64209"],
      ["Aft Hougang Ave 7", "64211"],
      ["Aft Defu Ave 2", "64219"],
      ["Opp Defu Ave 2", "64221"],
      ["Bef Defu Ave 2", "64229"],
      ["Blk 316", "64231"],
      ["Opp Blk 316", "64239"],
      ["Blk 308", "64241"],
      ["Blk 327", "64249"],
      ["Hougang Sec Sch", "64251"],
      ["Blk 925A CP", "64259"],
      ["Blk 325", "64301"],
      ["Opp Blk 321", "64309"],
      ["Riverfront Residences", "64311"],
      ["Opp Riverfront Residences", "64319"],
      ["Opp Rio Vista", "64321"],
      ["Rio Vista", "64329"],
      ["Blk 508", "64331"],
      ["Blk 602", "64339"],
      ["Bef Blk 683", "64341"],
      ["Blk 502", "64349"],
      ["Opp Montfort Sch", "64351"],
      ["Montfort Sch", "64359"],
      ["Blk 535", "64361"],
      ["Blk 532", "64369"],
      ["Opp Punggol CC", "64371"],
      ["Punggol CC", "64379"],
      ["Hougang Stn Exit C", "64381"],
      ["Blk 522", "64389"],
      ["Blk 831", "64391"],
      ["Block 513", "64397"],
      ["Blk 512", "64399"],
      ["Opp Blk 477A", "64401"],
      ["Blk 477A", "64409"],
      ["Blk 670", "64411"],
      ["Blk 681", "64419"],
      ["Blk 421", "64421"],
      ["Blk 412", "64429"],
      ["Blk 568", "64431"],
      ["Blk 537", "64439"],
      ["Hougang G. Shop Mall", "64441"],
      ["Opp Hougang G. Shop Mall", "64449"],
      ["Blk 579", "64461"],
      ["Opp Blk 579", "64469"],
      ["Blk 917", "64471"],
      ["Blk 665", "64479"],
      ["Bet Blks 930/931", "64481"],
      ["Blk 946A", "64489"],
      ["Hougang 1", "64491"],
      ["Regentville", "64499"],
      ["Blk 941A", "64509"],
      ["Blk 943", "64519"],
      ["Blk 834", "64521"],
      ["Hougang Polyclinic", "64529"],
      ["Hougang Ctrl Int", "64541"],
      ["Opp Hougang Ctrl Int", "64549"],
      ["Blk 836", "64551"],
      ["Blk 830A", "64559"],
      ["Blk 574", "64561"],
      ["Blk 438", "64571"],
      ["Bet Blks 544/546", "64579"],
      ["Blk 919", "64601"],
      ["Blk 687", "64609"],
      ["Blk 913", "64611"],
      ["Opp Blk 913", "64619"],
      ["Blk 565", "64621"],
      ["Opp Blk 565", "64629"],
      ["Punggol Temp Int", "65009"],
      ["Opp The Rivervale", "65011"],
      ["The Rivervale", "65019"],
      ["Opp Blk 110", "65021"],
      ["Blk 111", "65029"],
      ["Blk 227D", "65031"],
      ["Blk 124", "65039"],
      ["Blk 231", "65041"],
      ["Blk 126A", "65049"],
      ["St. Anne's Ch", "65059"],
      ["Blk 298A", "65061"],
      ["Blk 190C", "65069"],
      ["Blk 203A", "65071"],
      ["Blk 102C", "65079"],
      ["Opp Blk 199C", "65081"],
      ["Opp Blk 296", "65089"],
      ["BLK 301A", "65091"],
      ["BLK 604A", "65099"],
      ["Opp My First Skool PCC10", "65101"],
      ["My First Skool PCC10", "65109"],
      ["Aft Soo Teck Stn", "65141"],
      ["Bef Soo Teck Stn", "65149"],
      ["Cove Stn Exit B", "65151"],
      ["Cove Stn Exit A", "65159"],
      ["Meridian Stn Exit B", "65161"],
      ["Meridian Stn Exit A", "65169"],
      ["Coral Edge Stn Exit B", "65171"],
      ["Coral Edge Stn Exit A", "65179"],
      ["Atf Punggol Ctrl", "65181"],
      ["Bef Punggol Ctrl", "65189"],
      ["Bef Punggol Rd", "65191"],
      ["Aft Punggol Rd", "65199"],
      ["Opp Blk 201A", "65201"],
      ["Blk 201A", "65209"],
      ["Blk 303D", "65221"],
      ["Blk 298", "65229"],
      ["Riviera Stn Exit B", "65231"],
      ["Riviera Stn Exit A", "65239"],
      ["Blk 196C", "65241"],
      ["Blk 178", "65249"],
      ["Punggol Stn/Waterway Pt", "65251"],
      ["Punggol Stn/Int", "65259"],
      ["Blk 649", "65261"],
      ["Blk 162B", "65269"],
      ["Opp Blk 188", "65271"],
      ["Bet Blks 187/188", "65279"],
      ["Punggol Sec/Blk 601B", "65281"],
      ["Opp Punggol Sec/Blk 195E", "65289"],
      ["Damai Stn Exit B", "65301"],
      ["Damai Stn Exit A", "65309"],
      ["Oasis Stn Exit B/Blk 617D", "65311"],
      ["Oasis Stn Exit A", "65319"],
      ["Kadaloor Stn Exit B", "65321"],
      ["Kadaloor Stn Exit A", "65329"],
      ["Opp Blk 268D", "65331"],
      ["Blk 268C", "65339"],
      ["Opp Blk 272C", "65341"],
      ["Blk 272C", "65349"],
      ["Punggol View Pr Sch", "65351"],
      ["Opp Punggol View Pr Sch", "65359"],
      ["Blk 682A", "65371"],
      ["Blk 661A", "65379"],
      ["Punggol Sec Sch", "65381"],
      ["Opp Punggol Sec Sch", "65389"],
      ["Blk 672A", "65391"],
      ["Blk 670A", "65399"],
      ["Opp Blk 264A", "65401"],
      ["Bef Blk 264", "65409"],
      ["Horizon Pr Sch", "65411"],
      ["Opp Horizon Pr Sch", "65419"],
      ["Greendale Pr Sch", "65429"],
      ["Twin Waterfalls", "65431"],
      ["Blk 220C", "65439"],
      ["Opp Blk 315B", "65441"],
      ["Blk 315B", "65449"],
      ["Blk 322 CP", "65451"],
      ["Opp Blk 322 CP", "65459"],
      ["Blk 312 CP", "65461"],
      ["Blk 310B", "65469"],
      ["Opp One Punggol", "65481"],
      ["One Punggol", "65489"],
      ["Opp Blk 259 CP", "65491"],
      ["Blk 259 CP", "65499"],
      ["Waterwoods", "65521"],
      ["Aft Punggol Field", "65529"],
      ["Blk 226A", "65531"],
      ["Blk 224A", "65539"],
      ["Blk 228B", "65541"],
      ["Opp Blk 228B", "65549"],
      ["Blk 227A", "65551"],
      ["Opposite Blk 227A", "65559"],
      ["Blk 659A", "65561"],
      ["Blk 654D", "65569"],
      ["BLK 218", "65571"],
      ["BLK 258A", "65579"],
      ["Sumang Stn Exit B", "65601"],
      ["Sumang Stn Exit A", "65609"],
      ["Nibong Stn Exit B", "65611"],
      ["Nibong Stn Exit A", "65619"],
      ["Samudera Stn Exit B", "65621"],
      ["Samudera Stn Exit A", "65629"],
      ["Aft Punggol Pt Stn", "65631"],
      ["Bef Punggol Pt Stn", "65639"],
      ["Marina Country Club", "65641"],
      ["Blk 413C", "65651"],
      ["Blk 421C", "65661"],
      ["Punggol cove pr sch", "65671"],
      ["Opp punggol cove pr sch", "65679"],
      ["Bef Northshore Cres", "65681"],
      ["Aft Northshore Cres", "65689"],
      ["Opposite Blk 437B", "65691"],
      ["Blk 437B", "65699"],
      ["Opposite SIT Punggol", "65701"],
      ["Before SIT Punggol", "65709"],
      ["Blk 446B", "65711"],
      ["Blk 432B", "65719"],
      ["Opposite Punggol Coast Station", "65721"],
      ["Punggol Coast Station", "65729"],
      ["Blk 309D", "65801"],
      ["Anchor Green Pr Sch", "65809"],
      ["S'Goon Int", "66009"],
      ["Aft Braddell Rd", "66011"],
      ["Bef Braddell Rd", "66019"],
      ["New Tech Pk", "66021"],
      ["St. Gabriel's Pr Sch", "66029"],
      ["Cardiff Residence", "66031"],
      ["Blk 307", "66039"],
      ["Blk 230", "66041"],
      ["Blk 233", "66049"],
      ["Opp Blk 257", "66051"],
      ["Blk 257A", "66059"],
      ["Aft Lynwood Gr", "66061"],
      ["Bef Braddell Flyover", "66069"],
      ["Opp PUB Recreation Club", "66071"],
      ["PUB Recreation Club", "66079"],
      ["Opp S'pore Power Trg Inst", "66081"],
      ["S'pore Power Trg Inst", "66089"],
      ["Golden Hill Est", "66091"],
      ["Opp Golden Hill Est", "66099"],
      ["Blk 516", "66101"],
      ["Blk 151", "66109"],
      ["Opp Grace Wk", "66111"],
      ["Summer Pl", "66119"],
      ["Chuan Terr", "66121"],
      ["Aft Chuan Gdn", "66129"],
      ["Aft Trinity Meth Ch", "66131"],
      ["Opp Trinity Meth Ch", "66139"],
      ["Bef Yio Chu Kang Rd", "66141"],
      ["Aft Yio Chu Kang Rd", "66149"],
      ["Opp Penshurst Pl", "66151"],
      ["Opp Crowhurst Dr", "66161"],
      ["Bef Cooling Cl", "66171"],
      ["Aft Chartwell Rd", "66181"],
      ["Aft Corfe Pl", "66191"],
      ["Opp Brockhampton Dr", "66201"],
      ["Opp Bloxhome Dr", "66211"],
      ["Opp Portchester Ave", "66221"],
      ["Bef Huddington Ave", "66231"],
      ["Hemsley Ave", "66241"],
      ["Opp Kingswear Ave", "66251"],
      ["S'Goon Gdns Country Club", "66261"],
      ["Serangoon Gdn Circus", "66271"],
      ["Aft Medway Dr", "66291"],
      ["Blk 152", "66301"],
      ["Blk 112", "66309"],
      ["Blk 141A", "66311"],
      ["Bet Blks 142/148", "66319"],
      ["Opp Blk 127", "66321"],
      ["Blk 126", "66329"],
      ["Blk 554", "66331"],
      ["Blk 101", "66339"],
      ["Daikin S'pore", "66341"],
      ["Opp Daikin S'pore", "66349"],
      ["S'goon Stn Exit E", "66351"],
      ["S'Goon Stn Exit C/Blk 201", "66359"],
      ["Blk 319", "66361"],
      ["Blk 238", "66369"],
      ["Blk 261", "66371"],
      ["Blk 206", "66379"],
      ["Opp S'Goon Stn Exit F", "66381"],
      ["S'Goon Stn Exit F", "66389"],
      ["Lor Chuan Stn Exit A", "66391"],
      ["Opp Lor Chuan Stn Exit B", "66399"],
      ["Golden Hts", "66401"],
      ["Opp Golden Hts", "66409"],
      ["Blk 326", "66411"],
      ["Blk 330", "66419"],
      ["Blk 537", "66421"],
      ["Blk 530", "66429"],
      ["Opp Blk 506A", "66431"],
      ["Blk 504A CP", "66439"],
      ["Aft AMK Ind Pk 2", "66451"],
      ["Opp Ang Mo Kio Linear Pk", "66459"],
      ["Ang Mo Kio Linear Pk", "66461"],
      ["Bef Yio Chu Kang Rd", "66471"],
      ["Aft Yio Chu Kang Rd", "66479"],
      ["Opp Blk 968", "66481"],
      ["Blk 969", "66489"],
      ["Opp Blk 910", "66491"],
      ["Blk 911", "66499"],
      ["Blk 546", "66509"],
      ["Yio Chu Kang Amenity Ctr", "66511"],
      ["Ang Mo Kio TechLink", "66519"],
      ["Ban Teck Han Bldg", "66521"],
      ["Blk 538", "66529"],
      ["Opp Blk 531", "66531"],
      ["Blk 531", "66539"],
      ["Blk 980C", "66541"],
      ["Opp Blk 980C", "66549"],
      ["Blk 984", "66551"],
      ["Opp Blk 984A", "66559"],
      ["Outside Blk 991B", "66561"],
      ["OPP BLK 991B", "66569"],
      ["Buangkok Sq", "66571"],
      ["BLK 998B", "66579"],
      ["Blk 986B", "66581"],
      ["Buangkok Sports Pk", "66589"],
      ["KLA Corporation", "66599"],
      ["Blk 991A", "66601"],
      ["Opp Blk 991A", "66609"],
      ["Sengkang Int", "67009"],
      ["Bef Begonia Rd", "67011"],
      ["Aft Begonia Rd", "67019"],
      ["Opp Dedap Rd", "67021"],
      ["Aft Dedap Rd", "67029"],
      ["Aft Seletar Rd", "67039"],
      ["Opp The Greenwich", "67041"],
      ["The Greenwich", "67049"],
      ["Opp Seletar Hills Est", "67051"],
      ["Seletar Hills Est", "67059"],
      ["Aft Jln Selaseh", "67061"],
      ["Bef Jln Selaseh", "67069"],
      ["Bef Gerald Dr", "67071"],
      ["Ch Of St. Vincent De Paul", "67079"],
      ["Aft Yio Chu Kang Rd", "67081"],
      ["Bef Fernvale Lane", "67089"],
      ["Opp Blk 459B", "67091"],
      ["Blk 459B", "67099"],
      ["Blk 250A", "67101"],
      ["Blk 235", "67109"],
      ["Chij St. Joseph'S Convent", "67111"],
      ["Blk 128", "67119"],
      ["Blk 142A", "67121"],
      ["Blk 137", "67129"],
      ["Bakau Stn/Blk 122F", "67131"],
      ["Nth Spring Pr Sch", "67139"],
      ["Blk 119D", "67141"],
      ["Kangkar Stn Exit B", "67151"],
      ["Kangkar Stn Exit A", "67159"],
      ["Opp Blk 101", "67161"],
      ["Blk 101", "67169"],
      ["Blk 225A", "67171"],
      ["Opp Blk 225A", "67179"],
      ["Blk 240", "67181"],
      ["Opp Blk 241", "67189"],
      ["Blk 223D", "67191"],
      ["Opp Blk 223D", "67199"],
      ["Blk 206A", "67201"],
      ["Blk 203", "67209"],
      ["Ranggung Stn Exit A", "67211"],
      ["Ranggung Stn Exit B", "67219"],
      ["Rumbia Stn Exit B/Blk 153", "67221"],
      ["Rumbia Stn Exit A", "67229"],
      ["Rivervale Pr Sch", "67231"],
      ["Opp Rivervale Pr Sch", "67239"],
      ["Blk 248A", "67241"],
      ["Blk 259C", "67249"],
      ["Compassvale Stn Exit A", "67251"],
      ["Compassvale Stn Exit B", "67259"],
      ["Blk 203B", "67261"],
      ["Opp Blk 203A", "67269"],
      ["Blk 201 CP", "67271"],
      ["Blk 301D", "67279"],
      ["Blk 403A", "67281"],
      ["Opp Blk 405C", "67289"],
      ["Renjong Stn Exit B", "67291"],
      ["Renjong Stn Exit A", "67299"],
      ["Blk 305D", "67301"],
      ["Opp Blk 305 CP", "67309"],
      ["Farmway Stn Exit B", "67311"],
      ["Farmway Stn Exit A", "67319"],
      ["Blk 311A", "67321"],
      ["Opp Blk 310B", "67329"],
      ["Blk 200B", "67331"],
      ["Opp Blk 200B", "67339"],
      ["Opp Blk 204 CP", "67341"],
      ["Blk 204 CP", "67349"],
      ["Blk 321 CP", "67351"],
      ["Nan Chiau High Sch", "67359"],
      ["Blk 313B", "67361"],
      ["Blk 306 CP", "67369"],
      ["Blk 313 CP", "67371"],
      ["Opp Blk 313 CP", "67379"],
      ["Blk 326 CP", "67381"],
      ["Blk 317B", "67389"],
      ["Blk 333B", "67391"],
      ["Blk 325 CP", "67399"],
      ["Opp Sengkang Stn/Blk 260A", "67401"],
      ["Sengkang Stn", "67409"],
      ["Opp Sengkang General Hosp", "67411"],
      ["Sengkang General Hosp", "67419"],
      ["Cheng Lim Stn Exit B", "67421"],
      ["Cheng Lim Stn Exit A", "67429"],
      ["Opp Blk 291A", "67431"],
      ["Blk 291A", "67439"],
      ["Sengkang Community Hub", "67441"],
      ["Blk 323B", "67449"],
      ["Bef Buangkok Dr", "67451"],
      ["Aft Buangkok Dr", "67459"],
      ["Aft Sengkang East Ave", "67461"],
      ["Bef Sengkang East Ave", "67469"],
      ["Layar Stn Exit B", "67471"],
      ["Layar Stn Exit A/Blk 417A", "67479"],
      ["Fernvale Stn/Blk 439A", "67481"],
      ["Opp Fernvale Stn", "67489"],
      ["Opp Fernvale Pr Sch", "67491"],
      ["Fernvale Pr Sch", "67499"],
      ["Blk 117C", "67501"],
      ["Opp Blk 119A", "67509"],
      ["Blk 121E", "67511"],
      ["Opp Blk 121E", "67519"],
      ["Blk 160", "67521"],
      ["Opp Blk 157A", "67529"],
      ["Blk 158C", "67531"],
      ["Blk 122C", "67539"],
      ["Hockey Stadium", "67541"],
      ["Opp Hockey Stadium", "67549"],
      ["Blk 471A", "67551"],
      ["Opp Blk 471A", "67559"],
      ["Opp Blk 432A", "67561"],
      ["Blk 432A", "67569"],
      ["Aft Lor Tanggam", "67571"],
      ["Bef Jln Kayu", "67579"],
      ["Blk 286B", "67591"],
      ["Opp Blk 293D", "67599"],
      ["Buangkok Stn Exit B", "67601"],
      ["Buangkok Stn Exit A", "67609"],
      ["Blk 204C", "67611"],
      ["Blk 201C", "67619"],
      ["Blk 278 CP", "67621"],
      ["Blk 557", "67629"],
      ["Blk 441D", "67631"],
      ["Blk 436A", "67639"],
      ["Opp Treasure Crest", "67641"],
      ["Treasure Crest", "67649"],
      ["Bef Sengkang West Rd", "67651"],
      ["Aft Sengkang West Rd", "67659"],
      ["Opp Blk 178A", "67661"],
      ["Blk 156A CP", "67671"],
      ["BLK 338A", "67691"],
      ["BLK 334A", "67699"],
      ["AFT BLK 467B", "67701"],
      ["Bef Sengkang Fire Stn", "67711"],
      ["Opp Sengkang Fire Stn", "67719"],
      ["The Rivervale", "67721"],
      ["Opp The Rivervale", "67729"],
      ["Bef Sengkang East Dr", "67731"],
      ["Aft Sengkang East Dr", "67739"],
      ["Thanggam Stn", "67741"],
      ["OPP BLK 326D", "67761"],
      ["BLK 326D", "67769"],
      ["Opp Blk 461B", "67991"],
      ["Blk 461B", "67999"],
      ["Bef Jln Kayu", "68011"],
      ["Aft Jln Kayu", "68019"],
      ["Opp Blk 448A", "68021"],
      ["Blk 448A", "68029"],
      ["Jln Kayu Shophouse", "68031"],
      ["Aft Abundant Grace Ch", "68039"],
      ["Opp Jln Tari Lilin", "68049"],
      ["Bef TPE", "68051"],
      ["Aft TPE", "68059"],
      ["Sing-China Bldg", "68061"],
      ["Opp Sing-China Bldg", "68069"],
      ["Bef Seletar A'Space Rise", "68081"],
      ["Aft Seletar A'Space Rise", "68089"],
      ["Aft Baker St", "68091"],
      ["Bef Baker St", "68099"],
      ["Rolls Royce Pte Ltd", "68101"],
      ["Opp Rolls Royce Pte Ltd", "68109"],
      ["Bef Seletar Camp G", "68111"],
      ["Aft Seletar Camp G", "68119"],
      ["Bef West Camp Rd", "68121"],
      ["Aft West Camp Rd", "68129"],
      ["Opp Youth Flying Club", "68131"],
      ["Youth Flying Club", "68139"],
      ["Opp JTC Aviation Two", "68141"],
      ["ST Aerospace", "68149"],
      ["Bef Shell Aviation", "68151"],
      ["Aft Shell Aviation", "68159"],
      ["Aft Seletar A'Space Lane", "68161"],
      ["Bef Seletar A'Space Lane", "68169"],
      ["Bef Yishun Ave 8", "68171"],
      ["Aft Yishun Ave 8", "68179"],
      ["Bef Jtc Aerospace", "68181"],
      ["Bef Seletar A'Space Cres", "68189"],
      ["Bef Seletar A'Space Lk", "68191"],
      ["Aft Seletar A'Space Lk", "68199"],
      ["Aft Seletar Camp", "68201"],
      ["Opp Seletar Camp", "68209"],
      ["Seletar Airport", "68239"],
      ["Opp Blk 125", "70011"],
      ["Blk 125", "70019"],
      ["Opp Canossa Catholic Pr", "70021"],
      ["Canossa Catholic Pr", "70029"],
      ["Opp Aljunied Pk", "70031"],
      ["Aljunied Pk", "70039"],
      ["Opp Blk 4", "70041"],
      ["Aft Blk 4", "70049"],
      ["Aft Joo Seng Rd", "70051"],
      ["Blk 7", "70059"],
      ["Bef Bidadari Pk Dr", "70061"],
      ["Aft Bidadari Pk Dr", "70069"],
      ["Cycle & Carriage", "70071"],
      ["Aft Regent Motors", "70079"],
      ["Opp HDB CP", "70081"],
      ["HDB CP", "70089"],
      ["Opp Traffic Police", "70091"],
      ["Traffic Police", "70099"],
      ["Bef Jln Wangi", "70101"],
      ["Gulab Bldg", "70109"],
      ["Opp Cencon Bldg", "70111"],
      ["Cencon Bldg", "70119"],
      ["Aft Jln Muhibbah", "70121"],
      ["Opp Jln Muhibbah", "70129"],
      ["Bef Davidson Rd", "70131"],
      ["Aft Jln Belangkas", "70139"],
      ["Grantral Mall Macpherson", "70141"],
      ["Sky Green Condo", "70149"],
      ["Aft Jln Anggerek", "70151"],
      ["OPP MATTAR STN EXIT A", "70161"],
      ["Blk 77", "70171"],
      ["Blk 36", "70181"],
      ["OPP BLK 66", "70191"],
      ["OPP MACPHERSON STN EXIT D", "70201"],
      ["Blk 90", "70211"],
      ["Blk 79 FC", "70221"],
      ["OPP MATTAR STN EXIT B", "70231"],
      ["Aft Grace Baptist Ch", "70241"],
      ["Macpherson Stn Exit C", "70251"],
      ["Macpherson Stn Exit B", "70259"],
      ["Opp Orion @ Paya Lebar", "70261"],
      ["Citipoint Ind Cplx", "70269"],
      ["Le Crescendo", "70271"],
      ["Opp Trinity Paya Lebar", "70279"],
      ["Aft Tai Seng Stn", "70281"],
      ["Aft Tai Seng Stn Exit C", "70289"],
      ["Asiawide Ind Bldg", "70291"],
      ["Opp Asiawide Ind Bldg", "70299"],
      ["Aft Paya Lebar St", "70301"],
      ["Opp Paya Lebar St", "70309"],
      ["Aft Genting Lane", "70311"],
      ["Aft Kallang Way 4", "70319"],
      ["Aft Kallang Way 1", "70321"],
      ["Aft Kallang Way 2", "70329"],
      ["Tannery Blk", "70341"],
      ["Bef Lor Bakar Batu", "70349"],
      ["Aft Kallang Sector", "70359"],
      ["Bef Genting Lk", "70361"],
      ["Macpherson Stn Exit A", "70371"],
      ["Opp Macpherson Stn Exit A", "70379"],
      ["BEF UBI RD 4", "70401"],
      ["BLK 3032A", "70409"],
      ["Aft Paya Lebar Rd", "71011"],
      ["Opp Comfort Test Ctr", "71021"],
      ["Comfort Test Ctr", "71029"],
      ["Opp Gordon Warehse Bldg", "71031"],
      ["Opp Air Force Museum", "71041"],
      ["Air Force Museum", "71049"],
      ["Aft Kim Chuan Rd", "71051"],
      ["Bef Kim Chuan Rd", "71059"],
      ["Bef Airport Rd", "71061"],
      ["Aft Airport Rd", "71069"],
      ["Opp Comfort Driving Ctr", "71071"],
      ["Comfort Driving Ctr", "71079"],
      ["Eunos Technolink", "71081"],
      ["Opp Eunos Technolink", "71089"],
      ["Blk 637", "71091"],
      ["Blk 311", "71099"],
      ["Blk 318", "71101"],
      ["Maha Bodhi Sch", "71109"],
      ["Blk 343", "71111"],
      ["Opp Blk 343", "71119"],
      ["UBI STN EXIT B", "71121"],
      ["UBI STN EXIT A", "71129"],
      ["Automobile Megamart", "71131"],
      ["Blk 302", "71139"],
      ["Blk 3023", "71141"],
      ["Blk 3024", "71149"],
      ["Blk 3021", "71151"],
      ["Blk 3026", "71159"],
      ["Blk 3019", "71161"],
      ["Aztech Bldg", "71169"],
      ["Opp Scdf Hq", "71171"],
      ["Aft Scdf Hq", "71179"],
      ["Opp Paya Lebar Air Base", "71181"],
      ["Paya Lebar Air Base", "71189"],
      ["Aft Defu Lane 12", "71191"],
      ["Paya Ubi Ind Pk", "71201"],
      ["Opp Paya Ubi Ind Pk", "71209"],
      ["Ubi 55", "71211"],
      ["Ubi Techpark", "71219"],
      ["Meiban Ind Bldg", "71221"],
      ["Opp Meiban Ind Bldg", "71229"],
      ["THE LEO", "71291"],
      ["EMPIRE TECHNOCENTRE", "71299"],
      ["KAKI BT AUTOHUB", "71331"],
      ["OPP KAKI BT AUTOHUB", "71339"],
      ["Blk 322", "72011"],
      ["Opp Blk 322", "72019"],
      ["Blk 646", "72021"],
      ["Opp Blk 646", "72029"],
      ["BEF KAKI BT STN EXIT B", "72031"],
      ["KAKI BT STN EXIT A", "72039"],
      ["Blk 660A CP", "72041"],
      ["Opp Blk 660A CP", "72049"],
      ["Kaki Bt Ind Est", "72051"],
      ["Opp Kaki Bt Ind Est", "72059"],
      ["Blk 122", "72061"],
      ["Blk 121", "72069"],
      ["Blk 133", "72071"],
      ["Blk 609", "72079"],
      ["OPP TECH VIEW", "72131"],
      ["TECH VIEW", "72139"],
      ["BARTLEY BIZ CTR", "72141"],
      ["SHUN LI IND PK", "72149"],
      ["AUTOBAY @ KAKI BT", "72151"],
      ["OPP AUTOBAY @ KAKI BT", "72159"],
      ["AFT BARTLEY VIADUCT", "72161"],
      ["BEF BARTLEY VIADUCT", "72169"],
      ["Opp HomeTeamNS", "72171"],
      ["HomeTeamNS", "72179"],
      ["Bef RSAF Roundabout", "73019"],
      ["Bef Tampines Ind Dr", "73021"],
      ["Aft Tampines Ind Dr", "73029"],
      ["Aft Tampines Ind Dr", "73031"],
      ["Bef Tampines Ind Dr", "73039"],
      ["ST Aero", "73041"],
      ["Air Force Sch", "73049"],
      ["Tampines Nth Int", "74009"],
      ["Aft Tampines Ind Ave 5", "74011"],
      ["Bef Tampines Ind Ave 5", "74019"],
      ["Bef Tampines Ind Ave 4", "74021"],
      ["Aft Tampines Ind Ave 4", "74029"],
      ["Bef Tampines Lk", "74031"],
      ["Aft Tampines Ind Ave 2", "74039"],
      ["Opp Golden Pagoda Tp", "74041"],
      ["Tampines Dormitory", "74051"],
      ["Opp Tampines Dormitory", "74059"],
      ["Tampines Int", "75009"],
      ["Tampines Concourse Int", "75019"],
      ["BLK 879B", "75021"],
      ["Opp Springfield Sec Sch", "75031"],
      ["Springfield Sec Sch", "75039"],
      ["Blk 875B", "75041"],
      ["TAMPINES WEST STN EXIT B", "75051"],
      ["BEF TAMPINES WEST STN", "75059"],
      ["Blk 954D", "75061"],
      ["Blk 960A", "75069"],
      ["Opp Blk 819", "75071"],
      ["Blk 819", "75079"],
      ["Blk 831", "75081"],
      ["Blk 827", "75089"],
      ["Blk 897", "75099"],
      ["Blk 880", "75101"],
      ["Blk 888", "75109"],
      ["Blk 874A", "75111"],
      ["Opp Darul Ghufran Mque", "75121"],
      ["Darul Ghufran Mque", "75129"],
      ["Bet Blks 701/702", "75131"],
      ["Blk 863", "75139"],
      ["Blk 730", "75141"],
      ["Blk 867A", "75149"],
      ["Opp Blk 871A", "75151"],
      ["Blk 874", "75159"],
      ["Blk 855", "75161"],
      ["Opp Blk 853", "75169"],
      ["UWCSEA", "75171"],
      ["Blk 871C", "75179"],
      ["Blk 835", "75201"],
      ["Blk 882A", "75209"],
      ["Blk 889", "75219"],
      ["Opp Temasek Poly East G", "75221"],
      ["Temasek Poly East G", "75229"],
      ["Opp Temasek Poly", "75231"],
      ["Temasek Poly", "75239"],
      ["Opp Temasek Poly West G", "75241"],
      ["Temasek Poly West G", "75249"],
      ["Opp Tropica Condo", "75251"],
      ["Tropica Condo", "75259"],
      ["Blk 709", "75261"],
      ["Blk 522 CP", "75269"],
      ["Blk 721", "75271"],
      ["Opp Blk 721", "75279"],
      ["Blk 742A", "75281"],
      ["Opp Blks 741/742", "75289"],
      ["Aft Tampines Ave 9", "75291"],
      ["Bef Tampines Ave 9", "75299"],
      ["Bef Tampines Lk", "75311"],
      ["Aft Tampines Lk", "75319"],
      ["Poi Ching Sch", "75329"],
      ["Blk 734", "75339"],
      ["Opp The Clearwater Condo", "75341"],
      ["The Clearwater Condo", "75349"],
      ["Tampines Wafer Fab Pk", "75351"],
      ["IKEA Tampines/Aft TPE", "75359"],
      ["Bef Tampines Ind Ave 5", "75361"],
      ["Bef Tampines Lk", "75369"],
      ["Aft Tampines Ave 5", "75371"],
      ["Bef Tampines Ave 5", "75379"],
      ["T5@TAMPINES", "75381"],
      ["OPP SILTRONIC", "75391"],
      ["AFT TAMPINES AVE 1", "75401"],
      ["THE SANTORINI", "75409"],
      ["BEF TAMPINES FIRE STN", "75411"],
      ["AFT TAMPINES AVE 5", "75419"],
      ["Reebonz Bldg", "75461"],
      ["Opp Reebonz Bldg", "75469"],
      ["Blk 602B", "75471"],
      ["Blk 619A", "75479"],
      ["Blk 609D", "75481"],
      ["Opp Blk 609D", "75489"],
      ["Blk 614", "75491"],
      ["Opp Blk 614", "75499"],
      ["Blk 604A", "75501"],
      ["Opp Blk 604A", "75509"],
      ["Blk 610C", "75511"],
      ["Opp Blk 610C", "75519"],
      ["Blk 660 CP", "75521"],
      ["Opp Blk 660 CP", "75529"],
      ["Opp Blk 662B", "75531"],
      ["Blk 662B", "75539"],
      ["OPP BLK 648A", "75541"],
      ["BLK 648A", "75549"],
      ["BLK 641A", "75551"],
      ["BLK 646B", "75559"],
      ["BLK 648C", "75561"],
      ["BLK 636C", "75569"],
      ["BLK 637B", "75571"],
      ["BLK 630B", "75579"],
      ["BLK 637 CP", "75581"],
      ["OPP BLK 638A", "75589"],
      ["BEF BLK 631B", "75591"],
      ["OPP BLK 631B", "75599"],
      ["IKEA Tampines", "75601"],
      ["Giant Hypermarket", "75609"],
      ["BHCC Space", "75611"],
      ["T-Space", "75619"],
      ["TAMPINES EAST STN EXIT B", "76031"],
      ["TAMPINES EAST STN EXIT C", "76039"],
      ["BLK 842C", "76041"],
      ["OPP BLK 842C", "76049"],
      ["Our Tampines Hub", "76051"],
      ["Opp Our Tampines Hub", "76059"],
      ["Blk 938", "76061"],
      ["Blk 147", "76069"],
      ["Blk 141", "76071"],
      ["Blk 101", "76079"],
      ["Opp The Holy Trinity Ch", "76081"],
      ["The Holy Trinity Ch", "76089"],
      ["Blk 206", "76091"],
      ["Blk 285", "76099"],
      ["Tampines East CC", "76101"],
      ["Blk 302", "76109"],
      ["Blk 945", "76111"],
      ["Opp Blk 945", "76119"],
      ["Opp St. Hilda's Sec Sch", "76121"],
      ["St. Hilda's Sec Sch", "76129"],
      ["UOB Tampines Ctr", "76131"],
      ["Opp Century Sq", "76139"],
      ["Tampines Stn/Int", "76141"],
      ["Opp Tampines Stn/Int", "76149"],
      ["Blk 237", "76151"],
      ["Opp Blk 237", "76159"],
      ["Opp Blk 248", "76161"],
      ["Blk 248", "76169"],
      ["Blk 266", "76171"],
      ["Opp Blk 266", "76179"],
      ["Blk 216", "76181"],
      ["Opp Blk 216", "76189"],
      ["BLK 401", "76191"],
      ["BLK 503", "76199"],
      ["Blk 423", "76201"],
      ["Blk 233", "76209"],
      ["Blk 449", "76211"],
      ["Blk 230E", "76219"],
      ["TAMPINES EAST STN EXIT A", "76221"],
      ["OPP TAMPINES EAST STN", "76229"],
      ["Opp Blk 390", "76231"],
      ["Blk 390", "76239"],
      ["Blk 497D", "76241"],
      ["Blk 370", "76249"],
      ["Blk 487B", "76251"],
      ["Opp Blk 487B", "76259"],
      ["Blk 489B", "76261"],
      ["Opp Blk 489A", "76269"],
      ["Dunman Sec Sch", "76271"],
      ["Blk 491C", "76279"],
      ["Junyuan Pr Sch", "76281"],
      ["Blk 801", "76289"],
      ["Opp Blk 273", "76291"],
      ["Blk 283", "76301"],
      ["Blk 460", "76311"],
      ["Tampines East Stn Exit D", "76319"],
      ["Blk 125", "76329"],
      ["Opp Tampines Changkat Cc", "76339"],
      ["Blk 464", "76341"],
      ["Dunman Sec Sch", "76349"],
      ["Blk 484", "76351"],
      ["Blk 493B", "76359"],
      ["Blk 430", "76361"],
      ["Blk 496F", "76369"],
      ["Blk 459", "76371"],
      ["Blk 418", "76391"],
      ["Blk 417", "76399"],
      ["Blk 230B", "76401"],
      ["Blk 259", "76409"],
      ["Ngee Ann Sec Sch", "76411"],
      ["Blk 307A", "76419"],
      ["Opp Blk 331", "76421"],
      ["Blk 331", "76429"],
      ["BLK 333", "76431"],
      ["Blk 351", "76439"],
      ["OPP BLK 345", "76441"],
      ["Blk 343", "76449"],
      ["BLK 324", "76451"],
      ["Blk 323", "76459"],
      ["Eden Condo", "76461"],
      ["East Spring Sec Sch", "76469"],
      ["BLK 444", "76471"],
      ["The Tampines Trilliant", "76511"],
      ["BET BLKS 524B/523D", "76519"],
      ["OPP BLK 519A", "76521"],
      ["BLK 519A", "76529"],
      ["Citylife@ Tampines", "76541"],
      ["Opp Citylife@ Tampines", "76549"],
      ["TAMPINES STN EXIT D", "76551"],
      ["AFT TAMPINES STN EXIT E", "76559"],
      ["Pasir Ris Int", "77009"],
      ["Opp Blk 515", "77011"],
      ["Blk 515", "77019"],
      ["Opp Blk 571", "77021"],
      ["Blk 571", "77029"],
      ["Opp Pasir Ris Stn Exit B", "77031"],
      ["Pasir Ris Stn Exit B", "77039"],
      ["Blk 541", "77041"],
      ["Pasir Ris Town Pk", "77049"],
      ["Blk 115", "77051"],
      ["Blk 425", "77059"],
      ["Ris Grandeur", "77061"],
      ["Opp Ris Grandeur", "77069"],
      ["Blk 633", "77071"],
      ["Elias Mall", "77079"],
      ["Aft Pasir Ris Dr 3", "77081"],
      ["Bef Pasir Ris Dr 3", "77089"],
      ["AFT PASIR RIS AVE", "77091"],
      ["Bef Pasir Ris Ave", "77099"],
      ["Bef Pasir Ris Rd", "77101"],
      ["Aft Pasir Ris Rd", "77109"],
      ["Bef Pasir Ris Way", "77111"],
      ["Aft Pasir Ris Way", "77119"],
      ["Pasir Ris Pk", "77129"],
      ["Blk 502", "77131"],
      ["Blk 582", "77139"],
      ["Blk 519", "77141"],
      ["Blk 741", "77161"],
      ["Opp Blk 742", "77169"],
      ["Aft Pasir Ris Stn Exit A", "77171"],
      ["Opp Pasir Ris Stn Exit A", "77179"],
      ["Blk 638", "77181"],
      ["Blk 613", "77189"],
      ["Blk 500A", "77191"],
      ["Opp Blk 500A", "77199"],
      ["Pasir Ris Elias CC", "77201"],
      ["Opp Pasir Ris Elias CC", "77209"],
      ["Blk 626", "77211"],
      ["Opp Blk 626", "77219"],
      ["Blk 651", "77221"],
      ["Tampines Meridian Jc", "77231"],
      ["Blk 643", "77239"],
      ["Opp Blk 640", "77241"],
      ["Blk 640", "77249"],
      ["Blk 713", "77251"],
      ["Opp Blk 713", "77259"],
      ["Blk 717", "77261"],
      ["Opp Blk 717", "77269"],
      ["Aft Pasir Ris St 72", "77271"],
      ["Aft Pasir Ris Ind Dr 1", "77279"],
      ["Blk 740", "77281"],
      ["Blk 738", "77289"],
      ["Blk 753", "77291"],
      ["Blk 778", "77301"],
      ["Opp Blk 778", "77309"],
      ["Bet Blks 771/772", "77311"],
      ["Opp Blks 771/772", "77319"],
      ["Aft Pasir Ris St 53", "77321"],
      ["Bef Pasir Ris St 53", "77329"],
      ["Blk 747A", "77331"],
      ["Opp Blk 756", "77339"],
      ["Opp Blk 569", "77341"],
      ["Blk 569", "77349"],
      ["Blk 562", "77351"],
      ["Blk 564", "77359"],
      ["Blk 555", "77361"],
      ["Opp Blk 555", "77369"],
      ["Blk 586", "77379"],
      ["Blk 524B", "77381"],
      ["Opp Blk 525B", "77389"],
      ["UMC", "77401"],
      ["Opposite UMC", "77409"],
      ["BLK 191", "78031"],
      ["BLK 104", "78039"],
      ["Blk 612", "78049"],
      ["Blk 210", "78059"],
      ["Opp Pasir Ris Polyclinic", "78061"],
      ["Blk 442", "78069"],
      ["Blk 446", "78071"],
      ["Blk 429", "78079"],
      ["Blk 467", "78081"],
      ["Blk 405", "78089"],
      ["Opp Downtown East", "78091"],
      ["Aft Loyang Gdns", "78099"],
      ["Opp Downtown East", "78101"],
      ["Downtown East", "78109"],
      ["Blk 479", "78111"],
      ["Opp Blk 479", "78119"],
      ["Bet Blks 232/233", "78121"],
      ["Opp Blk 233", "78129"],
      ["Pasir Ris Pr Sch", "78131"],
      ["Opp Pasir Ris Pr Sch", "78139"],
      ["Blk 249", "78141"],
      ["NTUC Health Pasir Ris", "78149"],
      ["Blk 230", "78151"],
      ["Opp Blk 230", "78159"],
      ["Blk 216", "78161"],
      ["Opp Blk 216", "78169"],
      ["Blk 108", "78171"],
      ["Opp Blk 108", "78179"],
      ["Bef Blk 187", "78181"],
      ["Opp Blk 187", "78189"],
      ["Aft Blk 182", "78191"],
      ["Opp White Sands Pri Sch", "78199"],
      ["Opp Blk 242", "78201"],
      ["Blk 242", "78209"],
      ["Blk 204", "78211"],
      ["Opp Blk 204", "78219"],
      ["Blk 231A CP", "78221"],
      ["Blk 485", "78229"],
      ["Opp Blk 482", "78231"],
      ["Bet Blks 453/454", "78241"],
      ["Lighthouse", "78251"],
      ["Opp Lighthouse", "78259"],
      ["Opp Ripple Bay", "78261"],
      ["Ripple Bay", "78269"],
      ["Casa Pasir Ris", "78271"],
      ["Opp Loyang Townhse", "78279"],
      ["Lor 1 Geylang Ter", "80009"],
      ["AFT PADANG JERINGAU", "80011"],
      ["Bef Kg Bugis", "80029"],
      ["Kallang Stn", "80031"],
      ["Opp Lor 1 Geylang Ter", "80039"],
      ["Aft Sims Way", "80049"],
      ["Aft Lor 1 Geylang", "80051"],
      ["Opp Mohd Salleh Mque", "80069"],
      ["Yi Xiu Fty Bldg", "80071"],
      ["Bef Lor 18 Geylang", "80089"],
      ["Bef Lor 23 Geylang", "80091"],
      ["Kallang Stn/Opp Blk 2C", "80101"],
      ["Opp Kallang Stn/Blk 2C", "80109"],
      ["Bef Geylang Rd", "80111"],
      ["Aft Geylang Rd", "80119"],
      ["Opp S.A. Deaf", "80141"],
      ["S.A. Deaf", "80149"],
      ["Opp Suntec City", "80151"],
      ["Suntec City", "80159"],
      ["Opp Nicoll Highway Stn", "80161"],
      ["Nicoll Highway Stn", "80169"],
      ["CP F", "80171"],
      ["Opp CP F", "80179"],
      ["Kallang Squash Ctr", "80181"],
      ["Opp Kallang Squash Ctr", "80189"],
      ["Opp S'pore Indoor Stadium", "80191"],
      ["Stadium Stn", "80199"],
      ["Opp Natl Stadium", "80211"],
      ["Natl Stadium", "80219"],
      ["Blk 45", "80229"],
      ["Opp Blk 53", "80231"],
      ["Bef Blk 53", "80239"],
      ["Blk 49 Mkt/FC", "80249"],
      ["Aft Lor 14 Geylang", "80251"],
      ["Aft Chen Li Presby Ch", "80259"],
      ["Bef Sims Ave", "80269"],
      ["Opp Mountbatten Stn", "80271"],
      ["Mountbatten Stn Exit B", "80279"],
      ["Sims Pl Ter", "80289"],
      ["Blk 82", "80291"],
      ["Opp Blk 82", "80299"],
      ["Bef Blk 19", "80301"],
      ["Aft Geylang West CC", "80309"],
      ["Blk 3B", "80311"],
      ["Geylang West CC", "80319"],
      ["Aft Aljunied Stn", "81011"],
      ["Aft Lor 28 Geylang", "81029"],
      ["Blk 134", "81031"],
      ["Aft Lor 34 Geylang", "81049"],
      ["Sims Ville", "81051"],
      ["Opp Lor 39 Geylang", "81069"],
      ["Opp Aljunied Stn", "81081"],
      ["Aljunied Stn", "81089"],
      ["Sims Urban Oasis", "81091"],
      ["Blk 102", "81099"],
      ["CISCO Ctr", "81101"],
      ["Opp CISCO Ctr", "81109"],
      ["Paya Lebar Stn Exit B", "81111"],
      ["Paya Lebar Stn Exit C", "81119"],
      ["Paya Lebar Stn Exit D", "81129"],
      ["Opp Grandlink Sq", "81131"],
      ["Grandlink Sq", "81139"],
      ["Versailles Condo", "81141"],
      ["The Sunny Spring Condo", "81149"],
      ["Kong Hwa Sch", "81151"],
      ["Opp Kong Hwa Sch", "81159"],
      ["blk 56", "81161"],
      ["Opp Blk 56", "81169"],
      ["Blk 39", "81171"],
      ["Blk 22", "81179"],
      ["Dakota Stn Exit A/Blk 99", "81181"],
      ["Dakota Stn Exit B/Blk 60", "81189"],
      ["AFT OLD AIRPORT RD", "81191"],
      ["BEF OLD AIRPORT RD", "81199"],
      ["Opp Geylang Meth Sec Sch", "81201"],
      ["Geylang Meth Pr Sch", "81209"],
      ["Geylang Polyclinic", "81211"],
      ["Opp Geylang Polyclinic", "81219"],
      ["Opp Blk 1015", "81221"],
      ["Blk 1015", "81229"],
      ["Opp Kh Plaza", "81231"],
      ["Eunos Int", "82009"],
      ["Aft Paya Lebar Quarter", "82011"],
      ["Blk 14 Mkt/FC", "82029"],
      ["Blk 416", "82032"],
      ["Blk 414", "82033"],
      ["Joo Chiat Cplx", "82049"],
      ["Aft Tg Katong Stn Exit 2", "82051"],
      ["Bef Tg Katong Stn Exit 3", "82059"],
      ["Eunos Stn/ Int", "82061"],
      ["Aft Lor 106 Changi", "82069"],
      ["Opp Tg Katong Girls' Sch", "82071"],
      ["Tg Katong Girls' Sch", "82079"],
      ["Aft Dunman Rd", "82081"],
      ["Aft Ipoh Lane", "82089"],
      ["Aft Queen Of Peace Ch", "82091"],
      ["CDAC Bldg", "82099"],
      ["City Plaza", "82109"],
      ["Opp Tg Katong Cplx", "82111"],
      ["Tg Katong Cplx", "82119"],
      ["Questa @ Dunman", "82121"],
      ["Tg Katong Sec Sch", "82129"],
      ["Opp Maranatha Hall", "82131"],
      ["Maranatha Hall", "82139"],
      ["Aft Koon Seng Rd", "82141"],
      ["Bef Koon Seng Rd", "82149"],
      ["Bef Joo Chiat Pl", "82151"],
      ["Aft Tembeling Rd", "82159"],
      ["Bef Mangis Rd", "82171"],
      ["Aft Rambutan Rd", "82179"],
      ["Flora East", "82181"],
      ["Blk 3A", "82221"],
      ["Kg Ubi CC", "82229"],
      ["Opp City Plaza", "82231"],
      ["Casa Sarina", "83011"],
      ["Aft Kg Eunos", "83029"],
      ["Opp Hong San Si Tp", "83031"],
      ["Bef Lor 110 Changi", "83049"],
      ["Mjd Kassim", "83059"],
      ["Kembangan Stn", "83062"],
      ["The Buddhist Union", "83063"],
      ["Bef Siglap Plain", "83079"],
      ["Opp Perpetual Succour Ch", "83081"],
      ["Aft Perpetual Succour Ch", "83099"],
      ["Eunos Stn", "83101"],
      ["Opp Eunos Stn", "83109"],
      ["Blk 17", "83111"],
      ["Opp Blk 16", "83119"],
      ["Bef Lor K Telok Kurau", "83121"],
      ["Aft Ji Xiang Ct", "83129"],
      ["Aft Lor H Telok Kurau", "83131"],
      ["Aft Joo Chiat Pl", "83139"],
      ["Aft Lor G Telok Kurau", "83141"],
      ["Aft Changi Rd", "83149"],
      ["Parkway East Hosp", "83151"],
      ["Opp Parkway East Hosp", "83159"],
      ["Bef Still Rd", "83169"],
      ["Bef Roseburn Ave", "83171"],
      ["Aft Siglap Dr", "83179"],
      ["Aft Bethesda Frankel Ch", "83181"],
      ["Bef Bethesda Frankel Ch", "83189"],
      ["Bef Frankel Dr", "83191"],
      ["Aft Frankel Dr", "83199"],
      ["Bef Frankel Terr", "83201"],
      ["Aft Frankel Terr", "83209"],
      ["Bef Frankel Ave", "83219"],
      ["Bef Carlton Ave", "83229"],
      ["Bef Siglap Dr", "83231"],
      ["Opp Cheviot Hill", "83239"],
      ["Flamingo Valley", "83249"],
      ["Bef Jln Khairuddin", "83251"],
      ["Opera Est Pr Sch", "83261"],
      ["Opp Opera Est Pr Sch", "83269"],
      ["Aft Swan Lake Ave", "83271"],
      ["Aft Carmen St", "83279"],
      ["Bef Tosca St", "83281"],
      ["Aft Joo Chiat Pl", "83291"],
      ["Aft Lor G Telok Kurau", "83299"],
      ["Aft East Coast Rd", "83301"],
      ["Aft Still Lane", "83309"],
      ["Aft Lor Nangka", "83311"],
      ["Aft Lor J Telok Kurau", "83319"],
      ["Kembangan Stn", "83321"],
      ["Opp Kembangan Stn", "83329"],
      ["Kg Kembangan CC", "83331"],
      ["Blk 102", "83341"],
      ["Grosvenor View", "83351"],
      ["Hua Yu Mansions", "83361"],
      ["Aft Jln Paras", "83371"],
      ["Bef Jln Kembangan", "83381"],
      ["Bedok Int", "84009"],
      ["Chai Chee Ind Pk", "84011"],
      ["Opp Chai Chee Ind Pk", "84019"],
      ["Blk 32", "84021"],
      ["Opp Blk 32", "84029"],
      ["Bedok Stn Exit B", "84031"],
      ["Bedok Stn Exit A", "84039"],
      ["Blk 221A", "84041"],
      ["Blk 27", "84049"],
      ["Bedok Sports Cplx", "84051"],
      ["Blk 65", "84059"],
      ["The Tanamera Condo", "84061"],
      ["Blk 55", "84069"],
      ["Blk 71", "84071"],
      ["Opp Blk 71", "84079"],
      ["Opp Blk 40", "84081"],
      ["Blk 40", "84089"],
      ["ECO Condo", "84101"],
      ["Bef Bedok View Sec Sch", "84109"],
      ["Temasek JC", "84111"],
      ["Opp Temasek JC", "84119"],
      ["Aft Bedok Sth Ave 1", "84121"],
      ["Fujitec S'pore Ltd", "84129"],
      ["Opp Panasonic", "84131"],
      ["Panasonic", "84139"],
      ["OPP LION HME FOR ELDERS", "84141"],
      ["LION HME FOR ELDERS", "84149"],
      ["Casafina", "84151"],
      ["Opp Casafina/Temasek JC", "84159"],
      ["BLK 3", "84161"],
      ["OPP BLK 3", "84169"],
      ["Blk 220 CP", "84191"],
      ["Opp Blk 220 CP", "84199"],
      ["BEDOK RESVR STN EXIT A", "84201"],
      ["Bedok Resvr Stn Exit B", "84209"],
      ["BLK 403", "84211"],
      ["Blk 139", "84219"],
      ["Blk 109", "84221"],
      ["Blk 111", "84229"],
      ["Blk 85", "84231"],
      ["Opp Blk 85", "84239"],
      ["Blk 81", "84241"],
      ["Blk 124", "84249"],
      ["Blk 99", "84251"],
      ["Blk 88", "84259"],
      ["Saint Anthony's Canossian School", "84261"],
      ["Blk 95", "84269"],
      ["Aft Bedok Ind Pk E", "84271"],
      ["Aft Bedok Nth St 5", "84279"],
      ["Blk 180", "84281"],
      ["Opp Blk 180", "84289"],
      ["Bedok Nth Depot", "84299"],
      ["Blk 41", "84301"],
      ["Blk 423", "84309"],
      ["Blk 521", "84311"],
      ["Blk 428", "84319"],
      ["Blk 516", "84321"],
      ["Blk 414", "84329"],
      ["Opp Blk 416", "84331"],
      ["Blk 416", "84339"],
      ["Opp Fengshan Pr Sch", "84341"],
      ["Fengshan Pr Sch", "84349"],
      ["Bedok Ctrl PO", "84351"],
      ["Opp Bedok Ctrl PO", "84359"],
      ["Blk 547", "84361"],
      ["Blk 45", "84369"],
      ["Blk 546", "84371"],
      ["Opp Blk 546", "84379"],
      ["Blk 544", "84381"],
      ["Blk 534", "84391"],
      ["Opp Blk 550", "84401"],
      ["Blk 550", "84409"],
      ["Blk 526", "84411"],
      ["Blk 512", "84419"],
      ["Blk 510", "84421"],
      ["Blk 515", "84429"],
      ["Blk 3014", "84431"],
      ["Opp Blk 3014", "84439"],
      ["Blk 509", "84449"],
      ["BEDOK NTH STN EXIT A", "84451"],
      ["Bet Blks 705/706", "84459"],
      ["Opp Blk 701", "84461"],
      ["Blk 703", "84469"],
      ["Blk 745", "84471"],
      ["Blk 713", "84479"],
      ["Aft Bedok Ind Pk C", "84481"],
      ["Opp Bedok Ind Pk C", "84489"],
      ["Blk 629", "84491"],
      ["Blk 140", "84499"],
      ["Christ Ch", "84501"],
      ["Blk 608", "84511"],
      ["Blk 506", "84521"],
      ["Blk 109", "84529"],
      ["BEDOK NTH STN EXIT B", "84539"],
      ["Blk 42", "84541"],
      ["Opp Blk 42", "84549"],
      ["BLK 51", "84551"],
      ["Opp Blks 50/51", "84559"],
      ["BLK 53", "84561"],
      ["Opp Blk 53", "84569"],
      ["OPP BLK 55", "84571"],
      ["Aft Chai Chee St", "84579"],
      ["Opp Bedok Sth NPC", "84581"],
      ["Bef New Upp Changi Rd", "84589"],
      ["Sbst Bedok Nth Depot", "84591"],
      ["Opp Sbst Bedok Nth Depot", "84599"],
      ["Opp Waterfront Key", "84601"],
      ["Waterfront Key", "84609"],
      ["Opp Waterfront Isle", "84611"],
      ["Waterfront Isle", "84619"],
      ["Opp Blk 716", "84621"],
      ["Blk 716", "84629"],
      ["Opp Waterfront Waves", "84631"],
      ["Aft Waterfront Waves", "84639"],
      ["Blk 24", "84641"],
      ["Opp Blk 24", "84649"],
      ["Aft Heartbeat @ Bedok", "84651"],
      ["Bef Heartbeat @ Bedok", "84659"],
      ["Blk 172", "84661"],
      ["Blk 73", "84669"],
      ["Aft Blk 156", "84671"],
      ["Opp Blk 156", "84679"],
      ["Blk 163", "84681"],
      ["Blk 171", "84691"],
      ["Blk 151", "84701"],
      ["Opp Blk 150", "84709"],
      ["Eastwood Ctr", "85019"],
      ["Country Pk", "85021"],
      ["Aft Bedok Meth Ch", "85029"],
      ["Excelsior Gdns", "85031"],
      ["Opp Excelsior Gdns", "85039"],
      ["Man Fatt Lam Tp", "85041"],
      ["Opp Man Fatt Lam Tp", "85049"],
      ["Aft Jln Chempaka Kuning", "85051"],
      ["Bef Jln Chempaka Kuning", "85059"],
      ["Opp Bedok Mkt Pl", "85061"],
      ["Bedok Mkt Pl", "85069"],
      ["Bef Changi Fire Stn", "85071"],
      ["Flextronic", "85079"],
      ["Bef Jln Pari Burong", "85081"],
      ["Aft Sungei Bedok", "85089"],
      ["Tanah Merah Stn Exit B", "85091"],
      ["Tanah Merah Stn Exit A", "85099"],
      ["Aft Bedok Rd", "85101"],
      ["Bef Bedok Rd", "85109"],
      ["Bef Tg Rhu View", "90011"],
      ["Pk Shore Condo", "90019"],
      ["Pebble Bay", "90021"],
      ["Opp Pebble Bay", "90029"],
      ["Camelot By-The-Water", "90031"],
      ["Opp Camelot By-The-Water", "90039"],
      ["Tanjong Rhu Stn Exit 2", "90041"],
      ["Tanjong Rhu Stn Exit 1", "90049"],
      ["Opp S'pore Swim Club", "90051"],
      ["S'pore Swim Club", "90059"],
      ["Dunman High Sch", "90061"],
      ["Opp Dunman High Sch", "90069"],
      ["Opp Costa Rhu Condo", "90079"],
      ["KiddiWinkie S/H @ Mountbatten", "91041"],
      ["Bef Fort Rd", "91049"],
      ["Opp Santa Fe Mansions", "91051"],
      ["Aft Margate Rd", "91059"],
      ["Bet Hse No. 767/767A", "91061"],
      ["Bef Walton Rd", "91069"],
      ["Bef Tg Katong Rd", "91071"],
      ["Aft Tg Katong Rd", "91079"],
      ["Aft Katong Pk Stn Exit 2", "91081"],
      ["Opp Katong Pk Stn", "91089"],
      ["Bef Kg Kayu Rd", "91091"],
      ["Bef Wilkinson Rd", "91099"],
      ["Tg Katong Flyover", "91101"],
      ["CP B1", "91111"],
      ["Marine Pde Stn Exit 2", "92041"],
      ["Marine Pde Stn/Parkway Pde", "92049"],
      ["Marine Pde Stn Exit 4", "92051"],
      ["Marine Pde Stn Exit 6", "92059"],
      ["CHIJ Katong Convent (Pr)", "92061"],
      ["Tao Nan Sch", "92069"],
      ["Marine Terr Stn Exit 4", "92071"],
      ["Marine Terr Stn Exit 1", "92079"],
      ["St. Patrick's Sec Sch", "92081"],
      ["Marine Terr Stn/Katong Convent", "92089"],
      ["Opp One Amber", "92091"],
      ["One Amber", "92099"],
      ["Katong Shop Ctr", "92101"],
      ["Opp Katong Shop Ctr", "92109"],
      ["Opp Roxy Sq", "92111"],
      ["Roxy Sq", "92119"],
      ["Opp The Holy Family Ch", "92121"],
      ["The Holy Family Ch", "92129"],
      ["Caltex Stn", "92131"],
      ["Opp Caltex Stn", "92139"],
      ["KiddiWinkie S/H @ East Coast", "92141"],
      ["St. Patrick's Green", "92149"],
      ["Christ Meth Ch", "92151"],
      ["ST. PATRICK'S SCH", "92159"],
      ["Aft Katong PO", "92161"],
      ["Bef Katong PO", "92169"],
      ["Marshall Lane", "92171"],
      ["Aft Duku Rd", "92179"],
      ["112 Katong", "92181"],
      ["Opp 112 Katong", "92189"],
      ["Opp CP C3", "92191"],
      ["Raintree Cove", "92199"],
      ["Aft Lor M Telok Kurau", "92201"],
      ["Aft Jln Baiduri", "92209"],
      ["CHIJ Katong Convent (Sec)", "92211"],
      ["Opp CHIJ Katong Convent", "92219"],
      ["Blk 19", "92221"],
      ["Blk 53", "92229"],
      ["Blk 34", "92231"],
      ["Blk 45", "92239"],
      ["Amber Gdns", "92241"],
      ["Opp Amber Gdns", "92249"],
      ["Opp Parkland Green", "92251"],
      ["Opp P/G @ Big Splash", "92261"],
      ["Opp D'Ecosia", "92271"],
      ["D'Ecosia", "92279"],
      ["Marine Cove", "92289"],
      ["Bef St. Patrick's Rd", "92301"],
      ["East Coast Apts", "92309"],
      ["Opp Neptune Ct", "93011"],
      ["Neptune Ct", "93019"],
      ["Opp Mandarin Gdns", "93021"],
      ["Mandarin Gdns", "93029"],
      ["Siglap Stn/Opp Victoria Sch", "93031"],
      ["Siglap Stn/Laguna Park", "93039"],
      ["Hua Xin Ct", "93041"],
      ["Lagoon View", "93049"],
      ["Aft Dunbar Wk", "93051"],
      ["Aft Jln Buloh Perindu", "93059"],
      ["Bef Siglap Rd", "93061"],
      ["Aft Siglap Rd", "93069"],
      ["Crescendo Bldg", "93071"],
      ["Opp Springvale", "93079"],
      ["Opp Chiang Ct", "93081"],
      ["Opp Goodwill Ct", "93089"],
      ["Opp Siglap Sth CC", "93091"],
      ["Siglap Sth CC", "93099"],
      ["Aft Coldstream Ave", "93101"],
      ["Bef Frankel Pl", "93109"],
      ["Bef Elite Pk Ave", "93111"],
      ["Aft Elite Pk Ave", "93119"],
      ["Opp Sekolah Indonesia", "93121"],
      ["Bef Sekolah Indonesia", "93129"],
      ["Opp Eastern Lagoon II", "93131"],
      ["Eastern Lagoon II", "93139"],
      ["Seaside Residences", "93149"],
      ["Opp Cable Ski Pk", "93151"],
      ["Cable Ski Pk", "93159"],
      ["Bef CP E1", "93161"],
      ["Bef CP D5", "93169"],
      ["Opp CP D3", "93171"],
      ["CP D3", "93179"],
      ["Opp CP C4", "93181"],
      ["Opp Victoria JC", "93189"],
      ["Bef Seaside Residences", "93199"],
      ["Victoria Sch", "93201"],
      ["Upp East Coast Ter", "94009"],
      ["Evergreen Gdn", "94011"],
      ["Opp Evergreen Ave", "94019"],
      ["Bef Sennett Rd", "94021"],
      ["Aft Sennet Rd", "94029"],
      ["The Summit", "94031"],
      ["Opp The Summit", "94039"],
      ["Aft Parbury Ave", "94041"],
      ["Aft Bedok Sth Ave 3", "94049"],
      ["Opp Temasek Sec Sch", "94051"],
      ["Temasek Sec Sch", "94059"],
      ["Kew Green Condo", "94061"],
      ["Opp Kew Green Condo", "94069"],
      ["Opp Bedok Camp 2", "94071"],
      ["Bedok Camp 2", "94079"],
      ["Calvary Ably Of God Ch", "94089"],
      ["Aft E.C. Sea Sports Club", "94099"],
      ["Aft Aircraft Flyover", "95011"],
      ["Aft Changi Airport Ter 2", "95019"],
      ["Changi Airport Ter 1", "95029"],
      ["Airfreight Ter Bldg", "95039"],
      ["CIAS Cargo Ters", "95041"],
      ["SATS Cargo Ter", "95049"],
      ["3rd Cargo Agents", "95051"],
      ["Airline Hse", "95061"],
      ["Opp Airline Hse", "95069"],
      ["Changi Beach CP 4", "95071"],
      ["Opp Changi Beach CP 3", "95079"],
      ["Changi Beach CP 5", "95081"],
      ["Opp Changi Beach CP 5", "95089"],
      ["SAF Ferry Ter", "95091"],
      ["Opp SAF Ferry Ter", "95099"],
      ["Changi Airport Ter 3", "95109"],
      ["Changi Airport Ter 2", "95129"],
      ["Police Pass Off", "95131"],
      ["Police Pass Off", "95139"],
      ["Aft Cargo Bldg D", "95141"],
      ["Bef Cargo Bldg D", "95149"],
      ["Airport Police Stn", "95151"],
      ["Near SATS Flight Kitchen", "95159"],
      ["Bef Changi Ferry Rd", "95161"],
      ["Aft Changi Ferry Rd", "95169"],
      ["Prologis", "95171"],
      ["DHL", "95179"],
      ["Menlo Worldwide", "95181"],
      ["Expeditors", "95189"],
      ["Opp DB Schenker", "95191"],
      ["Changi Airport Ter 4", "95209"],
      ["BEF SIMEI RD", "95901"],
      ["AFT SOMAPAH RD", "95909"],
      ["Bef Simei Ave", "96011"],
      ["Aft Simei Ave", "96019"],
      ["Opp Expo Halls 1/2/3", "96021"],
      ["Expo Halls 1/2/3", "96029"],
      ["Opp Expo Halls 4/5/6", "96031"],
      ["Expo Halls 4/5/6", "96039"],
      ["Upp Changi Stn/Opp SUTD", "96041"],
      ["Upp Changi Stn/SUTD", "96049"],
      ["Opp Changi Ct", "96051"],
      ["Changi Ct", "96059"],
      ["Opp Mera Terr P/G", "96061"],
      ["Mera Terr P/G", "96069"],
      ["Opp ITE Coll East Tec Blk", "96071"],
      ["ITE Coll East Tec Blk", "96079"],
      ["Grace Independent Ch", "96081"],
      ["Opp Grace Independent Ch", "96089"],
      ["Aft Upp Changi Rd", "96091"],
      ["Aft Upp Changi Rd East", "96099"],
      ["Blk 3012", "96101"],
      ["Opp Blk 3012", "96109"],
      ["Opp ITE Coll East Adm Blk", "96111"],
      ["ITE Coll East Adm Blk", "96119"],
      ["Metta Welfare Assn", "96121"],
      ["Melville Pk", "96129"],
      ["Blk 130", "96131"],
      ["Blk 148", "96139"],
      ["Blk 120/Opp Simei Stn", "96141"],
      ["Simei Stn/Blk 247", "96149"],
      ["Blk 106", "96151"],
      ["Blk 254", "96159"],
      ["Opp Simei Stn", "96161"],
      ["Simei Stn", "96169"],
      ["Bet Blks 227/228", "96171"],
      ["Modena Condo/Opp Blk 228", "96179"],
      ["Blk 151", "96181"],
      ["Blk 166", "96189"],
      ["Blk 224", "96191"],
      ["Opp Blk 224", "96199"],
      ["Simei Green Condo", "96201"],
      ["Opp Simei Green Condo", "96209"],
      ["Tanah Merah Ferry Ter", "96219"],
      ["Opp S'pore Expo", "96221"],
      ["S'pore Expo", "96229"],
      ["DB Schenker", "96231"],
      ["CEVA Freight", "96239"],
      ["LAGUNA NATL COUNTRY CLUB", "96241"],
      ["Builders Ctr", "96249"],
      ["Bef Changi General Hosp", "96251"],
      ["Aft Changi General Hosp", "96259"],
      ["Blk 233", "96261"],
      ["Blk 146", "96269"],
      ["Opp Global Logistics Ctr", "96271"],
      ["Opp Changi General Hosp", "96281"],
      ["Changi General Hosp", "96289"],
      ["Blk 223", "96291"],
      ["Opp Blk 222", "96299"],
      ["EXPO STN EXIT B", "96301"],
      ["EXPO STN EXIT E", "96309"],
      ["BEF CHANGI STH ST 2", "96311"],
      ["Yusen Logistics", "96319"],
      ["DBS Asia Hub", "96321"],
      ["DHL", "96329"],
      ["Strides Premier", "96331"],
      ["Aft Sunny Metal & Engrg", "96341"],
      ["Bef Changi Sth St 1", "96351"],
      ["Aft Akzonobel", "96361"],
      ["STANDARD CHARTERED BANK", "96371"],
      ["Changi City Pt", "96381"],
      ["Opp Changi City Pt", "96389"],
      ["Aft Changi Biz Pk Cres", "96391"],
      ["Honeywell Bldg", "96401"],
      ["Opp Eightrium", "96411"],
      ["Eightrium", "96419"],
      ["OPP CHANGI LODGE 2", "96421"],
      ["CHANGI LODGE 2", "96429"],
      ["OPP CHANGI NAVAL BASE", "96431"],
      ["CHANGI NAVAL BASE", "96439"],
      ["OPP SUTD", "96441"],
      ["SUTD", "96449"],
      ["Before Aviation Park Road", "96461"],
      ["Bef Changi Coast Road", "96471"],
      ["After Changi Coast Road", "96479"],
      ["Changi Business Pk Ter", "97009"],
      ["The Japanese Sch", "97011"],
      ["Opp Salvation Army", "97019"],
      ["Aft Jln Bena", "97031"],
      ["Bef Jln Bena", "97039"],
      ["Ballota Pk Condo", "97041"],
      ["Changi Prison", "97049"],
      ["Komo Shoppes", "97051"],
      ["Changi Women's Prison", "97059"],
      ["Changi Baptist Ch", "97061"],
      ["Lloyd Leas Work Rel Camp", "97069"],
      ["Aft St. John's Cres", "97071"],
      ["Opp St. John's Cres", "97079"],
      ["Selarang Pk Drug Reh.", "97081"],
      ["Opp Selarang Pk Drug Reh.", "97089"],
      ["Bef Selarang Way", "97091"],
      ["Aft Loyang Ave", "97099"],
      ["Bef Jln Mariam", "97101"],
      ["Aft Jln Mariam", "97109"],
      ["Bef Toh Cl", "97111"],
      ["Aft Toh Cl", "97119"],
      ["Bef Old Tampines Rd", "97121"],
      ["Bef Loyang Ave", "97129"],
      ["Aft Upp Changi Rd Nth", "97141"],
      ["Aft VICOM", "97149"],
      ["Aft Changi Nth St 2", "97151"],
      ["Bef Vicom", "97159"],
      ["Edwards Lifesciences", "97161"],
      ["Opp Edwards Lifesciences", "97169"],
      ["Opp SATS Catering", "97171"],
      ["SATS Catering", "97179"],
      ["Seamap", "97181"],
      ["SATS Maintenance Ctr 2", "97189"],
      ["Opp Changi Chapel Museum", "97201"],
      ["Changi Chapel Museum", "97209"],
      ["Aft Changi Nth St 1", "97301"],
      ["Zuellig Pharma", "97311"],
      ["Aft Compass Green", "97321"],
      ["Bef Changi Prison Cplx", "97331"],
      ["Blk 149A", "98011"],
      ["Opp Blk 149A", "98019"],
      ["Blk 275", "98021"],
      ["Opp Blk 275", "98029"],
      ["Opp Loyang Valley", "98041"],
      ["Loyang Valley", "98049"],
      ["Opp Engine Test Facility", "98061"],
      ["Aft Engine Test Facility", "98069"],
      ["Loyang Way 4/Soxal", "98071"],
      ["Opp Loyang Way 4/Soxal", "98079"],
      ["Aft Jln Batalong", "98081"],
      ["Bef Jln Batalong", "98089"],
      ["Blk 156", "98091"],
      ["Blk 269A", "98099"],
      ["Loyang Pt", "98101"],
      ["Opp Loyang Pt", "98109"],
      ["BLK 256/OPP LOYANG PT", "98111"],
      ["Loyang Pt/Opp Blk 256", "98119"],
      ["Krislite Bldg", "98121"],
      ["Opp Krislite Bldg", "98129"],
      ["Bef Loyang Way 1", "98131"],
      ["Aft Loyang Way 1", "98139"],
      ["GE Aircraft Engines", "98141"],
      ["Wacker Chemicals", "98149"],
      ["Opp Loyang Way 4", "98151"],
      ["Composite Tech", "98161"],
      ["Opp SIA Supplies Ctr", "98171"],
      ["Opp Loyang Way 6", "98181"],
      ["Aft Loyang Way", "98199"],
      ["Encompass Digital Media", "98209"],
      ["Pratt & Whitney Canada", "98219"],
      ["Honey Well", "98229"],
      ["OPP PALM ISLES", "98291"],
      ["PARC OLYMPIA", "98299"],
      ["Avila Gdns", "98301"],
      ["Carissa Pk", "98309"],
      ["Bef Mariam Wk", "98311"],
      ["Aft Ballota Pk", "98319"],
      ["Changi Village Ter", "99009"],
      ["Bef Sch Of Commando", "99011"],
      ["Aft Sch Of Commando", "99019"],
      ["Bef Cranwell Rd", "99021"],
      ["Aft Cranwell Rd", "99029"],
      ["Opp Maranatha B-P Ch", "99031"],
      ["St. George Chapel", "99039"],
      ["Aft Changi Golf Course", "99041"],
      ["Changi Golf Course", "99049"],
      ["Aft Old Pier Rd", "99071"],
      ["Opp Old Pier Rd", "99079"],
      ["Aft Cranwell Rd", "99081"],
      ["Bef Cranwell Rd", "99089"],
      ["Bef Turnhouse Rd", "99091"],
      ["Aft Turnhouse Rd", "99099"],
      ["Govt Chalets", "99101"],
      ["Opp Govt Chalets", "99109"],
      ["Changi Golf Club", "99111"],
      ["Opp Changi Golf Club", "99119"],
      ["Village Hotel Changi", "99129"],
      ["Blk 4", "99131"],
      ["Blk 5", "99139"],
      ["Aft Changi Beach CP 3", "99161"],
      ["Changi Beach CP 2", "99171"],
      ["Bef S'pore Aviation Ac", "99181"],
      ["S'pore Aviation Ac", "99189"]
  ]
  
  for (const list of full_list)
    list.push([])
  for (const list of full_list) {
    for (const dict of mrtlink) {
      for (const dict2 of dict["closest_stops"]) {
        if (dict2["BusStopCode"] === list[1])
          list[2].push(dict["code"])
      }
    }
  }
  const jsonData = JSON.stringify(full_list, null, 2); // Indentation for better readability

      // Create a Blob from the JSON string
      const blob = new Blob([jsonData], { type: "application/json" });

      // Create a link element
      const link = document.createElement("a");

      // Set the download attribute with the desired filename
      link.download = "data.json";

      // Create an object URL for the Blob and set it as the href of the link
      link.href = URL.createObjectURL(blob);

      // Programmatically click the link to trigger the download
      link.click();
  console.log("Test End");
}


  return (
    <>
      <ul className="nv">
          <li>
            <Link to="/" className={location.pathname === "/" ? "activee" : ""}><img className="nyoom" src="./images/nyoom_icon.png"/></Link>
          </li>
          <li>
            <Link to="/arrivaltimes" className={location.pathname === "/arrivaltimes" ? "activee" : ""}>Bus Arrival Times</Link>
          </li>
          <li>
            <Link to="/traveltimeest" className={location.pathname === "/traveltimeest" ? "activee" : ""}>Find Travel Routes</Link>
          </li>
          <li>
            <button id="test_button" onClick={test_function}> Test Button </button><span id="test_text"></span>
          </li>
        {/*------ ABOVE IS FLOATED LEFT, BELOW IS FLOATED RIGHT -----------------------------*/}
          <li style={{ float: 'right' }}>
            <ToggleThemeButton/> 
          </li>
          <li style={{ float: 'right' }} className="dropdown">
            <a href="javascript:void(0)" className="dropbtn">
              { !userLoggedIn ? (
                <Link className = "loginright"to="/login" >Login</Link> 
              ) : (
                <>
                  <div className="loginuser"> {localStorage.getItem('username')} </div>
                  <div className="dropdown-content">
                    <Link to="/about" className="dropdownItem">About</Link><br/>
                    <Link to="/settings" className="dropdownItem">Settings</Link><br/>
                    <Link to="/ost" className="dropdownItem">Soundtrack</Link><br/>
                    { userLoggedIn && <button id="logout" onClick={logout}>Log Out</button>}
                  </div>
                </>
              )}
            </a>
          </li>
      </ul>
      <Outlet />
    </>
  )
};

export default NavBar;
