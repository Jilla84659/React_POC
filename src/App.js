import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Select, MenuItem, Box, List, ListItem, ListItemText } from "@mui/material";
import {
  setStoreGroupName,
  setDescription,
  setExistingStoreGroup,
  moveStoreToSelected,
  moveStoreToAvailable,
} from "./store/storeGroupSlice";

const App = () => {
  const dispatch = useDispatch();
  const { storeGroupName, description, existingStoreGroup, availableStores, selectedStores } = useSelector(
    (state) => state.storeGroup
  );

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

      <Box display="flex" justifyContent="space-between" mt={3}>
        {/* Available Stores List */}
        <List>
          {availableStores.map((store) => (
            <ListItem key={store.id} button onClick={() => dispatch(moveStoreToSelected(store.id))}>
              <ListItemText primary={`${store.id} ${store.name}`} />
            </ListItem>
          ))}
        </List>

        {/* Selected Stores List */}
        <List>
          {selectedStores.map((store) => (
            <ListItem key={store.id} button onClick={() => dispatch(moveStoreToAvailable(store.id))}>
              <ListItemText primary={`${store.id} ${store.name}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default App;
