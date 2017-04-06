import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatFilter'
})
export class ChatFilterPipe implements PipeTransform {
  transform(usern: any, term: any): any {
    if ( term === undefined ){
      return [];
    }


    return usern.filter( function( usr ) {
      return usr.username.toLowerCase( ).includes( term.toLowerCase( ) );
    })
  }

}
