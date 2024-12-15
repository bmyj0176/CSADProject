
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
  return fetch(path) // fetch
    .then(response => response.text()) // read it as text
    .then(text => {
      // parse into a js array
      const data = JSON.parse(text);
      return data;
    })
}
