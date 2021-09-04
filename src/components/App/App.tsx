import React from 'react'
import StepProgress from '../StepProgress/StepProgress'
import './css/reset.css'
import './css/general.css'
import './css/App.css'
import StepProgressType from '../StepProgress/StepProgressTypes'


function App() {

    const progressConfig: StepProgressType.PropTypeConfig = {
        startStep: 3,
        steps: ['Design', 'Build', 'Launch', 'Feedback', 'Finish']
    }

    return (
        <div className="app">
            <StepProgress config={progressConfig} />
        </div>
    )
}

export default App
