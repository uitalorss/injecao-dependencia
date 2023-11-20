# Exercício prático sobre injeção de dependência.

### Antes de mais nada, o que são dependências?

Principalmente no desenvolvimento orientado a objetos, cria-se classes para representar coisas que existem na aplicação e suas funcionalidades. Quando existe a necessidade de instanciar um outro objeto para executar determinada funcionalidade para aquela classe, a mesma se torna dependente dessa implementação. Esse acoplamento entre funcionalidades em um sistema com inúmeras responsabilidades pode vir a ser um problema pois um alto acoplamento implica em dificuldade para efetuar testes unitários, dificuldade para manutenção, pois uma mudança em um módulo pode implicar em mudanças em módulos que são dependentes dessa implementação, o que pode atrasar muito a manutenção ou trazer maiores problemas.

Assim, a injeção de dependência é um padrão que buscar diminuir o acoplamento entre as classes, fazendo que, ao invés do objeto que a classe depende seja instanciado dentro dela, ele seja passado (**injetado**), através de construtores ou configurações externas, quando a classe for instanciada. Assim, o código fica muito mais receptivo a testes, pois é possível na implementação criar uma implementação mockada para testar a aplicação. ou até possíveis mudanças, com uma substituição de implementação de interface, fica muito mais simples, pois basta substituir a implementação de interface por outra, sem precisar mexer nas classes que dependem da implementação.

### Prática

- As classes DeductionServiceMG e DeductionServiceSP são implementadas a partir da interface IDeductionService.
  - Elas precisam ter em seu escopo o método deduction que recebe um valor numérico e retorna também um valor numérico.
    - Cada clase tem seu próprio cálculo de dedução.
- A classe PayService é dependente de uma implementação IDeductionService
  - O método tax recebe um valor numérico e também retorna um valor numérico.
- O arquivo index instancia um objeto PayService e imprime no console a taxa a ser paga.

**Sem injeção de dependência**

- Uma instancia IDeductionServiceSP é criada para fazer a dedução devida.
  - Caso seja necessário mudar a implementação para receber a dedução MG, é necessário alterar a implementação chamando a nova classe dentro da classe PayService.

```
//Arquivo index.ts
import { PayService } from "./PayService";
import { DeductionServiceSP } from "./services/DeductionServiceSP";

const payService = new PayService();

console.log(payService.tax(1000));

 //Arquivo PayService.ts
import { IDeductionService } from "./interfaces/IDeductionService";
import { DeductionServiceSP } from "./services/DeductionServiceSP";

export class PayService {
  tax(amount: number) {
		const deductionService = new DeductionServiceSP()
    let valueToPay = amount - deductionService.deduction(amount);
    return valueToPay * 0.2;
  }
}

// arquivo DeductionServiceMG.ts
import { IDeductionService } from "../interfaces/IDeductionService";

export class DeductionServiceMG implements IDeductionService {
  deduction(amount: number) {
    return amount * 0.12;
  }
}

// arquivo DeductionServiceSP.ts
import { IDeductionService } from "../interfaces/IDeductionService";

export class DeductionServiceSP implements IDeductionService {
  deduction(amount: number) {
    return amount * 0.1;
  }
}

// arquivo IDeductionService.ts
export interface IDeductionService {
  deduction: (amount: number) => number;
}
```

**Com injeção de dependência**

- A classe PayService, ao invés de instanciar uma DeductionServiceMG ou DeductionServiceSP, ela recebe um atributo do tipo IDeductionService em seu construtor.
  - Independente de qualquer uma que seja chamada, basta que seja uma implementação de IDeductionService.
- A instancia de PayService é criada passando como argumento uma instancia que seja uma implementação de IDeductionService, do jeito que a classe espera.

```
//Arquivo index.ts
import { PayService } from "./PayService";
import { DeductionServiceSP } from "./services/DeductionServiceSP";

const payService = new PayService(new DeductionServiceSP());

console.log(payService.tax(1000));

 //Arquivo PayService.ts
import { IDeductionService } from "./interfaces/IDeductionService";

export class PayService {
  constructor(private deductionService: IDeductionService) {}
  tax(amount: number) {
    let valueToPay = amount - this.deductionService.deduction(amount);
    return valueToPay * 0.2;
  }
}

// arquivo DeductionServiceMG.ts
import { IDeductionService } from "../interfaces/IDeductionService";

export class DeductionServiceMG implements IDeductionService {
  deduction(amount: number) {
    return amount * 0.12;
  }
}

// arquivo DeductionServiceSP.ts
import { IDeductionService } from "../interfaces/IDeductionService";

export class DeductionServiceSP implements IDeductionService {
  deduction(amount: number) {
    return amount * 0.1;
  }
}

// arquivo IDeductionService.ts
export interface IDeductionService {
  deduction: (amount: number) => number;
}
```
