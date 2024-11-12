import { db, VehicleType } from "./db";
import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const appRouter = router({
  vehicleList: publicProcedure
    .query(async () => {
      const vehicles = await db.vehicle.findMany();
      return vehicles;
    }),
  vehicleById: publicProcedure
    .input((val: unknown) => {
      const isString = typeof val === 'string';
      if (isString) return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query(async (opts) => {
      const { input } = opts;
      const user = await db.vehicle.findById(input);
      return user;
    }),
  vehicleCreate: publicProcedure
    .input((val: unknown) => {
      // Verifica se o valor é um objeto
      if (typeof val !== 'object' || val === null) {
        throw new Error('Invalid input: expected an object');
      }

      const input = val as Record<string, unknown>;

      const requiredFields = ['plate', 'year', 'type', 'model', 'brand'];

      for (const field of requiredFields) {
        if (typeof input[field] !== 'string') {
          throw new Error(`Invalid input: expected "${field}" to be a string`);
        }
      }

      const validTypes = ['car', 'motorcycle', 'truck'];
      if (!validTypes.includes(input.type as string)) {
        throw new Error(`Invalid input: "${input.type}" is not a valid type`);
      }

      return {
        plate: input.plate as string,
        year: input.year as string,
        type: input.type as VehicleType,
        model: input.model as string,
        brand: input.brand as string,
      };
    })
    .mutation(async (opts) => {
      const { input } = opts;
      const vehicle = await db.vehicle.create(input);
      return vehicle;
    }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
