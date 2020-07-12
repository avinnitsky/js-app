import './styles.css'
import './less/styles.less'
import './babel.js'

import React from 'react'
import {render} from 'react-dom'

const App = () => (
    <div>
        <div className="mui--text-white mui--text-display1 mui--align-vertical">BLOG TITLE</div>
        <div className="logo"></div>
    </div>
)

console.log('sidebar', document.getElementById('sidebar'))

render(<App/>, document.getElementById('sidebar'))