export class AddTransaction {
  static readonly type = '[Transaction] Add';

  constructor(public payload: any) {}
}

export class UpdateTransaction {
  static readonly type = '[Transaction] Update';

  constructor(public id: any, public payload: any) {}
}

export class GetTransactions {
  static readonly type = '[Transaction] Get';
}

export class DeleteTransaction {
  static readonly type = '[Transaction] delete';

  constructor(public transactionId: any) {}
}
