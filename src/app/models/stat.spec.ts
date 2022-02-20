import { Stat } from './stat';

describe('Stat', () => {
  it('should create an instance', () => {
    expect(new Stat(0, "yo", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)).toBeTruthy();
  });
});
