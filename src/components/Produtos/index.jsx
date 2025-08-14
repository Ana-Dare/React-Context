import React, { useContext } from "react";
import Produto from "./Produto";
import produtos from "@/mocks/produtos.json";
import Titulo from "@/components/Titulo";
import { CarrinhoContext } from "@/context/CarrinhoContext";

const Produtos = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some((itemDoCarrinho) => {
      itemDoCarrinho.id === novoProduto.id;
    });

    if (!temOProduto) {
      novoProduto.quantiddade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }

    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((itemDoCarrinho) => {
        if (!itemDoCarrinho.id === novoProduto.id)
          itemDoCarrinho.quantiddade += 1;
        return itemDoCarrinho;
      })
    );
  }

  function removerProduto(removeProduto) {
    const temOProduto = carrinho.some((itemDoCarrinho) => {
      itemDoCarrinho.id === removeProduto.id;
    });

    if (!temOProduto) {
      return;
    }

    setCarrinho((carrinhoAnterior) => {
      carrinhoAnterior.map((itemDoCarrinho) => {
        if (!itemDoCarrinho.id === removerProduto.id)
          itemDoCarrinho.quantiddade -= 1;
        return itemDoCarrinho;
      });
    });
  }

  return (
    <section role="produtos" aria-label="Produtos que estão bombando!">
      <Titulo>Produtos que estão bombando!</Titulo>
      <div className="container row mx-auto">
        {produtos.map((produto) => (
          <Produto
            key={produto.id}
            {...produto}
            adicionarProduto={adicionarProduto}
            removerProduto={removerProduto}
          />
        ))}
      </div>
    </section>
  );
};

export default Produtos;
