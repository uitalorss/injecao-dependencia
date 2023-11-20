import { IDeductionService } from "../interfaces/IDeductionService";

export class DeductionServiceMG implements IDeductionService {
  deduction(amount: number) {
    return amount * 0.12;
  }
}
