// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
<<<<<<< 161fe792cb392748525904f7e796583029a6d3cf
  wsPlanetsKubernetes: 'ws://192.168.0.11:8080/ws/planets/kubernetes',
  wsPlanetsFleet: 'ws://192.168.0.11:8080/ws/planets/fleet',
  newTrooperUrl: 'ws://192.168.0.11:8080/ws/trooper',
  dropTrooperUrl: 'http://192.168.0.11:8080/trooper/drop'
=======
  wsPlanetsKubernetes: 'ws://localhost:8080/ws/planets/kubernetes',
  wsPlanetsFleet: 'ws://localhost:8080/ws/planets/fleet',
  newTrooperUrl: 'ws://localhost:8080/ws/trooper',
  dropTrooperUrl: 'http://localhost:8080/trooper/die'
>>>>>>> feat(trooper) : check if die is ok
};
