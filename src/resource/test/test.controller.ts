import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import {
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiQuery,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('test')
@ApiTags('测试')
@ApiBearerAuth()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: '测试get 请求列表',
    description: '测试st 描述 通过id',
  })
  @ApiParam({ name: 'id', description: '用户ID', required: true })
  @ApiQuery({ name: 'age', description: '用户年龄', required: true })
  @ApiResponse({ status: 403, description: '自定义返回信息' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.testService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
