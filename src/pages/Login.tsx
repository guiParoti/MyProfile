import { useState } from "react"
import { useUsuario } from "../contexts/UsuarioContext/UseUsuario"

export const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')
    const [nomeCad, setNomeCad] = useState<string>('')
    const [emailCad, setEmailCad] = useState<string>('')
    const [senhaCad, setSenhaCad] = useState<string>('')
    const [erro, setErro] = useState<string>('')
    const [showModal, setShowModal] = useState<boolean>(false)
    const { cadastrar, login } = useUsuario()

    // Se alguém ver e se perguntar por que tantos comentários? È porque estou tentando decorar o tailwind, mas ta dificl.


    return (
        // min-h-screen — ocupa a altura total da tela
        // bg-gray-50 — fundo cinza bem clarinho
        // flex items-center justify-center — centraliza vertical e horizontal
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">


            {/*bg-white — fundo branco*/}
            {/*rounded-2xl — cantos bem arredondados*/}
            {/*shadow-lg — sombra média — dá profundidade*/}
            {/*p-8 — padding interno generoso*/}
            {/*w-full max-w-md — largura total mas limitada a ~448px*/}
            {/*flex flex-col gap-6 — coluna com espaço entre os filhos*/}
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-200 min-h-100 flex flex-col gap-6">

                {/* Título — text-2xl tamanho grande, font-bold negrito, text-center centralizado */}
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Login
                </h2>

                {/* Cada campo em uma div — flex flex-col empilha label e input */}
                <div className="flex flex-col gap-1">
                      {/* text-sm texto pequeno, font-medium semi-negrito, text-gray-600 cinza médio */}
                    <label className="text-sm font-medium text-gray-600">Email</label>

                    {/* border — borda, border-gray-300 cor cinza clara
                    rounded-lg — cantos arredondados
                     p-3 — padding interno
                    w-full — ocupa largura toda
                     focus:outline-none — remove o contorno azul padrão do browser
                    focus:border-blue-500 — borda azul quando clica no campo */}
                    <input type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Senha</label>

                    <input type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="*******"
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Botão — w-full largura total, p-3 padding, bg-blue-600 fundo azul
                text-white texto branco, font-bold negrito, rounded-lg cantos arredondados
                hover:bg-blue-700 cor mais escura ao passar o mouse
                transition-colors animação suave na troca de cor */}
                <button type="button"
                    className="w-full p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => {
                        const dados = login(email, senha)
                        if(dados) setErro(dados)}}>
                    Entrar
                </button>
                {erro && (
                    <label className="text-sm font-medium text-red-600">{erro}</label>
                )}
                <label className="text-sm font-medium text-black-600 cursor-pointer" onClick={() => setShowModal(true)}>Não tem uma conta?</label>
    {showModal && (
    // fundo desfocado — igual os outros modais
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={() => setShowModal(false)}>

        {/* card do modal — stopPropagation evita fechar ao clicar dentro */}
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}>

            <h2 className="text-2xl font-bold text-center text-gray-800">Cadastro</h2>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Nome</label>
                <input type="text" value={nomeCad}
                    onChange={(e) => setNomeCad(e.target.value)}
                    placeholder="Seu nome"
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"/>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Email</label>
                <input type="email" value={emailCad}
                    onChange={(e) => setEmailCad(e.target.value)}
                    placeholder="seu@email.com"
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"/>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Senha</label>
                <input type="password" value={senhaCad}
                    onChange={(e) => setSenhaCad(e.target.value)}
                    placeholder="*******"
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"/>
            </div>

            <div className="flex gap-3">
                {/* border — só borda sem fundo */}
                <button type="button"
                    onClick={() => setShowModal(false)}
                    className="border border-gray-300 text-gray-600 rounded-lg p-3 flex-1 hover:bg-gray-50">
                    Cancelar
                </button>
                <button type="button"
                    onClick={() => cadastrar(nomeCad, emailCad, senhaCad)}
                    className="bg-blue-600 text-white rounded-lg p-3 flex-1 font-bold hover:bg-blue-700 transition-colors">
                    Cadastrar
                </button>
            </div>
        </div>
    </div>
)}
            </div>
          
        </div>
    )
}