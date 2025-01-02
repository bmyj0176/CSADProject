import { useState, useEffect } from "react";
import { ArrivalTimesElement } from "./ArrivalTimesList";
import SearchResult from "./SearchResult";

const SavedArrivalTimes = (props) => {
  const [favedItems, setFavedItems] = useState(() => {
    const storedFavedItems = localStorage.getItem("savedarrivaltimes");
    return storedFavedItems ? JSON.parse(storedFavedItems) : [];
  });

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

  return (
    <>
      <button onClick={() => console.log(favedItems)}>consolelog</button>
      <button onClick={() => {localStorage.clear}}>clear</button>
      {Array.from({ length: favedItems.length }, (_, index) => (
            <div key={index} className="bar">
              {favedItems ? ( 
                /*<SearchResult 
                dict={favedItems[index]} 
                index={index}
                receiveSearchResult={props.receiveSearchResult}
                selectedItem={selectedItem}
                onItemSelect={onItemSelect}
                favedItems={favedItems}
                onFavItem={onFavItem}
                />*/""
              ) : (
                <> Unable to get Location Data <br/> Please enable it in your browser settings </>
              )}
            </div>
          ))}
    </>
  );
};

export default SavedArrivalTimes;
