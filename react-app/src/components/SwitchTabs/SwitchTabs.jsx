import React, {useState} from 'react'
import './SwitchTabs.scss'

export default function SwitchTabs({tabs, onTabChange}) {
    const [activeTab, setActiveTab] = useState(tabs[0])                    // initially first tab active
    
    const switchTab = (e) => {
        const tab = e.target.innerHTML
        setTimeout(() => {
            setActiveTab(tab)
        },300);
        onTabChange(tab)
    }
    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {
                    tabs.map((tab,index) => <span key={index} className={`tabItem ${activeTab == tab? "activeTab":""}`}  onClick={switchTab}>{tab}</span>)
                }
                
            </div>
        </div>
    )
}
