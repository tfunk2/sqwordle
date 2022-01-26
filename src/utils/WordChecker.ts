import * as FiveLetterWords from '../utils/FiveLetterWords';

export const isFiveLetterWord = (word: string): boolean => {
    return word.length === 5;
};

export const isWordPlayable = (word: string): boolean => {
    return FiveLetterWords.fiveLetterPlayableWords.includes(word);
}