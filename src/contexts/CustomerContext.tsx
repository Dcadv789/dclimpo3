import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer } from '../types/customer';

interface CustomerContextType {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  addNewCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

// Sample customers data
const initialCustomers: Customer[] = [
  {
    id: '1',
    razaoSocial: 'Tech Solutions Ltda',
    nomeFantasia: 'TechSol',
    cnpj: '12.345.678/0001-01',
    email: 'contato@techsol.com.br',
    telefone: '(11) 98765-4321',
    endereco: {
      logradouro: 'Rua da Tecnologia',
      numero: '100',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234-567'
    }
  },
  {
    id: '2',
    razaoSocial: 'Indústria ABC S.A.',
    nomeFantasia: 'ABC Industries',
    cnpj: '23.456.789/0001-02',
    email: 'contato@abcindustries.com.br',
    telefone: '(11) 97654-3210',
    endereco: {
      logradouro: 'Avenida Industrial',
      numero: '200',
      bairro: 'Distrito Industrial',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '04567-890'
    }
  },
  {
    id: '3',
    razaoSocial: 'Global Trade Ltda',
    nomeFantasia: 'Global',
    cnpj: '45.678.901/0001-04',
    email: 'contato@globaltrade.com.br',
    telefone: '(11) 95432-1098',
    endereco: {
      logradouro: 'Avenida do Comércio',
      numero: '400',
      bairro: 'Vila Empresarial',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '05678-901'
    }
  },
  {
    id: '4',
    razaoSocial: 'Indústria Delta S.A.',
    nomeFantasia: 'Delta Ind',
    cnpj: '56.789.012/0001-05',
    email: 'comercial@deltaindustria.com.br',
    telefone: '(21) 94321-0987',
    endereco: {
      logradouro: 'Rua Industrial',
      numero: '500',
      bairro: 'Zona Industrial',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      cep: '20000-000'
    }
  },
  {
    id: '5',
    razaoSocial: 'Alpha Tecnologia S.A.',
    nomeFantasia: 'Alpha Tech',
    cnpj: '89.012.345/0001-08',
    email: 'suporte@alphatech.com.br',
    telefone: '(51) 90987-6543',
    endereco: {
      logradouro: 'Avenida da Inovação',
      numero: '800',
      bairro: 'Parque Tecnológico',
      cidade: 'Porto Alegre',
      estado: 'RS',
      cep: '90000-000'
    }
  }
];

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  // Force reset to initial customers on mount
  useEffect(() => {
    setCustomers(initialCustomers);
    localStorage.setItem('customers', JSON.stringify(initialCustomers));
  }, []);

  const addNewCustomer = (customerData: Omit<Customer, 'id'>) => {
    const newCustomer = {
      ...customerData,
      id: crypto.randomUUID()
    };
    setCustomers(prev => [newCustomer, ...prev]);
  };

  const updateCustomer = (id: string, customerData: Partial<Customer>) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id ? { ...customer, ...customerData } : customer
    ));
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
  };

  // Save to localStorage whenever customers change
  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  return (
    <CustomerContext.Provider value={{ 
      customers, 
      setCustomers, 
      addNewCustomer,
      updateCustomer,
      deleteCustomer
    }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomers() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
}