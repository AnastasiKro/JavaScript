import React, { useState } from "react";
import { vehicleTypes, vehicleTypeTitles, VehicleFilter} from "../data/vehicles/contracts";
import { VehicleApi, } from "../data/vehicles/api";

export type IHandleFilter = (val: string, num: number) => void
export const Filter: React.FC<{onSearch: IHandleFilter}> = (props) => {
    const options = vehicleTypes.map((text, index) => {
      const t = vehicleTypeTitles[text];
      return <option key={index} value={text}>{t}</option>;
    });
    
    const [filterInput, setFilterInput] = useState('')
    const [filterSelect, setFilterSelect] = useState('')
    const handleInpChange: (event:any)=>void = (event)=> { setFilterInput(event.target.value) 
    const vf: VehicleFilter = {
      title: event.target.value,
      type: vehicleTypes[+filterSelect]
    }
    if (filterSelect === null){
      vf.type = null;
    }
    VehicleApi.search(vf);
      props.onSearch(event.target.value, 1);
    }
    const handleSelChange: (event: any)=>void = (event: any)=> {setFilterSelect(event.target.value)
      const vf: VehicleFilter = {
        title: filterInput,
        type: vehicleTypes[+event.target.value]
      }
      VehicleApi.search(vf);
      props.onSearch(event.target.value, 2);
    }
    const handleClick: ()=> void =()=>{
      setFilterSelect('');
      setFilterInput('');
      props.onSearch('', 3)
    }
    return <div>
      <input type="text" value={filterInput} onChange={handleInpChange}/>
      <select id="selector" value={filterSelect} onChange={handleSelChange}>
        {options}
      </select>
      <button id="btn" onClick={handleClick}>Очистить</button>
    </div>;