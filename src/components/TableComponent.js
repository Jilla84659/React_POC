import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";

const tableHeaders = ["5 - Denver", "15 - United", "17 - Southwest", "19 - Portland", "20 - Southern"];

const tableData = [
  { id: 1, storeName: "5 - Denver", start: "01/01/2022", end: "01/31/2022", location: "WNCA", type: "Case", unitAmount: "$2.40", status: "Pending" },
  { id: 2, storeName: "5 - Denver", start: "01/04/2022", end: "01/20/2022", location: "WNCA", type: "Case", unitAmount: "$1.50", status: "Agreed" },
  { id: 3, storeName: "17 - Southwest", start: "01/11/2022", end: "01/17/2022", location: "Store Group", type: "Scan", unitAmount: "$1.20", status: "Pending" },
  { id: 4, storeName: "17 - Southwest", start: "01/15/2022", end: "01/31/2022", location: "Store Group", type: "Scan", unitAmount: "$1.80", status: "Pending" },
  { id: 5, storeName: "19 - Portland", start: "01/01/2022", end: "01/31/2022", location: "HFlat", type: "Price/Ad", unitAmount: "$10000.00", status: "Pending" },
  { id: 6, storeName: "20 - Southern", start: "01/01/2022", end: "01/31/2022", location: "4U Event", type: "Scan", unitAmount: "$0.10", status: "Pending" },
];

const TableComponent = () => {
  const [selectedStore, setSelectedStore] = useState(tableHeaders[0]); // Default to first store
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box className="table-container bg-white shadow-md rounded-md p-4">
      {/* Store Tabs */}
      <Box className="table-header flex border-b-2 pb-2 mb-4">
        {tableHeaders.map((header) => (
          <div
            key={header}
            className={`table-header-item px-4 py-2 border rounded-md cursor-pointer mx-1 transition-all 
              ${selectedStore === header ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => setSelectedStore(header)}
          >
            {header}
          </div>
        ))}
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="table-header-row bg-gray-100">
              <TableCell></TableCell>
              <TableCell className="font-bold">Allowance Start</TableCell>
              <TableCell className="font-bold">Allowance End</TableCell>
              <TableCell className="font-bold">Location</TableCell>
              <TableCell className="font-bold">Type</TableCell>
              <TableCell className="font-bold">Unit Amount</TableCell>
              <TableCell className="font-bold">Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData
              .filter((row) => row.storeName === selectedStore)
              .map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow className="table-row hover:bg-gray-50 transition">
                    <TableCell>
                      <IconButton onClick={() => toggleRow(row.id)}>
                        {expandedRows[row.id] ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{row.start}</TableCell>
                    <TableCell>{row.end}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.unitAmount}</TableCell>
                    <TableCell className={row.status === "Pending" ? "text-yellow-500" : "text-green-600"}>{row.status}</TableCell>
                  </TableRow>

                  {expandedRows[row.id] && (
                    <TableRow>
                      <TableCell colSpan={7} className="expanded-row bg-gray-100">
                        <div className="p-2">Expanded Row Content for {row.location}</div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
