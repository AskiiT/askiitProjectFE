export class Question {
  title: string;
  body: string;
  topic: string;
  user_id: string;
  difficulty: string;
  tags: Array<string>;
  time: number;

  constructor(title, body, topic, user_id, difficulty, tags, time) {
     this.title = title;
     this.body = body;
     this.topic = topic;
     this.user_id = user_id;
     this.difficulty = difficulty;
     this.tags = tags;
     this.time = time;
 }
}
