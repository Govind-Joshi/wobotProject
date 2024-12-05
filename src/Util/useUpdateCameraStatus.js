import { useState, useEffect } from 'react';


const BASE_URL = 'https://api-app-staging.wobot.ai/app/v1';  
const AUTH_TOKEN = "4ApVMIn5sTxeW7GQ5VWeWiy";


const useUpdateCameraStatus = () => {
  const [cameras, setCameras] = useState([]);  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null); 


  const fetchCameras = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/fetch/cameras`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch cameras');
      const data = await response.json();
      setCameras(data.data);  
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const updateCameraStatus = async (cameraId, status) => {
    try {
      setLoading(true);  

    
      const response = await fetch(`${BASE_URL}/update/camera/status`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: cameraId,
          status: status,
        }),
      });

      if (!response.ok) throw new Error(`Failed to update status for camera ${cameraId}`);
      const data = await response.json();
      console.log('Camera status updated:', data);
     
      setCameras((prevCameras) =>
        prevCameras.map((camera) =>
          camera.id === cameraId ? { ...camera, status } : camera
        )
      );

     
    } catch (error) {
      setError(error.message);
      console.error('Error updating camera status:', error);
    } finally {
      setLoading(false);  
    }
  };


  useEffect(() => {
    fetchCameras();
    // updateCameraStatus(1,"Inactive")
  }, []);

  return {
    cameras,
    loading,
    error,
    updateCameraStatus,  
  };
};

export default useUpdateCameraStatus;
