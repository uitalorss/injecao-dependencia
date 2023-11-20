import { IDeductionService } from "../interfaces/IDeductionService";

export class DeductionServiceSP implements IDeductionService {
  deduction(amount: number) {
    return amount * 0.1;
  }
}
