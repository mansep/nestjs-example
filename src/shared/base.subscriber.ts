import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class DateTimeUpdateSubscriber
  implements EntitySubscriberInterface<any> {
  beforeInsert(event: InsertEvent<any>) {
    event.entity.createdAt = new Date();
  }
  beforeUpdate(event: UpdateEvent<any>) {
    event.entity.updatedAt = new Date();
  }
}
