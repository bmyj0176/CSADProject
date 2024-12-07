
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

// THIS FUNCTION JUST RETURNS API KEY, USE AWAIT
export async function api_key() {
  return fetch('./api_key.txt')
  .then(response => {
    return response.text() // parse into string
  })
  .then(data => {
    return data // return string
  })
}