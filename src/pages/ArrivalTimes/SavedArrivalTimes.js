import { useState, useEffect } from "react";
import { getBusTiming } from "../../helper_functions";
import ArrivalTimesElement from './ArrivalTimesElement';
import "../stylesheets/ATpages/arrivaltimes.css";

const SavedArrivalTimes = (props) => {
  const [favedItems, setFavedItems] = useState(() => {
    const storedFavedItems = localStorage.getItem("savedarrivaltimes");
    return storedFavedItems ? JSON.parse(storedFavedItems) : [];
  });
  const [timesListList, setTimesListList] = useState([])

  useEffect(() => {
    const updateTimesList = async () => {
      const timesList = await Promise.all(
        props.favedItems.map((dict) => getBusTiming(dict.busStopCode, dict.busService))
      );
      setTimesListList(timesList)
    }
    updateTimesList();
  }, [props.favedItems])

  useEffect(() => {
    const handleStorageUpdate = (event) => {
      if (event.detail.key === "savedarrivaltimes") {
        const updatedFavedItems = localStorage.getItem("savedarrivaltimes");
        setFavedItems(updatedFavedItems ? JSON.parse(updatedFavedItems) : []);
      }
    };

    // Listen for custom localStorage updates
    window.addEventListener("localStorageUpdate", handleStorageUpdate);

    return () => {
      window.removeEventListener("localStorageUpdate", handleStorageUpdate);
    };
  }, []);

  useEffect(() => {

  }, [])

  return (  
    <>
      {favedItems.length !== 0 && <h2 className="bookmarkedtext">{props.page}</h2>}
      <ul className="barr">
        {favedItems.map((item, index) => (
          <li key={index}>
            <div className="bar">
              {favedItems && ( 
                <ArrivalTimesElement
                  type={item.type}
                  busStopCode={item.busStopCode}
                  busStopName={item.busStopName}
                  busService={item.busService}
                  busTimesList={timesListList[index]}
                  favedItems={props.favedItems}
                  onFavItem={props.onFavItem}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
  
};

export default SavedArrivalTimes;
