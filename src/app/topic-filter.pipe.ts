import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'topicFilter'
})
export class TopicFilterPipe implements PipeTransform {

  transform(topics: any, term: any): any {
    if ( term === undefined )
    	return [];

    return topics.filter( function( topic ) {
    	return topic.topic_name.toLowerCase( ).includes( term.toLowerCase( ) );
    })
  }

}