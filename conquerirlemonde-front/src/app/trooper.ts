export class Trooper {

  static shipAvailable = ['Corellian', 'DroidStarFighter', 'JediStarFighter', 'MilleniumFalcon', 'NabooBomber', 'NabooStarFighter', 'RebublicCruiser', 'Tibirium', 'TieFighter', 'Xwing', 'YWing']

  constructor(public name = '', public trooperHost = '', public trooperPort = '', public image = '') { }
}
