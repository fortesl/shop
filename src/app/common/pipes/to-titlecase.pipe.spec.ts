import { ToTitlecasePipe } from './to-titlecase.pipe';

describe('ToTitlecasePipe', () => {
  let pipe: ToTitlecasePipe;

  beforeEach(() => {
    pipe = new ToTitlecasePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert value to title case', () => {
    const piped: string = pipe.transform('i love this GAME');

    expect(piped).toEqual('I Love This Game');
  });
});
