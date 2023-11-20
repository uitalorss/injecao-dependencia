import { IDeductionService } from "./interfaces/IDeductionService";

export class PayService {
  constructor(private deductionService: IDeductionService) {}
  tax(amount: number) {
    let valueToPay = amount - this.deductionService.deduction(amount);
    return valueToPay * 0.2;
  }
}
