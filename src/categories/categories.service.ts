import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./categorie.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private readonly categoriesRepository : Repository<Category>) { }
    addCategories(categories) {
        throw new Error("Method not implemented.");
    }
    getCategories() {
        return 'Get categories';
    }
}