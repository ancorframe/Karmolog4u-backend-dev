export class ChangeStatusMeditationDto {
  /**
  Change meditation status
  @example "PUBLISHED"
  */
  status: Status;
}

enum Status {
  PUBLISHED = 'PUBLISHED',
  HIDDEN = 'HIDDEN',
  DRAFT = 'DRAFT',
}
