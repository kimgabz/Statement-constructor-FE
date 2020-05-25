import { Client } from 'src/app/clients/models/client';

export class Statement {
  _id: string;
  item: string;
  qty: number;
  date: Date;
  due: Date;
  tax: number;
  rate: number;
  client: Client;
}

export class StatementPaginationRsp {
  docs: Statement[];
  total: number;
  pages: number;
  page: number;
  limit: number;
}
