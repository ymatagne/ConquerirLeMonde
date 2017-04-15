// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  wsPlanetsKubernetes: 'ws://52.57.69.116:8080/ws/planets/kubernetes',
  wsPlanetsFleet: 'ws://52.57.69.116:8080/ws/planets/fleet',
  newTrooperUrl: 'ws://52.57.69.116:8080/ws/trooper',
  countTrooperUrl: 'ws://52.57.69.116:8080/ws/trooper/count',
  dropTrooperUrl: 'http://52.57.69.116:8080/trooper/die',
  loginUrl: 'http://52.57.69.116:8080/api/authenticate',
  gameIp: '52.57.69.116',
  gamePort : '8080',
  awsKey : ''
};
