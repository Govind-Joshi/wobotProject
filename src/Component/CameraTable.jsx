import React,{useState,useMemo} from "react";
import "../css/CameraTable.css";
import delete_icon from "../icon/DELETE.png"




function CameraTable({ data,callback_delete,callback_update_Status }) {
    // const [pagen, setpagen] = useState(1)
    // let page = Math.round(data.length / 10);
    // let max = pagen * 10;
    // let min = max - 10
  
    // function hadleclick(index) {
  
    //   if (index > 0 && index <= page) setpagen(index)
  
    // }

    const [pagen, setpagen] = useState(1);
  
    // const totalPages = useMemo(() => Math.ceil(data.length / 10), []);
    const totalPages =  Math.ceil(data.length / 10)
    {/*here i set limit of max and min ragne if data rendring*/}
    const maxIndex = pagen * 10;      
    const minIndex = maxIndex - 10;
  


    {/*if page number is more then 0 and equal to max limit of pages then set value*/}
    const handlePageClick = (pageNumber) => {
        // console.log(pageNumber,"pagenumber....")
      if (pageNumber > 0 && pageNumber <= totalPages) {
        setpagen(pageNumber);
      }
    };

  


  {/*method for showing page number boxes according to condition of page number  */}
    const renderPageButtons = () => {
      const pageButtons = [];
  
 {/*here i push first page box in static way because it is never change */}
      pageButtons.push(
        <div 
          key={1} 
          className={`box ${pagen === 1 ? "active" : ""}`} 
          onClick={() => handlePageClick(1)}
        >
          1
        </div>
      );
      
      {/*if page value more then 3 then we show .... sign  */}
      if (pagen > 3) {
        pageButtons.push(<div key="sep1">...</div>);
      }
      
       {/*here i apply conditional rendring according to page number */}
      for (let i = Math.max(2, pagen - 1); i <= Math.min(totalPages, pagen + 1); i++) {
        pageButtons.push(
          <div 
            key={i} 
            className={`box ${pagen === i ? "active" : ""}`} 
            onClick={() => handlePageClick(i)}
          >
            {i}
          </div>
        );
      }
  
   {/* show ... sign in last in page numver less totalpages-2 */}
      if (pagen < totalPages - 2) {
        pageButtons.push(<div key="sep2">...</div>);
        pageButtons.push(
          <div 
            key={totalPages} 
            className={`box ${pagen === totalPages ? "active" : ""}`} 
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </div>
        );
      }
  
      return pageButtons;
    };
  



 {/*trriger parent component callbacks */}   
function handleclick(id){     
  console.log("runnn",id)
    callback_delete(id);
}

function handleStatusChange(id,status){
callback_update_Status(id,status)
}



  
   {/*return if there is no data...*/}
  if(!data ||data.length==0)return <h2>No Data Found</h2> 
  return (

    <div className="table-container">
      <table className="camera-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>NAME</th>
            <th>HEALTH</th>
            <th>LOCATION</th>
            <th>RECORDER</th>
            <th>TASKS</th>
            <th>STATUS</th>
            <th>UPDATE STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(minIndex, maxIndex).map((camera)  => (
            <tr key={camera._id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{camera.name}</td>
              <td className="health-icons">
                <span className={`health-status ${camera.health.cloud}`}>
                  {camera.health.cloud}
                </span>
                <span className={`health-status ${camera.health.device}`}>
                  {camera.health.device}
                </span>
              </td>
              <td>{camera.location}</td>
              <td>{camera.recorder||"N/A"}</td>
              <td>{camera.tasks||"N/A"} Tasks</td>

              <td>
                <span
                  className={`status-label ${
                    camera.status === "Active" ? "status-active" : "status-inactive"
                  }`}
                >
                  {camera.status}
                </span>
              </td>
              <td>
              <select
                value={camera.status}
                onChange={e => handleStatusChange(camera.id, e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </td>
              <td>
                <img src={delete_icon} onClick={()=>handleclick(camera._id)} className="action-btn"></img>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
<div>
   
</div>
<div className="box_p">
        <div 
          className="arrow" 
          onClick={() => handlePageClick(pagen - 1)} 
          style={{ cursor: pagen > 1 ? "pointer" : "not-allowed" }}
        >
          &#8592; 
        </div>
        {renderPageButtons()}
        <div 
          className="arrow" 
          onClick={() => handlePageClick(pagen + 1)} 
          style={{ cursor: pagen < totalPages ? "pointer" : "not-allowed" }}
        >
          &#8594;
        </div>
      </div>
    </div>
  );
}

export default CameraTable;
