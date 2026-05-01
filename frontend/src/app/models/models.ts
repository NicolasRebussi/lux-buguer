export interface Funcionario {
  id?: number;
  nome: string;
  funcao: string;
  status: string;
  salario: number;
  diasTrabalhados: number;
  horasTrabalhadas: number;
}

export interface Produto {
  id?: number;
  nome: string;
  valor: number;
  quantidadeEstoque: number;
  disponivel?: boolean;
}

export interface Pedido {
  id?: number;
  nomeCliente: string;
  tipoPedido: string;
  produtos: Produto[];
  valorTotal?: number;
  data?: string;
  status?: string;
  funcionarioResponsavel?: Funcionario;
}

export interface Ponto {
  id?: number;
  funcionario: Funcionario;
  data: string;
  entrada?: string;
  saida?: string;
  horasTrabalhadas?: number;
}

export interface Dashboard {
  pedidosHoje: number;
  totalVendidoHoje: number;
}
