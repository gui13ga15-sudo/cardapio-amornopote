import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import heroImg from "@/assets/hero-potes.jpg";
import { CATEGORIAS, MENU, WHATSAPP_NUMERO, brl } from "@/lib/menu-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amor no Pote — Bolos no pote e sobremesas artesanais" },
      {
        name: "description",
        content:
          "Cardápio do Amor no Pote: bolos no pote, sobremesas e bebidas. Monte seu pedido e finalize direto no WhatsApp.",
      },
      { property: "og:title", content: "Amor no Pote — Cardápio" },
      {
        property: "og:description",
        content: "Escolha seus potes favoritos e finalize o pedido pelo WhatsApp.",
      },
    ],
  }),
  component: Cardapio,
});

type Cart = Record<string, number>;

function Cardapio() {
  const [cart, setCart] = useState<Cart>({});
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [entrega, setEntrega] = useState<"entrega" | "retirada">("entrega");
  const [endereco, setEndereco] = useState("");
  const [pagamento, setPagamento] = useState("Pix");
  const [obs, setObs] = useState("");
  const [aviso, setAviso] = useState("");

  const itens = useMemo(
    () =>
      MENU.filter((m) => (cart[m.id] ?? 0) > 0).map((m) => ({ ...m, qtd: cart[m.id] ?? 0 })),
    [cart],
  );

  const total = itens.reduce((s, i) => s + i.preco * i.qtd, 0);
  const qtdTotal = itens.reduce((s, i) => s + i.qtd, 0);

  const setQtd = (id: string, delta: number) => {
    setAviso("");
    setCart((c) => {
      const next = Math.max(0, (c[id] ?? 0) + delta);
      const copy = { ...c };
      if (next === 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });
  };

  const irParaDados = () => {
    document.getElementById("dados")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const finalizar = () => {
    if (itens.length === 0) {
      setAviso("Escolha pelo menos um item do cardápio.");
      irParaDados();
      return;
    }
    if (!nome.trim() || !telefone.trim() || (entrega === "entrega" && !endereco.trim())) {
      setAviso("Complete seu nome, telefone" + (entrega === "entrega" ? " e endereço." : "."));
      irParaDados();
      return;
    }
    setAviso("");

    const linhas = itens.map((i) => `• ${i.qtd}x ${i.nome} — ${brl(i.preco * i.qtd)}`);
    const texto = [
      "*Novo pedido — Amor no Pote*",
      "",
      ...linhas,
      "",
      `*Total:* ${brl(total)}`,
      "",
      `*Nome:* ${nome}`,
      `*Telefone:* ${telefone}`,
      entrega === "entrega" ? `*Entrega:* ${endereco}` : "*Retirada no local*",
      `*Pagamento:* ${pagamento}`,
      obs.trim() ? `*Observações:* ${obs}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener",
    );
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Barra superior com o botão de finalizar */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="font-display text-lg leading-none font-bold text-primary">
              Amor no Pote
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {qtdTotal > 0 ? `${qtdTotal} item(ns) • ${brl(total)}` : "Seu pedido está vazio"}
            </p>
          </div>
          <button
            type="button"
            onClick={finalizar}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-whats px-4 py-2.5 text-sm font-bold text-whats-foreground shadow-sm transition-transform active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
            Finalizar pedido
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4">
        <section className="mt-4 overflow-hidden rounded-3xl border border-border bg-card">
          <img
            src={heroImg}
            alt="Bolos no pote artesanais em potes de vidro"
            width={1400}
            height={900}
            className="h-44 w-full object-cover sm:h-60"
          />
          <div className="p-5">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Feito com amor, servido no pote
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Escolha seus sabores, preencha seus dados abaixo e envie o pedido pelo WhatsApp.
            </p>
          </div>
        </section>

        {CATEGORIAS.map((cat) => (
          <section key={cat} className="mt-8">
            <h2 className="mb-3 text-xl font-bold text-foreground">{cat}</h2>
            <div className="space-y-3">
              {MENU.filter((m) => m.categoria === cat).map((item) => {
                const qtd = cart[item.id] ?? 0;
                return (
                  <article
                    key={item.id}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-foreground">{item.nome}</h3>
                      <p className="text-sm text-muted-foreground">{item.descricao}</p>
                      <p className="mt-1 font-bold text-primary">{brl(item.preco)}</p>
                    </div>
                    {qtd === 0 ? (
                      <button
                        type="button"
                        onClick={() => setQtd(item.id, 1)}
                        className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-transform active:scale-95"
                      >
                        Adicionar
                      </button>
                    ) : (
                      <div className="flex shrink-0 items-center gap-2 rounded-full bg-secondary p-1">
                        <button
                          type="button"
                          aria-label={`Remover um ${item.nome}`}
                          onClick={() => setQtd(item.id, -1)}
                          className="rounded-full bg-card p-2 text-secondary-foreground"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-5 text-center text-sm font-bold">{qtd}</span>
                        <button
                          type="button"
                          aria-label={`Adicionar um ${item.nome}`}
                          onClick={() => setQtd(item.id, 1)}
                          className="rounded-full bg-card p-2 text-secondary-foreground"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        {/* Dados do cliente — tudo em uma única etapa */}
        <section id="dados" className="mt-10 rounded-3xl border border-border bg-card p-5">
          <h2 className="text-xl font-bold text-foreground">Seus dados</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Preencha e toque em “Finalizar pedido” para enviar no WhatsApp.
          </p>

          <div className="mt-4 grid gap-4">
            <Campo label="Nome">
              <input
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  setAviso("");
                }}
                placeholder="Seu nome completo"
                className={inputCls}
              />
            </Campo>

            <Campo label="Telefone / WhatsApp">
              <input
                value={telefone}
                onChange={(e) => {
                  setTelefone(e.target.value);
                  setAviso("");
                }}
                inputMode="tel"
                placeholder="(11) 90000-0000"
                className={inputCls}
              />
            </Campo>

            <Campo label="Como quer receber?">
              <div className="flex gap-2">
                {(["entrega", "retirada"] as const).map((op) => (
                  <button
                    key={op}
                    type="button"
                    onClick={() => {
                      setEntrega(op);
                      setAviso("");
                    }}
                    className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-bold capitalize transition-colors ${
                      entrega === op
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground"
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </Campo>

            {entrega === "entrega" && (
              <Campo label="Endereço de entrega">
                <input
                  value={endereco}
                  onChange={(e) => {
                    setEndereco(e.target.value);
                    setAviso("");
                  }}
                  placeholder="Rua, número, bairro e referência"
                  className={inputCls}
                />
              </Campo>
            )}

            <Campo label="Forma de pagamento">
              <select
                value={pagamento}
                onChange={(e) => setPagamento(e.target.value)}
                className={inputCls}
              >
                <option>Pix</option>
                <option>Dinheiro</option>
                <option>Cartão de débito</option>
                <option>Cartão de crédito</option>
              </select>
            </Campo>

            <Campo label="Observações (opcional)">
              <textarea
                value={obs}
                onChange={(e) => setObs(e.target.value)}
                rows={3}
                placeholder="Ex.: sem granulado, entregar após as 18h..."
                className={`${inputCls} resize-none`}
              />
            </Campo>
          </div>

          <div className="mt-5 rounded-2xl bg-secondary p-4">
            <div className="flex items-center justify-between text-sm text-secondary-foreground">
              <span>{qtdTotal} item(ns)</span>
              <span className="text-lg font-bold text-primary">{brl(total)}</span>
            </div>
          </div>

          {aviso && <p className="mt-3 text-sm font-semibold text-primary">{aviso}</p>}

          <button
            type="button"
            onClick={finalizar}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-whats px-5 py-3.5 text-base font-bold text-whats-foreground transition-transform active:scale-95"
          >
            <ShoppingBag className="h-5 w-5" />
            Finalizar pedido no WhatsApp
          </button>
        </section>
      </main>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-foreground">{label}</span>
      {children}
    </label>
  );
}
