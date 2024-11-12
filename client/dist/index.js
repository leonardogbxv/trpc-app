"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@trpc/client");
const trpc = (0, client_1.createTRPCProxyClient)({
    links: [
        (0, client_1.httpBatchLink)({
            url: 'http://localhost:3000',
        }),
    ],
});
async function loadVehicles() {
    const vehicles = await trpc.vehicleList.query();
    const vehicleList = document.getElementById('vehicle-list');
    vehicleList.innerHTML = '';
    vehicles.forEach((vehicle) => {
        const li = document.createElement('li');
        li.textContent = `${vehicle.brand} ${vehicle.model} (${vehicle.year}) - Plate: ${vehicle.plate}`;
        vehicleList.appendChild(li);
    });
}
window.onload = () => {
    loadVehicles();
};
