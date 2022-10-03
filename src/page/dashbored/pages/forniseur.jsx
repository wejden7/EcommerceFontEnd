import React from "react";
import { UseStateContextForniseur } from "../../../contexts/dashbored/contextProviderForniseur";
import { DataGrid } from "@mui/x-data-grid";
import {MdOutlineDeleteOutline,MdUpdate} from "react-icons/md"
import Tooltip from "@mui/material/Tooltip";

import { Nav, SnackBarComponent ,FormForniseur} from "../../../component";

const columns = [
  { field: "_id", headerName: "ID", width: 130 },
  { field: "name", headerName: "Name", width: 100 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "tel", headerName: "Phone", width: 100 },
  { field: "adresse", headerName: "Adresse", width: 130 },
];

const Forniseur = () => {
  const {
    nav,
    UpdateForniseur,
    update,
    updateFunction,
    deleteForniseur,
    forniseurSelected,
    itemSelect,
    forniseur,
    createForniseur,
    bindName,
    bindEmail,
    bindTel,
    bindAdresse,
    errorMessage,
    saveCliked,
    updateCliked,
  } = UseStateContextForniseur();
  return (
    <div className="m-1 md:m-4">
      <Nav Nav={nav}/>
      <div className="h-full mt-2    grid  md:grid-cols-6 gap-4">
        <div className="w-full h-96 md:h-full md:col-span-4 bg-white rounded  " style={{ height: 500}}>
        <div className=" p-3 flex justify-between mb-2 items-center">
            <p className=" text-lg font-medium tracking-wider text-blue-500 ">Forniseur</p>
              <div className="">
              <Tooltip  className={forniseurSelected.length===0?"rounded-full p-2 ":" rounded-full p-2 hover:shadow-lg "}  title={forniseurSelected.length===0?"":"Delete"} disabled={forniseurSelected.length===0?true:false}>
                  <button  onClick={deleteForniseur}>
                    <MdOutlineDeleteOutline className={forniseurSelected.length===0 ?" duration-700 ease-in-out text-red-300 text-white text-2xl": " duration-700 ease-in-out text-red-500 text-white text-2xl"}/>
                  </button>
                </Tooltip>
                <Tooltip  className={forniseurSelected.length!=1?"rounded-full p-2 ":" rounded-full p-2 hover:shadow-lg "}  title={forniseurSelected.length!=1?"":"update"} disabled={forniseurSelected.length!=1?true:false}>
                  <button  onClick={updateFunction}>
                    <MdUpdate className={forniseurSelected.length!=1 ?" duration-700 ease-in-out text-green-300 text-white text-2xl": " duration-700 ease-in-out text-green-500 text-white text-2xl"}/>
                  </button>
                </Tooltip>
              </div>
            </div>
          <div className="w-full px-3 h-4/5" >
          
            <DataGrid
            className="transition "
              getRowId={(row) => row._id}
              rows={forniseur}
              columns={columns}
              pageSize={5}
              onSelectionModelChange={itemSelect}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        </div>
        <div className=" w-full h-full md:col-span-2 bg-white rounded  py-5 ">
          <FormForniseur 
              bindname={bindName}
              bindemail={bindEmail}
              bindtel={bindTel} 
              bindadresse={bindAdresse}
              savecliked={saveCliked}
              updatecliked={updateCliked}
              updateforniseur={UpdateForniseur}
              createforniseur={createForniseur}
              update={update}
              error={errorMessage}
              />
        </div>
      </div>
      <SnackBarComponent />
    </div>
  );
};

export default Forniseur;
