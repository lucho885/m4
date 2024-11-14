import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Files")
@Controller("uploadImage")
export class FilesController{
    constructor(private readonly filesService: FilesService,
    ) {}
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post(":id")
    @UseInterceptors(FileInterceptor('file'))
     async uploadImage(@Param('id') id: string,
                       @UploadedFile(
      new ParseFilePipe({
        validators:[
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: "archivo muy grande"
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      })
     ) file: Express.Multer.File){
        return this.filesService.uploadImage(id,file)
      
     }
}