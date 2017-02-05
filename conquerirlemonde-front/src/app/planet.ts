export class Planet {

  static available = ['alderaan', 'bespin', 'coruscant', 'dagobah', 'endor', 'hoth', 'jakku', 'kashyyyk', 'mandalore', 'naboo', 'tatooine', 'yavin'];

  constructor(public id = 0, public name = '', public ip = '', public troopers = []) { }
}
