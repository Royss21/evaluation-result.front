import { Component, EventEmitter, Input } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-global',
  templateUrl: './search-global.component.html',
  styleUrls: ['./search-global.component.scss']
})
export class SearchGlobalComponent {

  @Input() emiterTextSearch: EventEmitter<string> = new EventEmitter
  textSearch: string = '';

  textoToSearch(event : any){
    const textInput =  event.target.value;
    this.textSearch = textInput;

    if (textInput.trim().length === 0) {
      this.emiterTextSearch.emit('');
    }

    if((event.keyCode >= 43 && event.keyCode <=126) ||
      ([8].includes(event.keyCode))) {
        if(textInput.length >= 1  || this.textSearch.length >= 1){
          this.textSearch = event.target.value;
          this.emiterTextSearch.emit(this.textSearch);
        }
    }
  }

}

