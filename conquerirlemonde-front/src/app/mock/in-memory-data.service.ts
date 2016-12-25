import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let planets = [
      {id: 11, name: 'Mr. Nice',ip:'12312312',image:'sqdqsdqs'},
      {id: 12, name: 'Mr. ds',ip:'12312312',image:'sqdqsdqs'}
    ];
    return {planets};
  }
}