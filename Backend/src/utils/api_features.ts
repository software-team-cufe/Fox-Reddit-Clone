/* eslint-disable @typescript-eslint/no-explicit-any */
import { prop, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose';

interface IQuery {
  [key: string]: string | number | undefined;
  sort?: string;
  fields?: string;
  page?: number;
  limit?: number;
  type?: string;
}

class APIFeatures {
  private query: any; // Change any to your schema type
  private queryString: IQuery;

  constructor(query: any, queryString: IQuery) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const exclude = ['page', 'sort', 'limit', 'fields', 'type'];
    exclude.forEach((el: string) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    let sortBy;
    if (this.queryString.sort) {
      sortBy = this.queryString.sort.replace(',', ' ');
    }
    this.query = this.query.sort(sortBy);
    return this;
  }

  selectFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else this.query = this.query.select('-__v');
    return this;
  }

  paginate() {
    const page = (this.queryString.page ?? 1) * 1;
    const limit = (this.queryString.limit ?? 100) * 1;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const APIFeaturesModel = getModelForClass(APIFeatures);

export { APIFeaturesModel, APIFeatures };
