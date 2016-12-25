import { ConquerirlemondeFrontPage } from './app.po';

describe('conquerirlemonde-front App', function() {
  let page: ConquerirlemondeFrontPage;

  beforeEach(() => {
    page = new ConquerirlemondeFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
