import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagFilter'
})

export class TagFilterPipe implements PipeTransform {

  transform(tags: any, term: any): any {
    if ( term === undefined )
    	return [];

    return tags.filter( function( tag ) {
    	return tag.tag_name.toLowerCase( ).includes( term.toLowerCase( ) );
    })
  }

}
