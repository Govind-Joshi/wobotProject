import React,{useState,useEffect} from 'react'
import "../css/Camera_List.css"
import BrandLogo from "../icon/BrandLogo.png";
import SearchBar from './Serach_bar';
import Filters from "./Filter"
import CameraTable from './CameraTable';
import useUpdateCameraStatus from '../Util/useUpdateCameraStatus';

// const BASE_URL = "https://api-app-staging.wobot.ai/app/v1";
// const AUTH_TOKEN = "4ApVMIn5sTxeW7GQ5VWeWiy";


function Camera_List() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [DeleteItem, setDeleteItem] = useState(new Set());

const { cameras, loading, error, updateCameraStatus } = useUpdateCameraStatus();
let loction = cameras.map((a)=>a.location)
let loc = new Set(loction);
console.log(cameras,"<===>",loc,"loc")

// i handle  child component state in parent component with help of call backs
function hadleDelete(value){  

    setDeleteItem((prev) => {
        const updatedSet = new Set(prev); 
        updatedSet.add(value); 
        return updatedSet; 
      });

}


 {/*loction fiter filter*/}
function  applyFilters(){
    const filteredloction = selectedLocation 
    ? cameras.filter(item => item.location === selectedLocation)
    : cameras;

       {/*status filter*/}
    const fliterstatus = selectedStatus                             
    ? filteredloction.filter(item => item.status === selectedStatus)
    : filteredloction;
    
     {/*here i apply search query filter*/}
    const filteredData = fliterstatus.filter((item) => {      
      
        const searchQueryLower = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchQueryLower) ||
          item.location.toLowerCase().includes(searchQueryLower) ||
          item.status.toLowerCase().includes(searchQueryLower) ||
          item.recorder.toLowerCase().includes(searchQueryLower)
        );
      });
    
      {/* here i remove deleted item*/}
      const removeDeleteItem =                               
      DeleteItem.size > 0 
        ? filteredData.filter(item => !DeleteItem.has(item._id)) 
        : filteredData;

        return removeDeleteItem;

}

 const reciveFilterData = applyFilters();



  return (
    <div >
<header>
 <img src={BrandLogo} id='BrandLogo' alt="BrandLogo" />   
</header>
<SearchBar  callback_search={(value)=>setSearchQuery(value)} searchQuery={searchQuery} ></SearchBar>
<Filters  loction_data={loc} callback_loction={(value)=>setSelectedLocation(value)} selectedLocation={selectedLocation} callback_status={(value)=>setSelectedStatus(value)} selectedStatus={selectedStatus} ></Filters>
<CameraTable data={reciveFilterData} callback_delete={(id)=>hadleDelete(id)} callback_update_Status={(id,status)=>updateCameraStatus(id,status)}   />
    </div>
  )
}

export default Camera_List