import FullReportTable from "../components/FullReportTable";
import Header from '../components/Header.jsx'

export default function FullReportPage(){
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
        <FullReportTable/>

            </div>
                    
        </div>
    )
}