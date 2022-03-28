import { Candidate } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCandidateDto } from './dto';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

  async create(candidate: CreateCandidateDto): Promise<Candidate> {
    try {
      const newCandidate = await this.prisma.candidate.create({
        data: candidate,
      });
      return newCandidate;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  }
}