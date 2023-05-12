import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
//import './index.css'
//import './custom-styles.css'
import UploadComponent from './components/UploadComponent.tsx'
import PlanPreviewComponent from './components/PlanGeneratorComponent.tsx'
import PlanDownloadComponent from './components/PlanDownloadComponent.tsx'
import HeaderComponent from './components/HeaderComponent.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App/>
    { /*<PlanDownloadComponent/>*/ }

  </React.StrictMode>
)
