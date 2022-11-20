import React from "react";
import { CurrencyLabel } from "@skbkontur/react-ui";
import {Vehicle, vehicleTypeTitles} from "../data/vehicles/contracts";

const TableItem: React.FC< {vehicle:Vehicle; number:number}> = ({vehicle, number}: {vehicle:Vehicle; number:number}) => {
    return (
        <tr>
            <td>{number}</td>
            <td>{vehicle.title}</td>
            <td>{vehicleTypeTitles[vehicle.type]} </td>
            <td>
                <CurrencyLabel value={vehicle.price} fractionDigits={2} />
            </td>
        </tr>
    );
};

export const Table: React.FC<{vehicles: Vehicle[]}>= ({vehicles}: {vehicles: Vehicle[]}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Название</th>
                <th>Тип</th>
                <th>Цена, ₽</th>
            </tr>
            </thead>
            <tbody>
            {vehicles.map((x, i) => (
                <TableItem key={x.id} number={i + 1} vehicle={x} />
            ))}
            </tbody>
        </table>
    );
};