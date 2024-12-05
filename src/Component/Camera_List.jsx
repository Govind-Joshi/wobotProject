import React, { useState, useMemo, useCallback } from "react";
import "../css/Camera_List.css";
import BrandLogo from "../icon/BrandLogo.png";
import SearchBar from "./Serach_bar";
import Filters from "./Filter";
import CameraTable from "./CameraTable";
import useUpdateCameraStatus from "../Util/useUpdateCameraStatus";

function Camera_List() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [DeleteItem, setDeleteItem] = useState(new Set());

  const { cameras, updateCameraStatus } = useUpdateCameraStatus();

  // here we memoize locations to avoid recalculating them on every render
  const loc = useMemo(() => new Set(cameras.map((a) => a.location)), [cameras]);

  //here i  handle delete action,also memoized to avoid unnecessary re-renders
  const handleDelete = useCallback((value) => {
    setDeleteItem((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.add(value);
      return updatedSet;
    });
  }, []);



  // here we  apply filters,and memoized to recalculate only when dependencies change
  const reciveFilterData = useMemo(() => {

    const filteredLocation = selectedLocation
      ? cameras.filter((item) => item.location === selectedLocation)
      : cameras;

  
    const filteredStatus = selectedStatus
      ? filteredLocation.filter((item) => item.status === selectedStatus)
      : filteredLocation;


    const filteredSearch = filteredStatus.filter((item) => {
      const searchQueryLower = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchQueryLower) ||
        item.location.toLowerCase().includes(searchQueryLower) ||
        item.status.toLowerCase().includes(searchQueryLower) ||
        item.recorder.toLowerCase().includes(searchQueryLower)
      );
    });

    return DeleteItem.size > 0
      ? filteredSearch.filter((item) => !DeleteItem.has(item._id))
      : filteredSearch;
  }, [cameras, selectedLocation, selectedStatus, searchQuery, DeleteItem]);




  //here we memoize callback for updating status
  const handleUpdateStatus = useCallback((id, status) => {
    updateCameraStatus(id, status);
  }, [updateCameraStatus]);

  

  return (
    <div>
      <header>
        <img src={BrandLogo} id="BrandLogo" alt="BrandLogo" />
      </header>
      <SearchBar
        callback_search={useCallback((value) => setSearchQuery(value), [])}
        searchQuery={searchQuery}
      />
      <Filters
        loction_data={loc}
        callback_loction={useCallback((value) => setSelectedLocation(value), [])}
        selectedLocation={selectedLocation}
        callback_status={useCallback((value) => setSelectedStatus(value), [])}
        selectedStatus={selectedStatus}
      />
      <CameraTable
        data={reciveFilterData}
        callback_delete={handleDelete}
        callback_update_Status={handleUpdateStatus}
      />
    </div>
  );
}

export default Camera_List;
