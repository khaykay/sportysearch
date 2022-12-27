import React, {useEffect, useState} from "react";
import ArtistInfo from "./ArtistInfo";
import TextField from '@mui/material/TextField'
import { Avatar, Box } from "@mui/material";
import { flexbox } from "@mui/system";

const Search = () => {
  const [APIresponseData, setAPIresponseData] = useState([])
   const [recentSearch, setRecentSearch] = useState([])
const [inputValue, setInputValue]= useState([])
const [loading , setLoading] = useState(true)
const [error, setError] = useState(false);

const resultHandler = ()=>{
  return (
    <div className="">
      hello
      {console.log("clicked")}
      <ArtistInfo/>
    </div>
  );
}

const fetchApi = async ()=>{
    try {
      setError(false);
      setLoading(true);
      let APIresponse = await fetch(`/${inputValue}`);
      let APIresponseData = await APIresponse.json();
      setAPIresponseData(APIresponseData)
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  }



useEffect(()=>{
  const getInputValue = setTimeout(()=>{
 fetchApi()
  }, 2000)
  return ()=>clearTimeout(getInputValue)

}, [inputValue])



 return (
   <Box
     sx={{
       width: "100%",
       height: "30%",
       backgroundColor: "white",
       display: "flex",
       gap: 4,
       flexDirection: "column",
       alignItems: "center",
       justifyContent: "center",
     }}
   >
     <TextField
       id="standard-search"
       placeholder="Search field"
       type="search"
       value={inputValue}
       onChange={(e) => setInputValue(e.target.value)}
       
       sx={{
         backgroundColor: "#484747",
         width: "40%",
         color:"white",
         borderRadius: 2,
       }}
     />

     <Box>
       {inputValue !== "" ? (
         <Box
           sx={{
             display: "flex",
             alignItems: "center",
             padding: "0 10px",
             gap: 3,
             height: 50,
             width: 300,
             backgroundColor: "black",
             borderRadius: 20,
             color: "#dddddd",
           }}
         >
           <Avatar
             src={APIresponseData.picture_small}
             alt={APIresponseData.name}
           />
           <Box component="span">{APIresponseData.name}</Box>
           <Box>{APIresponseData.type}</Box>
         </Box>
       ) : (
         <>
           <Box
             sx={{
               backgroundColor: "white",
               color: "black",
               height: "100%",
               width: "100%",
             }}
           >
             Find your favourite Artist
           </Box>
         </>
       )}
     </Box>
   </Box>
 );
};

export default Search;
