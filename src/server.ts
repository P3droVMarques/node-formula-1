import fastify from "fastify";
import cors from "@fastify/cors";
import { drivers } from "./data/drivers";
import { raceTracks } from "./data/racetracks";
import { teams } from "./data/teams";
import {DriverParams, RaceTrackParams, TeamParams} from "./types/index"
const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});



server.get("/racetracks", async (request, response) => {
  response.type("application/json").code(200);
  return { raceTracks }
});


server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});



server.get<{ Params: RaceTrackParams}>(
  "/racetracks/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const racetrack = raceTracks.find((rt) => rt.id === id)

    if(!racetrack){
      response.type("application/json").code(404);
      return { message: "Racetrack Not Found"}
    } else {
      response.type("application/json").code(200);
      return {racetrack};
    }
  }
)

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    } else {
      response.type("application/json").code(200);
      return {driver};
    }
  }
);

server.get<{ Params: TeamParams}>(
  "/teams/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const team = teams.find((t) => t.id === id)
    
    if (!team){
      response.type("application/json").code(404)
      return { message: "Team Not Found"}
    } else {
      response.type("application/json").code(200)
      return {team}
    }
  }
)

server.listen({ port: 3333 }, () => {
  console.log("Server init");
});
