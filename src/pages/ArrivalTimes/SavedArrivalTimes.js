import { useState, useEffect, useContext } from "react";
import { getBusTiming } from "../../utils/helper_functions";
import ArrivalTimesElement from './ArrivalTimesElement';
import { ThemeContext } from '../Components/ToggleThemeButton';
import "../stylesheets/ATpages/arrivaltimes.css";


const SavedArrivalTimes = (props) => {
  const [favedItems, setFavedItems] = useState(() => {
    const storedFavedItems = localStorage.getItem("savedarrivaltimes");
    return storedFavedItems ? JSON.parse(storedFavedItems) : [];
  });
  const [timesListList, setTimesListList] = useState([])

  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    const updateAllTimesList = async () => {
      const timesList = await Promise.all(
        props.favedItems.map((dict) => getBusTiming(dict.busStopCode, dict.busService))
      );
      setTimesListList(timesList)
    }
    updateAllTimesList();
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

  const updateBusTimes = async (index) => {
    const updatedTimesList = [...timesListList];
    updatedTimesList[index] = await getBusTiming(favedItems[index].busStopCode, favedItems[index].busService);
    setTimesListList(updatedTimesList);
}


  return (  
    <>
      {favedItems.length !== 0 && <h2 style={{color: isDarkTheme ? "rgb(109, 231, 255)" : "rgb(43, 28, 9)"}} className="bookmarkedtext">{props.page}</h2>}
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
                  updateBusTimes={() => updateBusTimes(index)}
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
