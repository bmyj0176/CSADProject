import { useState, useEffect } from "react";
import { getBusTiming } from "../../helper_functions";
import ArrivalTimesElement from './ArrivalTimesElement';

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
      {favedItems.length !== 0 && <h2>Favourited List</h2>}
      {Array.from({ length: favedItems.length }, (_, index) => (
        <div key={index} className="bar">
        {favedItems && ( 
          <ArrivalTimesElement
          type={favedItems[index].type}
          busStopCode={favedItems[index].busStopCode}
          busStopName={favedItems[index].busStopName}
          busService={favedItems[index].busService}
          busTimesList={timesListList[index]}
          favedItems={props.favedItems}
          onFavItem={props.onFavItem}/>)}
        </div>
      ))}
    </>
  );
};

export default SavedArrivalTimes;
