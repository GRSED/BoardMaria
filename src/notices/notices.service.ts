import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getManager, Repository } from 'typeorm';
import { Notice } from './notices.entity';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notice)
    private datalogsRepository: Repository<Notice>,
    private connection: Connection,
  ) {}

  getTotalCount() {
    return this.datalogsRepository.count();
  }

  findAll(page?: number, pageSize?: number, keyword?: string) {
    let searchQuery = `SELECT 
        id, 
        title, 
        content, 
        writeDate, 
        noticeDate, 
        writer,
        importance,
        isOpen FROM notice WHERE 1=1`;
    if (keyword) {
      keyword = keyword.replace(/ /g, '');
      searchQuery += ` AND (REPLACE(title,' ','') LIKE '%${keyword}%' 
      OR REPLACE(content,' ','') LIKE '%${keyword}%')`;
    }
    if (page && pageSize) {
      searchQuery += ` LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`;
    }
    return getManager().query(searchQuery);
  }

  async findOne(id: number): Promise<any> {
    const datalog = await this.datalogsRepository.findOne(id);
    if (datalog) {
      return datalog;
    } else {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateDatalogDto: UpdateNoticeDto): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const updatedDatalog = await queryRunner.manager.update(
        Notice,
        id,
        updateDatalogDto,
      );
      if (updatedDatalog.affected === 0) throw new NotFoundException();
      await queryRunner.commitTransaction();
      return updateDatalogDto;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
