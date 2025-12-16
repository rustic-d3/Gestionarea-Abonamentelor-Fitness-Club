import ClientsFullSubscriptionTable from '../components/ClinetsFullSubscribtionTable';
import Header from '../components/Header.jsx'
export default function FullPaidClients(){
    return(
        <div>
            <Header></Header>
            <div style={{
            marginTop: "100px",
        }}>
            <ul>
            <li>
                <a href="/full-paid">Clienti fideli</a>
                
            </li>
            <li><a href="/full-report">Raport detaliat</a></li>
        </ul>
        <   ClientsFullSubscriptionTable></ClientsFullSubscriptionTable>
        </div>

            </div>
            
    )
}
