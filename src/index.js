import React from 'react';
import {render} from 'react-dom';
import { Postshelf } from './components/Postshelf'
import './styles/styles.css'

const rootElement = document.getElementById('root')
render(<Postshelf />, rootElement)