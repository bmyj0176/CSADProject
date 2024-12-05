import React from 'react';
import ReactDOM from 'react-dom';
import { get_json, api_key } from './file_reader.js'

const Display = (props) => {
  return <h2>{props.data}</h2>
}

const main = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(< Display data={ await api_key() } />)
}

main()
