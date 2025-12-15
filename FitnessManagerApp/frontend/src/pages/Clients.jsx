import AllUsersTable from '../components/AllUsersTable'
import '../css/clients.css'
export default function Clients(){
    return(
        <>
        <ul>
            <li>
                <a href="/full-paid">Clienti fideli</a>
                
            </li>
            <li><a href="/full-report">Raport detaliat</a></li>
        </ul>
        <AllUsersTable></AllUsersTable>
        </>
    )
}