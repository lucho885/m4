import { Injectable } from "@nestjs/common";
import { v2, UploadApiResponse } from "cloudinary";
import * as toStream from "buffer-to-stream";
import { ProductService } from "src/products/product.service";


@Injectable()
export class FilesService {
  constructor(private readonly productService: ProductService){}

     async uploadImage(id : string, file: Express.Multer.File)  {   //: Promise<UploadApiResponse>
       const product = await this.productService.getProductByIdService(id);
       if(!product) {
        throw Error("el producto no existe para asignarle una imagen")
       }

      const result : UploadApiResponse   = await new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        },
      );
    toStream(file.buffer).pipe(upload);
});

const productActualizado = await this.productService.updateImageUrl(id,result.secure_url)

return productActualizado.imgUrl

}
}