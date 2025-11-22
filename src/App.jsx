import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup,useMap } from 'react-leaflet';
import {Card,CardContent,Typography,Button, Box} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import MarkerClusterGroup from "react-leaflet-markercluster";

function App() {
  const [golfCoursePin, setGolfCoursePin] = useState([])

  useEffect(()=>{
fetch('/gold_course.json')
  .then((resp)=> resp.json())
  .then((resp)=> {console.log(resp);
    setGolfCoursePin(resp.courses)
  })
  .catch(error => console.log(error))
  },[])

  return (
<MapContainer center={[62.2653, 22.6415]} zoom={7} scrollWheelZoom={false} style={{ height: 800 }}>
 <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <MarkerClusterGroup>
  {
    golfCoursePin.map((i,index)=>(
      <Marker position={[i.lat, i.lng]}>
    <Popup>
      <Card sx={{ minWidth: 200 }}>
            <CardContent sx={{display:'grid',textAlign:'center',mb:2,}}>
              <Typography variant="h6">{i.course}</Typography>
              <Box sx={{display:'flex',alignItems:'center', gap:1}}><HomeIcon/><Typography variant='h7'>{i.address}</Typography></Box>
              <Box sx={{display:'flex',alignItems:'center', gap:1}}><PhoneAndroidIcon/><Typography variant='h7'>{i.phone}</Typography></Box>
              <Box sx={{display:'flex',alignItems:'center', gap:1}}><EmailIcon/><Typography variant='h7'>{i.email}</Typography></Box>
              <Box sx={{display:'flex',alignItems:'center', gap:1}}><LanguageIcon/><Typography variant='h7'>{i.web}</Typography></Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ textAlign:'justify'}}>
{i.text}              </Typography>
             
            </CardContent>
          </Card>
    </Popup>
  </Marker>
    ))
  }
  </MarkerClusterGroup>
</MapContainer>

  );
}

export default App
