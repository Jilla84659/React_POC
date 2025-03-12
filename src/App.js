import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Select, MenuItem, Box, List, ListItem, ListItemText } from "@mui/material";
import {
  setStoreGroupName,
  setDescription,
  setExistingStoreGroup,
  moveMultipleStoresToSelected,
  moveMultipleStoresToAvailable,
  moveAllAvailableStoresToSelected,
  moveAllSelectedStoresToAvailable,
  setId,
  addToAvailableStores,
} from "./store/storeGroupSlice";
import "./index.css"

const App = () => {
  const dispatch = useDispatch();
  const { storeGroupName, description, existingStoreGroup, id, availableStores, selectedStores } = useSelector(
    (state) => state.storeGroup
  );

  // Store selected store IDs
  const [selectedAvailable, setSelectedAvailable] = useState([]);
  const [selectedSelected, setSelectedSelected] = useState([]);

  // Handle Selection
  const handleAvailableStoreClick = (id) => {
    setSelectedAvailable((prev) =>
      prev.includes(id) ? prev.filter((storeId) => storeId !== id) : [...prev, id]
    );
  };

  const handleSelectedStoreClick = (id) => {
    setSelectedSelected((prev) =>
      prev.includes(id) ? prev.filter((storeId) => storeId !== id) : [...prev, id]
    );
  };

  return (
    <Box p={3}>
      <h2>Store Group Management</h2>
      
      <TextField
        label="New Custom Store Group Name"
        value={storeGroupName}
        onChange={(e) => dispatch(setStoreGroupName(e.target.value))}
        fullWidth
      />

      <TextField
        label="New Store Group Description"
        value={description}
        onChange={(e) => dispatch(setDescription(e.target.value))}
        fullWidth
      />

      <Select
        value={existingStoreGroup}
        onChange={(e) => dispatch(setExistingStoreGroup(e.target.value))}
        fullWidth
      >
        <MenuItem value="Denver">Denver</MenuItem>
        <MenuItem value="New York">New York</MenuItem>
      </Select>

      <TextField
        label="Store Group Id"
        value={id}
        onChange={(e) => dispatch(setId(e.target.value))}
        fullWidth
      />

      <Button variant="contained" onClick={() => dispatch(addToAvailableStores())}>Add Store</Button>

      <Box display="flex" justifyContent="space-between" mt={3}>
        {/* Available Stores List */}
        <List>
          {availableStores.map((store) => (
            <ListItem
              key={store.id}
              button
              selected={selectedAvailable.includes(store.id)}
              onClick={() => handleAvailableStoreClick(store.id)}
              sx={{
                backgroundColor: selectedAvailable.includes(store.id) ? "#cce5ff" : "transparent",
                "&:hover": { backgroundColor: "#e3f2fd" },
              }}
            >
              <ListItemText primary={`${store.id} ${store.storeGroupName}`} />
            </ListItem>
          ))}
        </List>

        <div style={{display: "flex", flexDirection: "column"}}>
          <button className="store-filter-button" onClick={() => dispatch(moveAllAvailableStoresToSelected())}>{`>>`}</button>
          <button className="store-filter-button" onClick={() => {
            dispatch(moveMultipleStoresToAvailable(selectedSelected));
            setSelectedAvailable([]);
            setSelectedSelected([]);
          }
          }>
            {`<`}
          </button> 
          <button className="store-filter-button" onClick={() => {
            dispatch(moveMultipleStoresToSelected(selectedAvailable));
            setSelectedAvailable([]);
            setSelectedSelected([]);
          }}>
            {`>`}
          </button>
          <button className="store-filter-button" onClick={() => dispatch(moveAllSelectedStoresToAvailable())}>{`<<`}</button>
          
          
        </div>

        {/* Selected Stores List */}
        <List>
          {selectedStores.map((store) => (
            <ListItem
              key={store.id}
              button
              selected={selectedSelected.includes(store.id)}
              onClick={() => handleSelectedStoreClick(store.id)}
              sx={{
                backgroundColor: selectedSelected.includes(store.id) ? "#cce5ff" : "transparent",
                "&:hover": { backgroundColor: "#e3f2fd" },
              }}
            >
              <ListItemText primary={`${store.id} ${store.storeGroupName}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default App;




// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { TextField, Button, Select, MenuItem, Box, List, ListItem, ListItemText } from "@mui/material";
// import {
//   setStoreGroupName,
//   setDescription,
//   setExistingStoreGroup,
//   moveStoreToSelected,
//   moveStoreToAvailable,
//   moveAllSelectedStoresToAvailable,
//   moveAllAvailableStoresToSelected
// } from "./store/storeGroupSlice";
// import "./index.css"

// const App = () => {
//   const dispatch = useDispatch();
//   const { storeGroupName, description, existingStoreGroup, availableStores, selectedStores } = useSelector(
//     (state) => state.storeGroup
//   );

//   // Store selected store IDs
//   const [selectedAvailable, setSelectedAvailable] = useState([]);
//   const [selectedSelected, setSelectedSelected] = useState([]);

//   // Handle Selection
//   const handleAvailableStoreClick = (id) => {
//     setSelectedAvailable((prev) =>
//       prev.includes(id) ? prev.filter((storeId) => storeId !== id) : [...prev, id]
//     );
//   };

//   const handleSelectedStoreClick = (id) => {
//     setSelectedSelected((prev) =>
//       prev.includes(id) ? prev.filter((storeId) => storeId !== id) : [...prev, id]
//     );
//   };


//   return (
//     <Box p={3}>
//       <h2>Store Group Management</h2>
      
//       <TextField
//         label="New Custom Store Group Name"
//         value={storeGroupName}
//         onChange={(e) => dispatch(setStoreGroupName(e.target.value))}
//         fullWidth
//       />

//       <TextField
//         label="New Store Group Description"
//         value={description}
//         onChange={(e) => dispatch(setDescription(e.target.value))}
//         fullWidth
//       />

//       <Select
//         value={existingStoreGroup}
//         onChange={(e) => dispatch(setExistingStoreGroup(e.target.value))}
//         fullWidth
//       >
//         <MenuItem value="Denver">Denver</MenuItem>
//         <MenuItem value="New York">New York</MenuItem>
//       </Select>

//       <Box display="flex" justifyContent="space-between" mt={3}>
//         {/* Available Stores List */}
//         <List>
//           {availableStores.map((store) => (
//             <ListItem key={store.id} button onClick={() => dispatch(moveStoreToSelected(store.id))}>
//               <ListItemText primary={`${store.id} ${store.name}`} />
//             </ListItem>
//           ))}
//         </List>

//         <div style={{display: "flex", flexDirection: "column"}}>
//         <button className="store-filter-button" onClick={() => dispatch(moveAllAvailableStoresToSelected())}>{`>>`}</button>
//         <button className="store-filter-button" onClick={() => {}}>{`<`}</button>
//         <button className="store-filter-button" onClick={() => {}}>{`>`}</button>
//         <button className="store-filter-button" onClick={() => dispatch(moveAllSelectedStoresToAvailable())}>{`<<`}</button>
//         </div>
//         {/* Selected Stores List */}
//         <List>
//           {selectedStores.map((store) => (
//             <ListItem key={store.id} button onClick={() => dispatch(moveStoreToAvailable(store.id))}>
//               <ListItemText primary={`${store.id} ${store.name}`} />
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Box>
//   );
// };

// export default App;
