import { AskiiTPage } from './app.po';

describe('askii-t App', () => {
  let page: AskiiTPage;

  beforeEach(() => {
    page = new AskiiTPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
