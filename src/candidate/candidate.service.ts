import { Injectable } from '@nestjs/common';

@Injectable()
export class CandidateService {
  async create() {
    return 'new candidate';
  }
}
