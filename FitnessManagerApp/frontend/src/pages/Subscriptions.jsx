import React from 'react'
import AllSubscriptionsTable from '../components/AllSubscriptionsTable.jsx'
import Header from '../components/Header.jsx'

export default function Subscriptions() {
  return (
    <div>
      <Header></Header>
      <div style={{
            marginTop: "100px",
        }}>
        <h1>Abonamentele Clientilor</h1>
        <AllSubscriptionsTable />
      </div>
        
      
    </div>
  )
}
