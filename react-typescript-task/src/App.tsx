import React, { useState, useEffect } from "react";
import { Vehicle, VehicleFilter, vehicleTypes } from "./data/vehicles/contracts";
import { VehicleApi } from "./data/vehicles/api";
import { Filter, IHandleFilter } from "./components/Filter";
import { Table } from "./components/Table";

const initialFilter: VehicleFilter = {
  title: "",
  type: null
};

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  useEffect(() => {
    const data = VehicleApi.search(initialFilter);
    setVehicles(data);
  }, []);
  const [filterInput, setFilterInput] = useState('')
  const [filterSelect, setFilterSelect] = useState('')
  const handleFilter: IHandleFilter = (term, num) => {
   switch(num){
     case 1:
      setFilterInput(term);
      break;
    case 2:
     setFilterSelect(term);
     break;
    default:
     setFilterInput('');
     setFilterSelect('');
     break;
    }
  }
 
 const vehiclesFiltered = vehicles.filter(el => el.title.includes(filterInput))
 .filter(elem=>(filterSelect === "" && elem) || (filterSelect !== "" && elem.type === vehicleTypes[+filterSelect]))//.type == vehicleTypes[+filterSelect])
  return (
    <>
      <Filter onSearch = {handleFilter} />
      <Table vehicles={vehiclesFiltered} />
    </>
  );
}