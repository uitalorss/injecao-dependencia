import { PayService } from "./PayService";
import { DeductionServiceSP } from "./services/DeductionServiceSP";

const payService = new PayService(new DeductionServiceSP());

console.log(payService.tax(1000));
