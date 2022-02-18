import { Category } from './category';
import { Question } from './question';

describe('Question', () => {
  it('should create an instance', () => {
    expect(new Question(0, "", "", 0, new Category(0, "", 0, []), "")).toBeTruthy();
  });
});
