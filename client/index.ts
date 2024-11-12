import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

async function loadVehicles() {
  const vehicles = await trpc.vehicleList.query();
  const vehicleList = document.getElementById('vehicle-list') as HTMLUListElement;

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