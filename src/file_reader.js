
// THIS FUNCTION GETS ENTIRE JSON OBJECT FROM A FILE PATH
export async function get_json(path) {
  return fetch(path) // fetch json then return as promise
  .then(response => {
    return response.json() // parse into js object (promise)
  })
  .then(data => {
    console.log(data) // promise done, data shld be a dict
    return data // return dict
  })
}

export async function get_list(path) {
  return fetch(path) // Fetch the text file from the given path
    .then(response => response.text()) // Read the response as text
    .then(text => {
      // Parse the text into a JavaScript array
      const data = JSON.parse(text);
      console.log(data); // Log the array
      return data; // Return the array
    })
    .catch(error => {
      console.error("Error reading or parsing the file:", error);
    });
}
