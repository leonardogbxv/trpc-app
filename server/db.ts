export type VehicleType = 'car' | 'motorcycle' | 'truck'
export interface Vehicle {
  id: string;
  plate: string;
  year: string;
  type: VehicleType;
  model: string;
  brand: string;
};
 
// Imaginary database
const vehicles: Vehicle[] = [
  {
    id: '1',
    plate: 'ABC-1234',
    year: '2020',
    type: 'car',
    model: 'Corolla',
    brand: 'Toyota',
  },
  {
    id: '2',
    plate: 'XYZ-5678',
    year: '2021',
    type: 'motorcycle',
    model: 'CR-V',
    brand: 'Honda',
  },
  {
    id: '3',
    plate: 'JKL-6789',
    year: '2023',
    type: 'truck',
    model: 'Mustang',
    brand: 'Ford',
  },
];

export const db = {
  vehicle: {
    findMany: async () => vehicles,
    findById: async (id: string) => vehicles.find((vehicle) => vehicle.id === id),
    create: async (data: Omit<Vehicle, 'id'>) => {
      const vehicle = { id: String(vehicles.length + 1), ...data };
      vehicles.push(vehicle);
      return vehicle;
    },
  },
};
