import React from 'react';
import ReactDOM from 'react-dom';
import { getBusTiming } from './helper_func';

const main = async () => {
  console.log('START')
  console.log(await getBusTiming(46971, "901"))
}

main()