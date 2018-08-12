import { HeroIdPipe } from './hero-id.pipe';

describe('HeroIdPipe', () => {
  it('create an instance', () => {
    const pipe = new HeroIdPipe();
    expect(pipe).toBeTruthy();
  });
});
