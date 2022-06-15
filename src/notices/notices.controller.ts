import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@Controller('datalogs')
export class NoticesController {
  constructor(private datalogsService: NoticesService) {}

  @Get()
  async getDatalogs(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('keyword') keyword?: string,
  ) {
    try {
      const datalogListTotalCount = await this.datalogsService.getTotalCount();
      const datalogList = await this.datalogsService.findAll(
        page,
        pageSize,
        keyword,
      );
      return { datalogListTotalCount, datalogList };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  getDatalog(@Param('id') id: number) {
    try {
      return this.datalogsService.findOne(id);
    } catch (error) {
      return error;
      //return인데 404 반환해주는 이유 찾아야함
    }
  }

  @Put(':id')
  async updateDatalog(
    @Param('id') id: number,
    @Body() updateDatalogDto: UpdateNoticeDto,
  ) {
    try {
      return await this.datalogsService.update(id, updateDatalogDto);
    } catch (error) {
      throw error;
    }
  }
}
