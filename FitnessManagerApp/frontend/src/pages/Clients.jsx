import AllUsersTable from '../components/AllUsersTable'
import '../css/clients.css'
import Header from '../components/Header.jsx'
export default function Clients(){
    return(
        <>
        <Header/>
        <div style={{
            marginTop: "100px",
        }}>
            <ul>
            <li>
                <a href="/full-paid">Clienti fideli</a>
                
            </li>
            <li><a href="/full-report">Raport detaliat</a></li>
        </ul>
        <AllUsersTable></AllUsersTable>

        </div>
        
        </>
    )
}