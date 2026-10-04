import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BolisService } from './bolis.service.js';
import { CreateBoliDto } from './dto/create-boli.dto.js';
import { UpdateBoliDto } from './dto/update-boli.dto.js';

@ApiTags('bolis')
@Controller('bolis')
export class BolisController {
  constructor(private readonly bolisService: BolisService) {}

  // ─── CREATE ───────────────────────────────────────────────────────────────
  @Post()
  @ApiOperation({ summary: 'Create a new boli' })
  @ApiBody({ type: CreateBoliDto })
  @ApiResponse({ status: 201, description: 'Boli created successfully.' })
  @ApiNotFoundResponse({ description: 'BoliCategory not found.' })
  create(@Body() createBoliDto: CreateBoliDto) {
    return this.bolisService.create(createBoliDto);
  }

  // ─── READ ALL ─────────────────────────────────────────────────────────────
  @Get()
  @ApiOperation({
    summary: 'Get all bolis ordered by stock quantity (highest to lowest)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of bolis sorted by stock quantity descending.',
  })
  findAll() {
    return this.bolisService.findAll();
  }

  // ─── READ ONE ─────────────────────────────────────────────────────────────
  @Get(':id')
  @ApiOperation({ summary: 'Get a single boli by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Boli ID' })
  @ApiResponse({ status: 200, description: 'Boli found.' })
  @ApiNotFoundResponse({ description: 'Boli not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bolisService.findOne(id);
  }

  // ─── UPDATE ───────────────────────────────────────────────────────────────
  @Patch(':id')
  @ApiOperation({ summary: 'Update a boli by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Boli ID' })
  @ApiBody({ type: UpdateBoliDto })
  @ApiResponse({ status: 200, description: 'Boli updated successfully.' })
  @ApiNotFoundResponse({ description: 'Boli or BoliCategory not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoliDto: UpdateBoliDto,
  ) {
    return this.bolisService.update(id, updateBoliDto);
  }
}
