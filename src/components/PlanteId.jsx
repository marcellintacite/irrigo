import { useParams } from "react-router-dom"
import Dashboard from "../Dashboard";


export const PlantesId = ()=> {
    const params = useParams();
    console.log(params)

    return (
        <div className="container">
            <h2>Plante</h2>
            <Dashboard/>
        </div>
    )
}