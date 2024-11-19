import axios from "axios";
import { useParams } from "react-router-dom"
import { useState, useEffect} from "react";
function GetSingleUser() {

    const {id} = useParams()
    console.log("id :",id);
    const [data, setData] = useState(null);

    useEffect(() => {
        async function getallusers() {
            console.log("local storage :", localStorage)
            const authToken = localStorage.getItem("authToken");
            console.log("authtoken :", authToken);

            try {
                let response = await axios("http://localhost:3001/users", {
                    method: "GET",
                    headers: {
                        "Authorization": `bearer ${authToken}`,
                        "Content-Type": "application/json"
                    }
                })

                console.log("new response:", response);

                let datas = response.data;
                console.log("datassss", datas);
                setData(datas);


            }
            catch (error) {
                if (error.response) {
                    let parsed_response = error.response.data;
                    console.log("parsed_response :", parsed_response)
                }
                else {
                    console.log("error :", error);
                }

            }
        }

        getallusers();

    }, []);

    const user = data ? data.find((datas) => datas._id === id) : null;
    console.log("user:", user);

    return (
        <>  
            <div id="viewuser" className="container1">
                <div className="img-div"><img src= '' alt='img' /></div>
                <div className="line" />
                <div className="text-div"><h4>{user.name}</h4></div>
                <div className="text-div-email"><h4>{user.email}</h4></div>
                <div className="btn-div"><span><button className="btn1" ><ion-icon name="create-outline" /></button></span>
                <span><button className="btn1"><ion-icon name="trash-outline" /></button></span></div>
            </div>
        </>
    )
}
export default GetSingleUser;