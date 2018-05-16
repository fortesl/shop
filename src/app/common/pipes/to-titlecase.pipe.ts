import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toTitlecase'
})
export class ToTitlecasePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      const words: string[] = value.split(' ');
      for (let i = 0; i < words.length; i++) {
        words[i] = this.makeTitleCase(words[i]);
      }
      return words.join(' ');
    }
    return null;
  }

  makeTitleCase(word: string) {
    const firsLetter = word.substr(0, 1).toUpperCase();
    const otherLetters = word.substr(1).toLowerCase();
    return firsLetter.concat(otherLetters);
  }

}
